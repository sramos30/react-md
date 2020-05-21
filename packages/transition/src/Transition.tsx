import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  Ref,
} from "react";

import useTransition from "./useTransition";
import { TransitionHookOptions } from "./types";
import { TransitionStage } from "./constants";

export type CloneableTransitionChild<E extends HTMLElement> = ReactElement<{
  ref?: Ref<E>;
}>;

export type TransitionChildRenderer<E extends HTMLElement> = (
  state: TransitionStage
) => CloneableTransitionChild<E> | null;

export interface TransitionProps<E extends HTMLElement>
  extends TransitionHookOptions<E> {
  /**
   * An optional ref to merge with the required transition ref.
   */
  nodeRef?: Ref<E>;

  /**
   * A child element to clone the transition ref into. If the children does not
   * attach the ref to a DOM node, an error will be thrown.
   */
  children: CloneableTransitionChild<E> | TransitionChildRenderer<E>;
}

/**
 * A simple wrapper for the `useTransition` hook that automatically clones a
 * `ref` into the single `child` to handle the transition.
 */
export default function Transition<E extends HTMLElement>({
  children: propChildren,
  nodeRef,
  ...props
}: TransitionProps<E>): ReactElement | null {
  const { ref, rendered, stage } = useTransition<E>({ ...props, ref: nodeRef });
  const children =
    typeof propChildren === "function" ? propChildren(stage) : propChildren;

  if (!children || !rendered || !isValidElement(children)) {
    return children;
  }

  const child = Children.only(children);
  return cloneElement(child, { ref });
}
