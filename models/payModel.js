class Pay {
  constructor(itemId = undefined) {
    this.itemId = itemId;
  }

  random() {
    const itemId = (this.itemId === undefined) ? 1 : this.itemId;
    return new Pay(itemId);
  }
}

export default Pay;
