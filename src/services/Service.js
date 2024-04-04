const mongoose = require("mongoose");

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(query) {
    try {
      let { skip, limit } = query;

      skip = skip ? Number(skip) : 0;
      limit = limit ? Number(limit) : 10;

      delete query.skip;
      delete query.limit;

      if (query._id) {
        try {
          query._id = new mongoose.mongo.ObjectId(query._id);
        } catch (error) {
          console.log("not able to generate mongoose id with content", query._id);
        }
      }

      const items = await this.model.find(query).skip(skip).limit(limit);
      const total = await this.model.countDocuments(query);

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async getById(id) {
    try {
      let item = await this.model.findById(id);
      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: "Item not found",
        };
      }

      return {
        error: false,
        statusCode: 200,
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        errors: error,
      };
    }
  }

  async insert(data) {
    try {
     
      let item = await this.model.create(data);
      
      if (item) {
        return {
          error: false,
          statusCode: 201,
          data: item,
        };
      }
    } catch (error) {
      console.log("error", error);
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create item",
        errors: error.errors,
      };
    }
}
async getOne(query) {
  return await this.model.findOne(query).select('+password').exec();
}


  async update(id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        errors: error,
      };
    }
  }

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: "Item not found",
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        errors: error,
      };
    }
  }
}

module.exports = Service;
