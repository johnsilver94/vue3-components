import { CSSProperties } from 'vue'

type XYCoordinates =
	| {
			x: number
			y: number
	  }
	| {
			x?: number
			y: number
	  }
	| {
			x: number
			y?: number
	  }

enum Axis {
	X = 'x',
	Y = 'y',
	XY = 'xy',
}

enum SliderMode {
	INSIDE = 'i',
	OUTSIDE = 'o',
	SEMI = 's',
}

type Slider = {
	size: number
	position: XYCoordinates
	mode?: SliderMode
	style?: CSSProperties
	class?: string
	areaStyle?: CSSProperties
	areaClass?: string
}

export type { XYCoordinates, Slider }
export { Axis, SliderMode }
