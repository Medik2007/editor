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
            file = os.path.join(temp_dir, f'temp_code.{lang}')

            with open(file, 'w') as f:
                f.write(code)

            if lang == 'cpp' or lang == 'c':
                executable = os.path.join(temp_dir, 'temp_code')
                if lang == 'cpp':
                    command = ['g++', file, '-o', executable]
                else:
                    command = ['gcc', file, '-o', executable]
                compilation = subprocess.run(command, capture_output=True, text=True)

                if compilation.returncode != 0:
                    return JsonResponse({'error':'compilation', 'result':compilation.stderr})

                output = subprocess.run([executable], capture_output=True, text=True)

                if output.returncode != 0:
                    return JsonResponse({'error':'run', 'result':output.stderr})

                return JsonResponse({'result':output.stdout})

            else:
                command = ['python', file]
                output = subprocess.run(command, capture_output=True, text=True)

                if output.returncode != 0:
                    return JsonResponse({'error':'run', 'result':output.stderr})

                return JsonResponse({'result':output.stdout})








