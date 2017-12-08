class Character {
  constructor(name, hp, dr) {
    this.name = name;
    this.totalHP = hp;
    this.currentHP = hp;
    this.THP = 0;
    this.dr = dr;
    this.shareList = [];
  }

  setDR(dr) {
    this.dr = dr;
  }

  addShareTarget(name) {
    list = Array.from(arguments);
    for (name of list) {
      this.shareList.push(name);
    }
  }

  setTHP(amount) {
    if (amount > this.THP) {
      this.THP = amount;
    }
  }

  heal(amount) {
    if (amount > this.totalHP - this.currentHP) {
      this.currentHP = this.totalHP;
    } else {
      this.currentHP += amount;
    }
  }
}
