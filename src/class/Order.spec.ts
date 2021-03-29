import { Order } from "./Order";
import { Persistency } from '../services/persistency';
import { Item } from './interfaces/Item';
import { MessagingProtocol } from './interfaces/Messaging_Protocol';
import { ShoppingCartProtocol } from "./interfaces/Shopping_Cart_Protocol";
import { CustomerOrder } from './interfaces/Customer_Protocol';

class ShoppingCartMock implements ShoppingCartProtocol {
    get items(): Readonly<Item[]> {
        return [];
    };
    addItem(item: Item): void {};
    removeItem(index: number): void {};
    total = (): number => 1;
    totalWithDiscount = (): number => 1;
    isEmpty = (): boolean => !true;
    clear(): void {};
}

class PersistencyMock implements Persistency {
    saveOrder(): void {};
}

class MessagingMock implements MessagingProtocol {
    sendMessage(): void {};
}

class CustomerMock implements CustomerOrder {
    getName = (): string => "";
    getIDN = (): string => "";
}

const createSut = () => {
    const shoppingCartMock = new ShoppingCartMock();
    const messagingMock = new MessagingMock();
    const persistencyMock = new PersistencyMock();
    const customer = new CustomerMock();

    shoppingCartMock.addItem({ name: "T-Shirt", price: 69.9 });
    
    const sut = new Order(shoppingCartMock, messagingMock, persistencyMock, customer);

    return { 
        sut, 
        shoppingCartMock, 
        messagingMock, 
        persistencyMock
    };
}

describe("Order", () => {
    test('shouldn\'t checkout the order if the cart is empty', () => {
        const { sut, shoppingCartMock } = createSut();

        const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "isEmpty")
            .mockReturnValueOnce(true);

        sut.checkout();
        
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);

        expect(sut.orderStats).toBe('open');
    });
    
    test('shouldn checkout the order if the cart isn\'t empty', () => {
        const { sut, shoppingCartMock } = createSut();

        const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "isEmpty")
            .mockReturnValueOnce(false);

        sut.checkout();
        
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
        expect(sut.orderStats).toBe('closed');
    });
    
    test('should send an email to customer', () => {
        const { sut, messagingMock } = createSut();
        const messagingMockSpy = jest.spyOn(messagingMock, "sendMessage");
        sut.checkout();
        expect(messagingMockSpy).toHaveBeenCalledTimes(1);
    });
    
    test('should save order', () => {
        const { sut, persistencyMock } = createSut();
        const persistencyMockSpy = jest.spyOn(persistencyMock, "saveOrder");
        sut.checkout();
        expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
    });
    
    test('should clear cart', () => {
        const { sut, shoppingCartMock } = createSut();
        const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "clear");
        sut.checkout();
        expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    });
});
