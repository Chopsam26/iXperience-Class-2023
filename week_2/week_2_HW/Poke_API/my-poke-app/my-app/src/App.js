import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const url = 'https://pokeapi.co/api/v2/ability/?limit=20';
  
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    //fetch Library
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setPosts(data.results);
    console.log(data.results);
  }
  return (
<div className="text-center">
<button className="btn btn-primary mt-3" onClick={fetchPosts}>
  Fetch Poke abilities
</button>

<div>
        {posts.map((x) => {
          return <div> 
          <div key={x.name}>{x.name}</div>
          <div key={x.url}>{x.url}</div>
          </div>
        })}
      </div>

</div>
  );
}

export default App;
