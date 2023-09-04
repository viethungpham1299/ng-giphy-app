import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss'],
})
export class GifDetailComponent implements OnInit {
  gif: any = { id: '', images: { downsized: { url: '' } } };
  subscription!: Subscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value: any) => {
      console.log(value['id']);
      if (!value['id']) this.router.navigate(['/gifs']);
      this.dataService.fetchGIF(value['id']);
      this.subscription = this.dataService.getGIF().subscribe((value: any) => {
        this.gif = value;
      });
    });
  }
}