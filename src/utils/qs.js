import { ROUTES } from '@/constants/constants';

/**
 * @TODO 解析对应uri
 */
export function goPath() {
  const { search } = window.location;
  const uri = new URLSearchParams(search);

  // check path
  if (uri.has('path') === false) {
    // alert('query string path is not exist');
    return;
  }

  const path = `/${uri.get('path')}`;
  const accessToken = uri.get('accessToken');
  const sessionKey = uri.get('sessionKey');
  const sysFlag = uri.get('sysFlag');
  const user = window.atob(uri.get('userInfo'));
  console.log('user', user);
  const userInfo = {
    sysFlag: +sysFlag,
    user: JSON.parse(user),
  };
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('sessionKey', sessionKey);
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  sessionStorage.setItem('userPermission', JSON.stringify(userInfo.user.permissions));
  sessionStorage.setItem('path', path);
  window.location.href = path;
}

/**
 * @TODO 获取对应path项
 */
export function getRoute(path) {
  const routes = ROUTES.filter(item => item.jump1 === path || item.jump2 === path);
  // console.log(routes);
  return routes.length > 0 ? routes : [];
}
