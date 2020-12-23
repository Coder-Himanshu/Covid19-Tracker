import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MessageModule} from 'primeng/message';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartModule } from 'angular-highcharts';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxUiLoaderModule,
    ChartModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    MessageModule,
    BrowserModule,
    AppRoutingModule,
    DialogModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
