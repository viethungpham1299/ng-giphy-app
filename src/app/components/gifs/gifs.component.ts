import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss'],
})
export class GifsComponent implements OnInit, OnDestroy {
  gifs: any[] = [];
  subscription!: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.children.length)
      this.router.navigate(['/gifs/trending']);
    // if (!this.dataService.getSearch()) this.router.navigate(['/gifs/trending']);
  }

  ngOnDestroy(): void {}
}
