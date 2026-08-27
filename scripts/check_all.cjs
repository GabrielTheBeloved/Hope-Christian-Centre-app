const fs = require('fs');

async function checkAll() {
  console.log("Fetching first page to see total pages...");
  const res = await fetch("https://yorubabaptisthymns.com/wp-json/wp/v2/posts?per_page=100&page=1");
  const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
  const totalPosts = parseInt(res.headers.get("x-wp-total") || "0", 10);
  console.log({ totalPages, totalPosts });

  // Let's sample pages
  const p1 = await res.json();
  console.log("Page 1 first 5 slugs/titles:", p1.slice(0, 5).map(p => ({ id: p.id, slug: p.slug, title: p.title.rendered })));
  console.log("Page 1 last 5 slugs/titles:", p1.slice(-5).map(p => ({ id: p.id, slug: p.slug, title: p.title.rendered })));
}

checkAll().catch(console.error);
