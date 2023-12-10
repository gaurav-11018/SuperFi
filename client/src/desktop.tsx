import Header from './components/base/header';
import { AccountPage } from './pages/account.page';
import { HomePage } from './pages/home/home.page';

export const Desktop = () => (
  <div className="flex flex-col h-screen">
    <Header />

    <div className="flex flex-1 overflow-hidden">
      {/* Div1 */}
      <div className="w-1/5 border-r border-gray-800 overflow-y-auto hide-scrollbar">
        <AccountPage />
      </div>

      {/* Div2 */}
      <div className="flex-grow h-screen">
        <h1 className="text-black pb-3 font-bold text-2xl m-4">DeFi space</h1>
        <div className="rounded p-4">
          <HomePage />
        </div>
      </div>
    </div>
  </div>
);
