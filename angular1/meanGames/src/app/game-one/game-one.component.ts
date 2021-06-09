import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../game-list/game-list.component';
@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})

export class GameOneComponent implements OnInit {
gameId!:any;
 games:Game ={} as Game;
 title: any;
 price: any;
 year:any;
 rate:any;
 minAge:any;
 minPlayers:any;
 maxPlayers:any;
 designers:any;
  constructor(private data :GamesDataService, private route :ActivatedRoute) { }

  ngOnInit(): void {
    const gameId:any =this.route.snapshot.params.gameId;
    this.getgame(gameId);
  }
public getgame(gameId:any){
this.data.getOneGame(gameId).then(response=>this.games=response).catch(err=>console.log(err));
}

public deleteOneGame(gameId:any){
  this.data.deleteOneGame(gameId).then(response =>this.games=response)
  location.reload();
 }
}
