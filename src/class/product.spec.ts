import { Product } from './product';

const createSut = (name: string, price: number): Product => {
    return new Product(name, price);
}

describe('Product', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return undefined', () => {
        const sut = createSut("T-Shirt", 49.9);
        expect(sut).toHaveProperty("name", "T-Shirt");
        expect(sut).toHaveProperty("price", 49.9);
        expect(sut.price).toBeCloseTo(49.9);
    });
});
