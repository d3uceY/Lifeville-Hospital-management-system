import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function PrintWrapper({
  triggerLabel = "Print",
  children,
  documentTitle = "Document"
}) {

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get the content to print
    const printContent = document.getElementById('print-content');
    
    if (!printContent) {
      console.error('Print content not found');
      return;
    }

    // Write the HTML structure to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            
            @media print {
              body {
                font-family: serif;
                font-size: 12pt;
                line-height: 1.4;
                color: black !important;
                margin: 0;
                padding: 20px;
              }
              
              * {
                color: black !important;
                background: white !important;
              }
              
              h1, h2, h3 {
                color: black !important;
                page-break-after: avoid;
              }
              
              .page-break {
                page-break-before: always;
              }
            }
            
            body {
              font-family: serif;
              font-size: 14px;
              line-height: 1.6;
              color: black;
              margin: 0;
              padding: 20px;
            }
            
            h1, h2, h3 {
              color: black;
              margin-bottom: 10px;
            }
            
            hr {
              border: none;
              border-top: 1px solid #ccc;
              margin: 10px 0;
            }
            
            strong {
              font-weight: bold;
            }
            
            ul {
              margin: 6px 0 12px 20px;
            }
            
            li {
              margin: 2px 0;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait a moment for content to load, then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <>
      <Button
        variant="outline"
        className="action-download-btn"
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" />
        {triggerLabel}
      </Button>

      {/* Hidden content for printing */}
      <div 
        id="print-content" 
        style={{ display: 'none' }}
      >
        {children}
      </div>
    </>
  );
}