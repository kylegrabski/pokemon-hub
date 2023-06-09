export type PokemonData = {
    name: string;
    id: number;
    order: number;
    sprites: any;
    stats: object[];
    types: Array<{ type: { name: string } }>;
    weight: number;
}
