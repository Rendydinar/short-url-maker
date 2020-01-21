const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

/**
 * @route 	POST 	/api/url/shorten
 * @desc    Create short URL
 */
router.post('/shorten', async (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = config.get('baseUrl'); // get value of baseUrl in default.json inside config folder

	// Check base url
	if(!validUrl.isUri(baseUrl)) {
		// invalid base url
		return res.status(401).json('Invalid base url');
	}

	// Create url code
	const urlCode = shortid.generate();

	// Check long url
	if(validUrl.isUri(longUrl)) {
		// jika longUrl valid
		try {
			let url = await Url.findOne({ longUrl }); // cari short url dari long url didalam database

			if(url) {
				// jika short url ada di database
				// langsung merespon ke client
				res.status(200).json(url);
			} else {
				// jika short url belum ada didatabase
				// buat short url kemudian simpan ke database
				// dan lempat hasil short url ke client
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					date: new Date()
				});

				await url.save();

				res.json(url);
			}
		} catch (err) {
			// jika terjadi error di server (500)
			console.error(`error message: ${err.message}`);
			res.status(500).json('Server Error');
		} 
	} else {
		// jika longUrl invalid
		res.status(401).json('Invalid long url');
	}

});

module.exports = router;

