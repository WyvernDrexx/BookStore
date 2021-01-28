import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generatePasswordHash(password: string) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

async function generateJWT(payload: object): Promise<string> {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        return resolve(token);
      }
    );
  });
}

type JWTPayload = {
  email: string;
  name: string;
  iat: number;
  exp: number;
};

export type AuthPayload = {
  payload: JWTPayload;
  token: string | null;
  isAuthenticated: boolean;
};

async function getAuthPayload(token: string): Promise<AuthPayload> {
  return new Promise(function (resolve, reject) {
    try {
      const payload: JWTPayload = jwt.verify(
        token,
        process.env.TOKEN_SECRET
      ) as JWTPayload;
      resolve({
        token,
        isAuthenticated: true,
        payload,
      });
    } catch (error) {
      resolve({
        token: null,
        isAuthenticated: false,
        payload: null,
      });
    }
  });
}

export { generatePasswordHash, comparePassword, generateJWT, getAuthPayload };
