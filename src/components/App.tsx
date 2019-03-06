import * as React from 'react';
import PageTemplate from './PageTemplate'

import TodoInputContainer from '../containers/TodoInputContainer'
import TodoListContainer from '../containers/TodoListContainer'

class App extends React.Component {
  render() {
    return (
      <PageTemplate>
        <TodoInputContainer />
        <TodoListContainer />
      </PageTemplate>
    );
  }
}

export default App;