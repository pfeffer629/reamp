import {useState} from 'react';
import ReactPlayer from 'react-player/lazy'

interface IPlayerProps {
  audioUrl: string;
}

export default function Player(audioUrl:IPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnReady = () => {
    setIsPlaying(true)
  }

  return (
    <ReactPlayer url={audioUrl} controls onReady={handleOnReady} playing={isPlaying} />
  );
}
