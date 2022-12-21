@echo off
@setlocal

set /a total = %1

echo. & echo Iteration 1:
cmd /c timecmd python inference_realesrgan.py -s 2 --fp32

SETLOCAL ENABLEDELAYEDEXPANSION
for /l %%i in (3, 1, %total%) do (
	@echo on
	set /a iter = %%i - 1
	echo. & echo Iteration !iter!:
	cmd /c timecmd python inference_realesrgan.py -i results -s 2 --fp32
	@echo off
)

if %total% gtr 1 (
	echo. & echo Iteration %total%:
	cmd /c timecmd python inference_realesrgan.py -i results -s 2 --fp32
)