import { Component } from '@angular/core';
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
    // this.router.navigate(['/gifs']);
    console.log(this.dataService.getSearch());
    if (searchTerm.trim()) {
      this.dataService.setSearch(true);
      this.router.navigate([`/gifs/search/${searchTerm}`]);
      // this.dataService.searchGifs(searchTerm);
    } else {
      this.dataService.setSearch(false);
      this.router.navigate(['gifs/trending']);
      // this.dataService.getTrendingGifs();
    }
  }
}
