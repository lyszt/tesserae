import { createSignal, onCleanup } from 'solid-js';
import { PlayCircleOutlinedIcon } from '@/components/ui/icons/ant-design-play-circle-outlined';
import { PauseOutlinedIcon } from '@/components/ui/icons/ant-design-pause-outlined';
import childrenOfLumiere from '@/assets/audios/music/childrenoflumiere.mp3';

const SONG_NAME = "Children of Lumière";
const ARTIST_NAME = "Clair Obscur: Expedition 33";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = createSignal(false);
  
  let audioPlayer;
  let rafId;
  let minRef, secRef;

  // CPU Cache
  let lastIntT = -1;
  let lastM = -1;

  const renderLoop = () => {
    if (!audioPlayer) return;

    const t = audioPlayer.currentTime;
    

    const intT = ~~t;

    if (intT !== lastIntT) {
      lastIntT = intT;

      let m = 0;
      
      // Since we know the song is short, we check thresholds manually.
      if (intT >= 120) m = 2; // 2:00+
      else if (intT >= 60)  m = 1; // 1:00+
      
      if (m !== lastM) {
        lastM = m;
        minRef.textContent = m;
      }

      // Calculate Seconds via Subtraction/Multiplication
      // s = intT - (m * 60); <-- Fast Multiply/Subtract
      const s = intT - (m * 60);
      
      secRef.textContent = s < 10 ? '0' + s : s;
    }

    if (!audioPlayer.paused) {
      rafId = requestAnimationFrame(renderLoop);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    cancelAnimationFrame(rafId);
    
    // Reset Logic
    lastIntT = -1;
    lastM = -1;
    if (minRef) minRef.textContent = "0";
    if (secRef) secRef.textContent = "00";
  };

  const toggleMusicTheme = () => {
    if (isPlaying()) {
      audioPlayer.pause();
      cancelAnimationFrame(rafId);
    } else {
      audioPlayer.play();
      rafId = requestAnimationFrame(renderLoop);
    }
    setIsPlaying(!isPlaying());
  };

  onCleanup(() => {
    if (audioPlayer) audioPlayer.pause();
    cancelAnimationFrame(rafId);
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
            <source src={childrenOfLumiere} type="audio/mpeg" />
          </audio>
        </button>
      </div>

      <div class="flex flex-col justify-start items-start text-left text-[.7em] w-[70%] text-black">
        <span>{SONG_NAME} - {ARTIST_NAME}</span>
        
        <div class="text-xs font-mono min-w-[80px]">
           <span ref={minRef}>0</span>:<span ref={secRef}>00</span>
        </div>
      </div>
    </div>
  );
}