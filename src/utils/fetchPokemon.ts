import { Pokemon } from "../utils/interface";

export const fetchPokemonData = async (
    url: string,
    limit: number,
    setPokeData: (pokemon: Pokemon[]) => void,
    setNextUrl: (url: string | null) => void,
    setPrevUrl: (url: string | null) => void,
    setNumberOfPokemon: (count: number) => void,
    setIsLoading: (loading: boolean) => void,
    setShowLoadingIndicator: (show: boolean) => void
) => {
    setIsLoading(true);
    let loadingTimeout = setTimeout(() => setShowLoadingIndicator(true), 200);

    try {
        const apiUrl = new URL(url);
        apiUrl.searchParams.set("limit", limit.toString());

        const response = await fetch(apiUrl.href);
        const data = await response.json();
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        const newPokemon = await Promise.all(
            data.results.map(async (pokemon: any) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            })
        );
        setPokeData(newPokemon);

        const allPokemonResponse = await fetch(url);
        const allPokemonData = await allPokemonResponse.json();
        setNumberOfPokemon(allPokemonData.count);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    } finally {
        clearTimeout(loadingTimeout);
        setIsLoading(false);
        setShowLoadingIndicator(false);
    }
};
