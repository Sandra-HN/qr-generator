import React from "react";
import {
  //   Slider,
  Sketch,
  //   Material,
  //   Colorful,
  //   Compact,
  //   Circle,
  //   Wheel,
  //   Block,
  //   Github,
  //   Chrome,
} from "@uiw/react-color";
// import {
//   Alpha,
//   Hue,
//   ShadeSlider,
//   Saturation,
//   Interactive,
//   hsvaToHslaString,
// } from "@uiw/react-color";
// import {
//   EditableInput,
//   EditableInputRGBA,
//   EditableInputHSLA,
// } from "@uiw/react-color";
export const ColorPicker = ({ hex, setHex, setClose }) => {
  return (
    <div
      style={{
        maxWidth: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <button
        class="bg-transparent font-semibold py-2 px-4  rounded w-fit"
        onClick={() => {
          setClose(false);
        }}
      >
        <svg
          class="h-3 w-3 text-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <Sketch
        style={{
          width: "100%",
        }}
        disableAlpha={true}
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </div>
  );
};
