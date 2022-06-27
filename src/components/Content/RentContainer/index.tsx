import React from 'react';

import RentCard from './RentCart';
import CreateRent from './CreateRent';
import { AppContext, AppContextProps } from '../../Unknown/AppContext';
import RentDetail from './RentDetail';

const RentContainer: React.FC = () => {
  const { isAdd, isDetails, items } = React.useContext(
    AppContext,
  ) as AppContextProps;

  return (
    <>
      {!isAdd && !isDetails && (
        <>
          {items.length > 0 ? (
            <>
              {items.map((obj) => (
                <RentCard key={obj.id} props={obj} />
              ))}
            </>
          ) : (
            <p>У ціх межах немає активних оголошень</p>
          )}
        </>
      )}
      {isDetails && !isAdd && <RentDetail />}
      {!isDetails && isAdd && <CreateRent />}
    </>
  );
};

export default React.memo(RentContainer);
