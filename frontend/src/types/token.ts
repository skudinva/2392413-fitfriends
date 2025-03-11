class Token {
  constructor(private name: string) {}

  get() {
    const token = localStorage.getItem(this.name);

    return token ?? '';
  }

  save(token: string) {
    localStorage.setItem(this.name, token);
  }

  drop() {
    localStorage.removeItem(this.name);
  }
}

export default Token;
