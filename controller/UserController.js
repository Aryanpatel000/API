const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dl1rzeywr',
  api_key: '765934416391453',
  api_secret: '9e_IJxWe94R-yE5VOetkUo4uBt8'
});


class UserController {
  static getalluser = async (req, res) => {
    try {
      res.send('hello user')
    } catch (error) {
      console.log(error)
    }
  }
  static userinsert = async (req, res) => {
    try {
      console.log(req.files.image)
      const file = req.files.image //for upload image cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'profileImageapi'
      });

      // console.log(imageUpload);        
      //console.log(req.body)
      const { n, e, p, cp } = req.body
      const user = await UserModel.findOne({ email: e })
      // console.log(user)
      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "THIS EMAIL IS ALREADY EXITS" })
      } else {
        if (n && e && p && cp) {
          if (p === cp) {
            const hashpassword = await bcrypt.hash(p, 10)
            const result = new UserModel({
              name: n,
              email: e,
              password: hashpassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url
              }

            })
            await result.save()
            res
              .status(401)
              .json({ status: "failed", message: "REGISTRATION SUCCESSFULLY" }) // redirect to login page
          } else {
            res
              .status(401)
              .json({ status: "failed", message: "PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH" })
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "all fields are required" })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserController
