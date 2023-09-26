import express from 'express'

import handlers from './blogs.handlers'
import { blogFinder } from './blogs.middlewares'
import { authenticatedUserExtractor } from '../../auth/auth.middlewares'

const router = express.Router()

router.get('/', handlers.getAll)
router.get('/:id', blogFinder, handlers.getById)
router.post('/', authenticatedUserExtractor, handlers.create)
router.delete('/:id', authenticatedUserExtractor, blogFinder, handlers.destroy)
router.put('/:id', blogFinder, handlers.update)

export default router
