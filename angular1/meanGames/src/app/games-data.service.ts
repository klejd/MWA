import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import {Game} from "./game-list/game-list.component"
import {GameOneComponent } from './game-one/game-one.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
private  baseUrl: string = "http://localhost:3000/api";
  constructor(private http:HttpClient) { }

getOneGame(gameId:any):Promise<Game>{
  const url = this.baseUrl+ "/games/"+gameId;
  return this.http.get(url).toPromise().then(this.viewone).catch(this.errv);
}
private viewone(response:any):Game{
  return response as Game;
 }
 private errv(err:any):Game{
   return err;
 
 }
  addOne(onegame:any):Promise<Game>{
    const url:string = this.baseUrl+"/games/";
    //dont forget to pass url.
    const headers = { 'content-type': 'application/json'}  
    // const body=JSON.stringify(onegame);
    // console.log(bod)
    return this.http.post(url,onegame,{headers}).toPromise().then(this.viewone).catch(this.errv)
  }
deleteOneGame(gameId:any): Promise<Game>{
  const deleteEndpoint: string = this.baseUrl+"/games/"+gameId;
 
  return this.http.delete(deleteEndpoint).toPromise().then(this.deleted).catch(this.couldntdelete);
}

private deleted(response:any):Game{
 return response as Game;
}
private couldntdelete(err:any):Game{
  return err;

}
public getGames(): Promise<Game[]>{

  const url: string = this.baseUrl+"/games";
  

  return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
}
private handleError(error:any):Game[]{
  console.log(error);
  return [];
}
private gotGames(Response:any):Game[]{
  return Response as Game[];
  
}
}
////1-bulid an url
//2 tell http service to make a request
//3- convert the Observable to a promise
//4- convert the respose to json
//5- return response
//6- catch and handle errors