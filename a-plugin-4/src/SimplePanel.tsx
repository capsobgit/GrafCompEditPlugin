import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import AP_Nodes from 'components/AP_Nodes';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  const [move, setMove] = useState({
    x: 0,
    y: 0,
  });

  function handleDragMove(e: PointerEvent) {
    setMove({
      x: move.x + e.movementX,
      y: move.y + e.movementY,
    });
  }
  /*
   * create the AP-Nodes and put them to Array
   */
  const nodes = [];
  const col = `${theme.palette.red88}`;
  for (let i = 0; i < 4; i++) {
    nodes.push(<AP_Nodes col={col} xPos={i * 100} radius={40} />);
  }

  const [dragging, setDragging] = useState(false);

  const handlePointerDown = () => {
    console.log('handlePointerDown');
    setDragging(true);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (dragging) {
      handleDragMove(e);
    }
  };

  const handlePointerUp = (e: PointerEvent) => {
    setDragging(false);
  };

  return (
    <svg
      className={styles.svg}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`-${width / 4} -${height / 2} ${width * 2} ${height * 2}`}
    >
      {/* <DragMove onDragMove={handleDragMove}> */}
      <g transform={`translate(${move.x} ${move.y})`}>
        <circle
          onMouseDown={e => handlePointerDown}
          onPointerMove={e => handlePointerMove}
          onPointerUp={e => handlePointerUp}
          r={150}
          cx={move.x}
        />
        {/* <AP_Nodes col={col} xPos={move.x} radius={40} /> */}
      </g>
      {/* </DragMove> */}
    </svg>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: strict;
    `,
  };
});
