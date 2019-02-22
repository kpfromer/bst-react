import React, { Component, Fragment } from 'react';
import { Circle, Line, Text } from 'react-konva';
import { BstNode } from './BstNode';

export interface TreeNodeProps {
  node: BstNode;
  x: number;
  y: number;
  radius: number;
  totalWidth: number;
}

export default class TreeNode extends Component<TreeNodeProps, any> {
  public render() {
    const { node, x, y, radius, totalWidth } = this.props;
    const color = "blue";

    const pad = radius * 1/node.height();

    const leftX = !!node.left ? x - totalWidth / 4 - radius : 0;
    const rightX = !!node.right ? x + totalWidth / 4 - radius : 0;
    const levelY = y + pad + radius;

    const left = node.left !== null ?
      <Fragment>
        <Line points={[ x, y, leftX, levelY ]} stroke={color} strokeWidth={5} />
        <TreeNode node={node.left} x={leftX} y={levelY} radius={radius} totalWidth={totalWidth/2} />
      </Fragment>
      :
      null;
    const right = node.right !== null ? 
      <Fragment>
        <Line points={[ x, y, rightX, levelY ]} stroke={color} strokeWidth={5} />
        <TreeNode node={node.right} x={rightX} y={levelY} radius={radius} totalWidth={totalWidth/2} />
      </Fragment>
      :
      null;

    return (
      <Fragment>
        <Circle
          x={x}
          y={y}
          radius={radius}
          fill={color}
        />
        <Text 
          x={x - radius / 2}
          y={y - radius / 2}
          width={radius}
          height={radius}
          align="center"
          text={node.value.toString(10)}
        />
        {left}
        {right}
      </Fragment>
    );
  }
}