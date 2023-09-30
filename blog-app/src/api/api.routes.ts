import express from 'express'

import blogsRouter from './blogs'
import usersRouter from './users'
import authorsRouter from './authors'
import readingListItemsRouter from './readingListItems'

const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/users', usersRouter)
router.use('/authors', authorsRouter)
router.use('/readingListItems', readingListItemsRouter)

export default router
