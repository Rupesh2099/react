"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _jsxRuntime = require("react/jsx-runtime");

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M11 20v-3H7v5h10v-5h-4.4L11 20z"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    fillOpacity: ".3",
    d: "M17 4h-3V2h-4v2H7v13h4v-2.5H9L13 7v5.5h2L12.6 17H17V4z"
  })]
}), 'BatteryCharging20Sharp');

exports.default = _default;