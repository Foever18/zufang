import { request } from '@/utils/request'
export const getSwiper = () => {
  return request({
    url: '/home/swiper'

  })
}

export const getHomeGroup = (area) => {
  return request({
    url: `/home/groups?area=${area}`
  })
}

/**
 *取房屋查询条件
 * @param {*} id -城市id
 * @returns
 */
export const getHousesCondition = id => {
  return request({
    url: '/houses/condition',
    params: {

      id: 'AREA|88cff55c-aaa4-e2e0'
    }
  })
}
