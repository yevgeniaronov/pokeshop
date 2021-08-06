import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon-types';
import { Observable, Subscription } from 'rxjs';
import { LoggerService } from '../logger.service';
import { CartService } from '../cart.service';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService,
    private cartService: CartService
  ) {}

  addToCart(pokemon: Pokemon): void {
    this.cartService.addToCart(pokemon);
  }

  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemons$ = this.pokemonService.PokemonList$;
  }

  checkIsAdded(pokemon: Pokemon): Observable<boolean> {
    return this.cartService.checkIsAdded(pokemon.name);
  }
}
