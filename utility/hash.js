import bcrypt from 'bcryptjs';

/**
 * make hash Password
 */
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}