import { useState, useEffect } from 'preact/hooks';

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export function App() {
  const [loadPosts, setLoadPosts] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      if (!loadPosts) {
        return;
      }

      const allPosts = await fetch('/.netlify/functions/posts').then((res) => res.json());

      setPosts(allPosts);
      setLoadPosts(false);
    }

    load();
  }, [loadPosts]);

  async function handleSubmit(event: any) {
    event.preventDefault();

    await fetch('/.netlify/functions/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });

    setTitle('')
    setContent('')
    setLoadPosts(true);
  }
  
  return (
    <>
      <h1>My Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Created {new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
        
        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent((e.target as HTMLInputElement).value)}
        />

        <button type="submit">Save</button>
      </form>
    </>
  )
}
