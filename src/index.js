import { projectFactory, projectRoster } from './project';
import {generateFormField, generateSelect, presentProjectList, presentProject, presentTodoList, buildTodoForm, addToContainer} from './DOM';
//getroster causing issues? can only remove and complete tasks first time opening

//school - yellow #e6fc67
//work - red - #fc6e67
//home - blue - #67e8fc
//social - pink - #fc67b6
//recreation - orange - #fc9167
//finance - green - #67fc94
//personal - purple - #aa67fc
//other

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//localStorage.setItem('items', JSON.stringify(itemsArray))
//const data = JSON.parse(localStorage.getItem('items'))
//console.log('data: ' + data);

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

    var title = document.createElement('h1');
    title.style.cssText = 'left: 15%; top: -5%; position: absolute; z-index: 5; color: #e6ffff';
    title.innerHTML = 'PocketDocket';
    document.body.appendChild(title);

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
        'width: 250px; display: none; z-index: 5; font-family: Arial';

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

    var title = form.childNodes[1].value;
    var date = form.childNodes[3].value;
    var desc = form.childNodes[5].value;
    var notes = form.childNodes[7].value;
    var priority = form.childNodes[9].value;
    var category = form.childNodes[11].value;

    var newProj = projectFactory(title, date, priority, category, false, desc, notes);
    projectRoster.addToRoster(newProj);

    itemsArray = projectRoster;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    console.log('items: ' + itemsArray);
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
              var notebox = presentProject(roster[index]);
	      createTodoForm(content, roster[index]);

              var todoListButtons = presentTodoList(roster[index].getTodos()); 
	      const currentProject = roster[index];

              addNotesChangeFunctionality(notebox, currentProject);		

              addCheckFunctionality(todoListButtons[0], currentProject);
              addRemoveFunctionality(todoListButtons[1], currentProject);
	      addDetailChangeFunctionality(todoListButtons[2], todoListButtons[3], currentProject);

              addTodoButton(content);
	});
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

              var todoListButtons = presentTodoList(projects[index].getTodos());
	      var currentProject = projects[index];
	      addCheckFunctionality(todoListButtons[0], currentProject);
              addRemoveFunctionality(todoListButtons[1], currentProject);

	      addTodoButton(content);
        });
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

    var todoForm = buildTodoForm();
    content.appendChild(todoForm);

    todoForm.onsubmit = function () {
        var content = document.getElementById('content');
        var form = content.childNodes.item('todo');

	var task = todoForm.childNodes[1].value;
        var desc = todoForm.childNodes[3].value;
	currentProject.addTodoItem(task, false, desc);

	content.innerHTML = '';
	presentProject(currentProject);
        createTodoForm(content, currentProject);
        var todoListButtons = presentTodoList(currentProject.getTodos());

	//ISSUE MUST BE HERE??
	//add functionality to all complete buttons
	    //
	addCheckFunctionality(todoListButtons[0], currentProject);
	addRemoveFunctionality(todoListButtons[1], currentProject);
	addDetailChangeFunctionality(todoListButtons[2], todoListButtons[3], currentProject);

	addTodoButton(content);
	todoForm.style.display = 'none';

	itemsArray = projectRoster;
        localStorage.setItem('items', JSON.stringify(itemsArray));
        return false;
    };
}

function updateTodoList(currentProject) {
        var content = document.getElementById('content');
        content.innerHTML = '';

	var todoForm = buildTodoForm();
        content.appendChild(todoForm);

        presentProject(currentProject);
        createTodoForm(content, currentProject);
        var todoListButtons = presentTodoList(currentProject.getTodos());

	addCheckFunctionality(todoListButtons[0], currentProject);
        addRemoveFunctionality(todoListButtons[1], currentProject);
        addDetailChangeFunctionality(todoListButtons[2], todoListButtons[3], currentProject);
        
	addTodoButton(content);
}

function test() {
    var tester = document.createElement('h1');
    tester.innerHTML = 'PocketDocket';
    document.body.append(tester);
}

//Given a list of html buttons, add the functionality to modify (check complete, delete)
//the todo within the project
function addCheckFunctionality(buttons, project) {
     for (var i = 0; i < buttons.length; i++) {
            const index = i;
            buttons[i].addEventListener('click', () => {
                var todos = project.getTodos();
                project.markTodo(index);

		itemsArray = projectRoster;
                localStorage.setItem('items', JSON.stringify(itemsArray));
            });
        }

    itemsArray = projectRoster;
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function addRemoveFunctionality(buttons, project) {
        for (var i = 0; i < buttons.length; i++) {
            const index = i;
            buttons[i].addEventListener('click', () => {
		var content = document.getElementById('content');
                content.innerHTML = '';
                var todos = project.getTodos();
                project.removeTodo(index);
                updateTodoList(project);

		itemsArray = projectRoster;
                localStorage.setItem('items', JSON.stringify(itemsArray));
            });
        }
}

function addDetailChangeFunctionality(buttons, changes, project) { 
     for (var i = 0; i < buttons.length; i++) {
            const index = i;
            buttons[i].addEventListener('click', () => {
		//project.editTodoDetails(index, changes[index].value);
		var content = document.getElementById('content');
                content.innerHTML = '';
                project.editTodoDetails(index, changes[index].value);
		console.log('changes: ' + changes[index].value);
                updateTodoList(project);

		itemsArray = projectRoster;
                localStorage.setItem('items', JSON.stringify(itemsArray));
            });
     }
    //project.editTodoDetails(index, details);
}

function addNotesChangeFunctionality(notebox, project) {
    var submit = notebox.childNodes[3];
    console.log('submit: ' + submit.innerHTML);

    submit.addEventListener('click', () => {
	var changes = notebox.childNodes[2].value;
	console.log('changes: ' + changes);
        project.notes = changes;
        var content = document.getElementById('content');
        content.innerHTML = '';
        presentProject(project);
	createTodoForm(content, project);
        var todoListButtons = presentTodoList(project.getTodos());

        addCheckFunctionality(todoListButtons[0], project);
        addRemoveFunctionality(todoListButtons[1], project);

        addTodoButton(content);

        itemsArray = projectRoster;
        localStorage.setItem('items', JSON.stringify(itemsArray));
    });
}

//test();

for (var i = 0; i < itemsArray.length; i++ ) {
    projectRoster.addToRoster(itemsArray[i]);
}

initDocket();
getProjectRoster();
