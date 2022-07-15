(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/css/lib/parse/index.js
  var require_parse = __commonJS({
    "node_modules/css/lib/parse/index.js"(exports, module) {
      var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
      module.exports = function(css, options) {
        options = options || {};
        var lineno = 1;
        var column = 1;
        function updatePosition(str) {
          var lines = str.match(/\n/g);
          if (lines)
            lineno += lines.length;
          var i = str.lastIndexOf("\n");
          column = ~i ? str.length - i : column + str.length;
        }
        function position() {
          var start = { line: lineno, column };
          return function(node) {
            node.position = new Position(start);
            whitespace();
            return node;
          };
        }
        function Position(start) {
          this.start = start;
          this.end = { line: lineno, column };
          this.source = options.source;
        }
        Position.prototype.content = css;
        var errorsList = [];
        function error(msg) {
          var err = new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
          err.reason = msg;
          err.filename = options.source;
          err.line = lineno;
          err.column = column;
          err.source = css;
          if (options.silent) {
            errorsList.push(err);
          } else {
            throw err;
          }
        }
        function stylesheet() {
          var rulesList = rules();
          return {
            type: "stylesheet",
            stylesheet: {
              source: options.source,
              rules: rulesList,
              parsingErrors: errorsList
            }
          };
        }
        function open() {
          return match(/^{\s*/);
        }
        function close() {
          return match(/^}/);
        }
        function rules() {
          var node;
          var rules2 = [];
          whitespace();
          comments(rules2);
          while (css.length && css.charAt(0) != "}" && (node = atrule() || rule())) {
            if (node !== false) {
              rules2.push(node);
              comments(rules2);
            }
          }
          return rules2;
        }
        function match(re) {
          var m = re.exec(css);
          if (!m)
            return;
          var str = m[0];
          updatePosition(str);
          css = css.slice(str.length);
          return m;
        }
        function whitespace() {
          match(/^\s*/);
        }
        function comments(rules2) {
          var c;
          rules2 = rules2 || [];
          while (c = comment()) {
            if (c !== false) {
              rules2.push(c);
            }
          }
          return rules2;
        }
        function comment() {
          var pos = position();
          if (css.charAt(0) != "/" || css.charAt(1) != "*")
            return;
          var i = 2;
          while (css.charAt(i) != "" && (css.charAt(i) != "*" || css.charAt(i + 1) != "/"))
            ++i;
          i += 2;
          if (css.charAt(i - 1) === "") {
            return error("End of comment missing");
          }
          var str = css.slice(2, i - 2);
          column += 2;
          updatePosition(str);
          css = css.slice(i);
          column += 2;
          return pos({
            type: "comment",
            comment: str
          });
        }
        function selector() {
          var m = match(/^([^{]+)/);
          if (!m)
            return;
          return trim(m[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(m2) {
            return m2.replace(/,/g, "\u200C");
          }).split(/\s*(?![^(]*\)),\s*/).map(function(s) {
            return s.replace(/\u200C/g, ",");
          });
        }
        function declaration() {
          var pos = position();
          var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
          if (!prop)
            return;
          prop = trim(prop[0]);
          if (!match(/^:\s*/))
            return error("property missing ':'");
          var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
          var ret = pos({
            type: "declaration",
            property: prop.replace(commentre, ""),
            value: val ? trim(val[0]).replace(commentre, "") : ""
          });
          match(/^[;\s]*/);
          return ret;
        }
        function declarations() {
          var decls = [];
          if (!open())
            return error("missing '{'");
          comments(decls);
          var decl;
          while (decl = declaration()) {
            if (decl !== false) {
              decls.push(decl);
              comments(decls);
            }
          }
          if (!close())
            return error("missing '}'");
          return decls;
        }
        function keyframe() {
          var m;
          var vals = [];
          var pos = position();
          while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
            vals.push(m[1]);
            match(/^,\s*/);
          }
          if (!vals.length)
            return;
          return pos({
            type: "keyframe",
            values: vals,
            declarations: declarations()
          });
        }
        function atkeyframes() {
          var pos = position();
          var m = match(/^@([-\w]+)?keyframes\s*/);
          if (!m)
            return;
          var vendor = m[1];
          var m = match(/^([-\w]+)\s*/);
          if (!m)
            return error("@keyframes missing name");
          var name = m[1];
          if (!open())
            return error("@keyframes missing '{'");
          var frame;
          var frames = comments();
          while (frame = keyframe()) {
            frames.push(frame);
            frames = frames.concat(comments());
          }
          if (!close())
            return error("@keyframes missing '}'");
          return pos({
            type: "keyframes",
            name,
            vendor,
            keyframes: frames
          });
        }
        function atsupports() {
          var pos = position();
          var m = match(/^@supports *([^{]+)/);
          if (!m)
            return;
          var supports = trim(m[1]);
          if (!open())
            return error("@supports missing '{'");
          var style = comments().concat(rules());
          if (!close())
            return error("@supports missing '}'");
          return pos({
            type: "supports",
            supports,
            rules: style
          });
        }
        function athost() {
          var pos = position();
          var m = match(/^@host\s*/);
          if (!m)
            return;
          if (!open())
            return error("@host missing '{'");
          var style = comments().concat(rules());
          if (!close())
            return error("@host missing '}'");
          return pos({
            type: "host",
            rules: style
          });
        }
        function atmedia() {
          var pos = position();
          var m = match(/^@media *([^{]+)/);
          if (!m)
            return;
          var media = trim(m[1]);
          if (!open())
            return error("@media missing '{'");
          var style = comments().concat(rules());
          if (!close())
            return error("@media missing '}'");
          return pos({
            type: "media",
            media,
            rules: style
          });
        }
        function atcustommedia() {
          var pos = position();
          var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
          if (!m)
            return;
          return pos({
            type: "custom-media",
            name: trim(m[1]),
            media: trim(m[2])
          });
        }
        function atpage() {
          var pos = position();
          var m = match(/^@page */);
          if (!m)
            return;
          var sel = selector() || [];
          if (!open())
            return error("@page missing '{'");
          var decls = comments();
          var decl;
          while (decl = declaration()) {
            decls.push(decl);
            decls = decls.concat(comments());
          }
          if (!close())
            return error("@page missing '}'");
          return pos({
            type: "page",
            selectors: sel,
            declarations: decls
          });
        }
        function atdocument() {
          var pos = position();
          var m = match(/^@([-\w]+)?document *([^{]+)/);
          if (!m)
            return;
          var vendor = trim(m[1]);
          var doc = trim(m[2]);
          if (!open())
            return error("@document missing '{'");
          var style = comments().concat(rules());
          if (!close())
            return error("@document missing '}'");
          return pos({
            type: "document",
            document: doc,
            vendor,
            rules: style
          });
        }
        function atfontface() {
          var pos = position();
          var m = match(/^@font-face\s*/);
          if (!m)
            return;
          if (!open())
            return error("@font-face missing '{'");
          var decls = comments();
          var decl;
          while (decl = declaration()) {
            decls.push(decl);
            decls = decls.concat(comments());
          }
          if (!close())
            return error("@font-face missing '}'");
          return pos({
            type: "font-face",
            declarations: decls
          });
        }
        var atimport = _compileAtrule("import");
        var atcharset = _compileAtrule("charset");
        var atnamespace = _compileAtrule("namespace");
        function _compileAtrule(name) {
          var re = new RegExp("^@" + name + "\\s*([^;]+);");
          return function() {
            var pos = position();
            var m = match(re);
            if (!m)
              return;
            var ret = { type: name };
            ret[name] = m[1].trim();
            return pos(ret);
          };
        }
        function atrule() {
          if (css[0] != "@")
            return;
          return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface();
        }
        function rule() {
          var pos = position();
          var sel = selector();
          if (!sel)
            return error("selector missing");
          comments();
          return pos({
            type: "rule",
            selectors: sel,
            declarations: declarations()
          });
        }
        return addParent(stylesheet());
      };
      function trim(str) {
        return str ? str.replace(/^\s+|\s+$/g, "") : "";
      }
      function addParent(obj, parent) {
        var isNode = obj && typeof obj.type === "string";
        var childParent = isNode ? obj : parent;
        for (var k in obj) {
          var value = obj[k];
          if (Array.isArray(value)) {
            value.forEach(function(v) {
              addParent(v, childParent);
            });
          } else if (value && typeof value === "object") {
            addParent(value, childParent);
          }
        }
        if (isNode) {
          Object.defineProperty(obj, "parent", {
            configurable: true,
            writable: true,
            enumerable: false,
            value: parent || null
          });
        }
        return obj;
      }
    }
  });

  // node_modules/css/lib/stringify/compiler.js
  var require_compiler = __commonJS({
    "node_modules/css/lib/stringify/compiler.js"(exports, module) {
      module.exports = Compiler;
      function Compiler(opts) {
        this.options = opts || {};
      }
      Compiler.prototype.emit = function(str) {
        return str;
      };
      Compiler.prototype.visit = function(node) {
        return this[node.type](node);
      };
      Compiler.prototype.mapVisit = function(nodes, delim) {
        var buf = "";
        delim = delim || "";
        for (var i = 0, length = nodes.length; i < length; i++) {
          buf += this.visit(nodes[i]);
          if (delim && i < length - 1)
            buf += this.emit(delim);
        }
        return buf;
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/css/lib/stringify/compress.js
  var require_compress = __commonJS({
    "node_modules/css/lib/stringify/compress.js"(exports, module) {
      var Base = require_compiler();
      var inherits = require_inherits_browser();
      module.exports = Compiler;
      function Compiler(options) {
        Base.call(this, options);
      }
      inherits(Compiler, Base);
      Compiler.prototype.compile = function(node) {
        return node.stylesheet.rules.map(this.visit, this).join("");
      };
      Compiler.prototype.comment = function(node) {
        return this.emit("", node.position);
      };
      Compiler.prototype.import = function(node) {
        return this.emit("@import " + node.import + ";", node.position);
      };
      Compiler.prototype.media = function(node) {
        return this.emit("@media " + node.media, node.position) + this.emit("{") + this.mapVisit(node.rules) + this.emit("}");
      };
      Compiler.prototype.document = function(node) {
        var doc = "@" + (node.vendor || "") + "document " + node.document;
        return this.emit(doc, node.position) + this.emit("{") + this.mapVisit(node.rules) + this.emit("}");
      };
      Compiler.prototype.charset = function(node) {
        return this.emit("@charset " + node.charset + ";", node.position);
      };
      Compiler.prototype.namespace = function(node) {
        return this.emit("@namespace " + node.namespace + ";", node.position);
      };
      Compiler.prototype.supports = function(node) {
        return this.emit("@supports " + node.supports, node.position) + this.emit("{") + this.mapVisit(node.rules) + this.emit("}");
      };
      Compiler.prototype.keyframes = function(node) {
        return this.emit("@" + (node.vendor || "") + "keyframes " + node.name, node.position) + this.emit("{") + this.mapVisit(node.keyframes) + this.emit("}");
      };
      Compiler.prototype.keyframe = function(node) {
        var decls = node.declarations;
        return this.emit(node.values.join(","), node.position) + this.emit("{") + this.mapVisit(decls) + this.emit("}");
      };
      Compiler.prototype.page = function(node) {
        var sel = node.selectors.length ? node.selectors.join(", ") : "";
        return this.emit("@page " + sel, node.position) + this.emit("{") + this.mapVisit(node.declarations) + this.emit("}");
      };
      Compiler.prototype["font-face"] = function(node) {
        return this.emit("@font-face", node.position) + this.emit("{") + this.mapVisit(node.declarations) + this.emit("}");
      };
      Compiler.prototype.host = function(node) {
        return this.emit("@host", node.position) + this.emit("{") + this.mapVisit(node.rules) + this.emit("}");
      };
      Compiler.prototype["custom-media"] = function(node) {
        return this.emit("@custom-media " + node.name + " " + node.media + ";", node.position);
      };
      Compiler.prototype.rule = function(node) {
        var decls = node.declarations;
        if (!decls.length)
          return "";
        return this.emit(node.selectors.join(","), node.position) + this.emit("{") + this.mapVisit(decls) + this.emit("}");
      };
      Compiler.prototype.declaration = function(node) {
        return this.emit(node.property + ":" + node.value, node.position) + this.emit(";");
      };
    }
  });

  // node_modules/css/lib/stringify/identity.js
  var require_identity = __commonJS({
    "node_modules/css/lib/stringify/identity.js"(exports, module) {
      var Base = require_compiler();
      var inherits = require_inherits_browser();
      module.exports = Compiler;
      function Compiler(options) {
        options = options || {};
        Base.call(this, options);
        this.indentation = options.indent;
      }
      inherits(Compiler, Base);
      Compiler.prototype.compile = function(node) {
        return this.stylesheet(node);
      };
      Compiler.prototype.stylesheet = function(node) {
        return this.mapVisit(node.stylesheet.rules, "\n\n");
      };
      Compiler.prototype.comment = function(node) {
        return this.emit(this.indent() + "/*" + node.comment + "*/", node.position);
      };
      Compiler.prototype.import = function(node) {
        return this.emit("@import " + node.import + ";", node.position);
      };
      Compiler.prototype.media = function(node) {
        return this.emit("@media " + node.media, node.position) + this.emit(" {\n" + this.indent(1)) + this.mapVisit(node.rules, "\n\n") + this.emit(this.indent(-1) + "\n}");
      };
      Compiler.prototype.document = function(node) {
        var doc = "@" + (node.vendor || "") + "document " + node.document;
        return this.emit(doc, node.position) + this.emit("  {\n" + this.indent(1)) + this.mapVisit(node.rules, "\n\n") + this.emit(this.indent(-1) + "\n}");
      };
      Compiler.prototype.charset = function(node) {
        return this.emit("@charset " + node.charset + ";", node.position);
      };
      Compiler.prototype.namespace = function(node) {
        return this.emit("@namespace " + node.namespace + ";", node.position);
      };
      Compiler.prototype.supports = function(node) {
        return this.emit("@supports " + node.supports, node.position) + this.emit(" {\n" + this.indent(1)) + this.mapVisit(node.rules, "\n\n") + this.emit(this.indent(-1) + "\n}");
      };
      Compiler.prototype.keyframes = function(node) {
        return this.emit("@" + (node.vendor || "") + "keyframes " + node.name, node.position) + this.emit(" {\n" + this.indent(1)) + this.mapVisit(node.keyframes, "\n") + this.emit(this.indent(-1) + "}");
      };
      Compiler.prototype.keyframe = function(node) {
        var decls = node.declarations;
        return this.emit(this.indent()) + this.emit(node.values.join(", "), node.position) + this.emit(" {\n" + this.indent(1)) + this.mapVisit(decls, "\n") + this.emit(this.indent(-1) + "\n" + this.indent() + "}\n");
      };
      Compiler.prototype.page = function(node) {
        var sel = node.selectors.length ? node.selectors.join(", ") + " " : "";
        return this.emit("@page " + sel, node.position) + this.emit("{\n") + this.emit(this.indent(1)) + this.mapVisit(node.declarations, "\n") + this.emit(this.indent(-1)) + this.emit("\n}");
      };
      Compiler.prototype["font-face"] = function(node) {
        return this.emit("@font-face ", node.position) + this.emit("{\n") + this.emit(this.indent(1)) + this.mapVisit(node.declarations, "\n") + this.emit(this.indent(-1)) + this.emit("\n}");
      };
      Compiler.prototype.host = function(node) {
        return this.emit("@host", node.position) + this.emit(" {\n" + this.indent(1)) + this.mapVisit(node.rules, "\n\n") + this.emit(this.indent(-1) + "\n}");
      };
      Compiler.prototype["custom-media"] = function(node) {
        return this.emit("@custom-media " + node.name + " " + node.media + ";", node.position);
      };
      Compiler.prototype.rule = function(node) {
        var indent = this.indent();
        var decls = node.declarations;
        if (!decls.length)
          return "";
        return this.emit(node.selectors.map(function(s) {
          return indent + s;
        }).join(",\n"), node.position) + this.emit(" {\n") + this.emit(this.indent(1)) + this.mapVisit(decls, "\n") + this.emit(this.indent(-1)) + this.emit("\n" + this.indent() + "}");
      };
      Compiler.prototype.declaration = function(node) {
        return this.emit(this.indent()) + this.emit(node.property + ": " + node.value, node.position) + this.emit(";");
      };
      Compiler.prototype.indent = function(level) {
        this.level = this.level || 1;
        if (level != null) {
          this.level += level;
          return "";
        }
        return Array(this.level).join(this.indentation || "  ");
      };
    }
  });

  // node_modules/source-map/lib/base64.js
  var require_base64 = __commonJS({
    "node_modules/source-map/lib/base64.js"(exports) {
      var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      exports.encode = function(number) {
        if (0 <= number && number < intToCharMap.length) {
          return intToCharMap[number];
        }
        throw new TypeError("Must be between 0 and 63: " + number);
      };
      exports.decode = function(charCode) {
        var bigA = 65;
        var bigZ = 90;
        var littleA = 97;
        var littleZ = 122;
        var zero = 48;
        var nine = 57;
        var plus = 43;
        var slash = 47;
        var littleOffset = 26;
        var numberOffset = 52;
        if (bigA <= charCode && charCode <= bigZ) {
          return charCode - bigA;
        }
        if (littleA <= charCode && charCode <= littleZ) {
          return charCode - littleA + littleOffset;
        }
        if (zero <= charCode && charCode <= nine) {
          return charCode - zero + numberOffset;
        }
        if (charCode == plus) {
          return 62;
        }
        if (charCode == slash) {
          return 63;
        }
        return -1;
      };
    }
  });

  // node_modules/source-map/lib/base64-vlq.js
  var require_base64_vlq = __commonJS({
    "node_modules/source-map/lib/base64-vlq.js"(exports) {
      var base64 = require_base64();
      var VLQ_BASE_SHIFT = 5;
      var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
      var VLQ_BASE_MASK = VLQ_BASE - 1;
      var VLQ_CONTINUATION_BIT = VLQ_BASE;
      function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
      }
      function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1;
        var shifted = aValue >> 1;
        return isNegative ? -shifted : shifted;
      }
      exports.encode = function base64VLQ_encode(aValue) {
        var encoded = "";
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
          digit = vlq & VLQ_BASE_MASK;
          vlq >>>= VLQ_BASE_SHIFT;
          if (vlq > 0) {
            digit |= VLQ_CONTINUATION_BIT;
          }
          encoded += base64.encode(digit);
        } while (vlq > 0);
        return encoded;
      };
      exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr.length;
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
          if (aIndex >= strLen) {
            throw new Error("Expected more digits in base 64 VLQ value.");
          }
          digit = base64.decode(aStr.charCodeAt(aIndex++));
          if (digit === -1) {
            throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
          }
          continuation = !!(digit & VLQ_CONTINUATION_BIT);
          digit &= VLQ_BASE_MASK;
          result = result + (digit << shift);
          shift += VLQ_BASE_SHIFT;
        } while (continuation);
        aOutParam.value = fromVLQSigned(result);
        aOutParam.rest = aIndex;
      };
    }
  });

  // node_modules/source-map/lib/util.js
  var require_util = __commonJS({
    "node_modules/source-map/lib/util.js"(exports) {
      function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
          return aArgs[aName];
        } else if (arguments.length === 3) {
          return aDefaultValue;
        } else {
          throw new Error('"' + aName + '" is a required argument.');
        }
      }
      exports.getArg = getArg;
      var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
      var dataUrlRegexp = /^data:.+\,.+$/;
      function urlParse(aUrl) {
        var match = aUrl.match(urlRegexp);
        if (!match) {
          return null;
        }
        return {
          scheme: match[1],
          auth: match[2],
          host: match[3],
          port: match[4],
          path: match[5]
        };
      }
      exports.urlParse = urlParse;
      function urlGenerate(aParsedUrl) {
        var url = "";
        if (aParsedUrl.scheme) {
          url += aParsedUrl.scheme + ":";
        }
        url += "//";
        if (aParsedUrl.auth) {
          url += aParsedUrl.auth + "@";
        }
        if (aParsedUrl.host) {
          url += aParsedUrl.host;
        }
        if (aParsedUrl.port) {
          url += ":" + aParsedUrl.port;
        }
        if (aParsedUrl.path) {
          url += aParsedUrl.path;
        }
        return url;
      }
      exports.urlGenerate = urlGenerate;
      function normalize(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
          if (!url.path) {
            return aPath;
          }
          path = url.path;
        }
        var isAbsolute = exports.isAbsolute(path);
        var parts = path.split(/\/+/);
        for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
          part = parts[i];
          if (part === ".") {
            parts.splice(i, 1);
          } else if (part === "..") {
            up++;
          } else if (up > 0) {
            if (part === "") {
              parts.splice(i + 1, up);
              up = 0;
            } else {
              parts.splice(i, 2);
              up--;
            }
          }
        }
        path = parts.join("/");
        if (path === "") {
          path = isAbsolute ? "/" : ".";
        }
        if (url) {
          url.path = path;
          return urlGenerate(url);
        }
        return path;
      }
      exports.normalize = normalize;
      function join(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        if (aPath === "") {
          aPath = ".";
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
          aRoot = aRootUrl.path || "/";
        }
        if (aPathUrl && !aPathUrl.scheme) {
          if (aRootUrl) {
            aPathUrl.scheme = aRootUrl.scheme;
          }
          return urlGenerate(aPathUrl);
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) {
          return aPath;
        }
        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
          aRootUrl.host = aPath;
          return urlGenerate(aRootUrl);
        }
        var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
        if (aRootUrl) {
          aRootUrl.path = joined;
          return urlGenerate(aRootUrl);
        }
        return joined;
      }
      exports.join = join;
      exports.isAbsolute = function(aPath) {
        return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
      };
      function relative(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        aRoot = aRoot.replace(/\/$/, "");
        var level = 0;
        while (aPath.indexOf(aRoot + "/") !== 0) {
          var index = aRoot.lastIndexOf("/");
          if (index < 0) {
            return aPath;
          }
          aRoot = aRoot.slice(0, index);
          if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
            return aPath;
          }
          ++level;
        }
        return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
      }
      exports.relative = relative;
      var supportsNullProto = function() {
        var obj = /* @__PURE__ */ Object.create(null);
        return !("__proto__" in obj);
      }();
      function identity(s) {
        return s;
      }
      function toSetString(aStr) {
        if (isProtoString(aStr)) {
          return "$" + aStr;
        }
        return aStr;
      }
      exports.toSetString = supportsNullProto ? identity : toSetString;
      function fromSetString(aStr) {
        if (isProtoString(aStr)) {
          return aStr.slice(1);
        }
        return aStr;
      }
      exports.fromSetString = supportsNullProto ? identity : fromSetString;
      function isProtoString(s) {
        if (!s) {
          return false;
        }
        var length = s.length;
        if (length < 9) {
          return false;
        }
        if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
          return false;
        }
        for (var i = length - 10; i >= 0; i--) {
          if (s.charCodeAt(i) !== 36) {
            return false;
          }
        }
        return true;
      }
      function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByOriginalPositions = compareByOriginalPositions;
      function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
      function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
          return 0;
        }
        if (aStr1 === null) {
          return 1;
        }
        if (aStr2 === null) {
          return -1;
        }
        if (aStr1 > aStr2) {
          return 1;
        }
        return -1;
      }
      function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
      function parseSourceMapInput(str) {
        return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
      }
      exports.parseSourceMapInput = parseSourceMapInput;
      function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || "";
        if (sourceRoot) {
          if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
            sourceRoot += "/";
          }
          sourceURL = sourceRoot + sourceURL;
        }
        if (sourceMapURL) {
          var parsed = urlParse(sourceMapURL);
          if (!parsed) {
            throw new Error("sourceMapURL could not be parsed");
          }
          if (parsed.path) {
            var index = parsed.path.lastIndexOf("/");
            if (index >= 0) {
              parsed.path = parsed.path.substring(0, index + 1);
            }
          }
          sourceURL = join(urlGenerate(parsed), sourceURL);
        }
        return normalize(sourceURL);
      }
      exports.computeSourceURL = computeSourceURL;
    }
  });

  // node_modules/source-map/lib/array-set.js
  var require_array_set = __commonJS({
    "node_modules/source-map/lib/array-set.js"(exports) {
      var util = require_util();
      var has = Object.prototype.hasOwnProperty;
      var hasNativeMap = typeof Map !== "undefined";
      function ArraySet() {
        this._array = [];
        this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
      }
      ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet();
        for (var i = 0, len = aArray.length; i < len; i++) {
          set.add(aArray[i], aAllowDuplicates);
        }
        return set;
      };
      ArraySet.prototype.size = function ArraySet_size() {
        return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
      };
      ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
        var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
        var idx = this._array.length;
        if (!isDuplicate || aAllowDuplicates) {
          this._array.push(aStr);
        }
        if (!isDuplicate) {
          if (hasNativeMap) {
            this._set.set(aStr, idx);
          } else {
            this._set[sStr] = idx;
          }
        }
      };
      ArraySet.prototype.has = function ArraySet_has(aStr) {
        if (hasNativeMap) {
          return this._set.has(aStr);
        } else {
          var sStr = util.toSetString(aStr);
          return has.call(this._set, sStr);
        }
      };
      ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
          var idx = this._set.get(aStr);
          if (idx >= 0) {
            return idx;
          }
        } else {
          var sStr = util.toSetString(aStr);
          if (has.call(this._set, sStr)) {
            return this._set[sStr];
          }
        }
        throw new Error('"' + aStr + '" is not in the set.');
      };
      ArraySet.prototype.at = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length) {
          return this._array[aIdx];
        }
        throw new Error("No element indexed by " + aIdx);
      };
      ArraySet.prototype.toArray = function ArraySet_toArray() {
        return this._array.slice();
      };
      exports.ArraySet = ArraySet;
    }
  });

  // node_modules/source-map/lib/mapping-list.js
  var require_mapping_list = __commonJS({
    "node_modules/source-map/lib/mapping-list.js"(exports) {
      var util = require_util();
      function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA.generatedLine;
        var lineB = mappingB.generatedLine;
        var columnA = mappingA.generatedColumn;
        var columnB = mappingB.generatedColumn;
        return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
      }
      function MappingList() {
        this._array = [];
        this._sorted = true;
        this._last = { generatedLine: -1, generatedColumn: 0 };
      }
      MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
        this._array.forEach(aCallback, aThisArg);
      };
      MappingList.prototype.add = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this._last, aMapping)) {
          this._last = aMapping;
          this._array.push(aMapping);
        } else {
          this._sorted = false;
          this._array.push(aMapping);
        }
      };
      MappingList.prototype.toArray = function MappingList_toArray() {
        if (!this._sorted) {
          this._array.sort(util.compareByGeneratedPositionsInflated);
          this._sorted = true;
        }
        return this._array;
      };
      exports.MappingList = MappingList;
    }
  });

  // node_modules/source-map/lib/source-map-generator.js
  var require_source_map_generator = __commonJS({
    "node_modules/source-map/lib/source-map-generator.js"(exports) {
      var base64VLQ = require_base64_vlq();
      var util = require_util();
      var ArraySet = require_array_set().ArraySet;
      var MappingList = require_mapping_list().MappingList;
      function SourceMapGenerator(aArgs) {
        if (!aArgs) {
          aArgs = {};
        }
        this._file = util.getArg(aArgs, "file", null);
        this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
        this._skipValidation = util.getArg(aArgs, "skipValidation", false);
        this._sources = new ArraySet();
        this._names = new ArraySet();
        this._mappings = new MappingList();
        this._sourcesContents = null;
      }
      SourceMapGenerator.prototype._version = 3;
      SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
        var sourceRoot = aSourceMapConsumer.sourceRoot;
        var generator = new SourceMapGenerator({
          file: aSourceMapConsumer.file,
          sourceRoot
        });
        aSourceMapConsumer.eachMapping(function(mapping) {
          var newMapping = {
            generated: {
              line: mapping.generatedLine,
              column: mapping.generatedColumn
            }
          };
          if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) {
              newMapping.source = util.relative(sourceRoot, newMapping.source);
            }
            newMapping.original = {
              line: mapping.originalLine,
              column: mapping.originalColumn
            };
            if (mapping.name != null) {
              newMapping.name = mapping.name;
            }
          }
          generator.addMapping(newMapping);
        });
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var sourceRelative = sourceFile;
          if (sourceRoot !== null) {
            sourceRelative = util.relative(sourceRoot, sourceFile);
          }
          if (!generator._sources.has(sourceRelative)) {
            generator._sources.add(sourceRelative);
          }
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            generator.setSourceContent(sourceFile, content);
          }
        });
        return generator;
      };
      SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
        var generated = util.getArg(aArgs, "generated");
        var original = util.getArg(aArgs, "original", null);
        var source = util.getArg(aArgs, "source", null);
        var name = util.getArg(aArgs, "name", null);
        if (!this._skipValidation) {
          this._validateMapping(generated, original, source, name);
        }
        if (source != null) {
          source = String(source);
          if (!this._sources.has(source)) {
            this._sources.add(source);
          }
        }
        if (name != null) {
          name = String(name);
          if (!this._names.has(name)) {
            this._names.add(name);
          }
        }
        this._mappings.add({
          generatedLine: generated.line,
          generatedColumn: generated.column,
          originalLine: original != null && original.line,
          originalColumn: original != null && original.column,
          source,
          name
        });
      };
      SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this._sourceRoot != null) {
          source = util.relative(this._sourceRoot, source);
        }
        if (aSourceContent != null) {
          if (!this._sourcesContents) {
            this._sourcesContents = /* @__PURE__ */ Object.create(null);
          }
          this._sourcesContents[util.toSetString(source)] = aSourceContent;
        } else if (this._sourcesContents) {
          delete this._sourcesContents[util.toSetString(source)];
          if (Object.keys(this._sourcesContents).length === 0) {
            this._sourcesContents = null;
          }
        }
      };
      SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
          if (aSourceMapConsumer.file == null) {
            throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
          }
          sourceFile = aSourceMapConsumer.file;
        }
        var sourceRoot = this._sourceRoot;
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        var newSources = new ArraySet();
        var newNames = new ArraySet();
        this._mappings.unsortedForEach(function(mapping) {
          if (mapping.source === sourceFile && mapping.originalLine != null) {
            var original = aSourceMapConsumer.originalPositionFor({
              line: mapping.originalLine,
              column: mapping.originalColumn
            });
            if (original.source != null) {
              mapping.source = original.source;
              if (aSourceMapPath != null) {
                mapping.source = util.join(aSourceMapPath, mapping.source);
              }
              if (sourceRoot != null) {
                mapping.source = util.relative(sourceRoot, mapping.source);
              }
              mapping.originalLine = original.line;
              mapping.originalColumn = original.column;
              if (original.name != null) {
                mapping.name = original.name;
              }
            }
          }
          var source = mapping.source;
          if (source != null && !newSources.has(source)) {
            newSources.add(source);
          }
          var name = mapping.name;
          if (name != null && !newNames.has(name)) {
            newNames.add(name);
          }
        }, this);
        this._sources = newSources;
        this._names = newNames;
        aSourceMapConsumer.sources.forEach(function(sourceFile2) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
          if (content != null) {
            if (aSourceMapPath != null) {
              sourceFile2 = util.join(aSourceMapPath, sourceFile2);
            }
            if (sourceRoot != null) {
              sourceFile2 = util.relative(sourceRoot, sourceFile2);
            }
            this.setSourceContent(sourceFile2, content);
          }
        }, this);
      };
      SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
          throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
        }
        if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
          return;
        } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
          return;
        } else {
          throw new Error("Invalid mapping: " + JSON.stringify({
            generated: aGenerated,
            source: aSource,
            original: aOriginal,
            name: aName
          }));
        }
      };
      SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0;
        var previousGeneratedLine = 1;
        var previousOriginalColumn = 0;
        var previousOriginalLine = 0;
        var previousName = 0;
        var previousSource = 0;
        var result = "";
        var next;
        var mapping;
        var nameIdx;
        var sourceIdx;
        var mappings = this._mappings.toArray();
        for (var i = 0, len = mappings.length; i < len; i++) {
          mapping = mappings[i];
          next = "";
          if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            while (mapping.generatedLine !== previousGeneratedLine) {
              next += ";";
              previousGeneratedLine++;
            }
          } else {
            if (i > 0) {
              if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                continue;
              }
              next += ",";
            }
          }
          next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
          previousGeneratedColumn = mapping.generatedColumn;
          if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += base64VLQ.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;
            next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;
            next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;
            if (mapping.name != null) {
              nameIdx = this._names.indexOf(mapping.name);
              next += base64VLQ.encode(nameIdx - previousName);
              previousName = nameIdx;
            }
          }
          result += next;
        }
        return result;
      };
      SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources.map(function(source) {
          if (!this._sourcesContents) {
            return null;
          }
          if (aSourceRoot != null) {
            source = util.relative(aSourceRoot, source);
          }
          var key = util.toSetString(source);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
        }, this);
      };
      SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
        var map = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        if (this._file != null) {
          map.file = this._file;
        }
        if (this._sourceRoot != null) {
          map.sourceRoot = this._sourceRoot;
        }
        if (this._sourcesContents) {
          map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
        }
        return map;
      };
      SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
        return JSON.stringify(this.toJSON());
      };
      exports.SourceMapGenerator = SourceMapGenerator;
    }
  });

  // node_modules/source-map/lib/binary-search.js
  var require_binary_search = __commonJS({
    "node_modules/source-map/lib/binary-search.js"(exports) {
      exports.GREATEST_LOWER_BOUND = 1;
      exports.LEAST_UPPER_BOUND = 2;
      function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math.floor((aHigh - aLow) / 2) + aLow;
        var cmp = aCompare(aNeedle, aHaystack[mid], true);
        if (cmp === 0) {
          return mid;
        } else if (cmp > 0) {
          if (aHigh - mid > 1) {
            return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports.LEAST_UPPER_BOUND) {
            return aHigh < aHaystack.length ? aHigh : -1;
          } else {
            return mid;
          }
        } else {
          if (mid - aLow > 1) {
            return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
          }
          if (aBias == exports.LEAST_UPPER_BOUND) {
            return mid;
          } else {
            return aLow < 0 ? -1 : aLow;
          }
        }
      }
      exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack.length === 0) {
          return -1;
        }
        var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
        if (index < 0) {
          return -1;
        }
        while (index - 1 >= 0) {
          if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
            break;
          }
          --index;
        }
        return index;
      };
    }
  });

  // node_modules/source-map/lib/quick-sort.js
  var require_quick_sort = __commonJS({
    "node_modules/source-map/lib/quick-sort.js"(exports) {
      function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j = p; j < r; j++) {
            if (comparator(ary[j], pivot) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q = i + 1;
          doQuickSort(ary, comparator, p, q - 1);
          doQuickSort(ary, comparator, q + 1, r);
        }
      }
      exports.quickSort = function(ary, comparator) {
        doQuickSort(ary, comparator, 0, ary.length - 1);
      };
    }
  });

  // node_modules/source-map/lib/source-map-consumer.js
  var require_source_map_consumer = __commonJS({
    "node_modules/source-map/lib/source-map-consumer.js"(exports) {
      var util = require_util();
      var binarySearch = require_binary_search();
      var ArraySet = require_array_set().ArraySet;
      var base64VLQ = require_base64_vlq();
      var quickSort = require_quick_sort().quickSort;
      function SourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = util.parseSourceMapInput(aSourceMap);
        }
        return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
      }
      SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
        return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
      };
      SourceMapConsumer.prototype._version = 3;
      SourceMapConsumer.prototype.__generatedMappings = null;
      Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
        configurable: true,
        enumerable: true,
        get: function() {
          if (!this.__generatedMappings) {
            this._parseMappings(this._mappings, this.sourceRoot);
          }
          return this.__generatedMappings;
        }
      });
      SourceMapConsumer.prototype.__originalMappings = null;
      Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
        configurable: true,
        enumerable: true,
        get: function() {
          if (!this.__originalMappings) {
            this._parseMappings(this._mappings, this.sourceRoot);
          }
          return this.__originalMappings;
        }
      });
      SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c = aStr.charAt(index);
        return c === ";" || c === ",";
      };
      SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error("Subclasses must implement _parseMappings");
      };
      SourceMapConsumer.GENERATED_ORDER = 1;
      SourceMapConsumer.ORIGINAL_ORDER = 2;
      SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
      SourceMapConsumer.LEAST_UPPER_BOUND = 2;
      SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null;
        var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
        var mappings;
        switch (order) {
          case SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
          case SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
          default:
            throw new Error("Unknown order of iteration.");
        }
        var sourceRoot = this.sourceRoot;
        mappings.map(function(mapping) {
          var source = mapping.source === null ? null : this._sources.at(mapping.source);
          source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
          return {
            source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
          };
        }, this).forEach(aCallback, context);
      };
      SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var line = util.getArg(aArgs, "line");
        var needle = {
          source: util.getArg(aArgs, "source"),
          originalLine: line,
          originalColumn: util.getArg(aArgs, "column", 0)
        };
        needle.source = this._findSourceIndex(needle.source);
        if (needle.source < 0) {
          return [];
        }
        var mappings = [];
        var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
        if (index >= 0) {
          var mapping = this._originalMappings[index];
          if (aArgs.column === void 0) {
            var originalLine = mapping.originalLine;
            while (mapping && mapping.originalLine === originalLine) {
              mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
              });
              mapping = this._originalMappings[++index];
            }
          } else {
            var originalColumn = mapping.originalColumn;
            while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
              mappings.push({
                line: util.getArg(mapping, "generatedLine", null),
                column: util.getArg(mapping, "generatedColumn", null),
                lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
              });
              mapping = this._originalMappings[++index];
            }
          }
        }
        return mappings;
      };
      exports.SourceMapConsumer = SourceMapConsumer;
      function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = util.parseSourceMapInput(aSourceMap);
        }
        var version = util.getArg(sourceMap, "version");
        var sources = util.getArg(sourceMap, "sources");
        var names = util.getArg(sourceMap, "names", []);
        var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
        var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
        var mappings = util.getArg(sourceMap, "mappings");
        var file = util.getArg(sourceMap, "file", null);
        if (version != this._version) {
          throw new Error("Unsupported version: " + version);
        }
        if (sourceRoot) {
          sourceRoot = util.normalize(sourceRoot);
        }
        sources = sources.map(String).map(util.normalize).map(function(source) {
          return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
        });
        this._names = ArraySet.fromArray(names.map(String), true);
        this._sources = ArraySet.fromArray(sources, true);
        this._absoluteSources = this._sources.toArray().map(function(s) {
          return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
        });
        this.sourceRoot = sourceRoot;
        this.sourcesContent = sourcesContent;
        this._mappings = mappings;
        this._sourceMapURL = aSourceMapURL;
        this.file = file;
      }
      BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
      BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
      BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
        var relativeSource = aSource;
        if (this.sourceRoot != null) {
          relativeSource = util.relative(this.sourceRoot, relativeSource);
        }
        if (this._sources.has(relativeSource)) {
          return this._sources.indexOf(relativeSource);
        }
        var i;
        for (i = 0; i < this._absoluteSources.length; ++i) {
          if (this._absoluteSources[i] == aSource) {
            return i;
          }
        }
        return -1;
      };
      BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
        var smc = Object.create(BasicSourceMapConsumer.prototype);
        var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
        var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
        smc.sourceRoot = aSourceMap._sourceRoot;
        smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
        smc.file = aSourceMap._file;
        smc._sourceMapURL = aSourceMapURL;
        smc._absoluteSources = smc._sources.toArray().map(function(s) {
          return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
        });
        var generatedMappings = aSourceMap._mappings.toArray().slice();
        var destGeneratedMappings = smc.__generatedMappings = [];
        var destOriginalMappings = smc.__originalMappings = [];
        for (var i = 0, length = generatedMappings.length; i < length; i++) {
          var srcMapping = generatedMappings[i];
          var destMapping = new Mapping();
          destMapping.generatedLine = srcMapping.generatedLine;
          destMapping.generatedColumn = srcMapping.generatedColumn;
          if (srcMapping.source) {
            destMapping.source = sources.indexOf(srcMapping.source);
            destMapping.originalLine = srcMapping.originalLine;
            destMapping.originalColumn = srcMapping.originalColumn;
            if (srcMapping.name) {
              destMapping.name = names.indexOf(srcMapping.name);
            }
            destOriginalMappings.push(destMapping);
          }
          destGeneratedMappings.push(destMapping);
        }
        quickSort(smc.__originalMappings, util.compareByOriginalPositions);
        return smc;
      };
      BasicSourceMapConsumer.prototype._version = 3;
      Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
        get: function() {
          return this._absoluteSources.slice();
        }
      });
      function Mapping() {
        this.generatedLine = 0;
        this.generatedColumn = 0;
        this.source = null;
        this.originalLine = null;
        this.originalColumn = null;
        this.name = null;
      }
      BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1;
        var previousGeneratedColumn = 0;
        var previousOriginalLine = 0;
        var previousOriginalColumn = 0;
        var previousSource = 0;
        var previousName = 0;
        var length = aStr.length;
        var index = 0;
        var cachedSegments = {};
        var temp = {};
        var originalMappings = [];
        var generatedMappings = [];
        var mapping, str, segment, end, value;
        while (index < length) {
          if (aStr.charAt(index) === ";") {
            generatedLine++;
            index++;
            previousGeneratedColumn = 0;
          } else if (aStr.charAt(index) === ",") {
            index++;
          } else {
            mapping = new Mapping();
            mapping.generatedLine = generatedLine;
            for (end = index; end < length; end++) {
              if (this._charIsMappingSeparator(aStr, end)) {
                break;
              }
            }
            str = aStr.slice(index, end);
            segment = cachedSegments[str];
            if (segment) {
              index += str.length;
            } else {
              segment = [];
              while (index < end) {
                base64VLQ.decode(aStr, index, temp);
                value = temp.value;
                index = temp.rest;
                segment.push(value);
              }
              if (segment.length === 2) {
                throw new Error("Found a source, but no line and column");
              }
              if (segment.length === 3) {
                throw new Error("Found a source and line, but no column");
              }
              cachedSegments[str] = segment;
            }
            mapping.generatedColumn = previousGeneratedColumn + segment[0];
            previousGeneratedColumn = mapping.generatedColumn;
            if (segment.length > 1) {
              mapping.source = previousSource + segment[1];
              previousSource += segment[1];
              mapping.originalLine = previousOriginalLine + segment[2];
              previousOriginalLine = mapping.originalLine;
              mapping.originalLine += 1;
              mapping.originalColumn = previousOriginalColumn + segment[3];
              previousOriginalColumn = mapping.originalColumn;
              if (segment.length > 4) {
                mapping.name = previousName + segment[4];
                previousName += segment[4];
              }
            }
            generatedMappings.push(mapping);
            if (typeof mapping.originalLine === "number") {
              originalMappings.push(mapping);
            }
          }
        }
        quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
        this.__generatedMappings = generatedMappings;
        quickSort(originalMappings, util.compareByOriginalPositions);
        this.__originalMappings = originalMappings;
      };
      BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0) {
          throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
        }
        if (aNeedle[aColumnName] < 0) {
          throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
        }
        return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
      };
      BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
        for (var index = 0; index < this._generatedMappings.length; ++index) {
          var mapping = this._generatedMappings[index];
          if (index + 1 < this._generatedMappings.length) {
            var nextMapping = this._generatedMappings[index + 1];
            if (mapping.generatedLine === nextMapping.generatedLine) {
              mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
              continue;
            }
          }
          mapping.lastGeneratedColumn = Infinity;
        }
      };
      BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
        if (index >= 0) {
          var mapping = this._generatedMappings[index];
          if (mapping.generatedLine === needle.generatedLine) {
            var source = util.getArg(mapping, "source", null);
            if (source !== null) {
              source = this._sources.at(source);
              source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
            }
            var name = util.getArg(mapping, "name", null);
            if (name !== null) {
              name = this._names.at(name);
            }
            return {
              source,
              line: util.getArg(mapping, "originalLine", null),
              column: util.getArg(mapping, "originalColumn", null),
              name
            };
          }
        }
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      };
      BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
        if (!this.sourcesContent) {
          return false;
        }
        return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
          return sc == null;
        });
      };
      BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this.sourcesContent) {
          return null;
        }
        var index = this._findSourceIndex(aSource);
        if (index >= 0) {
          return this.sourcesContent[index];
        }
        var relativeSource = aSource;
        if (this.sourceRoot != null) {
          relativeSource = util.relative(this.sourceRoot, relativeSource);
        }
        var url;
        if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
          var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
          if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
            return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
          }
          if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
            return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
          }
        }
        if (nullOnMissing) {
          return null;
        } else {
          throw new Error('"' + relativeSource + '" is not in the SourceMap.');
        }
      };
      BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
        var source = util.getArg(aArgs, "source");
        source = this._findSourceIndex(source);
        if (source < 0) {
          return {
            line: null,
            column: null,
            lastColumn: null
          };
        }
        var needle = {
          source,
          originalLine: util.getArg(aArgs, "line"),
          originalColumn: util.getArg(aArgs, "column")
        };
        var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
        if (index >= 0) {
          var mapping = this._originalMappings[index];
          if (mapping.source === needle.source) {
            return {
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            };
          }
        }
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      };
      exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
      function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === "string") {
          sourceMap = util.parseSourceMapInput(aSourceMap);
        }
        var version = util.getArg(sourceMap, "version");
        var sections = util.getArg(sourceMap, "sections");
        if (version != this._version) {
          throw new Error("Unsupported version: " + version);
        }
        this._sources = new ArraySet();
        this._names = new ArraySet();
        var lastOffset = {
          line: -1,
          column: 0
        };
        this._sections = sections.map(function(s) {
          if (s.url) {
            throw new Error("Support for url field in sections not implemented.");
          }
          var offset = util.getArg(s, "offset");
          var offsetLine = util.getArg(offset, "line");
          var offsetColumn = util.getArg(offset, "column");
          if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
            throw new Error("Section offsets must be ordered and non-overlapping.");
          }
          lastOffset = offset;
          return {
            generatedOffset: {
              generatedLine: offsetLine + 1,
              generatedColumn: offsetColumn + 1
            },
            consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
          };
        });
      }
      IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
      IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
      IndexedSourceMapConsumer.prototype._version = 3;
      Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
        get: function() {
          var sources = [];
          for (var i = 0; i < this._sections.length; i++) {
            for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
              sources.push(this._sections[i].consumer.sources[j]);
            }
          }
          return sources;
        }
      });
      IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util.getArg(aArgs, "line"),
          generatedColumn: util.getArg(aArgs, "column")
        };
        var sectionIndex = binarySearch.search(needle, this._sections, function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        });
        var section = this._sections[sectionIndex];
        if (!section) {
          return {
            source: null,
            line: null,
            column: null,
            name: null
          };
        }
        return section.consumer.originalPositionFor({
          line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
          column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
          bias: aArgs.bias
        });
      };
      IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this._sections.every(function(s) {
          return s.consumer.hasContentsOfAllSources();
        });
      };
      IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var content = section.consumer.sourceContentFor(aSource, true);
          if (content) {
            return content;
          }
        }
        if (nullOnMissing) {
          return null;
        } else {
          throw new Error('"' + aSource + '" is not in the SourceMap.');
        }
      };
      IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
            continue;
          }
          var generatedPosition = section.consumer.generatedPositionFor(aArgs);
          if (generatedPosition) {
            var ret = {
              line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
              column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
            };
            return ret;
          }
        }
        return {
          line: null,
          column: null
        };
      };
      IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var sectionMappings = section.consumer._generatedMappings;
          for (var j = 0; j < sectionMappings.length; j++) {
            var mapping = sectionMappings[j];
            var source = section.consumer._sources.at(mapping.source);
            source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
            this._sources.add(source);
            source = this._sources.indexOf(source);
            var name = null;
            if (mapping.name) {
              name = section.consumer._names.at(mapping.name);
              this._names.add(name);
              name = this._names.indexOf(name);
            }
            var adjustedMapping = {
              source,
              generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
              generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
              originalLine: mapping.originalLine,
              originalColumn: mapping.originalColumn,
              name
            };
            this.__generatedMappings.push(adjustedMapping);
            if (typeof adjustedMapping.originalLine === "number") {
              this.__originalMappings.push(adjustedMapping);
            }
          }
        }
        quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
        quickSort(this.__originalMappings, util.compareByOriginalPositions);
      };
      exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
    }
  });

  // node_modules/source-map/lib/source-node.js
  var require_source_node = __commonJS({
    "node_modules/source-map/lib/source-node.js"(exports) {
      var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
      var util = require_util();
      var REGEX_NEWLINE = /(\r?\n)/;
      var NEWLINE_CODE = 10;
      var isSourceNode = "$$$isSourceNode$$$";
      function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
        this.children = [];
        this.sourceContents = {};
        this.line = aLine == null ? null : aLine;
        this.column = aColumn == null ? null : aColumn;
        this.source = aSource == null ? null : aSource;
        this.name = aName == null ? null : aName;
        this[isSourceNode] = true;
        if (aChunks != null)
          this.add(aChunks);
      }
      SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        var node = new SourceNode();
        var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
        var remainingLinesIndex = 0;
        var shiftNextLine = function() {
          var lineContents = getNextLine();
          var newLine = getNextLine() || "";
          return lineContents + newLine;
          function getNextLine() {
            return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
          }
        };
        var lastGeneratedLine = 1, lastGeneratedColumn = 0;
        var lastMapping = null;
        aSourceMapConsumer.eachMapping(function(mapping) {
          if (lastMapping !== null) {
            if (lastGeneratedLine < mapping.generatedLine) {
              addMappingWithCode(lastMapping, shiftNextLine());
              lastGeneratedLine++;
              lastGeneratedColumn = 0;
            } else {
              var nextLine = remainingLines[remainingLinesIndex] || "";
              var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
              remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
              lastGeneratedColumn = mapping.generatedColumn;
              addMappingWithCode(lastMapping, code);
              lastMapping = mapping;
              return;
            }
          }
          while (lastGeneratedLine < mapping.generatedLine) {
            node.add(shiftNextLine());
            lastGeneratedLine++;
          }
          if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
          }
          lastMapping = mapping;
        }, this);
        if (remainingLinesIndex < remainingLines.length) {
          if (lastMapping) {
            addMappingWithCode(lastMapping, shiftNextLine());
          }
          node.add(remainingLines.splice(remainingLinesIndex).join(""));
        }
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            if (aRelativePath != null) {
              sourceFile = util.join(aRelativePath, sourceFile);
            }
            node.setSourceContent(sourceFile, content);
          }
        });
        return node;
        function addMappingWithCode(mapping, code) {
          if (mapping === null || mapping.source === void 0) {
            node.add(code);
          } else {
            var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
            node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
          }
        }
      };
      SourceNode.prototype.add = function SourceNode_add(aChunk) {
        if (Array.isArray(aChunk)) {
          aChunk.forEach(function(chunk) {
            this.add(chunk);
          }, this);
        } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
          if (aChunk) {
            this.children.push(aChunk);
          }
        } else {
          throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
        }
        return this;
      };
      SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
        if (Array.isArray(aChunk)) {
          for (var i = aChunk.length - 1; i >= 0; i--) {
            this.prepend(aChunk[i]);
          }
        } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
          this.children.unshift(aChunk);
        } else {
          throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
        }
        return this;
      };
      SourceNode.prototype.walk = function SourceNode_walk(aFn) {
        var chunk;
        for (var i = 0, len = this.children.length; i < len; i++) {
          chunk = this.children[i];
          if (chunk[isSourceNode]) {
            chunk.walk(aFn);
          } else {
            if (chunk !== "") {
              aFn(chunk, {
                source: this.source,
                line: this.line,
                column: this.column,
                name: this.name
              });
            }
          }
        }
      };
      SourceNode.prototype.join = function SourceNode_join(aSep) {
        var newChildren;
        var i;
        var len = this.children.length;
        if (len > 0) {
          newChildren = [];
          for (i = 0; i < len - 1; i++) {
            newChildren.push(this.children[i]);
            newChildren.push(aSep);
          }
          newChildren.push(this.children[i]);
          this.children = newChildren;
        }
        return this;
      };
      SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
        var lastChild = this.children[this.children.length - 1];
        if (lastChild[isSourceNode]) {
          lastChild.replaceRight(aPattern, aReplacement);
        } else if (typeof lastChild === "string") {
          this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
        } else {
          this.children.push("".replace(aPattern, aReplacement));
        }
        return this;
      };
      SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
      };
      SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
        for (var i = 0, len = this.children.length; i < len; i++) {
          if (this.children[i][isSourceNode]) {
            this.children[i].walkSourceContents(aFn);
          }
        }
        var sources = Object.keys(this.sourceContents);
        for (var i = 0, len = sources.length; i < len; i++) {
          aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
        }
      };
      SourceNode.prototype.toString = function SourceNode_toString() {
        var str = "";
        this.walk(function(chunk) {
          str += chunk;
        });
        return str;
      };
      SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
        var generated = {
          code: "",
          line: 1,
          column: 0
        };
        var map = new SourceMapGenerator(aArgs);
        var sourceMappingActive = false;
        var lastOriginalSource = null;
        var lastOriginalLine = null;
        var lastOriginalColumn = null;
        var lastOriginalName = null;
        this.walk(function(chunk, original) {
          generated.code += chunk;
          if (original.source !== null && original.line !== null && original.column !== null) {
            if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
            lastOriginalSource = original.source;
            lastOriginalLine = original.line;
            lastOriginalColumn = original.column;
            lastOriginalName = original.name;
            sourceMappingActive = true;
          } else if (sourceMappingActive) {
            map.addMapping({
              generated: {
                line: generated.line,
                column: generated.column
              }
            });
            lastOriginalSource = null;
            sourceMappingActive = false;
          }
          for (var idx = 0, length = chunk.length; idx < length; idx++) {
            if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
              generated.line++;
              generated.column = 0;
              if (idx + 1 === length) {
                lastOriginalSource = null;
                sourceMappingActive = false;
              } else if (sourceMappingActive) {
                map.addMapping({
                  source: original.source,
                  original: {
                    line: original.line,
                    column: original.column
                  },
                  generated: {
                    line: generated.line,
                    column: generated.column
                  },
                  name: original.name
                });
              }
            } else {
              generated.column++;
            }
          }
        });
        this.walkSourceContents(function(sourceFile, sourceContent) {
          map.setSourceContent(sourceFile, sourceContent);
        });
        return { code: generated.code, map };
      };
      exports.SourceNode = SourceNode;
    }
  });

  // node_modules/source-map/source-map.js
  var require_source_map = __commonJS({
    "node_modules/source-map/source-map.js"(exports) {
      exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
      exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
      exports.SourceNode = require_source_node().SourceNode;
    }
  });

  // node_modules/atob/browser-atob.js
  var require_browser_atob = __commonJS({
    "node_modules/atob/browser-atob.js"(exports, module) {
      (function(w) {
        "use strict";
        function findBest(atobNative) {
          if (typeof atobNative === "function") {
            return atobNative;
          }
          if (typeof Buffer === "function") {
            return function atobBrowserify(a) {
              return new Buffer(a, "base64").toString("binary");
            };
          }
          if (typeof w.base64js === "object") {
            return function atobWebWorker_iOS(a) {
              var buf = w.base64js.b64ToByteArray(a);
              return Array.prototype.map.call(buf, function(ch) {
                return String.fromCharCode(ch);
              }).join("");
            };
          }
          return function() {
            throw new Error("You're probably in an old browser or an iOS webworker. It might help to include beatgammit's base64-js.");
          };
        }
        var atobBest = findBest(w.atob);
        w.atob = atobBest;
        if (typeof module === "object" && module && module.exports) {
          module.exports = atobBest;
        }
      })(window);
    }
  });

  // node_modules/url/node_modules/punycode/punycode.js
  var require_punycode = __commonJS({
    "node_modules/url/node_modules/punycode/punycode.js"(exports, module) {
      (function(root) {
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = typeof module == "object" && module && !module.nodeType && module;
        var freeGlobal = typeof global == "object" && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
          root = freeGlobal;
        }
        var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
          "overflow": "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
        function error(type) {
          throw RangeError(errors[type]);
        }
        function map(array, fn) {
          var length = array.length;
          var result = [];
          while (length--) {
            result[length] = fn(array[length]);
          }
          return result;
        }
        function mapDomain(string, fn) {
          var parts = string.split("@");
          var result = "";
          if (parts.length > 1) {
            result = parts[0] + "@";
            string = parts[1];
          }
          string = string.replace(regexSeparators, ".");
          var labels = string.split(".");
          var encoded = map(labels, fn).join(".");
          return result + encoded;
        }
        function ucs2decode(string) {
          var output = [], counter = 0, length = string.length, value, extra;
          while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
              extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) {
                output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                output.push(value);
                counter--;
              }
            } else {
              output.push(value);
            }
          }
          return output;
        }
        function ucs2encode(array) {
          return map(array, function(value) {
            var output = "";
            if (value > 65535) {
              value -= 65536;
              output += stringFromCharCode(value >>> 10 & 1023 | 55296);
              value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
          }).join("");
        }
        function basicToDigit(codePoint) {
          if (codePoint - 48 < 10) {
            return codePoint - 22;
          }
          if (codePoint - 65 < 26) {
            return codePoint - 65;
          }
          if (codePoint - 97 < 26) {
            return codePoint - 97;
          }
          return base;
        }
        function digitToBasic(digit, flag) {
          return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }
        function adapt(delta, numPoints, firstTime) {
          var k = 0;
          delta = firstTime ? floor(delta / damp) : delta >> 1;
          delta += floor(delta / numPoints);
          for (; delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
          }
          return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }
        function decode(input) {
          var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
          basic = input.lastIndexOf(delimiter);
          if (basic < 0) {
            basic = 0;
          }
          for (j = 0; j < basic; ++j) {
            if (input.charCodeAt(j) >= 128) {
              error("not-basic");
            }
            output.push(input.charCodeAt(j));
          }
          for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
            for (oldi = i, w = 1, k = base; ; k += base) {
              if (index >= inputLength) {
                error("invalid-input");
              }
              digit = basicToDigit(input.charCodeAt(index++));
              if (digit >= base || digit > floor((maxInt - i) / w)) {
                error("overflow");
              }
              i += digit * w;
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (digit < t) {
                break;
              }
              baseMinusT = base - t;
              if (w > floor(maxInt / baseMinusT)) {
                error("overflow");
              }
              w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            if (floor(i / out) > maxInt - n) {
              error("overflow");
            }
            n += floor(i / out);
            i %= out;
            output.splice(i++, 0, n);
          }
          return ucs2encode(output);
        }
        function encode(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
          input = ucs2decode(input);
          inputLength = input.length;
          n = initialN;
          delta = 0;
          bias = initialBias;
          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 128) {
              output.push(stringFromCharCode(currentValue));
            }
          }
          handledCPCount = basicLength = output.length;
          if (basicLength) {
            output.push(delimiter);
          }
          while (handledCPCount < inputLength) {
            for (m = maxInt, j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
              error("overflow");
            }
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < n && ++delta > maxInt) {
                error("overflow");
              }
              if (currentValue == n) {
                for (q = delta, k = base; ; k += base) {
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  qMinusT = q - t;
                  baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n;
          }
          return output.join("");
        }
        function toUnicode(input) {
          return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
          });
        }
        function toASCII(input) {
          return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
          });
        }
        punycode = {
          "version": "1.3.2",
          "ucs2": {
            "decode": ucs2decode,
            "encode": ucs2encode
          },
          "decode": decode,
          "encode": encode,
          "toASCII": toASCII,
          "toUnicode": toUnicode
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          define("punycode", function() {
            return punycode;
          });
        } else if (freeExports && freeModule) {
          if (module.exports == freeExports) {
            freeModule.exports = punycode;
          } else {
            for (key in punycode) {
              punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
            }
          }
        } else {
          root.punycode = punycode;
        }
      })(exports);
    }
  });

  // node_modules/querystring/decode.js
  var require_decode = __commonJS({
    "node_modules/querystring/decode.js"(exports, module) {
      "use strict";
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module.exports = function(qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};
        if (typeof qs !== "string" || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;
        if (options && typeof options.maxKeys === "number") {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = "";
          }
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (Array.isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
        return obj;
      };
    }
  });

  // node_modules/querystring/encode.js
  var require_encode = __commonJS({
    "node_modules/querystring/encode.js"(exports, module) {
      "use strict";
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case "string":
            return v;
          case "boolean":
            return v ? "true" : "false";
          case "number":
            return isFinite(v) ? v : "";
          default:
            return "";
        }
      };
      module.exports = function(obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";
        if (obj === null) {
          obj = void 0;
        }
        if (typeof obj === "object") {
          return Object.keys(obj).map(function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (Array.isArray(obj[k])) {
              return obj[k].map(function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }
        if (!name)
          return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
    }
  });

  // node_modules/querystring/index.js
  var require_querystring = __commonJS({
    "node_modules/querystring/index.js"(exports) {
      "use strict";
      exports.decode = exports.parse = require_decode();
      exports.encode = exports.stringify = require_encode();
    }
  });

  // node_modules/url/url.js
  var require_url = __commonJS({
    "node_modules/url/url.js"(exports) {
      var punycode = require_punycode();
      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;
      exports.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i;
      var portPattern = /:[0-9]*$/;
      var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
      var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
      var autoEscape = ["'"].concat(unwise);
      var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
      var hostEndingChars = ["/", "?", "#"];
      var hostnameMaxLen = 255;
      var hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/;
      var hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/;
      var unsafeProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var hostlessProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var slashedProtocol = {
        "http": true,
        "https": true,
        "ftp": true,
        "gopher": true,
        "file": true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      };
      var querystring = require_querystring();
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && isObject(url) && url instanceof Url)
          return url;
        var u = new Url();
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var rest = url;
        rest = rest.trim();
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf("@");
          } else {
            atSign = rest.lastIndexOf("@", hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    newpart += "x";
                  } else {
                    newpart += part[j];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = "/" + notHost.join(".") + rest;
                  }
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = "";
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            var domainArray = this.hostname.split(".");
            var newOut = [];
            for (var i = 0; i < domainArray.length; ++i) {
              var s = domainArray[i];
              newOut.push(s.match(/[^A-Za-z0-9_-]/) ? "xn--" + punycode.encode(s) : s);
            }
            this.hostname = newOut.join(".");
          }
          var p = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          this.host = h + p;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") {
              rest = "/" + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = "/";
        }
        if (this.pathname || this.search) {
          var p = this.pathname || "";
          var s = this.search || "";
          this.path = p + s;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) {
            host += ":" + this.port;
          }
        }
        if (this.query && isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":")
          protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = "//" + (host || "");
          if (pathname && pathname.charAt(0) !== "/")
            pathname = "/" + pathname;
        } else if (!host) {
          host = "";
        }
        if (hash && hash.charAt(0) !== "#")
          hash = "#" + hash;
        if (search && search.charAt(0) !== "?")
          search = "?" + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace("#", "%23");
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        Object.keys(this).forEach(function(k) {
          result[k] = this[k];
        }, this);
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          Object.keys(relative).forEach(function(k) {
            if (k !== "protocol")
              result[k] = relative[k];
          });
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = "/";
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            Object.keys(relative).forEach(function(k) {
              result[k] = relative[k];
            });
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = "";
            if (!relative.hostname)
              relative.hostname = "";
            if (relPath[0] !== "")
              relPath.unshift("");
            if (relPath.length < 2)
              relPath.unshift("");
            result.pathname = relPath.join("/");
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p = result.pathname || "";
            var s = result.search || "";
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) {
            if (srcPath[0] === "")
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === "")
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!isNull(result.pathname) || !isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = "/" + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host) && (last === "." || last === "..") || last === "";
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last == ".") {
            srcPath.splice(i, 1);
          } else if (last === "..") {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift("..");
          }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
          srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
          srcPath.push("");
        }
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift("");
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join("/");
        }
        if (!isNull(result.pathname) || !isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ":") {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host)
          this.hostname = host;
      };
      function isString(arg) {
        return typeof arg === "string";
      }
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      function isNull(arg) {
        return arg === null;
      }
      function isNullOrUndefined(arg) {
        return arg == null;
      }
    }
  });

  // node_modules/decode-uri-component/index.js
  var require_decode_uri_component = __commonJS({
    "node_modules/decode-uri-component/index.js"(exports, module) {
      "use strict";
      var token = "%[a-f0-9]{2}";
      var singleMatcher = new RegExp(token, "gi");
      var multiMatcher = new RegExp("(" + token + ")+", "gi");
      function decodeComponents(components, split) {
        try {
          return decodeURIComponent(components.join(""));
        } catch (err) {
        }
        if (components.length === 1) {
          return components;
        }
        split = split || 1;
        var left = components.slice(0, split);
        var right = components.slice(split);
        return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
      }
      function decode(input) {
        try {
          return decodeURIComponent(input);
        } catch (err) {
          var tokens = input.match(singleMatcher);
          for (var i = 1; i < tokens.length; i++) {
            input = decodeComponents(tokens, i).join("");
            tokens = input.match(singleMatcher);
          }
          return input;
        }
      }
      function customDecodeURIComponent(input) {
        var replaceMap = {
          "%FE%FF": "\uFFFD\uFFFD",
          "%FF%FE": "\uFFFD\uFFFD"
        };
        var match = multiMatcher.exec(input);
        while (match) {
          try {
            replaceMap[match[0]] = decodeURIComponent(match[0]);
          } catch (err) {
            var result = decode(match[0]);
            if (result !== match[0]) {
              replaceMap[match[0]] = result;
            }
          }
          match = multiMatcher.exec(input);
        }
        replaceMap["%C2"] = "\uFFFD";
        var entries = Object.keys(replaceMap);
        for (var i = 0; i < entries.length; i++) {
          var key = entries[i];
          input = input.replace(new RegExp(key, "g"), replaceMap[key]);
        }
        return input;
      }
      module.exports = function(encodedURI) {
        if (typeof encodedURI !== "string") {
          throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
        }
        try {
          encodedURI = encodedURI.replace(/\+/g, " ");
          return decodeURIComponent(encodedURI);
        } catch (err) {
          return customDecodeURIComponent(encodedURI);
        }
      };
    }
  });

  // node_modules/source-map-resolve/index.js
  var require_source_map_resolve = __commonJS({
    "node_modules/source-map-resolve/index.js"(exports, module) {
      var atob = require_browser_atob();
      var urlLib = require_url();
      var pathLib = __require("path");
      var decodeUriComponentLib = require_decode_uri_component();
      function resolveUrl() {
        return Array.prototype.reduce.call(arguments, function(resolved, nextUrl) {
          return urlLib.resolve(resolved, nextUrl);
        });
      }
      function convertWindowsPath(aPath) {
        return pathLib.sep === "\\" ? aPath.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/") : aPath;
      }
      function customDecodeUriComponent(string) {
        return decodeUriComponentLib(string.replace(/\+/g, "%2B"));
      }
      function callbackAsync(callback, error, result) {
        setImmediate(function() {
          callback(error, result);
        });
      }
      function parseMapToJSON(string, data) {
        try {
          return JSON.parse(string.replace(/^\)\]\}'/, ""));
        } catch (error) {
          error.sourceMapData = data;
          throw error;
        }
      }
      function readSync(read, url, data) {
        var readUrl = customDecodeUriComponent(url);
        try {
          return String(read(readUrl));
        } catch (error) {
          error.sourceMapData = data;
          throw error;
        }
      }
      var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/;
      var sourceMappingURLRegex = RegExp("(?:/\\*(?:\\s*\r?\n(?://)?)?(?:" + innerRegex.source + ")\\s*\\*/|//(?:" + innerRegex.source + "))\\s*");
      function getSourceMappingUrl(code) {
        var match = code.match(sourceMappingURLRegex);
        return match ? match[1] || match[2] || "" : null;
      }
      function resolveSourceMap(code, codeUrl, read, callback) {
        var mapData;
        try {
          mapData = resolveSourceMapHelper(code, codeUrl);
        } catch (error) {
          return callbackAsync(callback, error);
        }
        if (!mapData || mapData.map) {
          return callbackAsync(callback, null, mapData);
        }
        var readUrl = customDecodeUriComponent(mapData.url);
        read(readUrl, function(error, result) {
          if (error) {
            error.sourceMapData = mapData;
            return callback(error);
          }
          mapData.map = String(result);
          try {
            mapData.map = parseMapToJSON(mapData.map, mapData);
          } catch (error2) {
            return callback(error2);
          }
          callback(null, mapData);
        });
      }
      function resolveSourceMapSync(code, codeUrl, read) {
        var mapData = resolveSourceMapHelper(code, codeUrl);
        if (!mapData || mapData.map) {
          return mapData;
        }
        mapData.map = readSync(read, mapData.url, mapData);
        mapData.map = parseMapToJSON(mapData.map, mapData);
        return mapData;
      }
      var dataUriRegex = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/;
      var jsonMimeTypeRegex = /^(?:application|text)\/json$/;
      var jsonCharacterEncoding = "utf-8";
      function base64ToBuf(b64) {
        var binStr = atob(b64);
        var len = binStr.length;
        var arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        return arr;
      }
      function decodeBase64String(b64) {
        if (typeof TextDecoder === "undefined" || typeof Uint8Array === "undefined") {
          return atob(b64);
        }
        var buf = base64ToBuf(b64);
        var decoder = new TextDecoder(jsonCharacterEncoding, { fatal: true });
        return decoder.decode(buf);
      }
      function resolveSourceMapHelper(code, codeUrl) {
        codeUrl = convertWindowsPath(codeUrl);
        var url = getSourceMappingUrl(code);
        if (!url) {
          return null;
        }
        var dataUri = url.match(dataUriRegex);
        if (dataUri) {
          var mimeType = dataUri[1] || "text/plain";
          var lastParameter = dataUri[2] || "";
          var encoded = dataUri[3] || "";
          var data = {
            sourceMappingURL: url,
            url: null,
            sourcesRelativeTo: codeUrl,
            map: encoded
          };
          if (!jsonMimeTypeRegex.test(mimeType)) {
            var error = new Error("Unuseful data uri mime type: " + mimeType);
            error.sourceMapData = data;
            throw error;
          }
          try {
            data.map = parseMapToJSON(lastParameter === ";base64" ? decodeBase64String(encoded) : decodeURIComponent(encoded), data);
          } catch (error2) {
            error2.sourceMapData = data;
            throw error2;
          }
          return data;
        }
        var mapUrl = resolveUrl(codeUrl, url);
        return {
          sourceMappingURL: url,
          url: mapUrl,
          sourcesRelativeTo: mapUrl,
          map: null
        };
      }
      function resolveSources(map, mapUrl, read, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        var pending = map.sources ? map.sources.length : 0;
        var result = {
          sourcesResolved: [],
          sourcesContent: []
        };
        if (pending === 0) {
          callbackAsync(callback, null, result);
          return;
        }
        var done = function() {
          pending--;
          if (pending === 0) {
            callback(null, result);
          }
        };
        resolveSourcesHelper(map, mapUrl, options, function(fullUrl, sourceContent, index) {
          result.sourcesResolved[index] = fullUrl;
          if (typeof sourceContent === "string") {
            result.sourcesContent[index] = sourceContent;
            callbackAsync(done, null);
          } else {
            var readUrl = customDecodeUriComponent(fullUrl);
            read(readUrl, function(error, source) {
              result.sourcesContent[index] = error ? error : String(source);
              done();
            });
          }
        });
      }
      function resolveSourcesSync(map, mapUrl, read, options) {
        var result = {
          sourcesResolved: [],
          sourcesContent: []
        };
        if (!map.sources || map.sources.length === 0) {
          return result;
        }
        resolveSourcesHelper(map, mapUrl, options, function(fullUrl, sourceContent, index) {
          result.sourcesResolved[index] = fullUrl;
          if (read !== null) {
            if (typeof sourceContent === "string") {
              result.sourcesContent[index] = sourceContent;
            } else {
              var readUrl = customDecodeUriComponent(fullUrl);
              try {
                result.sourcesContent[index] = String(read(readUrl));
              } catch (error) {
                result.sourcesContent[index] = error;
              }
            }
          }
        });
        return result;
      }
      var endingSlash = /\/?$/;
      function resolveSourcesHelper(map, mapUrl, options, fn) {
        options = options || {};
        mapUrl = convertWindowsPath(mapUrl);
        var fullUrl;
        var sourceContent;
        var sourceRoot;
        for (var index = 0, len = map.sources.length; index < len; index++) {
          sourceRoot = null;
          if (typeof options.sourceRoot === "string") {
            sourceRoot = options.sourceRoot;
          } else if (typeof map.sourceRoot === "string" && options.sourceRoot !== false) {
            sourceRoot = map.sourceRoot;
          }
          if (sourceRoot === null || sourceRoot === "") {
            fullUrl = resolveUrl(mapUrl, map.sources[index]);
          } else {
            fullUrl = resolveUrl(mapUrl, sourceRoot.replace(endingSlash, "/"), map.sources[index]);
          }
          sourceContent = (map.sourcesContent || [])[index];
          fn(fullUrl, sourceContent, index);
        }
      }
      function resolve(code, codeUrl, read, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        if (code === null) {
          var mapUrl = codeUrl;
          var data = {
            sourceMappingURL: null,
            url: mapUrl,
            sourcesRelativeTo: mapUrl,
            map: null
          };
          var readUrl = customDecodeUriComponent(mapUrl);
          read(readUrl, function(error, result) {
            if (error) {
              error.sourceMapData = data;
              return callback(error);
            }
            data.map = String(result);
            try {
              data.map = parseMapToJSON(data.map, data);
            } catch (error2) {
              return callback(error2);
            }
            _resolveSources(data);
          });
        } else {
          resolveSourceMap(code, codeUrl, read, function(error, mapData) {
            if (error) {
              return callback(error);
            }
            if (!mapData) {
              return callback(null, null);
            }
            _resolveSources(mapData);
          });
        }
        function _resolveSources(mapData) {
          resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function(error, result) {
            if (error) {
              return callback(error);
            }
            mapData.sourcesResolved = result.sourcesResolved;
            mapData.sourcesContent = result.sourcesContent;
            callback(null, mapData);
          });
        }
      }
      function resolveSync(code, codeUrl, read, options) {
        var mapData;
        if (code === null) {
          var mapUrl = codeUrl;
          mapData = {
            sourceMappingURL: null,
            url: mapUrl,
            sourcesRelativeTo: mapUrl,
            map: null
          };
          mapData.map = readSync(read, mapUrl, mapData);
          mapData.map = parseMapToJSON(mapData.map, mapData);
        } else {
          mapData = resolveSourceMapSync(code, codeUrl, read);
          if (!mapData) {
            return null;
          }
        }
        var result = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options);
        mapData.sourcesResolved = result.sourcesResolved;
        mapData.sourcesContent = result.sourcesContent;
        return mapData;
      }
      module.exports = {
        resolveSourceMap,
        resolveSourceMapSync,
        resolveSources,
        resolveSourcesSync,
        resolve,
        resolveSync,
        parseMapToJSON
      };
    }
  });

  // node_modules/css/lib/stringify/source-map-support.js
  var require_source_map_support = __commonJS({
    "node_modules/css/lib/stringify/source-map-support.js"(exports, module) {
      var SourceMap = require_source_map().SourceMapGenerator;
      var SourceMapConsumer = require_source_map().SourceMapConsumer;
      var sourceMapResolve = require_source_map_resolve();
      var fs = __require("fs");
      var path = __require("path");
      module.exports = mixin;
      var makeFriendlyPath = function(aPath) {
        return path.sep === "\\" ? aPath.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/") : aPath;
      };
      function mixin(compiler) {
        compiler._comment = compiler.comment;
        compiler.map = new SourceMap();
        compiler.position = { line: 1, column: 1 };
        compiler.files = {};
        for (var k in exports)
          compiler[k] = exports[k];
      }
      exports.updatePosition = function(str) {
        var lines = str.match(/\n/g);
        if (lines)
          this.position.line += lines.length;
        var i = str.lastIndexOf("\n");
        this.position.column = ~i ? str.length - i : this.position.column + str.length;
      };
      exports.emit = function(str, pos) {
        if (pos) {
          var sourceFile = makeFriendlyPath(pos.source || "source.css");
          this.map.addMapping({
            source: sourceFile,
            generated: {
              line: this.position.line,
              column: Math.max(this.position.column - 1, 0)
            },
            original: {
              line: pos.start.line,
              column: pos.start.column - 1
            }
          });
          this.addFile(sourceFile, pos);
        }
        this.updatePosition(str);
        return str;
      };
      exports.addFile = function(file, pos) {
        if (typeof pos.content !== "string")
          return;
        if (Object.prototype.hasOwnProperty.call(this.files, file))
          return;
        this.files[file] = pos.content;
      };
      exports.applySourceMaps = function() {
        Object.keys(this.files).forEach(function(file) {
          var content = this.files[file];
          this.map.setSourceContent(file, content);
          if (this.options.inputSourcemaps !== false) {
            var originalMap = sourceMapResolve.resolveSync(content, file, fs.readFileSync);
            if (originalMap) {
              var map = new SourceMapConsumer(originalMap.map);
              var relativeTo = originalMap.sourcesRelativeTo;
              this.map.applySourceMap(map, file, makeFriendlyPath(path.dirname(relativeTo)));
            }
          }
        }, this);
      };
      exports.comment = function(node) {
        if (/^# sourceMappingURL=/.test(node.comment))
          return this.emit("", node.position);
        else
          return this._comment(node);
      };
    }
  });

  // node_modules/css/lib/stringify/index.js
  var require_stringify = __commonJS({
    "node_modules/css/lib/stringify/index.js"(exports, module) {
      var Compressed = require_compress();
      var Identity = require_identity();
      module.exports = function(node, options) {
        options = options || {};
        var compiler = options.compress ? new Compressed(options) : new Identity(options);
        if (options.sourcemap) {
          var sourcemaps = require_source_map_support();
          sourcemaps(compiler);
          var code = compiler.compile(node);
          compiler.applySourceMaps();
          var map = options.sourcemap === "generator" ? compiler.map : compiler.map.toJSON();
          return { code, map };
        }
        var code = compiler.compile(node);
        return code;
      };
    }
  });

  // node_modules/css/index.js
  var require_css = __commonJS({
    "node_modules/css/index.js"(exports) {
      exports.parse = require_parse();
      exports.stringify = require_stringify();
    }
  });

  // node_modules/@enhance/enhance-style-transform/src/style-transform.mjs
  var cssParser = __toESM(require_css(), 1);
  function styleTransform(options) {
    const { attrs = [], raw = "", tagName = "", context = "" } = options;
    const scope = attrs?.find((i) => i.name === "scope")?.value;
    if (scope === "global" && context === "markup") {
      return raw;
    } else if (scope === "global" && context === "template") {
      return "";
    } else if (context === "markup") {
      return processBlock({ scopeTo: tagName, css: raw });
    } else {
      return raw;
    }
  }
  function processBlock({
    css = "",
    scopeTo = "",
    disabled = false,
    instance = ""
  }) {
    if (disabled || !scopeTo)
      return css;
    const parsed = cssParser.parse(css);
    function changeRules(arr) {
      arr.forEach((v, i, a) => {
        if (v.type === "rule") {
          a[i].selectors = a[i].selectors.map((s) => `${scopeTo}${instance ? `.${instance}` : ""} ${s}`.replace(/(::slotted)\(\s*(.+)\s*\)/, "$2").replace(/([[a-zA-Z0-9_-]*)(::part)\(\s*(.+)\s*\)/, '$1 [part*="$3"][part*="$1"]').replace(":host", ""));
        }
        if (v.type === "media") {
          changeRules(a[i].rules);
        }
      });
    }
    changeRules(parsed.stylesheet?.rules);
    return cssParser.stringify(parsed);
  }
})();
/*! https://mths.be/punycode v1.3.2 by @mathias */
//!! Deliberately using an API that's deprecated in node.js because
//!! Discussion: github.com/node-browser-compat/atob/pull/9
//!! this file is for browsers and we expect them to cope with it.
