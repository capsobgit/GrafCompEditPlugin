import React, { useState, useEffect, ReactNode } from 'react';
import { IMove } from 'SimplePanel';

interface Props {
  children: ReactNode;
  move: IMove;
  setMove: React.Dispatch<React.SetStateAction<IMove[]>>;
}
const Translate = ({ children, move, setMove }: Props) => {
  const [dragging, setDragging] = useState(false);

  function handlePointerDown() {
    setDragging(true);
  }

  const handlePointerMove = (e: React.PointerEvent<SVGElement>) => {
    if (dragging) {
      const tmpMove: IMove = {
        x: move.x + e.movementX,
        y: move.y + e.movementY,
      };
      setMove(movetmpMove);
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
      {children}
    </g>
  );
};

export default Translate;
