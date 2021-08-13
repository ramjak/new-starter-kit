import IRequestService, {
  IPayload,
  IPostRequestOptions,
  IRequestOptions,
  requestMethodEnum,
} from './IRequestService';

function generateRandomRealString() {
  const randomDigits = Math.floor((Math.random() * 100) % 16) + 1;
  return String(Math.random() * 10 ** randomDigits);
}

function generateRandomIntegerString() {
  return String(Math.floor(Math.random() * 10000000000000000));
}

function generateString(characters: string) {
  let result = '';
  const charactersLength = characters.length;
  const length = Math.floor((Math.random() * 100) % 16) + 1;
  for (let i = 0; i < length; i = i + 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateRandomAlphabetString() {
  return generateString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
}

function generateRandomAlphanumString() {
  return generateString(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  );
}

function generateRandomData() {
  let str = '';
  let charLeft = 2000000;
  // let charLeft = 200;

  const total = {
    alphabets: 0,
    reals: 0,
    integers: 0,
    alphanumerics: 0,
  };

  while (charLeft > 0) {
    const randomDigit = Math.floor((Math.random() * 100) % 4);
    let currentString = '';
    let currentType: keyof typeof total;
    switch (randomDigit) {
      case 0:
        currentString = generateRandomAlphabetString();
        currentType = 'alphabets';
        break;
      case 1:
        currentString = generateRandomAlphanumString();
        currentType = 'alphanumerics';
        break;
      case 2:
        currentString = generateRandomIntegerString();
        currentType = 'integers';
        break;
      default:
        currentString = generateRandomRealString();
        currentType = 'reals';
    }
    if (currentString.length + 2 <= charLeft) {
      str += currentString;
      str += '%2C%20';
      total[currentType] += 1;
      charLeft -= currentString.length + 2;
    } else {
      break;
    }
  }

  return {
    url: `data:application/octet-stream;charset=utf-8,${  str}`,
    summary: total,
  };
}

export default class MockRequestService implements IRequestService {
  public get(path: string, options?: IRequestOptions): any {
    switch (path) {
      case '/generate': {
        return {
          data: generateRandomData(),
        };
      }
      default:
        return {};
    }
  }

  public post(
    path: string,
    payload: IPayload,
    options?: IPostRequestOptions
  ): any {
    return {};
  }

  public request(
    method: requestMethodEnum,
    path: string,
    payload: IPayload,
    requestOptions?: IPostRequestOptions
  ): Promise<any> {
    return Promise.resolve(undefined);
  }
}
