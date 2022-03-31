import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function CustomNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </>
  );
}

export default CustomNode;
