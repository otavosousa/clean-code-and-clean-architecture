interface Ioptions {
  description: string,
  price: number,
  amount: number
}

export class Item {
  options: Ioptions
  constructor(options: Ioptions){
    this.options = options
  }
}
