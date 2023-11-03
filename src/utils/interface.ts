export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
        slot: number;
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}