import { IndividualCustomerProtocol, EnterpriseCustomerProtocol, CustomerOrder } from "./interfaces/Customer_Protocol";

export class IndividualCustomer implements IndividualCustomerProtocol, CustomerOrder {
    public firstName: string;
    public lastName: string;
    public cpf: string;
    public cnpj: string = "";

    constructor(firstName: string, lastName: string, cpf: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cpf = cpf;
    }

    getName(): string {
        return this.firstName + " " + this.lastName;
    }

    getIDN(): string {
        return this.cpf;
    }
}

export class EnterpriseCustomer implements EnterpriseCustomerProtocol, CustomerOrder {
    public name: string;
    public cnpj: string;
    
    constructor(name: string, cnpj: string) {
        this.name = name;
        this.cnpj = cnpj;
    }

    getName(): string {
        return this.name;
    }

    getIDN(): string {
        return this.cnpj;
    }
}
