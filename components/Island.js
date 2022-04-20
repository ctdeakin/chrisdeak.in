import Header from './Header';
import Link from 'next/link';
import Frame from './Frame';
import { useContext, useEffect } from 'react';
import { handleAddFrame } from './reducers/frameReducer';
import { DispatchContext } from '@components/context/FrameContext';

export default function Island() {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    handleAddFrame(dispatch);
  }, []);

  return (
    <Frame>
      <Header title="Chris Deakin" />
      <Link href="/about" >
       <a>About</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/contact" >
        <a>Contact</a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
        }

        a:hover {
            text-decoration: inherit;
        }
      `}</style>
    </Frame>
  );
}
