import {
  AudioOutlined,
  CloseOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Button, Col, ColProps, Row } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Drawer,
  History,
  IDrawerRefs,
  ITextAreaRefs,
  TextArea,
} from "../components";
import { ITranslationRequest, ITranslationResponse } from "../models";
import { TranslationService } from "../service";
import { useSpeechRecognition, useStateReducer } from "../utils";

interface ITranslationHistory {
  request: ITranslationRequest;
  response: ITranslationResponse;
}

interface IHomeState {
  history: ITranslationHistory[];
}

const Home: React.FunctionComponent = () => {
  const [state, dispatch] = useStateReducer<IHomeState>({
    history: [],
  });

  const textENRef = useRef<ITextAreaRefs>(null);
  const textTRRef = useRef<ITextAreaRefs>(null);
  const drawerRef = useRef<IDrawerRefs>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const recognizer = useSpeechRecognition();

  const setTextEN = (text: string) => {
    textENRef.current && (textENRef.current.text = text);
  };
  const setTextTR = (text: string) => {
    textTRRef.current && (textTRRef.current.text = text);
  };
  const clearTextEN = () => {
    recognizer.stop();
    setTextEN("");
    clearTextTR();
  };
  const clearTextTR = useCallback(() => {
    setTextTR("");
  }, []);
  const addToHistory = useCallback(
    (request: ITranslationRequest, response: ITranslationResponse) => {
      dispatch({
        history: [...state.history, { request, response }],
      });
    },
    [dispatch, state.history]
  );

  const translate = useCallback(
    (text: string) => {
      const cached = state.history.find((history) => {
        return history.request.text === text;
      });
      if (cached) {
        setTextTR(cached.response.translation);
      } else {
        const request: ITranslationRequest = {
          fromLang: "en",
          toLang: "tr",
          date: new Date(),
          text,
        };
        TranslationService.Translate(request)
          .then((response) => {
            setTextTR(response.translation);
            addToHistory(request, response);
          })
          .catch((reason) => {
            console.error(reason);
          });
      }
    },
    [addToHistory, state.history]
  );

  const clearTimer = () => {
    timer.current && clearTimeout(timer.current);
  };
  const onTextEnChange = useCallback(
    (text: string) => {
      clearTimer();
      if (text) {
        timer.current = setTimeout(() => {
          translate(text);
        }, 100);
      } else {
        clearTextTR();
      }
    },
    [translate, clearTextTR]
  );

  const getColumnProps = (xlOffset?: number): ColProps => {
    return {
      className: "fcs-text-area-container",
      xs: { span: 24 },
      md: { span: 12 },
      xl: { span: 8, offset: xlOffset || 0 },
    };
  };

  const textENButtons: React.ReactNode = (
    <React.Fragment>
      <Button
        className="m-r-10"
        icon={<AudioOutlined />}
        shape="circle"
        size="large"
        danger={recognizer.isListening}
        onClick={() => {
          if (recognizer.isListening) {
            recognizer.stop();
          } else {
            recognizer.start();
          }
        }}
      ></Button>

      <Button
        className="m-r-10"
        icon={<HistoryOutlined />}
        shape="circle"
        size="large"
        onClick={() => {
          recognizer.stop();
          drawerRef.current && (drawerRef.current.visible = true);
        }}
      ></Button>

      <Button
        icon={<CloseOutlined />}
        shape="circle"
        size="large"
        onClick={clearTextEN}
      ></Button>
    </React.Fragment>
  );

  useEffect(() => {
    const text = [recognizer.final, recognizer.interim]
      .filter((txt) => txt && txt.length > 0)
      .join("");
    if (recognizer.interim) {
      setTextEN(text);
      onTextEnChange(text);
    }
  }, [recognizer.interim, recognizer.final, onTextEnChange]);

  return (
    <React.Fragment>
      <Drawer ref={drawerRef} title="HISTORY" placement="left">
        <History history={state.history} />
      </Drawer>

      <Row>
        <Col {...getColumnProps(4)}>
          <TextArea
            ref={textENRef}
            title="ENGLISH"
            titlePosition="LEFT"
            allowClear={true}
            onTextChange={onTextEnChange}
            extra={textENButtons}
          ></TextArea>
        </Col>
        <Col {...getColumnProps(0)}>
          <TextArea
            ref={textTRRef}
            title="TURKISH"
            titlePosition="RIGHT"
            readonly={true}
          ></TextArea>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
