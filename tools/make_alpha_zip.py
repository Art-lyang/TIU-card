# tools/make_alpha_zip.py — TIU-Alpha.zip 생성
# 포함: 프로젝트 소스 파일(html/js/css/png/mp3) + -setup/ 문서 + tools/ 스크립트
# 제외: .git, -Backup_all/, __pycache__, .claude/, tmp_endings/, TIU-Alpha.zip(자기 자신)
import os, sys, zipfile

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'TIU-Alpha.zip')

EXCLUDE_DIRS = {'.git', '-Backup_all', '__pycache__', '.claude', 'tmp_endings'}
EXCLUDE_FILES = {'TIU-Alpha.zip', '.gitignore', '.git'}
EXCLUDE_EXT = {'.pyc', '.zip'}

added = 0
skipped = 0
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if fn in EXCLUDE_FILES:
                skipped += 1
                continue
            ext = os.path.splitext(fn)[1].lower()
            if ext in EXCLUDE_EXT:
                skipped += 1
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace('\\', '/')
            arc = 'TIU-Alpha/' + rel
            try:
                zf.write(full, arc)
                added += 1
            except Exception as e:
                print('SKIP', rel, '—', e)
                skipped += 1

sz = os.path.getsize(OUT) / (1024 * 1024)
print(f'TIU-Alpha.zip 생성 완료')
print(f'  경로: {OUT}')
print(f'  파일: {added}  스킵: {skipped}')
print(f'  크기: {sz:.2f} MB')
