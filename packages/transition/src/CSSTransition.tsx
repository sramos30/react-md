import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  Ref,
} from "react";
import cn from "classnames";

import { CSSTransitionHookOptions } from "./types";
import useCSSTransition from "./useCSSTransition";
import { TransitionHookReturnValue } from "./useTransition";

export type CloneableCSSTransitionChild<E extends HTMLElement> = ReactElement<{
  className?: string;
  ref?: Ref<E>;
}>;

export type CSSTransitionChildRenderer<E extends HTMLElement> = (
  state: Pick<TransitionHookReturnValue<E>, "rendered" | "stage">
) => CloneableCSSTransitionChild<E> | null;

export interface CSSTransitionChildren<E extends HTMLElement> {
  /**
   * An optional ref to merge with the required transition ref.
   */
  nodeRef?: Ref<E>;

  /**
   * A child element to clone the transition ref into. If the children does not
   * attach the ref to a DOM node, an error will be thrown.
   */
  children: CloneableCSSTransitionChild<E> | CSSTransitionChildRenderer<E>;
}

export interface CSSTransitionProps<E extends HTMLElement>
  extends CSSTransitionHookOptions<E>,
    CSSTransitionChildren<E> {}

/**
 * A simple wrapper for the `useCSSTransition` hook that will automatically
 * clone a `ref` into the child to trigger the transition.
 */
export default function CSSTransition<E extends HTMLElement>({
  children: propChildren,
  nodeRef,
  transitionIn = false,
  ...props
}: CSSTransitionProps<E>): ReactElement | null {
  const [rendered, { ref, className }, , stage] = useCSSTransition<E>({
    ...props,
    transitionIn,
    ref: nodeRef,
  });

  const children =
    typeof propChildren === "function"
      ? propChildren({ rendered, stage })
      : propChildren;

  if (!children || !isValidElement(children) || !rendered) {
    return null;
  }

  const child = Children.only(children);
  return cloneElement(child, {
    ref,
    className: cn(child.props.className, className) || undefined,
  });
}
