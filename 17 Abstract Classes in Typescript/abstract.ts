abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;

  // abstract accessors
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return 'Hadoken';
  }

  get name(): string {
    return 'Ryu';
  }
}

const ryu = new Ryu();
console.log(ryu.getSpecialAttack());
ryu.fight();

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return 'Lightning Kick';
  }

  get name(): string {
    return 'Chun-Li';
  }
}

const chunLi = new ChunLi();
chunLi.fight();
