describe("Primitive values", () => {
    it("Should test jest assertions", () => {
        const number = 10;

        console.log(typeof number);

        expect(number).toBe(10);
        expect(number).toEqual(10);

        expect(number).not.toBe(null);
        expect(number).not.toBeNull();
        expect(number).toBeTruthy();
        expect(number).not.toBeFalsy();
    });

    it("Should split tests", () => {
        const number = 10;

        expect(number).toBeLessThan(11);
        expect(number).toBeGreaterThan(9);
        expect(number).toBeLessThanOrEqual(11);
        expect(number).toBeGreaterThanOrEqual(10);

        expect(number).toBeCloseTo(9.996, 2);
        expect(number).toBeCloseTo(10.004, 2);

        expect(number).toHaveProperty('toString');
        expect(number).toHaveProperty('toLocaleString');
    });
});

describe("Objects", () => {
    it("Should test jest assertions with objects", () => {
        const person = { name: "Paulo", age: 30 };
        const anotherPerson = { ...person };

        expect(anotherPerson).toEqual(person);
        expect(person).toHaveProperty("age", 30);
        expect(person).not.toHaveProperty("potato");

        expect(person?.name).toBe("Paulo");
    });
});
