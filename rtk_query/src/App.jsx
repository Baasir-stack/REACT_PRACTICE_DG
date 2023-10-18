import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import PostDetails from "./features/posts/PostDetails";
import EditPost from "./features/posts/EditPost";
import Layout from "./components/Layout";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UserList";

import { Routes, Route ,Navigate} from 'react-router-dom';

function App() {
  return (
    < >

      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<PostsList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<PostDetails />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>

          <Route path="user">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>

          {/* Catch all - replace with 404 component if you want */}
          <Route path="*" element={<Navigate to="/" replace />} />


        </Route>
      </Routes>
    </>
  );
}

export default App;