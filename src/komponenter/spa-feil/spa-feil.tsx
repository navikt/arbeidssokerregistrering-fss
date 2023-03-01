import * as React from "react";
import "./spa-feil.less";

interface SpaFeilProps {
  name: string;
}

const SpaFeil: React.FunctionComponent<SpaFeilProps> = (props: SpaFeilProps) => {
  return <div className="spa-feil">Feil i {props.name}</div>;
};

export default SpaFeil;
