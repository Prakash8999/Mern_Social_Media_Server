import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	}

	,
	location: String,
	description: String,
	postImage: String,
	profilePicture: String,

	likes: {
		type: Map,
		of: Boolean
	}
	,
	comments: {
		type: Array,
		default: []
	}
},
	{ timestamps: true }
)

export const Post = mongoose.model("Post", postSchema)