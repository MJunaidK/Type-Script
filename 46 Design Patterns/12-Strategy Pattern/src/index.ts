import { RecordHandler } from './loader';

// Observer

type Listener<EventType> = (ev: EventType) => void;

//  this function going to give us a little object that we can then use to publish and subscribe to
//  going to maintain a list of observers and allow us to publish and subscribe from that list
function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  // closure in javascript
  let listeners: Listener<EventType>[] = [];
  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => listeners.filter((l) => l !== listener); // unsubscrbing
    },
    publish(event: EventType) {
      listeners.forEach((l) => l(event));
    },
  };
}

// Before you set a value and after you set a value you're going to get an event
interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

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
  get(id: string): T | undefined;
  set(newValue: T): void;
  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
  visit(visitor: (item: T) => void): void;
  selectBest(scoreStrategy: (item: T) => number): T | undefined;
}

// Factory Pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    private constructor() {}

    public set(newValue: T): void {
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id],
      });
      this.db[newValue.id] = newValue;

      this.afterAddListeners.publish({ value: newValue });
    }

    public get(id: string): T {
      return this.db[id];
    }
    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    // Visitor
    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
    }

    // strategy
    selectBest(scoreStrategy: (item: T) => number): T | undefined {
      const found: {
        max: number;
        item: T | undefined;
      } = {
        max: 0,
        item: undefined,
      };

      Object.values(this.db).reduce((f, item) => {
        const score = scoreStrategy(item);
        if (score > f.max) {
          f.max = score;
          f.item = item;
        }
        return f;
      }, found);

      return found.item;
    }
  }
  //return InMemoryDatabase;

  // Singleton
  // const db = new InMemoryDatabase();
  // return db;
  return InMemoryDatabase;
}
const pokemonDB = createDatabase<Pokemon>();
//const pokemon = new InMemoryDatabase<Pokemon>();
//const pokemon = new PokemonDB();

/*pokemonDB.set({
  id: 'Bulbasaur',
  attack: 50,
  defense: 10,
});

console.log(pokemon.get('Bulbasaur'));*/
const unsubscribe = pokemonDB.instance.onAfterAdd(
  (value: AfterSetEvent<Pokemon>) => console.log(value)
);

pokemonDB.instance.set({
  id: 'Bulbasaur',
  attack: 50,
  defense: 50,
});

unsubscribe();

pokemonDB.instance.set({
  id: 'Spinosaur',
  attack: 100,
  defense: 20,
});
//console.log(pokemonDB.instance.get('Bulbasaur'));

pokemonDB.instance.visit((item) => {
  console.log(item.id);
});

const bestDefensive = pokemonDB.instance.selectBest((item) => item.defense);
const bestAttack = pokemonDB.instance.selectBest((item) => item.attack);

/* 
// Object destructuring
const bestDefensive = pokemonDB.instance.selectBest(
  ({ defense }) => defense
);
const bestAttack = pokemonDB.instance.selectBest(({attack}) => attack);*/
console.log(`Best defense = ${bestDefensive?.id}`);
console.log(`Best Attack = ${bestAttack?.id}`);
