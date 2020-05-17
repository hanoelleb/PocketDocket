
export {generateFormField, generateSelect, presentProjectList};

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
    for (var i = 0; i < projects.length; i++) {
        var projectBlock = document.createElement('div');
	projectBlock.style.cssText = 'border: solid black 2px';
	projectBlock.innerHTML = projects[i].title;
	content.appendChild(projectBlock);
    }
}
