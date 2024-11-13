const express = require('express')
const { router } = express.Router();
const { User } = require('../../models/Users');
const { Show } = require('../../models/Shows');


router.get("/", async (req,res) => {
    const allUsers = await User.findAll()
    res.json(allUsers);
})

router.get('/:username', async (req, res) => {
    const userId = req.param.id

    const user = await User.fidByPk({
        where: { 
            id: userId
        }
    })
    res.json(user)

})

router.get('/:id/shows', async (req, res) => {
    const user = req.param.id

    const shows = await Show.findAll({
        where: {
            userId: user
        }
     })

     res.json(shows);

})

router.put('/:id/shows/:showId', async (req, res, next) => {

try {
    const user = req.param.id;
    const id =  req.param.showId;

    const show = await Show.findByPk(id);
    await show.setUsers(user)
    res.status(200).json({message:"User and show associated"})
}

catch (err) {
    next(err)
}

})



