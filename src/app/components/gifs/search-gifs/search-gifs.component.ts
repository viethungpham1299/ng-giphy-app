import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-gifs',
  templateUrl: './search-gifs.component.html',
  styleUrls: ['./search-gifs.component.scss'],
})
export class SearchGifsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  gifs: any[] = [];
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.searchTerm = data['searchTerm'];
      this.dataService.searchGifs(this.searchTerm);
      this.subscription = this.dataService
        .getGIFs()
        .subscribe((response: any) => {
          this.gifs = response;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setCurrentGIF(gifId: string): void {
    this.dataService.setCurrentGIF(gifId);
  }
}
