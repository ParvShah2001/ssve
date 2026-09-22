import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

// Lazy-load inner pages so heavy 3D libraries (Three.js ~530kB) only download when needed
const ClassesPage = lazy(() => import('./pages/ClassesPage'));
const PrintingPage = lazy(() => import('./pages/PrintingPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));

// Lightweight, instant loading fallback with zero layout shift
function PageLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 p-8 text-slate-300">
      <div className="w-10 h-10 border-3 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
      <span className="text-xs font-medium tracking-wide text-slate-400">Loading page...</span>
    </div>
  );
}

// Resilient Error Boundary to safeguard against blank screens
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
          <div className="p-6 rounded-2xl bg-blue-950/60 border border-blue-500/30 max-w-md space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-blue-300 font-heading">Page Loading Issue</h3>
            <p className="text-xs text-slate-300">
              There was an issue rendering this section. Click below to return to the main portal.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                if (this.props.onReset) this.props.onReset();
                window.location.hash = '';
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-600/30"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Sync with window.location.hash for shareable links and browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'classes', 'printing', 'quote'].includes(hash)) {
        setActivePage(hash);
      } else if (hash === 'about' || hash === 'contact') {
        setActivePage('home');
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId === 'home' ? '' : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
      {/* Show Sticky Top Navigation on inner pages only (Home is pure fullscreen) */}
      {activePage !== 'home' && (
        <Navbar activePage={activePage} setActivePage={handlePageChange} />
      )}

      {/* Main Page View Content */}
      <main className={activePage === 'home' ? 'h-screen w-full overflow-hidden' : 'flex-grow'}>
        <ErrorBoundary onReset={() => setActivePage('home')}>
          <Suspense fallback={<PageLoadingFallback />}>
            {activePage === 'home' && <HomePage setActivePage={handlePageChange} />}
            {activePage === 'classes' && <ClassesPage setActivePage={handlePageChange} />}
            {activePage === 'printing' && <PrintingPage setActivePage={handlePageChange} />}
            {activePage === 'quote' && <QuotePage />}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
