import { Direction, Ticket } from "./App";

type CardProps = {
  task: Ticket;
  onMove: (task: Ticket, direction: Direction) => void;
};

export const Card = ({ task, onMove }: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h5>{task.task}</h5>
      <div className="buttons">
        <button onClick={() => onMove!(task, "left")}>left</button>
        <button onClick={() => onMove!(task, "right")}>right</button>
      </div>
    </div>
  );
};
