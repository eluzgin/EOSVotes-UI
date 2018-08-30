import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import { loadScatter, getIdentity } from 'store/scatter/actions';
import { selectClient, selectIdentity } from 'store/scatter/selectors';

class Home extends React.Component {

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
    console.log(this.props);
    return require('./home.rt').call(this);
  }

}

// const mapStateToProps = createStructuredSelector({
//   client: selectClient(),
//   identity: selectIdentity(),
// });
//
// function mapDispatchToProps(dispatch) {
//   return {
//     loadScatter: (scatter) => dispatch(loadScatter(scatter)),
//     getIdentity: () => dispatch(getIdentity()),
//   };
// }

export default connect(
  // mapStateToProps,
  // mapDispatchToProps

  state => ({
    client: state.scatter.client,
    identity: state.scatter.identity,
  }),

  {
    loadScatter: (scatter) => loadScatter(scatter),
    getIdentity: () => getIdentity(),
  }
)(Home);
