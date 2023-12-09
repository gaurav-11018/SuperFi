import { Link } from 'react-router-dom';
import logoUrl from '@/assets/logo.svg';
import { APP_NAME } from '@/config/constants';
import { useIsDesktop } from '@/hooks/is-desktop';
import { InfoPanel } from './info-panel';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Web3AuthConnector } from '@/auth/wagmi';
import { LinkOff, Wallet } from '@mui/icons-material';
import { AddressTile } from '@/pages/account.page';
import { IconButton } from '@mui/material';
import { Button } from '../ui/button';

const WalletTile = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: Web3AuthConnector
  });
  const { disconnect } = useDisconnect();

  return (
    <div className="border-2 rounded-xl p-2  dark:bg-white ">
      {isConnected ? (
        <AddressTile icon={Wallet} label="Signer Account" address={address}>
          <IconButton size="small" onClick={() => disconnect()}>
            <LinkOff
              sx={{
                color: 'primary.main'
              }}
            />
          </IconButton>
        </AddressTile>
      ) : (
        <Button className="text-lg bg-transparent hover:bg-transparent font-bold " onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

const Header = () => {
  const { isDesktop } = useIsDesktop();

  return (
    <header className="shadow-md bg-black/20 ">
      <div className="container mx-auto px-4 py-3 text-black flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center justify-center gap-4 font-semibold text-2xl">
            <img src={logoUrl} alt="logo" className="w-10 h-10" /> {/* Adjust logo size */}
            <span>{APP_NAME}</span>
          </div>
        </Link>
        <Link to="/" className="text-white text-lg font-bold"></Link>
        <WalletTile />
        {!isDesktop && <InfoPanel />} {/* Assuming InfoPanel is defined */}
      </div>
    </header>
  );
};

export default Header;
