import { ShoppingCart } from './Shopping_Cart';
import { Discount, NoDiscount } from './discount';
import { Item } from './interfaces/Item';

const createDiscountMock = (): Discount => new class DiscountMock extends Discount {};

const createItemMock = (name: string, price: number): Item => {
    const imock = class ItemMock implements Item {
        constructor(public name: string, public price: number) {}
    };

    return new imock(name, price);
}

const createSut = (): { sut: ShoppingCart, discountMock: Discount } => {
    const discountMock = createDiscountMock();
    const sut = new ShoppingCart(discountMock);
    return { sut, discountMock };
}

describe('ShoppingCart', () => {
    test('should be an empty cart when no product is added', () => {
        const { sut } = createSut();
        expect(sut.isEmpty()).toBeTruthy();
    });
    
    test('should have 2 cart items', () => {
        const { sut } = createSut();

        const cartItem1 = createItemMock("T-Shirt", 79);
        const cartItem2 = createItemMock("Pant", 69.9);

        sut.addItem(cartItem1);
        sut.addItem(cartItem2);

        expect(sut.items.length).toBe(2);
    });
});
