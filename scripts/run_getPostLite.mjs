import { getPostLite } from '../lib/post.js';

async function run(){
  const a = await getPostLite();
  console.log('no-tax nodes:', (a?.nodes || []).length);

  const b = await getPostLite(null, { key: 'tag', value: 'real-money-games' });
  console.log('tag nodes:', (b?.nodes || []).length);

  const c = await getPostLite(null, { key: 'categorySlug', value: 'card-game-apps' });
  console.log('category nodes:', (c?.nodes || []).length);
}

run().catch(e=>{console.error(e); process.exit(1);});
