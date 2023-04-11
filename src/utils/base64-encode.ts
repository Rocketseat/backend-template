export function base64Encode(key = ''): string {
  return Buffer.from(key, 'base64').toString();
}
