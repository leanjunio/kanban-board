import { Direction, Ticket } from "./App";

type CardProps = {
  task: Ticket;
  onMove: (task: Ticket, direction: Direction) => void;
};

export const Card = ({ task, onMove }: CardProps): JSX.Element => {
  const LEFT_MOST_COLUMN = 0;
  const RIGHT_MOST_COLUMN = 3;

  const canMoveLeft = task.stage !== LEFT_MOST_COLUMN;
  const canMoveRight = task.stage !== RIGHT_MOST_COLUMN;

  return (
    <div className="card">
      <h5>{task.task}</h5>
      <div className="buttons">
        {canMoveLeft && (
          <button onClick={() => onMove!(task, "left")}>left</button>
        )}
        {canMoveRight && (
          <button onClick={() => onMove!(task, "right")}>right</button>
        )}
      </div>
    </div>
  );
};
