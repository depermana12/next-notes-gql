import bcrypt from "bcrypt";

const pwd = {
  hash: async (password: string) => {
    return await bcrypt.hash(password, 10);
  },

  compare: async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

export default pwd;
