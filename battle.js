const { POSITION, STATUS, SET_EFFECT, EQUIP } = require("./assetData");

class unit {
  id = "";
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
      grid: 1,
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

  calcEffectToStaus = () => {};

  addFrame = () => {
    this.data.position.frame += 1;
  };
  getTeam = () => this.data.position.team;
  getUnit = () => ({ ...this.data });
  getStatus = () => ({ ...this.data.status });
  getEquip = () => [...this.data.equipment];
  getGrid = () => this.data.position.grid;
  getPosition = () => ({ ...this.data.position });
  getCondition = () => ({ ...this.data.condition });
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
    console.log("units", units);
    const team = units[0].getTeam();
    const teamAlive = units
      .map((unit) => unit.checkAlive())
      .every((unitAlive) => unitAlive);
    return { team, teamAlive };
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
  chargeAllUnitsStamina = (units) => {
    units.forEach((unit) => {
      unit.chargeStamina();
    });
  };
  nextFrame = () => {
    this.frame += 1;
    this.addStamina();
  };
  compareStamina = (me, you) =>
    me.status.stamina >= you.status.stamina ? [me, you] : [you, me];
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

  declareWinner = (seperatedTeam) => {
    const noneWinner = false;

    const teamsLabels = Object.keys(seperatedTeam);

    const checkClearedTeam = teamsLabels.map((team) =>
      seperatedTeam[team].every((unit) => unit.isAlive() === false)
    );

    const allClearedTeam = checkClearedTeam.indexOf(true);

    if (allClearedTeam < 0) return noneWinner;

    const winningTeam = teamsLabels.find((_, idx) => idx !== allClearedTeam);

    return winningTeam;
  };

  attack = (attacker, defencer) => {
    if (attacker.getStamina() === 0) return;
    const attackerStatus = attacker.getStatus();
    const defencerStatus = defencer.getStatus();
    const defenceRatio = 1 / (1 + defencerStatus.def);
    const damage = attackerStatus.atk * defenceRatio;
    const decreaceDamage = (damage / (attackerStatus.atk - damage)) * 100;
    const normalizedDamage =
      decreaceDamage === 0 ? 1 : Math.round(decreaceDamage);

    defencer.beAttacked(normalizedDamage);
    attacker.setStamina(0);

    console.log(attacker.getStamina());

    console.log(
      `${attacker.getPosition().team}이 ${
        defencer.getPosition().team
      }을 ${normalizedDamage}로 공격했댜! (hp : ${defencer.getStatus().hp})`
    );
  };

  newCheckTeamAlive = (units) => {};

  // [Unit, Unit, Unit], [Unit, Unit, Unit]
  searchTarget = (unit, allUnits) => {
    const myId = unit.getId();
    const myTeam = unit.getTeam();
    const enemies = allUnits.filter((Unit) => Unit.getTeam() !== myTeam);
    const nearByEnemies = enemies.sort(
      (prev, curr) => prev.getGrid() - curr.getGrid(),
      0
    );
    const aliveEnemies = nearByEnemies.filter((enemy) => enemy.isAlive());
    return aliveEnemies;
  };

  scence = () => {
    const allUnits = this.getAllUnits();
    const seperatedTeamObj = this.seperateTeam(allUnits);
    let winner;
    do {
      const sortByStamina = allUnits.sort(
        (prevUnit, currUnit) => currUnit.getStamina() - prevUnit.getStamina(),
        0
      );
      const attacker = sortByStamina[0];
      const defencers = allUnits.filter(
        (unit) => unit.id !== attacker.id && unit.getId() !== attacker.getId()
      );
      const target = this.searchTarget(attacker, defencers);

      this.attack(attacker, target[0]);

      this.chargeAllUnitsStamina(allUnits);

      winner = this.declareWinner(seperatedTeamObj);
      console.log(
        "blue",
        seperatedTeamObj.blue.map((unit) => unit.data.status.hp)
      );
      console.log(
        "red",
        seperatedTeamObj.red.map((unit) => unit.data.status.hp)
      );
    } while (winner === false);
    console.log("winner", winner);
  };
}

const newBattle = new Battle([aaa, bbb, ccc]);

newBattle.scence();

console.log(aaa.getUnit1());
