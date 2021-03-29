import { Messaging } from './messaging';

const createSut = () => {
    return new Messaging();
}

describe('Persistency', () => {
    afterEach(() => jest.clearAllMocks());

    test('should return undefined', () => {
        // System Under Test
        const sut = createSut();

        expect(sut.sendMessage("test")).toBeUndefined();
    });
    
    test('should call console.log once', () => {
        const sut = createSut();
        const consoleSpy = jest.spyOn(console, "log");
        sut.sendMessage("test");
        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
    
    test('should call console.log with \"Message sent\" and msg param', () => {
        const sut = createSut();
        const consoleSpy = jest.spyOn(console, "log");
        sut.sendMessage("test");
        // sut.sendMessage("test");
        // expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith("Message sent:", "test");
    });
});
