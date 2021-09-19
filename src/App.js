import React from 'react';
import { Filters } from './components/Filters/Filters';
import { Products } from './components/Products/Products';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 16px;
  gap: 8px;
`;

const products = [
  {
    id: 1,
    name: 'Produto Espacial 1',
    price: 3000,
    photo: "https://i.ibb.co/87x58pV/adeus-terra.jpg"
  },
  {
    id: 2,
    name: 'Produto Espacial 2',
    price: 1000,
    photo: "https://i.ibb.co/rbPdqHn/img1.jpg"
  },
  {
    id: 3,
    name: 'Produto Espacial 3',
    price: 18000,
    photo: "https://i.ibb.co/wzkt7LL/topdasgalaxias.jpg"
  },
  {
    id: 4,
    name: 'Produto Espacial 4',
    price: 7000,
    photo: "https://i.ibb.co/ypDL4rk/mcfly.jpg"
  },
  {
    id: 5,
    name: 'Produto Espacial 5',
    price: 4000,
    photo: "https://i.ibb.co/pnQDTwz/naplanta.jpg"
  },
  {
    id: 6,
    name: 'Produto Espacial 6',
    price: 10000,
    photo: "https://i.ibb.co/QmrpF3P/sopara.jpg"
  }
]

class App extends React.Component {
  state = {
    minFilter: 100,
    maxFilter: 1000,
    nameFilter: 'Produto',
    productsInCart: [
      {
        id: 4,
        name: 'Produto Espacial 4',
        price: 7000,
        photo: "https://i.ibb.co/ypDL4rk/mcfly.jpg",
        quantity: 1
      },
      {
        id: 3,
        name: 'Produto Espacial 3',
        price: 18000,
        photo: "https://i.ibb.co/wzkt7LL/topdasgalaxias.jpg",
        quantity: 2
      }
    ]
  }

  onChangeMinFilter = (event) => {
    this.setState({minFilter: event.target.value})
  }

  onChangeMaxFilter = (event) => {
    this.setState({maxFilter: event.target.value})
  }

  onChangeNameFilter = (event) => {
    this.setState({nameFilter: event.target.value})
  }

  onAddProductToCart = (productId) => {
    const productInCart = this.state.productsInCart.find(product => productId === product.id)

    if(productInCart) {
      const newProductsInCart = this.state.productsInCart.map(product => {
        if(productId === product.id) {
          return {
            ...product,
            quantity: product.quantity + 1
          }
        }

        return product
      })

      this.setState({productsInCart: newProductsInCart})
    } else {
      const productToAdd = products.find(product => productId === product.id)

      const newProductsInCart = [...this.state.productsInCart, {...productToAdd, quantity: 1}]

      this.setState({productsInCart: newProductsInCart})
    }
  }

  onRemoveProductFromCart = (productId) => {
    const newProductsInCart = this.state.productsInCart.map((product) => {
      if(product.id === productId) {
        return {
          ...product,
          quantity: product.quantity - 1
        }
      }
      return product
    }).filter((product) => product.quantity > 0)

    this.setState({productsInCart: newProductsInCart})
  }

  render() {
    return (
      <AppContainer>
        <Filters
          minFilter={this.state.minFilter}
          maxFilter={this.state.maxFilter}
          nameFilter={this.state.nameFilter}
          onChangeMinFilter={this.onChangeMinFilter}            
          onChangeMaxFilter={this.onChangeMaxFilter}            
          onChangeNameFilter={this.onChangeNameFilter}                  
        />
        <Products 
          products={products}
          minFilter={this.state.minFilter}
          maxFilter={this.state.maxFilter}
          nameFilter={this.state.nameFilter}
          onAddProductToCart={this.onAddProductToCart}
        />
        <ShoppingCart
          productsInCart={this.state.productsInCart}
          onRemoveProductFromCart={this.onRemoveProductFromCart}
        />
      </AppContainer>
    );
  }
}

export default App;
