import express from 'express'

import handlers from './auth.handlers'

const router = express.Router()

router.post('/login', handlers.login)
router.put('/disable/:id', handlers.disable)

export default router
