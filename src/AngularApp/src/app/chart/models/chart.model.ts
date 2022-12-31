export interface Chart {
  name: string;
  series: ChartData[]
}

export interface ChartData {
  name: string;
  value: number;
}
