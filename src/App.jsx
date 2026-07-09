import React, { useState, useEffect } from 'react';
import { 
  Home, User, BookOpen, Settings, Award, Wifi, WifiOff, 
  BookOpenText, Play, CheckCircle, ChevronRight, Lock, Key, ShieldCheck, Printer
} from 'lucide-react';
import './style_old.css';
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // REST API status checker
  const [apiStatus, setApiStatus] = useState({ loading: true, data: null, error: null });
  
  // Toast notifications state
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const triggerToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    window.showToast = triggerToast;

    fetch('http://localhost:3000/api/status')
      .then(res => {
        if (!res.ok) throw new Error('API server offline');
        return res.json();
      })
      .then(data => setApiStatus({ loading: false, data, error: null }))
      .catch(err => setApiStatus({ loading: false, data: null, error: err.message }));
  }, []);

  // Page Toggles & Interactive states
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showAllRanks, setShowAllRanks] = useState(false);
  const [showAllLencana, setShowAllLencana] = useState(false);
  const [showAllBadgesProfile, setShowAllBadgesProfile] = useState(false);
  const [complexMode, setComplexMode] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Settings Interactive states
  const [showChangePw, setShowChangePw] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [videoSize, setVideoSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: <Home size={20} /> },
    { id: 'learn', label: 'Modules', icon: <BookOpen size={20} /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handlePrintCert = (type) => {
    window.showToast?.("Mempersiapkan dokumen cetak...", "success");
    setTimeout(() => {
      window.print();
    }, 800);
  };

  return (
    <div className={`app-layout ${highContrast ? 'high-contrast-mode' : ''}`}>
      {/* Desktop Sidebar (uses old classes mapped to style_old.css) */}
      <aside className="db-sidebar">
        <div className="sidebar-brand">
          <h2 class="brand-title">SignLearn</h2>
          <span class="brand-subtitle">Learning Hub</span>
        </div>
        <ul className="sidebar-menu">
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="main-container">
        <header className="main-header">
          <div className="header-links">
            {navItems.map(item => (
              <a 
                key={item.id}
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }} 
                className={`header-link ${activeTab === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="header-actions">
            <div className="avatar-small">
              <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>B</span>
            </div>
          </div>
        </header>

        <div className="db-content">
          
          {/* ==================== DASHBOARD TAB ==================== */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="welcome-title">Selamat pagi, Birendra!</h1>
              <p className="welcome-subtitle">Ready to continue your sign language journey? You're doing great—only 3 modules left to complete the Basic Certification.</p>

              {/* Grid 2 Column */}
              <div className="modules-grid">
                {/* Current Module */}
                <div className="current-module-card">
                  <div>
                    <div className="badge-current">
                      <BookOpen size={14} />
                      Current Module
                    </div>
                    <h2 className="module-title">Modul 2:<br/>Percakapan</h2>
                    <p className="module-desc">Learn how to introduce yourself and handle basic daily interactions in sign language.</p>
                    
                    <div className="progress-label-row">
                      <span style={{ color: '#64748B' }}>Progress</span>
                      <span style={{ color: '#1E293B', fontWeight: 700 }}>65%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar-fill" style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '99px' }}></div>
                    </div>
                    
                    <button onClick={() => setActiveTab('learn')} className="btn btn-primary btn-continue" style={{ marginTop: '1.5rem', width: '100%' }}>Continue Learning</button>
                  </div>
                  
                  <div className="module-image-container">
                    <span style={{ fontSize: '4rem' }}>🤝</span>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="weekly-progress-card">
                  <div className="weekly-header">
                    <h3 className="weekly-title">Weekly Progress</h3>
                    <Award size={18} />
                  </div>

                  <div className="chart-container">
                    {[
                      { day: 'Mon', height: '35%' },
                      { day: 'Tue', height: '60%' },
                      { day: 'Wed', height: '48%' },
                      { day: 'Thu', height: '70%' },
                      { day: 'Fri', height: '85%', active: true },
                      { day: 'Sat', height: '15%', empty: true },
                      { day: 'Sun', height: '15%', empty: true }
                    ].map((bar, i) => (
                      <div key={i} className="chart-bar-wrapper">
                        <div className="chart-bar-bg">
                          <div className={`chart-bar-fill ${bar.active ? 'active' : ''} ${bar.empty ? 'empty' : ''}`} style={{ height: bar.height }}></div>
                        </div>
                        <span className="chart-day-label" style={{ color: bar.active ? '#1E293B' : '' }}>{bar.day}</span>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1E293B', margin: 0, lineHeight: 1.5 }}>
                    120 mins total learning time this week.
                  </p>
                </div>
              </div>

              {/* REST API Status checker card */}
              <div className="card" style={{ padding: '20px', marginBottom: '2.5rem', borderLeft: apiStatus.error ? '4px solid #EF4444' : apiStatus.loading ? '4px solid #3B82F6' : '4px solid #10B981' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {!apiStatus.error && !apiStatus.loading ? <Wifi size={18} color="#10B981" /> : <WifiOff size={18} color="#EF4444" />}
                  REST API Integrasi Status
                </h3>
                {apiStatus.loading && <p style={{ color: 'var(--text-secondary)' }}>Menghubungkan ke API server...</p>}
                {apiStatus.error && <p style={{ color: '#EF4444' }}>Backend Offline. Jalankan <code>npm start</code> di terminal utama untuk mengaktifkan API backend.</p>}
                {apiStatus.data && <p style={{ color: '#10B981' }}>Terhubung! Respon: "{apiStatus.data.message}" | Waktu Server: {new Date(apiStatus.data.timestamp).toLocaleString()}</p>}
              </div>

              {/* Recent Achievements */}
              <section className="achievements-section">
                <div className="achievements-header">
                  <h3 className="achievements-title">Recent Achievements</h3>
                  <button 
                    onClick={() => setShowAllAchievements(!showAllAchievements)} 
                    className="form-link"
                    style={{ background: '#F1F5F9', border: 'none', padding: '6px 14px', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    {showAllAchievements ? 'Show Less' : 'View All'}
                  </button>
                </div>

                <div className="achievements-grid">
                  <div className="achievement-card">
                    <div className="achievement-icon-circle"><Award size={20} /></div>
                    <div className="achievement-info">
                      <h4>Fast Learner</h4>
                      <p>Completed 5 lessons in one day.</p>
                    </div>
                  </div>
                  
                  <div className="achievement-card">
                    <div className="achievement-icon-circle streak"><Play size={20} /></div>
                    <div className="achievement-info">
                      <h4>7-Day Streak</h4>
                      <p>Practiced every day this week.</p>
                    </div>
                  </div>

                  <div className="achievement-card">
                    <div className="achievement-icon-circle"><CheckCircle size={20} /></div>
                    <div className="achievement-info">
                      <h4>Module 1 Ace</h4>
                      <p>Scored 100% on the final quiz.</p>
                    </div>
                  </div>

                  {/* Hidden achievements toggled via state */}
                  {showAllAchievements && (
                    <>
                      <div className="achievement-card">
                        <div className="achievement-icon-circle" style={{ color: '#10B981', background: '#D1FAE5' }}><CheckCircle size={20} /></div>
                        <div className="achievement-info">
                          <h4>Master of Signs</h4>
                          <p>Completed 10 advanced lessons.</p>
                        </div>
                      </div>
                      <div className="achievement-card">
                        <div className="achievement-icon-circle" style={{ color: '#8B5CF6', background: '#EDE9FE' }}><CheckCircle size={20} /></div>
                        <div className="achievement-info">
                          <h4>Quiz Champion</h4>
                          <p>Scored perfectly on 5 quizzes.</p>
                        </div>
                      </div>
                      <div className="achievement-card">
                        <div className="achievement-icon-circle" style={{ color: '#F59E0B', background: '#FEF3C7' }}><CheckCircle size={20} /></div>
                        <div className="achievement-info">
                          <h4>Community Helper</h4>
                          <p>Helped 3 students in forums.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Locked Module */}
              <div className="locked-panel" style={{ marginTop: '20px' }}>
                <div className="locked-info-group">
                  <div className="lock-circle"><Lock size={18} /></div>
                  <div>
                    <h4 className="locked-text-title">Next: Modul 3: Keluarga & Rumah</h4>
                    <p className="locked-text-subtitle">Unlock this by finishing Module 2.</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8' }}>Locked</span>
              </div>
            </div>
          )}

          {/* ==================== LEARN (MODULES) TAB ==================== */}
          {activeTab === 'learn' && (
            <div>
              <div className="progress-toggle-row">
                <div className="progress-column">
                  <span className="progress-label-caps">PROGRESS MODUL</span>
                  <div className="progress-bar-container-lesson">
                    <div className="progress-track-lesson">
                      <div className="progress-fill-lesson" style={{ width: '40%', height: '100%', background: 'var(--primary)', borderRadius: '99px' }}></div>
                    </div>
                    <span className="progress-percent-text">40%</span>
                  </div>
                </div>
                
                <div className="switch-group">
                  <span>Mode Kompleks</span>
                  <label className="switch">
                    <input type="checkbox" checked={complexMode} onChange={() => setComplexMode(!complexMode)} />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="lesson-grid">
                <div className="lesson-main-content">
                  <div className="breadcrumb-lesson">
                    <span>Modul 2</span> <span>&gt;</span> <span class="breadcrumb-active">Materi Utama</span>
                  </div>
                  <h1 className="lesson-main-title">Percakapan Sehari-hari</h1>
                  <p className="lesson-main-subtitle">
                    Belajar berinteraksi dengan teman tuli dimulai dari dasar-dasar etika dan isyarat sapaan yang umum digunakan. Mari kita pelajari tiga poin utama hari ini:
                  </p>

                  <div className="lesson-steps-list">
                    <div className="lesson-step-item">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4 className="step-title">Etika Kontak Mata</h4>
                        <p className="step-desc">Selalu jaga kontak mata saat berkomunikasi. Memalingkan wajah dianggap kurang sopan dalam budaya Tuli.</p>
                      </div>
                    </div>
                    <div className="lesson-step-item">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4 className="step-title">Isyarat Sapaan Dasar</h4>
                        <p className="step-desc">Pelajari isyarat untuk kata "Halo", "Selamat Pagi", dan "Terima Kasih".</p>
                      </div>
                    </div>
                    {complexMode && (
                      <div className="lesson-step-item">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h4 className="step-title">Variasi Dialek Daerah</h4>
                          <p className="step-desc">Beberapa kota memiliki isyarat sapaan yang sedikit unik. Pahami perbedaannya agar lebih luwes.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Quiz */}
                  <div className="quiz-container-box" style={{ marginTop: '2.5rem', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <h3 className="quiz-title"><BookOpenText size={20} /> Kuis Kilat</h3>
                    <p className="quiz-question">Manakah isyarat sapaan yang benar untuk "Terima Kasih" dalam BISINDO?</p>
                    
                    <div className="quiz-options">
                      {[
                        'Mengatupkan kedua tangan di dada',
                        'Menyentuhkan ujung jari tangan ke dagu lalu mengarahkannya ke depan',
                        'Melambaikan tangan di samping kepala'
                      ].map((option, i) => (
                        <div 
                          key={i} 
                          className={`quiz-option ${selectedQuizOption === i ? 'selected' : ''}`}
                          onClick={() => { if(!quizSubmitted) setSelectedQuizOption(i); }}
                        >
                          <span className="quiz-option-radio"></span>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <button 
                        onClick={() => { if(selectedQuizOption !== null) setQuizSubmitted(true); }}
                        className="btn-submit-quiz"
                        disabled={selectedQuizOption === null}
                        style={{ opacity: selectedQuizOption === null ? 0.6 : 1 }}
                      >
                        Kirim Jawaban
                      </button>
                    ) : (
                      <div>
                        {selectedQuizOption === 1 ? (
                          <p style={{ color: '#10B981', fontWeight: 700 }}>✅ Benar! Isyarat terima kasih ditunjukkan dengan menyentuh dagu dan mengarahkannya ke depan.</p>
                        ) : (
                          <p style={{ color: '#EF4444', fontWeight: 700 }}>❌ Kurang tepat. Silakan pelajari kembali video panduan di sebelah kanan.</p>
                        )}
                        <button 
                          onClick={() => { setQuizSubmitted(false); setSelectedQuizOption(null); }}
                          className="btn" 
                          style={{ marginTop: '10px', background: '#F1F5F9', color: '#1E293B', padding: '6px 14px', borderRadius: '999px' }}
                        >
                          Coba Lagi
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Interpreter video panel */}
                <div className="interpreter-column">
                  <div className="video-panel-card">
                    <div className="panel-header-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="panel-title-custom">Video Interpreter</span>
                      <span className="badge-live-red">BISINDO</span>
                    </div>

                    <div className="video-placeholder-container" style={{ height: videoSize === 'small' ? '180px' : videoSize === 'large' ? '320px' : '240px' }}>
                      <div className="video-overlay-play">
                        <Play size={36} color="white" />
                      </div>
                      {/* Generative placeholder image */}
                      <span style={{ fontSize: '4.5rem' }}>🧑‍🏫</span>
                    </div>

                    <div className="video-controls-row">
                      <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Kecepatan: 1.0x</span>
                      <button className="btn" style={{ padding: '4px 12px', background: '#EEF2FF', color: 'var(--primary)', borderRadius: '999px', fontSize: '0.8rem' }}>Putar Ulang</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== ACHIEVEMENTS TAB ==================== */}
          {activeTab === 'achievements' && (
            <div>
              <div className="leaderboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                {/* Leaderboard left */}
                <div className="leaderboard-panel-custom">
                  <div className="panel-header-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 className="panel-title-custom">Papan Peringkat</h3>
                    <button 
                      onClick={() => setShowAllRanks(!showAllRanks)}
                      style={{ background: '#F1F5F9', border: 'none', color: '#1A56DB', padding: '8px 16px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      {showAllRanks ? 'Kembali' : 'Lihat Semua Peringkat'}
                    </button>
                  </div>

                  <div className="leaderboard-list">
                    <div className="leaderboard-item">
                      <div className="leaderboard-left-group">
                        <span className="rank-num">1</span>
                        <div className="leader-avatar">A</div>
                        <span className="leader-name">Andi Wijaya</span>
                      </div>
                      <span className="leader-xp">2,450 XP</span>
                    </div>

                    {showAllRanks && (
                      <>
                        {[
                          { rank: 2, name: 'Budi Santoso', xp: '2,300 XP', initial: 'B' },
                          { rank: 3, name: 'Citra Dewi', xp: '2,150 XP', initial: 'C' },
                          { rank: 4, name: 'Dian Pramana', xp: '2,100 XP', initial: 'D' },
                          { rank: 5, name: 'Eko Prasetyo', xp: '2,050 XP', initial: 'E' },
                          { rank: 6, name: 'Fajar Hidayat', xp: '2,000 XP', initial: 'F' },
                          { rank: 7, name: 'Gita Savitri', xp: '1,950 XP', initial: 'G' },
                          { rank: 8, name: 'Hadi Wijaya', xp: '1,900 XP', initial: 'H' },
                          { rank: 9, name: 'Indah Permata', xp: '1,850 XP', initial: 'I' },
                          { rank: 10, name: 'Joko Susilo', xp: '1,800 XP', initial: 'J' },
                          { rank: 11, name: 'Kartika Sari', xp: '1,750 XP', initial: 'K' }
                        ].map((user) => (
                          <div key={user.rank} className="leaderboard-item">
                            <div className="leaderboard-left-group">
                              <span className="rank-num">{user.rank}</span>
                              <div className="leader-avatar">{user.initial}</div>
                              <span className="leader-name">{user.name}</span>
                            </div>
                            <span className="leader-xp">{user.xp}</span>
                          </div>
                        ))}
                      </>
                    )}

                    <div className="leaderboard-item me" style={{ background: 'var(--primary-light)', borderLeft: '4px solid var(--primary)' }}>
                      <div className="leaderboard-left-group">
                        <span className="rank-num" style={{ fontWeight: 800 }}>12</span>
                        <div className="leader-avatar" style={{ background: 'var(--primary)', color: 'white' }}>B</div>
                        <span className="leader-name" style={{ fontWeight: 700 }}>Birendra (Anda)</span>
                      </div>
                      <span className="leader-xp" style={{ fontWeight: 700 }}>1,240 XP</span>
                    </div>

                    <div className="leaderboard-item">
                      <div className="leaderboard-left-group">
                        <span className="rank-num">13</span>
                        <div className="leader-avatar">M</div>
                        <span className="leader-name">Mina Santoso</span>
                      </div>
                      <span className="leader-xp">1,150 XP</span>
                    </div>
                  </div>
                </div>

                {/* Certificates right */}
                <section className="certificate-section" style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                  <div className="achievements-header" style={{ marginBottom: '20px' }}>
                    <h3 className="achievements-title">Sertifikat Digital</h3>
                  </div>
                  
                  <div className="certificate-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="certificate-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '2rem' }}>📜</span>
                        <div>
                          <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sertifikat Dasar 1</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Diterbitkan pada 12 Mei 2023</p>
                        </div>
                      </div>
                      <button onClick={() => handlePrintCert('dasar')} className="btn" style={{ padding: '6px 12px', background: '#EEF2FF', color: 'var(--primary)', borderRadius: '999px', fontSize: '0.8rem' }}><Printer size={14} /></button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Lencana Grid */}
              <section className="badge-section">
                <div className="achievements-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="achievements-title" style={{ margin: 0 }}>Koleksi Lencana</h3>
                  <button 
                    onClick={() => setShowAllLencana(!showAllLencana)} 
                    style={{ background: '#F1F5F9', border: 'none', color: '#1A56DB', padding: '6px 14px', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    {showAllLencana ? 'Sembunyikan' : 'Lihat Semua'}
                  </button>
                </div>
                
                <div className="badge-grid">
                  <div className="badge-card active-special">
                    <span className="badge-tag-baru">BARU</span>
                    <div className="badge-card-icon"><Award size={22} /></div>
                    <h4 className="badge-card-title">Master of Conversation</h4>
                    <p className="badge-card-desc">Selesaikan 50 percakapan</p>
                  </div>

                  <div className="badge-card">
                    <div className="badge-card-icon"><CheckCircle size={22} /></div>
                    <h4 className="badge-card-title">First Hello</h4>
                    <p className="badge-card-desc">Sapaan pertama Anda</p>
                  </div>

                  <div className="badge-card">
                    <div className="badge-card-icon"><Play size={22} /></div>
                    <h4 className="badge-card-title">Abjad Expert</h4>
                    <p className="badge-card-desc">Hafal semua huruf</p>
                  </div>

                  {showAllLencana && (
                    <>
                      <div className="badge-card locked-custom">
                        <div className="badge-card-icon"><Lock size={22} /></div>
                        <h4 className="badge-card-title">Grammar Guru</h4>
                        <p className="badge-card-desc">Selesaikan modul struktur</p>
                      </div>
                      <div className="badge-card locked-custom">
                        <div className="badge-card-icon"><Lock size={22} /></div>
                        <h4 className="badge-card-title">Quiz Master</h4>
                        <p className="badge-card-desc">Sempurna di 5 kuis</p>
                      </div>
                      <div className="badge-card locked-custom">
                        <div className="badge-card-icon"><Lock size={22} /></div>
                        <h4 className="badge-card-title">Speed Runner</h4>
                        <p className="badge-card-desc">Tamat dalam 30 hari</p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ==================== PROFILE TAB ==================== */}
          {activeTab === 'profile' && (
            <div>
              <div className="profile-hero-card" style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '2.5rem', fontWeight: 800 }}>
                  B
                </div>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Birendra Syaifullah</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Siswa Isyarat Menengah | Bergabung Mei 2023</p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    <span style={{ padding: '4px 12px', background: '#F1F5F9', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>Level 5</span>
                    <span style={{ padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>1,240 XP</span>
                  </div>
                </div>
              </div>

              {/* Badges Profile */}
              <section className="badge-section">
                <div className="achievements-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="achievements-title" style={{ margin: 0 }}>Koleksi Badge</h3>
                  <button 
                    onClick={() => setShowAllBadgesProfile(!showAllBadgesProfile)} 
                    style={{ background: '#F1F5F9', border: 'none', color: '#1A56DB', padding: '6px 14px', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    {showAllBadgesProfile ? 'Sembunyikan' : 'Lihat Semua'}
                  </button>
                </div>

                <div className="badge-grid">
                  <div className="badge-card">
                    <div className="badge-card-icon"><Award size={22} /></div>
                    <h4 className="badge-card-title">Abjad Champion</h4>
                    <p className="badge-card-desc">Selesai modul abjad</p>
                  </div>
                  
                  <div className="badge-card">
                    <div className="badge-card-icon"><CheckCircle size={22} /></div>
                    <h4 className="badge-card-title">Penyapa Ramah</h4>
                    <p className="badge-card-desc">Kirim 10 sapaan</p>
                  </div>

                  {showAllBadgesProfile && (
                    <>
                      <div className="badge-card locked-custom">
                        <div className="badge-card-icon"><Lock size={22} /></div>
                        <h4 className="badge-card-title">Ahli Kosakata</h4>
                        <p className="badge-card-desc">Terkunci</p>
                      </div>
                      <div className="badge-card locked-custom">
                        <div className="badge-card-icon"><Lock size={22} /></div>
                        <h4 className="badge-card-title">Mentor Muda</h4>
                        <p className="badge-card-desc">Terkunci</p>
                      </div>
                      <div className="badge-card locked-custom">
                        <div className="badge-card-icon"><Lock size={22} /></div>
                        <h4 className="badge-card-title">Master BISINDO</h4>
                        <p className="badge-card-desc">Terkunci</p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ==================== SETTINGS TAB ==================== */}
          {activeTab === 'settings' && (
            <div>
              <section className="settings-card" style={{ background: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>Pengaturan Tampilan</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>Mode Kontras Tinggi</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Meningkatkan keterbacaan teks dan batas elemen.</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>Ukuran Interpreter Video</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Atur ukuran frame pemandu isyarat.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['small', 'medium', 'large'].map((size) => (
                        <button 
                          key={size}
                          onClick={() => setVideoSize(size)}
                          style={{
                            padding: '6px 16px',
                            borderRadius: '999px',
                            border: '1.5px solid var(--border)',
                            background: videoSize === size ? 'var(--primary-light)' : 'white',
                            color: videoSize === size ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Security (with Change Password and Enable 2FA inline forms) */}
              <section className="settings-card" style={{ background: '#FFFFFF', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>Keamanan Akun</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Change Password row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>Kata Sandi</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Ubah kata sandi Anda secara berkala.</p>
                    </div>
                    <button 
                      onClick={() => setShowChangePw(!showChangePw)} 
                      style={{ background: '#F1F5F9', border: 'none', color: '#1A56DB', padding: '8px 16px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      {showChangePw ? 'Batal' : 'Change Password'}
                    </button>
                  </div>

                  {/* Change Password Inline Form */}
                  {showChangePw && (
                    <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Kata Sandi Saat Ini</label>
                        <input type="password" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid var(--border)' }} placeholder="Masukkan kata sandi lama" />
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Kata Sandi Baru</label>
                        <input type="password" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid var(--border)' }} placeholder="Minimal 8 karakter" />
                      </div>
                      <button 
                        onClick={() => { setShowChangePw(false); window.showToast?.("Kata sandi berhasil diperbarui!", "success"); }}
                        className="btn btn-primary" 
                        style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                      >
                        Simpan Kata Sandi
                      </button>
                    </div>
                  )}

                  {/* 2FA row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>Autentikasi Dua Faktor (2FA)</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Lindungi akun Anda dengan lapisan keamanan tambahan.</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (is2FAEnabled) {
                          setIs2FAEnabled(false);
                          window.showToast?.("2FA dinonaktifkan", "info");
                        } else {
                          setShow2FA(!show2FA);
                        }
                      }}
                      style={{
                        background: is2FAEnabled ? '#D1FAE5' : '#F1F5F9',
                        border: 'none',
                        color: is2FAEnabled ? '#10B981' : '#1A56DB',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {is2FAEnabled ? '2FA Enabled' : show2FA ? 'Batal' : 'Enable 2FA'}
                    </button>
                  </div>

                  {/* 2FA setup form */}
                  {show2FA && !is2FAEnabled && (
                    <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Pindai kode QR menggunakan aplikasi Authenticator Anda (Google/Microsoft), lalu masukkan 6-digit kode verifikasinya.</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '4rem' }}>📱</span>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Kode Verifikasi</label>
                        <input type="text" maxLength={6} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid var(--border)', textAlign: 'center', letterSpacing: '4px', fontSize: '1.1rem' }} placeholder="000000" />
                      </div>

                      <button 
                        onClick={() => { setIs2FAEnabled(true); setShow2FA(false); window.showToast?.("2FA Berhasil diaktifkan! 🔒", "success"); }}
                        className="btn btn-primary" 
                        style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                      >
                        Verifikasi & Aktifkan
                      </button>
                    </div>
                  )}

                </div>
              </section>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Bottom Navigation (auto-adapts) */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
      {/* Toast Notification element */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: toast.type === 'success' ? '#10B981' : toast.type === 'warning' ? '#F59E0B' : '#3B82F6',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9999,
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default App;
