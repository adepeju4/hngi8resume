const Contacts = require("../model");
const {resultsValidator} = require("../validators")


exports.postMessage = async (req, res) => {
    try {
    const contactBody = req.body;
    
    const { name, email, message } = contactBody;
        
    const errors = resultsValidator(req);
        if (errors.length > 0) {
        return res.status(400).json({
            method: req.method,
            status: res.statusCode,
            error: errors,
        });
    }
        
    const findDuplicateNameEmailAndMessage = await Contacts.findOne({
       $and: [{ name }, { email }, { message }]
    });
     if (findDuplicateNameEmailAndMessage) {
       return res.status(400).send({ message: "response already submitted" }).end();
    }
        
    const newMessage = await Contacts.create(contactBody);
    res.status(200).send({message:`Your message has been sent successfully`,  data: newMessage }).end();
    } catch (error) {
        res.status(400).send({ Error: "Invalid Request" }).end();
        console.log(error);
    }
}

exports.getMessages = async (req, res) => {
    try {
        const getAllMessages = await Contacts.find().exec();
        if (getAllMessages.length === 0) {
            return res.status(404).send({message: "You do not have any messages yet"})
        } else {
            return res.status(200).send({ message: "success", data: getAllMessages }).end();
        }
    } catch (error) {
        res.status(400).send({ Error: "Invalid Request" }).end();
        console.log(error);
    }
}