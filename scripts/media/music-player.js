import { UNFRAMED_LYRICS } from '../data/unframed-lyrics.js';

let activeDetailAudio = null;
let activeAudioFrame = 0;

export const UNFRAMED_WAVEFORM = Object.freeze([0.557,0.543,0.567,0.538,0.876,0.89,0.9,0.879,0.901,0.867,0.887,0.928,0.95,0.92,0.931,0.976,0.998,0.979,1.0,0.987,0.989,0.986,0.97,0.718,0.655,0.877,0.895,0.892,0.915,0.876,0.886,0.915,0.928,0.925,0.937,0.93,0.872,0.958,0.968,0.944,0.966,0.956,0.945,0.97,0.863,0.899,0.966,0.944,0.958,0.943,0.929,0.944,0.933,0.883,0.892,0.888,0.899,0.885,0.893,0.925,0.79,0.939,0.93,0.935,0.951,0.941,0.944,0.943,0.824,0.54,0.861,0.938,0.952,0.921,0.927,0.947,0.93,0.896,0.904,0.898,0.923,0.894,0.686,0.642,0.83,0.87,0.912,0.915,0.804,0.742,0.547,0.67,0.754,0.777,0.726,0.423]);

export function formatAudioTime(seconds){
  if(!Number.isFinite(seconds)) return '00:00';
  const s=Math.max(0,Math.floor(seconds));
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}

export function cleanupDetailAudio(){
  if(activeAudioFrame){
    cancelAnimationFrame(activeAudioFrame);
    activeAudioFrame=0;
  }
  if(activeDetailAudio){
    activeDetailAudio.pause();
    activeDetailAudio=null;
  }
}

export function cleanupDetailVideo(preview){
  if(!preview) return;
  preview.querySelectorAll('video').forEach(video=>{
    try{ video.pause(); }catch(err){}
  });
}

export function setupMusicPlayer(preview){
  const stage=preview.querySelector('.detail-music-stage');
  const audio=preview.querySelector('.detail-music-audio');
  const play=preview.querySelector('.detail-music-play');
  const wave=preview.querySelector('.detail-music-wave');
  const progress=preview.querySelector('.detail-music-progress');
  const current=preview.querySelector('.detail-music-current');
  const total=preview.querySelector('.detail-music-total');
  const prevLyric=preview.querySelector('.detail-music-prev');
  const currentLyric=preview.querySelector('.detail-music-current-line');
  const nextLyric=preview.querySelector('.detail-music-next');
  const bars=[...preview.querySelectorAll('.detail-music-wave i')];

  if(!audio || !play) return;
  activeDetailAudio=audio;

  let activeLyricIndex=-2;

  const getLyricIndex=(time)=>{
    let lo=0, hi=UNFRAMED_LYRICS.length-1, answer=-1;
    while(lo<=hi){
      const mid=(lo+hi)>>1;
      if(UNFRAMED_LYRICS[mid].time<=time){
        answer=mid;
        lo=mid+1;
      }else{
        hi=mid-1;
      }
    }
    return answer;
  };

  const setLyricLine=(element,index,className)=>{
    if(!element) return;
    const item=UNFRAMED_LYRICS[index];
    element.className=`detail-music-lyric ${className}`;
    if(!item){
      element.textContent='·';
      element.classList.add('is-empty');
      element.onclick=null;
      return;
    }
    element.textContent=item.text;
    element.onclick=()=>{
      audio.currentTime=item.time;
      paint();
    };
  };

  const paintLyrics=()=>{
    const index=getLyricIndex(audio.currentTime||0);
    if(index===activeLyricIndex) return;
    activeLyricIndex=index;

    // Before the first timestamp, show the first lyric as the upcoming line.
    if(index<0){
      setLyricLine(prevLyric,-1,'detail-music-prev');
      setLyricLine(currentLyric,0,'detail-music-current-line is-current');
      setLyricLine(nextLyric,1,'detail-music-next');
      return;
    }

    setLyricLine(prevLyric,index-1,'detail-music-prev');
    setLyricLine(currentLyric,index,'detail-music-current-line is-current');
    setLyricLine(nextLyric,index+1,'detail-music-next');
  };

  const paint=()=>{
    if(activeDetailAudio!==audio) return;

    const dur=Number.isFinite(audio.duration) && audio.duration>0 ? audio.duration : 295.880;
    const ratio=Math.max(0,Math.min(1,(audio.currentTime||0)/dur));
    const played=Math.floor(ratio*bars.length);

    bars.forEach((bar,i)=>bar.classList.toggle('is-played',i<played));
    progress.style.setProperty('--progress',`${ratio*100}%`);
    current.textContent=formatAudioTime(audio.currentTime||0);
    total.textContent=formatAudioTime(dur);
    paintLyrics();

    if(!audio.paused && !audio.ended){
      activeAudioFrame=requestAnimationFrame(paint);
    }
  };

  const setPlayingUI=()=>{
    const isPlaying=!audio.paused && !audio.ended;
    stage.classList.toggle('is-playing',isPlaying);
    play.textContent=isPlaying?'PAUSE':'PLAY';
  };

  const seekAt=(element,event)=>{
    const rect=element.getBoundingClientRect();
    const ratio=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
    const dur=Number.isFinite(audio.duration) && audio.duration>0 ? audio.duration : 295.880;
    audio.currentTime=dur*ratio;
    paint();
  };

  play.addEventListener('click',async()=>{
    if(audio.paused){
      try{ await audio.play(); }catch(err){ console.warn('Audio playback was blocked:',err); }
    }else{
      audio.pause();
    }
    setPlayingUI();
    paint();
  });

  wave.addEventListener('pointerdown',e=>seekAt(wave,e));
  progress.addEventListener('pointerdown',e=>seekAt(progress,e));

  audio.addEventListener('loadedmetadata',paint);
  audio.addEventListener('play',()=>{ setPlayingUI(); paint(); });
  audio.addEventListener('pause',()=>{ setPlayingUI(); paint(); });
  audio.addEventListener('ended',()=>{ setPlayingUI(); paint(); });
  audio.addEventListener('timeupdate',paint);

  total.textContent='04:56';
  paint();
}
