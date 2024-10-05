
import { v4 as uuidv4 } from 'uuid';

export class generatePasswordResetToken {
    static generate() {
        const token = uuidv4();
        return token;
    }

}