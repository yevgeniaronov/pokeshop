import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon, PokemonsResponse } from './pokemon-types';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private maxItems = 30;

  // API Docs: https://pokeapi.co/docs/v2#pokemon

  constructor(private logger: LoggerService, private httpClient: HttpClient) {}

  public getPokemons(): Observable<Pokemon[]> {
    this.logger.info('fetching pokemons');
    return this.httpClient
      .get<PokemonsResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.maxItems}`
      )
      .pipe(
        mergeMap((res) => {
          const pokemons = res.results.map((res) => this.getPokemon(res.name));
          return forkJoin(pokemons);
        })
      );
  }

  private getPokemon(name: string): Observable<Pokemon> {
    this.logger.info('fetching pokemon');
    return this.httpClient
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        map((res) => {
          return {
            ...res,
            image: res.sprites.front_default
          };
        })
      );
  }
}
