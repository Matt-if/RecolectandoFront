import { BrowserRouter } from 'react-router-dom';
import Context from './components/context';
import Main from './components/mainDiv';

export default function App() {
  return (
    <BrowserRouter>
      <Context>
        <Main /> 
      </Context>
    </BrowserRouter>
  );
}
