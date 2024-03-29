// functions creating functions
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger('Your string');

// functions creating a class

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = '';
    log(str: string) {
      console.log(str);
      this.completeLog += str + '\n';
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log('Foo');
console.log(logger2.dumpLog());

// functions creating a generic class

function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();
const sbd1 = new StringDatabase();
sbd1.set('a', 'hello');

// mixin function

// we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.
type Constructor<T> = new (...args: any[]) => T;

function Dumpable<T extends Constructor<{ getObject(): object }>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sbd2 = new DumpableStringDatabase();
sbd2.set('junaid', 'hello junaid');
sbd2.dump();
