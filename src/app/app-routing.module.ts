import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifsComponent } from './components/gifs/gifs.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';
import { TrendingGifsComponent } from './components/gifs/trending-gifs/trending-gifs.component';
import { SearchGifsComponent } from './components/gifs/search-gifs/search-gifs.component';

const routes: Routes = [
  {
    path: 'gifs',
    component: GifsComponent,
    children: [
      { path: 'trending', component: TrendingGifsComponent },
      { path: 'search/:searchTerm', component: SearchGifsComponent },
    ],
  },
  { path: 'gif/:id', component: GifDetailComponent },
  { path: '', redirectTo: '/gifs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
