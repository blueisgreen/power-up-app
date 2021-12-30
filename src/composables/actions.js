/**
 * Use this component to organize action details and call API.
 * Have methods for each type of action to track.
 */
import { recordAction } from '../api/PowerUpApi'

const actionCodes = {
  click: 'click',
  navigate: 'navigate',
}

export function recordClick(clickedOn, intention) {
  recordAction(actionCodes.click, { clickedOn, intention })
}

export function recordNav(target) {
  recordAction(actionCodes.navigate, { target })
}
