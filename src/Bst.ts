import { BstNode } from './BstNode';

export class Bst {
  // public rootNode: null | BstNode
  // constructor(value?: number) {
  //   if (!value) {
  //     this.rootNode = null;
  //   } else {
  //     this.rootNode = new BstNode(value);
  //   }
  // }

  // public addNode(val: number): this {
  //   console.log('ADD');
  //   console.log(this.rootNode);
  //   if (this.rootNode === null) {
  //     this.rootNode = new BstNode(val);
  //     return this;
  //   }
  //   let currNode = this.rootNode;
  //   let finished = false;
  //   do {
  //     const { left, right, value: currVal } = currNode;

  //     if (val > currVal) {
  //       if (right === null) {
  //         currNode.right = new BstNode(val, currNode);
  //         finished = true;
  //       } else {
  //         currNode = right;
  //       }
  //     } else if (val < currVal) {
  //       if (left === null) {
  //         currNode.left = new BstNode(val, currNode);
  //         finished = true;
  //       } else {
  //         currNode = left;
  //       }
  //     } else {
  //       finished = true;
  //     }
  //   } while (!finished);
    
  //   return this;
  // }

  // public find(i: number): boolean {
  //   return !this.rootNode || (!!this.rootNode && this.rootNode.find(i));
  // }

  // public removeIndex(i: number): this {
  //   console.log('REMOVE');
  //   console.log(this.rootNode);
  //   if (!!this.rootNode) {
  //     const result = this.rootNode.removeIndex(i);
  //     if (!result) this.rootNode = null;
  //   }
  //   return this;
  // }

  // public getCount(): number {
  //   if (!this.rootNode) return 0;
  //   return this.rootNode.getCount();
  // }

  // public inOrder(): number[] {
  //   if (!this.rootNode) return [];
  //   return this.rootNode.inOrder([]);
  // }

  // public preOrder(): number[] {
  //   if (!this.rootNode) return [];
  //   return this.rootNode.preOrder([]);
  // }

  // public postOrder(): number[] {
  //   if (!this.rootNode) return [];
  //   return this.rootNode.postOrder([]);
  // }

  // public height(): number {
  //   return !this.rootNode ? 0 : this.rootNode.height();
  // }

  // public min(): number | null {
  //   return !this.rootNode ? null : this.rootNode.min();
  // }

  // public max(): number | null {
  //   return !this.rootNode ? null : this.rootNode.max();
  // }

  // public rebalance(): this {
  //   console.log('REBALANCE');
  //   console.log(this.ro);
  //   if (!!this.rootNode) {
  //     this.rootNode = this.rootNode.rebalance();
  //   }
  //   return this;
  // }

  // public isBalanced(): boolean {
  //   return !this.rootNode ? true : this.rootNode.isBalanced();
  // }

  // public range(min: number, max: number): number[] {
  //   return !this.rootNode ? [] : this.rootNode.range(min, max);
  // }
}