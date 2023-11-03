import { useState, useEffect } from "react";
import "./App.css";
import PokemonCollection from "./components/Collection/Collection";
import { Pokemon } from "./utils/interface";

const App = () => {
    const [pokeData, setPokeData] = useState<Pokemon[]>([]);
    const [baseUrl, setBaseUrl] = useState<string>(
        "https://pokeapi.co/api/v2/pokemon"
    );
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [numberOfPokemon, setNumberOfPokemon] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPokeData = async (url: string) => {
        setIsLoading(true);
        const apiUrl = new URL(url);
        apiUrl.searchParams.set("limit", limit.toString());

        try {
            const response = await fetch(apiUrl.href);
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
            const allPokemon = await fetch(baseUrl);
            const allPokemonData = await allPokemon.json();
            setNumberOfPokemon(allPokemonData.count);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPokeData(baseUrl);
    }, [baseUrl, limit]);

    const handlePagination = (url: string | null) => {
        if (url) {
            setBaseUrl(url);
        }
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);
    };

    return (
        <div className="App">
            <h1>Pokemon Collection ({numberOfPokemon})</h1>

            <div className="controls">
                <label>
                    Items per page:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>

            {isLoading ? (
                <div className="loading-indicator">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <>
                    <PokemonCollection pokeData={pokeData} />
                    <div className="pagination">
                        <button
                            onClick={() => handlePagination(prevUrl)}
                            disabled={!prevUrl}
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => handlePagination(nextUrl)}
                            disabled={!nextUrl}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
