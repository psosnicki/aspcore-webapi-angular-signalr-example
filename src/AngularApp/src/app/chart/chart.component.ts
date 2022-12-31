import { Component, Input } from '@angular/core';
import { Chart } from './models/chart.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {


  @Input() data: Chart[] = [];
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Name';
  yAxisLabel = 'Value';
  timeline = false;
  view: [number, number] = [1200, 600];
}
