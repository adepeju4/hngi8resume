const { CreateBlogs, GetBlog } = require("../services/blogs.service");
const Blog = require("../model/blog");

exports.createBlog = async (req, res) => {
  try {
    const blog = req.body;
    const setBlog = new CreateBlogs(blog);
    const validateBody = setBlog.validateProp();

    if (validateBody) {
      const create = await Blog.create(blog);
      return res.status(201).send({
        status: "success",
        message: "Blog successfully created",
        data: create,
      });
    }
  } catch (error) {
    if (error.type) {
      return res.status(error.errorCode).send({
        error: error.type,
        status: "failed",
        message: error.message,
        data: null,
      });
    }
    return res.status(500).send({
      status: "failed",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().exec();
    res
      .status(200)
      .json({
        status: "success",
        message: "blogs retrieved successfully",
        data: blogs,
      })
      .end();
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { blogId } = req.query;
    const setReqId = new GetBlog(blogId);
    const validateReq = setReqId.validateProp(blogId);
    if (validateReq) {
      const blog = await Blog.findOne({ _id: blogId }).exec();
      return res.status(201).send({
        status: "success",
        message: "Blog successfully retrieved",
        data: blog,
      });
    }
  } catch (error) {
    if (error.type) {
      return res.status(error.errorCode).send({
        error: error.type,
        status: "failed",
        message: error.message,
        data: null,
      });
    }
    return res.status(500).send({
      status: "failed",
      message: "Internal server error",
      data: null,
    });
  }
};

exports.deleteBlog = async (req, res) => {
    try {
         const { blogId } = req.query;
         const setReqId = new GetBlog(blogId);
        const validateReq = setReqId.validateProp(blogId);
        
        if (validateReq) {
            const deleteBlog = await Blog.findByIdAndDelete({ _id: blogId })
              return res.status(200).send({
                status: "success",
                message: "Blog successfully deleted",
                data: deleteBlog,
              });
        }

    } catch (error) {
         if (error.type) {
           return res.status(error.errorCode).send({
             error: error.type,
             status: "failed",
             message: error.message,
             data: null,
           });
         }
         return res.status(500).send({
           status: "failed",
           message: "Internal server error",
           data: null,
         });
        
    }
};
