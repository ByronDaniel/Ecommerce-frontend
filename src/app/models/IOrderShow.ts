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

interface OrderProduct{
    product: string,
    imageUrl: string,
    price: number,
    productQuantity: number,
    total: number
}