import Link from 'next/link';
import Frame from '@components/Frame';
import { useContext, useEffect } from 'react';
import {
  handleAddFrame,
  frameReducer,
} from '../../components/reducers/frameReducer';
import { DispatchContext } from '@components/context/FrameContext';
import { useRouter } from 'next/router';

export default function About() {
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    handleAddFrame(dispatch);
  }, []);

  return (
    <Frame>
        <a href="https://linkedin.com/in/christopher-deakin">LinkedIn</a>
        <a href="https://github.com/ctdeakin">Github</a>
        <a href="mailto:cd@chrisdeak.in">Email</a>
      <Link href="/">
        <a>←</a>
      </Link>
    </Frame>
  );
}
