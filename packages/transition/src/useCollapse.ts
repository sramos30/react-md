import { CSSProperties, RefCallback, useMemo, useState } from "react";
import cn from "classnames";

import {
  COLLAPSE_TIMEOUT,
  DEFAULT_COLLAPSE_MIN_HEIGHT,
  DEFAULT_COLLAPSE_MIN_PADDING_BOTTOM,
  DEFAULT_COLLAPSE_MIN_PADDING_TOP,
  ENTER,
  ENTERING,
  EXIT,
  EXITED,
  EXITING,
} from "./constants";
import getElementSizing from "./getElementSizing";
import getTimeout from "./getTimeout";
import { TransitionConfig, TransitionCallbacks } from "./types";
import useTransition from "./useTransition";

export interface CollapseTransitionProvidedProps<E extends HTMLElement> {
  /**
   * A ref that **must** be passed to the element that is triggering a CSS
   * transition change. An error will be thrown if the transition starts, but
   * the ref is still `null` or the `ref` was passed to a component instance
   * instead of a DOM node.
   */
  ref: RefCallback<E>;

  /**
   * The `hidden` DOM attribute that will be enabled if the component is fully
   * collapsed with no height and padding but still rendered within the DOM.
   */
  hidden: boolean;

  /**
   * A conditional style that will provide the required `max-height`,
   * `padding-top`, `padding-bottom`, and `transition-duration` styles required
   * for the collapse transition.
   */
  style?: CSSProperties;

  /**
   * The class name to apply that will allow for the element to transition
   * between collapsed states.
   */
  className: string;
}

export interface CollapseHookOptions<E extends HTMLElement>
  extends TransitionCallbacks<E>,
    Pick<TransitionConfig<E>, "timeout" | "temporary"> {
  /**
   * An optional className to merge with the collapse class names
   */
  className?: string;

  /**
   * The minimum height that the collapsed element can be which defaults to `0`.
   * This can either be a number of pixels or a string CSS height value.
   *
   * Setting this value to any non-zero value will allow for the element to
   * shrink to the defined min-height, and then expand to the full height once
   * no longer collapsed.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   */
  minHeight?: number | string;

  /**
   * The minimum padding-top that the collapsed element can be which defaults to
   * `0`. This can either be a number of pixels or a string CSS `padding-top`
   * value.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   */
  minPaddingTop?: number | string;

  /**
   * The minimum padding-bottom that the collapsed element can be which defaults
   * to `0`. This can either be a number of pixels or a string CSS
   * `padding-bottom` value.
   *
   * Note: If the `minHeight`, `minPaddingTop`, and `minPaddingBottom` options
   * are all set to `0` (default), the child will be removed from the DOM while
   * collapsed.
   */
  minPaddingBottom?: number | string;
}

type Rendered = boolean;
type ReturnValue<E extends HTMLElement> = [
  Rendered,
  CollapseTransitionProvidedProps<E>
];

/**
 * The `useCollapse` hook is used to transition a child element in and
 * out of view by animating it's `max-height`. This means that the child
 * must either be an HTMLElement or a component that forwards the `ref`
 * to an HTMLElement and applies the `style`, `className`, and `hidden`
 * props to an HTMLElement.
 *
 * Simple Example:
 *
 * ```tsx
 * const Example = () => {
 *   const [collapsed, setCollapsed] = useState(true);
 *   const [rendered, transitionProps] = useCollapse(collapsed);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setCollapsed(!collapsed)}>Toggle</Button>
 *       {rendered && (
 *         <div {...transitionProps}>
 *          <Text>Stuff that should be animated</Text>
 *          <div>Whatever content...</div>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 *
 * Note: This **should not be used for `position: absolute` or `position: fixed`
 * elements**. Instead, the `ScaleTransition` or just a simple `transform`
 * transition should be used instead. Animating `max-height`, `padding-top`, and
 * `padding-bottom` is much less performant than `transform` transition since it
 * forces the DOM to repaint during the
 *
 * @param collapsed Boolean if the element is currently collapsed. Changing this
 * value will cause the animation to trigger.
 * @param options All the additional options available for the collapse
 * transition.
 * @return An ordered list containing a boolean if the collapse should be
 * rendered in the DOM followed by an object of props to pass to the collapsible
 * element to handle the transition.
 */
export default function useCollapse<E extends HTMLElement>(
  collapsed: boolean,
  {
    className,
    timeout = COLLAPSE_TIMEOUT,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    minHeight = DEFAULT_COLLAPSE_MIN_HEIGHT,
    minPaddingTop = DEFAULT_COLLAPSE_MIN_PADDING_TOP,
    minPaddingBottom = DEFAULT_COLLAPSE_MIN_PADDING_BOTTOM,
    temporary = minHeight === 0 &&
      minPaddingTop === 0 &&
      minPaddingBottom === 0,
  }: CollapseHookOptions<E> = {}
): ReturnValue<E> {
  const [style, setStyle] = useState<CSSProperties | undefined>(() => {
    if (!collapsed) {
      return undefined;
    }

    return {
      maxHeight: minHeight,
      paddingTop: minPaddingTop,
      paddingBottom: minPaddingBottom,
    };
  });

  const { rendered, stage, ref } = useTransition<E>({
    appear: false,
    repaint: true,
    timeout,
    temporary,
    transitionIn: !collapsed,
    onEnter(node, isAppearing) {
      if (onEnter) {
        onEnter(node, isAppearing);
      }

      setStyle({
        maxHeight: minHeight,
        paddingTop: minPaddingTop,
        paddingBottom: minPaddingBottom,
      });
    },
    onEntering(node, isAppearing) {
      if (onEntering) {
        onEntering(node, isAppearing);
      }

      const { maxHeight, paddingTop, paddingBottom } = getElementSizing(node);
      const defaultedTimeout = getTimeout(timeout, isAppearing);
      const duration = isAppearing
        ? defaultedTimeout.appear
        : defaultedTimeout.enter;

      setStyle({
        maxHeight,
        paddingTop,
        paddingBottom,
        transitionDuration: `${duration}ms`,
      });
    },
    onEntered(node, isAppearing) {
      if (onEntered) {
        onEntered(node, isAppearing);
      }

      setStyle(undefined);
    },
    onExit(node) {
      if (onExit) {
        onExit(node);
      }

      const { maxHeight, paddingTop, paddingBottom } = getElementSizing(node);

      setStyle({
        maxHeight,
        paddingTop,
        paddingBottom,
        transitionDuration: `${getTimeout(timeout, false).exit}ms`,
      });
    },
    onExiting(node) {
      if (onExiting) {
        onExiting(node);
      }

      setStyle({
        maxHeight: minHeight,
        paddingTop: minPaddingTop,
        paddingBottom: minPaddingBottom,
        transitionDuration: `${getTimeout(timeout, false).exit}ms`,
      });
    },
    onExited(node) {
      if (onExited) {
        onExited(node);
      }

      setStyle({
        maxHeight: minHeight,
        paddingTop: minPaddingTop,
        paddingBottom: minPaddingBottom,
      });
    },
  });

  const entering = stage === ENTER || stage === ENTERING;
  const exiting = stage === EXIT || stage === EXITING;

  const collapsable = useMemo(
    () => Object.values(getTimeout(timeout, false)).some((v) => v !== 0),
    [timeout]
  );

  const hidden =
    collapsed &&
    rendered &&
    stage === EXITED &&
    !temporary &&
    minHeight === 0 &&
    minPaddingTop === 0 &&
    minPaddingBottom === 0;
  return [
    rendered,
    {
      ref,
      hidden,
      style,
      className: cn(
        {
          "rmd-collapse": collapsable,
          "rmd-collapse--enter": entering,
          "rmd-collapse--leave": exiting,
          "rmd-collapse--no-overflow": collapsed || style,
        },
        className
      ),
    },
  ];
}
