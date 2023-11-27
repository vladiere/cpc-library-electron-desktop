interface ICirculation {
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

interface IFineFees {
  transaction_id: number;
  user_id: number;
  fullname: string;
  department: string;
  role: string;
  title: string;
  total_fines_and_fees: string;
  status: string;
  due_date: string;
}

interface IRenewal {
  renewal_id: number;
  transaction_id: number;
  user_id: number;
  fullname: string;
  title: string;
  renewal_days: string;
  original_due_date: string;
  new_due_date: string;
  approval_status: string;
}

export default {
  ICirculation,
  IRenewal,
  IFineFees,
}
