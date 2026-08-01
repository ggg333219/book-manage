import type { SignOptions } from 'jsonwebtoken';

export default {
  JWT_SECRET: 'your_secret_key_123',
  // SignOptions['expiresIn'] 为 number | StringValue，避免字符串字面量类型报错
  JWT_EXPIRES_IN: '24h' as SignOptions['expiresIn']
};                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   