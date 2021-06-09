import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GamesDataService } from '../games-data.service';
export class Game{
  _id! :any;
  title!:string ;
  year!:number;
  rate!:number;
  price!:number;
  maxPlayers!:number;
  minPlayers!:number;
  designers!:any

}
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})

export class GameListComponent implements OnInit {

  constructor(private data:GamesDataService) { }
   public games!:Game[];
   public deletegame!:Game;
   public savegame!:Game;
   title: any;
   price: any;
   year:any;
   rate:any;
   minAge:any;
   minPlayers:any;
   maxPlayers:any;
   designers:any;
   public deleteOneGame(gameId:any){
    this.data.deleteOneGame(gameId).then(response =>this.deletegame=response)
    location.reload();
   }
  private getgames(){
    this.data.getGames().then(response=>this.games=response)
  }
  

  filterTerm!: string;

public  onSubmit(form:NgForm){
  console.log(this.title);
console.log(form.value);
let  game: any ={
title: this.title,
price: this.price,
year: this.year,
rate: this.rate,
minAge:this.minAge,
minPlayers: this.minPlayers,
maxPlayers: this.maxPlayers,
designers: this.designers
}
// const body=JSON.stringify(game);
// console.log(body);
this.data.addOne(game).then(response =>this.savegame=response);
 }
  ngOnInit(): void {
 
this.getgames();

}
}
