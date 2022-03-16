import { css } from 'emotion';
import React from 'react';

interface Props {
  radius: number;
  xPos: number;
  yPos: number;
  color: string;
}

export default function AP_Nodes_WithMove({ radius, xPos, yPos, color }: Props) {
  return (
    <circle
      className={css`
        fill: ${color};
        &:hover {
          fill: ${'gray'};
        }
      `}
      r={radius}
      cx={xPos}
      cy={yPos}
    />
  );
}
