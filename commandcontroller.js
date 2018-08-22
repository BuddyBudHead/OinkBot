var methods = {};

/**
 * show all poosible commands
 */
methods.showCommands = function(channel){
    channel.send({embed: {
        color: 3447003,
        description: "Übersicht über alle Commands des Oinkbots",

        fields: [{
            name: ".cmd",
            value: "Zeigt dir genau das hier an."
          },
          {
            name: ".flo",
            value: "Zeigt dir die Zeit an, die noch vergehen muss, bis der nächste Dienstag 19 Uhr ist."
          },
          {
            name: ".oink",
            value: "Spielt ein zauberhaftes Oinken von Flo ab. Setzt voraus, dass man beim Absenden des Commands in einem Voice-Channel ist."
          },
          {
            name: ".stats",
            value: "<:hmm:475702364960194570>"
          },
          {
            name: ".dick",
            value: "<:eggblow:475692753200611352>"
          },
          {
            name: ".hmm",
            value: "<:hmm:475702364960194570>"
          },
        ]
      }});

      
}

exports.data = methods;