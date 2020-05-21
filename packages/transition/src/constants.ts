import { TransitionTimeout, CSSTransitionClassNames } from "./types";

export const ENTER = "enter";
export const ENTERING = "entering";
export const ENTERED = "entered";
export const EXIT = "exit";
export const EXITING = "exiting";
export const EXITED = "exited";

export type TransitionStage =
  | typeof ENTER
  | typeof ENTERING
  | typeof ENTERED
  | typeof EXIT
  | typeof EXITING
  | typeof EXITED;

export const UNMOUNT = "unmount";

export type TransitionAction = TransitionStage | typeof UNMOUNT;

export interface TransitionState {
  /**
   * The current stage for the transition. This probably won't be used too much
   * unless you want to apply custom classnames based on the stage.
   */
  stage: TransitionStage;

  /**
   * Boolean if the component should be rendered in the DOM. This will always be
   * `true` if the `temporary` option is omitted or `false`. Otherwise, it will
   * be `true` during the transitions and entered.
   */
  rendered: boolean;

  /**
   * Boolean if the transition is in the initial mounting/appearing stage while
   * entering. This will be `false` if the `appear` option is `false` and
   * automatically set to `false` after the first transition if `appear` was
   * `true`.
   */
  appearing: boolean;
}

export const COLLAPSE_TIMEOUT: TransitionTimeout = {
  enter: 250,
  exit: 200,
};

export const DEFAULT_COLLAPSE_MIN_HEIGHT = 0;
export const DEFAULT_COLLAPSE_MIN_PADDING_TOP = 0;
export const DEFAULT_COLLAPSE_MIN_PADDING_BOTTOM = 0;

export const CROSS_FADE_TIMEOUT: TransitionTimeout = {
  enter: 300,
  exit: 0,
};

export const CROSS_FADE_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-cross-fade",
  appearActive: "rmd-cross-fade--active",
  enter: "rmd-cross-fade",
  enterActive: "rmd-cross-fade--active",
};

export const SCALE_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-transition--scale-enter",
  appearActive: "rmd-transition--scale-enter-active",
  enter: "rmd-transition--scale-enter",
  enterActive: "rmd-transition--scale-enter-active",
  enterDone: "",
  exit: "rmd-transition--scale-exit",
  exitActive: "rmd-transition--scale-exit-active",
};

export const SCALE_Y_CLASSNAMES: CSSTransitionClassNames = {
  appear: "rmd-transition--scale-y-enter",
  appearActive: "rmd-transition--scale-y-enter-active",
  enter: "rmd-transition--scale-y-enter",
  enterActive: "rmd-transition--scale-y-enter-active",
  enterDone: "",
  exit: "rmd-transition--scale-y-exit",
  exitActive: "rmd-transition--scale-y-exit-active",
};

export const SCALE_TIMEOUT: TransitionTimeout = {
  enter: 200,
  exit: 150,
};
