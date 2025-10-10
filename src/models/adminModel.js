const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports.checkUser = async function (username) {
  return prisma.user.findMany({
    where: { username: username }
  }).then((data) => {
    return data
  })
};

module.exports.verifyUser = async function (username, password) {
  return prisma.user.findMany({
    where: {
      username: username
    }
  }).then((data) => {
    return data
  }).catch((error) => {
    throw error
  })
};



