import * as React from "react";
import "./spa-mock.less";

interface SpaMockProps {
  name: string;
}

const SpaMock: React.FunctionComponent<SpaMockProps> = (props: SpaMockProps) => {
  return <div className="spa-mock">{props.name}</div>;
};

export default SpaMock;
