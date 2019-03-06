import * as React from 'react';
import TodoInput from '../components/TodoInput'

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// 액션 생성 함수들을 한꺼번에 불러옵니다.
import * as inputActions from '../modules/input';
import * as todosActions from '../modules/todos';
import { TCombinedStates } from '../modules';

interface IInputActions {
  setInput: (value: string) => void
}

interface ITodosActions {
  insert: (todoState: todosActions.ITodoState) => void
  toggle: (id: number) => void
  remove: (id: number) => void
}

interface ITodoInputContainerProps {
  value: string
  InputActions: IInputActions
  TodosActions: ITodosActions
}

class TodoInputContainer extends React.Component<ITodoInputContainerProps> {
  id = 1
  getId = () => {
    return ++this.id;
  }

  handleChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    const { InputActions } = this.props;
    InputActions.setInput(value);
  }

  handleInsert = () => {
    const { InputActions, TodosActions, value } = this.props;
    const todo = {
      id: this.getId(),
      text: value,
      done: false
    };
    TodosActions.insert(todo);
    InputActions.setInput('');
  }

  render() {
    const { value } = this.props;
    const { handleChange, handleInsert } = this;
    return (
      <TodoInput
        onChange={handleChange}
        onInsert={handleInsert}
        value={value}
      />);
  }
}

/* 이번에는 mapStateToProps와 mapDispatchToProps 함수에 대한 레퍼런스를
따로 만들지 않고, 그 내부에 바로 정의해 주었습니다.
*/
export default connect(
  (state: TCombinedStates) => ({
    value: state.input.get('value')
  }),
  (dispatch: Dispatch<todosActions.TTodoActions | inputActions.TInputActions>) => ({
    InputActions: {
      setInput: (value: string) => dispatch(inputActions.setInput(value))
    },
    TodosActions: {
      insert: (todoState: todosActions.ITodoState) => dispatch(todosActions.insert(todoState)),
      toggle: (id: number) => dispatch(todosActions.toggle(id)),
      remove: (id: number) => dispatch(todosActions.remove(id))
    }
  })
)(TodoInputContainer);