import request from '../utils/request';
import qs from 'qs';

export async function querySystem(params) {
  return request(`/monitor/system?${qs.stringify(params)}`);
}
export async function queryServer(params) {
  return request(`/monitor/server?${qs.stringify(params)}`);
}
export async function queryServerConnect(params) {
  return request(`/monitor/server/connect?${qs.stringify(params)}`);
}
export async function queryEncryptAll(params) {
  return request(`/configuration/server/encrypt/all?${qs.stringify(params)}`);
}
export async function queryNetworkDelay(params) {
  return request(`/monitor/network/delay?${qs.stringify(params)}`);
}