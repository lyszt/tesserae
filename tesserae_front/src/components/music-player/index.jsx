import { createSignal, onCleanup } from 'solid-js';
import { PlayCircleOutlinedIcon } from '@/components/ui/icons/ant-design-play-circle-outlined';
import { PauseOutlinedIcon } from '@/components/ui/icons/ant-design-pause-outlined';
import childrenOfLumiere from '@/assets/audios/music/childrenoflumiere.opus';

const SONG_NAME = "Children of Lumière";
const ARTIST_NAME = "Clair Obscur: Expedition 33";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = createSignal(false);
  
  let audioPlayer;
  let intervalId;
  let minRef, secRef;

  // Tick function - Runs once per second 
  const tick = () => {
    if (!audioPlayer) return;

    // Fast bitwise floor
    const intT = ~~audioPlayer.currentTime;

    let m = 0;
    
    // Manual checks for minutes
    if (intT >= 120) m = 2; 
    else if (intT >= 60)  m = 1; 
    
    // Update Minute DOM
    if (minRef.textContent != m) {
       minRef.textContent = m;
    }

    // Calculate Seconds
    const s = intT - (m * 60);
    const sStr = s < 10 ? '0' + s : s;
    
    // Update Second DOM
    if (secRef.textContent != sStr) {
       secRef.textContent = sStr;
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    clearInterval(intervalId);
    
    if (minRef) minRef.textContent = "0";
    if (secRef) secRef.textContent = "00";
  };

  const toggleMusicTheme = () => {
    if (isPlaying()) {
      audioPlayer.pause();
      clearInterval(intervalId);
    } else {
      audioPlayer.play();
      // Update immediately, then start 1s interval
      tick();
      intervalId = setInterval(tick, 1000);
    }
    setIsPlaying(!isPlaying());
  };

  onCleanup(() => {
    if (audioPlayer) audioPlayer.pause();
    clearInterval(intervalId);
  });

  return (
    <div class="flex items-center gap-2 z-5">
      <div class="rounded-full hover:bg-gray-50">
        <button
          onClick={toggleMusicTheme}
          class="inline-flex items-center justify-center gap-3 p-3"
        >
          {isPlaying() ? (
            <PauseOutlinedIcon size={16} color="#5a5f73" />
          ) : (
            <PlayCircleOutlinedIcon size={16} color="#5a5f73" />
          )}
          <audio
            ref={audioPlayer}
            onEnded={handleSongEnd}
            preload="none"
          >
            <source src={childrenOfLumiere} type="audio/ogg; codecs=opus" />
          </audio>
        </button>
      </div>

      <div class="flex flex-col justify-start
       text-black leading-tight items-start 
       text-left text-[.7em] w-[70%]">
        <span>{SONG_NAME} - {ARTIST_NAME}</span>
        
        <div class="text-xs leading-tightfont-mono min-w-[80px] text-black tabular-nums">
           <span ref={minRef}>0</span>:<span ref={secRef}>00</span>
        </div>
      </div>
    </div>
  );
}