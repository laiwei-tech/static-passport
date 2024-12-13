import MD5 from 'crypto-js/md5';

export interface AnyKeyProps {
  [key: string]: any;
}

export default function getDigest(data: {
  method: string;
  path: string;
  body: string | BodyInit | AnyKeyProps | null | undefined;
}) {
  const { method, path, body } = data;
  let params = '';
  if (body) {
    if (typeof body === 'string') {
      params = body;
    } else if (body instanceof Uint8Array) {
      const bodyString = new TextDecoder().decode(body);
      params = bodyString;
    } else if (typeof body === 'object') {
      const bodyString = JSON.stringify(body);
      params = bodyString;
    }
  }

  function convertChar(c: string, offset: number): string {
    const dict = '0123456789ABCDEF';
    const index = dict.indexOf(c);
    if (index === -1) {
      throw new Error('Invalid character in string');
    }

    let newIndex = index + offset;
    if (newIndex >= dict.length) {
      newIndex -= dict.length;
    }

    return dict[newIndex];
  }

  function generateRandomString(length: number) {
    const characters = '0123456789ABCDEF';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function mergeStrings(a: string, b: string) {
    let result = '';
    const maxLength = Math.max(a.length, b.length);

    // 交替取字符
    for (let i = 0; i < maxLength; i++) {
      if (i < a.length) {
        result += a[i]; // 从 a 中取字符
      }
      if (i < b.length) {
        result += b[i]; // 从 b 中取字符
      }
    }

    return result;
  }

  function convert(timeStr: string) {
    // 1. 补全秒数到 10 位
    const paddedTime = timeStr.padStart(10, '0');

    let convertedStr = '';
    for (let i = 0; i < paddedTime.length; i++) {
      convertedStr += convertChar(paddedTime[i], 10);
    }

    return convertedStr;
  }

  function shiftString(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (i % 2 === 0) {
        result += convertChar(str[i], 7);
      } else {
        result += convertChar(str[i], 3);
      }
    }

    return result;
  }

  let timestamp = new Date().getTime().toString();
  let timestampStr = timestamp.padStart(16, '0');
  let revertedTimestamp = timestampStr.split('').reverse().join('');
  let convertedTimestamp = convert(revertedTimestamp);

  const nonceA = generateRandomString(8);
  const nonceB = generateRandomString(8);
  const timeA = convertedTimestamp.slice(0, 8);
  const timeB = convertedTimestamp.slice(8, 16);

  const value = [nonceA + nonceB, timestamp, method, path, params].join('\n');

  const hash = MD5(value).toString().toUpperCase();

  const merged = mergeStrings(timeA + nonceA + timeB + nonceB, hash);

  const digest = shiftString(merged);

  return digest;
}
