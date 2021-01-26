import cheerio from 'cheerio';

export function loadHtml(html: string) {
  return cheerio.load(html, { _useHtmlParser2: true });
}

export function loadXml(xml: string) {
  return cheerio.load(xml, {
    _useHtmlParser2: true,
    xml: true,
  });
}
