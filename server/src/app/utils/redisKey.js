const dictionary = {
  products: (params, { page = 1, search }, userId) => {
    const base = `${userId}:products`;
    if (params[0]) return `${base}:${params[0]}`;
    if (page && !search) return `${base}:page:${page}`;
    return undefined;
  },
  public_products: () => {
    return `public:products`;
  },
  meals: (params, { page = 1, search }, userId) => {
    const base = `${userId}:meals`;
    if (params[0]) return `${base}:${params[0]}`;
    if (page && !search) return `${base}:page:${page}`;
    return undefined;
  },
  events: (params, { fromDate, toDate }, userId) => {
    const base = `${userId}:events`;
    if (params[0]) return `${base}:${params[0]}`;
    if (fromDate && toDate) return `${base}:page:${fromDate}:${toDate}`;
    return undefined;
  },
};
/**
 * @param {import("express").Request} req
 */
export default function getRedisKey(req, entity, paths) {
  if (dictionary[entity]) {
    const entityKey = dictionary[entity](paths, req.query, req.userId);
    return entityKey;
  }
  return false;
}
