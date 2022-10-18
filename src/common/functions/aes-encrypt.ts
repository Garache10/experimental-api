import crypto from 'crypto';

export class AesEncrypt {
  SharedKey: string;
  AesIV: Buffer;

  constructor() {
    const EncryptedKey = crypto.createECDH('secp256k1');
    EncryptedKey.generateKeys();
    const PublicKey = EncryptedKey.getPublicKey().toString('base64');
    this.SharedKey = EncryptedKey.computeSecret(PublicKey, 'base64', 'hex');
    this.AesIV = crypto.randomBytes(16);
  }

  encrypt(toEncrypt: string): string {
    const key = Buffer.from(this.SharedKey, 'hex');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, this.AesIV);
    let encrypted = cipher.update(toEncrypt, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const payload =
      this.AesIV.toString('hex') +
      encrypted +
      cipher.getAuthTag().toString('hex');
    return Buffer.from(payload, 'hex').toString('base64');
  }

  decrypted(sharedKey: string, toDecrypt: string): string {
    const hex_payload = Buffer.from(toDecrypt, 'base64').toString('hex');
    const payload_iv = hex_payload.substring(0, 32);
    const payload_encrypted = hex_payload.substring(
      32,
      hex_payload.length - 32 - 32,
    );
    const payload_auth_tag = hex_payload.substring(hex_payload.length - 32, 32);
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(sharedKey, 'hex'),
      Buffer.from(payload_iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(payload_auth_tag, "hex"));
    let decrypted = decipher.update(payload_encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  }
}
