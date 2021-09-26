class Balance {
  constructor(balance = undefined) {
    this.balance = balance;
  }

  random() {
    const balance = (this.balance === undefined) ? 1000 : this.balance;
    return new Balance(balance);
  }
}

export default Balance;
