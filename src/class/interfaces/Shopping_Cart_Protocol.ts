import { Item } from './Item';

export interface ShoppingCartProtocol {
    items: Readonly<Item[]>;
    addItem(item: Item): void;
    removeItem(index: number): void;
    total(): number;
    totalWithDiscount(): number;
    isEmpty(): boolean;
    clear(): void;
}