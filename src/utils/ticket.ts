import { Ticket } from "../App";

export const getTicketIndex = (list: Ticket[], ticket: Ticket) => {
  return list.findIndex(({ task }) => task === ticket.task);
};
