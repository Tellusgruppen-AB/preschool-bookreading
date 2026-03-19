"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import BookMenu from "./BookMenu";

export default function Crowd() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CrowdContent />
    </Suspense>
  );
}

function CrowdContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const [crowdRows, setCrowdRows] = React.useState([
    {
      key: "C",
      label: "Completion prompts",
      color: "bg-amber-300",
      questions: [
        "Vad hände sen?",
        "Hur slutade berättelsen?",
        "Vad tror du händer efteråt?",
      ],
    },
    {
      key: "R",
      label: "Recall",
      color: "bg-lime-200",
      questions: [
        "Vad minns du från boken?",
        "Kan du berätta vad som hände?",
        "Vilka karaktärer kommer du ihåg?",
      ],
    },
    {
      key: "O",
      label: "Open ended questions",
      color: "bg-sky-200",
      questions: [
        "Hur tror du att ...?",
        "Vad skulle du ha gjort?",
        "Hur kände sig karaktären?",
      ],
    },
    {
      key: "W",
      label: "What? Where? Why?",
      color: "bg-pink-200",
      questions: [
        "Varför gjorde karaktären så?",
        "Var utspelade sig berättelsen?",
        "Vad hände först?",
      ],
    },
    {
      key: "D",
      label: "Distancing prompts",
      color: "bg-purple-200",
      questions: [
        "I boken kommer djuren hem till Knutte och vill vara i huset. Har du haft någon hemma hos dig någon gång? Hur kändes det?",
        "Känner du igen dig i någon?",
        "Har du hört något liknande förut?",
      ],
    },
  ]);

  const [openRows, setOpenRows] = React.useState(
    Array(crowdRows.length).fill(false),
  );

  const handleRowClick = (idx: number) => {
    setOpenRows((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  // Dialog state
  const [showDialog, setShowDialog] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState("");
  const [rowError, setRowError] = React.useState(false);

  // Print dialog state
  const [showPrintDialog, setShowPrintDialog] = React.useState(false);
  const [printWhat, setPrintWhat] = React.useState<string>("all");
  const [printHow, setPrintHow] = React.useState<"list" | "cards">("list");

  const createNewQuestion = () => {
    setSelectedRow("");
    setRowError(false);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setNewQuestion("");
    setSelectedRow("");
    setRowError(false);
  };

  const getColorHex = (key: string): string => {
    switch (key) {
      case "C":
        return "#fcd34d";
      case "R":
        return "#d4fc79";
      case "O":
        return "#7dd3fc";
      case "W":
        return "#fbcfe8";
      case "D":
        return "#e9d5ff";
      default:
        return "#f0f0f0";
    }
  };

  const handlePrint = () => {
    const isCardFormat = printHow === "cards";
    const printContent = document.createElement("div");

    let htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CROWD-frågor${title ? ` - ${title}` : ""}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
              background-color: #f5f5f5;
            }
            h1 {
              font-size: 24px;
            }
            .book-title {
              font-size: 16px;
              color: #666;
              margin-bottom: 50px;
            }
            ${
              isCardFormat
                ? `
            .cards-container {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin-top: 20px;
            }
            .card {
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              page-break-inside: avoid;
              line-height: 1.6;
              font-size: 14px;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .card-category {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 8px;
            }
            @media (max-width: 800px) {
              .cards-container {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media print {
              body {
                background-color: white;
              }
              .cards-container {
                grid-template-columns: repeat(3, 1fr);
              }
            }
            `
                : `
            .category {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
            .category-header {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 2px solid #333;
            }
            .question {
              margin-left: 20px;
              margin-bottom: 8px;
              line-height: 1.6;
            }
            .question:before {
              content: "• ";
              font-weight: bold;
            }
            @media print {
              body {
                padding: 0;
              }
            }
            `
            }
          </style>
        </head>
        <body>
          <h1>CROWD-frågor</h1>
          ${title ? `<p class="book-title">Bok: ${title}</p>` : ""}
    `;

    if (isCardFormat) {
      if (printWhat === "all") {
        crowdRows.forEach((row) => {
          htmlContent += `
            <div class="category-section">
              <h2 style="font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #333;">
                <span style="font-size: 20px;">${row.key}</span> ${row.label}
              </h2>
              <div class="cards-container">
                ${row.questions
                  .map(
                    (question) => `
                  <div class="card" style="background-color: ${getColorHex(row.key)};">
                    <div>${question}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
          `;
        });
      } else {
        const selectedIdx = parseInt(printWhat?.replace("row-", "") || "0");
        const selectedRow = crowdRows[selectedIdx];
        htmlContent += `
          <div class="category-section">
            <h2 style="font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #333;">
              <span style="font-size: 20px;">${selectedRow.key}</span> ${selectedRow.label}
            </h2>
            <div class="cards-container">
              ${selectedRow.questions
                .map(
                  (question) => `
                <div class="card" style="background-color: ${getColorHex(selectedRow.key)};">
                  <div>${question}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
      }
    } else {
      // List format
      if (printWhat === "all") {
        htmlContent += crowdRows
          .map(
            (row) => `
          <div class="category">
            <div class="category-header"><span style="font-size: 20px;">${row.key}</span> ${row.label}</div>
            ${row.questions.map((q) => `<div class="question">${q}</div>`).join("")}
          </div>
          `,
          )
          .join("");
      } else {
        const selectedIdx = parseInt(printWhat?.replace("row-", "") || "0");
        const selectedRow = crowdRows[selectedIdx];
        htmlContent += `
          <div class="category">
            <div class="category-header"><span style="font-size: 20px;">${selectedRow.key}</span> ${selectedRow.label}</div>
            ${selectedRow.questions.map((q) => `<div class="question">${q}</div>`).join("")}
          </div>
        `;
      }
    }

    htmlContent += `
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Stäng tooltipen när användaren skriver eller väljer rubrik
  React.useEffect(() => {
    if (
      rowError &&
      newQuestion.trim() &&
      selectedRow !== "" &&
      !isNaN(Number(selectedRow))
    ) {
      setRowError(false);
    }
  }, [newQuestion, selectedRow]);

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRowError(false);
    if (selectedRow === "" || isNaN(Number(selectedRow))) {
      setRowError(true);
      return;
    }
    if (newQuestion.trim()) {
      const rowIdx = Number(selectedRow);
      setCrowdRows((prev) =>
        prev.map((row, idx) =>
          idx === rowIdx
            ? { ...row, questions: [...row.questions, newQuestion] }
            : row,
        ),
      );
      // Öppna raden där frågan lades till
      setOpenRows((prev) =>
        prev.map((open, idx) => (idx === rowIdx ? true : open)),
      );
      handleDialogClose();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Link href="/" className="self-start">
        <Button variant="ghost" className="ml-4 mt-4 cursor-pointer">
          <ArrowLeft /> Bokhyllor
        </Button>
      </Link>
      <div className="flex justify-between w-full mb-5 px-[20%]">
        <div>
          <h1 className="text-2xl font-bold self-start">CROWD-frågor</h1>
          {title && (
            <div className="text-lg text-gray-600 self-start">{title}</div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={createNewQuestion}
          >
            Skapa ny fråga
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setShowPrintDialog(true)}
          >
            Skriv ut
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full items-center">
        {crowdRows.map((row, idx) => (
          <div
            key={row.key}
            className={`w-[60%] transition-colors duration-500 ease-in-out mb-2`}
          >
            <div
              className={`${row.color} rounded-lg cursor-pointer flex flex-col relative z-10`}
              onClick={() => handleRowClick(idx)}
            >
              <div className="flex items-center justify-between rounded-lg px-6 py-2 relative z-20 bg-opacity-100">
                <span className="text-lg font-medium">
                  <span className="font-bold text-2xl">{row.key}</span>
                  {row.label.slice(1)}
                </span>
                {openRows[idx] ? <ChevronDown /> : <ChevronRight />}
              </div>
            </div>
            <AnimatePresence>
              {openRows[idx] && (
                <motion.div
                  className="flex flex-col gap-1 relative z-0 -mt-6"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {row.questions.map((q, qIdx) => (
                    <motion.div
                      key={qIdx}
                      className={`rounded-lg py-4 px-8 text-sm text-gray-700 ${
                        row.key === "C"
                          ? "bg-amber-100"
                          : row.key === "R"
                            ? "bg-lime-100"
                            : row.key === "O"
                              ? "bg-sky-100"
                              : row.key === "W"
                                ? "bg-pink-100"
                                : row.key === "D"
                                  ? "bg-purple-100"
                                  : ""
                      } ${qIdx === 0 ? "pt-10" : ""}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, delay: qIdx * 0.07 }}
                    >
                      {q}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Dialog/modal för ny fråga */}
      {showDialog && (
        <TooltipProvider>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <form
              onSubmit={handleDialogSubmit}
              className="bg-white rounded-lg shadow-lg p-12 flex flex-col gap-6 min-w-105 max-w-[90vw] w-120"
            >
              <div className="flex justify-between items-start w-full mb-2">
                <label htmlFor="new-question" className="font-semibold">
                  Ny fråga
                </label>
                <div className="flex flex-col items-end">
                  <Tooltip open={rowError} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <select
                        id="row-select"
                        className={`border rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-45`}
                        value={selectedRow}
                        onChange={(e) => setSelectedRow(e.target.value)}
                      >
                        <option value="" disabled>
                          Välj rubrik...
                        </option>
                        {crowdRows.map((row, idx) => (
                          <option value={idx} key={row.key}>
                            {row.label}
                          </option>
                        ))}
                      </select>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className=" text-white">
                      Välj en rubrik innan du sparar
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <textarea
                id="new-question"
                className="border rounded px-4 py-3 min-h-20 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                autoFocus
                rows={3}
                placeholder="Skriv din fråga här..."
              />
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDialogClose}
                  className="cursor-pointer"
                >
                  Avbryt
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={newQuestion.trim() === ""}
                  className="cursor-pointer"
                >
                  Spara
                </Button>
              </div>
            </form>
          </div>
        </TooltipProvider>
      )}

      {/* Dialog/modal för utskrift */}
      {showPrintDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-12 flex flex-col gap-6 min-w-105 max-w-[90vw] w-120">
            <div>
              <h2 className="font-semibold text-lg">Skriv ut CROWD-frågor</h2>
            </div>

            {/* Format section - at top */}
            <div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setPrintHow("list")}
                  variant={printHow === "list" ? "default" : "outline"}
                  className={`flex-1 cursor-pointer ${
                    printHow === "list"
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  Lista
                </Button>
                <Button
                  onClick={() => setPrintHow("cards")}
                  variant={printHow === "cards" ? "default" : "outline"}
                  className={`flex-1 cursor-pointer ${
                    printHow === "cards"
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : ""
                  }`}
                >
                  Kort
                </Button>
              </div>
            </div>

            {/* Categories section - below */}
            <div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPrintWhat("all")}>
                  <Checkbox
                    checked={printWhat === "all"}
                    onCheckedChange={() => setPrintWhat("all")}
                  />
                  <span>Alla kategorier</span>
                </div>
                {crowdRows.map((row, idx) => (
                  <div
                    key={row.key}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setPrintWhat(`row-${idx}`)}
                  >
                    <Checkbox
                      checked={printWhat === `row-${idx}`}
                      onCheckedChange={() => setPrintWhat(`row-${idx}`)}
                    />
                    <span>
                      <span className="font-bold">{row.key}</span> - {row.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowPrintDialog(false)}
                className="cursor-pointer"
              >
                Avbryt
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  handlePrint();
                  setShowPrintDialog(false);
                }}
                className="cursor-pointer"
              >
                Skriv ut
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
