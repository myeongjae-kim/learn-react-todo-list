import * as React from 'react';
import styles from './TodoItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface ITodoItemProps {
  done: boolean
  onToggle: () => void
  onRemove: () => void
}

class TodoItem extends React.Component<ITodoItemProps> {
  shouldComponentUpdate(nextProps: Readonly<ITodoItemProps>): boolean {
    return this.props.done !== nextProps.done;
  }

  render() {
    /* 비구조화 할당을 이용하여 this.props 안에 있는
       done, children, onToggle, onRemove 레퍼런스를 만들어 주었습니다

       this를 생략할 수 있고, 이 컴포넌트가 어떤 props를 사용하는지 한 눈에
       알 수 있어서 유용합니다.
    */
    const { done, children, onToggle, onRemove } = this.props;

    return (
      <div className={cx('todo-item')} onClick={onToggle}>
        <input className={cx('tick')} type='checkbox' checked={done} readOnly />
        <div className={cx('text', { done })}>{children}</div>
        <div className={cx('delete')} onClick={(e: React.SyntheticEvent) => {
          onRemove()
          /* propagation, 자식 -> 부모 순으로 메서드를 실행한다.
             이걸 막아서 부모의 onClick을 실행하지 못하게 한다.
          */
          e.stopPropagation();
        }}>[지우기]</div>
      </div>
    );
  }
}

export default TodoItem;