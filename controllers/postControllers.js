import { Post } from "../model/postModel.js";
import { User } from "../model/userModel.js";

export const createPost = async (req, res) => {
	try {
		const { userId, description, postImage, firstName, lastName, location, profilePicture } = req.body
		const user = User.findById({ userId })
		const createPost = new Post({

			userId,
			firstName: firstName,
			lastName: lastName,
			location: location,
			description,
			profilePicture: profilePicture,
			postImage,
			likes: {},
			comments: []
		})
		await createPost.save()

		res.status(200).json({ success: true, message: "Post Submitted Successfully", createPost })

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}


export const readPost = async (req, res) => {
	try {
		const post = await Post.find().sort({ createdAt: -1 })
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const readUserPost = async (req, res) => {
	try {
		const { userId } = req.params;

		const post = await Post.find({ userId }).sort({createdAt: -1})
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}


export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body
		const post = await Post.findById(id)
		const isLiked = post.likes.get(userId)
		if (isLiked) {
			post.likes.delete(userId)
		}
		else {
			post.likes.set(userId, true)
		}


		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		)

		res.status(200).json(updatedPost)
	} catch (error) {
		res.status(404).json({ success: false, message: error.message })
	}
}


export const updatePost = async (req, res) => {


	try {
		const { postImage, id, description } = req.body
		const updatepost =await Post.findById(id)
		if (!updatepost) {
			return res.status(404).json({ success: false, message: "Post not found" })
		}
		await updatepost.updateOne({postImage,description})
		res.status(200).json({success:true, message:"Post Updated Successfully", updatepost})

	} catch (error) {
		res.status(404).json({ success: false, message: error.message })
	}


}


