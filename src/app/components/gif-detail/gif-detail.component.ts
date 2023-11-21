import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss'],
})
export class GifDetailComponent implements OnInit, OnDestroy {
  gif: any = { id: '', images: { downsized: { url: '' } } };
  subscription!: Subscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value: any) => {
      this.dataService.fetchGIF(value['id']);
      this.subscription = this.dataService
        .getCurrentGIF()
        .subscribe((value: any) => {
          this.gif = value;
        });
    });
  }

  ngOnDestroy(): void {
    this.dataService.unselectGIF();
    this.subscription.unsubscribe();
  }
}
