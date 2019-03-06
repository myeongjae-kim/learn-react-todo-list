import { Record, List } from 'immutable'
import { handleActions } from 'redux-actions'
import { createAction, ActionType, getType } from 'typesafe-actions'

interface ITodoState {
  readonly id: number,
  readonly text: string,
  readonly done: boolean
}

export type TTodosState = List<Record<ITodoState>>;

const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const insert = createAction(INSERT, action => {
  return (todoState: ITodoState) => action(todoState);
});
export const toggle = createAction(TOGGLE, action => {
  return (id: number) => action(id);
});
export const remove = createAction(REMOVE, action => {
  return (id: number) => action(id);
});

// State

const TodoStateFactory = Record<ITodoState>({
  id: 0,
  text: '',
  done: false,
});

// InitialState
const initialState: TTodosState = List([
  TodoStateFactory({
    id: 0,
    text: '리액트 공부하기',
    done: true
  }),
  TodoStateFactory({
    id: 1,
    text: '컴포넌트 스타일링 해보기',
    done: false
  })
])

//Reducer
function todosReducer(
  state: TTodosState = initialState,
  action: ActionType<typeof insert | typeof toggle | typeof remove>
): TTodosState {
  switch (action.type) {
    case getType(insert): {
      /* payload 안에 있는 id, text, done의 레퍼런스를 만들어 줍니다.
         레퍼런스를 만들지 않고, 바로 push(Map(action.payload))를 해도 되지만,
         나중에 이 코드를 보았을 때,
         이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있도록 하는 작업입니다.
      */
      const { id, text, done }: ITodoState = action.payload;

      return state.push(TodoStateFactory({
        id,
        text,
        done
      }))
    }
    case getType(toggle): {
      const { payload: id } = action
      // = const id = action.payload
      /* 비구조화 할당을 통하여 id라느 레퍼런스에 action.payload란 값을 넣습니다.
      이 작업이 필수는 아니지만, 나중에 이 코드를 보게 되었을 때 여기서의 payload가
      어떤 값을 의미하는지 이해하기 쉬워집니다. */

      // 전달받은 id를 가지고 index를 조회합니다.
      const index = state.findIndex(todo => todo.get('id') === id);

      //updateIn을 통해 현재 값을 참조하여 반대값으로 설정합니다.
      return state.updateIn([index, 'done'], done => !done);
      /* updateIn을 사용하지 않는다면 다음과 같이 작성할 수도 있습니다.
      return state.setIn([index, 'done'], !state.getIn([0,index]));
      어떤 코드가 더 편해 보이나요? 둘 중에 여러분이 맘에 드는 코드로 작성하면 됩니다.
      */
    }
    case getType(remove): {
      const { payload: id } = action;
      const index = state.findIndex(todo => todo.get('id') === id);
      return state.delete(index);
    }

    default:
      return state;
  }
}

export default todosReducer;