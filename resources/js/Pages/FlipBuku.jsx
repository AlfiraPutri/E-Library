import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Set the worker to the provided worker in the `pdfjs-dist` package
pdfjs . GlobalWorkerOptions . workerSrc  =  `//unpkg.com/pdfjs-dist@ ${ pdfjs . version } /build/pdf.worker.min.mjs` ;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            <div>{props.children}</div>
            <div>Page number: {props.number}</div>
        </div>
    );
});

Pages.displayName = 'Pages';

function Flipbook() {
    const { id } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const flipBookRef = useRef();

    // Fetch PDF URL dari API
    useEffect(() => {
        const fetchPdfUrl = async () => {
            try {
                const response = await axios.get(`http://perpustakaan.bapekom6sby.com/api/buku/${id}/show`);
                const fileUrl = `http://perpustakaan.bapekom6sby.com${response.data.file_upload}`;
                setPdfUrl(fileUrl);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        fetchPdfUrl();
    }, [id]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const goToPage = (page) => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().turnToPage(page - 1);
            setCurrentPage(page);
        }
    };

    return (
        <div className='w-screen p-10 flex flex-col gap-100 justify-center items-center bg-gray-900 overflow-hidden'>
            {/* <h1 className='text-3xl text-white text-center font-bold'>FlipBook</h1> */}
            {pdfUrl && (
                <>
                <HTMLFlipBook width={400} height={570} ref={flipBookRef} onFlip={(e) => setCurrentPage(e.data + 1)}>
                    {
                        [...Array(numPages).keys()].map((pNum) => (
                            <Pages key={pNum} number={pNum + 1}>
                                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pNum + 1} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
                                </Document>
                                <div>Page {pNum + 1} of {numPages}</div>
                            </Pages>
                        ))
                    }
                </HTMLFlipBook>
                <div className="flex items-center justify-center gap-4 mt-4">
                <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500"
            >
                Previous page
            </button>
            <div className="text-white">
                            [{currentPage} of {numPages}]
                        </div>
             <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === numPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500"
                        >
                            Next page
                        </button>
                        </div>

            </>
            )}

        </div>
    );
}

export default Flipbook;
