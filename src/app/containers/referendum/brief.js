import React from 'react';
import { connect } from 'react-redux';
import { ReferendumBrief } from 'components/referendum/brief';
import { vote } from 'store';

export default connect(null, { vote: vote.actions.show })( ReferendumBrief );
