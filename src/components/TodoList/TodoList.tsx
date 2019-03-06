import * as React from 'react';
import TodoItem from '../TodoItem';
import { TTodosState } from '../../modules/todos';

export interface ITodoListProps {
  todos: TTodosState
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

class TodoList extends React.Component<ITodoListProps> {
  shouldComponentUpdate(nextProps: Readonly<ITodoListProps>): boolean {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map(
      todo => (
        <TodoItem
          key={todo.get('id')}
          done={todo.get('done')}
          onToggle={() => onToggle(todo.get('id'))}
          onRemove={() => onRemove(todo.get('id'))}
        >
          {todo.get('text')}
        </TodoItem>
      )
    )

    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default TodoList;