import React from "react";

export default (props) => {
    const { shouldShowCompleted, task } = props;
    const { completed } = task;

    const styling = {
        color: completed ? 'green' : 'red',
        textDecoration: completed ? 'line-through' : 'none'
    };

    const element = <div style={styling}>{task.title}</div>;

    if (shouldShowCompleted) {
        return (
            element
        )
    } else if (!shouldShowCompleted && !completed) {
        return (
            element
        )
    }

    return null;
};