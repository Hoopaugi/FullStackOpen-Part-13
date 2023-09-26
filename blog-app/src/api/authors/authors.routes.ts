import express from 'express'

import handlers from './authors.handlers'

const router = express.Router()

router.get('/', handlers.getAll)

export default router
