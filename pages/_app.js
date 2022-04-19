import '@styles/globals.css';
import { useReducer } from 'react';
import { frameReducer } from '@components/reducers/frameReducer';
import {
  FrameContext,
  DispatchContext,
} from '@components/context/FrameContext';



function Application({ Component, pageProps }) {
  const [state, dispatch] = useReducer(frameReducer, { frames: 0 });
  return (

    <FrameContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </DispatchContext.Provider>
    </FrameContext.Provider>


  );
}

export default Application;
