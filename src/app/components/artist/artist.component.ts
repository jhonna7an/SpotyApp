import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {
    this.loading = true;
    this.router.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
   }

   async getArtista(id: string){
     this.loading = true;
     const observable = await this.spotify.getArtista(id);
     observable.subscribe(data => {
          this.artista = data;
          this.loading = false;
        })
   }

   async getTopTracks(id: string){
     const obs = await this.spotify.getTopTracks(id);
     obs.subscribe(data => {
        this.topTracks = data;
      })
   }
}
