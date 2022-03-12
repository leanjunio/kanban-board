import { Ticket, Direction } from "./types";

type CardProps = {
  task: Ticket;
  onMove: (task: Ticket, direction: Direction) => void;
  isFirst: boolean;
  isLast: boolean;
};

export const Card = ({
  task,
  onMove,
  isFirst,
  isLast,
}: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h5>{task.task}</h5>
      <div className="buttons">
        <button disabled={isFirst} onClick={() => onMove(task, "left")}>
          left
        </button>
        <button disabled={isLast} onClick={() => onMove(task, "right")}>
          right
        </button>
      </div>
    </div>
  );
};
