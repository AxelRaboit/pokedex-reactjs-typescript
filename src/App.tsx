import { useState, useEffect } from "react";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

const App = () => {
    const [pokeData, setPokeData] = useState<Pokemon[]>([]);
    const [url, setUrl] = useState<string>(
        "https://pokeapi.co/api/v2/pokemon/?limit=5"
    );
    const [nextUrl, setNextUrl] = useState<string>("");
    const [prevUrl, setPrevUrl] = useState<string>("");

    useEffect(() => {
        const fetchPokeData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setNextUrl(data.next);
            setPrevUrl(data.previous);
            const newPokemon = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const response = await fetch(pokemon.url);
                    const data = await response.json();
                    return data;
                })
            );
            setPokeData(newPokemon);
        };
        fetchPokeData();
    }, [url]);

    return (
        <div className="App">
            <PokemonCollection pokeData={pokeData} />
            <div className="pagination">
                <button onClick={() => setUrl(prevUrl)}>Prev</button>
                <button onClick={() => setUrl(nextUrl)}>Next</button>
            </div>
        </div>
    );
}

export default App;
