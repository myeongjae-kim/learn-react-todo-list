import React, { Component } from 'react';
import styles from './App.module.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <div className={cx(styles.box, styles.blue)}></div>
    );
  }
}

export default App;