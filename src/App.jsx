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

  // Helper to resolve page from clean URL path or legacy hash
  const getPageFromUrl = () => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (['classes', 'printing', 'quote'].includes(path)) {
      return path;
    }
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['classes', 'printing', 'quote'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  // Sync with browser back/forward navigation (popstate)
  useEffect(() => {
    const initialPage = getPageFromUrl();
    setActivePage(initialPage);

    // Clean up any legacy hash to standard path
    if (window.location.hash && ['classes', 'printing', 'quote'].includes(window.location.hash.replace('#', ''))) {
      const cleanPath = initialPage === 'home' ? '/' : `/${initialPage}`;
      window.history.replaceState({ page: initialPage }, '', cleanPath);
    } else if (!window.history.state) {
      window.history.replaceState({ page: initialPage }, '', window.location.pathname);
    }

    const handlePopState = (e) => {
      const targetPage = e.state?.page || getPageFromUrl();
      setActivePage(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO & Title updates per active page
  useEffect(() => {
    const seoMap = {
      home: {
        title: 'Shri Siddhivinayak | Premier Engineering Classes & 3D Printing Service',
        desc: 'Premier Mumbai & Pune University engineering coaching by Prof. Jatin Shah (24+ yrs exp) in Navi Mumbai, and precision on-demand 3D printing & rapid prototyping service across India.',
      },
      classes: {
        title: 'Engineering Classes Navi Mumbai | Prof. Jatin Shah | Shri Siddhivinayak',
        desc: 'Exclusive engineering coaching for Mumbai & Pune University by Prof. Jatin Shah (BE Mechanical, 24+ yrs experience). Kopar Khairane, Navi Mumbai.',
      },
      printing: {
        title: '3D Printing Service India | Rapid Prototyping & Custom STL | Shri Siddhivinayak',
        desc: 'Precision online FDM 3D printing in PLA, PETG, TPU, and PVA. Upload STL files for live pricing, high tolerance, and doorstep delivery across India.',
      },
      quote: {
        title: 'Instant 3D STL Quote Calculator | Online Slicing Pricing | Shri Siddhivinayak',
        desc: 'Upload your 3D STL model for instant geometry analysis, volume calculation, infill density selection, and live automated quotation.',
      },
    };

    const currentSeo = seoMap[activePage] || seoMap.home;
    document.title = currentSeo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSeo.title);
    }
  }, [activePage]);

  const handlePageChange = (pageId) => {
    if (pageId === activePage) return;
    setActivePage(pageId);
    const newPath = pageId === 'home' ? '/' : `/${pageId}`;
    window.history.pushState({ page: pageId }, '', newPath);
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
