import { Layout } from './components/base';
import { Desktop } from './desktop';
import { useIsDesktop } from './hooks/is-desktop';
import { ProvidersSandwich } from './providers/providers-sandwich';
import { Router } from './router/router';
import './index.css';
export function App() {
  const { isDesktop } = useIsDesktop();

  return (
    <main className="bg-primary">
      <ProvidersSandwich>
        {isDesktop ? (
          <Desktop />
        ) : (
          <Layout>
            <Router />
          </Layout>
        )}
      </ProvidersSandwich>
    </main>
  );
}
