import React from "react";
import { Image, Result } from "antd";
import { LoremIpsum } from "lorem-ipsum";

const About: React.FunctionComponent = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  return (
    <Result
      icon={<Image alt="" src={`${process.env.PUBLIC_URL}/logo192.png`} />}
      title={lorem.generateParagraphs(3)}
    />
  );
};

export default About;
