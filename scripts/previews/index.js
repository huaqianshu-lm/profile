import { cleanupDetailAudio, cleanupDetailVideo } from '../media/music-player.js';
import { renderVideoPreview } from './video.js';
import { renderMusicPreview } from './music.js';
import { renderMemoraPreview } from './memora.js';
import { renderRadarPreview } from './radar.js';
import { renderLifeosPreview } from './lifeos.js';
import { renderEcholinePreview } from './echoline.js';

const PREVIEW_BUILDERS = Object.freeze({
  video: renderVideoPreview,
  music: renderMusicPreview,
  memora: renderMemoraPreview,
  news: renderRadarPreview,
  lifeos: renderLifeosPreview,
  echo: renderEcholinePreview
});

export function buildDetailPreview({ item, preview }) {
  cleanupDetailAudio();
  cleanupDetailVideo(preview);
  preview.className = 'work-detail-preview';
  preview.innerHTML = '';

  const builder = PREVIEW_BUILDERS[item.type];
  if (!builder) throw new Error(`Unknown detail preview type: ${item.type}`);
  builder({ item, preview });
}
