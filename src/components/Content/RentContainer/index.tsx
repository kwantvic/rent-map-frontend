import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import RentCard from './RentCart';
import CreateRent from './CreateRent';
import { AppContext, AppContextProps } from '../../Unknown/AppContext';
import RentDetail from './RentDetail';
import { pageSize } from '../../../common/constants';
import useStyles from './styles';

const scrollToTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const RentContainer: React.FC = () => {
  const classes = useStyles();
  const {
    isAdd,
    isDetails,
    items,
    total,
    currentPage,
    handleCurrentPage,
    hasMoreItems,
    handleHasMoreItems,
    isLoading,
  } = React.useContext(AppContext) as AppContextProps;

  const residueItems: number = total - pageSize * currentPage + pageSize;

  const loadMore = () => {
    if (total === items.length) {
      handleHasMoreItems(false);
    } else {
      setTimeout(() => {
        handleCurrentPage(currentPage + 1);
      }, 1111);
    }
  };

  return (
    <>
      {isLoading && (
        <Box component="div" display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!isAdd && !isDetails && !isLoading && (
        <>
          {items.length > 0 ? (
            <>
              <InfiniteScroll
                className={classes.infinite}
                next={loadMore}
                hasMore={hasMoreItems}
                loader={
                  <Box
                    key={0}
                    display="flex"
                    justifyContent="center"
                    mt={3}
                    mb={3}
                  >
                    {total >= pageSize && (
                      <CircularProgress color="secondary" />
                    )}
                  </Box>
                }
                dataLength={residueItems <= pageSize ? pageSize : residueItems}
                endMessage={
                  currentPage > 0 && (
                    <Box display="flex" justifyContent="center" mt={3} pb={5}>
                      <Button
                        onClick={scrollToTop}
                        color="secondary"
                        variant="contained"
                      >
                        <ArrowUpwardIcon />
                      </Button>
                    </Box>
                  )
                }
              >
                <>
                  {items.map((obj) => (
                    <RentCard key={obj.id} props={obj} />
                  ))}
                </>
              </InfiniteScroll>
            </>
          ) : (
            <Box display="flex" p={5}>
              <Typography gutterBottom variant="h3" component="span">
                У ціх межах немає активних оголошень 👀
              </Typography>
            </Box>
          )}
        </>
      )}
      {isDetails && !isAdd && !isLoading && <RentDetail />}
      {!isDetails && isAdd && !isLoading && <CreateRent />}
    </>
  );
};

export default React.memo(RentContainer);
