export const round = (value: number, decimals = 0): number => {
	return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

export const aspectRatio = (width: number, height: number): number => round(width / height, 2)

export const maxPerRow = (targetRowHeight: number, containerWidth: number): number => {
	return round(containerWidth / targetRowHeight / 1.5) + 8
}
