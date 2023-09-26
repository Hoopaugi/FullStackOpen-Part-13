import express from 'express'

import handlers from './auth.handlers'

const router = express.Router()

router.post('/login', handlers.login)

export default router
