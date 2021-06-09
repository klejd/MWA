import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// import{HeaderComponent} from './app.component'
import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameOneComponent } from './game-one/game-one.component';
import { FormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { GamesDataService } from './games-data.service';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameOneComponent,
    // HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    // AppRoutingModule
    RouterModule.forRoot([{
      path:"game/:gameId",
      component:GameOneComponent
    },
  {
    path:"games",
    component:GameListComponent
  }])
  ],
  providers: [{provide: LocationStrategy,useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
