const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

/* GET home page. */
router.route('/')
	.get((req, res, next) => {
	  Restaurant.find((error, restaurants) => {
	  	if (error) {
	  		next(error);
	  	} else {
	  		res.render('restaurants/index', { restaurants });
	  	}
	  })
	})
  .post((req, res, next) => {
    const newRestaurant = {
      name:        req.body.name,
      description: req.body.description,
    };

  	const restaurant = new Restaurant(newRestaurant);

  	restaurant.save((error) => {
  		if (error) {
  			next(error);
  		} else {
  			res.redirect('/');
  		}
  	})

  });


router.route('/new')
	.get((req, res, next) => {
		res.render('restaurants/new');
	});

router.route('/:restaurant_id')
	.get((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/show', {restaurant});
			}
		})
	})
	.post((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				restaurant.name        = req.body.name;
				restaurant.description = req.body.description;
				restaurant.save((error) => {
		  		if (error) {
		  			next(error);
		  		} else {
		  			res.redirect('/');
		  		}
		  	})
			}
		})
	});

router.route('/:restaurant_id/edit')
	.get((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/update', { restaurant });
			}
		})
	});

router.route('/:restaurant_id/delete')
	.get((req, res, next) => {
		Restaurant.remove({ _id: req.params.restaurant_id }, function(error, restaurant) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/')
	    }
    });
	});

	router.post((req, res, next) => {
		// Get Params from POST
		let location = {
			type: 'Point',
			coordinates: [req.body.longitude, req.body.latitude]
		};
	
		// Create a new Restaurant with location
			const newRestaurant = {
				name:        req.body.name,
				description: req.body.description,
				location:    location
			};
	
		// Save the restaurant to the Database
		restaurant.save((error) => {
			if (error) { console.log(error) }
			else {
				res.redirect('/');
			}
		})
	});

module.exports = router;
