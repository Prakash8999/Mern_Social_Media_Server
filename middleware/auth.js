import jwt from "jsonwebtoken";

export const VerifyToken = async (req, res, next) => {
	try {
		let token = req.header("Authorization")
		if (!token) return res.json({ message: "Access Denied" })

		if (token.startsWith("Bearer ")) {
			token = token.slice(7, token.length).trimLeft()

		}

		const verified = jwt.verify(token, process.env.JWT_SECRET)
		req.user = verified;
		next()
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}