export class Segment {
  distance: number
  date: Date
  OVERNIGHT_TIME_INITIAL = 22
  OVERNIGHT_TIME_FINISHED = 6

  constructor(distance: number, date: Date){
    this.distance = distance
    this.date = date
  }

  isDistanceValid(){
    return this.distance && typeof this.distance == "number" && this.distance > 0
  }

  isOvernight(){
    return this.date.getHours() >= this.OVERNIGHT_TIME_INITIAL || this.date.getHours() <= this.OVERNIGHT_TIME_FINISHED
  }

  isDateValid(){
    return this.date && this.date instanceof Date && this.date.toString() !== "Invalid Date"
  }

  isSunday(){
    return this.date.getDay() === 0
  }
}
