export interface ShopCart {
  courseOrder: Order;
  orderPriceWithTether: string;
  discountCode: {
    price: number;
    percentage: number;
    title: string;
  } | null;
}
