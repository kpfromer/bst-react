import React, { Component } from 'react';
// import { Bst } from './Bst';
import TreeNode from './TreeNode';
import { BstNode } from './BstNode';

export interface BstTreeProps {
  node: BstNode | null;
  width: number;
}

export default class BstTree extends Component<BstTreeProps, any> {
  public render() {
    const { node } = this.props;
    if (node === null) {
      return null;
    }
    const x = this.props.width / 2;
    return (
      <TreeNode x={x} y={50} totalWidth={this.props.width} node={node} radius={25} />
    );
  }
}