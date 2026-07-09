import React, { useState, useEffect } from 'react';
import { Home, User, BookOpen, Settings, Award, Wifi, WifiOff } from 'lucide-react';
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiStatus, setApiStatus] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    // Mencoba mengambil data dari backend Express (port 3000)
    fetch('http://localhost:3000/api/status')
      .then(res => {
        if (!res.ok) throw new Error('API server returned error code');
        return res.json();
      })
      .then(data => setApiStatus({ loading: false, data, error: null }))
      .catch(err => setApiStatus({ loading: false, data: null, error: err.message }));
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'learn', label: 'Belajar', icon: <BookOpen size={20} /> },
    { id: 'achievements', label: 'Pencapaian', icon: <Award size={20} /> },
    { id: 'profile', label: 'Profil', icon: <User size={20} /> },
    { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} /> },
  ];

  return (
    <div className="app-container">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span style={{ background: 'var(--primary-color)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <BookOpen size={24} />
          </span>
          SignLearn
        </div>
        <nav className="nav-links">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="app-window">
          <header className="window-header">
            <h1 className="window-title">
              {navItems.find(item => item.id === activeTab)?.label}
            </h1>
            <p className="window-subtitle">Selamat datang kembali di SignLearn.</p>
          </header>

          <div className="grid-cards">
            {/* Dummy Content based on active tab */}
            {activeTab === 'dashboard' && (
              <>
                <div className="card">
                  <h3 className="card-title">Progres Belajar</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Anda telah menyelesaikan 45% materi dasar.</p>
                  <button className="btn btn-primary" style={{ marginTop: '16px' }}>Lanjutkan</button>
                </div>
                <div className="card">
                  <h3 className="card-title">Tugas Harian</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Pelajari 5 isyarat huruf baru hari ini.</p>
                </div>
                <div className="card" style={{ borderLeft: apiStatus.error ? '4px solid #EF4444' : apiStatus.loading ? '4px solid #3B82F6' : '4px solid #10B981' }}>
                  <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {apiStatus.error ? <WifiOff size={18} color="#EF4444" /> : <Wifi size={18} color="#10B981" />}
                    Koneksi REST API
                  </h3>
                  {apiStatus.loading && <p style={{ color: 'var(--text-secondary)' }}>Menghubungkan ke API backend...</p>}
                  {apiStatus.error && (
                    <div>
                      <p style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.9rem' }}>Offline (Gagal Terhubung)</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>
                        Pastikan backend Express Anda berjalan dengan mengetik <code>npm start</code> di folder <code>SignLearn</code> lama Anda.
                      </p>
                    </div>
                  )}
                  {apiStatus.data && (
                    <div>
                      <p style={{ color: '#10B981', fontWeight: 600, fontSize: '0.9rem' }}>Online (Terhubung!)</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>
                        Respon Server: "{apiStatus.data.message}"
                      </p>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginTop: '8px' }}>
                        Server Time: {new Date(apiStatus.data.timestamp).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {activeTab !== 'dashboard' && (
              <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                <div style={{ color: 'var(--primary-color)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  {navItems.find(item => item.id === activeTab)?.icon}
                </div>
                <h3 className="card-title">Halaman {navItems.find(item => item.id === activeTab)?.label}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Konten untuk halaman ini akan segera hadir.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {React.cloneElement(item.icon, { size: 24 })}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
