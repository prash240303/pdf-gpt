import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  console.log("pdf_url itthe ", pdf_url);
  return (
    // <iframe
    //   src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
    //   className="w-full"
    // ></iframe>
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full"
    ></iframe>
  );
};

export default PDFViewer;

// "use client";
// import React from 'react';
// import { Document, Page, GlobalWorkerOptions } from 'react-pdf/dist/esm/entry.webpack';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// type Props = {
//   pdf_url: string;
// };

// const PDFViewer = ({ pdf_url }: Props) => {
//   // const [pageNumber, setPageNumber] = React.useState(1);

//   // function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//   //   setNumPages(numPages);
//   // }

//   GlobalWorkerOptions.workerSrc = `https://mozilla.github.io/pdf.js/build/pdf.worker.js`;

//   return (
//     <div>
//       <Document
//         file={pdf_url}
//         // onLoadSuccess={onDocumentLoadSuccess}
//         onLoadError={(error) => console.error('Error loading PDF:', error)}
//       >
//         {/* <Page pageNumber={pageNumber} /> */}
//       </Document>

//     </div>
//   );
// };

// export default PDFViewer;

// "use client";
// import { Viewer, Worker } from "@react-pdf-viewer/core";

// export default function PDFViewer({ pdf_url }: { pdf_url: string }) {
//   return (
//     <div className="h-[740px] w-[100%] overflow-hidden">
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
//         <Viewer fileUrl={pdf_url}  />
//       </Worker>
//     </div>
//   );
// }

// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const PDFViewer = () => {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   return (
//     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
//       <div style={{ height: "750px" }}>
//         <Viewer
//           fileUrl="/pdf-open-parameters.pdf"
//           plugins={[defaultLayoutPluginInstance]}
//         />
//       </div>
//     </Worker>
//   );
// };

// export default  PDFViewer;

// "use client";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// interface PDFViewerProps {
//     pdf_url: string;
// }

// const PDFViewer = ({ pdf_url }: PDFViewerProps) => {
//     const defaultLayoutPluginInstance = defaultLayoutPlugin();
//     return (
//         <div className="h-screen w-screen">
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
//                 <Viewer
//                     fileUrl={pdf_url}
//                     plugins={[defaultLayoutPluginInstance]}
//                 />
//             </Worker>
//         </div>
//     );
// };
// export default PDFViewer;
