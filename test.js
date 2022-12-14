// const Web3 = require("web3");
// const Contract = require("./contracts/Test.json");

// const FROM = "0x879F90de3f5E39567be8C090a33219d30d5EC33e"; // 첫번째 계정
// const CA = "0x9Bae0edfA21976f5b5476B4d295a0fE1C14D3E36";

// (async () => {
//   const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");
//   const instance = await new web3.eth.getTransaction(CA);
//   console.log(instance);
// })();

/**
 *
 * [ (주스탯 * 4 + 부스탯) * 총 공격력 * 무기상수 * 직업보정상수 / 100 ] *
 * (스킬 퍼뎀 / 100) *
 * (크리티컬 발동시) 크리티컬 데미지 보정 *
 * [ (100 + 공격력%) / 100 ] *
 * [ (100 + 데미지% + 보공%) / 100 ] *
 * 방어율 무시 보정 *
 * 렙차 보정 *
 * 속성 보정 *
 * (아케인포스 필요 적의 경우) 아케인포스 보정 *
 * 숙련도 보정 *
 * [ (모든 최종데미지 계산값% + 100) / 100 ]
 *
 *
 * 대미지 = 공격력 * {1 / (1 + 방어력)}
 * damage = atk * (1/(1+def))
 */

class Unit {
  status = {
    team: "me or you",
    atk: 10,
    def: 10,
    spd: 10,
    hp: 100,
    stamina: 0,
  };
  frame = 0;

  constructor(status) {
    this.status = { ...status, stamina: status.spd * 10 };
  }

  attack = (me, you) => {
    const beforeMe = { ...me.status };
    const beforeYou = { ...you.status };
    const defenceRatio = 1 / (1 + beforeYou.def);

    const damage = beforeMe.atk * defenceRatio;
    if (damage === 0) damage = 1;
    const decreaceDamage = (damage / (beforeMe.atk - damage)) * 100;

    const afterMe = { ...beforeMe, stamina: 0 };
    const afterYou = { ...beforeYou, hp: beforeYou.hp - damage };

    console.log(
      `${beforeMe.team}이 ${
        beforeYou.team
      }을 ${damage}로 공격했댜! (방어율 : ${decreaceDamage.toFixed(2)}%)`
    );

    return [afterMe, afterYou];
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
}

const me = new Unit({
  team: "me",
  atk: 10,
  def: 10,
  spd: 18,
  hp: 10,
});

const you = new Unit({
  team: "you",
  atk: 10,
  def: 10,
  spd: 12,
  hp: 10,
});

while (!(me.isDead(me) || you.isDead(you))) {
  let after;

  const turn = me.compareStamina(me, you);

  after = turn[0].attack(turn[0], turn[1]);

  me.updateStatus(after[0]);
  you.updateStatus(after[1]);

  me.nextFrame();
  you.nextFrame();
}

console.log(me.frame);
