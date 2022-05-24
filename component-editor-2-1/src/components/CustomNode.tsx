import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyleLeft = {
  left: 10,
};

const handleStyleRight = {
  left: 80,
};

function CustomNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyleRight} />
      <Handle type="source" position={Position.Bottom} id="c" style={handleStyleLeft} />
    </>
  );
}

export default CustomNode;
