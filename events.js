const EventEmmiter = require("events");
const emitter = new EventEmmiter();

const RequestTypes = [
  {
    type: "send",
    payload: "to send a document",
  },
  {
    type: "receive",
    payload: "to receive a document",
  },
  {
    type: "sign",
    payload: "to sign a document",
  },
];

class Customer {
  constructor({ type, payload }) {
    this.type = type;
    this.payload = payload;
  }
}

const generateIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateNewCustomer = () => {
  const randomIndex = generateIntInRange(0, RequestTypes.length - 1);
  const randomTypeParams = RequestTypes[randomIndex];
  return new Customer(randomTypeParams);
};

const run = async () => {
  const { type, payload } = generateNewCustomer();
  const delay = generateIntInRange(1000, 5000);
  emitter.emit(type, payload);
  await new Promise((resolve) => setTimeout(resolve, delay));
  await run();
};

class Handler {
  static send(payload) {
    console.log("Send request", payload);
  }
  static receive(payload) {
    console.log("Receive request", payload);
  }

  static sign(payload) {
    emitter.emit("error", "Broken!");
    //console.log("Sign request", payload);
  }
}
//run();

// emitter.on("test", () => {
//   console.log("Emit test event");
// });
// emitter.emit("test");

emitter.on("send", Handler.send);
emitter.on("receive", Handler.receive);
emitter.on("sign", Handler.sign);
emitter.on("error", console.log);

run();
