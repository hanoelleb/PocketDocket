import { generateFormField, generateSelect, presentProjectList, presentProject, presentTodoList, addToContainer} from './DOM';
import { projectFactory, projectRoster } from './project';

//school - yellow #e6fc67
//work - red - #fc6e67
//home - blue - #67e8fc
//social - pink - #fc67b6
//recreation - orange - #fc9167
//finance - green - #67fc94
//personal - purple - #aa67fc
//other

const colors = [
  '#e6fc67',
  '#fc6e67',
  '#67e8fc',
  '#fc67b6',
  '#fc9167',
  '#67fc94',
  '#aa67fc'
];

function initDocket() {

    document.body.style.cssText = 'background-color: #111111; color: #fcfcfc; font-family: Arial;';

    setupNavbar();

    var content = document.createElement('div');
    content.id = 'content';
    content.style.cssText = 'padding: 20px; position: relative; left: 20%';
    document.body.appendChild(content);

    //form: project title, due date, description, notes, priority, categories (school, work, home, 
    //social, recreation, finance, personal, other)
}

function setupNavbar() {
    var navbar = document.createElement('div');
    navbar.id = 'navbar';
    //navbar.style.cssText = 'position: fixed;';
    document.body.appendChild(navbar);

    const listStyle = 'float: left; list-style-type: none; margin: 0; padding: 0; height: 100%; width: 120px; position: fixed;' +
                'background-color: #606060';

    var categoryList = document.createElement('ul');
    categoryList.style.cssText = listStyle;
    navbar.appendChild(categoryList);

    const sorters = ['All Projects', 'This Week', 'High Priority'];
    for (var i = 0; i < sorters.length; i++) {
       var sorter = document.createElement('li');
       sorter.style.cssText = 'padding-left: 5px; padding-bottom: 5px; display: block, width: 60px;';
       sorter.innerHTML = sorters[i];
       sorter.onclick = getProjectRoster;
       categoryList.appendChild(sorter);
    }

    //all projects, this week, high priority in one nav tab. categories in the other
    const categories = ['School', 'Work', 
	    'Home', 'Social', 'Recreation', 'Finance', 'Personal', 'Other'];
 
    for (var i = 0; i < categories.length; i++ ) {
        var category = document.createElement('li');
	category.style.cssText = 'padding-left: 5px; padding-bottom: 5px; display: block, width: 60px;';
	category.innerHTML = categories[i];
	const index = i;
	category.onclick = () => {
	    var projects = projectRoster.getProjectsById(categories[index].toLowerCase());
	    getSearchedProjectRoster(projects);
	};
	
	var dot = document.createElement('span');
	dot.style.cssText = 'position: relative; float: left; top: 50%; display: block; background-color: ' + colors[i] + '; border-radius: 50%; ' + 
                    'width : 10px; height : 10px; z-index: 1;';
        category.appendChild(dot);

	categoryList.appendChild(category);
    }
  
}

function makeProjectForm(content) {
    
    var projectForm = document.createElement('form');
    content.appendChild(projectForm);
    projectForm.id = 'projectForm';
    projectForm.style.cssText = 'right: 35%; position: fixed; margin-left: auto; margin-right: auto;' +
        'width: 300px; display: none; z-index: 5; font-family: Arial';

    var title = generateFormField('title', 'text', 'Title: ', 'Project Name');
    addToContainer(projectForm, title);

    var date = generateFormField('date', 'date', 'Date: ');
    addToContainer(projectForm, date);

    var desc = generateFormField('desc', 'textarea', 'Project Description (optional): ');
    addToContainer(projectForm, desc);

    var notes = generateFormField('notes', 'textarea', 'Project Notes (optional): ',
            'contact information, important links, ties to other projects, etc.');
    addToContainer(projectForm, notes);

    var priority = generateSelect('priority', [1,2,3], ['low', 'medium', 'high']);
    addToContainer(projectForm, priority);

    const categories = ['school', 'work', 'home', 'social', 'recreation', 'finance', 'personal', 'other'];
    var chooseCategory = generateSelect('category', categories, categories);
    addToContainer(projectForm, chooseCategory);

    var submit = generateFormField('submit', 'submit', 'Add Project');
    addToContainer(projectForm, submit);

    projectForm.onsubmit = submitForm;
}

function openProjectForm() {
    const projectForm = document.getElementById('projectForm');
    projectForm.style.display = 'block';
}

function addFormButton (content) {
    var newProjectButton = document.createElement('button');
    newProjectButton.innerHTML = '+Project';
    newProjectButton.onclick = openProjectForm;
    content.appendChild(newProjectButton);
}

function submitForm(element) {
    var content = document.getElementById('content');
    var form = content.childNodes.item('projectForm');

    /*
     * children
     * 1 - title
     * 3 - date
     * 5 - desc
     * 7 - notes
     * 9 - priority
     * 11 - category
     */

    var title = form.childNodes[1].value;
    var date = form.childNodes[3].value;
    var desc = form.childNodes[5].value;
    var notes = form.childNodes[7].value;
    var priority = form.childNodes[9].value;
    var category = form.childNodes[11].value;

    var newProj = projectFactory(title, date, priority, category, false, desc, notes);
    projectRoster.addToRoster(newProj);
    getProjectRoster();

    form.style.display = 'none';

    return false;
}

function getProjectRoster() {
    var content = document.getElementById('content');
    var roster = projectRoster.getRoster();

    content.innerHTML = '';
   
    makeProjectForm(content);

    //must add function to each project card which will start at content.children[j]
    var amount = presentProjectList(content, roster);
    var j = amount + 1; //form also included
    for (var i = 0; i < roster.length; i++) {
        const index = i;
        content.children[j].addEventListener('click', () => {
              presentProject(roster[index]);
	      createTodoForm(content, roster[index]);
	      addTodoButton(content);
              presentTodoList(roster[index].getTodos());
        } );
	j++;
    }

    addFormButton(content);
}

function getSearchedProjectRoster( projects ) {
    var content = document.getElementById('content');
    content.innerHTML = '';

    makeProjectForm(content);
    var amount = presentProjectList(content, projects);
    var j = amount + 1; //form also included
    for (var i = 0; i < projects.length; i++) {
        const index = i;
        content.children[j].addEventListener('click', () => {
              presentProject(projects[index]);
              createTodoForm(content, projects[index]);
              addTodoButton(content);
              presentTodoList(projects[index].getTodos());
        } );
        j++;
    }

    addFormButton(content);
}

function openTodoForm() {
    const todoForm = document.getElementById('todo');
    todoForm.style.display = 'block';
}

function addTodoButton (content) {
    var newProjectButton = document.createElement('button');
    newProjectButton.innerHTML = '+Task';
    newProjectButton.onclick = openTodoForm;
    content.appendChild(newProjectButton);
}

function createTodoForm(content, currentProject) {

    console.log('the current project: ' + currentProject.title);

    var todoForm = document.createElement('form');
    todoForm.id = 'todo';
    todoForm.style.cssText = 'right: 35%; position: fixed; margin-left: auto; margin-right: auto;' +
        'width: 300px; display: none; z-index: 5; font-family: Arial';
    content.appendChild(todoForm);

    var desc = generateFormField('desc', 'text', 'Task: ');
    addToContainer(todoForm, desc);

    var details = generateFormField('details', 'textarea', 'Details (optional): ', 'Locations, needed contact info, etc.');
    addToContainer(todoForm, details);

    var submit = generateFormField('todoSubmit', 'submit', 'Add Task');
    addToContainer(todoForm, submit);

    todoForm.onsubmit = function () {
        var content = document.getElementById('content');
        var form = content.childNodes.item('todo');

	var task = todoForm.childNodes[1].value;
        var desc = todoForm.childNodes[3].value;
	currentProject.addTodoItem(task, false, desc);

        console.log('get todos: ' + currentProject.getTodos()[0].task);
	content.innerHTML = '';
	presentProject(currentProject);
        createTodoForm(content, currentProject);
        var todoListButtons = presentTodoList(currentProject.getTodos());

	for (var i = 0; i < todoListButtons.length; i++) {
	    const index = i;
	    todoListButtons[i].addEventListener('click', () => {
	        var todos = currentProject.getTodos();
		for (var j = 0; j < todos.length; j++) {
		    console.log(todos[j].task + ' ' + todos[j].getIsDone());
		}
                console.log('------------------------------');
                currentProject.markTodo(index);

		var todos2 = currentProject.getTodos();
                for (var j = 0; j < todos.length; j++) {
                    console.log(todos2[j].task + ' ' + todos2[j].getIsDone());
                }

	    });
	}
	
	addTodoButton(content);
	todoForm.style.display = 'none';
        return false; 
    };
}

function test() {
    var tester = document.createElement('h1');
    tester.innerHTML = 'PocketDocket';
    document.body.appendChild(tester);
}

//test();
initDocket();
getProjectRoster();
