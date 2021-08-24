/* Damage calculation for the Generation VII games, Sun, Moon, Ultra Sun, and Ultra Moon*/
var showdownFormes = [
    ['Kyurem-White', 'Kyurem-W'],
    ['Kyurem-Black', 'Kyurem-B'],
    ['Rotom-Wash', 'Rotom-W'],
    ['Rotom-Heat', 'Rotom-H'],
    ['Rotom-Frost', 'Rotom-F'],
    ['Rotom-Mow', 'Rotom-C'],
    ['Rotom-Fan', 'Rotom-S'],
    ['Giratina-Origin', 'Giratina-O'],
    ['Landorus-Therian', 'Landorus-T'],
    ['Thundurus-Therian', 'Thundurus-T'],
    ['Tornadus-Therian', 'Tornadus-T'],
    ['Floette-Eternal', 'Floette-E'],
    ['Pumpkaboo', 'Pumpkaboo-Average'],
    ['Gourgeist', 'Gourgeist-Average'],
    ['Groudon-Primal', 'Primal Groudon'],
    ['Kyogre-Primal', 'Primal Kyogre'],
]

function CALCULATE_ALL_MOVES_SM(p1, p2, field) {
    checkAirLock(p1, field)
    checkAirLock(p2, field)
    checkForecast(p1, field.getWeather())
    checkForecast(p2, field.getWeather())
    checkKlutz(p1)
    checkKlutz(p2)
    checkEvo(p1, p2)
    p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF])
    p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD])
    p1.stats[SP] = getFinalSpeedSM(p1, field.getWeather(), field.getTerrain(), field.getSide(0))
    p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF])
    p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD])
    p2.stats[SP] = getFinalSpeedSM(p2, field.getWeather(), field.getTerrain(), field.getSide(1))
    checkIntimidate(p1, p2)
    checkIntimidate(p2, p1)
    p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT])
    p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA])
    p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT])
    p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA])
    var side1 = field.getSide(1)
    var side2 = field.getSide(0)
    checkInfiltrator(p1, side1)
    checkInfiltrator(p2, side2)
    var results = [[], []]
    for (var i = 0; i < 4; i++) {
        results[0][i] = GET_DAMAGE_SM(
            p1,
            p2,
            p1.moves[i],
            {
                weather: field.getWeather(),
                terrain: field.getTerrain(),
                gameType: field.getFormat(),
                isGravity: field.getGravity(),
                isAuraBreak: field.getAuraBreak(),
                isFairyAura: field.getFairyAura(),
                isDarkAura: field.getDarkAura(),
            },
            side1,
            side2
        )
        results[1][i] = GET_DAMAGE_SM(
            p2,
            p1,
            p2.moves[i],
            {
                weather: field.getWeather(),
                terrain: field.getTerrain(),
                gameType: field.getFormat(),
                isGravity: field.getGravity(),
                isAuraBreak: field.getAuraBreak(),
                isFairyAura: field.getFairyAura(),
                isDarkAura: field.getDarkAura(),
            },
            side2,
            side1
        )
    }
    return results
}

function GET_DAMAGE_SM(attacker, defender, move, field, side1, side2) {
    if(move == undefined) return
    var gen8 = calc.Generations.get(8)

    for (var i = 0; i < showdownFormes.length; i++) {
        if (attacker.name == showdownFormes[i][1])
            attacker.name = showdownFormes[i][0]

        if (defender.name == showdownFormes[i][1])
            defender.name = showdownFormes[i][0]
    }

    if (
        attacker.name.indexOf('Mega Charizard X') > -1 ||
        attacker.name.indexOf('Mega Mewtwo X') > -1
    ) {
        attacker.name = attacker.name
            .replace('Mega ', '')
            .replace(' X', '-Mega-X')
    } else if (
        attacker.name.indexOf('Mega Charizard Y') > -1 ||
        attacker.name.indexOf('Mega Mewtwo Y') > -1
    ) {
        attacker.name = attacker.name
            .replace('Mega ', '')
            .replace(' Y', '-Mega-Y')
    } else if (attacker.name.indexOf('Mega ') > -1) {
        attacker.name = attacker.name.replace('Mega ', '') + '-Mega'
    }

    if (
        defender.name.indexOf('Mega Charizard X') > -1 ||
        defender.name.indexOf('Mega Mewtwo X') > -1
    ) {
        defender.name = defender.name
            .replace('Mega ', '')
            .replace(' X', '-Mega-X')
    } else if (
        defender.name.indexOf('Mega Charizard Y') > -1 ||
        defender.name.indexOf('Mega Mewtwo Y') > -1
    ) {
        defender.name = defender.name
            .replace('Mega ', '')
            .replace(' Y', '-Mega-Y')
    } else if (defender.name.indexOf('Mega ') > -1) {
        defender.name = defender.name.replace('Mega ', '') + '-Mega'
    }

    var p1 = new calc.Pokemon(gen8, attacker.name, {
        level: attacker.level,
        item: attacker.item,
        nature: attacker.nature,
        curHP: attacker.curHP,
        evs: {
            hp: attacker.evs.hp,
            atk: attacker.evs.at,
            def: attacker.evs.df,
            spa: attacker.evs.sa,
            spd: attacker.evs.sd,
            spe: attacker.evs.sp,
        },
        ivs: {
            hp: attacker.ivs.hp,
            atk: attacker.ivs.at,
            def: attacker.ivs.df,
            spa: attacker.ivs.sa,
            spd: attacker.ivs.sd,
            spe: attacker.ivs.sp,
        },
        ability: attacker.ability,
        isDynamaxed: attacker.isDynamax,
        boosts: {
            atk: attacker.boosts[AT],
            def: attacker.boosts[DF],
            spa: attacker.boosts[SA],
            spd: attacker.boosts[SD],
            spe: attacker.boosts[SP],
        },
        status: convertStatus(attacker.status),
        overrides: {
            baseStats: {
                hp: attacker.baseStats.hp,
                atk: attacker.baseStats.at,
                def: attacker.baseStats.df,
                spa: attacker.baseStats.sa,
                spd: attacker.baseStats.sd,
                spe: attacker.baseStats.sp,
            },
            types: [attacker.type1, attacker.type2],
        },
    })

    var p2 = new calc.Pokemon(gen8, defender.name, {
        level: defender.level,
        item: defender.item,
        nature: defender.nature,
        curHP: defender.curHP,
        evs: {
            hp: defender.evs.hp,
            atk: defender.evs.at,
            def: defender.evs.df,
            spa: defender.evs.sa,
            spd: defender.evs.sd,
            spe: defender.evs.sp,
        },
        ivs: {
            hp: defender.ivs.hp,
            atk: defender.ivs.at,
            def: defender.ivs.df,
            spa: defender.ivs.sa,
            spd: defender.ivs.sd,
            spe: defender.ivs.sp,
        },
        ability: defender.ability,
        isDynamaxed: defender.isDynamax,
        boosts: {
            atk: defender.boosts[AT],
            def: defender.boosts[DF],
            spa: defender.boosts[SA],
            spd: defender.boosts[SD],
            spe: defender.boosts[SP],
        },
        status: convertStatus(defender.status),
        overrides: {
            baseStats: {
                hp: defender.baseStats.hp,
                atk: defender.baseStats.at,
                def: defender.baseStats.df,
                spa: defender.baseStats.sa,
                spd: defender.baseStats.sd,
                spe: defender.baseStats.sp,
            },
            types: [defender.type1, defender.type2],
        },
    })

    field.attackerSide = side2
    field.defenderSide = side1

    move.useMax = attacker.isDynamax
    move.species = attacker.name

    move.overrides = { basePower: move.bp, type: move.type }

    var result = calc.calculate(
        gen8,
        p1,
        p2,
        new calc.Move(gen8, move.name, move),
        new calc.Field(field)
    )

    let msg
    // Handle errors caused by 0 damage in .desc()
    if (result.damage == 0) {
        result.damage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        msg = `${attacker.name} ${move.name} vs. ${defender.name}: 0 (0%) - 0 (0%)`
    } else {
        msg = result.desc()
    }

    return {
        damage: result.damage,
        description: {
            msg,
            p1: result.attacker.name,
            p2: result.defender.name,
            move: result.move.name,
            moveType: result.move.type,
            resultObj: result
        },
    }
}

function getModifiedStat(stat, mod) {
    return mod > 0
        ? Math.floor((stat * (2 + mod)) / 2)
        : mod < 0
        ? Math.floor((stat * 2) / (2 - mod))
        : stat
}

function getFinalSpeedSM(pokemon, weather, terrain, side) {
    var speed = getModifiedStat(pokemon.rawStats[SP], pokemon.boosts[SP])
    var otherSpeedMods = 1
    if (pokemon.item === 'Choice Scarf') {
        otherSpeedMods *= 1.5
    } else if (pokemon.item === 'Macho Brace' || pokemon.item === 'Iron Ball') {
        otherSpeedMods *= 0.5
    }
    if (pokemon.ability === 'Quick Feet' && pokemon.status !== 'Healthy') {
        otherSpeedMods *= 1.5
    }
    if (pokemon.ability === 'Slow Start') {
        otherSpeedMods *= 0.5
    }
    if (
        (pokemon.ability === 'Chlorophyll' && weather.indexOf('Sun') > -1) ||
        (pokemon.ability === 'Sand Rush' && weather === 'Sand') ||
        (pokemon.ability === 'Swift Swim' && weather.indexOf('Rain') > -1) ||
        (pokemon.ability === 'Slush Rush' && weather.indexOf('Hail') > -1) ||
        (pokemon.ability === 'Surge Surfer' && terrain === 'Electric') ||
        (pokemon.ability === 'Unburden' && pokemon.item === '') ||
        (pokemon.name === 'Ditto' && pokemon.item === 'Quick Powder')
    ) {
        otherSpeedMods *= 2
    }
    if(side.isTailwind) {
        otherSpeedMods *= 2
    }
    speed = pokeRound(speed * otherSpeedMods)
    if (pokemon.status === 'Paralyzed' && pokemon.ability !== 'Quick Feet') {
        speed = Math.floor(speed / 2)
    }
    if (speed > 10000) {
        speed = 10000
    }
    return speed
}

function checkAirLock(pokemon, field) {
    if (pokemon.ability === 'Air Lock' || pokemon.ability === 'Cloud Nine') {
        field.clearWeather()
    }
}
function checkForecast(pokemon, weather) {
    if (pokemon.ability === 'Forecast' && pokemon.name === 'Castform') {
        if (weather.indexOf('Sun') > -1) {
            pokemon.type1 = 'Fire'
        } else if (weather.indexOf('Rain') > -1) {
            pokemon.type1 = 'Water'
        } else if (weather === 'Hail') {
            pokemon.type1 = 'Ice'
        } else {
            pokemon.type1 = 'Normal'
        }
        pokemon.type2 = ''
    }
}
function checkKlutz(pokemon) {
    if (pokemon.ability === 'Klutz') {
        pokemon.item = ''
    }
}

function checkIntimidate(source, target) {
    if (source.ability === 'Intimidate') {
        if (target.ability === 'Contrary' || target.ability === 'Defiant') {
            target.boosts[AT] = Math.min(6, target.boosts[AT] + 1)
        } else if (
            [
                'Clear Body',
                'White Smoke',
                'Hyper Cutter',
                'Full Metal Body',
            ].indexOf(target.ability) !== -1
        ) {
            // no effect
        } else if (target.ability === 'Simple') {
            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 2)
        } else {
            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 1)
        }
    }
}
function checkEvo(p1, p2) {
    if ($('#evoL').prop('checked')) {
        p1.boosts[AT] = Math.min(6, p1.boosts[AT] + 2)
        p1.boosts[DF] = Math.min(6, p1.boosts[DF] + 2)
        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2)
        p1.boosts[SD] = Math.min(6, p1.boosts[SD] + 2)
        p1.boosts[SP] = Math.min(6, p1.boosts[SP] + 2)
    }
    if ($('#evoR').prop('checked')) {
        p2.boosts[AT] = Math.min(6, p2.boosts[AT] + 2)
        p2.boosts[DF] = Math.min(6, p2.boosts[DF] + 2)
        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2)
        p2.boosts[SD] = Math.min(6, p2.boosts[SD] + 2)
        p2.boosts[SP] = Math.min(6, p2.boosts[SP] + 2)
    }

    if ($('#clangL').prop('checked')) {
        p1.boosts[SA] = Math.min(6, p1.boosts[SA] + 2)
        p1.boosts[SD] = Math.min(6, p1.boosts[SD] + 2)
        p1.boosts[SP] = Math.min(6, p1.boosts[SP] + 2)
    }
    if ($('#clangR').prop('checked')) {
        p2.boosts[SA] = Math.min(6, p2.boosts[SA] + 2)
        p2.boosts[SD] = Math.min(6, p2.boosts[SD] + 2)
        p2.boosts[SP] = Math.min(6, p2.boosts[SP] + 2)
    }
}

function checkInfiltrator(attacker, affectedSide) {
    if (attacker.ability === 'Infiltrator') {
        affectedSide.isReflect = false
        affectedSide.isLightScreen = false
        affectedSide.isAuroraVeil = false
    }
}

function countBoosts(boosts) {
    var sum = 0
    for (var i = 0; i < STATS.length; i++) {
        if (boosts[STATS[i]] > 0) {
            sum += boosts[STATS[i]]
        }
    }
    return sum
}

// GameFreak rounds DOWN on .5
function pokeRound(num) {
    return num % 1 > 0.5 ? Math.ceil(num) : Math.floor(num)
}

function convertStatus(status) {
    const codes = {
        Asleep: 'slp',
        Poisoned: 'psn',
        Burned: 'brn',
        Frozen: 'frz',
        Paralyzed: 'par',
        'Badly Poisoned': 'tox',
    }
    if (codes[status] != undefined) return codes[status]
    return ''
}
