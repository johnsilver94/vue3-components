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
	INSIDE = 'inside',
	OUTSIDE = 'outside',
	SEMI = 'semi',
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

type Range = { min: number; max: number; total: number }

export type { XYCoordinates, Slider, Range }
export { Axis, SliderMode }
