const Beat = require('../../models/beat')
const Category = require('../../models/category')

async function create(req, res) {
    // baby steps -> this was used to test our front end form
    // api call functionality
    
    console.log(req.body.category)


    try {
            // Search for the category by name
    const category = await Category.findOne({ name: req.body.category });
    
    if (!category) {
      // Handle the case when the category is not found
      return res.status(404).json({ error: 'Category not found' });
    }
        // const categoryId = await Category.findById(req.body.category)
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
        console.log('Category Id, I hope', category._id)
        console.log('Category name, I hope', category.name)
        console.log('new beat', beat)
        console.log('heyyyyyyyyyy')

        const savedBeat = await beat.save()
        res.json({ beat: savedBeat })
        // const beat = await Beat.create(req.body)
        // add the user to the db
        // console.log('console.log req in create controller', req)
        console.log('console.log res in create controller', savedBeat)
        // res.json(beat)

    } catch (err) {
        res.status(400).json(err)
        console.error('Error adding beat:', err.data)
    }
}

async function index(req, res) {
    const beats = await Beat.find({}).populate('category')
    // const category = await Category.findOne({ name: req.category });
    // console.log('beats in controllers', beats)
    // console.log('beats in controllers', Object.name)
    // const categories = await Category.find({}).sort('name').populate('category').exec()
    // re-sort based upon the sortOrder of the populated categories
    const categories = await Category.find({Object})
    console.log('object print', categories[1].name)
    // console.log('categories in controllers', categories)
    res.json(beats);
  }
  
  async function show(req, res) {
    const beat = await Beat.findById(req.params.id);
    res.json(beat);
  }


module.exports = {
    create,
    index,
    show
}