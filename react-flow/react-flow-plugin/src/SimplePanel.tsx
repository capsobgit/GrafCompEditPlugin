import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import ReactFlow, { addEdge, ReactFlowProps } from 'react-flow-renderer';
import React, { useState } from 'react';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  //Data Querys
  const returnLastDataFromQuery = (offset: number) => {
    return data.series
      .map((series) => series.fields.find((field) => field.type === 'number'))
      .map((field) => field?.values.get(field.values.length - offset));
  };

  const initialElements = [
    {
      id: '1',
      type: 'input',
      data: { label: returnLastDataFromQuery(1) },
      position: { x: 250, y: 25 },
    },
    {
      id: '2',
      type: 'output',
      data: { label: 'MainNode' },
      position: { x: 50, y: 125 },
    },
    {
      id: '3',
      type: 'input',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '4',
      type: 'output',
      data: { label: 'Input Node' },
      position: { x: 400, y: 125 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '3', target: '2', animated: true },
    { id: 'e3-4', source: '2', target: '4', animated: true },
  ];

  const ReactFlowRenderer = () => {
    const [elements, setElements] = useState(initialElements);

    return (
      <div style={{ height: 500 }}>
        <ReactFlow elements={elements} />
      </div>
    );
  };

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
      <ReactFlowRenderer />
      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        <div>Max value: {options.text}</div>
        <div>data {}</div>
      </div>
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
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
