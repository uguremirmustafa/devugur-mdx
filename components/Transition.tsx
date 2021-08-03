import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import { ReactChild, ReactNode } from 'react';

type TransitionKind<RC> = {
  children: RC;
  location: string;
};

const TIMEOUT: number = 300;

const getTransitionStyles = {
  entering: {
    opacity: 0,
    backgroundImage: "url('/me.png')",
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    // animation: 'blink .3s linear 2',
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};

const Transition: React.FC<TransitionKind<ReactChild | ReactNode>> = ({ children, location }) => {
  return (
    <TransitionGroup style={{ position: 'relative' }}>
      <ReactTransition
        unmountOnExit
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};
export default Transition;
// import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

// import { ReactChild } from 'react';

// type TransitionKind<RC> = {
//   children: RC;
//   location: string;
// };

// const TIMEOUT: number = 500;

// const getTransitionStyles = {
//   entering: {
//     opacity: 0,
//   },
//   entered: {
//     transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
//     opacity: 1,
//     animation: 'blink .3s linear 2',
//   },
//   exiting: {
//     transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
//     opacity: 0,
//   },
// };

// const Transition: React.FC<TransitionKind<ReactChild>> = ({ children, location }) => {
//   return (
//     <TransitionGroup style={{ position: 'relative' }}>
//       <ReactTransition
//         key={location}
//         timeout={{
//           enter: TIMEOUT,
//           exit: TIMEOUT,
//         }}
//       >
//         {(status) => (
//           <div
//             style={{
//               ...getTransitionStyles[status],
//             }}
//           >
//             {children}
//           </div>
//         )}
//       </ReactTransition>
//     </TransitionGroup>
//   );
// };
// export default Transition;
