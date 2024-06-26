import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@food-stories/users-client/shared/config';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage} from '@angular/fire/storage'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { appRoutes } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { ProfileHttpService } from '@food-stories/users-client/shared/data-access';
import { AppEffects, appInitFactory, appReducer } from '@food-stories/users-client/shared/app-init';
import { authInterceptorProvider } from '@food-stories/users-client/auth/utils';
import { NotificationsWebsocket } from './websocket.service';
import { SocketIoModule } from 'ngx-socket-io';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    MatProgressBarModule,
    HttpClientModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot(
      {app: appReducer, router: routerReducer},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument({connectInZone: true}): [],
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    SocketIoModule.forRoot({url: environment.socketUrl,  options: {}})
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      multi: true,
      deps: [Auth, Store]
    },
    authInterceptorProvider,
    ProfileHttpService,
    NotificationsWebsocket
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
