@echo off
echo ========================================
echo Eclipse Bank - Reset do banco H2
echo ========================================
echo.
echo ATENCAO: pare o backend antes de continuar.
echo Este comando apaga os dados salvos em backend\data\eclipsebank.
echo.
set /p CONFIRMAR="Digite SIM para resetar o banco: "

if /I not "%CONFIRMAR%"=="SIM" (
    echo Reset cancelado.
    pause
    exit /b
)

cd /d "%~dp0"

if exist "backend\data\eclipsebank.mv.db" (
    del "backend\data\eclipsebank.mv.db"
    echo Arquivo eclipsebank.mv.db apagado.
) else (
    echo Arquivo eclipsebank.mv.db nao encontrado.
)

if exist "backend\data\eclipsebank.trace.db" (
    del "backend\data\eclipsebank.trace.db"
    echo Arquivo eclipsebank.trace.db apagado.
)

echo.
echo Banco resetado. Ao iniciar o backend novamente, o H2 cria um banco novo.
pause
