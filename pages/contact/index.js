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

  const router = useRouter()
  console.log(router?.query.success)
  return (
    <Frame>
      <form
        name="contact"
        method="POST"
        action="contact/?success=true"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
          <span hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </span>
        <span>
          <label>Name
          <input type="text" name="name" />
          </label>
          <label>Email
          <input type="email" name="email" />
          </label>
          <label>Message
          <textarea name="message"></textarea>
          </label>
        </span>
        <span>
             <button type="submit">Send</button>
        </span>
      </form>
      
      <Link href="/"><a>←</a></Link>
        
    </Frame>
  );
}
