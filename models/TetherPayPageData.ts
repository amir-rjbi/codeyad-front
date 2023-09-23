import { ShopCart } from "./ShopCart";
export interface TetherPayPageDataDto {
  courseOrder: Order;
  wallet: {
    title: string;
    description: string;
    wallet: string;
    walletQRCodeImage: string;
  };
  orderPriceWithTether: string;
}
