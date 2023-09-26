import express from 'express'

import blogsRouter from './blogs'
import usersRouter from './users'
import authorsRouter from './authors'

const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/users', usersRouter)
router.use('/authors', authorsRouter)

export default router
