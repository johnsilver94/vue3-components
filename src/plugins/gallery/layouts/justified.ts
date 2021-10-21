import { aspectRatio, round } from '../utils'
import { findRowDistribution } from '../rowDistribution'
import type { RowLayoutFunction, IPhoto, IGraph } from '@/types'
import { LayoutType } from '@/types'

const rowCommonHeight = (row: IPhoto[], containerWidth: number, margin: number): number => {
	const rowWidth: number = containerWidth - row.length * (margin * 2)
	const totalAspectRatio: number = row.reduce(
		(acc: number, photo: IPhoto) => acc + aspectRatio(photo.width, photo.height),
		0
	)
	return rowWidth / totalAspectRatio
}

const rowCost = (
	photos: IPhoto[],
	i: number,
	j: number,
	width: number,
	targetHeight: number,
	margin: number
): number => {
	const row: IPhoto[] = photos.slice(i, j)
	const commonHeight: number = rowCommonHeight(row, width, margin)
	console.log(`commonHeight:${commonHeight}; rowCost: ${Math.pow(Math.abs(commonHeight - targetHeight), 2)}`, row)
	return Math.pow(Math.abs(commonHeight - targetHeight), 2)
}

const createPotentialRow =
	(targetHeight: number, containerWidth: number, photos: IPhoto[], limitNodeSearch: number, margin: number) =>
	(start: number): IGraph => {
		const results: IGraph = {}
		start = +start
		results[+start] = 0
		for (let i = start + 1; i < photos.length + 1; ++i) {
			if (i - start > limitNodeSearch) break
			// const commonHeight: number = rowCommonHeight(photos.slice(start, i), containerWidth, margin)
			// if (commonHeight < targetHeight * 1.5 && commonHeight > targetHeight * 0.75)
			results[i.toString()] = rowCost(photos, start, i, containerWidth, targetHeight, margin)
		}
		console.log('createPotentialRow', results)
		return results
	}

export const rowLayout: RowLayoutFunction = ({
	containerWidth,
	limitNodeSearch,
	targetRowHeight,
	margin,
	photos,
	layoutType = LayoutType.Flex,
}) => {
	const potentialRow = createPotentialRow(targetRowHeight, containerWidth, photos, limitNodeSearch, margin)

	let path: number[]
	if (layoutType === LayoutType.Flex) {
		path = findRowDistribution(potentialRow, '0', photos.length)
	} else {
		path = []
		let cheapestRow: number
		let neighboringNodes: IGraph

		while (cheapestRow !== photos.length) {
			neighboringNodes = potentialRow(cheapestRow)
			console.log(neighboringNodes)
			cheapestRow = getCheapestRow(neighboringNodes)
			path.push(cheapestRow)
			console.log(cheapestRow)
		}
	}
	path = path.map((node) => +node)

	console.log(path)

	for (let i = 1; i < path.length; ++i) {
		const row: IPhoto[] = photos.slice(path[i - 1], path[i])
		let height: number = rowCommonHeight(row, containerWidth, margin)
		if (layoutType === LayoutType.Naive && i === path.length - 1 && height > targetRowHeight * 1.25) {
			height = targetRowHeight
		}
		for (let j = path[i - 1]; j < path[i]; ++j) {
			photos[j].size = { width: round(height * aspectRatio(photos[j].width, photos[j].height), 1), height: height }
		}
	}
	return photos
}

const getCheapestRow = (neighboringNodes: IGraph): number => {
	let min = Number.MAX_SAFE_INTEGER
	let minKey = 0
	for (const [key, value] of Object.entries(neighboringNodes)) {
		console.log(key, value)
		if (value > 0 && min > value) {
			min = value
			minKey = Number(key)
		}
	}
	return minKey
}
