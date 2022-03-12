/**
 * Use this component to organize action details and call API.
 * Have methods for each type of action to track.
 */
import { recordAction } from '../api/PowerUpApi'

const actionCodes = {
  click: 'click',
  navigate: 'navigate',
}

export async function recordClick(clickedOn, intention) {
  await recordAction(actionCodes.click, { clickedOn, intention })
}

export async function recordNav(target) {
  await recordAction(actionCodes.navigate, { target })
}
