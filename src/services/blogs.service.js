const { Error, ValidationError, RequiredPropError, ReadError } = require('../Error/errorHandler')




class CreateBlogs {
  constructor({ title, author, message }) {
    this.title = title;
    this.author = author;
    this.message = message;
  }

    validateProp = function () {
    if (!this.title) throw new RequiredPropError(400, "title");
    if (!this.author) throw new RequiredPropError(400, "author");
    if (!this.message) throw new RequiredPropError(400, "message");
    return true
  };
}


class GetBlog {
    constructor(id) {
        this.blogId = id;
    }
    validateProp = function () {
        if (!this.blogId) throw new RequiredPropError(400, "blog id")
        return true;
    }
}



module.exports = { CreateBlogs, GetBlog };