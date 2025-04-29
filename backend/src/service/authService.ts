import bcrypt from 'bcrypt';
import User from '../model/User/User';

const saltRounds = 10;
export const hashPassword = (password: string) => {
    return bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (username: string, password: string) => {
    const findUsername = await User.findOne({ where: { username } });
    if (!findUsername) {
        console.error("Error")
        return;
    }
}

