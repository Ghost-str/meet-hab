import { omit } from 'lodash';

export default function omitEachKeyHelper(object: object) {
  return Object.keys(object).map((key) => {
    return [omit(object, [key]), key];
  });
}
