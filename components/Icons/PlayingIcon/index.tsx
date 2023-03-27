function PlayingIcon({}) {
  return (
    <svg
      fill="#fff"
      id="loading-bar"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="22"
      viewBox="0 0 16 22"
    >
      <g>
        <rect className="loading-bar" width="2.5" height="19" rx="2" x="3" />
        <rect
          className="loading-bar-middle"
          width="2.5"
          height="19"
          rx="2"
          x="8"
        />
        <rect className="loading-bar" width="2.5" height="19" rx="2" x="13" />
      </g>
    </svg>
  );
}

export default PlayingIcon;
