export const getAvatarUri = (uid) => {
  var base_url = 'http://www.hi-pda.com/forum/uc_server/data/avatar/';
  var uid = new Array(9 - uid.length + 1).join('0') + uid;
  var str = [
    uid.substr(0, 3),
    uid.substr(3, 2),
    uid.substr(5, 2),
    uid.substr(7, 2),
  ].join('/');
  return base_url + str + '_avatar_big.jpg';
};
