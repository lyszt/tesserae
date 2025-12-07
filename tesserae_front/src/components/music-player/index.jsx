import { createSignal, onCleanup } from 'solid-js';
import { PlayCircleOutlinedIcon } from '@/components/ui/icons/ant-design-play-circle-outlined';
import { PauseOutlinedIcon } from '@/components/ui/icons/ant-design-pause-outlined';
import childrenOfLumiere from '@/assets/audios/music/childrenoflumiere.mp3';

const SONG_NAME = "Children of Lumière";
const ARTIST_NAME = "Clair Obscur: Expedition 33";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(0);

  let audioPlayer;
  

  const handleTimeUpdate = () => {
    if (audioPlayer) {
      setCurrentTime(audioPlayer.currentTime);
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = ~~(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleMusicTheme = () => {
    if (isPlaying()) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying());
  };

  onCleanup(() => {
    if (audioPlayer) {
      audioPlayer.pause();
    }
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
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleSongEnd}
          >
            <source src={childrenOfLumiere} type="audio/mpeg" />
          </audio>
        </button>
      </div>

      <div class="flex flex-col justify-start items-start text-left text-[.7em] w-[70%] text-black">
        <span>{SONG_NAME} - {ARTIST_NAME}</span>
        <span class="text-xs">{formatTime(currentTime())}</span>
      </div>
    </div>
  );
}
