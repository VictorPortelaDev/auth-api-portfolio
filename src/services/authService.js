const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");

const register = async ({ name, email, password }) => {
  name = typeof name === "string" ? name.trim() : "";
  email = typeof email === "string" ? email.trim().toLowerCase() : "";

  // Validação dos campos
  if (!name || !email || !password) {
    const error = new Error("Name, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  // Validação da senha
  if (typeof password!== "string" || password.length < 6) {
    const error = new Error("Password must be at least 6 caracters long");
    error.statusCode = 400;
    throw error;
  }

  // Limite de 72 bytes do bcrypt
  if(Buffer.byteLength(password, "utf-8") > 72) {
    const error = new Error("Password must be at least 6 caracters long")
    error.statusCode = 400;
    throw error;
  }
  
  // Verificação de e-mail existente
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409; //Conflit
    throw error;
  }

  // Criptografia da senha
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Persistência do usuário

  const newUser = await userRepository.create({
    name,
    email,
    passwordHash,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

module.exports = {
  register,
};
