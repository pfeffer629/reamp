import {useState} from 'react';
import ReactPlayer from 'react-player/lazy'

type PlayerProps = {
  url: string,
}

export default function Player({url}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnReady = () => {
    setIsPlaying(true)
  }

  return (
    <ReactPlayer url={url} onReady={handleOnReady} playing={isPlaying} />
  );
}
