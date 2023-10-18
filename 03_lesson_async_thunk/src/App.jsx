import './index.css'
import PostsList from './app/features/posts/PostsList';
import PostForm from './app/features/posts/PostForm';
function App() {
  return (
    <main className="App">
      <PostForm/>
      <PostsList/>
    </main>
  );
}

export default App;
