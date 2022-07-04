export interface IShipToAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
}

export interface IOrderItem {
    price: number;
    quantity: number;
    productItemId: number;
    productName: string;
    pictureUrl: string;
}

export interface IOrderToCreate{
    basketId: string;
    deliveryMethod: number;
    shipToAddress: IShipToAddress;
    orderItems: IOrderItem[];
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IShipToAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
}