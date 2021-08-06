import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { find } from 'rxjs/operators';
import { AuthService } from './auth.service';

import { LoggerService } from './logger.service';
import { Pokemon } from './pokemon-types';

const storageKey = 'cartPokemons';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private logger: LoggerService,
    private authService: AuthService
  ) {}
  private pokemonCartList = new BehaviorSubject<Pokemon[]>([]);
  PokemonCartList$ = this.pokemonCartList.asObservable();

  public init() {
    this.getStorageCart();
  }
  
  // in a real world app it might be better to add by the name/id instead of the entire object
  public addToCart(pokemon: Pokemon) {
    const currentData = this.pokemonCartList.getValue();
    const newData = [...currentData, pokemon];
    this.pokemonCartList.next(newData);
    this.saveStorageCart(newData);

    this.logger.info(`fetching pokemon: ${pokemon}`);
  }

  private async saveStorageCart(newData: Pokemon[], replaceData?: boolean) {
    this.authService.isLoggedIn$.subscribe((isAuth) => {
      if (!isAuth) return;

      const currentData: Pokemon[] = localStorage.getItem(storageKey)
        ? JSON.parse(localStorage.getItem(storageKey))
        : [];
      const filteredCurrentData = currentData.filter(
        (item) => !newData.find((newItem) => newItem.name == item.name)
      );
      const payload = [...newData, ...(replaceData ? [] : filteredCurrentData)];

      localStorage.setItem(storageKey, JSON.stringify(payload));
    });
  }

  public getStorageCart(): Pokemon[] {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey));
      data ? this.pokemonCartList.next(data) : [];
      return data || [];
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  public clearCart(): void {
    this.pokemonCartList.next([]);
    this.saveStorageCart([], true);
  }

  public removeFromCart(pokemon: Pokemon): void {
    const currentData = this.pokemonCartList.getValue();
    const newData = currentData.filter((item) => item.name != pokemon.name);
    this.pokemonCartList.next(newData);
    this.saveStorageCart(newData, true);
  }

  public checkIsAdded(name: string): Observable<boolean> {
    return this.pokemonCartList.pipe(
      find((pokemons: any) => {
        return !pokemons?.find((pokemon) => pokemon.name == name);
      })
    );
  }
}
