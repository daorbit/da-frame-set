import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Docs } from './Docs';
import { Home } from './Home';
import { Playground } from './Playground';

import '../src/styles/frames.css';
import './site.css';

const NAV: [string, string][] = [
  ['/', 'Home'],
  ['/docs', 'Docs'],
  ['/playground', 'Playground'],
];

function App() {
  const { pathname } = useLocation();
  const onPlayground = pathname === '/playground';

  return (
    <div className={`app${onPlayground ? ' app--fixed' : ''}`}>
      <header className="topbar">
        <NavLink to="/" className="topbar__brand">
          <img className="topbar__mark" src="/frameset-logo.svg" alt="da-frame-set" />
        </NavLink>

        <nav className="topbar__nav" aria-label="Main">
          {NAV.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `topbar__link${isActive ? ' topbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar__end">
          <span className="topbar__version">v0.1.2</span>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
