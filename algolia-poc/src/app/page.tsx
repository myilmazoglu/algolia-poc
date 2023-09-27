"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    // Make an API call to your Express.js backend
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <span>
      {" "}
      <table className="table-auto bg-green-400">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Page Length</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: any) => (
            <tr key={book.id}>
              <td className="px-5">{book.book_name}</td>
              <td className="px-5">{book.author}</td>
              <td className="px-20">{book.book_category}</td>
              <td className="px-5">{book.page_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </span>
  );
}
