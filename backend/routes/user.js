const express = require('express')
const zod = require('zod')
const jwt  = require('jsonwebtoken')
const { User, Account } = require('../db')
const JWT_SECRET = require('../config')
const {authMiddleware} = require('../middleware')

const router = express.Router();

const signupBody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string(),
})

router.post('/signup' ,async (req,res) => {
   const {success} = signupBody.safeParse(req.body);

   if (!success) {
    return res.status(411).json({
        message: "Email already taken / Incorrect inputs"
    })
   }

   const exitingUser = await User.findOne({username : req.body.username})

   if (exitingUser) {
       return res.status(411).json({
           message: "Email already taken / Incorrect inputs"
       })
   }

   const user = await User.create({
    username : req.body.username,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    password : req.body.password
   })

   const userid = user._id;

    await Account.create({
        userid : userid,
        balance : 1 + Math.random() * 100000
    })

        res.json({
            message: "User created succesfully",
            
        })
  
 
})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})

router.post('/signin' , async (req,res) => {
    const {success} = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message : "incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })
    if (user) {
        const token = jwt.sign({
            userid : user._id
        },JWT_SECRET)

        return res.json({
            token,
            username : req.body.username
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.put('/update' ,authMiddleware,async (req,res) => {
    const  {success} = updateBody.safeParse(req.body)

    if (!success) {
      return res.status(411).json({
            message: "Error while updating information"
        })
    }

     await User.updateOne({
        _id : req.userid
    }, req.body)
    res.json({
        message: "Updated successfully"
    })

})


router.get('/bulk' , async (req,res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        },
        {
            lastName : {
                "$regex" : filter
            }
        }
    ]
    })


    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})


module.exports = router;