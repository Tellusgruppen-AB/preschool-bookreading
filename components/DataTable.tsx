"use client"
import * as React from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link"


import { ChevronDown, ChevronRight } from "lucide-react"

import { columns, data, Bookshelf } from "@/data/bookshelves"


export function DataTable() {
  const [tableData] = useState<Bookshelf[]>(data)
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const handleExpandRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex justify-center w-full py-8">
      <div className="w-full max-w-3xl rounded-md border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
              {/* Expand/collapse kolumn till höger */}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  onClick={() => handleExpandRow(row.id)}
                  className="cursor-pointer"
                  tabIndex={0}
                  aria-expanded={expandedRows[row.id] ? "true" : "false"}
                >
                  {columns.map((column) => (
                    <TableCell key={column.accessorKey}>
                      {column.accessorKey === "books"
                        ? row.books.length
                        : row[column.accessorKey as keyof Bookshelf] as React.ReactNode}
                    </TableCell>
                  ))}
                  {/* Expand/collapse cell till höger */}
                  <TableCell className="text-right">
                    <button
                      aria-label={expandedRows[row.id] ? "Stäng" : "Öppna"}
                      className="text-lg px-2 focus:outline-none"
                      onClick={e => { e.stopPropagation(); handleExpandRow(row.id); }}
                      tabIndex={-1}
                    >
                      {expandedRows[row.id] ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
                {expandedRows[row.id] && row.books.map((book, idx) => (
                  <TableRow key={row.id + "-book-" + idx} className="bg-muted">
                    <TableCell colSpan={columns.length + 1} className="pl-12 py-2 text-sm text-muted-foreground">
                      <Link href={`/bookmenu?title=${encodeURIComponent(book.title)}`}>
                        <span className="font-medium">{book.title}</span> <span className="ml-2">av {book.author}</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
