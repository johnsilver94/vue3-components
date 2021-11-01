import { aspectRatio, round } from '../utils'
import { findRowDistribution } from '../rowDistribution'
import type { RowLayoutFunction, IPhoto, IGraph } from '@/types'
import { LayoutType } from '@/types'
import { maxPerRow } from '..'

const rowCommonHeight = (row: IPhoto[], containerWidth: number, margin: number): number => {
	const rowWidth: number = containerWidth - row.length * (margin * 2)
	const totalAspectRatio: number = row.reduce(
		(acc: number, photo: IPhoto) => acc + aspectRatio(photo.size.width, photo.size.height),
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
		return results
	}

export const rowLayout: RowLayoutFunction = ({
	row: { width, height, maxItems = maxPerRow(height, width) },
	item: { margin, minWidth = width, maxWidth = width },
	sizes,
	layout = LayoutType.Flex,
}) => {
	if (minWidth !== width || maxWidth !== width) {
		const minRatio: number = minWidth / height
		const maxRatio: number = maxWidth / height

		sizes.forEach((item, i) => {
			const ratio: number = aspectRatio(item.width, item.height)
			if (ratio > maxRatio) {
				sizes[i].size = { width: maxWidth, height: height }
			} else if (ratio < minRatio) {
				sizes[i].size = { width: minWidth, height: height }
			} else {
				const { width, height } = sizes[i]
				sizes[i].size = { width, height }
			}
		})
	}

	const potentialRow = createPotentialRow(height, width, sizes, maxItems, margin)

	let path: number[]
	if (layout === LayoutType.Flex) {
		path = findRowDistribution(potentialRow, '0', sizes.length)
	} else {
		path = []
		let cheapestRow: number
		let neighboringNodes: IGraph

		while (cheapestRow !== sizes.length) {
			neighboringNodes = potentialRow(cheapestRow)
			cheapestRow = getCheapestRow(neighboringNodes)
			path.push(cheapestRow)
		}
	}
	path = path.map((node) => +node)

	for (let i = 1; i < path.length; ++i) {
		const row: IPhoto[] = sizes.slice(path[i - 1], path[i])
		let rowHeight: number = rowCommonHeight(row, width, margin)
		if (layout === LayoutType.Naive && i === path.length - 1 && rowHeight > height * 1.25) {
			rowHeight = height
		}
		for (let j = path[i - 1]; j < path[i]; ++j) {
			sizes[j].size = {
				width: round(rowHeight * aspectRatio(sizes[j].size.width, sizes[j].size.height), 1),
				height: rowHeight,
			}
		}
	}
	return sizes
}

const getCheapestRow = (neighboringNodes: IGraph): number => {
	let min = Number.MAX_SAFE_INTEGER
	let minKey = 0
	for (const [key, value] of Object.entries(neighboringNodes)) {
		if (value > 0 && min > value) {
			min = value
			minKey = Number(key)
		}
	}
	return minKey
}
