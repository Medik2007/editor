var lang = 'cpp';

var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.session.setMode("ace/mode/c_cpp");
editor.setValue('#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}');
document.getElementById('editor').style.fontSize='16px';
document.getElementById('editor').style.marginTop='60px';

var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/tomorrow_night");
document.getElementById('terminal').style.fontSize='16px';

function runSuccess(response) {
    if (response.error) {
        if (response.error == 'compilation') {
            terminal.insert("Ошибка во время компиляции программы:\n\n");
        }
        else if (response.error == 'run') {
            terminal.insert("Ошибка во время работы программы:\n\n");
        }
    }
    terminal.insert(response.result);
}

function run(e) {
    e.preventDefault();
    let data = {};
    data.lang = lang;
    data.code = editor.getValue();
    data.csrfmiddlewaretoken = document.getElementById("csrf").value;
    $.ajax({
        type: 'POST',
        url: '',
        data: data,
        success: runSuccess,
        error: function(error) {
            console.log(data);
            console.log('Error:', error);
        }
    });
}

function changeLang(id, choice) {
    let parent = document.getElementById('lang');
    parent.insertBefore(parent.children[1], parent.children[0]);
    if (id == 1) {
        parent.children[0].innerHTML = "Python ▼";
        parent.children[1].innerHTML = "C/C++";
    }
    else {
        parent.children[0].innerHTML = "C/C++ ▼";
        parent.children[1].innerHTML = "Python";
    }

    lang = choice;
    if (choice == 'cpp') { editor.session.setMode('ace/mode/c_cpp'); }
    else { editor.session.setMode('ace/mode/python'); }
}

function changeTheme(id, choice) {
    let parent = document.getElementById('theme');
    parent.insertBefore(parent.children[1], parent.children[0]);
    if (id == 1) {
        parent.children[0].innerHTML = "White ▼";
        parent.children[1].innerHTML = "Dark";
        editor.setTheme("ace/theme/tomorrow");
        terminal.setTheme("ace/theme/tomorrow");
    }
    else {
        parent.children[0].innerHTML = "Dark ▼";
        parent.children[1].innerHTML = "White";
        editor.setTheme("ace/theme/tomorrow_night");
        terminal.setTheme("ace/theme/tomorrow_night");
    }
}
