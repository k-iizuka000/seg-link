// import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ダッシュボード</h1>
      <nav style={{ marginBottom: '20px' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/segments">Myセグメント一覧</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/search">複合検索</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/templates">テンプレート管理</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/profile">プロフィール</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/logout">ログアウト</a></li>
        </ul>
      </nav>
      <section>
        <h2>最近のアクティビティ</h2>
        <p>最近のライド要約やセグメント一覧を表示します。</p>
      </section>
    </div>
  );
}

export default Dashboard; 