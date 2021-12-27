/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/***/ (() => {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar ListadoHabilidades = /*#__PURE__*/_createClass(function ListadoHabilidades() {\n  var _this = this;\n\n  _classCallCheck(this, ListadoHabilidades);\n\n  _defineProperty(this, \"exits\", function () {\n    if (_this.skills) {\n      return true;\n    }\n\n    return false;\n  });\n\n  _defineProperty(this, \"skillsEvent\", function () {\n    _this.skills.addEventListener(\"click\", _this.agregarSkills);\n  });\n\n  _defineProperty(this, \"agregarSkills\", function (e) {\n    if (e.target.tagName == \"LI\") {\n      if (e.target.classList.contains(\"activo\")) {\n        e.target.classList.remove(\"activo\");\n\n        _this.skillsList[\"delete\"](e.target.textContent);\n      } else {\n        _this.skillsList.add(e.target.textContent);\n\n        e.target.classList.add(\"activo\");\n      }\n    }\n\n    var data = _toConsumableArray(_this.skillsList);\n\n    document.querySelector(\"#skills\").value = data;\n  });\n\n  _defineProperty(this, \"skillsSeleccionadas\", function () {\n    var seleccionadas = Array.from(document.querySelectorAll(\".lista-conocimientos .activo\"));\n    seleccionadas.forEach(function (seleccion) {\n      _this.skillsList.add(seleccion.textContent);\n    });\n\n    var data = _toConsumableArray(_this.skillsList);\n\n    document.querySelector(\"#skills\").value = data;\n  });\n\n  this.skills = document.querySelector(\".lista-conocimientos\");\n  this.skillsList = new Set();\n});\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var listadoHabilidades = new ListadoHabilidades();\n  var alertas = document.querySelector(\".alertas\");\n\n  if (alertas) {\n    setTimeout(function () {\n      alertas.remove();\n    }, 3000);\n  }\n\n  if (listadoHabilidades.exits()) {\n    listadoHabilidades.skillsEvent();\n    listadoHabilidades.skillsSeleccionadas();\n  }\n});\n\n//# sourceURL=webpack://devjobsmaster/./public/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/app.js"]();
/******/ 	
/******/ })()
;