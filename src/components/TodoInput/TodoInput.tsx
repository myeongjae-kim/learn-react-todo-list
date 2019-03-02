import * as React from 'react';
import styles from './TodoInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// input과 버튼이 함께 있는 컴포넌트입니다.
/* value: input 값
   onChange: input 변경 이벤트
   onInsert: 추가 버튼 클릭 이벤트
*/

export interface ITodoInputProps {
  value: string
  onChange: (e: React.SyntheticEvent<Element, Event>) => void
  onInsert: () => void
}

const TodoInput: React.SFC<ITodoInputProps> = ({ value, onChange, onInsert }) => {
  // Enter 키가 눌리면 onInsert를 실행합니다.
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onInsert();
    }
  }

  return (
    <div className={cx('todo-input')}>
      <input onChange={onChange} value={value} onKeyPress={handleKeyPress} />
      <div className={cx('add-button')} onClick={onInsert}>추가</div>
    </div>
  );
}

export default TodoInput;