
import { createBrowserRouter } from 'react-router-dom';
// import Loadable from 'react-loadable';
import App from '../App';
import { lazy } from 'react';
import { BIG_FILE_UPLOAD_PATH, DRAG_PATH, HOME_PATH, COMBINE_PATH } from './routes'
import BigFileUpload from '../page/practice/file/big-file-upload';
import Drag from '../page/rxjs/drag';
import Combine from '../page/rxjs/combine';

const Home = lazy(() => import('../page/rxjs/home'));
// const BigFileUpload = lazy(() => import('../page/practice/file/big-file-upload'));

// const Loading = (props: Loadable.LoadingComponentProps) => (
//   <>{props.error ? <div>{props.error}</div> : <div>loading</div>}</>
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: HOME_PATH,
        element: <Home />,
      },
      {
        path: DRAG_PATH,
        element: <Drag />,
      },
      {
        path: BIG_FILE_UPLOAD_PATH,
        element: <BigFileUpload />,
      },
      {
        path: COMBINE_PATH,
        element: <Combine />,
      },
    ]
  }
])

export default router;
// export default function AppRouter() {
//   return
// }
