# 엔딩 시네마틱 영상 (drop-in)

엔딩 도달 시 큰 화면으로 재생(스킵 가능)되고, 이후 엔딩 hero에서 무한 루프되는 선택적 영상.

## 넣는 법

1. 영상 파일을 이 디렉토리에 아래 이름으로 넣는다 (엔딩 id 규칙 = `ending_<id>.mp4`):
   - 옵저버(F) 엔딩: `ending_F.mp4`
2. `images.js`(및 `demo/images.js`)의 `ENDING_VIDEOS`에서 해당 엔트리 주석을 해제한다:
   ```js
   const ENDING_VIDEOS = {
     ending_F: "assets/videos/endings/ending_F.mp4",
   };
   ```
3. `node tools/validator.js`로 root↔demo 미러 확인 → `node tools/stamp-cache.js`로 캐시 스탬프.

## 인코딩 규칙 (필수)

브라우저 `<video>` 호환을 위해 **H.264(avc1) + faststart** 만 사용한다 (CCTV 스팅 영상과 동일 규칙).
`mp4v`(MPEG-4 Part 2)·HEVC·ProRes는 재생되지 않는다.

생성 원본(예: Kling 1080p mp4)을 받은 뒤 변환:

```sh
ffmpeg -i ending_F_src.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart -crf 20 ending_F.mp4
```

- `-an` : 오디오 제거(게임 BGM과 겹치지 않도록 hero/시네마틱 모두 muted 재생).
- `-movflags +faststart` : 스트리밍 시작 지연 제거.

## 폴백 동작

`ENDING_VIDEOS`에 엔트리가 없거나, 파일 로드에 실패(`onError`)하면
기존 엔딩 이미지(`ending_<id>.webp`)로 **자동 폴백**한다. 안전하게 이미지-온리로 되돌아간다.
