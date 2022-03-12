import { Ticket, Direction } from "./types";

type CardProps = {
  ticket: Ticket;
  onMove: (ticket: Ticket, direction: Direction) => void;
  isFirst: boolean;
  isLast: boolean;
};

export const Card = ({
  ticket,
  onMove,
  isFirst,
  isLast,
}: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h5>{ticket.task}</h5>
      <div className="buttons">
        <button disabled={isFirst} onClick={() => onMove(ticket, "left")}>
          left
        </button>
        <button disabled={isLast} onClick={() => onMove(ticket, "right")}>
          right
        </button>
      </div>
    </div>
  );
};
