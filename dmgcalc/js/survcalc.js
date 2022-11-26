function survCalc(attacker, defender, field, maxPer, move = null, forceEV = {}) {
  const resultObj = {};
  // Clear attacker moves to speed up calc
  attacker.moves = [];

  let forceHP = 0;
  let forceDef = 0;
  let forceSpD = 0;

  if(forceEV.hp != undefined) forceHP = parseInt(forceEV.hp);
  if(forceEV.def != undefined) forceDef = parseInt(forceEV.def);
  if(forceEV.spd != undefined) forceSpD = parseInt(forceEV.spd);

  let defMoves = defender.moves
  if(move != null) {
    defMoves = defMoves.map((m) => {
      return m.name == move? {name:m.name}:{name:'(No Move)'}
    })
  }
  const gen9 = calc.Generations.get(9);

  const attackerBoosts = Object.assign({}, attacker.boosts)
  const defenderBoosts = Object.assign({}, defender.boosts)

  for (let defenderMoveIndex = 0; defenderMoveIndex < 4; defenderMoveIndex++) {
    let defenderMoveObj = defMoves[defenderMoveIndex]
    const move = defenderMoveObj.name
    if(move == '(No Move)') continue
    const moveData = new calc.Move(gen9, defenderMoveObj.name);

    const isPhys = moveData.category === "Physical";

    let maxHP = false;
    let maxDef = false;

    const allResults = [];
    const perResults = [];

    Array.prototype.avg =
      function () {
        return this.reduce((a, b) => a + b) / this.length;
      };

    if (isPhys) {
      for (let hp = forceHP; hp <= 252; hp += 4) {
        for (let def = forceDef; def <= 252; def += 4) {
          attacker.boosts = Object.assign({}, attackerBoosts)
          defender.boosts = Object.assign({}, defenderBoosts)
          attacker.evs = { hp, at: 0, df: def, sa: 0, sd: forceSpD, sp: 0 };
          if(parseInt(attacker.evs.hp) + parseInt(attacker.evs.at) + parseInt(attacker.evs.df) + parseInt(attacker.evs.sa) + parseInt(attacker.evs.sd) + parseInt(attacker.evs.sp) > 510)
            continue
          const result = CALCULATE_ALL_MOVES_SM(attacker, defender, field)[1][defenderMoveIndex];
          const returnResult = {
            move: move,
            dmg: result.damage.avg(),
            min: result.damage[0],
            max: result.damage[result.damage.length - 1],
            hp,
            def,
            evTot: hp + def,
            per:
              result.damage[result.damage.length - 1] /
              calcMaxHP(
                result.description.resultObj.defender.species.baseStats.hp,
                hp,
                31,
                50
              ),
            resultObj: result.description.resultObj
          }
          allResults.push(returnResult)
          if (
              result.damage[result.damage.length - 1] /
              calcMaxHP(
                result.description.resultObj.defender.species.baseStats.hp,
                hp,
                31,
                50
              ) >
            maxPer / 100
          )
            continue;
          perResults.push(returnResult);
        }
      }
    } else {
      for (let hp = forceHP; hp <= 252; hp += 4) {
        for (let spd = forceSpD; spd <= 252; spd += 4) {
          attacker.boosts = Object.assign({}, attackerBoosts)
          defender.boosts = Object.assign({}, defenderBoosts)
          attacker.evs = { hp, at: 0, df: forceDef, sa: 0, sd: spd, sp: 0 };
          if(parseInt(attacker.evs.hp) + parseInt(attacker.evs.at) + parseInt(attacker.evs.df) + parseInt(attacker.evs.sa) + parseInt(attacker.evs.sd) + parseInt(attacker.evs.sp) > 510)
            continue
          const result = CALCULATE_ALL_MOVES_SM(attacker, defender, field)[1][defenderMoveIndex];
          const returnResult = {
            move: move,
            dmg: result.damage.avg(),
            min: result.damage[0],
            max: result.damage[result.damage.length - 1],
            hp,
            spd,
            evTot: hp + spd,
            per:
              result.damage[result.damage.length - 1] /
              calcMaxHP(
                result.description.resultObj.defender.species.baseStats.hp,
                hp,
                31,
                50
              ),
            resultObj: result.description.resultObj
          }
          allResults.push(returnResult);
          if (
            result.damage[result.damage.length - 1] /
              calcMaxHP(
                result.description.resultObj.defender.species.baseStats.hp,
                hp,
                31,
                50
              ) >
            maxPer / 100
          )
            continue;
          perResults.push(returnResult);
        }
      }
    }

    perResults.sort((a, b) => {
      return a.evTot > b.evTot ? 1 : -1;
    });

    resultObj[move] = perResults[0]

    if(resultObj[move] == undefined) {
      allResults.sort((a, b) => {
        return a.per > b.per ? 1 : -1;
      });

      resultObj[move] = allResults[0]
    }
  }
  const rerender_surv_dd = false;
  calculateAll(rerender_surv_dd);
  return resultObj
}

function calcMaxHP(base, evs, ivs, level) {
  let total;
  if (base === 1) {
    total = 1;
  } else {
    total =
      Math.floor(((base * 2 + ivs + Math.floor(evs / 4)) * level) / 100) +
      level +
      10;
  }
  return total;
}