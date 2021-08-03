import { useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

function Fade() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition
        in={inProp}
        timeout={10}
        onEnter={() => alert('enter')}
        onEntering={() => alert('entering')}
        mountOnEnter
        unmountOnExit
      >
        {(state) => <div>hello</div>}
      </Transition>
      <button onClick={() => setInProp(!inProp)}>Click to Enter</button>
    </div>
  );
}
export default Fade;
