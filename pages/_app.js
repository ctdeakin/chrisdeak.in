import '@styles/globals.css';
import { useReducer } from 'react';
import { frameReducer } from '@components/reducers/frameReducer';
import {
  FrameContext,
  DispatchContext,
} from '@components/context/FrameContext';
import Container from '@components/Container';

function Application({ Component, pageProps }) {
  const [state, dispatch] = useReducer(frameReducer, { frames: [] });
  return (

    <FrameContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Container>
        <Component {...pageProps} />
        </Container>
      </DispatchContext.Provider>
    </FrameContext.Provider>


  );
}

export default Application;
