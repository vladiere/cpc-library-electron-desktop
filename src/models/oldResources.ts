export default interface IOldResources {
  rowsData: {
    book_id: number;
    author_name: string;
    title: string;
    edition: string;
    publisher_name: string;
    cost_price: number;
    copies: number;
    borrowed_copies: number;
  }
}
