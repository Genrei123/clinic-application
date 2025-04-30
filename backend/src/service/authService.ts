import bcrypt from 'bcrypt';
import User from '../model/User/User';

const saltRounds = 10;
export const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePassword = async (username: string, password: string): Promise<boolean> => {
    const findUsername = await User.findOne({ where: { username } });
    if (!findUsername) {
        console.error("Error")
        return false;
    }

    try {
        const result = bcrypt.compare(password, findUsername.dataValues.password);
        return result;
    } catch (error) {
        console.error("Error comparison of passwords: ", error);
        return false;
    }

    
}

