import type { ColorRepresentation } from 'three'
import { reactive } from 'vue'

export interface State {
  height: number
}

export function useState(): State {
  return reactive<State>({
    height: 2
  })
}
