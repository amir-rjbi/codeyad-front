import {Order} from "~/models/account/Order";

export interface OrderDetailsFilterResult{
    orderDetails:OrderDetails[];
    courseTitle:string;
}
export interface OrderDetails{
    entityCount: number;
    currentPage: number;
    pageCount: number;
    startPage: number;
    endPage: number;
    take: number;
    orderDetails: TeacherOrderDetail[];
}

export interface TeacherOrderDetail {
    id: number;
    orderId: number;
    courseId: number;
    price: number;
    createDate: string;
    order: Order;
}