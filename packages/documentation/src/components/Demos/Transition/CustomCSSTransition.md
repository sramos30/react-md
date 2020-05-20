If none of the pre-defined transitions and components match your use case and a
custom CSS transition is required, you can use the `CSSTransition` component or
`useCSSTransition` hook. If you are familiar with
[react-transition-group](https://github.com/reactjs/react-transition-group), the
component and hook should be extremely familiar since they were heavily based of
the existing `CSSTransition` API.

The main differences between the implementations are:

- the `react-md` `CSSTransition` component does not use the deprecated
  `ReactDOM.findDOMNode` to handle the transition and instead clones a `ref`
  into the child component
- the `in` prop was renamed to `transitionIn` due to the props of `in` being a
  reserved keyword which forced you to always do `props.in` or
  `in: myInVariable`
- the `mountOnEnter` and `unmountOnExit` were combined into one prop as
  `temporary`
- the transitions are available in a new hook API with `useTransition` and
  `useCSSTransition`
- the `react-md` `CSSTransition` transforms a string `classNames` to use the
  [BEM](http://getbem.com) naming convention

```ts
const classNames = "opacity";

// react-transition-group
const reactTransitionGroup = {
  enter: "opacity-enter",
  enterActive: "opacity-enter-active",
  exit: "opacity-exit",
  exitActive: "opacity-exit-active",
};

// react-md
const reactMD = {
  enter: "opacity--enter",
  enterActive: "opacity--enter-active",
  exit: "opacity--exit",
  exitActive: "opacity--exit-active",

  // if appear option enabled, also does appear states
};
```

> Note: `react-transition-group@4.2.0` added support for a `nodeRef` prop to
> work around the deprecated `ReactDOM.findDOMNode` so it is no longer a big
> issue.

Check out the example below to see some simple examples using both the
`CSSTransition` and `useCSSTransition`.
