enum Axis {
	X = 'x',
	Y = 'y',
	XY = 'xy',
}

enum SliderMode {
	INSIDE = 'inside',
	OUTSIDE = 'outside',
	SEMI = 'semi',
}

type Size = {
	width: number
	height: number
}

type Slider = {
	size: number | Size
	mode?: SliderMode
}

export type { Slider }
export { Axis, SliderMode }
