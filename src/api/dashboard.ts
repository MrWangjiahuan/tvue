import request from '@/utils/request'

export const getProjects = () => {
  return request({
    url: '/dashboard/projects',
    method: 'GET'
  })
}

export const getActivity = () => {
  return request({
    url: '/dashboard/activity',
    method: 'GET'
  })
}

export const getTeams = () => {
  return request({
    url: '/dashboard/teams',
    method: 'GET'
  })
}

export const getRadar = () => {
  return request({
    url: '/dashboard/radar',
    method: 'GET'
  })
}
