import request from '../utils/request';

/**
 * @TODO 获取仪表盘数据
 * @returns
 */
export async function dashboardSource(type) {
  return request(`/report/monitor?type=${type}`);
}
