import React from 'react';

interface Props {
  radius: number;
  xPos: number;
  col: string;
}
const AP_Nodes: React.FC<Props> = (props): React.ReactElement => {
  return <circle r={props.radius} cx={props.xPos} style={{ fill: props.col }} />;
};

export default AP_Nodes;
