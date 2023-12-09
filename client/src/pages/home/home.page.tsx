import { useState } from 'react';

import { Backdrop, CircularProgress, styled } from '@mui/material';

import { useHomeViewModel } from './home.page.vm';
import { PromptInput } from '@/components/base/promt-input';
import { useOperations } from '@/providers/operations';
import { OperationScreen } from '@/components/base/operations-screen';

const LoaderScreen = styled(Backdrop)(({ theme }) => ({
  position: 'absolute',
  borderRadius: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1
}));

export const HomePage = () => {
  const { sendPromt, promtMessage, setPromtMessage, isSubmitting } = useHomeViewModel();
  const { setOperations } = useOperations();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onPromtSubmit = () => {
    sendPromt(promtMessage, operations => {
      setOperations(operations);
      setIsOpen(true);
    });
    setPromtMessage('');
  };

  return (
    <>
      <PromptInput
        promt={promtMessage}
        setPromtMessage={setPromtMessage}
        onSubmit={onPromtSubmit}
        placeholder={'Enter Your Request'}
      />
      <OperationScreen isOpen={isOpen} setIsOpen={setIsOpen} />

      <LoaderScreen open={isSubmitting}>
        <CircularProgress color="success" />
      </LoaderScreen>
    </>
  );
};
