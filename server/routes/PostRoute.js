import express from 'express'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, getSimilarPostsByDescription } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.get('/similar/:postId',getSimilarPostsByDescription)
export default router