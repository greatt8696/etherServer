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

const SET_EFFECT = {
  용사뀨: (partsNum) => {
    const defaultValue = {
      atk: 50,
      def: 50,
      spd: 50,
      hp: 50,
    };

    let debuff = 1;
    switch (partsNum) {
      case partsNum >= 2 && partsNum < 4:
        debuff = 1 / 5;
        break;
      case partsNum >= 4 && partsNum < 6:
        debuff = 2 / 5;
        break;
      case 6 === partsNum:
        debuff = 1;
        break;
      default:
        break;
    }

    const buffValue = {
      status: {
        atk: defaultValue.atk * debuff,
        def: defaultValue.def * debuff,
        spd: defaultValue.spd * debuff,
        hp: defaultValue.hp * debuff,
      },
      condition: {},
    };

    return buffValue;
  },

  초심자: (partsNum) => {
    const defaultValue = {
      atk: 100,
      def: 100,
      spd: 100,
      hp: 100,
    };

    let debuff = 1;
    switch (partsNum) {
      case partsNum >= 2 && partsNum < 4:
        debuff = 1 / 5;
        break;
      case partsNum >= 4 && partsNum < 6:
        debuff = 2 / 5;
        break;
      case 6 === partsNum:
        debuff = 1;
        break;
      default:
        break;
    }

    const buffValue = {
      status: {
        atk: defaultValue.atk * debuff,
        def: defaultValue.def * debuff,
        spd: defaultValue.spd * debuff,
        hp: defaultValue.hp * debuff,
      },
      condition: {},
    };

    return buffValue;
  },
};

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

module.exports = { POSITION, STATUS, SET_EFFECT, EQUIP };
