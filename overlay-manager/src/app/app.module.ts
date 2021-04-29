import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { OverlayListComponent } from './components/home/overlay-list/overlay-list.component';
import { StatusComponent } from './components/status/status.component';
import { OverlayEditComponent } from './components/home/overlay-edit/overlay-edit.component';
import { ButtonTileComponent } from './shared/components/button-tile/button-tile.component';
import { HeaderComponent } from './components/header/header.component';
import { ToggleSwitchComponent } from './shared/components/toggle-switch/toggle-switch.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayPreviewComponent } from './components/home/overlay-preview/overlay-preview.component';
import { OverlayLiveControlComponent } from './components/home/overlay-live-control/overlay-live-control.component';
import { ModalModule } from './shared/components/modal/index';

const port = 3000;
const host = 'localhost';
const authCode = 'sDJZn16TuP7zu82a';

const config: SocketIoConfig = {
  url: 'http://' + host + ':' + port,
  options: {
    query: 'authentication=' + authCode,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    OverlayListComponent,
    StatusComponent,
    OverlayEditComponent,
    ButtonTileComponent,
    HeaderComponent,
    ToggleSwitchComponent,
    OverlayPreviewComponent,
    OverlayLiveControlComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
    }),
    SocketIoModule.forRoot(config),
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
