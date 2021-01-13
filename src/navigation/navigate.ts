import throttle from 'lodash/throttle';

export const navigateOneTime = (navigate: () => void) =>
  throttle(navigate, 1000, { trailing: false });
