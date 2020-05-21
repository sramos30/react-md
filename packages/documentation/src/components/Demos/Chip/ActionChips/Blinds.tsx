import React, { FC, useState } from "react";
import cn from "classnames";
import {
  CSSTransitionClassNames,
  CSSTransition,
  ENTERED,
} from "@react-md/transition";

import Blind from "./Blind";
import styles from "./Blinds.module.scss";

interface BlindsProps {
  visible: boolean;
}

const CLASSNAMES: CSSTransitionClassNames = {
  enter: styles.enter,
  enterActive: cn(styles.entering, styles.animate),
  exit: styles.exit,
  exitActive: cn(styles.exiting, styles.animate),
};

const Blinds: FC<BlindsProps> = ({ visible }) => {
  const [exited, setExited] = useState(true);
  if (visible && exited) {
    setExited(false);
  }

  const hide = (): void => setExited(true);

  const isVisible = visible || !exited;

  return (
    <CSSTransition
      transitionIn={isVisible}
      temporary
      timeout={1500}
      classNames={CLASSNAMES}
    >
      {({ stage }) => (
        <div className={styles.blinds}>
          {Array.from({ length: 11 }, (_, i) => (
            <Blind
              key={i}
              visible={visible && stage === ENTERED}
              onExited={i === 10 ? hide : undefined}
            />
          ))}
        </div>
      )}
    </CSSTransition>
  );
};

export default Blinds;
