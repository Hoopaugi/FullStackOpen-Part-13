import express from 'express'

import handlers from './readingListItems.handlers'
import { authenticatedUserExtractor } from '../../auth/auth.middlewares'
import { readingListItemFinder } from './readingListItems.middlewares'

const router = express.Router()

router.get('/', handlers.getAll)
router.post('/', handlers.create)
router.put('/:id', authenticatedUserExtractor, readingListItemFinder, handlers.update)

export default router
