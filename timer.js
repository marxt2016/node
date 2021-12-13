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
  static start(payload) {
    console.log("Start timer", payload.start.payload);
    const momentTo = payload.end.payload;
    const momentFrom = payload.start.payload;
    const interval = 1000;
    let diffTime = momentTo - momentFrom;
    let interv = setInterval(() => {
      diffTime = diffTime - interval;
      if (diffTime < 1000) {
        emitter.emit(payload.end.type, interv);
        return console.log("It's Now!");
      }
      let duration = moment.duration(diffTime);
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
    }, interval);
  }

  static end(payload) {
    clearInterval(payload);
  }
}

emitter.on("start", Handler.start);
emitter.on("end", Handler.end);
emitter.on("error", console.log);
//node timer.js "December 12, 2021 12:23:00"
runTimer(date);
