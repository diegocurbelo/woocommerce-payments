module Metadata = {
  type t;
};

type t = {
  id: string,
  [@bs.as "object"]
  object_: string,
  amount: int,
  amount_refunded: int,
  application: option(string),
  application_fee: option(string),
  application_fee_amount: option(int),
  balance_transaction: string,
  billing_details: Types.BillingDetails.t,
  calculated_statement_descriptor: option(string),
  captured: bool,
  created: int,
  currency: string,
  dispute: option(Types.Dispute.t),
  disputed: bool,
  level3: option(Types.Level3.t),
  livemode: bool,
  outcome: option(Types.Outcome.t),
  paid: bool,
  payment_intent: option(string),
  payment_method: string,
  payment_method_details: Types.PaymentMethodDetails.t,
  receipt_email: option(string),
  receipt_number: option(string),
  receipt_url: string,
  refunded: bool,
  refunds: option(Types.Refunds.t),
  status: ChargeStatus.t,
};

let make =
    (
      ~id="",
      ~object_="",
      ~amount=0,
      ~amount_refunded=0,
      ~application=None,
      ~application_fee=None,
      ~application_fee_amount=None,
      ~balance_transaction="",
      ~billing_details=Types.BillingDetails.make(),
      ~calculated_statement_descriptor=None,
      ~captured=false,
      ~created=0,
      ~currency="",
      ~dispute=None,
      ~disputed=false,
      ~level3=None,
      ~livemode=false,
      ~outcome=None,
      ~paid=false,
      ~payment_intent=None,
      ~payment_method="",
      ~payment_method_details=Types.PaymentMethodDetails.make(),
      ~receipt_email=None,
      ~receipt_number=None,
      ~receipt_url="",
      ~refunded=false,
      ~refunds=None,
      ~status=ChargeStatus.Pending,
      (),
    ) => {
  id,
  object_,
  amount,
  amount_refunded,
  application,
  application_fee,
  application_fee_amount,
  balance_transaction,
  billing_details,
  calculated_statement_descriptor,
  captured,
  created,
  currency,
  dispute,
  disputed,
  level3,
  livemode,
  outcome,
  paid,
  payment_intent,
  payment_method,
  payment_method_details,
  receipt_email,
  receipt_number,
  receipt_url,
  refunded,
  refunds,
  status,
};

module RequestError = {
  type t = {
    code: string,
    message: string,
    data: string,
  };
};

module Request = {
  type t = {
    charge: option(t),
    chargeError: option(RequestError.t),
    isLoading: bool,
  };
};
