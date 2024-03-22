import { describe, expect, it, vi } from 'vitest'
import deepFreeze from 'deep-freeze'
import notificationReducer, {
  setNotification,
  clearNotification,
} from './notificationReducer'

describe('notificationReducer', () => {
  it('returns initial state', () => {
    const state = notificationReducer(undefined, { type: 'unknown' })
    expect(state).toEqual(null)
  })

  it('sets notification', () => {
    const state = notificationReducer(null, setNotification('test'))
    expect(state).toEqual('test')
  })

  it('clears notification', () => {
    const state = notificationReducer('test', clearNotification())
    expect(state).toEqual(null)
  })
})
