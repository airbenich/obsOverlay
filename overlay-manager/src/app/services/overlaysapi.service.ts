import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IOverlay } from '../models/ioverlay';

@Injectable({ providedIn: 'root' })
export class OverlaysApiService {

  private overlaysApiUrl = 'http://localhost:3001/api/overlays/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET overlayes from the server */
  getOverlays(): Observable<IOverlay[]> {
    return this.http.get<IOverlay[]>(this.overlaysApiUrl)
      .pipe(
        tap(_ => this.log('fetched overlayes')),
        catchError(this.handleError<IOverlay[]>('getOverlays', []))
      );
  }

  /** GET overlay by id. Return 'undefined' when id not found */
  getOverlayNo404<Data>(id: number): Observable<IOverlay> {
    const url = '${this.overlaysApiUrl}/?id=${id}';
    return this.http.get<IOverlay[]>(url)
      .pipe(
        map(overlayes => overlayes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log('${outcome} overlay id=${id}');
        }),
        catchError(this.handleError<IOverlay>('getOverlay id=${id}'))
      );
  }

  /** GET overlay by id. Will 404 if id not found */
  getOverlay(id: number): Observable<IOverlay> {
    const url = '${this.overlaysApiUrl}/${id}';
    return this.http.get<IOverlay>(url).pipe(
      tap(_ => this.log('fetched overlay id=${id}')),
      catchError(this.handleError<IOverlay>('getOverlay id=${id}'))
    );
  }

  /* GET overlayes whose name contains search term */
  searchOverlayes(term: string): Observable<IOverlay[]> {
    if (!term.trim()) {
      // if not search term, return empty overlay array.
      return of([]);
    }
    return this.http.get<IOverlay[]>('${this.overlaysApiUrl}/?name=${term}').pipe(
      tap(x => x.length ?
         this.log('found overlayes matching "${term}"') :
         this.log('no overlayes matching "${term}"')),
      catchError(this.handleError<IOverlay[]>('searchOverlayes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new overlay to the server */
  addOverlay(overlay: IOverlay): Observable<IOverlay> {
    return this.http.post<IOverlay>(this.overlaysApiUrl, overlay, this.httpOptions).pipe(
      tap((newOverlay: IOverlay) => this.log('added overlay w/ id=${newOverlay.id}')),
      catchError(this.handleError<IOverlay>('addOverlay'))
    );
  }

  /** DELETE: delete the overlay from the server */
  deleteOverlay(overlay: IOverlay | number): Observable<IOverlay> {
    const id = typeof overlay === 'number' ? overlay : overlay.id;
    const url = '${this.overlaysApiUrl}/${id}';

    return this.http.delete<IOverlay>(url, this.httpOptions).pipe(
      tap(_ => this.log('deleted overlay id=${id}')),
      catchError(this.handleError<IOverlay>('deleteOverlay'))
    );
  }

  /** PUT: update the overlay on the server */
  updateOverlay(overlay: IOverlay): Observable<any> {
    return this.http.put(this.overlaysApiUrl+overlay.id, overlay, this.httpOptions).pipe(
      tap(_ => this.log('updated overlay id=${overlay.id}')),
      catchError(this.handleError<any>('updateOverlay'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log('${operation} failed: ${error.message}');
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log("OverlayService: ${message}");
  }
}
