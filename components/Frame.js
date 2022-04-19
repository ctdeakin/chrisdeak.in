import { useContext } from 'react';
import { FrameContext } from './context/FrameContext';

export default function Frame({ children }) {
  let { frames } = useContext(FrameContext);

  function createFrame(f) {
    let xTranslate = Math.random()*20 - 10 + '%'
    let yTranslate = Math.random()*20 - 10 + '%'
    if (f < 1) {
      return children;
    }
    return (
      <>
      <div className="card frame">  
      {createFrame(f - 1)}
      <style jsx>{`.frame { position: fixed; transform: translate(${xTranslate + ', ' + yTranslate})}`}</style>
      </div>
  
        
      </>
    );
  }

  return createFrame(frames);
}
