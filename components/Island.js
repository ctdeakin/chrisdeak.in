import Header from './Header';
import Plot from './Plot';
import Card from './Card';
import { useContext } from 'react';
import { handleAddFrame, frameReducer } from './reducers/frameReducer';
import Frame from './Frame';


export default function Island({dispatch, state}) {


  return (
    <Card>
      <Frame>
        <Header title="Chris Deakin" />
        <Plot />
      </Frame>
    </Card>
  );
}
