const { Router } = require("express");
const { postMessage, getMessages } = require("../controllers/index.js");
const { contactUsValidator } = require("../validators");

const router = Router();

router.post("/message", contactUsValidator(), postMessage);
router.get("/list", getMessages);

module.exports = router;