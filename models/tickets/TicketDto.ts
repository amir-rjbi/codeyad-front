import { BaseFilterResult } from "~/models/IApiResponse";

export interface TicketFilterResult extends BaseFilterResult {
  tickets: TicketFilterData[];
}

export interface TicketFilterData {
  id: number;
  builderId: number;
  ticketTitle: string;
  ticketBody: string;
  status: TicketStatus;
  createDate: Date;
}
export enum TicketStatus {
  close = "close",
  replied = "replied",
  waiting_For_Reply = "waiting_For_Reply",
}

export interface Ticket {
  id: number;
  builderId: number;
  ticketTitle: string;
  ticketBody: string;
  status: TicketStatus;
  createDate: Date;
  ticketMessages: TicketMessage[];
}
export interface TicketMessage {
  ticketId: number;
  userId: number;
  messageBody: string;
  createDate: Date;
}
