type NextButtonProps = {
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

function NextButton({className, onClick}: NextButtonProps) {
	return (
		<svg
			width={14}
			height={13}
			viewBox="0 0 14 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			onClick={onClick}
		>
			<path
				d="M0.349609 2.23566L0.349609 10.732C0.349609 11.1698 0.805068 11.4326 1.14824 11.1928L7.64232 6.65497C7.96486 6.42959 7.95035 5.92003 7.61558 5.71596L1.12151 1.75742C0.777515 1.54774 0.349609 1.81285 0.349609 2.23566Z"
				fill="white"
			/>
			<path
				d="M4.36523 1.38873L4.36523 11.6327C4.36523 12.1606 4.94089 12.4774 5.37463 12.1883L13.5825 6.71705C13.9901 6.44531 13.9718 5.83094 13.5487 5.5849L5.34084 0.812125C4.90606 0.559309 4.36523 0.878954 4.36523 1.38873Z"
				fill="white"
			/>
		</svg>
	);
}

export default NextButton;
