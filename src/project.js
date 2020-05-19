import {todoFactory} from './todo';

export { projectFactory, projectRoster };

const projectFactory = (title, date, priority, category, completed, desc='', notes='', todos = []) => {

    const addTodoItem = (task, completed, details) => {
        var todo = todoFactory(task, completed, details);
        todos.push(todo);
    };

    const markTodo = ( index ) => {
	console.log('within markTodo: ' + todos[index].task + ' ' + todos[index].getIsDone());
        todos[index].setIsDone(true);
	console.log('within markTodo after: ' + todos[index].task + ' ' + todos[index].getIsDone());
    }

    const getTodos = () => { return todos };

    return {title, date, priority, category, completed, desc, notes, addTodoItem, getTodos, markTodo};
}

//module that contains all projects
const projectRoster = (() => {

    var roster = [];

    const getRoster = () => { return roster };

    const getProjectsById = ( searched ) => {
	var res = [];
        for (var i = 0; i < roster.length; i++) {
            if (roster[i].category === searched) {
                res.push(roster[i]);
            }
	}

	return res; 
    };

    const addToRoster = ( project ) => { roster.push(project) };

    return { getRoster, addToRoster, getProjectsById };
})();
