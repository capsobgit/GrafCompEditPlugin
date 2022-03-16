import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { useTheme } from '@grafana/ui';
import './Simplepanel.css';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();

  let color: string;
  switch (options.color) {
    case 'red':
      color = theme.palette.redBase;
      break;
    case 'green':
      color = theme.palette.greenBase;
      break;
    case 'blue':
      color = theme.palette.blue95;
      break;
    case 'yellow':
      color = theme.palette.yellow;
      break;
  }

  return (
    <div>
      <svg width={width} height={height} viewBox={`-${width / 2}, -${height / 2} ${width} ${height}`}>
        <g>
          <circle className="circle" fill={color} r={100}></circle>
        </g>
      </svg>
    </div>
  );
};
/*
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
        viewBox={`0 -${height / 2} ${width} ${height}`}
      >
        <g>
          <circle style={{ fill: color }} r={100} />
        </g>
      </svg>
    </div>
  );
};
/* const getStyles = () => {
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
      bottom: 100;
      left: 0;
      padding: 10px;
      `,
    };
  };

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
        <div>Text option value: {options.text}</div>
      </div>

const radii = data.series
            .map(series => series.fields.find(field => field.type === 'number'))
            .map(field => field?.values.get(field.values.length - 1)); 
          <g fill={color}>
          {radii.map((radius, index) => {
            const step = width / radii.length;
            return <circle r={radius} transform={`translate(${index * step + step / 8}, 0)`} />;
          })}
        </g> 
        <g>
          <rect style={{ fill: color }} width="10%" height="10%" transform="scale(0.2)" />
        </g>

 const styles = getStyles();



        */
