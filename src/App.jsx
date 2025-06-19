import { BrowserRouter } from 'react-router-dom';
import Context from './components/context';
import Main from './components/mainDiv';
import Header from './components/header';
import Footer from './components/footer';


export default function App() {
  return (
    <BrowserRouter>
      <Context>
        <Main /> 
      </Context>
    </BrowserRouter>
  );
}
