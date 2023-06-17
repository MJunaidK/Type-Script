// pub-sub mechanism:  create an object you can subscribe to and publish messages into
function createSubscribable<MessageType>() {
  //  set of subscribed functions and that take that message type and  don't return anything
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  //return an object
  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => subscribers.delete(cb); // unsubscribe
    },
    // Publish will take the message and fires it out to all of the different subscribers
    publish(msg: MessageType) {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

type ObservableMessage<T> = {
  target: T; // what changed was this target
  prop: string; // thing that changed was this  property
};
//  Observable<T> : we have an observable which is going to take an initial type which would be the type of that object we're passing in to create the observable

// subscribe: (callback: (data: ObservableMessage<T>) => void) => void; : we're going to create a mechanism that allows us to subscribe to any object so you give it an object and it returns a proxy to you and that object has on an additional subscribe method. subscribe method is going to exactly match subscribe method up here(line 8) except that in this case it's going to take the data that it's going to take is an observable message

type Observable<T> = T & {
  subscribe: (callback: (data: ObservableMessage<T>) => void) => void;
};

function createObservable<DataType>(data: DataType): Observable<DataType> {
  const subscribers = createSubscribable<ObservableMessage<DataType>>();

  //return a new proxy and that new proxy is going to have everything that was in the original object so it's going to have all the data but it's also going to have a subscribe method

  return new Proxy(
    {
      ...data,
      subscribe: subscribers.subscribe,
    },
    {
      set: function (target: any, prop: string, value: any) {
        Reflect.set(target, prop, value);
        subscribers.publish({
          target,
          prop,
        }) as unknown as ObservableMessage<DataType>;
        return true;
      },
    }
  ) as Observable<DataType>;
}

interface Message {
  message1: string;
  message2: string;
}

const target: Message = {
  message1: 'hello',
  message2: 'everyone',
};

const proxy = createObservable<Message>(target);
proxy.subscribe(console.log);
proxy.message1 = 'Junaid';
proxy.message2 = 'khan';
