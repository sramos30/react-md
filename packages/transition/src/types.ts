import { Ref, RefCallback } from "react";

export interface TransitionActions {
  /**
   * Boolean if the transition should also be triggered immediately once the
   * component mounts. This is generally not recommended for server side
   * rendering/initial page load so it is set to `false` by default.
   */
  appear?: boolean;

  /**
   * Boolean if the transition should allow for an enter animation once the
   * `transitionIn` boolean is set to `true`.
   */
  enter?: boolean;

  /**
   * Boolean if the transition should allow for an exit animation once the
   * `transitionIn` boolean is set to `false`.
   */
  exit?: boolean;
}

export interface TrasitionActionTimeout {
  /**
   * The duration to use for the appear transition. If this is omitted and there
   * is an `enter` duration, the `enter` duration will be used. Setting this
   * value to `0` can disable the animation or you can disable the `appear`
   * transition action flag.
   */
  appear?: number;

  /**
   * The duration to use for the enter transition. Setting this value to `0` can
   * disable the animation or you can disable the `enter` transition action
   * flag.
   */
  enter?: number;

  /**
   * The duration to use for the exit transition. Setting this value to `0` can
   * disable the animation or you can disable the `exit` transition action flag.
   */
  exit?: number;
}

/**
 * The duration for the transition. When this is a `number`, it will be applied
 * to all enabled transitions from the `TransitionActions`.
 */
export type TransitionTimeout = TrasitionActionTimeout | number;

export interface CSSTransitionActionClassNames {
  /**
   * The className to apply immediately to the DOM node for the appear
   * transition.
   *
   * The styles that are applied with this class should normally **not** include
   * the `transition-duration` or `transition-property` values and should just
   * be the starting transition styles.
   *
   * Note: If this is omitted and the `appear` transition action flag is
   * enabled, it will instead default to the `enter` class name.
   */
  appear?: string;

  /**
   * The className to apply to the DOM node after the DOM has been forcefully
   * repainted for the appear transition. This class name will **always be
   * joined with the `appear` class name**.
   *
   * The styles that are applied with this class should normally include the
   * `transition-duration` and `transition-property` values as well as the
   * ending transition styles since this should cause the transition to start.
   *
   * Note: If this is omitted and the `appear` transition action flag is
   * enabled, it will instead default to the `enterActive` class name.
   */
  appearActive?: string;

  /**
   * An optional className to apply once the appear transition has completed.
   *
   * Note: If this is omitted and the `appear` transition action flag is
   * enabled, it will instead default to the `enterDone` class name.
   */
  appearDone?: string;

  /**
   * The className to apply immediately to the DOM node for the enter
   * transition.
   *
   * The styles that are applied with this class should normally **not** include
   * the `transition-duration` or `transition-property` values and should just
   * be the starting transition styles.
   */
  enter?: string;

  /**
   * The className to apply to the DOM node after the DOM has been forcefully
   * repainted for the enter transition. This class name will **always be joined
   * with the `enter` class name**.
   *
   * The styles that are applied with this class should normally include the
   * `transition-duration` and `transition-property` values as well as the
   * ending transition styles since this should cause the transition to start.
   */
  enterActive?: string;

  /**
   * An optional className to apply once the enter transition has completed.
   */
  enterDone?: string;

  /**
   * The className to apply immediately to the DOM node for the exit
   * transition.
   *
   * The styles that are applied with this class should normally **not** include
   * the `transition-duration` or `transition-property` values and should just
   * be the starting transition styles.
   */
  exit?: string;

  /**
   * The className to apply to the DOM node after the DOM has been forcefully
   * repainted for the exit transition. This class name will **always be joined
   * with the `exit` class name**.
   *
   * The styles that are applied with this class should normally include the
   * `transition-duration` and `transition-property` values as well as the
   * ending transition styles since this should cause the transition to start.
   */
  exitActive?: string;

  /**
   * An optional className to apply once the exit transition has completed.
   */
  exitDone?: string;
}

/**
 * When this is a string value, the `CSSTransitionActionClassNames` will be set
 * based on the enabled `TransitionActions` and updated to follow the
 * [BEM naming convention](http://getbem.com).
 *
 * ```ts
 * const classNames = "opacity";
 * const appear = false;
 * const enter = true;
 * const exit = true;
 *
 * // transformed
 * const reactMD = {
 *   enter: "opacity--enter",
 *   enterActive: "opacity--enter-active",
 *   exit: "opacity--exit",
 *   exitActive: "opacity--exit-active",
 * };
 * ```
 */
export type CSSTransitionClassNames = CSSTransitionActionClassNames | string;

/**
 * A function that is called during the `appear` and `enter` transition phases.
 * The `isAppearing` flag will be set to `true` only for the `appear`
 * transition.
 */
export type EnterHandler<E extends HTMLElement> = (
  node: E,
  isAppearing: boolean
) => void;

/**
 * A function that is called during the `exit` transition phase.
 */
export type ExitHandler<E extends HTMLElement> = (node: E) => void;

export interface TransitionCallbacks<E extends HTMLElement> {
  /**
   * An optional enter handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired right after the `transitionIn` is set to `true`.
   */
  onEnter?: EnterHandler<E>;

  /**
   * An optional entering handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired almost immediately after the `onEnter` callback.
   * However, if the `repaint` option was enabled, it will ensure the DOM as
   * been repainted before firing to help with CSS transitions.
   */
  onEntering?: EnterHandler<E>;

  /**
   * An optional entered handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired once the transition has finished.
   */
  onEntered?: EnterHandler<E>;

  /**
   * An optional exit handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles.
   *
   * This will be fired right after the `transitionIn` is set to `false`.
   */
  onExit?: ExitHandler<E>;

  /**
   * An optional exit handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles.
   *
   * This will be fired almost immediately after the `onExit` callback. However,
   * if the `repaint` option was enabled, it will ensure the DOM as been
   * repainted before firing to help with CSS transitions.
   */
  onExiting?: ExitHandler<E>;

  /**
   * An optional entered handler that can be used to determine additional
   * transition styles if you need access to the DOM node to calculate those
   * styles. This will also be fired for `appear` transitions.
   *
   * This will be fired once the transition has finished.
   *
   * Note: If the `temporary` option was enabled, the `rendered` result will be
   * `false` and the node actually won't exist in the DOM anymore.
   */
  onExited?: ExitHandler<E>;
}

export interface TransitionConfig<E extends HTMLElement>
  extends TransitionActions,
    TransitionCallbacks<E> {
  /**
   * Changing this boolean will trigger a transition between the six stagees:
   *
   * - `ENTER`
   * - `ENTERING`
   * - `ENTERED`
   * - `EXIT`
   * - `EXITING`
   * - `EXITED`
   *
   * Changing from `false` to `true`, the stagees will change in this order:
   * `EXITED` -> `ENTER` -> `ENTERING` -> `ENTERED`
   *
   * Changing from `true` to `false`, the stagees will change in this order:
   * `ENTERED` -> `EXIT` -> `EXITING` -> `EXITED`
   */
  transitionIn?: boolean;

  /**
   * The transition timeout to use for each stage. Just like in
   * `react-transition-group`, this can either be a `number` which will a static
   * duration to use for each stage. Otherwise, this can be an object of
   * timeouts for the `appear`, `enter`, and `exit` stages which default to `0`
   * if omitted.
   *
   * Note: If any of the timeout values are set to `0`, the transition will be
   * considered disabled and skip the `ENTERING`/`EXITING` stages.
   *
   * Note: If the `appear` stage is omitted in the timeout object but the
   * `appear` option was enabled for the transition, it will instead default to
   * the `enter` duration.
   */
  timeout?: TransitionTimeout;

  /**
   * Boolean if the component should mount and unmount based on the current
   * `transitionIn` stage with a default value of `false`. When this is
   * `false`, the first result (`rendered`) in the return value array will
   * always be `true`.
   *
   * When this is set to `true`, the first result (`rendered`) in the return
   * value array will be `true` only while the `transitionIn` option is `true`
   * or the transition is still happening.
   *
   * Note: **Changing this option while the hook/component is mounted will not
   * do anything**. If you want to dynamically change the component's temporary
   * state, you will need to also change the `key` to get the component to
   * re-mount.
   */
  temporary?: boolean;
}

export interface CSSTransitionConfig<E extends HTMLElement>
  extends TransitionConfig<E> {
  /**
   * An optional className that should ge merged with the CSS transition class
   * name based on the current transition stage.
   */
  className?: string;

  /**
   * The transition class names to apply. Unlike in `react-transition-group`, if
   * this is a `string` instead of an object, the different states will be
   * `--{state}` instead of `-{state}`.
   *
   * Example:
   *
   * ```ts
   * const options = {
   *   classNames: "scale"
   * }
   *
   * // creates
   * const classNames = {
   *   enter: "scale--enter",
   *   enterActive: "scale--enter-active",
   *   exit: "scale--exit",
   *   exitActive: "scale--exit-active",
   * }
   * ```
   *
   * ```ts
   * const options = {
   *   classNames: "scale"
   *   appear: true,
   * }
   *
   * // creates
   * const classNames = {
   *   appear: "scale--enter",
   *   appearActive: "scale--enter-active",
   *   enter: "scale--enter",
   *   enterActive: "scale--enter-active",
   *   exit: "scale--exit",
   *   exitActive: "scale--exit-active",
   * }
   * ```
   */
  classNames?: CSSTransitionClassNames;
}

// Not that you'll ever use this...
export type TransitionHookRequiredKeys = "transitionIn" | "timeout";

export interface TransitionHookConfig<E extends HTMLElement>
  extends Omit<TransitionConfig<E>, TransitionHookRequiredKeys>,
    Pick<Required<TransitionConfig<E>>, TransitionHookRequiredKeys> {
  /**
   * An optional ref that will get merged with the required ref for the
   * transition to work.
   */
  ref?: Ref<E>;
}

export interface TransitionHookOptions<E extends HTMLElement>
  extends TransitionHookConfig<E> {
  /**
   * Boolean if the transition should force a DOM repaint before triggering the
   * next stage. Defaults to `false` since it's only really recommended for DOM
   * and CSS transitions.
   */
  repaint?: boolean;
}

export interface CSSTransitionHookOptions<E extends HTMLElement>
  extends TransitionHookConfig<E>,
    Pick<CSSTransitionConfig<E>, "className">,
    Pick<Required<CSSTransitionConfig<E>>, "classNames"> {}

export interface CSSTransitionProvidedProps<E extends HTMLElement> {
  /**
   * A ref that **must** be passed to the element that is triggering a CSS
   * transition change. An error will be thrown if the transition starts, but
   * the ref is still `null` or the `ref` was passed to a component instance
   * instead of a DOM node.
   */
  ref: RefCallback<E>;

  /**
   * The current class name based on the provided `className` options and the
   * state in the transition.
   */
  className: string | undefined;
}
