import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  render() {
    console.log('..........  ProductList component:  ..........', this.props)
    const category = this.props.state.shop.selectedCategory;
    const products = this.props.state.shop.searchProducts;
    if (!category.name) return <div></div>;
    const renderContainer = products.map(product => {
        return (<Link to={ `/product/${ product.id }` } key={ product.id }><div
          className="col-sm-12">
          <h5>{ product.name }</h5></div></Link>)
      })
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backTan">
            <div className="col-sm-12 marginbelow">
              <h6>search result - category: { category.name }</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderContainer }
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

export default connect(mapStateToProps)(ProductList);
