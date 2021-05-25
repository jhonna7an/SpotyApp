import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private token: string = '';

  constructor(private http: HttpClient) { }

  async getQuery(query: string){
    this.token = !this.token ? await this.getToken() : this.token;
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(url, {headers});
  }

  async getNewRealeses(){
    const observable = await this.getQuery('browse/new-releases');
    return observable.pipe(map((data: any) => data.albums.items));
  }

  async getArtistas(termino: string){
    const observable = await this.getQuery(`search?q=${termino}&type=artist`);
    return observable.pipe(map((data: any) => data.artists.items));
  }

  async getArtista(id: string){
    return await this.getQuery(`artists/${id}`);
  }
  
  async getTopTracks(id: string){
    const observable = await this.getQuery(`artists/${id}/top-tracks?country=us`);
    return observable.pipe(map((data: any) => data.tracks));
  }

  getToken() {
    const client_id = 'ee598244a4b44a6eb455522f0c15561f';
    const client_secret = '0dba902378204f329ac0c4e78658f3cb';
 
    const url = `https://spotify-get-token.herokuapp.com/spotify/${client_id}/${client_secret}`;
    const prom =  this.http.get(url).toPromise().then((data: any) => data.access_token);
    return prom;
  }
}
