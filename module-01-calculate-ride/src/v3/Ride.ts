import { Segment } from './Segment'

export class Ride {
  segments: Segment[]
  FARE_OVERNIGHT_NOT_SUNDAY = 3.9
  FARE_OVERNIGHT_SUNDAY = 5
  FARE_NOT_OVERNIGHT_SUNDAY = 2.9
  FARE_NOT_OVERNIGHT_NOT_SUNDAY = 2.10
  FARE_INITIAL = 0
  FARE_MIN = 10

  constructor(segments: Segment[]){
    this.segments = segments
  }

  calculate(){
    let fare = this.FARE_INITIAL
    for(const segment of this.segments){
      if(!segment.isDistanceValid()) throw new Error("Invalid Distance");
      if(!segment.isDateValid()) throw new Error("Invalid Date")
      if(segment.isOvernight() && !segment.isSunday()) fare += segment.distance * this.FARE_OVERNIGHT_NOT_SUNDAY
      if(segment.isOvernight() && segment.isSunday()) fare += segment.distance * this.FARE_OVERNIGHT_SUNDAY
      if(!segment.isOvernight() && segment.isSunday()) fare += segment.distance * this.FARE_NOT_OVERNIGHT_SUNDAY
      if(!segment.isOvernight() && !segment.isSunday()) fare += segment.distance * this.FARE_NOT_OVERNIGHT_NOT_SUNDAY
    }
    return fare < this.FARE_MIN ? this.FARE_MIN : fare
  }

}