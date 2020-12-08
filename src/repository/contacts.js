const { ObjectID } = require("mongodb");
const { HttpCode } = require("../helpers/constants");
const { ErrorHandler } = require("../helpers/errorHandler");

class ContactsRepository {
  constructor(client) {
    this.collection = client.db().collection("contacts");
  }
  async getAll() {
    const results = await this.collection.find({}).toArray();
    return results;
  }
}

module.exports = ContactsRepository;
