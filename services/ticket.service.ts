import {IApiResponse} from "~/models/IApiResponse";
import {Ticket,TicketFilterResult} from "~/models/tickets/TicketDto";

//------- GET
export const GetUserTickets = (
    pageId: number
): Promise<IApiResponse<TicketFilterResult>> => {
    return FetchApi("/Ticket", {
        query: {
            pageId,
        },
    });
};
export const GetTicketById = (
    ticketId: number
): Promise<IApiResponse<Ticket>> => {
    return FetchApi(`/Ticket/${ticketId}`);
};

//------- POST
export const CreateTicket = (
    title:string,
    text:string
): Promise<IApiResponse<number>> => {
    return FetchApi(`/Ticket`,{
        method:'POST',
        body:{
            title,
            text
        }
    });
};
export const AddTicketMessage = (
    ticketId:number,
    message:string
): Promise<IApiResponse<undefined>> => {
    return FetchApi(`/Ticket/AddMessage`,{
        method:'POST',
        body:{
            ticketId,
            message
        }
    });
};