import throttle from 'lodash/throttle';

export const navigateOneTime = (navigate: any) =>
  throttle(navigate, 1000, { trailing: false });
