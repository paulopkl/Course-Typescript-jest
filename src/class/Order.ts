import { CustomerOrder } from './interfaces/Customer_Protocol';
import { OrderStats } from './interfaces/OrderStats';
import { ShoppingCartProtocol } from './interfaces/Shopping_Cart_Protocol';
import { PersistencyProtocol } from './interfaces/Persistency_Protocol';
import { MessagingProtocol } from './interfaces/Messaging_Protocol';

export class Order {
    private _orderStats: OrderStats = "open";
    private readonly cart: ShoppingCartProtocol;
    private readonly messaging: MessagingProtocol;
    private readonly persistency: PersistencyProtocol;
    private readonly customer: CustomerOrder;

    constructor(cart: ShoppingCartProtocol, messaging: MessagingProtocol, persistency: PersistencyProtocol, 
        customer: CustomerOrder) {
            this.cart = cart;
            this.messaging = messaging;
            this.persistency = persistency;
            this.customer = customer;
    }

    checkout(): void {
        if (this.cart.isEmpty()) {
            console.log("Your cart is empty!");
            return;
        }

        this.orderStats = "closed";
        this.messaging.sendMessage(`Your order with total of R$${this.cart.totalWithDiscount()} were received!`);
        this.persistency.saveOrder();
        this.cart.clear();
        
        console.log(`The Customer is: ${this.customer.getName()} ${this.customer.getIDN()}`);
    }

    set orderStats(stats: OrderStats) {
        this._orderStats = stats;
    }

    get orderStats(): OrderStats {
        return this._orderStats;
    }
}
