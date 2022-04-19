import Header from './Header';
import Plot from './Plot';
import Card from './Card';
import { useContext, useEffect } from 'react';
import { handleAddFrame, frameReducer } from './reducers/frameReducer';
import { DispatchContext } from "@components/context/FrameContext"
import Frame from './Frame';


export default function Island() {
    const dispatch = useContext(DispatchContext)
    useEffect(() => {
        handleAddFrame(dispatch)
    },[])

  return (
    
      <Frame>
        <Header title="Chris Deakin" />
        <Plot />
      </Frame>
  );
}
