import notificationReducer from './notificationReducer'
import { describe, expect, it, vi } from 'vitest'

describe('notificationReducer', () => {
  it('returns initial state', () => {
    const action = { type: 'unknown' }
    const state = notificationReducer(undefined, action)
    expect(state).toEqual(null)
  })

  it('sets notification', () => {
    const action = { type: 'SET_NOTIFICATION', data: 'some notification' }
    const state = notificationReducer(undefined, action)
    expect(state).toEqual('some notification')
  })
})
