import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AngularMaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "./shared/api.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddPlayerComponent } from "./components/add-player/add-player.component";
import { EditPlayerComponent } from "./components/edit-player/edit-player.component";
import { PlayersListComponent } from "./components/players-list/players-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { JoinGameComponent } from './components/join-game/join-game.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    PlayersListComponent,
    PlayerRankingsComponent,
    JoinGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
