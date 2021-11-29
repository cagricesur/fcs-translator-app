import { Card, Input } from "antd";
import classNames from "classnames";
import React, { useImperativeHandle } from "react";
import { useStateReducer } from "../utils";

interface ITextAreaCommon {
  text: string;
}

export interface ITextAreaRefs extends ITextAreaCommon {}

interface ITextAreaState extends ITextAreaCommon {
  text: string;
}

export interface ITextAreaProps extends Partial<ITextAreaCommon> {
  allowClear?: boolean;
  title: string;
  readonly?: boolean;
  extra?: React.ReactNode;
  titlePosition?: "LEFT" | "RIGHT";
  onTextChange?: (text: string) => void;
}

const TextAreaComponent: React.ForwardRefRenderFunction<
  ITextAreaRefs,
  ITextAreaProps
> = (props, ref) => {
  const [state, dispatch] = useStateReducer<ITextAreaState>({
    text: props.text || "",
  });

  useImperativeHandle(ref, () => ({
    get text(): string {
      return state.text;
    },
    set text(text: string) {
      dispatch({ text });
    },
  }));

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    dispatch({ text });
    props.onTextChange && props.onTextChange(text);
  };

  return (
    <Card
      title={props.title}
      extra={props.extra}
      className={classNames(
        "fcs-text-area",
        { "title-left": props.titlePosition !== "RIGHT" },
        { "title-right": props.titlePosition === "RIGHT" },
        { "border-radius-left": props.titlePosition !== "RIGHT" },
        { "border-radius-right": props.titlePosition === "RIGHT" }
      )}
    >
      <Input.TextArea
        className="fcs-text-area-input"
        value={state.text}
        readOnly={props.readonly}
        onChange={onTextChange}
        autoSize={{ minRows: 5 }}
        bordered={false}
      />
    </Card>
  );
};
export const TextArea = React.forwardRef(TextAreaComponent);
