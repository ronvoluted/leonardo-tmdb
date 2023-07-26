import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

type ScryptPromise = (str: string | Buffer, salt: string | Buffer, keylen: number) => Promise<Buffer>;

const scryptPromise = <ScryptPromise>promisify(scrypt);

const KEY_LEN = 32;

export const hash = async (
  str: string,
  pepper: string,
  salt: Buffer = randomBytes(16)
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

export const hashCheck = async (str: string, pepper: string, salt: Buffer, storedHash: string): Promise<boolean> => {
  const hashResult = await hash(str, pepper, salt);

  return hashResult ? hashResult.derivedKey === storedHash : false;
};
