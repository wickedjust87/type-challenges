/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

type Todo = {
  title: string
  description: string
  completed: boolean
}

type Expected1 = {
  title: string
  completed: boolean
}

type Expected2 = {
  title: string
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/

/* _____________ Your Code Here _____________ */

type MyOmit<T extends {}, K extends keyof T> = {
  [PropertyName in keyof T as PropertyName extends K ? never : PropertyName]: T[PropertyName];
};

type MyType1 = MyOmit<Todo, 'description'>;
//   ^?

type MyType1 = MyOmit<Todo, 'description' | 'completed'>;
//   ^?
