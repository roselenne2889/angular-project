import { Player } from "./../../shared/player";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.css"]
})
export class PlayersListComponent implements OnInit {
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "player_name",
    "player_rank",
    "score",
    "time",
    "favorite_game",
    "status",
    "action"
  ];

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}

  adminLogout() {
    this.apiService.AdminLogout();
    this.router.navigateByUrl("/player-rankings");
  }

  deletePlayer(index: number, e) {
    if (window.confirm("Are you sure")) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.apiService.DeletePlayer(e._id).subscribe();
    }
  }
}
