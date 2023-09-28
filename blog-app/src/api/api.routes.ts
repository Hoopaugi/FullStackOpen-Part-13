import express from 'express'

import blogsRouter from './blogs'
import usersRouter from './users'
import authorsRouter from './authors'
import readinglistRouter from './readinglist'

const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/users', usersRouter)
router.use('/authors', authorsRouter)
router.use('/readinglists', readinglistRouter)

export default router
