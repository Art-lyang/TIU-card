---
title: 옵시디언 vault 사용법
type: guide
tags: [guide, obsidian, vault]
updated: 2026-05-18
---

# 옵시디언 vault 사용법

> 이 폴더 (`-setup/MD/`) 자체가 옵시디언 vault입니다.
> Claude Code, 옵시디언, git이 같은 마크다운 파일을 공유합니다.

## 1. vault 열기

### 옵시디언 데스크톱

1. 옵시디언 실행
2. 좌하단 **금고 전환(Switch Vault)** 아이콘 클릭
3. **"열기(Open folder as vault)"** 선택
4. 다음 경로 지정:

```
<저장소 루트>\-setup\MD
```

5. vault 신뢰 여부 묻는 안내가 뜨면 **"Trust author and enable plugins"** 선택 (커뮤니티 플러그인 없이 코어 플러그인만 활성화됩니다)

### 모바일

iOS/Android 옵시디언 앱은 클라우드 동기화(iCloud/Obsidian Sync) 또는 외부 동기화 도구가 필요합니다. 현재 vault는 데스크톱 + git 동기화 기준입니다.

## 2. 처음 들어가면

- 좌측 파일 트리에서 `_HOME` 노트를 열어 메인 허브로 들어갑니다.
- 또는 `Ctrl/Cmd + O` → `_HOME` 검색 → 엔터.
- 카테고리별 진입은 `_HOME` 하단의 [[_세계관-스토리라인]], [[_세계관-인물조직]], [[_세계관-한국]], [[_세계관-세계]] 링크 사용.

## 3. 위키링크 · 백링크

- `[[파일명]]` 입력으로 다른 노트 링크 작성. 옵시디언이 자동 완성합니다.
- `[[파일명|표시이름]]` 으로 별칭 가능.
- 우측 패널 **"Linked mentions"** — 이 노트를 가리키는 다른 노트.
- 우측 패널 **"Outgoing links"** — 이 노트에서 나가는 링크.

이름 충돌(예: `TIU-CHARACTER-BIBLE.md`가 ABERRANT와 WORLDBUILDING 둘 다 있음)이 있을 때는 폴더 경로를 포함하세요:

```md
[[ABERRANT+CHARACTER+KARUNTAL+SOVARI/TIU-CHARACTER-BIBLE]]
[[TIU-WORLDBUILDING/TIU-WORLDBUILDING/TIU-CHARACTER-BIBLE]]
```

## 4. 그래프 뷰

`Ctrl/Cmd + G` 또는 좌측 사이드바의 **그래프 뷰**.

[[.obsidian/graph]] 에 색상 그룹이 미리 설정되어 있습니다:

- 빨강 — ABERRANT (이변체)
- 파랑 — TIU-KOREA-* (한국 설정)
- 주황 — TIU-WORLD-COMPLETE-* (세계 설정)
- 노랑 — storyline (캐논)
- 보라 — WORLDBUILDING, SOVARI
- 빨강 — act-structure, card-design
- 흰색 — MOC 인덱스 노트 (`_` 접두 파일)

## 5. 태그 활용

각 MOC 노트의 frontmatter에 태그가 들어 있습니다:

- `#moc` — Map of Content 인덱스
- `#storyline`, `#act`, `#card-design` — 디자인
- `#character`, `#faction`, `#aberrant`, `#sovari`, `#karuntal` — 인물·종족
- `#korea`, `#daega`, `#wall`, `#north` — 한국
- `#world`, `#usa`, `#china`, `#japan`, `#russia`, `#eu`, `#germany` — 세계

좌측 **태그 패널**에서 클릭하면 같은 태그의 노트를 모아 볼 수 있습니다.

## 6. git 통합

이 vault는 git에 추적됩니다. 옵시디언에서 노트를 편집·생성하면 다음 git 흐름이 작동합니다:

- 노트 본문 (`*.md`) — 추적
- `.obsidian/app.json`, `appearance.json`, `core-plugins.json`, `graph.json` — 추적 (팀 공유 vault 설정)
- `.obsidian/workspace*`, `cache` — `.gitignore`로 제외 (개인 상태)
- `_attachments/`, `.trash/` — `.gitignore`로 제외

옵시디언에서 수정 후 변경사항을 커밋하려면:

```powershell
git status
git add -- "-setup/MD/<수정한 파일>"
git commit -m "docs: <변경 요약>"
```

## 7. Claude Code와의 협업

Claude Code(이 어시스턴트)는 vault 안의 마크다운을 직접 읽고 편집할 수 있습니다. 별도 MCP 서버 없이도:

- 옵시디언에서 새 노트 작성 → Claude Code가 즉시 인식
- Claude Code가 노트 편집 → 옵시디언이 즉시 인식 (HMR과 비슷한 핫 리로드)
- CLAUDE.md의 `Authoritative Sources`는 이 vault의 파일들과 동일

### 선택: Obsidian MCP 서버

vault를 다른 사용자나 다른 LLM에서도 표준화된 방식으로 다루고 싶다면 커뮤니티 MCP 서버 (예: `obsidian-mcp`)를 옵시디언 플러그인으로 설치할 수 있습니다. 현재 setup은 **MCP 없이도 완전히 작동**하므로 필수는 아닙니다.

## 8. 새 노트 추가 가이드

새 세계관 노트를 추가할 때:

1. 어떤 카테고리에 속하는지 결정 (한국/세계/인물/캐논/디자인 등)
2. 해당 카테고리 폴더에 노트 생성
   - 한국 신규 설정 → `TIU-KOREA-COMPLETE-2026/`
   - 세계 신규 국가 → `TIU-WORLD-COMPLETE-WITH-KOREA-2026/`
   - 이변체 신규 등급 → `ABERRANT+CHARACTER+KARUNTAL+SOVARI/`
3. frontmatter 추가 (선택이지만 권장):
   ```md
   ---
   title: 노트 제목
   tags: [korea, daega]
   updated: 2026-05-18
   ---
   ```
4. 해당 카테고리 MOC (`_세계관-한국` 등)에 위키링크 추가
5. 본문에서 관련 다른 노트들을 `[[위키링크]]`로 연결

## 9. 주의

- 옵시디언이 자동으로 만드는 `Files/` 폴더는 피하세요 — 기존 분류 폴더로 분류합니다.
- 노트 이름 변경 시 옵시디언이 다른 노트의 링크를 자동 업데이트합니다 (app.json의 `alwaysUpdateLinks: true`).
- `\` 백슬래시는 옵시디언이 위키링크 안에서 처리하지 않습니다 — 항상 `/` 슬래시 사용.
- 한국어 노트 이름은 잘 작동합니다. `_세계관-*.md` MOC도 한국어 이름입니다.

## 10. 관련 권위 출처 (CLAUDE.md 동기)

이 vault에 없는 권위 출처는 다음에 있습니다 (vault 바깥):

- 게임 GDD: `-setup/GDD/TIU-GAME-GDD-v11.md`
- 아카이브 코드: `data-archive.js` (프로젝트 루트)
- Validator: `tools/validator.js`
- 진단 에이전트: `.claude/agents/`

이 파일들을 옵시디언에서도 함께 보고 싶다면 vault 루트를 `-setup/`나 프로젝트 루트로 올릴 수도 있지만, **현재는 세계관 자료에 집중하기 위해 `-setup/MD/`만 vault로 둡니다**.
