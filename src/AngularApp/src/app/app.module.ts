import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from './chart/chart.module';
import { HubService } from './services/hub.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { environment } from 'src/environments/environment';
import { ChartTableComponent } from './chart-table/chart-table.component';
@NgModule({
  declarations: [
    AppComponent,
    ChartTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatGridListModule

  ],
  providers:
    [
      {
        provide: HubService,
        useFactory: () => {
          return new HubService({
            hubUrl: environment.hubUrl,
            reconnect: {
              retryIntervalInSeconds: environment.retryIntervalInSeconds
            }
          });
        }
      },
      {
        provide: APP_INITIALIZER,
        useFactory: async (hubService: HubService) => {
          await hubService.connect();
        },
        deps: [HubService]
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
