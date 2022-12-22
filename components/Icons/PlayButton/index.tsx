import React from "react";

interface IPlayButton{
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

function PlayButton(props:IPlayButton) {
	return (
		<svg
			width={16}
			height={20}
			viewBox="0 0 16 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
			onClick={props.onClick}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.34203 0.236546C1.30431 -0.430612 0 0.392756 0 1.71499V18.285C0 19.6072 1.30431 20.4306 2.34203 19.7635L15.2288 11.4784C16.2571 10.8174 16.2571 9.18263 15.2288 8.52156L2.34203 0.236546Z"
				fill="white"
			/>
		</svg>
	);
}

export default PlayButton;
