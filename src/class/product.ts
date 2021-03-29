import { Item } from './interfaces/Item';

export class Product implements Item {
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}