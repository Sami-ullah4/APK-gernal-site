const url = 'https://3pattigoldgamer.me/graphql';

const queries = [
  {
    name: 'getCategoryBySlug',
    query: `query getCategoryBySlug { category(id: "card-game-apps", idType: SLUG) { id name slug count } }`,
  },
  {
    name: 'posts_categoryName_slug',
    query: `query postsByCategoryName { posts(first:10, where:{ orderby:{ field: DATE, order: DESC }, categoryName: "card-game-apps" }) { nodes { slug title } pageInfo { endCursor hasNextPage } } }`,
  },
  {
    name: 'posts_categorySlugIn',
    query: `query postsByCategorySlugIn { posts(first:10, where:{ orderby:{ field: DATE, order: DESC }, categorySlugIn: ["card-game-apps"] }) { nodes { slug title } pageInfo { endCursor hasNextPage } } }`,
  },
  {
    name: 'posts_categoryName_realname',
    query: `query postsByCategoryNameReal { posts(first:10, where:{ orderby:{ field: DATE, order: DESC }, categoryName: "Card Game Apps" }) { nodes { slug title } pageInfo { endCursor hasNextPage } } }`,
  },
];

async function run(){
  for (const q of queries) {
    try{
      console.log('\n===', q.name, '===');
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: q.query }) });
      console.log('status', res.status, res.statusText);
      const text = await res.text();
      console.log('body (first 1200 chars):\n', text.slice(0,1200));
    } catch(err){
      console.error('fetch error', err);
    }
  }
}

run();
