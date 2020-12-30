import jwt from 'jsonwebtoken';

export const tokenGenerate = jwt.sign(
    { user: 'admin' },  // can store which user has been logged in (id)
    process.env.REACT_APP_SERVER_API_KEY,
)
