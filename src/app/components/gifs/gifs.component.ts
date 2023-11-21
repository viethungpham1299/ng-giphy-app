import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss'],
})
export class GifsComponent implements OnInit, OnDestroy {
  search = false;
  gifs: any[] = [];
  subscription!: Subscription;
  searchSubscription!: Subscription;
  searchTermSubscription!: Subscription;
  throttle = 500;
  offset = 0;
  distance = 1;
  searchTerm = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchTermSubscription = this.dataService
      .getSearchTerm()
      .subscribe((value: string) => {
        this.searchTerm = value;
        console.log(this.searchTerm);
      });

    this.searchSubscription = this.dataService
      .getSearch()
      .subscribe((searched: boolean) => {
        this.gifs = [];
        this.offset = 0;
        this.search = searched;
        console.log(this.search);
        if (!this.search) {
          this.dataService.getTrendingGifs();
        }
      });

    this.subscription = this.dataService
      .getGIFs()
      .subscribe((response: any) => {
        this.gifs.push(...response);
      });
  }

  ngOnDestroy(): void {
    this.dataService.resetGIFs();
    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.searchTermSubscription.unsubscribe();
    this.dataService.setSearch(false);
    this.dataService.resetGIFs();
  }

  setCurrentGIF(gifId: string): void {
    this.router.navigate([`gif/${gifId}`]);
    // this.dataService.setCurrentGIF(gifId);
  }

  onScroll() {
    if (this.search) {
      this.dataService.searchGifs(this.searchTerm, ++this.offset);
    } else {
      this.dataService.getTrendingGifs(++this.offset);
    }
  }
}
