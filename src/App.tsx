import { useState, useEffect } from "react";
import "./App.css";
import PokemonCollection from "./components/Collection/Collection";
import { Pokemon } from "./utils/interface";
import DetailsBySearch from "./components/DetailsBySearch/DetailsBySearch";
import { fetchPokemonData } from "./utils/fetchPokemon";
import { fetchPokemonBySearch } from "./utils/fetchPokemonBySearch";
import Loading from "./components/Loading/Loading";

const App = () => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [baseUrl, setBaseUrl] = useState<string>(
        "https://pokeapi.co/api/v2/pokemon"
    );
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [numberOfPokemon, setNumberOfPokemon] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showLoadingIndicator, setShowLoadingIndicator] =
        useState<boolean>(false);
    const [searchId, setSearchId] = useState<number | null>(null);
    const [searchedPokemon, setSearchedPokemon] = useState<any>(null);

    useEffect(() => {
        fetchPokemonData(
            baseUrl,
            limit,
            setPokemonData,
            setNextUrl,
            setPrevUrl,
            setNumberOfPokemon,
            setIsLoading,
            setShowLoadingIndicator
        );
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        fetchPokemonBySearch(e.target.value, setSearchId, setSearchedPokemon);
    };

    return (
        <div className="App">
            <h1>Pokemon Collection ({numberOfPokemon})</h1>

            <div className="controls-select">
                <label>
                    Pokemon per page:
                    <select value={limit} onChange={handleLimitChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>

            <div className="controls-input">
                <input
                    type="number"
                    value={searchId || ""}
                    onChange={handleSearch}
                    placeholder="Enter Pokémon ID"
                />
            </div>

            {searchedPokemon && <DetailsBySearch pokemon={searchedPokemon} />}

            <Loading
                isLoading={isLoading}
                showLoadingIndicator={showLoadingIndicator}
            />

            {!isLoading && (
                <>
                    <PokemonCollection pokemonData={pokemonData} />
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
