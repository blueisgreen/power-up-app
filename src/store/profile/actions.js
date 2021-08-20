import { fetchOwnProfile, updateOwnProfile } from '../../api/PowerUpApi'

export async function fetchMyProfile({ commit }) {
  const profile = await fetchOwnProfile()
  commit('load', profile.data)
}

export async function updateMyProfile({ commit }, profileUpdates) {
  const profile = await updateOwnProfile(profileUpdates)
  commit('load', profile.data)
}
