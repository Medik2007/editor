from django.http import JsonResponse
from django.shortcuts import render
from io import StringIO
import sys

def main(request):
    if request.method == 'GET':
        return render(request, 'main/main.html')
    elif request.method == 'POST':
        #lang = request.POST.get('lang')
        code = request.POST.get('code')
        
        old_stdout = sys.stdout # Redirecting stdout to save result of exec() into a variable
        redirected_output = sys.stdout = StringIO()

        try:
            exec(code)
        except Exception as e:
            result = str(e)
        else:
            sys.stdout = old_stdout
            result = redirected_output.getvalue()

        return JsonResponse({'result':result})
