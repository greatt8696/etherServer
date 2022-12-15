class unit {
  data = {
    status: {
      atk: 10,
      def: 10,
      spd: 10,
      hp: 100,
    },
    equipment: [
      {
        name: "무기뀨1",
        atk: 5,
        set: "용사뀨",
      },
      {
        name: "투구뀨1",
        hp: 50,
        def: 5,
        set: "용사뀨",
      },
      {
        name: "장갑뀨1",
        atk: 5,
        def: 5,
        set: "용사뀨",
      },
      {
        name: "신발뀨1",
        spd: 2,
        def: 5,
        set: "용사뀨",
      },
      {
        name: "갑옷뀨1",
        hp: 50,
        def: 50,
        set: "용사뀨",
      },
      {
        name: "목걸이뀨1",
        atk: 50,
        spd: 3,
        set: "용사뀨",
      },
    ],
    position: {
      team: "red",
      position: 1,
      frame: 0,
    },
    condition: {
      stamina: 0,
      attackAble: true,
      MultiAttack: true,
      alive: true,
      stun: false,
      slow: false,
      burn: false,
      addict: false,
      frozenBite: false,
    },
  };
  constructor({ status, equipment, position }) {
    this.data.initStatus = { ...status };
    this.data.status = { ...status };
    this.data.equipment = [...equipment];
    this.data.position = { ...position };
    this.setId();
    const newStatus = this.setStatusWithEquip(
      this.getStatus(),
      this.getEquip()
    );
    this.update({ status: newStatus });
    this.initFrame();
    this.initStamina();
  }

  checkAlive = () => {
    return this.data.status.hp > 0;
  };

  checkCondition = () => {};

  setStatusWithEquip = (status, equipments) => {
    const statusLabels = Object.keys(status); // atk, def, spd, hp
    const newStatus = { ...status };
    statusLabels.forEach((label) => {
      const sumEquipmentLabel = equipments.map((equipments) =>
        equipments[label] >= 0 ? equipments[label] : 0
      );
      newStatus[label] += sumEquipmentLabel.reduce(
        (prev, curr) => prev + curr,
        0
      );
    });
    return { ...newStatus };
  };
  initFrame = () => {
    const position = this.getPosition();
    this.update({ position: { ...position, frame: 0 } });
  };
  initStamina = () => {
    const status = this.getStatus();
    const condition = this.getCondition();
    this.update({ condition: { ...condition, stamina: status.spd * 10 } });
  };
  update = (updateUnit) => {
    const newUnit = { ...this.data };
    const unitLabels = Object.keys(updateUnit);
    unitLabels.forEach((label) => {
      newUnit[label] = updateUnit[label];
    });
    this.data = newUnit;
  };
  addFrame = () => {
    this.data.position.frame += 1;
  };
  getTeam = () => {
    return this.data.position.team;
  };
  getUnit = () => {
    return { ...this.data };
  };
  getStatus = () => {
    return { ...this.data.status };
  };
  getEquip = () => {
    return [...this.data.equipment];
  };
  getPosition = () => {
    return { ...this.data.position };
  };
  getCondition = () => {
    return { ...this.data.condition };
  };
  isAlive = () => this.data.status.hp > 0;
  getStamina = () => this.data.condition.stamina;
  setStamina = (stamina) => {
    this.data.condition.stamina = stamina;
  };
  chargeStamina = () => {
    this.data.condition.stamina += this.data.status.spd;
  };

  setId = () => {
    this.id = parseInt(Math.random() * 999).toString();
  };
  getId = () => this.id;

  beAttacked = (calcedDamage) => {
    const hp = this.data.status.hp;
    const decreasedHp = calcedDamage > hp ? 0 : hp - calcedDamage;
    this.data.status.hp = decreasedHp;
    if (decreasedHp === 0) this.data.condition.alive = false;
  };
}

const EQUIP = [
  {
    name: "무기뀨1",
    atk: 5,
    set: "용사뀨",
  },
  {
    name: "투구뀨1",
    hp: 50,
    def: 5,
    set: "용사뀨",
  },
  {
    name: "장갑뀨1",
    atk: 5,
    def: 5,
    set: "용사뀨",
  },
  {
    name: "신발뀨1",
    spd: 2,
    def: 5,
    set: "용사뀨",
  },
  {
    name: "갑옷뀨1",
    hp: 50,
    def: 50,
    set: "용사뀨",
  },
  {
    name: "목걸이뀨1",
    atk: 50,
    spd: 3,
    set: "용사뀨",
  },
];
const POSITION = [
  {
    team: "red",
    position: 1,
  },
  {
    team: "blue",
    position: 1,
  },
  {
    team: "blue",
    position: 2,
  },
];
const STATUS = {
  atk: 10,
  def: 10,
  spd: 10,
  hp: 100,
};
const aaa = new unit({
  equipment: EQUIP,
  position: POSITION[0],
  status: STATUS,
});
const bbb = new unit({
  equipment: EQUIP.splice(3, 1),
  position: POSITION[1],
  status: STATUS,
});
const ccc = new unit({
  equipment: EQUIP.splice(3, 1),
  position: POSITION[2],
  status: STATUS,
});

class Battle {
  frame = 0;
  allUnits = [];
  team = {};

  constructor(units) {
    const seperatedTeam = this.seperateTeam(units);
    this.setTeam(seperatedTeam);
    this.setAllUnits(units);
  }
  checkTeamAlive = (units) => {
    const team = units[0].getTeam();
    const teamsAlive = units
      .map((unit) => unit.checkAlive())
      .every((unitAlive) => unitAlive);
    return { team, teamsAlive };
  };
  setTeam = (team) => {
    this.team = team;
  };
  setAllUnits = (units) => {
    this.allUnits = units;
  };

  updateStatus = (status) => {
    this.status = { ...status };
  };
  addStamina = () => {
    this.status.stamina += this.status.spd;
  };
  nextFrame = () => {
    this.frame += 1;
    this.addStamina();
  };
  compareStamina = (me, you) => {
    return me.status.stamina >= you.status.stamina ? [me, you] : [you, me];
  };
  nextFrame = () => {
    this.frame += 1;
  };
  seperateTeam = (units) => {
    const red = [];
    const blue = [];
    units.forEach((unit) => {
      const { position } = unit.data;
      position.team === "red" ? red.push(unit) : blue.push(unit);
    });
    return { red, blue };
  };
  getTeam = () => {
    return this.team;
  };
  getAllUnits = () => {
    return this.allUnits;
  };

  attack = (red, blue) => {
    const redStatus = red.getStatus();
    const blueStatus = blue.getStatus();
    const defenceRatio = 1 / (1 + blueStatus.def);

    const damage = redStatus.atk * defenceRatio;
    const decreaceDamage = (damage / (redStatus.atk - damage)) * 100;
    const normalizedDamage =
      decreaceDamage === 0 ? 1 : Math.round(decreaceDamage);

    blue.beAttacked(normalizedDamage);
    red.setStamina(0);

    console.log(
      `${red.getPosition().team}이 ${
        blue.getPosition().team
      }을 ${normalizedDamage}로 공격했댜! (hp : ${blue.getStatus().hp})`
    );

    return [red, blue];
  };

  searchTarget = (unit, allUnits) => {
    const myId = unit.getId();
    const myTeam = unit.getTeam();
    const enemies = allUnits.filter((Unit) => Unit.getTeam() !== myTeam);
    const nearByEnemies = enemies.sort(
      (prev, curr) => prev.data.position - curr.data.position,
      0
    );
    const aliveEnemies = nearByEnemies.filter((enemy) => enemy.isAlive());
    return aliveEnemies;
  }; // [Unit, Unit, Unit], [Unit, Unit, Unit]

  scence = () => {
    const allUnits = this.getAllUnits();
    for (let idx = 0; idx < 5; idx++) {
      const sortByStamina = allUnits.sort(
        (prev, curr) => curr.getStamina() - prev.getStamina(),
        0
      );
      const target = this.searchTarget(sortByStamina[0], allUnits);
      const [newRed, newBlue] = this.attack(sortByStamina[0], target[0]);
      //console.log(newRed.getStatus(), newBlue.getStatus());
    }
  };
}

// console.log(
//   allUnits.map((unit) => {
//     return [unit.data.position, unit.data.status, unit.data.condition];
//   })
// );

const newBattle = new Battle([aaa, bbb, ccc]);

newBattle.scence();

// console.log(newBattle.team);

// console.log([true, false]);
// console.log([true, false].every((isAlive) => isAlive));
// console.log([true, true]);
// console.log([true, true].every((isAlive) => isAlive));
