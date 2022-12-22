import {useState} from 'react';
import ReactPlayer from 'react-player/lazy'

export default function Player(audioUrl) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnReady = () => {
    setIsPlaying(true)
  }

  return (
    <ReactPlayer url={audioUrl} controls onReady={handleOnReady} playing={isPlaying} />
  );
}
