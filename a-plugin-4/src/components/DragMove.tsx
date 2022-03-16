import React, { useState } from 'react';

interface Props {
  onDragMove: (e: PointerEvent) => void;
}

export const DragMove: React.FC<Props> = ({ onDragMove, children }) => {
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (dragging) {
      onDragMove(e);
    }
  };

  const handlePointerUp = (e: PointerEvent) => {
    setDragging(false);
  };

  return (
    <g onPointerDown={e => handlePointerDown} onPointerMove={e => handlePointerMove} onPointerUp={e => handlePointerUp}>
      {children}
    </g>
  );
};
