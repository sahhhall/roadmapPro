import bcrypt, { hash } from 'bcrypt';
const salt = 10;

export class Password {
    static async toHash(password: string) {
        try {

            const hash = await bcrypt.hash(password, salt);
            return hash;

        } catch (error) {
            console.log(error);

        }
    }
    static async compare(password: string, hashPassword: string) {
        try {
            return await bcrypt.compare(password, hashPassword);
        } catch (error) {
            console.log(error);
            return false
        }
    }
}