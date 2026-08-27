const fs = require('fs');

async function checkMedia() {
  const mediaRes = await fetch("https://yorubabaptisthymns.com/wp-json/wp/v2/media?per_page=50");
  const media = await mediaRes.json();
  console.log("Media total:", mediaRes.headers.get("x-wp-total"));
  console.log("Sample media mime types:", media.map(m => ({ id: m.id, mime_type: m.mime_type, source_url: m.source_url, title: m.title.rendered })).slice(0, 10));
}

checkMedia().catch(console.error);
