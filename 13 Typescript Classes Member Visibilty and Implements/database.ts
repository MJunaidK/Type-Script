interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
  // Member visibility
  protected db: Record<string, string> = {};
  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new InMemoryDatabase();
myDB.set('foo', 'bar');
//myDB.db['foo'] = 'baz';
console.log(myDB.get('foo'));

const myDB1 = new PersistentMemoryDB();
myDB1.set('foo', 'bar');
const saved = myDB1.saveToString();
myDB1.set('foo', 'db1-bar');
console.log(myDB1.get('foo'));

const myDB2 = new PersistentMemoryDB();
myDB2.restoreFromString(saved);
console.log(myDB2.get('foo'));
