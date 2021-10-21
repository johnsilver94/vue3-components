/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
	state: (): { name: string } => ({
		name: 'Buster',
	}),
	getters: {},
	mutations: {
		SET_NAME(state: { name: string }, payload: string): void {
			state.name = payload
		},
	},
	actions: {
		saveName({ commit }: { commit: any }, data: string): void {
			commit('SET_NAME', data)
		},
	},
}
