type BackButtonProps = {
  className?: string;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

function BackButton({
  className,
  width = 14,
  height = 13,
  onClick,
}: NextButtonProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M13.5273 10.7868L13.5273 2.29042C13.5273 1.85263 13.0719 1.58985 12.7287 1.82965L6.23459 6.36749C5.91205 6.59287 5.92656 7.10243 6.26133 7.3065L12.7554 11.265C13.0994 11.4747 13.5273 11.2096 13.5273 10.7868Z"
        fill="white"
      />
      <path
        d="M9.51172 11.6342L9.51172 1.39022C9.51172 0.862373 8.93606 0.545546 8.50232 0.834669L0.29443 6.3059C-0.113232 6.57764 -0.0948968 7.19201 0.32822 7.43805L8.53612 12.2108C8.97089 12.4636 9.51172 12.144 9.51172 11.6342Z"
        fill="white"
      />
    </svg>
  );
}

export default BackButton;
