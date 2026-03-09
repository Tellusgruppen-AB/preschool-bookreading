// This file contains the columns and data for the shadcn table example
// You can adjust the columns and data as needed for your use case


export type Book = {
  title: string
  author: string
}

export type Bookshelf = {
  id: string
  name: string
  books: Book[]
}

// Kolumndefinitioner för bokhyllor
export const columns = [
  {
    accessorKey: "name",
    header: "Bokhylla",
  },
  {
    accessorKey: "books",
    header: "Antal böcker",
  },
]

export const data: Bookshelf[] = [
  {
    id: "1",
    name: "Djur",
    books: [
      { title: "Kaninens äventyr", author: "Anna Andersson" },
      { title: "Katten i natten", author: "Bosse Berg" },
    ],
  },
  {
    id: "2",
    name: "Vänskap",
    books: [
      { title: "Bästa vänner", author: "Cecilia Ceder" },
      { title: "Kramkalas", author: "David Dahl" },
      { title: "Tillsammans", author: "Eva Ek" },
    ],
  },
  {
    id: "3",
    name: "Färger",
    books: [
      { title: "Röd, gul, blå", author: "Fanny Färg" },
    ],
  },
]
