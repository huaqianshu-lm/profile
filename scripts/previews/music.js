import { UNFRAMED_WAVEFORM, setupMusicPlayer } from '../media/music-player.js';

export function renderMusicPreview({ item, preview }) {

  const source=(item.id==='music' && item.media.audio)?UNFRAMED_WAVEFORM:
    Array.from({length:96},(_,i)=>.25+(((i*37)%70)/100));

  const spectrumColor=(t)=>{
    const stops=[
      [53,189,255],
      [80,112,255],
      [144,74,255],
      [244,79,183],
      [255,121,74],
      [255,213,79],
      [103,219,99]
    ];
    const scaled=t*(stops.length-1);
    const idx=Math.floor(scaled);
    const frac=Math.min(1,Math.max(0,scaled-idx));
    const a=stops[idx];
    const b=stops[Math.min(stops.length-1,idx+1)];
    const mix=(x,y)=>Math.round(x+(y-x)*frac);
    return [mix(a[0],b[0]),mix(a[1],b[1]),mix(a[2],b[2])];
  };

  const bars=source.map((amp,i)=>{
    const t=i/Math.max(1,source.length-1);
    const [r,g,b]=spectrumColor(t);

    // Keep the same overall vertical range, but increase local contrast
    // so nearby bars have clearer highs/lows like a lively spectrum.
    const base = Math.pow(amp, 0.98);
    const microA = .62 + .48*Math.abs(Math.sin(i*1.12));
    const microB = .78 + .24*Math.abs(Math.sin(i*2.96 + .8));
    const shaped = Math.min(1, base * microA * microB);

    // Pull low values lower and keep peaks high, so the ups/downs read stronger
    // without increasing the total waveform region height.
    const visualAmp = Math.pow(shaped, 1.22);

    const top=`rgba(${r},${g},${b},1)`;
    const bottom=`rgba(${Math.max(0,r-34)},${Math.max(0,g-38)},${Math.max(0,b-18)},0.88)`;
    // Stagger each bar with an intentionally uneven phase, matching the
    // supplied CSS sound-wave reference rather than a uniform travelling pulse.
    const jumpDelay=-((((i*7)%10)+1)*.1);
    return `<i style="--amp:${visualAmp.toFixed(4)};--d:${jumpDelay.toFixed(1)}s;--bar-top:${top};--bar-bottom:${bottom}"></i>`;
  }).join('');

  preview.innerHTML=`
    <div class="detail-music-stage">
      <div class="detail-music-orbit"></div>

      <div class="detail-music-track-label">
        <small>NOW PLAYING</small>
        <strong>${item.name}</strong>
      </div>

      <div class="detail-music-lyrics" aria-live="polite">
        <div class="detail-music-lyric detail-music-prev"></div>
        <div class="detail-music-lyric detail-music-current-line"></div>
        <div class="detail-music-lyric detail-music-next"></div>
      </div>

      <div class="detail-music-bottom">
        <div class="detail-music-wave" aria-label="Audio waveform — click to seek">
          ${bars}
        </div>

        <div class="detail-music-controls">
          <button class="detail-music-play" type="button">PLAY</button>
          <div class="detail-music-progress" style="--progress:0%" aria-label="Audio progress — click to seek"><i></i></div>
          <div class="detail-music-time">
            <span class="detail-music-current">00:00</span>
            <span> / </span>
            <span class="detail-music-total">04:56</span>
          </div>
        </div>
      </div>

      <audio class="detail-music-audio" preload="metadata" src="${item.media.audio}"></audio>
    </div>`;

  setupMusicPlayer(preview);
}
