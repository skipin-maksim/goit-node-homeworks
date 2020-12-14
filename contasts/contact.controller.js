const Joi = require("joi");
require("dotenv").config();
const { MongoClient, ObjectID } = require("mongodb");

// const uriDb =
//   "mongodb+srv://skipmaks:955742955742@hwnode.sro7m.mongodb.net/test";
const uriDb =
  "mongodb+srv://user:123@cluster0.jkmtu.mongodb.net/test?retryWrites=true&w=majority";
class ContactController {
  async getContacts(req, res, next) {
    const client = await new MongoClient(uriDb, {
      useUnifiedTopology: true,
    }).connect();

    try {
      const results = await client.db().collection("contacts").find().toArray();

      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: results,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    } finally {
      await client.close();
    }
  }

  async getSingleContact(req, res, next) {
    const client = await new MongoClient(uriDb, {
      useUnifiedTopology: true,
    }).connect();

    const objectId = new ObjectID(req.params.id);

    try {
      const results = await client
        .db()
        .collection("users")
        .find({ _id: objectId })
        .toArray();

      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: results,
        },
      });

      console.log("found contact --->", result, "<---");
    } catch (e) {
      console.error(e);
      next(e);
    } finally {
      await client.close();
    }
  }

  async createContact(req, res, next) {
    const client = await new MongoClient(uriDb, {
      useUnifiedTopology: true,
    }).connect();

    try {
      const {
        ops: [result],
      } = await client.db().collection("users").insertOne(req.body);

      res.json({
        status: "success",
        code: 201,
        data: {
          contact: result,
        },
      });

      console.log("new contact --->", result, "<---");
    } catch (e) {
      console.error(e);
      next(e);
    } finally {
      await client.close();
    }
  }

  async updateContact(req, res, next) {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const client = await new MongoClient(uriDb, {
      useUnifiedTopology: true,
    }).connect();
    try {
      const objectId = new ObjectID(id);
      const { value: result } = await client
        .db()
        .collection("users")
        .findOneAndUpdate(
          { _id: objectId },
          { $set: { name, email, phone } },
          { returnOriginal: false }
        );

      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });

      console.log("update contact --->", result, "<---");
    } catch (e) {
      console.error(e);
      next(e);
    } finally {
      await client.close();
    }
  }

  async deleteContact(req, res, next) {
    const { id } = req.params;
    const client = await new MongoClient(uriDb, {
      useUnifiedTopology: true,
    }).connect();
    try {
      const objectId = new ObjectID(id);
      const { value: result } = await client
        .db()
        .collection("users")
        .findOneAndDelete({ _id: objectId });
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });

      console.log("delete contact --->", result, "<---");
    } catch (e) {
      console.error(e);
      next(e);
    } finally {
      await client.close();
    }
  }

  validateCreateContact(req, res, next) {
    const valShema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const { error } = valShema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .send({ message: "missing required name, email or phone field" });
    }
    next();
  }
}

module.exports = new ContactController();
