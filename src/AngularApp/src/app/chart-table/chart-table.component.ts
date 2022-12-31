import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData } from '../chart/models/chart.model';

@Component({
  selector: 'app-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: [
    './chart-table.component.scss'
  ]
})
export class ChartTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<ChartData> = new MatTableDataSource<ChartData>();
}
