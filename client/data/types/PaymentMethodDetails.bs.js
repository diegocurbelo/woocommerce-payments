// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");

function make(cardOpt, type_Opt, param) {
  var card = cardOpt !== undefined ? Caml_option.valFromOption(cardOpt) : undefined;
  var type_ = type_Opt !== undefined ? type_Opt : /* Card */0;
  return {
          card: card,
          type: type_
        };
}

exports.make = make;
/* No side effect */