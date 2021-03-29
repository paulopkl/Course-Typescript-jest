import { Persistency } from "./persistency";

describe('Persistency', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return undefined', () => {
        // System Under Test
        const sut = new Persistency();

        expect(sut.saveOrder()).toBeUndefined();
    });
    
    test('should call console.log once', () => {
        const sut = new Persistency();
        const consoleSpy = jest.spyOn(console, "log");
        sut.saveOrder();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
    
    test('should call console.log once', () => {
        const sut = new Persistency();
        const consoleSpy = jest.spyOn(console, "log");
        sut.saveOrder();
        sut.saveOrder();
        // expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith("Order saved successfully!");
    });
});

