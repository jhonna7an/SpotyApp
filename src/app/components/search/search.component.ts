import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;

  constructor(private spotifyService: SpotifyService) {
    this.loading = false;
   }

  ngOnInit(): void {
  }

  async buscar(termino: string){
    this.loading = true;
    (await this.spotifyService.getArtistas(termino))
      .subscribe((data: any) => {
        console.log(data);
        this.artistas = data;
        this.loading = false;
      });
  }

}
