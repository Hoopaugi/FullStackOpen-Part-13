import express from 'express'

import handlers from './readinglist.handlers'
import { authenticatedUserExtractor } from '../../auth/auth.middlewares'
import { readinglistFinder } from './readinglist.middlewares'

const router = express.Router()

router.get('/', handlers.getAll)
router.post('/', handlers.create)
router.put('/:id', authenticatedUserExtractor, readinglistFinder, handlers.update)

export default router
