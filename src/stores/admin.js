import { defineStore } from 'pinia'
import {
  fetchUsers,
  fetchUserRoles,
  fetchRoles,
  addUserRole,
  removeUserRole,
} from '../api/PowerUpApi'

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      userIndex: {},
      roleOptions: [],
      activity: [],
    }
  },
  getters: {
    user: (state) => (userKey) => state.userIndex[userKey],
    userList: (state) => Object.values(state.userIndex),
    isRoleOptionsLoaded: (state) => state.roleOptions.length > 0,
  },
  actions: {
    async refreshUsers() {
      const users = await fetchUsers()
      this.userIndex = {}
      users.forEach((user) => {
        this.userIndex[user.userKey] = user
      })
    },
    async loadUserDetails(userKey) {
      const user = this.user(userKey)
      if (!user) {
        console.log('user not cached', userKey)
      } else if (!user.roles) {
        const roles = await fetchUserRoles(userKey)
        if (roles) {
          this.user(userKey).roles = roles
        }
      } else {
        console.log('user and roles already cached')
      }
    },
    async loadRoleOptions() {
      if (!this.isRoleOptionsLoaded) {
        const results = await fetchRoles()
        this.roleOptions = results
      } else {
        console.log('role options already loaded')
      }
    },
    async assignUserRole(userKey, role) {
      if (await addUserRole(userKey, role)) {
        this.user(userKey).roles.push(role)
      }
    },
    async unassignUserRole(userKey, role) {
      if (await removeUserRole(userKey, role)) {
        const user = this.user(userKey)
        const starting = user.roles
        user.roles = starting.filter(
          (item) => item !== role
        )
      }
    },
  },
})
