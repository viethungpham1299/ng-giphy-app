import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingGifsComponent } from './trending-gifs/trending-gifs.component';
import { SearchGifsComponent } from './search-gifs/search-gifs.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { RouterModule } from '@angular/router';
import { GifsComponent } from './gifs.component';
@NgModule({
  declarations: [GifsComponent, TrendingGifsComponent, SearchGifsComponent],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [InfiniteScrollModule],
})
export class GifsModule {}
