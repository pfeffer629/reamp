import {useState} from 'react';
import ReactPlayer from 'react-player/lazy'

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({});

  const handleOnReady = () => {
    setIsPlaying(true)
  }

  return (
    <ReactPlayer url={currentSong?.lossyAudioUrl} controls onReady={handleOnReady} playing={isPlaying} />
  );
}
