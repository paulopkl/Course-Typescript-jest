import { Discount, FiftyPercentDiscount, TenPercentDiscount, NoDiscount } from './discount';

const createSut = (classDiscount: new () => Discount): Discount => {
    return new classDiscount();
}

describe('Discount', () => {
    afterEach(() => jest.clearAllMocks());

    test('should have no discount', () => {
        const sut = createSut(NoDiscount);
        expect(sut.calculate(180)).toBe(180);
    });

    test('should apply 50% discount on price', () => {
        const sut = createSut(FiftyPercentDiscount);
        expect(sut.calculate(150.50)).toBeCloseTo(75.2, 1);
    });
    
    test('should apply 10% discount on price', () => {
        const sut = createSut(TenPercentDiscount);
        expect(sut.calculate(10)).toBeCloseTo(9.04, 1);
    })
    
});
