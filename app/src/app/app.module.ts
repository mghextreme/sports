import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchComponent, PageHeaderComponent, RoundRobinComponent, SingleBracketComponent, TitleBarComponent } from './components';
import { EventGroupsPageComponent, EventModalitiesPageComponent, EventPageComponent, GroupPageComponent, HomePageComponent, LoginPageComponent, ManageEventPageComponent, ManageGroupPageComponent, ManageModalityPageComponent, ManagePageComponent, ManagePersonPageComponent, ManageStagePageComponent, MatchPageComponent, ModalityPageComponent } from './pages';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    EventGroupsPageComponent,
    EventModalitiesPageComponent,
    GroupPageComponent,
    HomePageComponent,
    LoginPageComponent,
    ManagePageComponent,
    ManageEventPageComponent,
    ManageGroupPageComponent,
    ManageModalityPageComponent,
    ManagePersonPageComponent,
    ManageStagePageComponent,
    MatchComponent,
    MatchPageComponent,
    ModalityPageComponent,
    PageHeaderComponent,
    RoundRobinComponent,
    SingleBracketComponent,
    TitleBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    ConfirmDialogModule,
    FormsModule,
    TableModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
