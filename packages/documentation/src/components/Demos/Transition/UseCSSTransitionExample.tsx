import React, { FC, useState } from "react";
import { Button } from "@react-md/button";
import { useCSSTransition } from "@react-md/transition";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

import styles from "./CustomCSSTransition.module.scss";
import Page1 from "./Page1";

const UseCSSTransitionExample: FC = () => {
  const [transitionIn, setTransitionIn] = useState(false);
  const [rendered, transitionProps] = useCSSTransition({
    // changing this value causes the transition behavior to change
    transitionIn,

    // 5 seconds just for demo purposes... can also be an object
    timeout: 5000,

    // can also use a string that gets BEM-ified instead
    classNames: {
      enter: styles.enter,
      enterActive: styles.enterActive,
      exit: styles.exit,
      exitActive: styles.exitActive,
    },

    // can also trigger the css transition on initial mount
    // appear: false,

    // changes the `rendered` value to be false while not transitioning and
    // `transitionIn` is false
    temporary: true,

    // an optional className to merge with the transition classNames
    // className: "",
  });

  return (
    <>
      <Text type="headline-6" margin="top">
        <Code>useCSSTransition</Code> Example
      </Text>
      <Button onClick={() => setTransitionIn(!transitionIn)}>Toggle</Button>
      {rendered && <Page1 {...transitionProps} />}
    </>
  );
};

export default UseCSSTransitionExample;
