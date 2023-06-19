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

class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
  private db: Record<string, T> = {};

  public set(newValue: T): void {
    this.db[newValue.id] = newValue;
  }

  public get(id: string): T {
    return this.db[id];
  }
}

const pokemon = new InMemoryDatabase<Pokemon>();
pokemon.set({
  id: 'Bulbasaur',
  attack: 50,
  defense: 10,
});

console.log(pokemon.get('Bulbasaur'));
