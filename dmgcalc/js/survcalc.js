function survCalc(attacker, defender, field, maxPer, move = null) {
  const resultObj = {};
  // Clear attacker moves to speed up calc
  attacker.moves = [];

  let defMoves = defender.moves
  if(move != null) {
    defMoves = defMoves.map((m) => {
      return m.name == move? {name:m.name}:{name:'(No Move)'}
    })
  }
  const gen8 = calc.Generations.get(8);
  for (let defenderMoveIndex = 0; defenderMoveIndex < 4; defenderMoveIndex++) {
    let defenderMoveObj = defMoves[defenderMoveIndex]
    const move = defenderMoveObj.name
    if(move == '(No Move)') continue
    const moveData = new calc.Move(gen8, defenderMoveObj.name);

    const isPhys = moveData.category === "Physical";

    let maxHP = false;
    let maxDef = false;
    attacker.evs = { hp: 0, at: 0, df: 0, sa: 0, sd: 0, sp: 0 };

    const allResults = [];
    const perResults = [];

    Array.prototype.avg =
      function () {
        return this.reduce((a, b) => a + b) / this.length;
      };

    if (isPhys) {
      for (let hp = 0; hp <= 252; hp += 4) {
        for (let def = 0; def <= 252; def += 4) {
          attacker.evs = { hp, at: 0, df: def, sa: 0, sd: 0, sp: 0 };
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
              result.damage.avg() /
              calcMaxHP(
                result.description.resultObj.attacker.species.baseStats.hp,
                hp,
                31,
                50
              )
          }
          allResults.push(returnResult)
          if (
            result.damage.avg() /
              calcMaxHP(
                result.description.resultObj.attacker.species.baseStats.hp,
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
      for (let hp = 0; hp <= 252; hp += 4) {
        for (let spd = 0; spd <= 252; spd += 4) {
          attacker.evs = { hp, at: 0, df: 0, sa: 0, sd: spd, sp: 0 };
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
              result.damage.avg() /
              calcMaxHP(
                result.description.resultObj.attacker.species.baseStats.hp,
                hp,
                31,
                50
              )
          }
          allResults.push(returnResult);
          if (
            result.damage.avg() /
              calcMaxHP(
                result.description.resultObj.attacker.species.baseStats.hp,
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
