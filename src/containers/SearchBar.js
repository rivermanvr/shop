import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchCategories, fetchProductsForCat } from '../actions';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { term: '', selectCategory: '0' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({ term: '', selectCategory: '0' })
  }

  componentDidMount() {
    if (!this.props.router) {
      this.clearState();
      this.props.fetchCategories();
  }

  handleSubmit(event) {
    event.preventDefault();
      console.log('hitting submit')
      this.clearState();
  }

  handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'term':
        this.setState({ term: value });
        break;
      case 'selectCategory':
        this.setState({ selectCategory: value })
        break;
    }
  }

  render() {
    console.log('***SearchBar component:......', this.props)
    const state = this.props.state;
    const categories = state.shop.categories;
    if (!categories.length) return <div></div>;
    //Develop category select control
    const _categories = [{ id: 0, name: 'All Categories' }].concat(categories);
    const selectCat = _categories.map(category => {
      return <option key={ category.id } value={ category.id }>{ category.name }</option>
    })
    //-------------------------------
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backBronzw nomarginBot">
            <h3 className="col-sm-3 textBlk margintop marginbelowsm"><Link to={ `/` }>Grace Shopper</Link></h3>
            <div className="col-sm-9 search-bar margintop marginbelowsm">
              <form onSubmit={ this.handleSubmit }>
                <select
                  onChange={ this.handleInput }
                  value={ this.state.selectCategory }
                  className="backTan"
                  name="selectCategory"
                  type="text">
                  { selectCat }
                </select>
                <input
                  value ={ this.state.term }
                  onChange={ this.handleInput }
                  className="colWidth55"
                  name="term" />
                <button className="backTan" type="submit">
                <span className="glyphicon glyphicon-search backTan" aria-hidden="true" />
                </button>
              </form>
            </div>
            <div className="col-md-6 col-md-offset-5 search-bar marginbelowsm">
              <Link to={ `/admin` }><button className="backTan">Admin Portal</button></Link>
              <Link to={ `/signin` }><button className="moverightsm backTan">sign-in</button></Link>
              <Link to={ `/account` }><button className="moverightsm backTan">Account</button></Link>
              <Link to={ `/orders` }><button className="moverightsm backTan">Orders</button></Link>
              <Link to={ `/cart` }><button className="moverightsm backTan margintopsm">Cart (0)</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, { router }) {
  return { state, router };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchCategories, fetchProductsForCat }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
