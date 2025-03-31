import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

const ActivityPage = () => {
  const { activityName } = useParams();

  const ActivityComponent = React.lazy(() => import(`./activities/${activityName}`));

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ActivityComponent />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
