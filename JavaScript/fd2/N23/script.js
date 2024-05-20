var formDef1 = [
    {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
    {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
    {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
    {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
    {label: 'Рубрика каталога:', kind: 'dropdown', name: 'division', variants: [
        {text: 'здоровье', value: 1},
        {text: 'домашний уют', value: 2},
        {text: 'бытовая техника', value: 3}
    ]},
    {label: 'Размещение:', kind: 'radio', name: 'payment', variants: [
        {text: 'бесплатное', value: 1},
        {text: 'платное', value: 2},
        {text: 'VIP', value: 3}
    ]},
    {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
    {label: 'Описание сайта:', kind: 'memo', name: 'description'},
    {caption: 'Опубликовать', kind: 'submit'}
];

var formDef2 = [
    {label: 'Фамилия:', kind: 'longtext', name: 'lastname'},
    {label: 'Имя:', kind: 'longtext', name: 'firstname'},
    {label: 'Отчество:', kind: 'longtext', name: 'secondname'},
    {label: 'Возраст:', kind: 'number', name: 'age'},
    {caption: 'Зарегистрироваться', kind: 'submit'}
];

function createForm(formDef, formId) {
    var form = document.createElement('form');
    form.action = "https://fe.it-academy.by/TestForm.php";
    form.method = "GET";
    form.target = "_blank";
    form.id = formId;

    for (var i = 0; i < formDef.length; i++) {
        var field = formDef[i];
        var div = document.createElement('div');
        div.className = 'form-group';

        if (field.kind !== 'submit') {
            var label = document.createElement('label');
            label.innerHTML = field.label;
            div.appendChild(label);
        }

        var input;

        switch (field.kind) {
            case 'longtext':
                input = document.createElement('input');
                input.type = 'text';
                input.name = field.name;
                input.className = 'longtext';
                div.appendChild(input);
                break;

            case 'shorttext':
                input = document.createElement('input');
                input.type = 'text';
                input.name = field.name;
                input.className = 'shorttext';
                div.appendChild(input);
                break;

            case 'number':
                input = document.createElement('input');
                input.type = 'number';
                input.name = field.name;
                div.appendChild(input);
                break;

            case 'dropdown':
                var select = document.createElement('select');
                select.name = field.name;
                for (var j = 0; j < field.variants.length; j++) {
                    var optionData = field.variants[j];
                    var option = document.createElement('option');
                    option.value = optionData.value;
                    option.text = optionData.text;
                    select.appendChild(option);
                }
                div.appendChild(select);
                break;

            case 'radio':
                for (var j = 0; j < field.variants.length; j++) {
                    var optionData = field.variants[j];
                    var radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = field.name;
                    radioInput.value = optionData.value;

                    var radioLabel = document.createElement('label');
                    radioLabel.innerHTML = optionData.text;
                    div.appendChild(radioInput);
                    div.appendChild(radioLabel);
                }
                break;

            case 'check':
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = field.name;
                checkbox.checked = true;
                div.appendChild(checkbox);
                break;

            case 'memo':
                var textarea = document.createElement('textarea');
                textarea.name = field.name;
                div.appendChild(textarea);
                break;

            case 'submit':
                var submit = document.createElement('input');
                submit.type = 'submit';
                submit.value = field.caption;
                div.appendChild(submit);
                break;
        }

        form.appendChild(div);
    }

    document.getElementById('forms-container').appendChild(form);
}

createForm(formDef1, 'form1');
createForm(formDef2, 'form2');