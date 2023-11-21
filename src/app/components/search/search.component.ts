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
  constructor(private dataService: DataService, private router: Router) {}

  searchTerm = new FormControl('');

  search(searchTerm: string) {
    // If not in gifs page, navigate to 'gifs'
    if (!this.router.routerState.snapshot.url.includes('gifs')) {
      this.router.navigate(['gifs']);
    }
    // Reset current GIFs to fetch new GIFs
    this.dataService.resetGIFs();
    if (searchTerm.trim()) {
      this.dataService.setSearch(true);
      this.dataService.searchGifs(this.searchTerm.value!);
      this.dataService.setSearchTerm(this.searchTerm.value!);
    } else {
      this.dataService.setSearch(false);
      this.dataService.getTrendingGifs();
    }
    // this.searchTerm.setValue('');
  }
}
