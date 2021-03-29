import { PersistencyProtocol } from '../class/interfaces/Persistency_Protocol';

export class Persistency implements PersistencyProtocol {
    saveOrder(): void {
        console.log("Order saved successfully!");
    }
}