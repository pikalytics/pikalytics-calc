function powercalc(attacker, defender, field, realResults) {
  //create dummy ditto
  //give ditto defender ability, type, weight, dynamax
  var dummy = new Pokemon($("#p1"));
  dummy.ability = defender.ability;
  dummy.isDynamax = defender.isDynamax;
  dummy.type1 = defender.type1;
  dummy.type2 = defender.type2;
  dummy.weight = defender.weight;
  dummy.HPEVs = 0;
  dummy.baseStats = { at: 48, df: 48, sa: 48, sd: 48, sp: 48 };
  dummy.boosts = { at: 0, df: 0, sa: 0, sd: 0, sp: 0 };
  dummy.curHP = 123;
  dummy.evs = { at: 0, df: 0, sa: 0, sd: 0, sp: 0, hp: 0 };
  dummy.item = "";
  dummy.ivs = { at: 31, df: 31, sa: 31, sd: 31, sp: 31, hp: 31 };
  dummy.level = 50;
  dummy.maxHP = 123;
  dummy.name = "Ditto";
  dummy.nature = "Hardy";
  dummy.rawStats = { at: 68, df: 68, sa: 68, sd: 68, sp: 68 };
  dummy.stats = {df: 68, sd: 68, sp: 68, at: 68, sa: 68};
  dummy.toxicCounter = 0;

  let dummyResults = calculateAllMoves(attacker, dummy, field);
  let minPower = dummyResults[0][0].damage[0];
  //dummyresults[p1attacker,p2attacker][move slot].damage[damage roll position]
  //console.log(minPower);



  let dumSpecAttack = dummy.moves[0];
  dumSpecAttack.bp = 999
  dumSpecAttack.category = "Special"
  dumSpecAttack.displayName = "Hyper Beam"
  dumSpecAttack.hasSecondaryEffect = false;
  dumSpecAttack.hits = 1;
  dumSpecAttack.isCrit = false;
  dumSpecAttack.isMax = false;
  dumSpecAttack.isSpread = false;
  dumSpecAttack.isZ = false;
  dumSpecAttack.name = "Hyper Beam";
  dumSpecAttack.overrides = {basePower: 999, type: "???"};
  dumSpecAttack.species = "Ditto";
  dumSpecAttack.type = "???";
  dumSpecAttack.useMax = false;
  dumSpecAttack.zp = 999;

  let dumPhysAttack = dummy.moves[1] = dumSpecAttack;
  dumPhysAttack.category = "Physical";
  dumPhysAttack.displayName = "Giga Impact";
  dumPhysAttack.name = "Giga Impact";


  console.log(dummy.moves[1]);
  dummyResults = calculateAllMoves(attacker, dummy, field);
  console.log(dummyResults);


  let defenderbulk = minPower*defender.maxHP/realResults[0][0].damage[0];
  //console.log(defenderbulk);

  //output result
}
