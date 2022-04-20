import Link from 'next/link';
import Frame from '@components/Frame';
import { useContext, useEffect } from 'react';
import {
  handleAddFrame,
  frameReducer,
} from '../../components/reducers/frameReducer';
import { DispatchContext } from '@components/context/FrameContext';

export default function About() {
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    handleAddFrame(dispatch);
  }, []);

  return (
    <Frame>
      <Link href="/">Back</Link>
    </Frame>
  );
}
