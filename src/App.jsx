import React from 'react';
import './App.css';

// Komponen Kecil untuk Postingan
function Post({ user, image, caption }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="avatar"></div>
        <span className="username">{user}</span>
      </div>
      
      <img src={image} alt="content" className="post-image" />
      
      <div className="post-footer">
        <div className="icons">
          <span>❤️</span>
          <span>💬</span>
          <span>✈️</span>
        </div>
        <div className="caption">
          <span className="username">{user}</span>
          {caption}
        </div>
      </div>
    </div>
  );
}

// Komponen Utama
function App() {
  // Data simulasi (nanti ini bisa diambil dari database/API)
  const dataPostingan = [
    { id: 1, user: 'coding_pemula', img: 'https://picsum.photos/500/500?random=1', text: 'Hari pertama belajar React! 🚀' },
    { id: 2, user: 'developer_pro', img: 'https://picsum.photos/500/500?random=2', text: 'Jangan lupa minum kopi saat ngoding. ☕' },
    { id: 3, user: 'react_id', img: 'https://picsum.photos/500/500?random=3', text: 'Komponen React itu sangat fleksibel.' }
  ];

  return (
    <div className="App">
      {/* Bagian Atas */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Instagram</div>
          <input type="text" placeholder="Cari..." style={{borderRadius: '8px', border: '1px solid #dbdbdb', padding: '5px'}} />
          <div>🏠 📩 🧭 ❤️</div>
        </div>
      </nav>

      {/* Bagian Feed Postingan */}
      <main className="feed-container">
        {dataPostingan.map((item) => (
          <Post 
            key={item.id} 
            user={item.user} 
            image={item.img} 
            caption={item.text} 
          />
        ))}
      </main>
    </div>
  );
}

export default App;