import express from 'express'

import handlers from './blogs.handlers'
import { blogFinder } from './blogs.middlewares'

const router = express.Router()

router.get('/', handlers.getAll)
router.get('/:id', blogFinder, handlers.getById)
router.post('/', handlers.create)
router.delete('/:id', blogFinder, handlers.destroy)

export default router
