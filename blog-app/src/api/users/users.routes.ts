import express from 'express'

import handlers from './users.handlers'
import { userFinder } from './users.middlewares'

const router = express.Router()

router.get('/', handlers.getAll)
router.get('/:username', userFinder, handlers.getByUsername)
router.post('/', handlers.create)
router.put('/:username', userFinder, handlers.update)

export default router
