import * as React from 'react';
import TodoList from '../components/TodoList'
import { Dispatch } from 'redux'

import { connect } from 'react-redux';

import * as todosActions from '../modules/todos'
import { TCombinedStates } from '../modules';

interface ITodosActions {
  insert: (todoState: todosActions.ITodoState) => void
  toggle: (id: number) => void
  remove: (id: number) => void
}

interface ITodoListContainerProps {
  todos: todosActions.TTodosState
  TodosActions: ITodosActions
}

class TodoListContainer extends React.Component<ITodoListContainerProps> {
  handleToggle = (id: number) => {
    const { TodosActions } = this.props;
    TodosActions.toggle(id);
  }
  handleRemove = (id: number) => {
    const { TodosActions } = this.props;
    TodosActions.remove(id);
  }
  render() {
    const { todos } = this.props;
    const { handleToggle, handleRemove } = this;

    return (
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    );
  }
}

export default connect(
  (state: TCombinedStates) => ({
    todos: state.todos
  }),
  (dispatch: Dispatch<todosActions.TTodoActions>) => ({
    TodosActions: {
      insert: (todoState: todosActions.ITodoState) => dispatch(todosActions.insert(todoState)),
      toggle: (id: number) => dispatch(todosActions.toggle(id)),
      remove: (id: number) => dispatch(todosActions.remove(id))
    }
  })
)(TodoListContainer);