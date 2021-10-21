// import { BinaryHeap } from './binary-heap'
import { BinaryHeap } from './binaryHeap'
import type { IGraph, INodeWeight } from '@/types'

const buildPrecedentsMap = (graph: (start: number) => IGraph, startNode: string, endNode: number) => {
	const precedentsMap: IGraph = {}
	const visited: IGraph = {}
	const storedShortestPaths: IGraph = {}

	storedShortestPaths[startNode] = 0

	const pathQueue: BinaryHeap = new BinaryHeap(function (n: { weight: number }) {
		return n.weight
	})

	pathQueue.push({ id: startNode, weight: 0 })

	while (pathQueue.size()) {
		const shortestNode: INodeWeight = pathQueue.pop()
		const shortestNodeId = shortestNode.id

		if (visited[shortestNodeId]) continue

		const neighboringNodes: IGraph = graph(Number(shortestNodeId)) || {}
		visited[shortestNodeId] = 1

		console.log('neighboringNodes', neighboringNodes)
		for (const neighbor in neighboringNodes) {
			const newTotalWeight: number = shortestNode.weight + neighboringNodes[neighbor]

			if (typeof storedShortestPaths[neighbor] === 'undefined' || storedShortestPaths[neighbor] > newTotalWeight) {
				storedShortestPaths[neighbor] = newTotalWeight
				pathQueue.push({ id: neighbor, weight: newTotalWeight })
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				precedentsMap[neighbor] = shortestNodeId
			}
			console.log('precedentsMap', precedentsMap)
			console.log('storedShortestPaths', storedShortestPaths)
		}
		console.log('visited', visited)
	}

	if (typeof storedShortestPaths[endNode] === 'undefined') {
		throw new Error(`There is no path from ${startNode} to ${endNode}`)
	}
	return precedentsMap
}

const optimalDistribution = (precedentsMap: IGraph, endNode: number) => {
	const nodes: number[] = []
	let n: number = endNode
	while (n) {
		nodes.push(n)
		n = precedentsMap[n]
	}

	return nodes.reverse()
}

export const findRowDistribution = (graph: (start: number) => IGraph, startNode: string, endNode: number): number[] => {
	const precedentsMap = buildPrecedentsMap(graph, startNode, endNode)
	console.log('final', precedentsMap)
	return optimalDistribution(precedentsMap, endNode)
}
