import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searched = new EventEmitter<boolean>();
  constructor(private dataService: DataService, private router: Router) {}

  searchTerm = new FormControl('');

  search(searchTerm: string) {
    if (!this.router.routerState.snapshot.url.includes('gifs')) {
      console.log('navigate');
      this.router.navigate(['gifs']);
    }
    this.dataService.resetGIFs();
    if (searchTerm.trim()) {
      this.dataService.setSearch(true);
      this.dataService.searchGifs(searchTerm);
    } else {
      this.dataService.setSearch(false);
      // this.router.navigate(['gifs']);
      // this.dataService.getTrendingGifs();
    }
    this.searchTerm.setValue('');
  }
}
