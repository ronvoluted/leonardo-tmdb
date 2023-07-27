import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

type ScryptPromise = (str: string | Buffer, salt: string | Buffer, keylen: number) => Promise<Buffer>;

const secret_pepper = process.env.SUPABASE_PEPPER;
const scryptPromise = <ScryptPromise>promisify(scrypt);
const KEY_LEN = 32;

if (!secret_pepper) {
  throw new Error('SUPABASE_PEPPER not set in env.local');
}

export const hash = async (
  str: string,
  salt: Buffer = randomBytes(16),
  pepper: string = secret_pepper
): Promise<{ derivedKey: string; salt: Buffer } | undefined> => {
  const pepperedString = str + pepper;

  try {
    const derivedKey = await scryptPromise(pepperedString, salt, KEY_LEN);

    return { derivedKey: derivedKey.toString('hex'), salt };
  } catch (err) {
    // <handle error but do not send input to logs>
    console.error('Unable to hash string', err instanceof Error && err.message);
  }
};

export const hashCheck = async (str: string, hashedStr: string, salt: Buffer): Promise<boolean> => {
  const hashResult = await hash(str, salt);

  return hashResult ? hashResult.derivedKey === hashedStr : false;
};
