export class BstNode {
  public left: BstNode | null;
  public right: BstNode | null;

  constructor(public value: number) {
    this.left = null;
    this.right = null;
  }
  
  copy(): BstNode {
    const copy = new BstNode(this.value);
    copy.left = !this.left ? null : this.left.copy();
    copy.right = !this.right ? null : this.right.copy();
    return copy;
  }

  public addNode(val: number): BstNode {
    let root = this.copy();
    let currNode = root;
    let finished = false;
    do {
      const { left, right, value: currVal } = currNode;

      if (val > currVal) {
        if (right === null) {
          currNode.right = new BstNode(val);
          finished = true;
        } else {
          currNode = right;
        }
      } else if (val < currVal) {
        if (left === null) {
          currNode.left = new BstNode(val);
          finished = true;
        } else {
          currNode = left;
        }
      } else {
        finished = true;
      }
    } while (!finished);
    
    return root;
  }

  public findNode(value: number): BstNode | null {
    if (value == this.value) return this;
    else if (value > this.value) return this.right == null ? null : this.right.findNode(value);
    else return this.left == null ? null : this.left.findNode(value);
  }

  public findRoute(value: number): ('left' | 'right')[] | false {
    let result, step: 'left' | 'right';
    if (value == this.value) {
      return [];
    } else if (value > this.value) {
      if (!this.right) return false;
      result = this.right.findRoute(value);
      step = 'right';
    } else {
      if (!this.left) return false;
      result = this.left.findRoute(value);
      step = 'left';
    }
    if (!result) return false;
    return [step, ...result as ('left' | 'right')[]];
  }

  public find(val: number): boolean {
    return this.findNode(val) !== null;
  }

  // public remove(): void {
  //   let dir: 'left' | 'right' = 'left';
  //   let node: BstNode = this;
  //   const { left, right, parent } = this;
  //   if (left !== null) {
  //     dir = 'left';
  //     node = left;
  //   } else if (right !== null) {
  //     dir = 'right';
  //     node = right;
  //   } else {
  //     if (parent) {
  //       if (parent.left !== null && parent.left.value === this.value) {
  //         parent.left = null;
  //       } else {
  //         parent.right = null;
  //       }
  //     }
  //   }

  //   while (true) {
  //     if (dir === 'left') {
  //       if (node.right === null) break;
  //       node = node.right;
  //     } else {
  //       if (node.left === null) break;
  //       node = node.left;
  //     }
  //   }

  //   this.value = node.value;
  //   console.log({node});
  //   if (dir === 'left') {
  //     (node.parent as BstNode).left = node.left;
  //   } else {
  //     (node.parent as BstNode).right = node.right;
  //   }
  // }

  public getCount(): number {
    const leftCount = this.left === null ? 0 : this.left.getCount();
    const rightCount = this.right === null ? 0 : this.right.getCount();
    return 1 + leftCount + rightCount;
  }

  public height(): number {
    const leftHeight = !this.left ? 0 : this.left.height();
    const rightHeight = !this.right ? 0 : this.right.height();
    return 1 + Math.max(leftHeight, rightHeight);
  }

  public removeIndex(i: number): this | null {
    if (this.value === i) { // Return null; this must be head node
      return null;
    } else if (!this.find(i)) { // If no index found don't continue
      return this;
    }
    let dir: 'left' | 'right' = 'left';
    let parent: BstNode = this;
    let node: BstNode = this;

    while (true) {
      if (i < node.value) {
        if (!node.left) throw new Error('Value not found! (even though we checked)');
        parent = node;
        node = node.left;
      } else if (i > node.value) {
        if (!node.right) throw new Error('Value not found! (even though we checked)');
        parent = node;
        node = node.right;
      } else {
        break;
      }
    }
    console.log({ parent, node });

    const { left, right } = this;
    if (left !== null) {
      dir = 'left';
      node = left;
    } else if (right !== null) {
      dir = 'right';
      node = right;
    } else {
      return null;
      // if (parent) {
      //   if (parent.left !== null && parent.left.value === this.value) {
      //     parent.left = null;
      //   } else {
      //     parent.right = null;
      //   }
      // }
    }

    while (true) {
      if (dir === 'left') {
        if (node.right === null) break;
        parent = node;
        node = node.right;
      } else {
        if (node.left === null) break;
        parent = node;
        node = node.left;
      }
    }

    // this.value = node.value;
    console.log({ parent, node });
    if (dir === 'left') {
      // if (node)
      // node.value = node.right.value;
      // parent.right = node.right;
      // (node.parent as BstNode).left = node.left;
    } else {
      // parent.right = node.left;
      // (node.parent as BstNode).right = node.right;
    }
    return this;
    // const node = this.findNode(i);
    // if (node === null) return;
    // node.remove();
  }

  public inOrder(list: number[] = []): number[] {
    if (this.left !== null) this.left.inOrder(list);
    list.push(this.value);
    if (this.right !== null) this.right.inOrder(list);
    return list;
  }
  
  public preOrder(list: number[] = []): number[] {
    list.push(this.value);
    if (this.left !== null) this.left.preOrder(list);
    if (this.right !== null) this.right.preOrder(list);
    return list;
  }

  public postOrder(list: number[] = []): number[] {
    if (this.left !== null) this.left.postOrder(list);
    if (this.right !== null) this.right.postOrder(list);
    list.push(this.value);
    return list;
  }

  public levelOrder(): number[] {
    const levelQueue: BstNode[] = [];
    const list: number[] = [];
    levelQueue.push(this);
    while (levelQueue.length !== 0) {
      const current = levelQueue.shift() as BstNode;
      if (current.left !== null) levelQueue.push(current.left);
      if (current.right !== null) levelQueue.push(current.right);
      list.push(current.value);
    }
    return list;
  }

  public static arrayToBstNode(arr: number[], start: number = 0, end: number = arr.length - 1) {
    if (start === end) {
      return new BstNode(arr[start]);
    } else if (end - start == 1) {
      const child = new BstNode(arr[start]);
      child.right = new BstNode(arr[end]);
      return child;
    }
    const mid = Math.floor((start + end) / 2); // Math.floor needed since this is javascript
    const n = new BstNode(arr[mid]);
    n.left = BstNode.arrayToBstNode(arr, start, mid - 1);
    n.right = BstNode.arrayToBstNode(arr, mid + 1, end);
    return n;
  }

  public min(): number {
    let node: BstNode = this;
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  public max(): number {
    let node: BstNode = this;
    while (node.right !== null) {
      node = node.right;
    }
    return node.value;
  }

  public range(start: number, end: number): number[] {
    const inOrder = this.inOrder([]);
    return inOrder.filter(val => val >= start && val <= end);
  }

  public rebalance(): BstNode {
    return BstNode.arrayToBstNode(this.inOrder([]).sort((a, b) => a - b));
  }

  public isBalanced(): boolean {
    const leftSize = !this.left ? 0 : this.left.height();
    const rightSize = !this.right ? 0 : this.right.height();
    if (
      Math.abs(leftSize - rightSize) > 1 ||
      !!this.left && !this.left.isBalanced() ||
      !!this.right && !this.right.isBalanced()
    ) {
      return false;
    }
    return true;
  }

}