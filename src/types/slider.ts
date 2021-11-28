import { CSSProperties } from 'vue'

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

type Slider = {
	size: number
	mode?: SliderMode
	style?: CSSProperties
	class?: string
	areaStyle?: CSSProperties
	areaClass?: string
}

export type { Slider }
export { Axis, SliderMode }
