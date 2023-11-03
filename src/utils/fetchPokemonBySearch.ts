import { Pokemon } from "../utils/interface";

export const fetchPokemonBySearch = async (
    inputValue: string,
    setSearchId: (id: number | null) => void,
    setSearchedPokemon: (pokemon: Pokemon | null) => void
) => {
    const numericId = inputValue ? Number(inputValue) : null;
    setSearchId(numericId);

    if (numericId) {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${numericId}`
            );
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            const data = await response.json();
            setSearchedPokemon(data);
        } catch (error) {
            console.error(error);
            setSearchedPokemon(null);
        }
    } else {
        setSearchedPokemon(null);
    }
};