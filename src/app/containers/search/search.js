import React from 'react';
import { connect } from 'react-redux';
import { filters } from 'store';

class HomeSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const error = this.validate(this.state.value);
    if (error) {
      return this.setState({error});
    }

    this.props.add(this.state.value);
    this.props.onSubmit && this.props.onSubmit();

    this.setState({
      error: null,
      value: '',
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  validate(value) {
    if (value.trim().length < 5) {
      return 'Must be at least 5 characters';
    }
  }

  render() {
    return require('./search.rt').call(this);
  }

}

export default connect(null, { add: filters.actions.add })(HomeSearch);
