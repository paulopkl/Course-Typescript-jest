import { Item } from './interfaces/Item';
import { Discount } from './discount';
import { ShoppingCartProtocol } from './interfaces/Shopping_Cart_Protocol';

export class ShoppingCart implements ShoppingCartProtocol {
    private readonly _items: Item[] = [];
    private readonly discount: Discount;

    constructor(discount: Discount) {
        this.discount = discount;
    }

    addItem(item: Item): void {
        this._items.push(item);
    }

    removeItem(index: number): void {
        this._items.splice(index, 1);
    }

    total(): number {
        return parseFloat(this._items.reduce((total, item) => total += item.price, 0).toFixed(2));
    }

    totalWithDiscount(): number {
        const result = this.discount.calculate(this.total());

        if (typeof result === 'number') return result;
        return this.total();
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    clear(): void {
        if(this._items.length !== 0) {
            console.log("ShoppingCart was cleaned!");
            this._items.length = 0;
        }
    }

    get items(): Readonly<Item[]> {
        return this._items;
    }
}