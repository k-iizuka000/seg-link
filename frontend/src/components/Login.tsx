function Login() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>ログイン</h1>
      <button style={{ padding: '10px 20px', fontSize: '16px' }}>Stravaでログイン</button>
      <footer style={{ marginTop: '20px' }}>
        <a href="/terms" style={{ textDecoration: 'none', color: 'blue' }}>利用規約</a>
      </footer>
    </div>
  );
}

export default Login;