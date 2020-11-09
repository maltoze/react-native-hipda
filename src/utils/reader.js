export const readBlobHtml = html =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    // Wait till complete
    reader.onloadend = function(e) {
      const ret = e.target.result;
      resolve(ret);
    };
    reader.onerror = function(e) {
      reject(e);
    };
    reader.readAsText(html, 'gbk');
  });
