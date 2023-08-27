import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../model/userModel.js'



export const registerUser = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			profilePicture,
			friends,
			location,
			occupation,

		} = req.body;

		let user = await User.findOne({ email })
		if (user) return res.json({ success: false, message: "Email Already Exist" })

		const passwordHashed = await bcrypt.hash(password, 10)

		user = await User.create({
			firstName,
			lastName,
			email,
			password: passwordHashed,
			profilePicture,
			friends,
			location,
			occupation,
		})

		res.json({ success: true, message:  "User Created Successfully."  })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}


export const loginUser = async(req, res) =>{
try {
	const {email, password} =req.body;
	const user =await User.findOne({email})
	if(!email) return res.status(400).json({message: "Invalid email or password"})

	const isMatch = await bcrypt.compare(password, user.password)
	if(!isMatch) return res.status(400).json({message: "Invalid email or password"})
const token = jwt.sign({id:user._id, }, process.env.JWT_SECRET)
delete user.password;
res.status(200).json({token, user})
} catch (error) {
	res.status(500).json({ error: error.message })
}
}