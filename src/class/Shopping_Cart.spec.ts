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

const createSutWithProducts = () => {
    const { sut, discountMock } = createSut();

    const cartItem1 = createItemMock("T-Shirt", 79);
    const cartItem2 = createItemMock("Pant", 69.9);

    sut.addItem(cartItem1);
    sut.addItem(cartItem2);

    return { sut, discountMock };
}

describe('ShoppingCart', () => {
    test('should be an empty cart when no product is added', () => {
        const { sut } = createSut();
        expect(sut.isEmpty()).toBeTruthy();
    });
    
    test('should have 2 cart items', () => {
        const { sut } = createSutWithProducts();

        expect(sut.items.length).toBe(2);
    });
    
    test('should test total and totalWithDiscount', () => {
        const { sut } = createSutWithProducts();

        expect(sut.total()).toBe(148.9);
        expect(sut.totalWithDiscount()).toBe(148.9);
    });

    test('should add products and clear cart', () => {
        const { sut } = createSutWithProducts();

        expect(sut.items.length).toBe(2);
        
        sut.clear();
        
        expect(sut.items.length).toBe(0);
        expect(sut.isEmpty()).toBeTruthy();
    });
    
    test('should remove products', () => {
        const { sut } = createSutWithProducts();

        expect(sut.items.length).toBe(2);

        sut.removeItem(1);
        
        expect(sut.items.length).toBe(1);
        
        sut.removeItem(0);

        expect(sut.isEmpty()).toBeTruthy();
    });
    
    test('should call discount.calculate() once when totalWithDiscount() is called', () => {
        const { sut, discountMock } = createSutWithProducts();

        const discountMockSpy = jest.spyOn(discountMock, 'calculate');

        sut.totalWithDiscount();

        expect(discountMockSpy).toHaveBeenCalledTimes(1);
    });
    
    test('should call discount.calculate() with total price when .totalWithDiscount() is called', () => {
        const { sut, discountMock } = createSutWithProducts();

        const discountMockSpy = jest.spyOn(discountMock, 'calculate');

        sut.totalWithDiscount();

        expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
    });
});
