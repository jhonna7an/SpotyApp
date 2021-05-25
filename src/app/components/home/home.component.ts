import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  token: string = '';

  constructor(private spotifyService: SpotifyService) { 
    this.loading = true;
    // spotifyService.getNewRealeses()
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     this.nuevasCanciones = data;
    //     this.loading = false;
    //   });  
  }

  ngOnInit(): void {
    this.getNewRealeses();
  }

  async getNewRealeses(){
    (await this.spotifyService.getNewRealeses())
    .subscribe((data: any) => {
      console.log(data);
      this.nuevasCanciones = data;
      this.loading = false;
    });  
  }

}
