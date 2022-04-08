import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchComponent, PageHeaderComponent, RoundRobinComponent, SingleBracketComponent, TitleBarComponent } from './components';
import { EventGroupsPageComponent, EventModalitiesPageComponent, EventPageComponent, GroupPageComponent, HomePageComponent, LoginPageComponent, ManageEventPageComponent, ManageGroupPageComponent, ManageModalityPageComponent, ManagePageComponent, ManagePersonPageComponent, MatchPageComponent, ModalityPageComponent } from './pages';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EventPageComponent,
    EventGroupsPageComponent,
    EventModalitiesPageComponent,
    GroupPageComponent,
    LoginPageComponent,
    ManagePageComponent,
    ManageEventPageComponent,
    ManageGroupPageComponent,
    ManageModalityPageComponent,
    ManagePersonPageComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
