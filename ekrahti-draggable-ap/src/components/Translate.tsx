import React, { useState, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Translate = (props: Props) => {
  const [move, setMove] = useState({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = useState(false);

  function handlePointerDown() {
    setDragging(true);
  }

  const handlePointerMove = (e: React.PointerEvent<SVGElement>) => {
    if (dragging) {
      setMove({
        x: move.x + e.movementX,
        y: move.y + e.movementY,
      });
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <g
      transform={`translate(${move.x} ${move.y})`}
      onPointerDown={handlePointerDown}
      onPointerMove={(e: React.PointerEvent<SVGElement>) => handlePointerMove(e)}
      onPointerUp={handlePointerUp}
    >
      {props.children}
    </g>
  );
};

export default Translate;
