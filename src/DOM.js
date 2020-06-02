export {generateFormField, generateSelect, presentProjectList, presentProject, presentTodoList, buildTodoForm, addToContainer};

//school - yellow #e6fc67
//work - red - #fc6e67
//home - blue - #67e8fc
//social - pink - #fc67b6
//recreation - orange - #fc9167
//finance - green - #67fc94
//personal - purple - #aa67fc
//other

function addToContainer(container, elements) {
    for (var i = 0; i < elements.length; i++)
        container.appendChild(elements[i]);
}

//additional can be used for things like innerHTML of a button, placeholders in text fields, etc
function generateFormField (id, fieldType, labelWord = '', additional = '') {
    
    var elements = []; 
	 
    if (fieldType !== 'submit') {
        var label = document.createElement('label');
        label.innerHTML = labelWord;
	label.style.cssText = 'width: 100px';
	elements.push(label);
    }
    
    if (fieldType !== 'textarea') {
        var field = document.createElement('input');
        field.type = fieldType;
        field.style.cssText = 'margin-right: 75px; margin-bottom: 10px;';

        if (fieldType !== 'submit' && additional !== '') {
            field.placeholder = additional;
        }

        if (fieldType === 'submit' && labelWord != '') {
            field.value = labelWord;
        }
    
        field.id = id;
        elements.push(field);
    } else {
        var field = document.createElement('textarea');
	field.rows = 6;
	field.cols = 40;
	field.style.cssText = 'margin-right: 75px; margin-bottom: 10px;';

	if (additional !== '') {
            field.placeholder = additional;
        }

	field.id = id;
	elements.push(field);
    }

    return elements;
}

//values and labels must be same size
function generateSelect( id, values, labels ) {
    var label = document.createElement('label');
    label.innerHTML = id.charAt(0).toUpperCase() + id.substr(1).toLowerCase() + ': ';

    var select = document.createElement('select');
    select.id = id;
    select.style.cssText = 'margin-right: 120px; margin-bottom: 10px;';

    for (var i = 0; i < values.length; i++) {
        var option = document.createElement('option');
	option.value = values[i];
	option.innerHTML = labels[i];
	select.appendChild(option);
    }

    return [label, select];
}

function presentProjectList( content, projects ) {

    var count = 0;

    var header = document.createElement('h2');
    header.innerHTML = 'Projects';
    content.appendChild(header);
    count++;

    for (var i = 0; i < projects.length; i++) {
        var projectBlock = document.createElement('div');
	projectBlock.style.cssText = 'background-color: #606060; margin-bottom: 20px; style: inline-block; height: 20px; width: 300px;';

        var projectTitle = document.createElement('span');
	projectTitle.innerHTML = projects[i].title;
	projectTitle.style.cssFloat = 'left';
	projectBlock.appendChild(projectTitle);

        var projectDate = document.createElement('span');
        projectDate.innerHTML = projects[i].date;
	projectDate.style.cssFloat = 'right';
        projectBlock.appendChild(projectDate);

	content.appendChild(projectBlock);
    }

    return count;
}

function presentProject(project) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    console.log('clicked on ' + project.title);
    
    var header = document.createElement('h2');
    header.innerHTML = project.title;
    content.appendChild(header);

    var desc = document.createElement('h3');
    desc.innerHTML = project.desc;
    content.append(desc);

    var notebox = createNotebox(project.notes);
    console.log(notebox);
    content.append(notebox);

    //need to return notebox to add functionality to submit button
    return notebox;
}

function createNotebox(notes) {
   var notepad = document.createElement('div');
   notepad.style.cssText = 'top: 0; right: 0; height: 100%; margin: 0px; padding: 0px;' + 
		' display: block; float: right; position: fixed; background-color: rgb(96, 96, 96);'; 

   var header = document.createElement('h3');
   header.innerHTML = 'Notes';
   notepad.appendChild(header);

   var showNotes = document.createElement('p');
   showNotes.innerHTML = notes;
   notepad.appendChild(showNotes);

   var editNoteField = document.createElement('textArea');
   editNoteField.id = 'noteField';
   editNoteField.style.cssText = 'display: none; clear: right;';
   editNoteField.innerHTML = notes;
   notepad.appendChild(editNoteField);
   
   var submitChange = document.createElement('button');
   submitChange.id = 'submitNote';
   submitChange.innerHTML = 'Submit';
   submitChange.style.display = 'none';
   notepad.appendChild(submitChange);
   /*submitChange.addEventListener('click', () => {
       editNoteField.style.display = 'none';
       submitChange.style.display = 'none';
   });*/
   
   var editButton = document.createElement('button');
   editButton.id = 'editNote';
   editButton.innerHTML = 'Edit';
   editButton.addEventListener('click', () => {
       editNoteField.style.display = 'block';
       submitChange.style.display = 'block';
   });
   notepad.appendChild(editButton);

   return notepad;
}

function presentTodoList (todoList) {
    var content = document.getElementById('content');
    
    var details = [];

    var todoItems = [];

    var completeButtons = [];
    var removeButtons = [];
    var submitChangeButtons = [];
    var detailFields = [];
    for (var i = 0; i < todoList.length; i++) {
        var todoItem = document.createElement('div');
	todoItems.push(todoItem);
	todoItem.innerHTML = (i+1) + '. ' + todoList[i].task;

	if (todoList[i].getIsDone())
	    todoItem.style.textDecoration = 'line-through';

	var completed = document.createElement('button');
	completed.innerHTML = 'Done';
	todoItem.appendChild(completed);

	var remove = document.createElement('button');
	remove.innerHTML = 'Remove';
	todoItem.appendChild(remove);

	removeButtons.push(remove);

	var todoDetails = document.createElement('h5');
	todoDetails.innerHTML = 'Details: ' + todoList[i].details;
	todoDetails.style.textDecoration = 'none';
	todoDetails.style.display = 'none';
	todoItem.appendChild(todoDetails);

	var editDetails = document.createElement('button');
	editDetails.innerHTML = 'Edit';
	todoDetails.appendChild(editDetails);

	var submitDetails = document.createElement('button');
	submitDetails.innerHTML = 'Submit';
	submitDetails.style.display = 'none';
	todoDetails.appendChild(submitDetails);
        submitChangeButtons.push(submitDetails);

	var editDetailField = document.createElement('textarea');
	editDetailField.style.display = 'none';
	editDetailField.innerHTML = todoList[i].details;
        todoDetails.appendChild(editDetailField);
        detailFields.push(editDetailField);

	editDetails.addEventListener('click', () => {
            submitDetails.style.display = 'inline';
            editDetailField.style.display = 'inline';
        });


	details.push(todoDetails);

	const index = i;
	todoItem.onmouseover = function() {
	    details[index].style.display = 'block';
	}

	todoItem.onmouseout = function() {
	    details[index].style.display = 'none';
	}
      
	completed.addEventListener('click', () => {
            todoItems[index].style.textDecoration = 'line-through';
        });
	completeButtons.push(completed);

	content.appendChild(todoItem);
    }

    return [completeButtons, removeButtons, submitChangeButtons, detailFields];
}

function buildTodoForm() {

    var todoForm = document.createElement('form');
    todoForm.id = 'todo';
    todoForm.style.cssText = 'right: 35%; position: fixed; margin-left: auto; margin-right: auto;' +
        'width: 300px; display: none; z-index: 5; font-family: Arial';

    var desc = generateFormField('desc', 'text', 'Task: ');
    addToContainer(todoForm, desc);

    var details = generateFormField('details', 'textarea', 'Details (optional): ', 'Locations, needed contact info, etc.');
    addToContainer(todoForm, details);

    var submit = generateFormField('todoSubmit', 'submit', 'Add Task');
    addToContainer(todoForm, submit);

    return todoForm;
}

