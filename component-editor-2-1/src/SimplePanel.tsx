import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import App from './components/App';
import { ReactFlowProvider } from 'react-flow-renderer';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  return (
    <ReactFlowProvider>
      <App widthProp={width} heightProp={height} />
    </ReactFlowProvider>
  );
};
