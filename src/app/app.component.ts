import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';
import { AuthService } from './auth.service';
import { PokemonService } from './pokemon.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pokeshop';

  constructor(private logger: LoggerService, private auth: AuthService, private poke: PokemonService, private cartService: CartService) {    
  }

  ngOnInit(): void {
    this.logger.debug('init AppComponent');
    this.bootstrap();
  }

  private bootstrap() {
    this.auth.init();
    this.cartService.init()
    this.poke.init();
  }
}
