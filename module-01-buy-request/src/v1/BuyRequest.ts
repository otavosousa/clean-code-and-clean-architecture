import { validateCpf } from '../../../module-01-validate-cpf/src/v2/validate-cpf'
import { Item } from './Item'

export class BuyRequest {
  cpf: string
  items: Item[]
  total: number
  constructor(){
    this.cpf = ''
    this.items = []
    this.total = 0
  }

  create(cpf: string){
    if(!validateCpf(cpf)) {
      this.cpf = ''
      this.items = []
      this.total = 0
      throw new Error('Invalid CPF')
    }
    return this
  }

  addItems(items: Item[]){
    this.items = [...this.items, ...items]
  }

  applyDiscount(discount: number){
    this.calculateTotal()
    this.total = this.total - (this.total * (discount/100))
  }

  private calculateTotal(){
    return this.total = this.items.map(item => {
      return item.options.price * item.options.amount
    }).reduce((result, item) => {
      return result + item
    }, 0)
  }
}
