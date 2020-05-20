import { Children, cloneElement, isValidElement, ReactElement } from "react";

import { CloneableTransitionChildren, TransitionOptions } from "./types";
import useTransition from "./useTransition";

export interface TransitionProps<E extends HTMLElement>
  extends TransitionOptions<E>,
    CloneableTransitionChildren<E> {}

/**
 * A simple wrapper for the `useTransition` hook that automatically clones a
 * `ref` into the single `child` to handle the transition.
 */
export default function Transition<E extends HTMLElement>({
  children,
  nodeRef,
  ...props
}: TransitionProps<E>): ReactElement | null {
  const { ref, rendered } = useTransition<E>({ ...props, ref: nodeRef });
  if (!children || !isValidElement(children) || !rendered) {
    return children;
  }

  const child = Children.only(children);
  return cloneElement(child, { ref });
}
