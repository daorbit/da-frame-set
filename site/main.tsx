import { createRoot } from 'react-dom/client';
import { Docs } from './Docs';
import { Home } from './Home';
import { Playground } from './Playground';
import { useRoute, type Route } from './router';

import '../src/styles/frames.css';
import './site.css';

const NAV: [Route, string][] = [
  ['home', 'Home'],
  ['docs', 'Docs'],
  ['playground', 'Playground'],
];

function App() {
  const [route, navigate] = useRoute();

  return (
    // The playground fills the viewport and manages its own scrolling; the
    // other routes are ordinary documents that scroll with the page.
    <div className={`app${route === 'playground' ? ' app--fixed' : ''}`}>
      <header className="topbar">
        <button className="topbar__brand" type="button" onClick={() => navigate('home')}>
          <span className="topbar__mark" aria-hidden="true" />
          da-frame-set
        </button>

        <nav className="topbar__nav" aria-label="Main">
          {NAV.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`topbar__link${route === id ? ' topbar__link--active' : ''}`}
              aria-current={route === id ? 'page' : undefined}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="topbar__end">
          <span className="topbar__version">v0.1.0</span>
          <a
            className="topbar__npm"
            href="https://www.npmjs.com/package/da-frame-set"
            target="_blank"
            rel="noreferrer noopener"
          >
            npm
          </a>
        </div>
      </header>

      <main className="app__main">
        {route === 'home' && <Home navigate={navigate} />}
        {route === 'docs' && <Docs />}
        {route === 'playground' && <Playground />}
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
