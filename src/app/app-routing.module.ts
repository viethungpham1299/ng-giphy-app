import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifsComponent } from './components/gifs/gifs.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';

const routes: Routes = [
  {
    path: 'gifs',
    component: GifsComponent,
    // children: [
    //   { path: 'trending', component: TrendingGifsComponent },
    //   { path: 'search/:searchTerm', component: SearchGifsComponent },
    // ],
  },
  { path: 'gif/:id', component: GifDetailComponent },
  { path: '', redirectTo: '/gifs', pathMatch: 'full' },
  // { path: '**', component: TrendingGifsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
