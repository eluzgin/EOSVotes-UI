import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import { loadScatter, getIdentity } from 'store/scatter/actions';
import { selectClient, selectIdentity, selectAccount,selectStatus } from 'store/scatter/selectors';

class FAQ extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ScatterJS.scatter.connect('EOSVotes.io').then(connected => {
      if(connected){
          this.props.loadScatter(ScatterJS.scatter);
          window.scatter = null;
      }
    });
  }

  render() {
    return require('./faq.rt').call(this);
  }
}

const mapStateToProps = createStructuredSelector({
  client: selectClient(),
  identity: selectIdentity(),
  account: selectAccount(),
  status: selectStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadScatter: (scatter) => dispatch(loadScatter(scatter)),
    getIdentity: () => dispatch(getIdentity()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FAQ);
