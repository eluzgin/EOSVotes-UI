import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import { api } from 'helpers';
import { loadScatter, getIdentity } from 'store/scatter/actions';
import { selectClient, selectIdentity } from 'store/scatter/selectors';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      page: 0,
      referendums: [],
    };
  }

  componentDidMount() {
    ScatterJS.scatter.connect('EOSVotes.io').then(connected => {
      if(connected){
          this.props.loadScatter(ScatterJS.scatter);
          window.scatter = null;
      }
    });
    this.fetch();
  }

  fetch() {
    this.setState({ fetching: true });

    api.get(`/referendums-${this.state.page++}.json`)
       .then(res => res.json())
       .then(res => {

        this.setState({
          fetching: false,
          more: res.more,
          referendums: this.state.referendums.concat(res.referendums),
        });

    });
  }

  render() {
    return require('./home.rt').call(this);
  }

}

const mapStateToProps = createStructuredSelector({
  client: selectClient(),
  identity: selectIdentity(),
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
)(Home);
