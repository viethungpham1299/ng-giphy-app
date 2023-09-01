import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { GifsComponent } from './components/gifs/gifs.component';
import { GifDetailComponent } from './components/gif-detail/gif-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrendingGifsComponent } from './components/gifs/trending-gifs/trending-gifs.component';
import { SearchGifsComponent } from './components/gifs/search-gifs/search-gifs.component';
import { GifsModule } from './components/gifs/gifs.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,

    GifDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GifsModule,
    InfiniteScrollModule,
  ],
  exports: [InfiniteScrollModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
