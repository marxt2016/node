//node timer.js "December 31, 2021 12:23:00"

const moment = require("moment");
const EventEmmiter = require("events");
const emitter = new EventEmmiter();
const [date] = process.argv.slice(2);

const EventTypes = [
  {
    type: "start",
    payload: moment(),
  },
  {
    type: "end",
    payload: null,
  },
];

class Timer {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

const generateNewTimer = (date) => {
  return new Timer(EventTypes[0], { type: "end", payload: date });
};

const runTimer = (date) => {
  const newTimer = generateNewTimer(moment(new Date(date)));
  emitter.emit(newTimer.start.type, newTimer);
};

class Handler {
  static async start(payload) {
    console.log("Start timer", payload.start.payload);
    const momentTo = payload.end.payload;
    const momentFrom = payload.start.payload;
    const interval = 1000;
    let diffTime = momentTo - momentFrom;

    await new Promise((resolve) => {
      const interv = setInterval(() => {
        diffTime = diffTime - interval;
        const calculateResult = () => {
          const duration = moment.duration(diffTime);
          console.log(
            "left",
            Math.floor(moment.duration(diffTime).asDays()),
            "Days",
            duration.get("hours"),
            "Hours",
            duration.get("minutes"),
            "Minutes",
            duration.get("seconds"),
            "Seconds"
          );
        };
        if (diffTime < 1000) {
          emitter.emit(payload.end.type, interv);
          console.log("It's now!");
        } else {
          resolve(calculateResult());
        }
      }, interval);
    });
  }

  static end(payload) {
    clearInterval(payload);
  }
}

emitter.on("start", Handler.start);
emitter.on("end", Handler.end);
emitter.on("error", console.log);

//node timer.js "December 31, 2021 12:23:00"
runTimer(date);
