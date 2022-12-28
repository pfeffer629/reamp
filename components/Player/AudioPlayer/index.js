import ReactPlayer from "react-player/lazy";

function AudioPlayer({ playerRef, url, onReady, playing, volume }) {
  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      onReady={onReady}
      playing={playing}
      volume={volume}
    />
  );
}

export default AudioPlayer;
