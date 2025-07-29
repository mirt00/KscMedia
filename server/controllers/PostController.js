import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

import {tokenize, termFrequency, inverseDocumentFrequency, tfidfVector, cosineSimilarity} from '../utils/tfidf.js';

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id.trim();
  const { userId, desc } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json("Post not found");

    if (post.userId === userId) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { desc },
        { new: true } // Return updated document
      );
      return res.status(200).json(updatedPost);
    } else {
      return res.status(403).json("Unauthorized: You can only edit your own posts");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};



// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id.trim();
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};




export const getSimilarPostsByDescription = async (req, res) => {
  try {
    const targetPost = await PostModel.findById(req.params.postId);
    if (!targetPost) return res.status(404).json({ message: 'Post not found' });

    const otherPosts = await PostModel.find({ _id: { $ne: targetPost._id } });

    // ✅ Use desc instead of content
    const targetTokens = tokenize(targetPost.desc);
    const otherTokens = otherPosts.map(post => tokenize(post.desc));

    const idf = inverseDocumentFrequency([targetTokens, ...otherTokens]);

    const targetVector = tfidfVector(targetTokens, idf);
    const otherVectors = otherTokens.map(tokens => tfidfVector(tokens, idf));

    const similarities = otherVectors.map((vec, index) => ({
      post: otherPosts[index],
      score: cosineSimilarity(targetVector, vec),
    }));

    similarities.sort((a, b) => b.score - a.score);

    const topSimilarPosts = similarities.slice(0, 5).map(item => item.post);

    res.json(topSimilarPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

