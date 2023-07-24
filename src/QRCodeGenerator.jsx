import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import KHQRLogo from "./assets/qr-code.svg";
import KHLogo from "./assets/base_logo_transparent_background.png";

const QRCodeGenerator = () => {
  const [text, setText] = useState(window.location.href);
  const [qrwidth, setQrwidth] = useState(250);
  const [logowidth, setLogowidth] = useState(50);
  const [logo, setLogo] = useState(null);
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  const qrCodeRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDownload = () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");
    if (canvas) {
      const context = canvas.getContext("2d");
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");

      const downloadCanvas = document.createElement("canvas");
      const downloadContext = downloadCanvas.getContext("2d");
      const margin = 2; // Set the desired margin size (in pixels)
      const downloadSize = canvas.width + margin * 2;

      downloadCanvas.width = downloadSize;
      downloadCanvas.height = downloadSize;

      // Fill the canvas with white color
      downloadContext.fillStyle = "#FFFFFF";
      downloadContext.fillRect(0, 0, downloadSize, downloadSize);

      // Draw the QR code on the canvas with the desired margin
      downloadContext.drawImage(canvas, margin, margin);

      // Convert the modified canvas to a data URL
      const downloadDataUrl = downloadCanvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = downloadDataUrl;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    }
  };

  const handleLogoUpload = (e) => {
    const uploadedLogo = e.target.files[0];
    setLogo(URL.createObjectURL(uploadedLogo));
  };

  const imageSettings = {
    src: logo,
    excavate: true,
    height: logowidth,
    width: logowidth,
  };
  const [qrCodeDotStyle, setQrCodeDotStyle] = useState({
    fill: "#000000", // Set the dot color
    shapeRendering: "crispEdges", // Set the dot edges to be crisp
  });

  return (
    <div className="w-full min-h-screen h-fit flex flex-col items-center  bg-gradient-to-t from-primary via-purple-300 to-secondary  text-white py-8">
      <div className="flex w-full justify-between items-center mb-10 px-2 sm:px-24">
        <img src={KHLogo} className="w-2/5  sm:w-40 h-auto" />
        <div className="flex items-center w-3/5 sm:w-fit">
          <img src={KHQRLogo} className="w-2/5 h-auto sm:w-20 sm:h-20" />
          <h1 className="text-2xl font-bold text-primary w-20">
            Theeb QR Generator
          </h1>
        </div>
      </div>
      <div className="flex items-center  justify-between gap-2  flex-col lg:flex-row w-full px-2 sm:px-24">
        <div className="w-full md:w-64 px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
          <label>QR Link</label>
          <input
            type="text"
            className="w-full bg-transparent border outline-none text-white p-2"
            placeholder="Enter text"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-64 px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
          <label>QR Size</label>
          <input
            placeholder="Enter qr width"
            type="number"
            className="w-full bg-transparent border outline-none text-white p-2"
            min={250}
            max={2000}
            value={qrwidth}
            onChange={(e) => {
              debugger;
              setQrwidth(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="w-full md:w-64 px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
          <label>Logo Size</label>
          <input
            placeholder="Enter qr width"
            type="number"
            className="w-full bg-transparent border outline-none text-white p-2"
            min={50}
            max={qrwidth / 3}
            value={logowidth}
            onChange={(e) => {
              setLogowidth(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="w-full md:w-64 px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
          <label>Logo Fill Color</label>
          <input
            placeholder="Enter qr color"
            className="w-full bg-transparent border outline-none text-white p-2"
            value={qrCodeDotStyle.fill}
            onChange={(e) => {
              setQrCodeDotStyle((prevState) => ({
                fill: e.target.value,
                shapeRendering: prevState.shapeRendering,
              }));
            }}
          />
        </div>
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>
      </div>
      {text && (
        <div className="flex flex-col items-center bg-white p-4 rounded-lg">
          <div ref={qrCodeRef} className="mb-4">
            {logo ? (
              <QRCode
                value={text}
                size={qrwidth}
                fgColor={
                  regex.test(qrCodeDotStyle.fill)
                    ? qrCodeDotStyle.fill
                    : "#000000"
                }
                bgColor="#FFFFFF"
                imageSettings={imageSettings}
                dotStyle={qrCodeDotStyle}
              />
            ) : (
              <QRCode
                value={text}
                size={qrwidth}
                fgColor={
                  regex.test(qrCodeDotStyle.fill)
                    ? qrCodeDotStyle.fill
                    : "#000000"
                }
                bgColor="#FFFFFF"
                dotStyle={qrCodeDotStyle}
              />
            )}
          </div>
          <p className="text-gray-500 text-sm">Scan the QR code above</p>
          <button
            className="bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 text-white px-4 py-2 rounded-md"
            onClick={handleDownload}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
