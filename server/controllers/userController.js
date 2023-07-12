const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({username});
        if (usernameCheck)
            return res.json({msg: "Username already used", status: false});
    
        const emailCheck = await User.findOne({email});
        if (emailCheck)
            return res.json({msg: "Email already used", status: false});
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, 
            username, 
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch(ex) {
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        if (!user)
            return res.json({msg: "Incorrect username or password.", status: false});
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.json({msg: "Incorrect username or password.", status: false});
        delete user.password;

        return res.json({ status: true, user });
    }   catch(ex) {
        next(ex);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet:true, 
            avatarImage
        });
        return res.json({isSet:userData.isAvatarImageSet, image: userData.avatarImage});
    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id: { $ne:req.params.id } }).select([
            "email", 
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};

module.exports.getUserContacts = async (req, res, next) => {
    try {
    
        const userId = req.params.id;
        const userContactsIds = await User.findById(userId).select([
            "contacts"
        ]);

        const userContacts = await User.find({_id: userContactsIds.contacts }).select([
            "email", 
            "username",
            "avatarImage",
            "_id"
        ]);
    
        return res.json(userContacts);
    } catch (ex) {
        next(ex);
    }
}

module.exports.getSingleUser = async (req, res, next) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({username});
        if (!user)
            return res.json({msg: `Could not find user ${username}`, status: false});

        return res.json({ status: true, user });
    }   catch(ex) {
        next(ex);
    }
}

module.exports.addContact = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const contact = req.body.contact;
        //console.log(`userId: ${userId}`);

        const userData = await User.findById(userId).select([
            "contacts"
        ]);

        if (!userData.contacts.includes(contact._id))
        {
            userData.contacts.push(contact);

            const contacts = userData.contacts;
            // now we need to update contacts with userData.contacts
            const updatedUserData = await User.findByIdAndUpdate(userId, {
                contacts
            });
    
           console.log(`updatedUserData: ${JSON.stringify(updatedUserData)}`);
            return res.json({isSet: true, userContacts: userData});
        }
        else {
            return res.json({isSet: false, msg: "Error adding contact. Contact may already exist"});
        }

    } catch (ex) {
        next(ex);
    }
}