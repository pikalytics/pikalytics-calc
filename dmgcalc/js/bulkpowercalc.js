function createDummy(pokemon) {
  //create new pokemon based on p1
  var dummy = new Pokemon($("#p1"));
  //give it the desired pokemon ability, type, weight, dynamax, speed
  dummy.ability = pokemon.ability;
  dummy.isDynamax = pokemon.isDynamax;
  dummy.type1 = pokemon.type1;
  dummy.type2 = pokemon.type2;
  dummy.weight = pokemon.weight;
  dummy.status = pokemon.status;
  dummy.HPEVs = 0;
  dummy.baseStats = { at: 48, df: 48, sa: 48, sd: 48, sp: 48 };
  dummy.boosts = { at: 0, df: 0, sa: 0, sd: 0, sp: pokemon.boosts.sp };
  dummy.curHP = 123;
  dummy.evs = { at: 0, df: 0, sa: 0, sd: 0, sp: 0, hp: 0 };
  dummy.item = "";
  dummy.ivs = { at: 31, df: 31, sa: 31, sd: 31, sp: 31, hp: 31 };
  dummy.level = 50;
  dummy.maxHP = 123;
  dummy.name = "Ditto";
  dummy.nature = "Hardy";
  dummy.rawStats = { at: 68, df: 68, sa: 68, sd: 68, sp: pokemon.rawStats.sp };
  dummy.stats = {df: 68, sd: 68, sp: 68, at: 68, sa: 68};
  dummy.toxicCounter = 0;

  return dummy;
}

function setDummyMoves(dummy) {
    //set dummy moves 0 and 1 to be hyperhyperbeam and gigagiga impact for p1 bulk calculation
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

    return dummy;
}


function getPowers(results, side) {
  //results[0p1moves,1p2moves][move slot].damage[damage roll position, min - max]
  let powers = [0,0,0,0];
  for (move in results[side]) {
    powers[move] = results[side][move].damage[0];
  }
  return powers;
}

//due to field effects, use opposite side position in results to get relevant damage
function calcBulk(pokemon, results, oppside) {
  let spDamage = results[oppside][0].damage[0];
  let physDamage = results[oppside][1].damage[0];

  //dummy attack damage vs standard ditto min roll = 374 (scales bulk to equal power)
  let spBulk = Math.round(374*pokemon.maxHP/spDamage);
  let physBulk = Math.round(374*pokemon.maxHP/physDamage);
  return [physBulk, spBulk];
}

function renderPowers(p1Powers, p2Powers) {
  var resultLocations = [[], []]
  for (var i = 0; i < 4; i++) {
      resultLocations[0].push('#resultPowerL' + (i + 1));
      resultLocations[1].push('#resultPowerR' + (i + 1));
  }

  for (move in resultLocations[0]) {
    $(resultLocations[0][move]).text(p1Powers[move]);
  }
  for (move in resultLocations[1]) {
    $(resultLocations[1][move]).text(p2Powers[move]);
  }
}

function renderBulk(p1Bulk, p2Bulk) {
  $("#p1 .phyBulk").text(p1Bulk[0]);
  $("#p1 .spBulk").text(p1Bulk[1]);
  $("#p2 .phyBulk").text(p2Bulk[0]);
  $("#p2 .spBulk").text(p2Bulk[1]);
}

function powercalc(p1, p2, field) {
  //create dummy versions of p1 and p2
  let p1Dummy = createDummy(p1);
  let p2Dummy = createDummy(p2);
  //calc and set aside move powers here
  //field effects are sided so need to calculate both directions
  let p1Results = calculateAllMoves(p1, p2Dummy, field);
  let p2Results = calculateAllMoves(p1Dummy, p2, field);
  
  let p1Powers = getPowers(p1Results, 0);
  let p2Powers = getPowers(p2Results, 1);
  renderPowers(p1Powers, p2Powers);

  //set dummy status to healthy and non dynamax for accurate bulk calc
  p1Dummy.status = "Healthy";
  p1Dummy.isDynamax = false;
  p2Dummy.status = "Healthy";
  p2Dummy.isDynamax = false;
  //custom moves don't play nice with dynamax so remove dummy dynamax before setting moves for bulk calc
  p1Dummy = setDummyMoves(p1Dummy);
  p2Dummy = setDummyMoves(p2Dummy);
  
  //PROBLEM: helping hand affects bulk calculation
  //field is not an editable object, constructor gets from html state

  //redo damage calcs for bulk calc
  p1Results = calculateAllMoves(p1, p2Dummy, field);
  p2Results = calculateAllMoves(p1Dummy, p2, field);

  let p1Bulk = calcBulk(p1, p1Results, 1);
  let p2Bulk = calcBulk(p2, p2Results, 0);
  renderBulk(p1Bulk, p2Bulk);
}
