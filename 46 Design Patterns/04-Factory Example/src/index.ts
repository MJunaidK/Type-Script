import { RecordHandler } from './loader';

interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}
// in-memory database
interface Database<T extends BaseRecord> {
  get(id: string): T;
  set(newValue: T): void;
}

// Factory Pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }
  }
  return InMemoryDatabase;
}

//const pokemon = new InMemoryDatabase<Pokemon>();
const PokemonDB = createDatabase<Pokemon>();
const pokemon = new PokemonDB();
pokemon.set({
  id: 'Bulbasaur',
  attack: 50,
  defense: 10,
});

console.log(pokemon.get('Bulbasaur'));
