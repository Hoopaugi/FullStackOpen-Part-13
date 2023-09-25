import express from 'express'

import handlers from './blogs.handlers'

const router = express.Router()

router.get('/', handlers.getAll)
router.get('/:id', handlers.getById)
router.post('/', handlers.create)
router.delete('/:id', handlers.destroy)

export default router
