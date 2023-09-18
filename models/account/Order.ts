export interface order {
    userId:             number;
    price:              number;
    discount:           number;
    discountPercentage: number;
    discountTitle:      string;
    isFinally:          boolean;
    byWallet:           boolean;
    totalPrice:         number;
    createDate:         Date;
    paymentDate:        Date;
    orderDetails:       OrderDetail[];
}

export interface OrderDetail {
    courseId:    number;
    courseTitle: string;
    price:       number;
}
