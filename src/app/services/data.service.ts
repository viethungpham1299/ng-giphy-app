import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map } from 'rxjs';

enum API {
  baseUrl = 'https://api.giphy.com/v1/gifs',
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // GIF list, using BehaviorSubject because we only need the newest list.
  private gifs = new BehaviorSubject<any>([]);
  private currentGIF = new BehaviorSubject<any>({});
  private search = new BehaviorSubject<boolean>(false);
  private searchTerm = new BehaviorSubject('');

  constructor(private httpClient: HttpClient) {}

  // fetch trending GIFs by sending request to GIPHY's trending api

  getTrendingGifs(offset?: number) {
    return this.httpClient
      .get(
        `${API.baseUrl}/trending?api_key=${
          environment.giphyApiKey
        }&limit=20&offset=${offset ? offset * 20 : 0}`
      )
      .subscribe((response: any) => {
        if (response.data) {
          this.gifs.next(response.data);
        }
      });
  }

  resetGIFs() {
    this.gifs.next([]);
  }

  // use GIPHY's search api to fetch new GIF list
  searchGifs(searchTerm: string, offset?: number) {
    this.searchTerm.next(searchTerm);
    return this.httpClient
      .get(
        `${API.baseUrl}/search?api_key=${
          environment.giphyApiKey
        }&q=${searchTerm}&limit=20&offset=${offset ? offset * 20 : 0}`
      )
      .subscribe((response: any) => {
        if (response.data) {
          this.gifs.next(response.data);
        }
      });
  }

  // return gifs as an Observable
  getGIFs() {
    return this.gifs.asObservable();
  }

  setCurrentGIF(gifId: string) {
    this.currentGIF.next(
      this.gifs.getValue().find((gif: any) => gif.id === gifId)
    );
  }

  fetchGIF(gifId: string) {
    return this.httpClient
      .get(`${API.baseUrl}/${gifId}?api_key=${environment.giphyApiKey}`)
      .subscribe((response: any) => {
        if (response.data) {
          this.currentGIF.next(response.data);
        }
      });
  }

  getCurrentGIF() {
    return this.currentGIF.asObservable();
  }

  unselectGIF() {
    this.currentGIF.next({});
  }

  setSearch(searched: boolean) {
    this.search.next(searched);
  }

  getSearch() {
    return this.search.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    console.log(searchTerm);
    this.searchTerm.next(searchTerm);
  }

  resetSearchTerm() {
    this.searchTerm.next('');
  }

  getSearchTerm() {
    return this.searchTerm.asObservable();
  }
}
