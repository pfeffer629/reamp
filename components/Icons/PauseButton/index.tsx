type PauseButtonProps = {
  className?: string;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

function PauseButton({
  className,
  width = 10,
  height = 16,
  onClick,
}: PauseButtonProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect width={3} height={17} rx={1} fill="white" />
      <rect x={6} width={3} height={17} rx={1} fill="white" />
    </svg>
  );
}

export default PauseButton;
