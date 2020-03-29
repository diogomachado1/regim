export default {
  products: (method, userId, oneKey, entityPublic) => {
    const base = `${userId}:products`;
    let keys = [{ key: `${base}:page`, type: 'MANY' }];
    if (method === 'POST') return keys;
    if (method === 'PUT' || method === 'DELETE')
      keys = keys.concat([
        { key: oneKey, type: 'ONE' },
        { key: `${userId}:meals`, type: 'MANY' },
        { key: `${userId}:events`, type: 'MANY' },
        { key: `${userId}:list`, type: 'MANY' },
      ]);
    if (entityPublic) keys.push({ key: `public`, type: 'MANY' });
    return keys;
  },
  meals: (method, userId, oneKey) => {
    const base = `${userId}:meals`;
    let keys = [{ key: `${base}:page`, type: 'MANY' }];
    if (method === 'POST') return keys;
    if (method === 'PUT' || method === 'DELETE')
      keys = keys.concat([
        { key: oneKey, type: 'ONE' },
        { key: `${userId}:events`, type: 'MANY' },
        { key: `${userId}:list`, type: 'MANY' },
      ]);
    return keys;
  },
  events: (method, userId, oneKey) => {
    const base = `${userId}:events`;
    let keys = [{ key: `${base}:page`, type: 'MANY' }];
    if (method === 'POST') return keys;
    if (method === 'PUT' || method === 'DELETE')
      keys = keys.concat([
        { key: oneKey, type: 'ONE' },
        { key: `${userId}:list`, type: 'MANY' },
      ]);
    return keys;
  },
  users: (method, userId) => {
    const keys = [];
    if (method === 'PUT' || method === 'DELETE')
      return keys.concat([
        { key: `${userId}`, type: 'MANY' },
        { key: `public`, type: 'MANY' },
      ]);

    return keys;
  },
  duplicate_product: (_, userId) => [
    { key: `${userId}:products:page`, type: 'MANY' },
  ],
};
