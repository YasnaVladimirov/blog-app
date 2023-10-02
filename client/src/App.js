import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import WritePost from './pages/WritePost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/posts/:id" element={<PostPage />}/>
            <Route path="/write" element={<WritePost />}/>
          </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
