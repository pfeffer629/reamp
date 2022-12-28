import ReactPlayer from "react-player/lazy";

function AudioPlayer({ playerRef, url, onReady, playing, volume, onEnded }) {
  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      onReady={onReady}
      playing={playing}
      volume={volume}
      onEnded={onEnded}
    />
  );
}

export default AudioPlayer;
