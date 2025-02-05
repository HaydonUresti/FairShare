import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(403).send({ message: 'No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token' })
    }
    req.user = user; // Attach the user info (e.g., userId) to the request
    next()
  })
}


export default authenticateToken