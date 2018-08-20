import React from 'react';
import { api } from 'helpers';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      page: 0,
      referendums: [],
    };
  }

  componentDidMount() {
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

