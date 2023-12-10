/* eslint-disable @typescript-eslint/no-magic-numbers */
import { FC } from 'react';

import { Card, CircularProgress } from '@mui/material';
import { Button } from '../ui/button';
import { ConnectButton } from '../ui/connect-button';

import { useSmartAccount } from '@/hooks/use-smart-account';
import { Input } from '../ui/input';

interface PromptInputProps {
  onSubmit: () => void;
  setPromtMessage: (message: string) => void;
  placeholder: string;
  promt?: string;
  isLoading?: boolean;
}

export const PromptInput: FC<PromptInputProps> = ({ onSubmit, placeholder, promt, setPromtMessage, isLoading }) => {
  const { smartAccountAddress } = useSmartAccount();

  return (
    <div className="mt-auto w-3/4 flex flex-col gap-4 dd ">
      {/* <div className="flex gap-5">
        <Card>Swap 100 USDC to USDT.</Card>
        <Card>Deposit 0.1 ETH to Lido. Send 0.1 WETH to 0x000000</Card>
        <Card>Swap 250 USDT to LINK. Create portfolio with 20 LINK</Card>
        <Card>Deposit 5 USDT to Aave. Borrow 1 USDC from Aave. Repay 1 USDC to Aave.</Card>
      </div> */}
      <div className="flex flex-row gap-4">
        <Input
          value={promt}
          onChange={e => {
            setPromtMessage(e.target.value || '');
          }}
          placeholder={placeholder}
          disabled={isLoading}
          className="bg-transparent placeholder:text-black/60 justify-center align-middle items-center focus:outline-none text-black rounded-2xl"
        />

        {smartAccountAddress ? (
          <Button
            className="px-3 border p-1 mx-auto  border-gray-800 font-bold rounded-2xl cursor-pointer text-black"
            onClick={onSubmit}
            disabled={isLoading || !promt}
          >
            {isLoading ? <CircularProgress /> : 'Send Request'}
          </Button>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
};
