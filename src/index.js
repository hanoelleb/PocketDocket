import { generateFormField, generateSelect, presentProjectList} from './DOM';
import { projectFactory, projectRoster } from './project';

function initDocket() {
    var content = document.createElement('div');
    content.id = 'content';
    document.body.appendChild(content);

    //form: project title, due date, description, notes, priority, categories (school, work, home, 
    //social, recreation, finance, personal, other)

    var projectForm = document.createElement('form');
    content.appendChild(projectForm);
    projectForm.id = 'projectForm';
    projectForm.style.cssText = 'right: 35%; position: fixed; margin-left: auto; margin-right: auto;' +
	'width: 300px; display: none; z-index: 5; font-family: Arial';
    
    var newProjectButton = document.createElement('button');
    newProjectButton.innerHTML = 'New Project';
    newProjectButton.onclick = openProjectForm;
    content.appendChild(newProjectButton);

    var title = generateFormField('title', 'text', 'Title: ', 'Project Name');
    for (var i = 0; i < title.length; i++)
        projectForm.appendChild(title[i]);
    
    var date = generateFormField('date', 'date', 'Date: ');
    for (var i = 0; i < date.length; i++)
       projectForm.appendChild(date[i]);

    var desc = generateFormField('desc', 'textarea', 'Project Description (optional): ');
    for (var i = 0; i < desc.length; i++)
       projectForm.appendChild(desc[i]);

    var notes = generateFormField('notes', 'textarea', 'Project Notes (optional): ', 
	    'contact information, important links, ties to other projects, etc.');
    for (var i = 0; i < notes.length; i++)
       projectForm.appendChild(notes[i]);

    var priority = generateSelect('priority', [1,2,3], ['low', 'medium', 'high']);
    projectForm.appendChild(priority[0]);
    projectForm.appendChild(priority[1]);

    const categories = ['school', 'work', 'home', 'social', 'recreation', 'finance', 'personal', 'other'];
    var chooseCategory = generateSelect('category', categories, categories);
    projectForm.appendChild(chooseCategory[0]);
    projectForm.appendChild(chooseCategory[1]);

    var submit = generateFormField('submit', 'submit', 'Add Project');
    for (var i = 0; i < submit.length; i++)
        projectForm.appendChild(submit[i]);

    projectForm.onsubmit = submitForm;
}

function openProjectForm() {
    const projectForm = document.getElementById('projectForm');
    projectForm.style.display = 'block';
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
    console.log('title: ' + title + ' date: ' + date + ' desc: ' + desc + ' notes: ' + notes + 'priority: ' + priority +
    	    'categorty: ' + category);

    var newProj = projectFactory(title, date, priority, category, false, desc, notes);
    projectRoster.addToRoster(newProj);
    getProjectRoster();

    form.style.display = 'none';

    return false;
}

function getProjectRoster() {
    var content = document.getElementById('content');
    var roster = projectRoster.getRoster();
    console.log(roster);
    content.innerHTML = '';
    presentProjectList(content, roster);
}

function getTodoList() {

}

function test() {
    var tester = document.createElement('h1');
    tester.innerHTML = 'PocketDocket';
    document.body.appendChild(tester);
}

//test();
initDocket();
