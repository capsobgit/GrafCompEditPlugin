import React from 'react';

interface Props {
  x1: number;
  y1: number;
  /* x2: number;
  y2: number; */
}

const Connections = (props: Props) => {
  return <line x1={props.x1} y1={props.y1} x2={100} y2={50} strokeWidth={2} stroke={'white'} />;
};

export default Connections;
