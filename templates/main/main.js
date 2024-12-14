var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.session.setMode("ace/mode/python");
editor.setValue("def foo():\n    print('hello world')\n\nfoo()");
document.getElementById('editor').style.fontSize='16px';
document.getElementById('editor').style.marginTop='60px';
