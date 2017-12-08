class Character {
  constructor(name, hp, dr) {
    this.name = name;
    this.totalHP = hp;
    this.currentHP = hp;
    this.dr = dr;
    this.shareList = [];
  }

  setDR(dr) {
    this.dr = dr;
  }

  addShareTarget(name) {
    this.shareList.push(name);
  }
}
