import React, { useState, useRef } from "react";
import { QRCode } from "@jackybaby/react-custom-qrcode";
import KHQRLogo from "./assets/qr-code.svg";
import KHLogo from "./assets/base_logo_transparent_background.png";
import { ColorPicker } from "./ColorPicker";

const CustomQRCodeGenerator = () => {
  const [text, setText] = useState("https://khaledaltheeb.com/find-us");
  const [qrwidth, setQrwidth] = useState(250);
  const [logowidth, setLogowidth] = useState(50);
  const [quietZone, setQuietZone] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [showBGColorPicker, setShowBGColorPicker] = useState(false);
  const [showDotColorPicker, setShowDotColorPicker] = useState(false);
  const [showEyeColorPicker, setShowEyeColorPicker] = useState(false);
  const [showEyeInnerColorPicker, setShowEyeInnerColorPicker] = useState(false);
  const [showEyeOuterColorPicker, setShowEyeOuterColorPicker] = useState(false);
  const [logo, setLogo] = useState(null);
  const [ecLevel, setEcLevel] = useState("H");
  const [qrStyle, setQrStyle] = useState("squares");
  const [eyeColorType, setEyeColorType] = useState(true);
  //radius
  const [eyeRadius, setEyeRadius] = useState(0);

  //top left
  const [eyeRadiusTopLeft, setEyeRadiusTopLeft] = useState(0);

  const [eyeRadiusTopLeftTL, setEyeRadiusTopLeftTL] = useState(0);
  const [eyeRadiusTopLeftTR, setEyeRadiusTopLeftTR] = useState(0);
  const [eyeRadiusTopLeftBL, setEyeRadiusTopLeftBL] = useState(0);
  const [eyeRadiusTopLeftBR, setEyeRadiusTopLeftBR] = useState(0);
  const [eyeRadiusTopLeftInner, setEyeRadiusTopLeftInner] = useState(0);
  const [eyeRadiusTopLeftOuter, setEyeRadiusTopLeftOuter] = useState(0);

  //top right
  const [eyeRadiusTopRight, setEyeRadiusTopRight] = useState(0);
  const [eyeRadiusTopRightTL, setEyeRadiusTopRightTL] = useState(0);
  const [eyeRadiusTopRightTR, setEyeRadiusTopRightTR] = useState(0);
  const [eyeRadiusTopRightBL, setEyeRadiusTopRightBL] = useState(0);
  const [eyeRadiusTopRightBR, setEyeRadiusTopRightBR] = useState(0);

  const [eyeRadiusBottomLeft, setEyeRadiusBottomLeft] = useState(0);
  const [eyeRadiusBottomLeftTL, setEyeRadiusBottomLeftTL] = useState(0);
  const [eyeRadiusBottomLeftTR, setEyeRadiusBottomLeftTR] = useState(0);
  const [eyeRadiusBottomLeftBL, setEyeRadiusBottomLeftBL] = useState(0);
  const [eyeRadiusBottomLeftBR, setEyeRadiusBottomLeftBR] = useState(0);

  const [eyeRadiusCustom, setEyeRadiusCustom] = useState(false);
  const [eyeRadiusTopLeftCustom, setEyeRadiusTopLeftCustom] = useState(false);

  const [eyeRadiusTopRightCustom, setEyeRadiusTopRightCustom] = useState(false);
  const [eyeRadiusBottomLeftCustom, setEyeRadiusBottomLeftCustom] =
    useState(false);

  const regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  const qrCodeRef = useRef(null);
  const qrCodeRef1 = useRef(null);

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
      downloadContext.fillStyle = qrCodeBGStyle;
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

  const [qrCodeDotStyle, setQrCodeDotStyle] = useState(
    "#000000" // Set the dot color
  );
  const [qrCodeBGStyle, setQrCodeBGStyle] = useState(
    "#FFFFFF00" // Set the dot color
  );
  const [qrEyeColor, setQrEyeColor] = useState(
    "#000000" // Set the dot color
  );
  const [qrEyeInnerColor, setQrEyeInnerColor] = useState("#000000");
  const [qrEyeOuterColor, setQrEyeOuterColor] = useState("#000000");
  const [hasLogo, setHasLogo] = useState(false);
  return (
    <div className="w-full min-h-screen h-fit flex flex-col items-center  bg-gradient-to-t from-primary via-purple-300 to-secondary  text-white py-4">
      <div className="flex w-full justify-between items-center mb-10 px-2 sm:px-24">
        <a
          href={"https://khaledaltheeb.com/find-us"}
          target="_blank"
          className="w-fit h-auto"
        >
          <img src={KHLogo} className="w-auto  h-28" />
        </a>
        <div className="flex items-center sm:flex-row flex-col w-fit">
          <img src={KHQRLogo} className="w-auto h-24 sm:w-20 sm:h-20" />
          <h1 className="sm:text-2xl text-sm font-bold text-primary w-full sm:w-20">
            QR Generator
          </h1>
        </div>
      </div>
      <div className="flex gap-y-4 lg:flex-row flex-col-reverse justify-between w-full px-4">
        <div
          className="flex gap-x-2 lg:flex-row flex-col justify-between  w-full lg:w-8/12"
          // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full px-2 sm:px-24"
        >
          <div className="w-full ">
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR Link</label>
              <input
                type="text"
                className="w-full bg-transparent border outline-none text-white p-2"
                placeholder="Enter text"
                value={text}
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR Style</label>
              <select
                value={qrStyle}
                className="w-full bg-transparent border outline-none text-white p-2"
                placeholder="Enter text"
                onChange={(e) => {
                  setQrStyle(e.target.value);
                }}
              >
                <option
                  className="w-full bg-primary border outline-none text-white p-2"
                  value={"dots"}
                  key={"dots"}
                >
                  Dots
                </option>
                <option
                  className="w-full bg-primary border outline-none text-white p-2"
                  value={"squares"}
                  key={"squares"}
                >
                  Squares
                </option>
              </select>
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR EC</label>
              <select
                value={ecLevel}
                className="w-full bg-transparent border outline-none text-white p-2"
                placeholder="Enter text"
                onChange={(e) => {
                  setEcLevel(e.target.value);
                }}
              >
                <option
                  className="w-full bg-primary border outline-none text-white p-2"
                  value={"L"}
                  key={"L"}
                >
                  L
                </option>
                <option
                  className="w-full bg-primary border outline-none text-white p-2"
                  value={"M"}
                  key={"M"}
                >
                  M
                </option>
                <option
                  className="w-full bg-primary border outline-none text-white p-2"
                  value={"Q"}
                  key={"Q"}
                >
                  Q
                </option>
                <option
                  className="w-full bg-primary border outline-none text-white p-2"
                  value={"H"}
                  key={"H"}
                >
                  H
                </option>
              </select>
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR Size</label>
              <input
                placeholder="Enter qr width"
                type="number"
                className="w-full bg-transparent border outline-none text-white p-2"
                min={250}
                max={2000}
                value={qrwidth}
                onChange={(e) => {
                  setQrwidth(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR border</label>
              <input
                placeholder="Enter qr width"
                type="number"
                className="w-full bg-transparent border outline-none text-white p-2"
                min={0}
                max={logowidth * 0.8}
                value={quietZone}
                onChange={(e) => {
                  setQuietZone(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label htmlFor="c3">
                <div class="flex w-full items-center active:ring-2 ring-black rounded">
                  <input
                    id="c3"
                    type="checkbox"
                    className="appearance-none rounded-full h-3 w-3 cursor-pointer bg-secondary border-secondary text-primary focus:ring-primary outline-none focus:ring-2 checked:bg-primary"
                    checked={eyeRadiusCustom}
                    onClick={(e) => {
                      setEyeRadiusCustom(e.target.checked);
                    }}
                  />
                  <p className="pl-2 text-reg cursor-pointer  decoration-solid">
                    Advanced Radius
                  </p>
                </div>
              </label>
              {!eyeRadiusCustom && (
                <>
                  <label>Eye Radius</label>
                  <input
                    placeholder="Enter qr eye radius"
                    className="w-full bg-transparent border outline-none text-white p-2"
                    type="number"
                    min={0}
                    max={99}
                    value={eyeRadius}
                    onChange={(e) => {
                      setEyeRadius(parseInt(e.target.value));
                    }}
                  />
                </>
              )}
            </div>
            {eyeRadiusCustom && (
              <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
                <div className="flex flex-col">
                  <label htmlFor="tf">
                    <div class="flex w-full items-center active:ring-2 ring-black rounded">
                      <input
                        id="tf"
                        type="checkbox"
                        className="appearance-none rounded-full h-3 w-3 cursor-pointer bg-secondary border-secondary text-primary focus:ring-primary outline-none focus:ring-2 checked:bg-primary"
                        checked={eyeRadiusTopLeftCustom}
                        onClick={(e) => {
                          setEyeRadiusTopLeftCustom(e.target.checked);
                        }}
                      />
                      <p className="pl-2 text-reg cursor-pointer  decoration-solid">
                        Advanced Top/Left
                      </p>
                    </div>
                  </label>
                  {!eyeRadiusTopLeftCustom && (
                    <>
                      <label>Top/Left</label>

                      <input
                        type="number"
                        className="w-full bg-transparent border outline-none text-white p-2"
                        min={0}
                        max={99}
                        value={eyeRadiusTopLeft}
                        onChange={(e) => {
                          setEyeRadiusTopLeft(parseInt(e.target.value));
                        }}
                      />
                    </>
                  )}
                  <label htmlFor="tr">
                    <div class="flex w-full items-center active:ring-2 ring-black rounded">
                      <input
                        id="tr"
                        type="checkbox"
                        className="appearance-none rounded-full h-3 w-3 cursor-pointer bg-secondary border-secondary text-primary focus:ring-primary outline-none focus:ring-2 checked:bg-primary"
                        checked={eyeRadiusTopRightCustom}
                        onClick={(e) => {
                          setEyeRadiusTopRightCustom(e.target.checked);
                        }}
                      />
                      <p className="pl-2 text-reg cursor-pointer  decoration-solid">
                        Advanced Top/Right
                      </p>
                    </div>
                  </label>
                  {!eyeRadiusTopRightCustom && (
                    <>
                      <label>Top/Right</label>
                      <input
                        type="number"
                        className="w-full bg-transparent border outline-none text-white p-2"
                        min={0}
                        max={99}
                        value={eyeRadiusTopRight}
                        onChange={(e) => {
                          setEyeRadiusTopRight(parseInt(e.target.value));
                        }}
                      />
                    </>
                  )}
                  <label htmlFor="bl">
                    <div class="flex w-full items-center active:ring-2 ring-black rounded">
                      <input
                        id="bl"
                        type="checkbox"
                        className="appearance-none rounded-full h-3 w-3 cursor-pointer bg-secondary border-secondary text-primary focus:ring-primary outline-none focus:ring-2 checked:bg-primary"
                        checked={eyeRadiusBottomLeftCustom}
                        onClick={(e) => {
                          setEyeRadiusBottomLeftCustom(e.target.checked);
                        }}
                      />
                      <p className="pl-2 text-reg cursor-pointer  decoration-solid">
                        Advanced Bottom/Left
                      </p>
                    </div>
                  </label>
                  {!eyeRadiusBottomLeftCustom && (
                    <>
                      <label>Bottom/Left</label>
                      <input
                        type="number"
                        className="w-full bg-transparent border outline-none text-white p-2"
                        min={0}
                        max={99}
                        value={eyeRadiusBottomLeft}
                        onChange={(e) => {
                          setEyeRadiusBottomLeft(parseInt(e.target.value));
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label htmlFor="c2">
                <div class="flex w-full items-center active:ring-2 ring-black rounded">
                  <input
                    id="c2"
                    type="checkbox"
                    className="appearance-none rounded-full h-3 w-3 cursor-pointer bg-secondary border-secondary text-primary focus:ring-primary outline-none focus:ring-2 checked:bg-primary"
                    checked={hasLogo}
                    onClick={(e) => {
                      if (!e.target.checked) {
                        setLogo(null);
                      }
                      setHasLogo(e.target.checked);
                    }}
                  />
                  <p className="pl-2 text-reg cursor-pointer  decoration-solid">
                    Logo
                  </p>
                </div>
              </label>
              {hasLogo && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="fill-primary"
                />
              )}
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>Logo Size</label>
              <input
                placeholder="Enter qr width"
                type="number"
                className="w-full bg-transparent border outline-none text-white p-2"
                min={50}
                max={qrwidth}
                value={logowidth}
                onChange={(e) => {
                  setLogowidth(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>Logo Opacity</label>
              <input
                placeholder="Enter Logo Opacity"
                type="number"
                className="w-full bg-transparent border outline-none text-white p-2"
                min={0}
                max={1}
                step="0.1"
                value={logoOpacity}
                onChange={(e) => {
                  setLogoOpacity(parseFloat(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR Dots Color</label>
              {showDotColorPicker && (
                <ColorPicker
                  setClose={setShowDotColorPicker}
                  hex={qrCodeDotStyle}
                  setHex={setQrCodeDotStyle}
                />
              )}
              <div
                style={{
                  background: qrCodeDotStyle,
                  marginTop: 30,
                  padding: 10,
                }}
                onClick={() => {
                  setShowDotColorPicker(!showDotColorPicker);
                }}
              >
                {qrCodeDotStyle}
              </div>
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>QR Background Color</label>
              {showBGColorPicker && (
                <ColorPicker
                  setClose={setShowBGColorPicker}
                  hex={qrCodeBGStyle}
                  disableAlpha={false}
                  setHex={setQrCodeBGStyle}
                />
              )}
              <div
                style={{
                  background: qrCodeBGStyle,
                  marginTop: 30,
                  padding: 10,
                  border: `1px solid #fff`,
                }}
                onClick={() => {
                  setShowBGColorPicker(!showBGColorPicker);
                }}
              >
                {qrCodeBGStyle}
              </div>
            </div>
            <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
              <label>Eye Color</label>
              {eyeColorType ? (
                <>
                  {showEyeColorPicker && (
                    <ColorPicker
                      setClose={setShowEyeColorPicker}
                      hex={qrEyeColor}
                      setHex={setQrEyeColor}
                    />
                  )}
                  <div
                    style={{
                      background: qrEyeColor,
                      marginTop: 30,
                      padding: 10,
                    }}
                    onClick={() => {
                      setShowEyeColorPicker(!showEyeColorPicker);
                    }}
                  >
                    {qrEyeColor}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {showEyeInnerColorPicker && (
                    <ColorPicker
                      setClose={setShowEyeInnerColorPicker}
                      hex={qrEyeInnerColor}
                      setHex={setQrEyeInnerColor}
                    />
                  )}
                  <div
                    style={{
                      background: qrEyeInnerColor,
                      marginTop: 30,
                      padding: 10,
                    }}
                    onClick={() => {
                      setShowEyeInnerColorPicker(!showEyeInnerColorPicker);
                    }}
                  >
                    {qrEyeInnerColor}
                  </div>
                  {/* <input
                placeholder="Enter qr eye inner color"
                className="w-full bg-transparent border outline-none text-white p-2"
                value={qrEyeInnerColor}
                onChange={(e) => {
                  setQrEyeInnerColor(e.target.value);
                }}
              /> */}

                  {showEyeOuterColorPicker && (
                    <ColorPicker
                      setClose={setShowEyeOuterColorPicker}
                      hex={qrEyeOuterColor}
                      setHex={setQrEyeOuterColor}
                    />
                  )}
                  <div
                    style={{
                      background: qrEyeOuterColor,
                      marginTop: 30,
                      padding: 10,
                    }}
                    onClick={() => {
                      setShowEyeOuterColorPicker(!showEyeOuterColorPicker);
                    }}
                  >
                    {qrEyeOuterColor}
                  </div>
                  {/* <input
                placeholder="Enter qr eye outer color"
                className="w-full bg-transparent border outline-none text-white p-2"
                value={qrEyeOuterColor}
                onChange={(e) => {
                  setQrEyeOuterColor(e.target.value);
                }}
              /> */}
                </div>
              )}

              <div className="w-full bg-transparent  outline-none text-white p-2">
                <label htmlFor="c1">
                  <div class="flex w-full items-center active:ring-2 ring-black rounded">
                    <input
                      id="c1"
                      type="checkbox"
                      className="appearance-none rounded-full h-3 w-3 cursor-pointer bg-secondary border-secondary text-primary focus:ring-primary outline-none focus:ring-2 checked:bg-primary"
                      checked={eyeColorType}
                      onClick={(e) => {
                        setEyeColorType(e.target.checked);
                      }}
                    />
                    <p className="pl-2 text-reg cursor-pointer  decoration-solid">
                      Inner/Outer
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {eyeRadiusCustom &&
            (eyeRadiusTopLeftCustom ||
              eyeRadiusTopRightCustom ||
              eyeRadiusBottomLeftCustom) && (
              <div className="w-full">
                {eyeRadiusCustom && eyeRadiusTopLeftCustom && (
                  <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
                    <label>Top/Left 1</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopLeftTL}
                      onChange={(e) => {
                        setEyeRadiusTopLeftTL(parseInt(e.target.value));
                      }}
                    />
                    <label>Top/Left 2</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopLeftTR}
                      onChange={(e) => {
                        setEyeRadiusTopLeftTR(parseInt(e.target.value));
                      }}
                    />
                    <label>Top/Left 3</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopLeftBL}
                      onChange={(e) => {
                        setEyeRadiusTopLeftBL(parseInt(e.target.value));
                      }}
                    />
                    <label>Top/Left 4</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopLeftBR}
                      onChange={(e) => {
                        setEyeRadiusTopLeftBR(parseInt(e.target.value));
                      }}
                    />
                  </div>
                )}
                {eyeRadiusCustom && eyeRadiusTopRightCustom && (
                  <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
                    <label>Top/Right 1</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopRightTL}
                      onChange={(e) => {
                        setEyeRadiusTopRightTL(parseInt(e.target.value));
                      }}
                    />
                    <label>Top/Right 2</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopRightTR}
                      onChange={(e) => {
                        setEyeRadiusTopRightTR(parseInt(e.target.value));
                      }}
                    />
                    <label>Top/Right 3</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopRightBL}
                      onChange={(e) => {
                        setEyeRadiusTopRightBL(parseInt(e.target.value));
                      }}
                    />
                    <label>Top/Right 4</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusTopRightBR}
                      onChange={(e) => {
                        setEyeRadiusTopRightBR(parseInt(e.target.value));
                      }}
                    />
                  </div>
                )}
                {eyeRadiusCustom && eyeRadiusBottomLeftCustom && (
                  <div className="w-full px-4 py-2 bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 rounded-md mb-4">
                    <label>Bottom/Left 1</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusBottomLeftTL}
                      onChange={(e) => {
                        setEyeRadiusBottomLeftTL(parseInt(e.target.value));
                      }}
                    />
                    <label>Bottom/Left 2</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusBottomLeftTR}
                      onChange={(e) => {
                        setEyeRadiusBottomLeftTR(parseInt(e.target.value));
                      }}
                    />
                    <label>Bottom/Left 3</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusBottomLeftBL}
                      onChange={(e) => {
                        setEyeRadiusBottomLeftBL(parseInt(e.target.value));
                      }}
                    />
                    <label>Bottom/Left 4</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border outline-none text-white p-2"
                      min={0}
                      max={99}
                      value={eyeRadiusBottomLeftBR}
                      onChange={(e) => {
                        setEyeRadiusBottomLeftBR(parseInt(e.target.value));
                      }}
                    />
                  </div>
                )}
              </div>
            )}
        </div>
        {text && (
          <div className=" w-full lg:w-3/12 flex flex-col items-center bg-transparent p-4 rounded-lg">
            <div ref={qrCodeRef1} className="mb-4">
              <QRCode
                qrStyle={qrStyle}
                id="cqr"
                quietZone={quietZone}
                removeQrCodeBehindLogo={false}
                logoOpacity={logoOpacity}
                logoImage={logo}
                size={250}
                logoHeight={(logowidth / qrwidth) * 250}
                logoWidth={(logowidth / qrwidth) * 250}
                eyeRadius={
                  eyeRadiusCustom
                    ? [
                        eyeRadiusTopLeftCustom
                          ? [
                              eyeRadiusTopLeftTL,
                              eyeRadiusTopLeftTR,
                              eyeRadiusTopLeftBL,
                              eyeRadiusTopLeftBR,
                            ]
                          : eyeRadiusTopLeft,
                        eyeRadiusTopRightCustom
                          ? [
                              eyeRadiusTopRightTL,
                              eyeRadiusTopRightTR,
                              eyeRadiusTopRightBL,
                              eyeRadiusTopRightBR,
                            ]
                          : eyeRadiusTopRight,
                        eyeRadiusBottomLeftCustom
                          ? [
                              eyeRadiusBottomLeftTL,
                              eyeRadiusBottomLeftTR,
                              eyeRadiusBottomLeftBL,
                              eyeRadiusBottomLeftBR,
                            ]
                          : eyeRadiusBottomLeft,
                      ]
                    : eyeRadius
                }
                // Color for each part of eyes
                eyeColor={
                  !eyeColorType
                    ? [
                        regex.test(qrEyeInnerColor)
                          ? qrEyeInnerColor
                          : "#000000",
                        regex.test(qrEyeOuterColor)
                          ? qrEyeOuterColor
                          : "#000000",
                      ]
                    : regex.test(qrEyeColor)
                    ? qrEyeColor
                    : "#000000"
                }
                value={text}
                ecLevel={ecLevel}
                fgColor={
                  regex.test(qrCodeDotStyle) ? qrCodeDotStyle : "#000000"
                }
                bgColor={qrCodeBGStyle}
              />
            </div>
            <div ref={qrCodeRef} className="mb-4 hidden">
              <QRCode
                qrStyle={qrStyle}
                id="cqr"
                quietZone={quietZone}
                removeQrCodeBehindLogo={false}
                logoOpacity={logoOpacity}
                logoImage={logo}
                size={qrwidth}
                logoHeight={logowidth}
                logoWidth={logowidth}
                eyeRadius={
                  eyeRadiusCustom
                    ? [
                        eyeRadiusTopLeftCustom
                          ? [
                              eyeRadiusTopLeftTL,
                              eyeRadiusTopLeftTR,
                              eyeRadiusTopLeftBL,
                              eyeRadiusTopLeftBR,
                            ]
                          : eyeRadiusTopLeft,
                        eyeRadiusTopRightCustom
                          ? [
                              eyeRadiusTopRightTL,
                              eyeRadiusTopRightTR,
                              eyeRadiusTopRightBL,
                              eyeRadiusTopRightBR,
                            ]
                          : eyeRadiusTopRight,
                        eyeRadiusBottomLeftCustom
                          ? [
                              eyeRadiusBottomLeftTL,
                              eyeRadiusBottomLeftTR,
                              eyeRadiusBottomLeftBL,
                              eyeRadiusBottomLeftBR,
                            ]
                          : eyeRadiusBottomLeft,
                      ]
                    : eyeRadius
                }
                // Color for each part of eyes
                eyeColor={
                  !eyeColorType
                    ? [
                        regex.test(qrEyeInnerColor)
                          ? qrEyeInnerColor
                          : "#000000",
                        regex.test(qrEyeOuterColor)
                          ? qrEyeOuterColor
                          : "#000000",
                      ]
                    : regex.test(qrEyeColor)
                    ? qrEyeColor
                    : "#000000"
                }
                value={text}
                ecLevel={ecLevel}
                fgColor={
                  regex.test(qrCodeDotStyle) ? qrCodeDotStyle : "#000000"
                }
                bgColor={qrCodeBGStyle}
              />
            </div>
            <p className="text-black text-sm">Scan the QR code above</p>
            <button
              className="bg-primary/40 backdrop-blur-lg border-r-2 border-2 border-primary/50 text-white px-4 py-2 rounded-md"
              onClick={handleDownload}
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomQRCodeGenerator;
