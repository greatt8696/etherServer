class Uint {
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
    const newStatus = this.setStatusByEquip(this.getStatus(), this.getEquip());
    this.update({ status: newStatus });
    this.initFrame();
    this.initStamina();
  }
  checkAlive = () => {
    return this.data.status.hp > 0;
  };
  checkCondition = () => {};
  setStatusByEquip = (status, equipments) => {
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
  isDead = () => {
    return this.uint.status.hp <= 0;
  };
  getStamina = () => {
    return this.uint.condition.stamina;
  };
  setStamina = (stamina) => {
    this.uint.condition.stamina = stamina;
  };
  setId = () => {
    this.id = parseInt(Math.random() * 999).toString();
  };
  getId = () => {
    this.id;
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
];
const STATUS = {
  atk: 10,
  def: 10,
  spd: 10,
  hp: 100,
};
const aaa = new Uint({
  equipment: EQUIP,
  position: POSITION[0],
  status: STATUS,
});
const bbb = new Uint({
  equipment: EQUIP.splice(3, 1),
  position: POSITION[1],
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
  isDead = ({ status }) => {
    console.log("isDead", status);
    if (status.hp <= 0) {
      console.log(`${status.team}가 쓰러졌쟈나 ㅠㅅㅠ`);
      return true;
    }
    return false;
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
  attack = (me, you) => {
    const beforeMeData = { ...me.data };
    const beforeYouData = { ...you.data };
    const defenceRatio = 1 / (1 + beforeYouData.status.def);

    const damage = beforeMeData.status.atk * defenceRatio;
    if (damage === 0) damage = 1;
    const decreaceDamage = (damage / (beforeMeData.status.atk - damage)) * 100;

    beforeMe.resetStamina();

    console.log(
      `${beforeMe.team}이 ${
        beforeYou.team
      }을 ${damage}로 공격했댜! (방어율 : ${decreaceDamage.toFixed(2)}%)`
    );

    return [afterMe, afterYou];
  };
  searchTarget = (unit, allUnits) => {
    const myId = unit.getId();
    const myTeam = unit.getTeam();

    const enemies = allUnits.filter((Unit) => {
      return Unit.getTeam() === myTeam;
    });
    console.log(enemy[0].getPosition());
  }; // [Unit, Unit, Unit], [Unit, Unit, Unit]
  scence = () => {
    const allUnits = this.getAllUnits();
    const sortByStamina = allUnits.sort(
      (prev, curr) => curr.data.condition.stamina - prev.data.condition.stamina,
      0
    );
    // console.log(sortByStamina.map((unit) => unit.data.condition.stamina));

    // console.log(allUnits.map((unit) => unit.checkAlive()));
    this.searchTarget(sortByStamina[0], allUnits);
  };
}

// console.log(
//   allUnits.map((unit) => {
//     return [unit.data.position, unit.data.status, unit.data.condition];
//   })
// );

const newBattle = new Battle([aaa, bbb]);

newBattle.scence();

// console.log(newBattle.team);

// console.log([true, false]);
// console.log([true, false].every((isAlive) => isAlive));
// console.log([true, true]);
// console.log([true, true].every((isAlive) => isAlive));
