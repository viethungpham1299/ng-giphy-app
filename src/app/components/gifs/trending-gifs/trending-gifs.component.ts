import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.scss'],
})
export class TrendingGifsComponent implements OnInit, OnDestroy {
  gifs: any[] = [];
  subscription!: Subscription;
  throttle = 500;
  offset = 0;
  distance = 1;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // if (!this.dataService.gifs.getValue().length) {
    //   console.log(this.dataService.gifs.getValue());
    // }
    this.dataService.getTrendingGifs();
    this.subscription = this.dataService
      .getGIFs()
      .subscribe((response: any) => {
        console.log(response);
        this.gifs = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setCurrentGIF(gifId: string): void {
    this.dataService.setCurrentGIF(gifId);
  }

  onScroll(): void {
    this.dataService.getTrendingGifs(++this.offset);
    this.dataService.getGIFs().subscribe((response: any) => {
      this.gifs.push(...response);
      console.log(this.gifs);
    });
  }
}
