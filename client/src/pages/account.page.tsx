import { FC, useEffect } from 'react';

import { ContentCopy, SmartToy, Wallet } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled
} from '@mui/material';
import { goerli, useAccount, useBalance } from 'wagmi';

import { Page } from '@/components/base/page';
import { NetworkAvatar } from '@/components/ui/network-avatar';
import { Token, tokens } from '@/config/tokens';
import { useSmartAccount } from '@/hooks/use-smart-account';
import { useSubscribeOnBlock } from '@/hooks/use-subscribe-on-block';
import { CFC } from '@/types/react';
import { copy } from '@/utils/copy';
import { shrink } from '@/utils/shrink';

const Tile = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper
}));

const GridList = styled(List)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1)
}));

const subs: Record<string, boolean> = {};

const Balance: FC<{ token: Token }> = ({ token }) => {
  const { smartAccountAddress } = useSmartAccount();
  const { subscribe } = useSubscribeOnBlock();

  const { data: tokenInfo, refetch } = useBalance({
    address: smartAccountAddress,
    token: token.address
  });

  useEffect(() => {
    if (subs[token.address ?? '0']) {
      return;
    }

    subs[token.address ?? '0'] = true;

    subscribe(() => {
      refetch();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tile
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto'
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            width: 32,
            height: 32
          }}
          src={token.logoURI}
        >
          {token.symbol.slice(0, 2).toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          variant: 'body2'
        }}
        secondaryTypographyProps={{
          variant: 'caption'
        }}
        primary={token.symbol}
        secondary={token?.name}
      />
      <ListItemText
        primaryTypographyProps={{
          variant: 'body2',
          sx: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '72px'
          }
        }}
        primary={tokenInfo?.formatted}
      />
    </Tile>
  );
};

export const AddressTile: CFC<{ address?: string; label: string; icon: typeof Wallet }> = ({
  address,
  label,
  icon,
  children
}) => {
  const TileIcon = icon;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: 'auto auto',
        columnGap: 1,
        flex: 1
      }}
    >
      <Typography
        sx={{
          gridColumn: '1 / 3',
          gridRow: '1 / 2'
        }}
        variant="inherit"
        color="black"
        fontSize={15}
      >
        {label}
      </Typography>

      <Box
        sx={{
          gridColumn: '1 / 2',
          gridRow: '2 / 3',
          alignSelf: 'center'
        }}
      >
        <TileIcon
          sx={{
            color: 'text.secondary'
          }}
        />
      </Box>

      <Typography
        sx={{
          gridColumn: '2 / 3',
          gridRow: '2 / 3'
        }}
        variant="body1"
      >
        {shrink(address)}
      </Typography>

      <Box
        sx={{
          gridColumn: '3 / 4',
          gridRow: '1 / 3',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export const AddressTile1: CFC<{ address?: string; label: string; icon: typeof Wallet }> = ({
  address,
  label,
  icon,
  children
}) => {
  const TileIcon = icon;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: 'auto auto',
        columnGap: 1,
        flex: 1
      }}
    >
      <Typography
        sx={{
          gridColumn: '1 / 3',
          gridRow: '1 / 2'
        }}
        variant="inherit"
        color="white"
        fontSize={20}
      >
        {label}
      </Typography>

      <Box
        sx={{
          gridColumn: '1 / 2',
          gridRow: '2 / 3',
          alignSelf: 'center'
        }}
      >
        <TileIcon
          sx={{
            color: 'text.secondary'
          }}
        />
      </Box>

      <Typography
        sx={{
          gridColumn: '2 / 3',
          gridRow: '2 / 3'
        }}
        variant="body1"
      >
        {shrink(address)}
      </Typography>

      <Box
        sx={{
          gridColumn: '3 / 4',
          gridRow: '1 / 3',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const SmartAccountTile = () => {
  const { smartAccountAddress } = useSmartAccount();

  return (
    <Tile>
      <AddressTile1 icon={SmartToy} label="Smart Account" address={smartAccountAddress}>
        <IconButton size="small" onClick={() => copy(smartAccountAddress)}>
          <ContentCopy
            sx={{
              color: 'primary.main'
            }}
          />
        </IconButton>
      </AddressTile1>
    </Tile>
  );
};

export const AccountPage = () => {
  const { address, isConnected } = useAccount();
  const { smartAccountAddress } = useSmartAccount();

  const isReady = isConnected && address && smartAccountAddress;

  return (
    <div className="">
      <h1 className="text-black pb-3 font-bold text-2xl m-4 ">Account Details</h1>

      <Page>
        <h1 className="text-black text-xl font-bold mb-2">Network</h1>
        <Tile>
          <ListItemAvatar>
            <NetworkAvatar />
          </ListItemAvatar>
          <ListItemText primary={goerli.name} />
        </Tile>

        <h1 className="text-black text-xl font-bold my-2">Accounts</h1>
        <GridList>{isReady && <SmartAccountTile />}</GridList>
        {isReady && (
          <>
            <h1 className="text-black text-xl font-bold my-2">Tokens</h1>
            <GridList>
              {tokens.map(token => (
                <Balance key={token.address ?? '0'} token={token} />
              ))}
            </GridList>
          </>
        )}
      </Page>
    </div>
  );
};
