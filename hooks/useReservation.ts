import { useReducer } from 'react'
import { startOfToday } from '@/lib/date'
import type { Mode, ReservationState, Step, TimeField } from '@/lib/types'

const initialState: ReservationState = {
  mode: 'storage',
  step: 1,
  year: 2026,
  month: 5, // Junio (0-indexado)
  start: null,
  end: null,
  pickingEnd: false,
  comp: null,
  startH: '09',
  startM: '00',
  endH: '18',
  endM: '00',
}

type Action =
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'GO_STEP'; step: Step }
  | { type: 'PREV_MONTH' }
  | { type: 'NEXT_MONTH' }
  | { type: 'PICK_DATE'; date: Date }
  | { type: 'SET_COMP'; comp: string }
  | { type: 'SET_TIME'; field: TimeField; value: string }
  | { type: 'RESET' }

function reducer(state: ReservationState, action: Action): ReservationState {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.mode,
        step: 1,
        start: null,
        end: null,
        pickingEnd: false,
        comp: null,
      }

    case 'GO_STEP':
      return { ...state, step: action.step }

    case 'PREV_MONTH':
      return state.month === 0
        ? { ...state, month: 11, year: state.year - 1 }
        : { ...state, month: state.month - 1 }

    case 'NEXT_MONTH':
      return state.month === 11
        ? { ...state, month: 0, year: state.year + 1 }
        : { ...state, month: state.month + 1 }

    case 'PICK_DATE': {
      const { date } = action
      if (state.mode === 'orders') {
        return { ...state, start: date, end: null }
      }
      // storage: selección de rango inicio → fin
      if (!state.start || (state.start && state.end)) {
        return { ...state, start: date, end: null, pickingEnd: true }
      }
      if (state.pickingEnd) {
        if (date.getTime() < state.start.getTime()) return { ...state, start: date }
        return { ...state, end: date, pickingEnd: false }
      }
      return state
    }

    case 'SET_COMP':
      return { ...state, comp: action.comp }

    case 'SET_TIME':
      return { ...state, [action.field]: action.value }

    case 'RESET':
      return { ...state, step: 1, start: null, end: null, pickingEnd: false, comp: null }

    default:
      return state
  }
}

export function useReservation() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const today = startOfToday()
  const minDate = startOfToday()
  minDate.setDate(minDate.getDate() + 3)

  return {
    state,
    today,
    minDate,
    setMode: (mode: Mode) => dispatch({ type: 'SET_MODE', mode }),
    goStep: (step: Step) => dispatch({ type: 'GO_STEP', step }),
    prevMonth: () => dispatch({ type: 'PREV_MONTH' }),
    nextMonth: () => dispatch({ type: 'NEXT_MONTH' }),
    pickDate: (date: Date) => dispatch({ type: 'PICK_DATE', date }),
    setComp: (comp: string) => dispatch({ type: 'SET_COMP', comp }),
    setTime: (field: TimeField, value: string) => dispatch({ type: 'SET_TIME', field, value }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}

export type ReservationController = ReturnType<typeof useReservation>
