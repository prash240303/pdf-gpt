// import React from "react";

// type Props = { pdf_url: string };

// const PDFViewer = ({ pdf_url }: Props) => {
//   console.log("pdf_url itthe ", pdf_url);
//   return (
//     <iframe
//       src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
//       className="w-full"
//     ></iframe>
//   );
// };

// export default PDFViewer;

// "use client"
// import * as React from 'react';
// import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';

// import '@react-pdf-viewer/core/lib/styles/index.css';

// interface PDFViewerProps {
//     pdf_url: string;
// }

// const PDFViewer: React.FC<PDFViewerProps> = ({ pdf_url }) => {
//     return (
//         <div
//          className='h-[740px] w-[100%] overflow-hidden'
//         >
//             hi
//             {pdf_url}
//             {/* <Viewer fileUrl={pdf_url} defaultScale={SpecialZoomLevel.PageFit} /> */}
//         </div>
//     );
// };

// export default PDFViewer;



"use client";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
    pdf_url: string;
}


const PDFViewer = ({ pdf_url }: PDFViewerProps) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div className="h-screen w-screen">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={pdf_url}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};
export default PDFViewer;