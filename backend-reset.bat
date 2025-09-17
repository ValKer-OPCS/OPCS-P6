@echo off
setlocal

REM Dossiers à ajuster si besoin
set BACKEND_DIR=%~dp0backend
set RESET_DIR=%~dp0backend-reset

echo --- RESET BACKEND ---

REM Supprimer database.sqlite
if exist "%BACKEND_DIR%\database.sqlite" (
    del /f /q "%BACKEND_DIR%\database.sqlite"
    echo database.sqlite supprime.
)

REM Supprimer le dossier images
if exist "%BACKEND_DIR%\images" (
    rmdir /s /q "%BACKEND_DIR%\images"
    echo Dossier images supprime.
)

REM Copier le contenu de backend-reset vers backend
xcopy "%RESET_DIR%\*" "%BACKEND_DIR%\" /e /i /y >nul
echo Contenu copie de backend-reset vers backend.

echo --- RESET TERMINE ---

