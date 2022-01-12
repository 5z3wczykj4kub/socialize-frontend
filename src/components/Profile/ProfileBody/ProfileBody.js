import { useMemo } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import Tabs from '../../Tabs/Tabs';
import classes from './ProfileBody.module.scss';
import ProfileFriendsList from './ProfileFriendsList/ProfileFriendsList';
import ProfilePostsList from './ProfilePostsList/ProfilePostsList';

const ProfileBody = (props) => {
  const { url } = useRouteMatch();

  const labels = useMemo(
    () => [
      { label: 'Posts', to: url },
      { label: 'Friends', to: `${url}/friends` },
      { label: 'About', to: `${url}/about` },
    ],
    [url]
  );

  return (
    <div className={classes.profileBody}>
      <Tabs labels={labels}>
        <Route path={url} exact>
          <ProfilePostsList profile={props.profile} />
        </Route>
        <Route path={`${url}/friends`} exact>
          <ProfileFriendsList profileId={props.profile.id} />
        </Route>
        <Route path={`${url}/about`} exact>
          <p style={{ padding: '16px 0' }}>About</p>
        </Route>
      </Tabs>
    </div>
  );
};

export default ProfileBody;
