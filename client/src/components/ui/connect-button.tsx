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
        <Button
          className=" px-3 border p-1 rounded-2xl mx-auto border-gray-700 bg-black text-white "
          onClick={() => disconnect()}
        >
          {shortAddress}
        </Button>
      ) : (
        <Button
          className=" px-3 border rounded-2xl mx-auto border-gray-700 bg-black text-white p-3"
          onClick={() => connect()}
        >
          Connect
        </Button>
      )}
    </div>
  );
};
