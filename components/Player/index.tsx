import {useState} from 'react';
import ReactPlayer from 'react-player/lazy'

type PlayerProps = {
  audioUrl: string,
}

export default function Player({audioUrl}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnReady = () => {
    setIsPlaying(true)
  }

  return (
    <ReactPlayer url={audioUrl} controls onReady={handleOnReady} playing={isPlaying} />
  );
}
