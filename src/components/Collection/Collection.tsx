import { useState } from "react";
import Card from "../Card/Card";
import PokemonDetails from "../Details/Details";
import { Pokemon } from "../../utils/interface";
import style from "./Collection.module.css";

interface Props {
    pokeData: Pokemon[];
}

const PokemonCollection = ({ pokeData }: Props) => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(
        pokeData.length > 0 ? pokeData[0] : null
    );

    const handleCardClick = (pokemon: Pokemon) => {
        if (pokemon) {
            setSelectedPokemon(pokemon);
        }
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
            {selectedPokemon && (
                <div className={style.detailContainer}>
                    <PokemonDetails pokemon={selectedPokemon} />
                </div>
            )}
        </div>
    );
};

export default PokemonCollection;
