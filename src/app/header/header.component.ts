import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { LoggerService } from '../logger.service';
import { Pokemon } from '../pokemon-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;

  isLoggedIn = this.auth.isLoggedIn$;

  constructor(
    private auth: AuthService,
    private logger: LoggerService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.logger.debug('init HeaderComponent');
    this.pokemons$ = this.cartService.PokemonCartList$;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
