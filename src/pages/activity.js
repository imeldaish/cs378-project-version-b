import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

// Dynamically import the activity page based on the activityName
const ActivityPage = () => {
  const { activityName } = useParams();

  // Dynamically import the activity page component based on the activityName
  const ActivityComponent = React.lazy(() => import(`./activities/${activityName}`));

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Render the dynamically imported component */}
        <ActivityComponent />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
