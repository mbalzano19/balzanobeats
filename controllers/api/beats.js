const Beat = require('../../models/beat')
const Category = require('../../models/category')

async function create(req, res) {
    // console.log(req.body.category)
    try {

    const category = await Category.findOne({ name: req.body.category })
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
        const beat = new Beat({
            name: req.body.name,
            artist: req.body.artist,
            tempo: req.body.tempo,
            key: req.body.key,
            description: req.body.description,
            price: req.body.price,
            url: req.body.url,
            coverArt: req.body.coverArt,
            category: category._id,
            userId: req.user_id
        })
        // console.log('Category Id, I hope', category._id)
        // console.log('Category name, I hope', category.name)
        // console.log('new beat', beat)
        // console.log('heyyyyyyyyyy')

        const savedBeat = await beat.save()
        res.json({ beat: savedBeat })
        // console.log('console.log res in create controller', savedBeat)

    } catch (err) {
        res.status(400).json(err)
        console.error('Error adding beat:', err.data)
    }
}

async function index(req, res) {
    const beats = await Beat.find({}).populate('category')
    console.log('beats in index function', beats)
    const categories = await Category.find({Object})
    console.log('categories in index function', categories)
    res.json(beats)
  }
  
  async function show(req, res) {
    const beat = await Beat.findById(req.params.id)
    res.json(beat)
  }


module.exports = {
    create,
    index,
    show
}