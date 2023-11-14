import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`add hero : ${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
      );
  }
    
    
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updateHero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
        );
  }

  deleteHero(id: number): Observable<Hero> {
    const heroUrl = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(heroUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log(`delete hero : id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
      
  getHeroes(): Observable<Hero[]> {
        
        // const heroes = of(HEROES);
        // this.log('fetched heroes');
    // return heroes;
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(cHero => cHero.id === id)!;
    // this.log(`fetched hero id=${id}`);
    // return of(hero);
    const heroUrl = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(heroUrl)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  /* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
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

}
