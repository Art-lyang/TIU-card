# build-win.ps1 — Windows 한글/공백 경로 우회 빌드 헬퍼
# AGP는 non-ASCII 프로젝트 경로를 거부하므로(b.android.com/95744),
# app-android/ 를 C:\dev\tiu-app 으로 미러링한 뒤 그곳에서 Gradle을 실행한다.
#
# 사용:
#   .\build-win.ps1                 → 디버그 APK (기기 테스트용)
#   .\build-win.ps1 bundleRelease   → 릴리즈 AAB (서명 설정 후, Play 업로드용)
#
# 전제: JDK 21 (Capacitor 7 네이티브 모듈이 source release 21 요구)
#   C:\dev\jdk-21 이 있으면 자동 사용, 없으면 JAVA_HOME(21+) 사용
param([string]$Task = 'assembleDebug')

if (Test-Path 'C:\dev\jdk-21\bin\java.exe') {
  $env:JAVA_HOME = 'C:\dev\jdk-21'
}
if (-not $env:JAVA_HOME -or -not (Test-Path (Join-Path $env:JAVA_HOME 'bin\java.exe'))) {
  Write-Error 'JDK 21 이 필요합니다 — C:\dev\jdk-21 또는 JAVA_HOME 을 확인하세요.'
  exit 1
}

$src = $PSScriptRoot
$dst = 'C:\dev\tiu-app'

Write-Host "[1/2] 미러링: $src → $dst (www 제외)"
robocopy $src $dst /E /XD www /NFL /NDL /NJH | Out-Null
if ($LASTEXITCODE -ge 8) { Write-Error "robocopy 실패 (code $LASTEXITCODE)"; exit 1 }
# app\src 트리는 삭제 동기화(/MIR) — 단순 /E 복사는 리포에서 지운 파일(구 개별 JS, splash.png 등)을
# 미러에서 못 지워 APK에 죽은 파일이 섞인다. src는 전부 리포 결정 소스라 /MIR 안전 (build 산출물 없음)
robocopy "$src\android\app\src" "$dst\android\app\src" /MIR /NFL /NDL /NJH | Out-Null
if ($LASTEXITCODE -ge 8) { Write-Error "robocopy app\src 미러 실패 (code $LASTEXITCODE)"; exit 1 }

Write-Host "[2/2] Gradle $Task 실행"
Set-Location (Join-Path $dst 'android')
& .\gradlew.bat $Task
if ($LASTEXITCODE -ne 0) { Write-Error "Gradle 빌드 실패 (code $LASTEXITCODE)"; exit $LASTEXITCODE }

Write-Host ''
Write-Host "✔ 산출물 위치: $dst\android\app\build\outputs\"
Write-Host '   - 디버그 APK: apk\debug\app-debug.apk'
Write-Host '   - 릴리즈 AAB: bundle\release\app-release.aab'
