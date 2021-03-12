function powercalc(attacker, defender, field) {
  //create new pokemon based on p1
  //replace most props with ditto props
  //give ditto defender ability, type, weight, dynamax
  var dummy = new Pokemon($("#p1"));
  dummy.ability = defender.ability;
  dummy.isDynamax = defender.isDynamax;
  dummy.type1 = defender.type1;
  dummy.type2 = defender.type2;
  dummy.weight = defender.weight;
  dummy.status = defender.status;
  dummy.HPEVs = 0;
  dummy.baseStats = { at: 48, df: 48, sa: 48, sd: 48, sp: 48 };
  dummy.boosts = { at: 0, df: 0, sa: 0, sd: 0, sp: defender.boosts.sp };
  dummy.curHP = 123;
  dummy.evs = { at: 0, df: 0, sa: 0, sd: 0, sp: 0, hp: 0 };
  dummy.item = "";
  dummy.ivs = { at: 31, df: 31, sa: 31, sd: 31, sp: 31, hp: 31 };
  dummy.level = 50;
  dummy.maxHP = 123;
  dummy.name = "Ditto";
  dummy.nature = "Hardy";
  dummy.rawStats = { at: 68, df: 68, sa: 68, sd: 68, sp: defender.rawStats.sp };
  dummy.stats = {df: 68, sd: 68, sp: 68, at: 68, sa: 68};
  dummy.toxicCounter = 0;
  //console.log(dummy);
  //set aside attacker move powers here
  let dummyResults = calculateAllMoves(attacker, dummy, field);
  //dummyresults[0attackermoves,1dummymoves][move slot].damage[damage roll position]
  let minPowers = [0,0,0,0];
  for (move in dummyResults[0]) {
    minPowers[move] = dummyResults[0][move].damage[0];
  }
  //TODO render(minPowers);


  //set dummy status to healthy and non dynamax for accurate bulk calc
  dummy.status = "Healthy";
  dummy.isDynamax = false;

  //set dummy moves 0 and 1 to be hyperbeam and giga impact for attacker bulk calculation
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

  let dumPhysAttack = dummy.moves[1] = {...dumSpecAttack};
  dumPhysAttack.category = "Physical";
  dumPhysAttack.displayName = "Giga Impact";
  dumPhysAttack.name = "Giga Impact";

  //set aside dummy attacks min power for bulk calc
  dummyResults = calculateAllMoves(attacker, dummy, field);
  let stSpDamage = dummyResults[1][0].damage[0];
  let stPhysDamage = dummyResults[1][1].damage[0];

  //dummy attack damage vs standard ditto min roll = 374 (scales bulk to equal power)
  let spBulk = Math.round(374*attacker.maxHP/stSpDamage);
  let physBulk = Math.round(374*attacker.maxHP/stPhysDamage);
  console.log(attacker.name, spBulk, physBulk);

  //output result
}

/*
TODO
-field effects on attacker side apply to both pokemon (screens)
-weird miscalculation of bulk on pokemon change

*/
