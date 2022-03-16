import { css } from 'emotion';
import React from 'react';

interface Props {
  radius: number;
  xPos: number;
  yPos: number;
  color: string;
}
const AP_Nodes = (props: Props) => {
  return (
    <circle
      className={css`
        fill: ${props.color};
        &:hover {
          fill: ${'gray'};
        }
      `}
      r={props.radius}
      cx={props.xPos}
      cy={props.yPos}
    />
  );
};

export default AP_Nodes;
