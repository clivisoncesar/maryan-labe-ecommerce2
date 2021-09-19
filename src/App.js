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
    name: 'Nave Espacial Blaster Version',
    price: 1000,
    photo: 'https://i.ibb.co/18ZyWFX/img1.png'
  },
  {
    id: 2,
    name: 'Foguete Top das Galáxias',
    price: 18000,
    photo: 'https://i.ibb.co/ryxNYvD/topdasgalaxias.png'
  },
  {
    id: 3,
    name: 'Ônibus Espacial #AdeusTerra',
    price: 3000,
    photo: 'https://i.ibb.co/5LXV1Kn/adeus-terra.png'
  },
  {
    id: 4,
    name: 'Foguete na Planta -Previsão de Entrega: 2025',
    price: 7000,
    photo: 'https://i.ibb.co/zs2m3Vn/naplanta.png'
  },
  {
    id: 5,
    name: 'Foguete Nasa Só Para Baixinhos',
    price: 4000,
    photo: 'https://i.ibb.co/6wp2fyn/sopara.png'
  },
  {
    id: 6,
    name: 'Nave Espacial Missão McFly - Back to 1985',
    price: 10000,
    photo: 'https://i.ibb.co/DkM9nts/mcfly.png'
  }
]

class App extends React.Component {
  state = {
    minFilter: 100,
    maxFilter: 1000,
    nameFilter: 'Produto',
    productsInCart: [
      {
        id: 6,
        name: 'Nave Espacial Missão McFly - Back to 1985',
        price: 10000,
        photo: 'https://i.ibb.co/DkM9nts/mcfly.png',
        quantity: 1
      },
      {
        id: 3,
        name: 'Ônibus Espacial #AdeusTerra',
        price: 3000,
        photo: 'https://i.ibb.co/5LXV1Kn/adeus-terra.png',
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
