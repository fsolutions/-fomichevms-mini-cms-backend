import dotenv from "dotenv";
export default {
  port: 1337,
  dbUri: `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@mongodb/${process.env.MONGO_DB_NAME}`,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
};
console.log(process.env.MONGO_DB_USERNAME);