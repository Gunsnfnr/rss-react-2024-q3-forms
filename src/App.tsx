// import {createBrowserRouter} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Form1 from './components/Form1/Form1';
import Form2 from './components/Form2/Form2';
import NotFound from './components/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    // children: [
    // ],
  },
  {
    path: '/form1',
    Component: Form1,
  },
  {
    path: '/form2',
    Component: Form2,
  },
  { path: '*', Component: NotFound },
]);

// const App = () => {
//   return (
//     <>
//       <div>React forms task</div>
//     </>
//   );
// };

const App = () => <RouterProvider router={router} />;

export default App;
