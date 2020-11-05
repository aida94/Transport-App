import {Location, Products} from 'models/interfaces';

export interface StopRaw {
  readonly id: number;
  readonly type: string;
  readonly name: string;
  readonly location: Location;
  readonly products: Products;
}

export class Stop {
  readonly id: number;
  readonly type: string;
  readonly name: string;
  readonly location: Location;
  readonly products: Products;

  constructor(data: StopRaw) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.location = data.location;
    this.products = data.products;
  }
}
