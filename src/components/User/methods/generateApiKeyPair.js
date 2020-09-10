import bcrypt from 'bcryptjs';
import { v4 as uuidv4} from 'uuid';

export default async () => {
  const apiSecret = uuidv4();
  return {
    apiKey: uuidv4(),
    apiSecret,
    encryptedSecret: await bcrypt.hash(apiSecret, 10),
  };
};
