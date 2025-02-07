/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

/* _____________ Your Code Here _____________ */

// type Includes<T extends readonly any[], U extends string | number | bigint | boolean | null | undefined> = {
//   [Index in keyof T as T[Index] extends U
//     ? Index extends string
//       ? `${U}` extends `${T[Index]}`
//         ? 0 // `${T[Index]}_${U}`
//         : never
//       : never
//     : never]: true;
// } extends { 0: true } ? true : false;

type First<T extends readonly any[]> = T extends { length: 0 } ? never : T[0];
type ExcludeFirst<T extends readonly any[]> =
  T extends { length: 0 }
    ? T
    : T extends [unknown, ...infer Rest]
      ? Rest
      : never;

type Test = ExcludeFirst<['Kars', 'Esidisi', 'Wamuu', 'Santana']>
//   ^?

type Includes<T extends readonly any[], U> =
  T extends { length: 0 }
    ? false
    : First<T> extends U
      ? true
      : Includes<ExcludeFirst<T>, U>

type MyType1 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>;
//   ^?
type MyType2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>;
//   ^?
type MyType3 = Includes<[true, 2, 3, 5, 6, 7], boolean>;
//   ^?
type MyType4 = Includes<[1 | 2], 1>; // not sure how to solve this case?
//   ^?
// not sure how to solve when T or U contain an object?
