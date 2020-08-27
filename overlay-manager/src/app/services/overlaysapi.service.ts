import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Overlay } from './../components/overlays/overlay';


@Injectable({ providedIn: 'root' })
export class OverlaysApiService {

  private overlayesUrl = 'http://localhost:3001/api/overlays';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET overlayes from the server */
  getOverlays(): Observable<Overlay[]> {
    return this.http.get<Overlay[]>(this.overlayesUrl)
      .pipe(
        tap(_ => this.log('fetched overlayes')),
        catchError(this.handleError<Overlay[]>('getOverlays', []))
      );
  }

  /** GET overlay by id. Return `undefined` when id not found */
  getOverlayNo404<Data>(id: number): Observable<Overlay> {
    const url = `${this.overlayesUrl}/?id=${id}`;
    return this.http.get<Overlay[]>(url)
      .pipe(
        map(overlayes => overlayes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} overlay id=${id}`);
        }),
        catchError(this.handleError<Overlay>(`getOverlay id=${id}`))
      );
  }

  /** GET overlay by id. Will 404 if id not found */
  getOverlay(id: number): Observable<Overlay> {
    const url = `${this.overlayesUrl}/${id}`;
    return this.http.get<Overlay>(url).pipe(
      tap(_ => this.log(`fetched overlay id=${id}`)),
      catchError(this.handleError<Overlay>(`getOverlay id=${id}`))
    );
  }

  /* GET overlayes whose name contains search term */
  searchOverlayes(term: string): Observable<Overlay[]> {
    if (!term.trim()) {
      // if not search term, return empty overlay array.
      return of([]);
    }
    return this.http.get<Overlay[]>(`${this.overlayesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found overlayes matching "${term}"`) :
         this.log(`no overlayes matching "${term}"`)),
      catchError(this.handleError<Overlay[]>('searchOverlayes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new overlay to the server */
  addOverlay(overlay: Overlay): Observable<Overlay> {
    return this.http.post<Overlay>(this.overlayesUrl, overlay, this.httpOptions).pipe(
      tap((newOverlay: Overlay) => this.log(`added overlay w/ id=${newOverlay.id}`)),
      catchError(this.handleError<Overlay>('addOverlay'))
    );
  }

  /** DELETE: delete the overlay from the server */
  deleteOverlay(overlay: Overlay | number): Observable<Overlay> {
    const id = typeof overlay === 'number' ? overlay : overlay.id;
    const url = `${this.overlayesUrl}/${id}`;

    return this.http.delete<Overlay>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted overlay id=${id}`)),
      catchError(this.handleError<Overlay>('deleteOverlay'))
    );
  }

  /** PUT: update the overlay on the server */
  updateOverlay(overlay: Overlay): Observable<any> {
    return this.http.put(this.overlayesUrl, overlay, this.httpOptions).pipe(
      tap(_ => this.log(`updated overlay id=${overlay.id}`)),
      catchError(this.handleError<any>('updateOverlay'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a OverlayService message with the MessageService */
  private log(message: string) {
    console.log("OverlayService: ${message}");
  }
}