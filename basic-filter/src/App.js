import React, { Component } from 'react';
import todos from './data/todos';
import Todo from './Todo';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [...todos],
            viewCompleted: true
        }
    }

    toggleViewCompleted() {
        this.setState((state) => {
            return {
                viewCompleted: !state.viewCompleted
            };
        });
    }

    render() {
        return (
            <>
                <button onClick={() => this.toggleViewCompleted()}>Toggle Completed</button>
                {this.state.todos.map((task) => <Todo task={task} shouldShowCompleted={this.state.viewCompleted} key={task.id}/>)}
            </>
        );
    }
}

export default App;
