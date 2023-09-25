import express from 'express'

import blogsRouter from './blogs'
import usersRouter from './users'

const router = express.Router()

router.use('/blogs', blogsRouter)
router.use('/users', usersRouter)

export default router
