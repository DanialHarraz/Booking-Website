const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

 
  module.exports.findUserByUsername = async (username) => {
    return prisma.user.findUnique({ where: { username } });
  },

  module.exports.createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { username, password: hashedPassword },
    });
  };

