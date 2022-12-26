import ReactPlayer from "react-player/lazy";

function AudioPlayer({ playerRef, url, onReady, playing }) {
  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      onReady={onReady}
      playing={playing}
    />
  );
}

export default AudioPlayer;
