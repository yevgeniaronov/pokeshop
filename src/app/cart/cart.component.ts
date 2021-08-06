import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../animations';
import { CartService } from '../cart.service';
import { Pokemon } from '../pokemon-types';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fadeAnimation]
})
export class CartComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;

  constructor(private cartService: CartService) {}

  removeFromCart(pokemon: Pokemon): void {
    this.cartService.removeFromCart(pokemon);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  ngOnInit(): void {
    this.pokemons$ = this.cartService.PokemonCartList$;
  }
}
