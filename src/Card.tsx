import { Ticket } from "./App";

type CardProps = {
  task: Ticket;
  onRight?: (task: Ticket) => void;
  onLeft?: (task: Ticket) => void;
};

export const Card = ({ task, onRight, onLeft }: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h5>{task.task}</h5>
      <div className="buttons">
        {onLeft && <button onClick={() => onLeft(task)}>left</button>}
        {onRight && <button onClick={() => onRight(task)}>right</button>}
      </div>
    </div>
  );
};
