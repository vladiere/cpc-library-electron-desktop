// Circulations
interface ITransactionPending {
  pending_transaction_id: number;
  user_id: number;
  title: string;
  fullname: string;
  transaction_type: string;
  status: string;
  request_date: string;
  approve_date: string;
  img_path: string;
}


export default {
  ITransactionPending,
}
