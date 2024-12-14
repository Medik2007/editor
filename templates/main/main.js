var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.session.setMode("ace/mode/python");
editor.setValue("print('Hello World')");
document.getElementById('editor').style.fontSize='16px';
document.getElementById('editor').style.marginTop='60px';

var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/tomorrow_night");
terminal.session.setMode("ace/mode/python");
document.getElementById('terminal').style.fontSize='16px';

function runSuccess(response) {
    terminal.insert(response.result);
}

function run(e) {
    e.preventDefault();
    let data = {};
    data.lang = 'python';
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
