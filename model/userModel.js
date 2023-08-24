import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},

		email: {
			type: String,
			required: true,
			unique: true,

		},

		password: {
			type: String,
			required: true,
			min: 6,

		},

		profilePicture: {
			type: String,
			default: "https://cdn.pixabay.com/photo/2019/12/16/21/39/tree-4700352_640.jpg"

		},

		friends: {
			type: Array,
			default: []

		},
		location: String,
		occupation: String,
		viewedProfile: String,
		impression: Number,
	}, 
{
	timestamps: true
}
)


export const User = mongoose.model("User", userSchema)