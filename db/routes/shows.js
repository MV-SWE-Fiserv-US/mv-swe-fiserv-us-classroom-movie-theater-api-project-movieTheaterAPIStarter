const express = require('express');
const  router  = express.Router();
const { User, Show }  = require('../../models/index');

router.get ('/', async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows)
})


router.get('/genre', async (req, res) => {
    const genre =  req.query.g;
    const movies = await Show.findAll({
        where: {
            genre: genre
        }
    })
    res.send(movies);
})


router.get('/:id', async (req, res) => {
        console.log("hi")   
        const id = req.param.id
        const show = await Show.findByPk(id)
        res.json(show)  
})



router.put('/', async (req, res) => {

    try {
        const id = req.body.showId;
        const show = await Show.findByPk(id);
        show.available = "true";    
        show.save();
        res.json(show)
        }
        
    catch (err) {
        next(err)
    }
})

router.delete('/', async (req, res) => {

    try {
            const id = req.body.showId;
            const show = await Show.findByPk(id);
            await show.destroy();
            show.save();
            res.status(200).json({message: "Show Deleted!"})
    }
    
    catch(err) {
        next(err)
    }

})




module.exports = router;