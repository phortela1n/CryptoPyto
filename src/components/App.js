import React, { Component } from 'react';
import cryptoApi from '../API-Cli/cryptoApi.js';
import C3Chart from 'react-c3js';
import RowComponent from './RowComponent/RowComponent'
import Loader from './Loader/Loader'
import IconsRow from './IconRow/IconsRow'
import { CSSTransitionGroup } from 'react-transition-group'
import * as Scroll from 'react-scroll';

class App extends Component {
  constructor() {
    super()
    this.state = {
      dataCoins: [],
      coinsShow: [],
      lengthCoin: 2
    }
  }

  componentDidMount = () => cryptoApi.getCoins()
    .then(res => this.setState({ dataCoins: res }))
    .then(res => this.setState({
      coinsShow: this.state.dataCoins.filter((coin, index) => index <= this.state.lengthCoin)
    }))

  addingRowIcon = () => {
    Scroll.animateScroll.scrollToBottom();

    this.setState(prevState => {
      return {
        lengthCoin: prevState.lengthCoin + 3,
        coinsShow: this.state.dataCoins.filter((coin, index) => index <= prevState.lengthCoin + 3)
      }
    })
  }

  render() {
    return (
      <div>
        <section className='app-content'>
          <table>
            <tbody>

              <tr className='trHeader d-none d-sm-block'>
                <th>COINS</th>
                <th>PRICE</th>
                <th>7D CHART (USD)</th>
                <th>CHG. 24H</th>
              </tr>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {this.state.coinsShow.length < 1 ? <Loader /> : this.state.coinsShow.map(coin => <RowComponent dataCoin={coin} />)}
              </CSSTransitionGroup>
            </tbody>
          </table>
        </section>
        <div class='template-rowIcon'>
          <IconsRow onAddingMoreCoins={this.addingRowIcon} />
        </div>
      </div>
    );
  }
}

export default App;