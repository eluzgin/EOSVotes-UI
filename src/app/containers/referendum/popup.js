import React from 'react';
import { connect } from 'react-redux';
import { ReferendumPopup } from 'components/referendum/popup';
import { vote } from 'store';

export default connect(

  state => Object.assign({ on: state.vote }, state.referendums.byId[state.vote] || {} ),

  {
    hide: vote.actions.hide,
    vote: vote.actions.vote,
    unvote: vote.actions.unvote,
  }

)(ReferendumPopup);
