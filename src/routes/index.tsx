import App from "@/App";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                Component: AllBooks
            },
            {
                path: '/all-books',
                Component: AllBooks
            },
            {
                path: '/add-book',
                Component: AddBook
            },
            {
                path: '/borrow-summary',
                Component: BorrowSummary
            }
        ]
    }
]);

export default router;