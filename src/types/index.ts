interface IPhoto {
	src: string
	width: number
	height: number
	size?: { width: number; height: number }
}

interface IGraph {
	[index: string]: number
}

interface INodeWeight {
	id: string
	weight: number
}

type GalleryProps = {
	photos: IPhoto[]
	margin?: number
	limitNodeSearch?: number
	targetRowHeight?: number
	targetItemWidth?: number
}

enum LayoutType {
	Naive,
	Flex,
}

type RowLayout = {
	containerWidth: number
	limitNodeSearch: number
	targetRowHeight: number
	margin: number
	photos: IPhoto[]
	targetItemWidth: number
	layoutType?: LayoutType
}

type RowLayoutFunction = (rowLayout: RowLayout) => IPhoto[]

export type { GalleryProps, IPhoto, IGraph, INodeWeight, RowLayoutFunction }
export { LayoutType }
