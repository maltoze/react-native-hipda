import iconv from 'iconv-lite';

export const urlencode = (data: string, encoding = 'gbk') => {
  return [...iconv.encode(data, encoding)]
    .map((n) => `%${n.toString(16).padStart(2, '0')}`)
    .join('')
    .toUpperCase();
};
