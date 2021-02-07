var SETDEX_SS = {};

var components = [
    SETDEX_PIKALYTICS,
    SETDEX_PIKALYTICS_OU
];

var gmax = [
    'Alcremie-Gmax',
    'Appletun-Gmax',
    'Blastoise-Gmax',
    'Butterfree-Gmax',
    'Centiskorch-Gmax',
    'Charizard-Gmax',
    'Cinderace-Gmax',
    'Coalossal-Gmax',
    'Copperajah-Gmax',
    'Corviknight-Gmax',
    'Drednaw-Gmax',
    'Duraludon-Gmax',
    'Eevee-Gmax',
    'Flapple-Gmax',
    'Garbodor-Gmax',
    'Gengar-Gmax',
    'Grimmsnarl-Gmax',
    'Hatterene-Gmax',
    'Inteleon-Gmax',
    'Kingler-Gmax',
    'Lapras-Gmax',
    'Machamp-Gmax',
    'Melmetal-Gmax',
    'Meowth-Gmax',
    'Orbeetle-Gmax',
    'Pikachu-Gmax',
    'Rillaboom-Gmax',
    'Sandaconda-Gmax',
    'Snorlax-Gmax',
    'Toxtricity-Gmax',
    'Toxtricity-Low-Key-Gmax',
    'Urshifu-Rapid-Strike-Gmax',
    'Urshifu-Gmax',
    'Venusaur-Gmax'
];

for (var i=0; i<components.length; i++) {
    var sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SS[p] = $.extend(SETDEX_SS[p], sourceDex[p])
            }
        }
    }
}

var reloadXYScript = function()
{
  console.log(SETDEX_CUSTOM);
    components = [
    SETDEX_PIKALYTICS,
    SETDEX_PIKALYTICS_OU,
    SETDEX_CUSTOM,
];

for (var i=0; i<components.length; i++) {
    sourceDex = components[i];
    if (sourceDex) {
        for (var p in sourceDex) {
            if (sourceDex.hasOwnProperty(p)) {
                SETDEX_SS[p] = $.extend(SETDEX_SS[p], sourceDex[p])
                for(var j in gmax) {
                    if(gmax[j].indexOf(p) > -1) SETDEX_SS[p + '-Gmax'] = $.extend(SETDEX_SS[p], sourceDex[p])
                }
            }
        }
    }
}
}
