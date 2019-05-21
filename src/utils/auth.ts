export function getCurrentAuthority(): string[] {
  return ['admin']
}

export function check(authority): boolean {
  const current = getCurrentAuthority()
  return current.some(item => authority.includes(item))
}

export function isLogin(): boolean {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}
