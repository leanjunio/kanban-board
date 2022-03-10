import { Direction, Ticket } from "./App";

type CardProps = {
  task: Ticket;
  onRight?: (task: Ticket, direction: Direction) => void;
  onLeft?: (task: Ticket, direction: Direction) => void;
};

export const Card = ({ task, onRight, onLeft }: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h5>{task.task}</h5>
      <div className="buttons">
        {onLeft && <button onClick={() => onLeft(task, "left")}>left</button>}
        {onRight && (
          <button onClick={() => onRight(task, "right")}>right</button>
        )}
      </div>
    </div>
  );
};
