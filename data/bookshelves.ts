// This file contains the columns and data for the shadcn table example
// You can adjust the columns and data as needed for your use case


export type Book = {
  title: string
  author: string
  image: string
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
    name: "Alla",
    books: [
      { title: "Kaninens äventyr", author: "Anna Andersson", image: "/kaninens-aventyr.png" },
      { title: "Katten i natten", author: "Bosse Berg", image: "/katten-i-natten.png" },
      { title: "Bästa vänner", author: "Cecilia Ceder", image: "/basta-vanner.png" },
      { title: "Kramkalas", author: "David Dahl", image: "/kramkalas.png" },
      { title: "Tillsammans", author: "Eva Ek", image: "/tillsammans.png" },
      { title: "Röd, gul, blå", author: "Fanny Färg", image: "/rod-gul-bla.png" },
      { title: "Kaninens äventyr", author: "Anna Andersson", image: "/kaninens-aventyr.png" },
      { title: "Katten i natten", author: "Bosse Berg", image: "/katten-i-natten.png" },
      { title: "Bästa vänner", author: "Cecilia Ceder", image: "/basta-vanner.png" },
      { title: "Kramkalas", author: "David Dahl", image: "/kramkalas.png" },
      { title: "Tillsammans", author: "Eva Ek", image: "/tillsammans.png" },
      { title: "Röd, gul, blå", author: "Fanny Färg", image: "/rod-gul-bla.png" },
    ],
  },
  {
    id: "2",
    name: "Djur",
    books: [
      { title: "Kaninens äventyr", author: "Anna Andersson", image: "/kaninens-aventyr.png" },
      { title: "Katten i natten", author: "Bosse Berg", image: "/katten-i-natten.png" },
    ],
  },
  {
    id: "3",
    name: "Vänskap",
    books: [
      { title: "Bästa vänner", author: "Cecilia Ceder", image: "/basta-vanner.png" },
      { title: "Kramkalas", author: "David Dahl", image: "/kramkalas.png" },
      { title: "Tillsammans", author: "Eva Ek", image: "/tillsammans.png" },
    ],
  },
  {
    id: "4",
    name: "Färger",
    books: [
      { title: "Röd, gul, blå", author: "Fanny Färg", image: "/rod-gul-bla.png" },
    ],
  },
]
