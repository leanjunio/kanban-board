import { ReactNode } from "react";

type ColumnProps = {
  title: string;
  onAdd: (column: number) => void;
  column: number;
  children: ReactNode;
};

export const Column = ({
  title,
  onAdd,
  column,
  children,
}: ColumnProps): JSX.Element => {
  return (
    <div className="column">
      {title}
      <div className="cards">{children}</div>
      <div className="add-button">
        <button onClick={() => onAdd(column)}>add</button>
      </div>
    </div>
  );
};
