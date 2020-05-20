import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { CloneableTransitionChildren, CSSTransitionOptions } from "./types";
import useCSSTransition from "./useCSSTransition";

export interface CSSTransitionProps<E extends HTMLElement>
  extends Omit<CSSTransitionOptions<E>, "transitionIn">,
    CloneableTransitionChildren<E> {
  transitionIn?: boolean;
}

/**
 * A simple wrapper for the `useCSSTransition` hook that will automatically
 * clone a `ref` into the child to trigger the transition.
 */
export default function CSSTransition<E extends HTMLElement>({
  children,
  nodeRef,
  transitionIn = false,
  ...props
}: CSSTransitionProps<E>): ReactElement | null {
  const [rendered, transitionProps] = useCSSTransition<E>({
    ...props,
    transitionIn,
    ref: nodeRef,
  });

  if (!children || !isValidElement(children) || !rendered) {
    return null;
  }

  const child = Children.only(children);
  return cloneElement(child, transitionProps);
}
