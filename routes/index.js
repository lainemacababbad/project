const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

// OAuth
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     OpenId:
 *       type: openIdConnect
 *       openIdConnectUrl: https://dev-u2wo228hitj2qwjk.us.auth0.com
 */
router.use(auth(config));

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get a user profile
 *     description: Retrieve profile
 *     security:
 *       - OpenId: []
 *     responses:
 *       200:
 *         description: Successful response with profile data
 */

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
  });

router.use('/filipinofood', require('./filipinofood'))

router.use('/shoppinglist', require('./shoppinglist'))

module.exports = router;