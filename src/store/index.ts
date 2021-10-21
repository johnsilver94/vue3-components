import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import user from './modules/user'

export interface State {
	user: { name: string }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	modules: {
		user,
	},
})
