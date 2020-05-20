import React, { FC, useState } from "react";
import { Button } from "@react-md/button";
import { CSSTransition } from "@react-md/transition";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

import styles from "./CustomCSSTransition.module.scss";
import Page1 from "./Page1";

const classNames = {
  enter: styles.enter,
  enterActive: styles.enterActive,
  exit: styles.exit,
  exitActive: styles.exitActive,
};

const CSSTransitionExample: FC = () => {
  const [transitionIn, setTransitionIn] = useState(false);
  return (
    <>
      <Text type="headline-6" margin="none">
        <Code>CSSTransition</Code> Example
      </Text>
      <Button onClick={() => setTransitionIn(!transitionIn)}>Toggle</Button>
      <CSSTransition
        timeout={5000}
        temporary
        classNames={classNames}
        transitionIn={transitionIn}
      >
        <Page1 />
      </CSSTransition>
    </>
  );
};

export default CSSTransitionExample;
