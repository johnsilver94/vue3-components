import type { INodeWeight } from '@/types'

export class BinaryHeap {
	content: INodeWeight[] = []
	scoreFunction: (n: INodeWeight) => number

	constructor(scoreFunction: (n: INodeWeight) => number) {
		this.scoreFunction = scoreFunction
	}

	push(element: INodeWeight): void {
		this.content.push(element)
		this.bubbleUp(this.content.length - 1)
	}

	pop(): INodeWeight {
		const result: INodeWeight = this.content[0]
		const end: INodeWeight = this.content.pop()
		if (this.content.length > 0) {
			this.content[0] = end
			this.sinkDown(0)
		}
		return result
	}

	remove(node: INodeWeight): void {
		const length: number = this.content.length
		for (let i = 0; i < length; i++) {
			if (this.content[i] !== node) continue
			const end: INodeWeight = this.content.pop()

			if (i === length - 1) break
			this.content[i] = end
			this.bubbleUp(i)
			this.sinkDown(i)
			break
		}
	}

	size(): number {
		return this.content.length
	}

	bubbleUp(n: number): void {
		const element: INodeWeight = this.content[n]
		const score: number = this.scoreFunction(element)
		while (n > 0) {
			const parentN: number = Math.floor((n + 1) / 2) - 1
			const parent: INodeWeight = this.content[parentN]

			if (score >= this.scoreFunction(parent)) break

			this.content[parentN] = element
			this.content[n] = parent
			n = parentN
		}
	}

	sinkDown(n: number): void {
		const length: number = this.content.length
		const element: INodeWeight = this.content[n]
		const elemScore: number = this.scoreFunction(element)

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const child2N: number = (n + 1) * 2
			const child1N: number = child2N - 1
			let swap: number = null
			let child1Score: number
			let child2Score: number

			if (child1N < length) {
				const child1: INodeWeight = this.content[child1N]
				child1Score = this.scoreFunction(child1)

				if (child1Score < elemScore) swap = child1N
			}

			if (child2N < length) {
				const child2: INodeWeight = this.content[child2N]

				child2Score = this.scoreFunction(child2)
				if (child2Score < (swap == null ? elemScore : child1Score)) swap = child2N
			}

			if (swap == null) break

			this.content[n] = this.content[swap]
			this.content[swap] = element
			n = swap
		}
	}
}
