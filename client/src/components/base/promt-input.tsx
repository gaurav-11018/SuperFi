/* eslint-disable @typescript-eslint/no-magic-numbers */
import { FC } from 'react';

import { CircularProgress } from '@mui/material';
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
    <div className="mt-auto w-3/4 flex flex-col gap-4 ">
      <Input
        value={promt}
        onChange={e => {
          setPromtMessage(e.target.value || '');
        }}
        placeholder={placeholder}
        disabled={isLoading}
        className="bg-transparent justify-center align-middle items-center focus:outline-none text-black rounded-2xl"
      />

      {smartAccountAddress ? (
        <Button
          className="w-[80%] border p-1  border-gray-800 font-bold rounded-2xl cursor-pointer text-black"
          onClick={onSubmit}
          disabled={isLoading || !promt}
        >
          {isLoading ? <CircularProgress /> : 'Send Request'}
        </Button>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
