const express = require('express');
const router = express.Router();
const { register, getAllUsers, getUserById, patchUserById } = require('../controllers/user')
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/create', register)
router.get(
    '/',
    verifyToken,
    getAllUsers
);
router.route("/find/:id")
    .get(
        verifyToken,
        getUserById
    )
    .patch(
        verifyToken,
        patchUserById
    )

module.exports = router 