
headers: { 'User-Agent': 'Mozilla/5.0' }

// realmnovel.js - إضافة موقع RealmNovel لـ LNReader
const scraper = {
  id: "realmnovel",  // يجب أن يكون فريداً
  name: "RealmNovel",
  site: "https://www.realmnovel.com",
  lang: "ar",
  type: "novel",

  async searchNovels(searchTerm) {
    const url = `${this.site}/?s=${searchTerm}&post_type=wp-manga`;
    const result = await fetch(url);
    const body = await result.text();
    const $ = cheerio.load(body);

    return $('.c-tabs-item__content').map((i, el) => ({
      title: $(el).find('.post-title h3').text().trim(),
      url: $(el).find('.post-title a').attr('href')
    })).get();
  },

  async parseNovel(novelUrl) {
    const result = await fetch(novelUrl);
    const body = await result.text();
    const $ = cheerio.load(body);

    return {
      title: $('.post-title h1').text().trim(),
      author: $('.author-content a').text().trim(),
      cover: $('.summary_image img').attr('src'),
      chapters: $('.wp-manga-chapter').map((i, el) => ({
        title: $(el).find('a').text().trim(),
        url: $(el).find('a').attr('href')
      })).get()
    };
  }
};

module.exports = scraper;