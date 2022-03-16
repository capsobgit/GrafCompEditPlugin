import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import AP_Nodes from 'AP_Nodes';
import Translate from 'Translate';

/**
 * Startingpoint of the Plugin-Panel-App
 */

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  const nodes: React.ReactNode[] = [];
  const col = `${theme.palette.redBase}`;

  let initPosX = width / 8;
  let initPosY = -height / 2;
  let offset = 100;
  let cutRow = false;
  let rowlength = 4;
  let amountItems = 4;
  for (let i = 0; i < amountItems; i++) {
    cutRow = i % rowlength == 0;
    cutRow ? (initPosX -= (rowlength - 1) * offset) : (initPosX += offset);
    cutRow ? (initPosY += offset) : initPosY;
    nodes.push(
      <Translate>
        <AP_Nodes color={col} xPos={initPosX} yPos={initPosY} radius={40} />
      </Translate>
    );
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        {nodes}
      </svg>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
  };
});
