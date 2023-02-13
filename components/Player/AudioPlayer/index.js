import ReactPlayer from "react-player/lazy";

function AudioPlayer({
  playerRef,
  url,
  onReady,
  playing,
  volume,
  onEnded,
  loop,
}) {
  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      onReady={onReady}
      playing={playing}
      volume={volume}
      onEnded={onEnded}
      loop={loop}
      width={0}
      height={0}
      config={{
        file: {
          forceAudio: true,
        },
      }}
    />
  );
}

export default AudioPlayer;
