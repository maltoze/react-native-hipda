export const readBlobHtml = (html) =>
  new Promise((resolve, reject) => {
    /* globals FileReader */
    const reader = new FileReader();
    // Wait till complete
    reader.onloadend = function (e) {
      const ret = e.target.result;
      resolve(ret);
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsText(html, 'gbk');
  });
