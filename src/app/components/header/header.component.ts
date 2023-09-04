import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  onHeaderClicked() {
    this.dataService.resetGIFs();
    if (this.router.url !== '/gifs') {
      this.router.navigate(['/gifs']);
    } else {
      window.location.reload();
    }
    // this.router.navigate(['/gifs/']);
  }
}
