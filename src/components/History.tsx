import React from "react";
import moment from "moment";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Divider, Timeline, Typography } from "antd";
import { ITranslationHistory } from "../models";

interface IHistoryProps {
  history: ITranslationHistory[];
}

export const History: React.FunctionComponent<IHistoryProps> = (props) => {
  return (
    <Timeline reverse={true} className="fcs-timeline">
      {props.history.map((history, index) => {
        return (
          <Timeline.Item key={index}>
            <Typography.Paragraph strong={true}>
              {moment(history.request.date).format("YYYY-MM-DD HH:mm:ss.SSS")}
            </Typography.Paragraph>
            <Typography.Paragraph>{history.request.text}</Typography.Paragraph>
            <Typography.Paragraph>
              <ArrowDownOutlined />
            </Typography.Paragraph>
            <Typography.Paragraph>
              {history.response.translation}
            </Typography.Paragraph>
            <Divider></Divider>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
