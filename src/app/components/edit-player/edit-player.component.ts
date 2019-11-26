import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { ApiService } from "./../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface favoriteGame {
  name: string;
}

@Component({
  selector: "app-edit-player",
  templateUrl: "./edit-player.component.html",
  styleUrls: ["./edit-player.component.css"]
})
export class EditPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // @ViewChild('chipList') chipList;
  //ViewChild('resetPlayerForm') myNgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  favGameArray: favoriteGame[] = [];
  statusArray: any = ["Available", "Unavailable"];
  rankArray: any = [1, 2, 3, 4, 5, 6, 7, 8, , 10];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get("id");
    this.playerApi.GetPlayer(id).subscribe(data => {
      console.log(data.favoriteGame);
      this.favGameArray = data.favoriteGame;
      this.playerForm = this.fb.group({
        player_name: [data.player_name, [Validators.required]],
        player_rank: [data.player_rank, [Validators.required]],
        score: [data.score, [Validators.required]],
        favoriteGame: [data.favoriteGame],
        time: [data.time, [Validators.required]],
        status: [data.status]
      });
    });
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player_name: ["", [Validators.required]],
      player_rank: ["", [Validators.required]],
      score: ["", [Validators.required]],
      favoriteGame: [this.favGameArray],
      time: ["", [Validators.required]],
      status: [this.statusArray]
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || "").trim() && this.favGameArray.length < 5) {
      this.favGameArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /* Remove dynamic languages */
  remove(favorite_game: favoriteGame): void {
    const index = this.favGameArray.indexOf(favorite_game);
    if (index >= 0) {
      this.favGameArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    // this.studentForm.get('dob').setValue(convertDate, {
    //   onlyself: true
    // })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm.value);
    var id = this.actRoute.snapshot.paramMap.get("id");
    if (window.confirm("Are you sure you want to update?")) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl("/players-list"));
      });
    }
  }
}
