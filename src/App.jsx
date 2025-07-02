import { BrowserRouter } from 'react-router-dom';
import Context from './components/context';
import Main from './components/mainDiv';
import HeaderForAuthUsers from './components/headerForAuthUsers';
import { AuthenticatedOnly, RoleBasedAccess } from './components/auth/ConditionalRender'


export default function App() {
  return (
    <BrowserRouter>
      <Context>
        <AuthenticatedOnly>
          <HeaderForAuthUsers />
        </AuthenticatedOnly>
        <Main /> 
      </Context>
    </BrowserRouter>
  );
}
