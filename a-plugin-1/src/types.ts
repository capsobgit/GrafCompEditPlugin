type SeriesSize = 'sm' | 'md' | 'lg';
type Circlecolor = 'red' | 'green' | 'blue' | 'yellow';

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  color: Circlecolor;
}
