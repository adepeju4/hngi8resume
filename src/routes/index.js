const { Router } = require("express");
const { postMessage, getMessages } = require("../controllers/index.js");
const { contactUsValidator } = require("../validators");
const {createBlog, getBlogs, getBlog, deleteBlog} = require('../controllers/blogsController')

const router = Router();

router.post("/message", contactUsValidator(), postMessage);
router.post("/blogs", createBlog)
router.get("/blogs", getBlogs)
router.get("/blog", getBlog);
router.get("/list", getMessages);
router.delete("/blog", deleteBlog);

module.exports = router;