import { FC } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Backdrop, Box, ButtonGroup, IconButton, Typography, styled } from '@mui/material';
import { FormsGenerator } from '../forms/forms.generator';
import { useIsDesktop } from '@/hooks/is-desktop';
import { useOperations } from '@/providers/operations';
import { Button } from '../ui/button';
interface OperationScreenProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
  position: 'absolute',
  borderRadius: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const CustomBackdropHeader = styled(Box)(({ theme }) => ({
  width: '80%',
  height: '48px',
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  borderColor: theme.palette.divider,
  borderBottom: 1
}));

const CustomBackdropContent = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  maxHeight: '80%',
  width: '80%',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
  backgroundColor: theme.palette.background.default
}));

const CustomBackdropFooter = styled(ButtonGroup)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper
}));

export const OperationScreen: FC<OperationScreenProps> = ({ isOpen, setIsOpen }) => {
  const { operations, updateOperation, sendOperations, setOperations } = useOperations();
  const { isDesktop } = useIsDesktop();

  const handleCancel = () => {
    setOperations([]);
    setIsOpen(false);
  };

  const handleSendOperations = async () => {
    await sendOperations();
    handleCancel();
  };

  return (
    <CustomBackdrop open={isOpen}>
      <CustomBackdropHeader>
        <IconButton onClick={handleCancel}>
          <ArrowBack />
        </IconButton>
        <Typography variant="body1">Request result</Typography>
        <IconButton>{/* <Settings /> */}</IconButton>
      </CustomBackdropHeader>

      <CustomBackdropContent>
        <FormsGenerator listOperations={operations} setOperation={updateOperation} />
      </CustomBackdropContent>

      <CustomBackdropFooter sx={{ borderRadius: isDesktop ? 2 : 0 }} className="flex gap-4 ">
        <Button onClick={handleCancel} variant="destructive">
          Cancel
        </Button>
        <Button onClick={handleSendOperations} variant="default">
          Execute
        </Button>
      </CustomBackdropFooter>
    </CustomBackdrop>
  );
};
