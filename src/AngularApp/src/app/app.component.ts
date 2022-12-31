import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, ChartData } from './chart/models/chart.model';
import { ConnectionStatus, HubService } from './services/hub.service';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'WebApi SignalR Angular real time chart sample';
  chart: Chart[] = [
    {
      name: "samples",
      series: [{ name: '0', value: 0 }]
    }
  ];

  dataSource = new MatTableDataSource<ChartData>();

  constructor(private _snackBar: MatSnackBar, private hubService: HubService) { }

  ngOnInit(): void {
    this.hubService.status$.pipe(untilDestroyed(this)).subscribe(x => {
      const config = {
        panelClass: `${this.getPanelClass(x.status)}-snackbar`,
      };
      this._snackBar.open(`${x.message}`, '', config);
    });

    this.hubService.updates$.pipe(untilDestroyed(this)).subscribe(x => {
      const series = [...this.chart[0].series, x];
      this.dataSource.data = series;
      this.chart = [
        {
          name: this.chart[0].name,
          series: series
        }
      ]
    });
  }

  private getPanelClass(status: ConnectionStatus): string | string[] | undefined {
    return status === ConnectionStatus.Connected ? 'success' : (status === ConnectionStatus.Pending ? 'warn' : 'error');
  }
}

