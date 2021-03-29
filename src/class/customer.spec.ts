import { IndividualCustomer, EnterpriseCustomer } from './Customer';

const createIndividualCustomer = (firstName: string, lastName: string, cpf: string): IndividualCustomer => {
    return new IndividualCustomer(firstName, lastName, cpf);
}

const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
    return new EnterpriseCustomer(name, cnpj);
}

afterEach(() => jest.clearAllMocks());

describe('IndividualCustomer', () => {
    test('should have firstName, lastName and CPF', () => {
        const sut = createIndividualCustomer("Paulo", "Ricardo", "111.111.111-11");
        expect(sut).toHaveProperty("firstName", "Paulo");
        expect(sut).toHaveProperty("lastName", "Ricardo");
        expect(sut).toHaveProperty("cpf", "111.111.111-11");
    });
    
    test('should have methods to get name and IDN for individual customers', () => {
        const sut = createIndividualCustomer("Paulo", "Ricardo", "111.111.111-11");
        expect(sut.getName()).toBe("Paulo Ricardo");
        expect(sut.getIDN()).toBe("111.111.111-11");
    });
});

describe('EnterpriseCustomer', () => {
    test('should have name and cnpj', () => {
        const sut = createEnterpriseCustomer("Udemy", "11.111.111/1111");
        expect(sut).toHaveProperty("name", "Udemy");
        expect(sut).toHaveProperty("cnpj", "11.111.111/1111")
    });
    
    test('should have methods to get name and IDN for enterprise customers', () => {
        const sut = createEnterpriseCustomer("Udemy", "11.111.111/1111");
        expect(sut.getName()).toBe("Udemy");
        expect(sut.getIDN()).toBe("11.111.111/1111");
    });
});
