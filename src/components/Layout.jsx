import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center text-sm text-[#8B7355]">
        <p>A retelling of L. Frank Baum's <em>The Wonderful Wizard of Oz</em></p>
      </footer>
    </div>
  );
};

export default Layout;
