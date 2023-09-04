import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { RouterModule } from '@angular/router';
import { GifsComponent } from './gifs.component';
@NgModule({
  declarations: [GifsComponent],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [InfiniteScrollModule],
})
export class GifsModule {}
