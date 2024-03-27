import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  console.log("pdf_url itthe ", pdf_url);
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full"
      style={{ height: "calc(100vh - 12vh)" }} // Adjust the height as per your requirement
    ></iframe>
  );
};

export default PDFViewer;