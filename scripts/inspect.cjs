const fs = require('fs');

async function inspect() {
  const postsRes = await fetch("https://yorubabaptisthymns.com/wp-json/wp/v2/posts?per_page=5");
  const posts = await postsRes.json();
  for (const p of posts) {
    console.log("==========================================");
    console.log("Post ID:", p.id, "Title:", p.title.rendered, "Slug:", p.slug);
    console.log("Excerpt:", p.excerpt ? p.excerpt.rendered : "");
    console.log("Full Content:\n", p.content.rendered);
  }
}
inspect();
