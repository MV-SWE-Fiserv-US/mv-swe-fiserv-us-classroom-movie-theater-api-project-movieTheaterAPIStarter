const express = require('express');
const  router  = express.Router();
const { User, Show }  = require('../../models/index');


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

router.get('/:id/shows', async (req, res, next) => {

    try {

        const user = req.param.id

        const watchedShows = await watched.findAll({
            where: {
                userId: user
            }
         })
    
         res.json(shows);
    }
    catch (err){
        next (err)
    }
   

})


router.put('/', async (req,res, next) => {
    
const userId = req.body.userId;
const showId = req.body.showId;

const user = await User.findByPk(userId);
const show = await Show.findByPk(showId);
const userAndShow = await user.addShow(show)
res.json({ userAndShow })
    
})


module.exports =  router




