import { Pokemon } from "../../utils/interface";
import style from "./Card.module.css";
interface CardProps {
    onClick?: () => void;
    pokemon: Pokemon;
}

const Card = ({ pokemon, onClick }: CardProps) => {
    return (
        <div className={style.card} onClick={onClick}>
            <div className={style.cardImage}>
                {
                    pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                }
            </div>
            <div className={style.cardBody}>
                <span># {pokemon.id}</span>
                <h3>{pokemon.name}</h3>
            </div>
        </div>
    );
};

export default Card;
