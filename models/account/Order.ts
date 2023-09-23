export interface Order {
  userId: number;
  price: number;
  discount: number;
  discountPercentage: number;
  discountTitle: string;
  isFinally: boolean;
  byWallet: boolean;
  totalPrice: number;
  createDate: string;
  paymentDate: string;
  orderDetails: OrderDetail[];
}
interface OrderDetail {
  id: number;
  courseId: number;
  courseTitle: string;
  courseSlug: string;
  price: number;
}
