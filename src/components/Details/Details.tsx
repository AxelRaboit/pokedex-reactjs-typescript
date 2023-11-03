import { useState, useEffect } from "react";
import style from "./Details.module.css";
import { Pokemon } from "../../utils/interface";

interface PokemonDetailsProps {
    pokemon: Pokemon;
}

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
    const [shiny, setShiny] = useState<boolean>(false);

    const handleShiny = () => {
        setShiny(!shiny);
    };

    useEffect(() => {
        setShiny(false);
    }, [pokemon]);

    return (
        <div className={style.container}>
            <div className={style.mainInfos}>
                <h2>{pokemon.name}</h2>
                <button onClick={handleShiny}>
                    {shiny ? "Normal Version" : "Shiny Version"}
                </button>
                {pokemon.sprites.front_default ? (
                    <img
                        src={
                            shiny
                                ? pokemon.sprites.front_shiny
                                : pokemon.sprites.front_default
                        }
                        alt={pokemon.name}
                        className={style.image}
                    />
                ) : (
                    <div className={style.noImage}>No Image</div>
                )}
                <div className={style.types}>
                    {pokemon.types.map((typeEntry) => (
                        <div className={style.type} key={typeEntry.slot}>
                            <span>{typeEntry.type.name}</span>
                        </div>
                    ))}
                </div>
                <div className={style.stats}>
                    {pokemon.stats.map((statEntry) => (
                        <div className={style.stat} key={statEntry.stat.name}>
                            <div className={style.statName}>
                                {statEntry.stat.name}:
                            </div>
                            <div className={style.statValue}>
                                {statEntry.base_stat}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;
