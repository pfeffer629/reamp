import {useState} from 'react';
import ReactPlayer from 'react-player/lazy'

export interface IPlayerProps {
  currentSong: {
  	lossyAudioUrl: string,
  	[key]: string | number,
  }
}

export default function Player(currentSong:IPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnReady = () => {
    setIsPlaying(true)
  }

  return (
    <ReactPlayer url={currentSong?.lossyAudioUrl} controls onReady={handleOnReady} playing={isPlaying} />
  );
}
