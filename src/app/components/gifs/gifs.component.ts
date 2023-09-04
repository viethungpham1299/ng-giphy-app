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
  throttle = 500;
  offset = 0;
  distance = 1;
  searchTerm = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onTrending() {
    this.dataService.getTrendingGifs();
  }

  ngOnInit(): void {
    this.dataService.getSearchTerm().subscribe((value: string) => {
      this.searchTerm = value;
    });
    if (this.router.routerState.snapshot.url.includes('search/')) {
      this.dataService.setSearch(true);
    }
    this.dataService.getSearch().subscribe((searched: boolean) => {
      this.gifs = [];
      this.offset = 0;
      this.search = searched;
      if (!this.search) {
        this.onTrending();
      }
    });
    this.subscription = this.dataService
      .getGIFs()
      .subscribe((response: any) => {
        this.gifs.push(...response);
      });
  }

  ngOnDestroy(): void {
    this.dataService.gifs.next([]);
    this.subscription.unsubscribe();
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
