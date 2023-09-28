import express from 'express'

import handlers from './readinglist.handlers'

const router = express.Router()

router.get('/', handlers.getAll)
router.post('/', handlers.create)

export default router
