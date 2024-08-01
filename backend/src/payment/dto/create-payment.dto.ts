export class CreatePaymentDto {
  user_id: string;
  diamond_id: string;
  amount: number;
  status: string;
}

export class CreateConfirmDto {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: number;
  signature_key: string;
  payment_type: string;
  order_id: string;
  gross_amount: string;
  fraud_status: string;
  currency: string;
  channel_response_message: string;
  channel_response_code: number;
  bank: string;
}
