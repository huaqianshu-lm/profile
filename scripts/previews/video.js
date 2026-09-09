const VIDEO_SRC = new URL('../../assets/01-what-is-codex.mp4', import.meta.url).href;
const VIDEO_POSTER = new URL('../../assets/01-what-is-codex-poster.jpg', import.meta.url).href;

export function renderVideoPreview({ preview }) {
  preview.innerHTML=`
    <video class="detail-video-only" controls playsinline preload="metadata" poster="${VIDEO_POSTER}" src="${VIDEO_SRC}" aria-label="Video Production Harness preview">
      当前浏览器无法播放此视频。
    </video>`;
}
