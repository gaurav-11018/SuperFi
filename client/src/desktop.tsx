import Header from './components/base/header';
import { AccountPage } from './pages/account.page';
import { HomePage } from './pages/home/home.page';

export const Desktop = () => (
  <div className="flex flex-col ">
    <Header />

    <div className="flex flex-row flex-1">
      <div className="w-1/5">
        <h1 className="text-secondary pb-3 font-bold text-2xl m-4 ">Account Details</h1>
        <AccountPage />
      </div>

      <div className="flex-grow w-4/5">
        <h1 className="text-secondary pb-3  font-bold text-2xl m-4 ">Magic space</h1>
        <div className="rounded p-4 ">
          <HomePage />
        </div>
      </div>
    </div>
  </div>
);
