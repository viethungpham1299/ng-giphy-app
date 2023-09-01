import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss'],
})
export class GifDetailComponent implements OnInit {
  gif: any = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCurrentGif().subscribe((gif: any) => {
      this.gif = gif;
    });
    console.log(this.gif);
  }
}
