var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.session.setMode("ace/mode/python");
editor.setValue("def foo():\n    print('hello world')\n\nfoo()");
document.getElementById('editor').style.fontSize='16px';
document.getElementById('editor').style.marginTop='60px';


function run_success(response) {
    console.log(response);
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
        success: run_success,
        error: function(error) {
            console.log(data);
            console.log('Error:', error);
        }
    });
}
