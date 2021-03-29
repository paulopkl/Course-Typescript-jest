import { MessagingProtocol } from './class/interfaces/Messaging_Protocol';
import { IndividualCustomer, EnterpriseCustomer } from './class/Customer';
import { FiftyPercentDiscount, TenPercentDiscount, NoDiscount } from './class/discount';
import { Messaging } from './services/messaging';
import { Order } from './class/Order';
import { Persistency } from './services/persistency';
import { Product } from './class/product';
import { ShoppingCart } from './class/Shopping_Cart';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();

class MessagingMock implements MessagingProtocol {
    sendMessage = (): void => console.log("The message was sent by MOCK!");
}

const messagingMock = new MessagingMock();

const individualCustomer = new IndividualCustomer("Paulo", "Ricardo", "111.111.111-11");
const enterpriseCustomer = new EnterpriseCustomer("Giant Company", "11.111.111/1111");

const order = new Order(shoppingCart, messagingMock, persistency, enterpriseCustomer);

shoppingCart.addItem(new Product("T-shirt", 78));
shoppingCart.addItem(new Product("Shoes", 49.00));
shoppingCart.addItem(new Product("Pencil", 1.99));

// console.log(shoppingCart.items.push({ name: "batata", price: 100 }));
console.log(shoppingCart.items);
console.log(shoppingCart.total()); 
console.log(shoppingCart.totalWithDiscount()); // total()
// shoppingCart.clear();

console.log(order.orderStats); // open

order.checkout();

console.log(order.orderStats); // closed
