@echo off
cd /d "%~dp0"
git checkout --orphan temp-clean
git add -A
git reset -- demo/*.zip
git commit -m "feat: motion feedback + cloud save integration (clean history)"
git push origin temp-clean:main --force
git checkout -
git branch -D temp-clean
echo.
echo === PUSH COMPLETE ===
pause
