import { Maybe } from 'monad-maniac'

export const getCurrentCursor = (state) => state.timeline.currentCursor
export const getStartCursor = (state) => Maybe.of(state.timeline.startCursor)
export const getEndCursor = (state) => Maybe.of(state.timeline.endCursor)
