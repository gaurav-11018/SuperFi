import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '../ui/button';
import { Web3AuthConnector } from '@/auth/wagmi';
import { shrink } from '@/utils/shrink';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: Web3AuthConnector
  });
  const { disconnect } = useDisconnect();

  const shortAddress = shrink(address);

  return (
    <div className="rounded-2xl flex">
      {isConnected ? (
        <Button className="w-[80%] border p-1 rounded-2xl mx-auto border-gray-700 text-black" onClick={() => disconnect()}>
          {shortAddress}
        </Button>
      ) : (
        <Button className="w-[80%] border p-1 rounded-2xl mx-auto border-gray-700 text-black" onClick={() => connect()}>
          Connect
        </Button>
      )}
    </div>
  );
};
