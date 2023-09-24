import {Order} from "~/models/account/Order";
import {BaseFilterResult} from "~/models/IApiResponse";

export interface OrderDetailsFilterResult extends BaseFilterResult{
    orderDetails:TeacherOrderDetail[];
    courseTitle:string;
}

export interface TeacherOrderDetail {
    buyyer: string;
    price: number;
    paymentDate: Date;
}