const OVERNIGHT_TIME_INITIAL = 22
const OVERNIGHT_TIME_FINISHED = 6
const FARE_OVERNIGHT_NOT_SUNDAY = 3.9
const FARE_OVERNIGHT_SUNDAY = 5
const FARE_NOT_OVERNIGHT_SUNDAY = 2.9
const FARE_NOT_OVERNIGHT_NOT_SUNDAY = 2.10
const FARE_INITIAL = 0
const FARE_MIN = 10

function isOvernight(date: Date){
  return date.getHours() >= OVERNIGHT_TIME_INITIAL || date.getHours() <= OVERNIGHT_TIME_FINISHED
}

function isSunday(date: Date){
  return date.getDay() === 0
}

function isDistanceValid(distance: number){
  return distance && typeof distance == "number" && distance > 0
}

function isDateValid(date: Date){
  return date && date instanceof Date && date.toString() !== "Invalid Date"
}

export function calculateRide(segments: {distance: number, date: Date}[]){
  let fare = FARE_INITIAL
  for(const segment of segments){
    if(!isDistanceValid(segment.distance)) throw new Error("Invalid Distance");
    if(!isDateValid(segment.date)) throw new Error("Invalid Date")
    if(isOvernight(segment.date) && !isSunday(segment.date)) fare += segment.distance * FARE_OVERNIGHT_NOT_SUNDAY
    if(isOvernight(segment.date) && isSunday(segment.date)) fare += segment.distance * FARE_OVERNIGHT_SUNDAY
    if(!isOvernight(segment.date) && isSunday(segment.date)) fare += segment.distance * FARE_NOT_OVERNIGHT_SUNDAY
    if(!isOvernight(segment.date) && !isSunday(segment.date)) fare += segment.distance * FARE_NOT_OVERNIGHT_NOT_SUNDAY
  }
  return fare < FARE_MIN ? FARE_MIN : fare
}
