function powercalc(attacker, defender, field) {
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
  let damageResults = calculateAllMoves(attacker, dummy, field);
  console.log(damageResults);

  //output result
}
