import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { Bst } from './Bst';
import BstTree from './BstTree';
import { BstNode } from './BstNode';

const fs = (window as any).require('fs');
const electron = (window as any).require('electron').remote;

class App extends Component {
  state = {
    head: new BstNode(50),
    addNode: '',
    removeNode: '',
    minRange: '',
    maxRange: '',
    find: ''
  }

  change = (name: string) => (event: any) => this.setState({ [name]: event.target.value });
  handleSubmit = (func: () => any) => (event: any) => {
    event.preventDefault();
    func();
  }

  setHead = (func: (root: Bst) => Bst) => () => {
    // const newHead = func(this.state.head);
    console.log('get head')
    console.log(this.state.head)
    // this.setState({ head: newHead });
  }

  addNode = (event: any) => {
    event.preventDefault();
    console.log(this.state.head.addNode(parseFloat(this.state.addNode)))
    this.setState({
      head: this.state.head.addNode(parseFloat(this.state.addNode))
    });
  }
  removeNode = (event: any) => {
    event.preventDefault();
    console.log('REMOVE NODE')
    console.log(this.state.head)
    this.setState((prevState: any) => ({
      head: prevState.head.removeIndex(parseFloat(this.state.removeNode))
    }));
  }
  rebalance = () => {
    console.log('Rebalance')
    console.log(this.state.head.rebalance())
    this.setState({
      head: this.state.head.rebalance()
    })
  }
  
  upload = async () => {
    const files: string[] = await new Promise(resolve => electron.dialog.showOpenDialog({ properties: ['openFile'] }, resolve));
    const file = files[0];
    const data = await new Promise((resolve, reject) => fs.readFile(file, (error: any, data: any) => !error ? resolve(data) : reject(error)))
    const parsedList = data.toString().split(' ').map(intString => parseFloat(intString)).sort((a, b) => a - b);
    console.log(parsedList)
    this.setState({
      head: BstNode.arrayToBstNode(parsedList)
    })
  }

  render() {
    const { minRange, maxRange } = this.state;
    let range: null | JSX.Element = null;
    if (!isNaN(Number(minRange)) && !isNaN(Number(maxRange))) {
      const values = this.state.head.range(Number(minRange), Number(maxRange));
      range = <h1>Range Values: [{values.sort((a, b) => a - b).join(', ')}]</h1>
    }
    let route = 'Item not found';
    const routeResult = this.state.head.findRoute(parseFloat(this.state.find));
    if (!!routeResult) {
      route = `Route: ${routeResult.join(' -> ')}`
    }
    return (
      <div>
        <form onSubmit={this.addNode}>
          <label>Add Node</label>
          <input type="text" value={this.state.addNode} onChange={this.change('addNode')} />
        </form>
        <form onSubmit={this.removeNode}>
          <label>Remove Node</label>
          <input type="text" value={this.state.removeNode} onChange={this.change('removeNode')} />
        </form>

        <div>
          <label>Min</label>
          <input type="text" value={this.state.minRange} onChange={this.change('minRange')} />
          <label>Max</label>
          <input type="text" value={this.state.maxRange} onChange={this.change('maxRange')} />
        </div>

        <div>
          <label>Find</label>
          <input type="text" value={this.state.find} onChange={this.change('find')} />
        </div>

        <button onClick={this.upload}>Upload File</button>
        
        {range}
        {route}

        <h1>Traversals</h1>
        <h1>In Order: [{this.state.head.inOrder().join(', ')}]</h1>
        <h1>Pre Order: [{this.state.head.preOrder().join(', ')}]</h1>
        <h1>Post Order: [{this.state.head.postOrder().join(', ')}]</h1>

        <h1>Height: {this.state.head.height()}</h1>
        <h1>Count: {this.state.head.getCount()}</h1>
        <h1>Min: {this.state.head.min()}</h1>
        <h1>Max: {this.state.head.max()}</h1>
        <h1>Is Balanced: {this.state.head.isBalanced() ? 'true' : 'false'}</h1>
        {
          !this.state.head.isBalanced() &&
          <button onClick={this.rebalance}>Re-Balance</button>
        }

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer draggable>
            <BstTree node={this.state.head} width={window.innerWidth} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
