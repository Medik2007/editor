from django.http import JsonResponse
from django.shortcuts import render
import subprocess
import os
import tempfile


def main(request):
    if request.method == 'GET':
        return render(request, 'main/main.html')

    elif request.method == 'POST':
        lang = request.POST.get('lang')
        code = request.POST.get('code')

        with tempfile.TemporaryDirectory() as temp_dir:
            file = os.path.join(temp_dir, f'temp.{lang}')

            with open(file, 'w') as f:
                f.write(code)

            if lang == 'cpp':
                executable = os.path.join(temp_dir, 'temp')
                command = ['g++', file, '-o', executable]
                compilation = subprocess.run(command, capture_output=True, text=True)

                if compilation.returncode != 0:
                    return JsonResponse({'error':'compilation', 'result':compilation.stderr+'\n'})

                output = subprocess.run([executable], capture_output=True, text=True)

                if output.returncode != 0:
                    return JsonResponse({'error':'run', 'result':output.stderr+'\n'})

                return JsonResponse({'result':output.stdout+'\n\n'})

            else:
                command = ['python', file]
                output = subprocess.run(command, capture_output=True, text=True)

                if output.returncode != 0:
                    return JsonResponse({'error':'run', 'result':output.stderr+'\n'})

                return JsonResponse({'result':output.stdout+'\n'})
