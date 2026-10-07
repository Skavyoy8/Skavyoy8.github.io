import type { ReactNode } from 'react'
import { type Fillable, isTodo } from '@/content/types'

export function TodoMark({ hint }: { hint: string }) {
  return (
    <span className="todo" title={hint}>
      [À REMPLIR]
    </span>
  )
}

/** Affiche la valeur si elle est connue, sinon le repère « [À REMPLIR] ». */
export function Fill<T>({ value, children }: { value: Fillable<T>; children: (value: T) => ReactNode }) {
  if (isTodo(value)) return <TodoMark hint={value.todo} />
  return <>{children(value)}</>
}
