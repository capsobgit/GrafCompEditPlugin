import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import Translate from 'components/Translate';
import AP_Nodes from 'components/AP_Nodes';
import Connections from 'components/Connections';

/**
 * Startingpoint of the Plugin-Panel-App
 */

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  /**
   * Positionierung von Objekten
   */
  const nodes: React.ReactNode[] = [];
  const col = `${theme.palette.redBase}`;
  let initPosX = width / 8;
  let initPosY = -height / 2;
  let cutRow = false;
  let amountItems = 2;
  let radius = 50 - amountItems;
  let rowlength = Math.round(Math.sqrt(amountItems));
  let offset = 2.5 * radius;
  for (let i = 0; i < amountItems; i++) {
    cutRow = i % rowlength === 0;
    console.log('rowlength', rowlength);

    if (cutRow) {
      initPosX -= (rowlength - 1) * offset;
      initPosY += offset;
    } else {
      initPosX += offset;
    }

    nodes.push(
      <Translate>
        <AP_Nodes color={col} xPos={initPosX} yPos={initPosY} radius={radius} />
        <Connections x1={initPosX} y1={initPosY} />
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
