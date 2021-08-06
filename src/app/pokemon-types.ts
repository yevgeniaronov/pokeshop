export class PokemonsResponse {
    results: Pokemon[];
}

interface Sprites {
    front_default: string;
}
export class Pokemon {
    name: string;
    image: string;
    sprites: Sprites
}
