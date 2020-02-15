import Hash from '../models/Hash';

class HashQuery {
  async getHashByHash(hash) {
    const DocHash = await Hash.findOne({ where: { hash } });

    return DocHash && DocHash.get();
  }

  async createHash(data, user_id) {
    const DocHash = await Hash.create({
      ...data,
      user_id,
    });

    return DocHash && DocHash.get();
  }

  async deleteHashById(id) {
    return Hash.destroy({
      where: { id },
    });
  }
}

export default new HashQuery();
