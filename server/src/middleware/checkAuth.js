import createError from 'http-errors';
import firebase from '../lib/firebase.cjs';

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(createError(400, 'You did not specify any idToken for this request'));
    return;
  }
  const token = req.headers.authorization.split(' ')[1];

  try {
    const userPayload = await firebase.auth().verifyIdToken(token);
    req.user = userPayload;
    next();
  } catch (error) {
    next(createError(500, error.message));
  }
};

export default checkAuth;
