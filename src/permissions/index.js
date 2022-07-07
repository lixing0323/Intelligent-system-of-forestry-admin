export const APP_NAME = 'webAdmin'
export const PERMISSIONS = {}

export function getPermissions() {
  const permissions = []
  if (PERMISSIONS) {
    const keys = Object.keys(PERMISSIONS)
    keys.forEach(key => {
      const permission = {
        terminalTag: APP_NAME,
        sortOrder: 1
      }
      Object.assign(permission, PERMISSIONS[key])
      permissions.push(permission)
    })
  }
  return permissions
}
