import { getPostLite } from '../lib/post.js';

async function run() {
  console.log('Testing getPostLite (no taxonomy)');
  const res1 = await getPostLite(null, null);
  console.log('no-tax nodes:', (res1?.nodes || []).length, 'pageInfo:', res1?.pageInfo);

  console.log('\nTesting getPostLite (tag: real-money-games)');
  const res2 = await getPostLite(null, { key: 'tag', value: 'real-money-games' });
  console.log('tag nodes:', (res2?.nodes || []).length, 'pageInfo:', res2?.pageInfo);

  console.log('\nTesting getPostLite (categoryName: card-game-apps)');
  const res3 = await getPostLite(null, { key: 'categoryName', value: 'card-game-apps' });
  console.log('category nodes:', (res3?.nodes || []).length, 'pageInfo:', res3?.pageInfo);
}

run().catch(err => { console.error('Script error:', err); process.exit(1); });
