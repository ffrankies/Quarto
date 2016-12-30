/******************************************************************************
 * Class that Holds Player information.
 * Author: Frank Wanye
 * Date: 12/29/2016
 *****************************************************************************/
"use strict";

var Player = (function() {

    // Converts player ranks to text representations.
    const RANKS = {
        0: "Human",
        1: "Beginner",
        2: "Amateur",
        3: "Pro",
        4: "Expert",
        5: "Champ"
    };

    // Board constructor
    var init = function(name, rank) {

        // The name of this player
        var name = name;

        // Shows whether this player is an AI or Human player
        var ai;
        if (rank == 0) {
            ai = false;
        } else {
            ai = rank;
        }

        // The player's rank
        var rank = rank;

        return {
            name: name,
            ai: ai,
            rank: rank
        };

    };

    return {
        init: init,
        RANKS: RANKS
    };

})();
