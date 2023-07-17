import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode.react";

const QRCodeGeneratorSVG = () => {
  const [text, setText] = useState("");
  const qrCodeRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDownload = () => {
    const svg = qrCodeRef.current.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);

      const downloadLink = document.createElement("a");
      downloadLink.href = `data:image/svg+xml;base64,${btoa(svgData)}`;
      downloadLink.download = "qrcode.svg";
      downloadLink.click();
    }
  };

  useEffect(() => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current.querySelector("svg");
      if (svg) {
        svg.setAttribute("viewBox", "-50 -50 200 200");
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-8 bg-gradient-to-br from-purple-900 to-yellow-100 text-white py-8">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <div className="w-64 px-4 py-2 bg-purple-700 rounded-md mb-4">
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-white"
          placeholder="Enter text"
          value={text}
          onChange={handleChange}
        />
      </div>
      {text && (
        <div className="flex flex-col items-center bg-white p-4 rounded-lg">
          <div ref={qrCodeRef} className="mb-4">
            <QRCode value={text} renderAs="svg" />
          </div>
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-md"
            onClick={handleDownload}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGeneratorSVG;
