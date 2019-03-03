import React, { Component, SyntheticEvent } from 'react';
import PageTemplate from './PageTemplate'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import { ITodoListData } from './TodoList/TodoList';

export interface IAppState {
  input: string
  todos: Array<ITodoListData>
}

const initialTodos: Array<ITodoListData> = new Array(500).fill(0).map(
  (foo: ITodoListData, index: number) => ({ id: index, text: `일정 ${index}`, done: false })
)

class App extends Component<{}, IAppState> {
  state = {
    input: '',
    todos: initialTodos
  }

  // 일정 데이터 안에 들어가는 id
  id = 1; // 렌더링되는 정보가 아니므로 굳이 state 내부에 넣을 필요가 없다.
  getId = () => {
    return ++this.id;
  }

  handleChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({ input: value });
  }

  // 새 데이터 추가
  handleInsert = () => {
    const { input, todos } = this.state;

    // 새 데이터 객체 만들기
    const newTodo: ITodoListData = {
      id: this.getId(),
      text: input,
      done: false
    };

    this.setState({
      todos: [...todos, newTodo],
      input: ''
    });
  }

  // to do 아이템 토글하기
  handleToggle = (id: number) => {
    // id로 배열의 인덱스를 찾습니다.
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    // 찾은 데이터의 done 값을 반전시킵니다.
    const toggled: ITodoListData = {
      ...todos[index],
      done: !todos[index].done
    }

    // slice를 사용하여 우리가 찾은 index 전후의 데이터들을 복사합니다.
    // 그리고 그 사이에는 변경된 to do 객체를 넣어줍니다.
    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1)
      ]
    })
  };

  handleRemove = (id: number) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [
        ...todos.slice(0, index),
        ...todos.slice(index + 1)
      ]
    })
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleInsert,
      handleToggle,
      handleRemove
    } = this;

    return (
      <div>
        <PageTemplate>
          <TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
          <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
        </PageTemplate>
      </div>
    );
  }
}

export default App;