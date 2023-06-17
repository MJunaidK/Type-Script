import fetch from 'node-fetch';

interface Pokemon {
  species: {
    name: string;
    url: string;
  };
}

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: [
    {
      name: string;
      url: string;
    }
  ];
}

// flyweight pattern: when you have heavyweight resources that you may or may not need and so what you can do is you can basically just camp on the request and only get those pieces of data when you actually need them
function makeURLFlyweights<ReturnType>(urls: Record<string, string>) {
  const myObject: Record<string, Promise<ReturnType>> = {};

  //The Proxy object allows you to create an object that can be used in place of the original object, but which may redefine fundamental Object operations like getting, setting, and defining properties
  return new Proxy(myObject, {
    get: (target, name: string) => {
      console.log(`Fetching ${name} ${urls[name]} `);
      if (!target[name]) {
        target[name] = fetch(urls[name]).then((res) => res.json());
      }
      return target[name];
    },
  });
}

(async function () {
  const pokemon = (await (
    await fetch(`https://pokeapi.co/api/v2/pokemon`)
  ).json()) as PokemonList;

  console.log(pokemon);

  //  create an object that has a relationship between all of the pokemon names and their urls so what we do is we reduce the results

  const urls = pokemon.results.reduce(
    (acc, { name, url }) => ({
      ...acc,
      [name]: url,
    }),
    {}
  );
  console.log(urls);

  //  initially that is going to be a very lightweight object
  const lookup = makeURLFlyweights<Pokemon>(urls);
  //  and it only gets populated with data when you actually request the data that you need
  //const data = lookup.ivysaur;

  const data = await lookup.bulbasaur;
  console.log(data.species);

  const data2 = await lookup.venusaur;
  console.log(data2.species);
})();
