import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.scss'],
})
export class TrendingGifsComponent implements OnInit, OnDestroy {
  gifs: any[] = [];
  subscription!: Subscription;
  throttle = 500;
  offset = 1;
  distance = 1;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    // if (!this.dataService.gifs.getValue().length) {
    //   console.log(this.dataService.gifs.getValue());
    // }
    this.dataService.getTrendingGifs();
    this.subscription = this.dataService
      .getGIFs()
      .subscribe((response: any) => {
        this.gifs.push(...response);
        console.log(this.gifs);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setCurrentGIF(gifId: string): void {
    console.log(gifId);
    this.router.navigate([`gif/${gifId}`]);
    this.dataService.setCurrentGIF(gifId);
  }

  onScroll() {
    this.dataService.getTrendingGifs(++this.offset);
  }
}
