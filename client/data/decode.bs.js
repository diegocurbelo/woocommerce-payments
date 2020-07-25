// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Util$WoocommercePayments from "../utils/charge/util.bs.js";

function address(json) {
  return {
          city: Json_decode.optional((function (param) {
                  return Json_decode.field("city", Json_decode.string, param);
                }), json),
          country: Json_decode.optional((function (param) {
                  return Json_decode.field("country", Json_decode.string, param);
                }), json),
          line1: Json_decode.optional((function (param) {
                  return Json_decode.field("line1", Json_decode.string, param);
                }), json),
          line2: Json_decode.optional((function (param) {
                  return Json_decode.field("line2", Json_decode.string, param);
                }), json),
          postal_code: Json_decode.optional((function (param) {
                  return Json_decode.field("postal_code", Json_decode.string, param);
                }), json),
          state: Json_decode.optional((function (param) {
                  return Json_decode.field("state", Json_decode.string, param);
                }), json)
        };
}

function billingDetails(json) {
  return {
          address: Json_decode.field("address", address, json),
          email: Json_decode.optional((function (param) {
                  return Json_decode.field("email", Json_decode.string, param);
                }), json),
          name: Json_decode.optional((function (param) {
                  return Json_decode.field("email", Json_decode.string, param);
                }), json),
          phone: Json_decode.optional((function (param) {
                  return Json_decode.field("phone", Json_decode.string, param);
                }), json),
          formatted_address: Json_decode.optional((function (param) {
                  return Json_decode.field("formatted_address", Json_decode.string, param);
                }), json)
        };
}

function dispute(json) {
  return {
          status: Util$WoocommercePayments.getDisputeStatus(Json_decode.field("status", Json_decode.string, json))
        };
}

function level3LineItem(json) {
  return {
          discount_amount: Json_decode.field("discount_amount", Json_decode.$$int, json),
          product_code: Json_decode.field("product_code", Json_decode.string, json),
          product_description: Json_decode.field("product_description", Json_decode.string, json),
          quantity: Json_decode.field("quantity", Json_decode.$$int, json),
          tax_amount: Json_decode.field("tax_amount", Json_decode.$$int, json),
          unit_cost: Json_decode.field("unit_cost", Json_decode.$$int, json)
        };
}

function level3(json) {
  return {
          line_items: Json_decode.field("discount_amount", (function (param) {
                  return Json_decode.array(level3LineItem, param);
                }), json),
          merchant_reference: Json_decode.field("merchant_reference", Json_decode.string, json),
          shipping_address_zip: Json_decode.field("shipping_address_zip", Json_decode.string, json),
          shipping_amount: Json_decode.field("shipping_amount", Json_decode.$$int, json),
          shipping_from_zip: Json_decode.field("shipping_from_zip", Json_decode.string, json)
        };
}

function outcome(json) {
  return {
          type: Util$WoocommercePayments.getOutcomeType(Json_decode.field("type", Json_decode.string, json)),
          risk_level: Json_decode.field("risk_level", Json_decode.string, json)
        };
}

function refunds(json) {
  return {
          object: Json_decode.field("object", Json_decode.string, json),
          data: [],
          has_more: Json_decode.field("has_more", Json_decode.bool, json),
          total_count: Json_decode.field("total_count", Json_decode.$$int, json),
          url: Json_decode.field("url", Json_decode.string, json)
        };
}

function checks(json) {
  return {
          address_line1_check: Json_decode.optional((function (param) {
                  return Json_decode.field("address_line1_check", Json_decode.string, param);
                }), json),
          address_postal_code_check: Json_decode.optional((function (param) {
                  return Json_decode.field("address_postal_code_check", Json_decode.string, param);
                }), json),
          cvc_check: Json_decode.field("cvc_check", Json_decode.string, json)
        };
}

function card(json) {
  return {
          checks: Json_decode.field("checks", checks, json),
          country: Json_decode.field("country", Json_decode.string, json),
          exp_month: Json_decode.field("exp_month", Json_decode.$$int, json),
          exp_year: Json_decode.field("exp_year", Json_decode.$$int, json),
          fingerprint: Json_decode.field("fingerprint", Json_decode.string, json),
          funding: Json_decode.field("funding", Json_decode.string, json),
          last4: Json_decode.field("last4", Json_decode.string, json),
          network: Json_decode.field("network", Json_decode.string, json)
        };
}

function paymentMethodDetails(json) {
  return {
          card: Json_decode.field("card", card, json),
          type: Json_decode.field("type", Json_decode.string, json)
        };
}

function charge(json) {
  return {
          id: Json_decode.field("id", Json_decode.string, json),
          object: Json_decode.field("object", Json_decode.string, json),
          amount: Json_decode.field("amount", Json_decode.$$int, json),
          amount_refunded: Json_decode.field("amount_refunded", Json_decode.$$int, json),
          application: Json_decode.optional((function (param) {
                  return Json_decode.field("application", Json_decode.string, param);
                }), json),
          application_fee: Json_decode.optional((function (param) {
                  return Json_decode.field("application_fee", Json_decode.string, param);
                }), json),
          application_fee_amount: Json_decode.optional((function (param) {
                  return Json_decode.field("application_fee_amount", Json_decode.$$int, param);
                }), json),
          balance_transaction: Json_decode.field("balance_transaction", Json_decode.string, json),
          billing_details: Json_decode.field("billing_details", billingDetails, json),
          calculated_statement_descriptor: Json_decode.optional((function (param) {
                  return Json_decode.field("calculated_statement_descriptor", Json_decode.string, param);
                }), json),
          captured: Json_decode.field("captured", Json_decode.bool, json),
          created: Json_decode.field("created", Json_decode.$$int, json),
          currency: Json_decode.field("currency", Json_decode.string, json),
          dispute: Json_decode.optional((function (param) {
                  return Json_decode.field("dispute", dispute, param);
                }), json),
          disputed: Json_decode.field("disputed", Json_decode.bool, json),
          level3: Json_decode.optional((function (param) {
                  return Json_decode.field("level3", level3, param);
                }), json),
          livemode: Json_decode.field("livemode", Json_decode.bool, json),
          outcome: Json_decode.optional((function (param) {
                  return Json_decode.field("outcome", outcome, param);
                }), json),
          paid: Json_decode.field("paid", Json_decode.bool, json),
          payment_intent: Json_decode.optional((function (param) {
                  return Json_decode.field("payment_intent", Json_decode.string, param);
                }), json),
          payment_method: Json_decode.field("payment_method", Json_decode.string, json),
          payment_method_details: Json_decode.field("payment_method_details", paymentMethodDetails, json),
          receipt_email: Json_decode.optional((function (param) {
                  return Json_decode.field("receipt_email", Json_decode.string, param);
                }), json),
          receipt_number: Json_decode.optional((function (param) {
                  return Json_decode.field("receipt_number", Json_decode.string, param);
                }), json),
          receipt_url: Json_decode.field("receipt_url", Json_decode.string, json),
          refunded: Json_decode.field("refunded", Json_decode.bool, json),
          refunds: Json_decode.optional((function (param) {
                  return Json_decode.field("refunds", refunds, param);
                }), json),
          status: Util$WoocommercePayments.getChargeStatus(Json_decode.field("status", Json_decode.string, json))
        };
}

export {
  address ,
  billingDetails ,
  dispute ,
  level3LineItem ,
  level3 ,
  outcome ,
  refunds ,
  checks ,
  card ,
  paymentMethodDetails ,
  charge ,
  
}
/* No side effect */
