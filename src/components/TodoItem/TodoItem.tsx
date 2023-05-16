import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  tempTodoId?: number;
  deleteTodo?: (deletingTodo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  tempTodoId = 0,
  deleteTodo = () => {},
}) => {
  const { title, completed } = todo;

  const [isLoading, setIsLoading] = useState(tempTodoId === todo.id);

  return (
    <div
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      <span className="todo__title">{title}</span>

      <button
        type="button"
        className="todo__remove"
        onClick={async () => {
          setIsLoading(true);
          await deleteTodo?.(todo);
          setIsLoading(false);
        }}
        disabled={isLoading}
      >
        ×
      </button>

      <div className={classNames('modal overlay', {
        'is-active': isLoading,
      })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
