import { OrderProduct } from "./OrderProduct";

export interface IOrderShow{
    id: string,
    orderProducts: OrderProduct[],
    deliveryMethod: string,
    deliveryMethodPrice: number,
    subtotal: number,
    iva: number,
    totalPrice: number,
    state: string
}