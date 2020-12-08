const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsService = new ContactsService();

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAll();
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};
const getById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};
const create = async (req, res, next) => {
  try {
    const contact = await contactsService.create(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const contact = await contactsService.update(req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const contact = await contactsService.update(req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};
const remove = async (req, res, next) => {
  try {
    const contact = await contactsService.remove(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
