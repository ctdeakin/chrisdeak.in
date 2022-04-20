import { useContext } from 'react';
import { FrameContext } from './context/FrameContext';

export default function Frame({ children }) {
  let { frames } = useContext(FrameContext);

  function createFrame(f) {
    if (f.length < 1) {
      return children;
    }

    let { x, y } = f.pop();
    return (
      <>
        <div className="card frame">
        {createFrame(f)}
          <style jsx>{`
            .frame {
              position: fixed;
              left:${x};
              top:${y};
             
            }
          `}</style>
        </div>

        

      </>
    );
  }

  return createFrame([...frames]);
}
