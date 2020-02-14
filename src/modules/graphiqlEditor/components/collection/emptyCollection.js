import React from 'react';

import { Button } from '@material-ui/core';
import ScientistTeam from '../../../../assets/svg/scientistTeam';

const EmptyCollection = () => (
  <div className='collection_div--empty'>
    <ScientistTeam />
    <Button color='primary'>Create a collection</Button>
  </div>
);

export default EmptyCollection;
