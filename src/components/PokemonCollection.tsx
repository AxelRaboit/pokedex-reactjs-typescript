import { useState } from "react";
import Card from "./Card";
import PokemonDetails from "./PokemonDetails";
import { Pokemon } from "../interface";
import style from "./PokemonCollection.module.css";

interface Props {
    pokeData: Pokemon[];
}

const PokemonCollection = ({ pokeData }: Props) => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(
        null
    );

    const handleCardClick = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    return (
        <div className={style.container}>
            <div className={style.cardContainer}>
                {pokeData.map((pokemon: Pokemon) => (
                    <Card
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => handleCardClick(pokemon)}
                    />
                ))}
            </div>
            {selectedPokemon ? (
                <div className={style.detailContainer}>
                    <PokemonDetails pokemon={selectedPokemon} />
                </div>
            ) : (
                <div className={style.detailContainer}>
                    Sélectionnez un Pokémon pour voir les détails.
                </div>
            )}
        </div>
    );
};

export default PokemonCollection;
