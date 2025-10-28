import React from 'react';
import Layout from './components/Layout';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EFE4] to-[#FFF8DC] flex flex-col">
      <Layout>
        <Game />
      </Layout>
    </div>
  );
}

export default App;
