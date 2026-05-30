export default function Home({ onStart }) {
  return (
    <main className="app home-screen">
      <h1 className="title">Snake</h1>
      <p className="intro">Come la comida, crece y evita chocar.</p>
      <button className="btn primary-btn" onClick={onStart}>
        JUGAR
      </button>
    </main>
  );
}
