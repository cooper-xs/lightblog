import jwt from 'jsonwebtoken';
import { TOKEN_CONF } from '../config/index';
const { secretKey, expiresIn } = TOKEN_CONF;

// 使用jwt生成token，传入用户id和权限
function generateToken(payload: object) {
  const token = jwt.sign(
    payload,
    secretKey,
    {
      expiresIn,
    },
  );
  return token;
}
async function verifyToken(token: string) {
  try {
    jwt.verify(token.split(' ')[1], secretKey);
    return true;
  } catch (e) {
    return false;
  }
}

export { generateToken, verifyToken };
