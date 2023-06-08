import fetch from 'node-fetch';

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

function fetchPokemon(url: string, cb: (data: PokemonResults) => void): void;
function fetchPokemon(url: string): Promise<PokemonResults>;
function fetchPokemon(
  url: string,
  cb?: (data: PokemonResults) => void
): unknown {
  if (cb) {
    fetch(url)
      .then((resp) => resp.json())
      .then(cb);
    return undefined;
  } else {
    return fetch(url).then((resp) => resp.json());
  }
}

// Using fetch
fetchPokemon(
  'https://pokeapi.co/api/v2/pokemon?limit=10',
  (data: PokemonResults) => {
    data.results.forEach((pokemon) => console.log(pokemon));
  }
);

// Using promise
(async function () {
  const data = <PokemonResults>(
    await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')
  );
  data.results.forEach((pokemon) => console.log(pokemon));
})();
