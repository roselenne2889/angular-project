import { Component, OnInit } from '@angular/core';
import { ApiService, } from "./../../shared/api.service";
import { Player } from "./../../shared/player";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  playerData: any = {};

  constructor(private playerApi: ApiService, private route: ActivatedRoute,) {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      this.playerData = data;
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
