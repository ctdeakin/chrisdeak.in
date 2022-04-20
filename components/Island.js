import Header from './Header';
import Link from 'next/link';
import Frame from './Frame';
import { useContext, useEffect } from 'react';
import { handleAddFrame } from './reducers/frameReducer';
import { DispatchContext} from "@components/context/FrameContext"




export default function Island() {
    const dispatch = useContext(DispatchContext)
    
    useEffect(() => {
        handleAddFrame(dispatch)
    }, [])

     
  return (
        <Frame>
            <Header title="Chris Deakin" />
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
        </Frame>
  );
}


