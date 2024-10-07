var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (k, r, l) {
    k != Array.prototype && k != Object.prototype && (k[r] = l.value)
};
$jscomp.getGlobal = function (k) {
    return "undefined" != typeof window && window === k ? k : "undefined" != typeof global && null != global ? global : k
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () { };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var k = 0; return function (r) {
        return $jscomp.SYMBOL_PREFIX + (r || "") + k++
    }
}();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var k = $jscomp.global.Symbol.iterator;
    k || (k = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[k] && $jscomp.defineProperty(Array.prototype, k, {
        configurable: !0, writable: !0, value:
            function () {
                return $jscomp.arrayIterator(this)
            }
    });
    $jscomp.initSymbolIterator = function () { }
};
$jscomp.arrayIterator = function (k) {
    var r = 0;
    return $jscomp.iteratorPrototype(function () {
        return r < k.length ? { done: !1, value: k[r++] } : { done: !0 }
    })
};
$jscomp.iteratorPrototype = function (k) {
    $jscomp.initSymbolIterator();
    k = {
        next: k
    };
    k[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return k
};
$jscomp.makeIterator = function (k) {
    $jscomp.initSymbolIterator();
    var r = k[Symbol.iterator];
    return r ? r.call(k) : $jscomp.arrayIterator(k)
};
$jscomp.arrayFromIterator = function (k) {
    for (var r, l = [];
        !(r = k.next()).done;
    )l.push(r.value);
    return l
};
$jscomp.arrayFromIterable = function (k) {
    return k instanceof Array ? k : $jscomp.arrayFromIterator($jscomp.makeIterator(k))
};
$jscomp.findInternal = function (k, r, l) {
    k instanceof String && (k = String(k));
    for (var w = k.length, n = 0; n < w; n++) {
        var g = k[n];
        if (r.call(l, g, n, k)) return {
            i: n, v: g
        }
    }
    return {
        i: -1, v: void 0
    }
};
$jscomp.polyfill = function (k, r, l, w) {
    if (r) {
        l = $jscomp.global; k = k.split(".");
        for (w = 0; w < k.length - 1; w++) {
            var n = k[w]; n in l || (l[n] = {});
            l = l[n]
        }
        k = k[k.length - 1]; w = l[k];
        r = r(w);
        r != w && null != r && $jscomp.defineProperty(l, k, {
            configurable: !0, writable: !0, value: r
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function (k) {
    return k ? k : function (k, l) {
        return $jscomp.findInternal(this, k, l).v
    }
}, "es6", "es3");
$jscomp.iteratorFromArray = function (k, r) {
    $jscomp.initSymbolIterator();
    k instanceof String && (k += "");
    var l = 0, w = {
        next: function () {
            if (l < k.length) {
                var n = l++; return {
                    value: r(n, k[n]), done: !1
                }
            }
            w.next = function () {
                return {
                    done: !0, value: void 0
                }
            };
            return w.next()
        }
    };
    w[Symbol.iterator] = function () { return w };
    return w
};
$jscomp.polyfill("Array.prototype.keys", function (k) { return k ? k : function () { return $jscomp.iteratorFromArray(this, function (k) { return k }) } }, "es6", "es3"); $jscomp.polyfill("Array.prototype.findIndex", function (k) { return k ? k : function (k, l) { return $jscomp.findInternal(this, k, l).i } }, "es6", "es3"); $jscomp.polyfill("Array.prototype.values", function (k) { return k ? k : function () { return $jscomp.iteratorFromArray(this, function (k, l) { return l }) } }, "es8", "es3");
$jscomp.polyfill("Object.is", function (k) { return k ? k : function (k, l) { return k === l ? 0 !== k || 1 / k === 1 / l : k !== k && l !== l } }, "es6", "es3"); $jscomp.polyfill("Array.prototype.includes", function (k) { return k ? k : function (k, l) { var r = this; r instanceof String && (r = String(r)); var n = r.length; l = l || 0; for (0 > l && (l = Math.max(l + n, 0)); l < n; l++) { var g = r[l]; if (g === k || Object.is(g, k)) return !0 } return !1 } }, "es7", "es3");
$jscomp.checkStringArgs = function (k, r, l) { if (null == k) throw new TypeError("The 'this' value for String.prototype." + l + " must not be null or undefined"); if (r instanceof RegExp) throw new TypeError("First argument to String.prototype." + l + " must not be a regular expression"); return k + "" }; $jscomp.polyfill("String.prototype.includes", function (k) { return k ? k : function (k, l) { return -1 !== $jscomp.checkStringArgs(this, k, "includes").indexOf(k, l || 0) } }, "es6", "es3"); $jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (k) {
    function r() { this.batch_ = null } function l(g) { return g instanceof n ? g : new n(function (k, c) { k(g) }) } if (k && !$jscomp.FORCE_POLYFILL_PROMISE) return k; r.prototype.asyncExecute = function (g) { null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_()); this.batch_.push(g); return this }; r.prototype.asyncExecuteBatch_ = function () { var g = this; this.asyncExecuteFunction(function () { g.executeBatch_() }) }; var w = $jscomp.global.setTimeout; r.prototype.asyncExecuteFunction = function (g) {
        w(g,
            0)
    }; r.prototype.executeBatch_ = function () { for (; this.batch_ && this.batch_.length;) { var g = this.batch_; this.batch_ = []; for (var k = 0; k < g.length; ++k) { var c = g[k]; g[k] = null; try { c() } catch (e) { this.asyncThrow_(e) } } } this.batch_ = null }; r.prototype.asyncThrow_ = function (g) { this.asyncExecuteFunction(function () { throw g; }) }; var n = function (g) { this.state_ = 0; this.result_ = void 0; this.onSettledCallbacks_ = []; var k = this.createResolveAndReject_(); try { g(k.resolve, k.reject) } catch (c) { k.reject(c) } }; n.prototype.createResolveAndReject_ =
        function () { function g(e) { return function (h) { c || (c = !0, e.call(k, h)) } } var k = this, c = !1; return { resolve: g(this.resolveTo_), reject: g(this.reject_) } }; n.prototype.resolveTo_ = function (g) { if (g === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (g instanceof n) this.settleSameAsPromise_(g); else { a: switch (typeof g) { case "object": var k = null != g; break a; case "function": k = !0; break a; default: k = !1 }k ? this.resolveToNonPromiseObj_(g) : this.fulfill_(g) } }; n.prototype.resolveToNonPromiseObj_ = function (g) {
            var k =
                void 0; try { k = g.then } catch (c) { this.reject_(c); return } "function" == typeof k ? this.settleSameAsThenable_(k, g) : this.fulfill_(g)
        }; n.prototype.reject_ = function (g) { this.settle_(2, g) }; n.prototype.fulfill_ = function (g) { this.settle_(1, g) }; n.prototype.settle_ = function (g, k) { if (0 != this.state_) throw Error("Cannot settle(" + g + ", " + k + "): Promise already settled in state" + this.state_); this.state_ = g; this.result_ = k; this.executeOnSettledCallbacks_() }; n.prototype.executeOnSettledCallbacks_ = function () {
            if (null != this.onSettledCallbacks_) {
                for (var k =
                    0; k < this.onSettledCallbacks_.length; ++k)g.asyncExecute(this.onSettledCallbacks_[k]); this.onSettledCallbacks_ = null
            }
        }; var g = new r; n.prototype.settleSameAsPromise_ = function (g) { var k = this.createResolveAndReject_(); g.callWhenSettled_(k.resolve, k.reject) }; n.prototype.settleSameAsThenable_ = function (g, k) { var c = this.createResolveAndReject_(); try { g.call(k, c.resolve, c.reject) } catch (e) { c.reject(e) } }; n.prototype.then = function (g, k) {
            function c(c, g) {
                return "function" == typeof c ? function (g) { try { e(c(g)) } catch (ea) { h(ea) } } :
                    g
            } var e, h, p = new n(function (c, g) { e = c; h = g }); this.callWhenSettled_(c(g, e), c(k, h)); return p
        }; n.prototype.catch = function (g) { return this.then(void 0, g) }; n.prototype.callWhenSettled_ = function (k, l) { function c() { switch (e.state_) { case 1: k(e.result_); break; case 2: l(e.result_); break; default: throw Error("Unexpected state: " + e.state_); } } var e = this; null == this.onSettledCallbacks_ ? g.asyncExecute(c) : this.onSettledCallbacks_.push(c) }; n.resolve = l; n.reject = function (g) { return new n(function (k, c) { c(g) }) }; n.race = function (g) {
            return new n(function (k,
                c) { for (var e = $jscomp.makeIterator(g), h = e.next(); !h.done; h = e.next())l(h.value).callWhenSettled_(k, c) })
        }; n.all = function (g) { var k = $jscomp.makeIterator(g), c = k.next(); return c.done ? l([]) : new n(function (e, h) { function g(c) { return function (h) { n[c] = h; r--; 0 == r && e(n) } } var n = [], r = 0; do n.push(void 0), r++, l(c.value).callWhenSettled_(g(n.length - 1), h), c = k.next(); while (!c.done) }) }; return n
}, "es6", "es3");
(function (k) {
    var r; (function (c, e) { "function" === typeof define && define.amd ? define(function () { return e(c) }) : e(c) })(this, function (c) {
        r = function () {
            function e(a) { return null == a ? String(a) : u[T.call(a)] || "object" } function h(a) { return "function" == e(a) } function g(a) { return null != a && a == a.window } function k(a) { return "object" == e(a) } function l(a) { return k(a) && !g(a) && Object.getPrototypeOf(a) == Object.prototype } function n(a) {
                var f = !!a && "length" in a && a.length, b = q.type(a); return "function" != b && !g(a) && ("array" == b || 0 === f ||
                    "number" == typeof f && 0 < f && f - 1 in a)
            } function r(a) { return t.call(a, function (a) { return null != a }) } function Y(a) { return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() } function G(a) { return a in Q ? Q[a] : Q[a] = new RegExp("(^|\\s)" + a + "(\\s|$)") } function w(a, f) { return "number" != typeof f || U[Y(a)] ? f : f + "px" } function H(a) { return "children" in a ? y.call(a.children) : q.map(a.childNodes, function (a) { if (1 == a.nodeType) return a }) } function L(a,
                f) { var b, m = a ? a.length : 0; for (b = 0; b < m; b++)this[b] = a[b]; this.length = m; this.selector = f || "" } function P(a, f, b) { for (z in f) b && (l(f[z]) || V(f[z])) ? (l(f[z]) && !l(a[z]) && (a[z] = {}), V(f[z]) && !V(a[z]) && (a[z] = []), P(a[z], f[z], b)) : f[z] !== x && (a[z] = f[z]) } function I(a, f) { return null == f ? q(a) : q(a).filter(f) } function D(a, f, b, m) { return h(f) ? f.call(a, b, m) : f } function F(a, f) { var b = a.className || "", m = b && b.baseVal !== x; if (f === x) return m ? b.baseVal : b; m ? b.baseVal = f : a.className = f } function d(a) {
                    try {
                        return a ? "true" == a || ("false" == a ? !1 :
                            "null" == a ? null : +a + "" == a ? +a : /^[\[\{]/.test(a) ? q.parseJSON(a) : a) : a
                    } catch (ka) { return a }
                } function J(a, f) { f(a); for (var b = 0, m = a.childNodes.length; b < m; b++)J(a.childNodes[b], f) } var x, z, K, C = [], E = C.concat, t = C.filter, y = C.slice, A = c.document, N = {}, Q = {}, U = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 }, R = /^\s*<(\w+|!)[^>]*>/, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, S = /^(?:body|html)$/i, ba = /([A-Z])/g, X = "val css html text data width height offset".split(" "),
                    O = A.createElement("table"), b = A.createElement("tr"), a = { tr: A.createElement("tbody"), tbody: O, thead: O, tfoot: O, td: b, th: b, "*": A.createElement("div") }, f = /complete|loaded|interactive/, m = /^[\w-]*$/, u = {}, T = u.toString, B = {}, ca = A.createElement("div"), ja = { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" },
                    V = Array.isArray || function (a) { return a instanceof Array }; B.matches = function (a, f) { if (!f || !a || 1 !== a.nodeType) return !1; var b = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector; if (b) return b.call(a, f); var m = a.parentNode; (b = !m) && (m = ca).appendChild(a); f = ~B.qsa(m, f).indexOf(a); b && ca.removeChild(a); return f }; var fa = function (a) { return a.replace(/-+(.)?/g, function (a, f) { return f ? f.toUpperCase() : "" }) }; var ha = function (a) {
                        return t.call(a, function (f, b) {
                            return a.indexOf(f) ==
                                b
                        })
                    }; B.fragment = function (f, b, m) { var u; v.test(f) && (u = q(A.createElement(RegExp.$1))); if (!u) { f.replace && (f = f.replace(aa, "<$1></$2>")); b === x && (b = R.test(f) && RegExp.$1); b in a || (b = "*"); var d = a[b]; d.innerHTML = "" + f; u = q.each(y.call(d.childNodes), function () { d.removeChild(this) }) } if (l(m)) { var c = q(u); q.each(m, function (a, f) { if (-1 < X.indexOf(a)) c[a](f); else c.attr(a, f) }) } return u }; B.Z = function (a, f) { return new L(a, f) }; B.isZ = function (a) { return a instanceof B.Z }; B.init = function (a, f) {
                        if (a) if ("string" == typeof a) if (a =
                            a.trim(), "<" == a[0] && R.test(a)) f = B.fragment(a, RegExp.$1, f), a = null; else { if (f !== x) return q(f).find(a); f = B.qsa(A, a) } else { if (h(a)) return q(A).ready(a); if (B.isZ(a)) return a; if (V(a)) f = r(a); else if (k(a)) f = [a], a = null; else if (R.test(a)) f = B.fragment(a.trim(), RegExp.$1, f), a = null; else { if (f !== x) return q(f).find(a); f = B.qsa(A, a) } } else return B.Z(); return B.Z(f, a)
                    }; var q = function (a, f) { return B.init(a, f) }; q.extend = function (a) {
                        var f = y.call(arguments, 1); if ("boolean" == typeof a) { var b = a; a = f.shift() } f.forEach(function (f) {
                            P(a,
                                f, b)
                        }); return a
                    }; B.qsa = function (a, f) { var b, u = "#" == f[0], d = !u && "." == f[0], c = u || d ? f.slice(1) : f, e = m.test(c); return a.getElementById && e && u ? (b = a.getElementById(c)) ? [b] : [] : 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType ? [] : y.call(e && !u && a.getElementsByClassName ? d ? a.getElementsByClassName(c) : a.getElementsByTagName(f) : a.querySelectorAll(f)) }; q.contains = A.documentElement.contains ? function (a, f) { return a !== f && a.contains(f) } : function (a, f) { for (; f && (f = f.parentNode);)if (f === a) return !0; return !1 }; q.type = e; q.isFunction =
                        h; q.isWindow = g; q.isArray = V; q.isPlainObject = l; q.isEmptyObject = function (a) { for (var f in a) return !1; return !0 }; q.isNumeric = function (a) { var f = Number(a), b = typeof a; return null != a && "boolean" != b && ("string" != b || a.length) && !isNaN(f) && isFinite(f) || !1 }; q.inArray = function (a, f, b) { return C.indexOf.call(f, a, b) }; q.camelCase = fa; q.trim = function (a) { return null == a ? "" : String.prototype.trim.call(a) }; q.uuid = 0; q.support = {}; q.expr = {}; q.noop = function () { }; q.map = function (a, f) {
                            var b = [], m; if (n(a)) for (m = 0; m < a.length; m++) {
                                var u =
                                    f(a[m], m); null != u && b.push(u)
                            } else for (m in a) u = f(a[m], m), null != u && b.push(u); return 0 < b.length ? q.fn.concat.apply([], b) : b
                        }; q.each = function (a, f) { var b; if (n(a)) for (b = 0; b < a.length && !1 !== f.call(a[b], b, a[b]); b++); else for (b in a) if (!1 === f.call(a[b], b, a[b])) break; return a }; q.grep = function (a, f) { return t.call(a, f) }; c.JSON && (q.parseJSON = JSON.parse); q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, f) { u["[object " + f + "]"] = f.toLowerCase() }); q.fn = {
                            constructor: B.Z, length: 0,
                            forEach: C.forEach, reduce: C.reduce, push: C.push, sort: C.sort, splice: C.splice, indexOf: C.indexOf, concat: function () { var a, f = []; for (a = 0; a < arguments.length; a++) { var b = arguments[a]; f[a] = B.isZ(b) ? b.toArray() : b } return E.apply(B.isZ(this) ? this.toArray() : this, f) }, map: function (a) { return q(q.map(this, function (f, b) { return a.call(f, b, f) })) }, slice: function () { return q(y.apply(this, arguments)) }, ready: function (a) { f.test(A.readyState) && A.body ? a(q) : A.addEventListener("DOMContentLoaded", function () { a(q) }, !1); return this },
                            get: function (a) { return a === x ? y.call(this) : this[0 <= a ? a : a + this.length] }, toArray: function () { return this.get() }, size: function () { return this.length }, remove: function () { return this.each(function () { null != this.parentNode && this.parentNode.removeChild(this) }) }, each: function (a) { C.every.call(this, function (f, b) { return !1 !== a.call(f, b, f) }); return this }, filter: function (a) { return h(a) ? this.not(this.not(a)) : q(t.call(this, function (f) { return B.matches(f, a) })) }, add: function (a, f) { return q(ha(this.concat(q(a, f)))) }, is: function (a) {
                                return 0 <
                                    this.length && B.matches(this[0], a)
                            }, not: function (a) { var f = []; if (h(a) && a.call !== x) this.each(function (b) { a.call(this, b) || f.push(this) }); else { var b = "string" == typeof a ? this.filter(a) : n(a) && h(a.item) ? y.call(a) : q(a); this.forEach(function (a) { 0 > b.indexOf(a) && f.push(a) }) } return q(f) }, has: function (a) { return this.filter(function () { return k(a) ? q.contains(this, a) : q(this).find(a).size() }) }, eq: function (a) { return -1 === a ? this.slice(a) : this.slice(a, +a + 1) }, first: function () { var a = this[0]; return a && !k(a) ? a : q(a) }, last: function () {
                                var a =
                                    this[this.length - 1]; return a && !k(a) ? a : q(a)
                            }, find: function (a) { var f = this; return a ? "object" == typeof a ? q(a).filter(function () { var a = this; return C.some.call(f, function (f) { return q.contains(f, a) }) }) : 1 == this.length ? q(B.qsa(this[0], a)) : this.map(function () { return B.qsa(this, a) }) : q() }, closest: function (a, f) { var b = [], m = "object" == typeof a && q(a); this.each(function (u, d) { for (; d && !(m ? 0 <= m.indexOf(d) : B.matches(d, a));)d = d !== f && !(null != d && d.nodeType == d.DOCUMENT_NODE) && d.parentNode; d && 0 > b.indexOf(d) && b.push(d) }); return q(b) },
                            parents: function (a) { for (var f = [], b = this; 0 < b.length;)b = q.map(b, function (a) { if ((a = a.parentNode) && (null == a || a.nodeType != a.DOCUMENT_NODE) && 0 > f.indexOf(a)) return f.push(a), a }); return I(f, a) }, parent: function (a) { return I(ha(this.pluck("parentNode")), a) }, children: function (a) { return I(this.map(function () { return H(this) }), a) }, contents: function () { return this.map(function () { return this.contentDocument || y.call(this.childNodes) }) }, siblings: function (a) {
                                return I(this.map(function (a, f) {
                                    return t.call(H(f.parentNode),
                                        function (a) { return a !== f })
                                }), a)
                            }, empty: function () { return this.each(function () { this.innerHTML = "" }) }, pluck: function (a) { return q.map(this, function (f) { return f[a] }) }, show: function () {
                                return this.each(function () {
                                    "none" == this.style.display && (this.style.display = ""); if ("none" == getComputedStyle(this, "").getPropertyValue("display")) {
                                        var a = this.style, f = this.nodeName; if (!N[f]) {
                                            var b = A.createElement(f); A.body.appendChild(b); var m = getComputedStyle(b, "").getPropertyValue("display"); b.parentNode.removeChild(b); "none" ==
                                                m && (m = "block"); N[f] = m
                                        } a.display = N[f]
                                    }
                                })
                            }, replaceWith: function (a) { return this.before(a).remove() }, wrap: function (a) { var f = h(a); if (this[0] && !f) var b = q(a).get(0), m = b.parentNode || 1 < this.length; return this.each(function (u) { q(this).wrapAll(f ? a.call(this, u) : m ? b.cloneNode(!0) : b) }) }, wrapAll: function (a) { if (this[0]) { q(this[0]).before(a = q(a)); for (var f; (f = a.children()).length;)a = f.first(); q(a).append(this) } return this }, wrapInner: function (a) {
                                var f = h(a); return this.each(function (b) {
                                    var m = q(this), u = m.contents();
                                    b = f ? a.call(this, b) : a; u.length ? u.wrapAll(b) : m.append(b)
                                })
                            }, unwrap: function () { this.parent().each(function () { q(this).replaceWith(q(this).children()) }); return this }, clone: function () { return this.map(function () { return this.cloneNode(!0) }) }, hide: function () { return this.css("display", "none") }, toggle: function (a) { return this.each(function () { var f = q(this); (a === x ? "none" == f.css("display") : a) ? f.show() : f.hide() }) }, prev: function (a) { return q(this.pluck("previousElementSibling")).filter(a || "*") }, next: function (a) {
                                return q(this.pluck("nextElementSibling")).filter(a ||
                                    "*")
                            }, html: function (a) { return 0 in arguments ? this.each(function (f) { var b = this.innerHTML; q(this).empty().append(D(this, a, f, b)) }) : 0 in this ? this[0].innerHTML : null }, text: function (a) { return 0 in arguments ? this.each(function (f) { f = D(this, a, f, this.textContent); this.textContent = null == f ? "" : "" + f }) : 0 in this ? this.pluck("textContent").join("") : null }, attr: function (a, f) {
                                var b; return "string" != typeof a || 1 in arguments ? this.each(function (b) {
                                    if (1 === this.nodeType) if (k(a)) for (z in a) {
                                        var m = z; b = a[z]; null == b ? this.removeAttribute(m) :
                                            this.setAttribute(m, b)
                                    } else m = a, b = D(this, f, b, this.getAttribute(a)), null == b ? this.removeAttribute(m) : this.setAttribute(m, b)
                                }) : 0 in this && 1 == this[0].nodeType && null != (b = this[0].getAttribute(a)) ? b : x
                            }, removeAttr: function (a) { return this.each(function () { 1 === this.nodeType && a.split(" ").forEach(function (a) { this.removeAttribute(a) }, this) }) }, prop: function (a, f) { a = ja[a] || a; return 1 in arguments ? this.each(function (b) { this[a] = D(this, f, b, this[a]) }) : this[0] && this[0][a] }, removeProp: function (a) { a = ja[a] || a; return this.each(function () { delete this[a] }) },
                            data: function (a, f) { var b = "data-" + a.replace(ba, "-$1").toLowerCase(); b = 1 in arguments ? this.attr(b, f) : this.attr(b); return null !== b ? d(b) : x }, val: function (a) { return 0 in arguments ? (null == a && (a = ""), this.each(function (f) { this.value = D(this, a, f, this.value) })) : this[0] && (this[0].multiple ? q(this[0]).find("option").filter(function () { return this.selected }).pluck("value") : this[0].value) }, offset: function (a) {
                                if (a) return this.each(function (f) {
                                    var b = q(this); f = D(this, a, f, b.offset()); var m = b.offsetParent().offset(); f =
                                        { top: f.top - m.top, left: f.left - m.left }; "static" == b.css("position") && (f.position = "relative"); b.css(f)
                                }); if (!this.length) return null; if (A.documentElement !== this[0] && !q.contains(A.documentElement, this[0])) return { top: 0, left: 0 }; var f = this[0].getBoundingClientRect(); return { left: f.left + c.pageXOffset, top: f.top + c.pageYOffset, width: Math.round(f.width), height: Math.round(f.height) }
                            }, css: function (a, f) {
                                if (2 > arguments.length) {
                                    var b = this[0]; if ("string" == typeof a) return b ? b.style[fa(a)] || getComputedStyle(b, "").getPropertyValue(a) :
                                        void 0; if (V(a)) { if (!b) return; var m = {}, u = getComputedStyle(b, ""); q.each(a, function (a, f) { m[f] = b.style[fa(f)] || u.getPropertyValue(f) }); return m }
                                } var d = ""; if ("string" == e(a)) f || 0 === f ? d = Y(a) + ":" + w(a, f) : this.each(function () { this.style.removeProperty(Y(a)) }); else for (z in a) a[z] || 0 === a[z] ? d += Y(z) + ":" + w(z, a[z]) + ";" : this.each(function () { this.style.removeProperty(Y(z)) }); return this.each(function () { this.style.cssText += ";" + d })
                            }, index: function (a) { return a ? this.indexOf(q(a)[0]) : this.parent().children().indexOf(this[0]) },
                            hasClass: function (a) { return a ? C.some.call(this, function (a) { return this.test(F(a)) }, G(a)) : !1 }, addClass: function (a) { return a ? this.each(function (f) { if ("className" in this) { K = []; var b = F(this); D(this, a, f, b).split(/\s+/g).forEach(function (a) { q(this).hasClass(a) || K.push(a) }, this); K.length && F(this, b + (b ? " " : "") + K.join(" ")) } }) : this }, removeClass: function (a) {
                                return this.each(function (f) {
                                    if ("className" in this) {
                                        if (a === x) return F(this, ""); K = F(this); D(this, a, f, K).split(/\s+/g).forEach(function (a) {
                                            K = K.replace(G(a),
                                                " ")
                                        }); F(this, K.trim())
                                    }
                                })
                            }, toggleClass: function (a, f) { return a ? this.each(function (b) { var m = q(this); D(this, a, b, F(this)).split(/\s+/g).forEach(function (a) { (f === x ? !m.hasClass(a) : f) ? m.addClass(a) : m.removeClass(a) }) }) : this }, scrollTop: function (a) { if (this.length) { var f = "scrollTop" in this[0]; return a === x ? f ? this[0].scrollTop : this[0].pageYOffset : this.each(f ? function () { this.scrollTop = a } : function () { this.scrollTo(this.scrollX, a) }) } }, scrollLeft: function (a) {
                                if (this.length) {
                                    var f = "scrollLeft" in this[0]; return a ===
                                        x ? f ? this[0].scrollLeft : this[0].pageXOffset : this.each(f ? function () { this.scrollLeft = a } : function () { this.scrollTo(a, this.scrollY) })
                                }
                            }, position: function () {
                                if (this.length) {
                                    var a = this[0], f = this.offsetParent(), b = this.offset(), m = S.test(f[0].nodeName) ? { top: 0, left: 0 } : f.offset(); b.top -= parseFloat(q(a).css("margin-top")) || 0; b.left -= parseFloat(q(a).css("margin-left")) || 0; m.top += parseFloat(q(f[0]).css("border-top-width")) || 0; m.left += parseFloat(q(f[0]).css("border-left-width")) || 0; return {
                                        top: b.top - m.top, left: b.left -
                                            m.left
                                    }
                                }
                            }, offsetParent: function () { return this.map(function () { for (var a = this.offsetParent || A.body; a && !S.test(a.nodeName) && "static" == q(a).css("position");)a = a.offsetParent; return a }) }
                        }; q.fn.detach = q.fn.remove;["width", "height"].forEach(function (a) {
                            var f = a.replace(/./, function (a) { return a[0].toUpperCase() }); q.fn[a] = function (b) {
                                var m, u = this[0]; return b === x ? g(u) ? u["inner" + f] : null != u && u.nodeType == u.DOCUMENT_NODE ? u.documentElement["scroll" + f] : (m = this.offset()) && m[a] : this.each(function (f) {
                                    u = q(this); u.css(a,
                                        D(this, b, f, u[a]()))
                                })
                            }
                        });["after", "prepend", "before", "append"].forEach(function (a, f) {
                            var b = f % 2; q.fn[a] = function () {
                                var a, m = q.map(arguments, function (f) { var b = []; a = e(f); return "array" == a ? (f.forEach(function (a) { if (a.nodeType !== x) return b.push(a); if (q.zepto.isZ(a)) return b = b.concat(a.get()); b = b.concat(B.fragment(a)) }), b) : "object" == a || null == f ? f : B.fragment(f) }), u, d = 1 < this.length; return 1 > m.length ? this : this.each(function (a, e) {
                                    u = b ? e : e.parentNode; e = 0 == f ? e.nextSibling : 1 == f ? e.firstChild : 2 == f ? e : null; var T = q.contains(A.documentElement,
                                        u); m.forEach(function (a) { if (d) a = a.cloneNode(!0); else if (!u) return q(a).remove(); u.insertBefore(a, e); T && J(a, function (a) { if (!(null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src)) { var f = a.ownerDocument ? a.ownerDocument.defaultView : c; f.eval.call(f, a.innerHTML) } }) })
                                })
                            }; q.fn[b ? a + "To" : "insert" + (f ? "Before" : "After")] = function (f) { q(f)[a](this); return this }
                        }); B.Z.prototype = L.prototype = q.fn; B.uniq = ha; B.deserializeValue = d; q.zepto = B; return q
        }(); (function (e) {
            function h(d) {
                return d._zid ||
                    (d._zid = Z++)
            } function g(d, c, e, g) { c = k(c); if (c.ns) var t = new RegExp("(?:^| )" + c.ns.replace(" ", " .* ?") + "(?: |$)"); return (D[h(d)] || []).filter(function (d) { return d && (!c.e || d.e == c.e) && (!c.ns || t.test(d.ns)) && (!e || h(d.fn) === h(e)) && (!g || d.sel == g) }) } function k(d) { d = ("" + d).split("."); return { e: d[0], ns: d.slice(1).sort().join(" ") } } function l(c) { return x[c] || d && J[c] || c } function n(c, g, A, p, n, r, M) {
                var y = h(c), t = D[y] || (D[y] = []); g.split(/\s/).forEach(function (h) {
                    if ("ready" == h) return e(document).ready(A); var g = k(h);
                    g.fn = A; g.sel = n; g.e in x && (A = function (d) { var b = d.relatedTarget; if (!b || b !== this && !e.contains(this, b)) return g.fn.apply(this, arguments) }); var y = (g.del = r) || A; g.proxy = function (d) { d = w(d); if (!d.isImmediatePropagationStopped()) { d.data = p; var b = y.apply(c, d._args == H ? [d] : [d].concat(d._args)); !1 === b && (d.preventDefault(), d.stopPropagation()); return b } }; g.i = t.length; t.push(g); "addEventListener" in c && c.addEventListener(l(g.e), g.proxy, g.del && !d && g.e in J || !!M)
                })
            } function r(c, e, k, p, n) {
                var y = h(c); (e || "").split(/\s/).forEach(function (e) {
                    g(c,
                        e, k, p).forEach(function (e) { delete D[y][e.i]; "removeEventListener" in c && c.removeEventListener(l(e.e), e.proxy, e.del && !d && e.e in J || !!n) })
                })
            } function w(d, c) { if (c || !d.isDefaultPrevented) if (c || (c = d), e.each(E, function (e, h) { var g = c[e]; d[e] = function () { this[h] = z; return g && g.apply(c, arguments) }; d[h] = K }), d.timeStamp || (d.timeStamp = Date.now()), c.defaultPrevented !== H ? c.defaultPrevented : "returnValue" in c ? !1 === c.returnValue : c.getPreventDefault && c.getPreventDefault()) d.isDefaultPrevented = z; return d } function G(d) {
                var c,
                    e = { originalEvent: d }; for (c in d) C.test(c) || d[c] === H || (e[c] = d[c]); return w(e, d)
            } var Z = 1, H, L = Array.prototype.slice, P = e.isFunction, I = function (d) { return "string" == typeof d }, D = {}, F = {}, d = "onfocusin" in c, J = { focus: "focusin", blur: "focusout" }, x = { mouseenter: "mouseover", mouseleave: "mouseout" }; F.click = F.mousedown = F.mouseup = F.mousemove = "MouseEvents"; e.event = { add: n, remove: r }; e.proxy = function (d, c) {
                var g = 2 in arguments && L.call(arguments, 2); if (P(d)) {
                    var k = function () { return d.apply(c, g ? g.concat(L.call(arguments)) : arguments) };
                    k._zid = h(d); return k
                } if (I(c)) return g ? (g.unshift(d[c], d), e.proxy.apply(null, g)) : e.proxy(d[c], d); throw new TypeError("expected function");
            }; e.fn.bind = function (d, c, e) { return this.on(d, c, e) }; e.fn.unbind = function (d, c) { return this.off(d, c) }; e.fn.one = function (d, c, e, h) { return this.on(d, c, e, h, 1) }; var z = function () { return !0 }, K = function () { return !1 }, C = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/, E = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };
            e.fn.delegate = function (d, c, e) { return this.on(c, d, e) }; e.fn.undelegate = function (d, c, e) { return this.off(c, d, e) }; e.fn.live = function (d, c) { e(document.body).delegate(this.selector, d, c); return this }; e.fn.die = function (d, c) { e(document.body).undelegate(this.selector, d, c); return this }; e.fn.on = function (d, c, h, g, k) {
                var y, t, p = this; if (d && !I(d)) return e.each(d, function (d, e) { p.on(d, c, h, e, k) }), p; I(c) || P(g) || !1 === g || (g = h, h = c, c = H); if (g === H || !1 === h) g = h, h = H; !1 === g && (g = K); return p.each(function (p, l) {
                    k && (y = function (d) {
                        r(l,
                            d.type, g); return g.apply(this, arguments)
                    }); c && (t = function (d) { var h = e(d.target).closest(c, l).get(0); if (h && h !== l) { var k = e.extend(G(d), { currentTarget: h, liveFired: l }); return (y || g).apply(h, [k].concat(L.call(arguments, 1))) } }); n(l, d, g, h, c, t || y)
                })
            }; e.fn.off = function (d, c, h) { var g = this; if (d && !I(d)) return e.each(d, function (d, e) { g.off(d, c, e) }), g; I(c) || P(h) || !1 === h || (h = c, c = H); !1 === h && (h = K); return g.each(function () { r(this, d, h, c) }) }; e.fn.trigger = function (d, c) {
                d = I(d) || e.isPlainObject(d) ? e.Event(d) : w(d); d._args = c;
                return this.each(function () { if (d.type in J && "function" == typeof this[d.type]) this[d.type](); else "dispatchEvent" in this ? this.dispatchEvent(d) : e(this).triggerHandler(d, c) })
            }; e.fn.triggerHandler = function (d, c) { var h, k; this.each(function (y, t) { h = G(I(d) ? e.Event(d) : d); h._args = c; h.target = t; e.each(g(t, d.type || d), function (d, c) { k = c.proxy(h); if (h.isImmediatePropagationStopped()) return !1 }) }); return k }; "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (d) {
                e.fn[d] =
                    function (c) { return 0 in arguments ? this.bind(d, c) : this.trigger(d) }
            }); e.Event = function (d, c) { I(d) || (c = d, d = c.type); var e = document.createEvent(F[d] || "Events"), h = !0; if (c) for (var g in c) "bubbles" == g ? h = !!c[g] : e[g] = c[g]; e.initEvent(d, h, !0); return w(e) }
        })(r); (function (e) {
            function h(d, c, h, g) { if (d.global) return d = c || D, h = e.Event(h), e(d).trigger(h, g), !h.isDefaultPrevented() } function g(d) { d.global && 0 === e.active++ && h(d, null, "ajaxStart") } function k(d, c) {
                var e = c.context; if (!1 === c.beforeSend.call(e, d, c) || !1 === h(c, e,
                    "ajaxBeforeSend", [d, c])) return !1; h(c, e, "ajaxSend", [d, c])
            } function l(d, c, e, g) { var k = e.context; e.success.call(k, d, "success", c); g && g.resolveWith(k, [d, "success", c]); h(e, k, "ajaxSuccess", [c, e, d]); r("success", c, e) } function n(d, c, e, g, k) { var y = g.context; g.error.call(y, e, c, d); k && k.rejectWith(y, [e, c, d]); h(g, y, "ajaxError", [e, g, d || c]); r(c, e, g) } function r(d, c, g) { var k = g.context; g.complete.call(k, c, d); h(g, k, "ajaxComplete", [c, g]); g.global && !--e.active && h(g, null, "ajaxStop") } function w() { } function G(d) {
                d && (d = d.split(";",
                    2)[0]); return d && ("text/html" == d ? "html" : "application/json" == d ? "json" : x.test(d) ? "script" : z.test(d) && "xml") || "text"
            } function Z(d, c) { return "" == c ? d : (d + "&" + c).replace(/[&?]{1,2}/, "?") } function H(d) { d.processData && d.data && "string" != e.type(d.data) && (d.data = e.param(d.data, d.traditional)); !d.data || d.type && "GET" != d.type.toUpperCase() && "jsonp" != d.dataType || (d.url = Z(d.url, d.data), d.data = void 0) } function L(d, c, h, g) {
                e.isFunction(c) && (g = h, h = c, c = void 0); e.isFunction(h) || (g = h, h = void 0); return {
                    url: d, data: c, success: h,
                    dataType: g
                }
            } function E(d, c, h, g) { var k, p = e.isArray(c), l = e.isPlainObject(c); e.each(c, function (c, y) { k = e.type(y); g && (c = h ? g : g + "[" + (l || "object" == k || "array" == k ? c : "") + "]"); !g && p ? d.add(y.name, y.value) : "array" == k || !h && "object" == k ? E(d, y, h, c) : d.add(c, y) }) } var I = +new Date, D = c.document, F, d, J = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, x = /^(?:text|application)\/javascript/i, z = /^(?:text|application)\/xml/i, K = /^\s*$/, C = D.createElement("a"); C.href = c.location.href; e.active = 0; e.ajaxJSONP = function (d, h) {
                if (!("type" in
                    d)) return e.ajax(d); var g = d.jsonpCallback, p = (e.isFunction(g) ? g() : g) || "Zepto" + I++, y = D.createElement("script"), r = c[p], t, v = function (d) { e(y).triggerHandler("error", d || "abort") }, w = { abort: v }, x; h && h.promise(w); e(y).on("load error", function (g, k) { clearTimeout(x); e(y).off().remove(); "error" != g.type && t ? l(t[0], w, d, h) : n(null, k || "error", w, d, h); c[p] = r; t && e.isFunction(r) && r(t[0]); r = t = void 0 }); if (!1 === k(w, d)) return v("abort"), w; c[p] = function () { t = arguments }; y.src = d.url.replace(/\?(.+)=\?/, "?$1=" + p); D.head.appendChild(y);
                0 < d.timeout && (x = setTimeout(function () { v("timeout") }, d.timeout)); return w
            }; e.ajaxSettings = { type: "GET", beforeSend: w, success: w, error: w, complete: w, context: null, global: !0, xhr: function () { return new c.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: "application/json", xml: "application/xml, text/xml", html: "text/html", text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0, dataFilter: w }; e.ajax = function (h) {
                var p = e.extend({}, h || {}), r = e.Deferred &&
                    e.Deferred(); for (F in e.ajaxSettings) void 0 === p[F] && (p[F] = e.ajaxSettings[F]); g(p); if (!p.crossDomain) { var t = D.createElement("a"); t.href = p.url; t.href = t.href; p.crossDomain = C.protocol + "//" + C.host !== t.protocol + "//" + t.host } p.url || (p.url = c.location.toString()); -1 < (t = p.url.indexOf("#")) && (p.url = p.url.slice(0, t)); H(p); var x = p.dataType; (t = /\?.+=\?/.test(p.url)) && (x = "jsonp"); !1 !== p.cache && (h && !0 === h.cache || "script" != x && "jsonp" != x) || (p.url = Z(p.url, "_=" + Date.now())); if ("jsonp" == x) return t || (p.url = Z(p.url, p.jsonp ?
                        p.jsonp + "=?" : !1 === p.jsonp ? "" : "callback=?")), e.ajaxJSONP(p, r); h = p.accepts[x]; var M = {}; t = function (d, c) { M[d.toLowerCase()] = [d, c] }; var z = /^([\w-]+:)\/\//.test(p.url) ? RegExp.$1 : c.location.protocol, v = p.xhr(), ea = v.setRequestHeader, da; r && r.promise(v); p.crossDomain || t("X-Requested-With", "XMLHttpRequest"); t("Accept", h || "*/*"); if (h = p.mimeType || h) -1 < h.indexOf(",") && (h = h.split(",", 2)[0]), v.overrideMimeType && v.overrideMimeType(h); (p.contentType || !1 !== p.contentType && p.data && "GET" != p.type.toUpperCase()) && t("Content-Type",
                            p.contentType || "application/x-www-form-urlencoded"); if (p.headers) for (d in p.headers) t(d, p.headers[d]); v.setRequestHeader = t; v.onreadystatechange = function () {
                                if (4 == v.readyState) {
                                    v.onreadystatechange = w; clearTimeout(da); var d = !1; if (200 <= v.status && 300 > v.status || 304 == v.status || 0 == v.status && "file:" == z) {
                                        x = x || G(p.mimeType || v.getResponseHeader("content-type")); if ("arraybuffer" == v.responseType || "blob" == v.responseType) var c = v.response; else {
                                            c = v.responseText; try {
                                                c = p.dataFilter == w ? c : p.dataFilter.call(p.context, c,
                                                    x), "script" == x ? (0, eval)(c) : "xml" == x ? c = v.responseXML : "json" == x && (c = K.test(c) ? null : e.parseJSON(c))
                                            } catch (O) { d = O } if (d) return n(d, "parsererror", v, p, r)
                                        } l(c, v, p, r)
                                    } else n(v.statusText || null, v.status ? "error" : "abort", v, p, r)
                                }
                            }; if (!1 === k(v, p)) return v.abort(), n(null, "abort", v, p, r), v; v.open(p.type, p.url, "async" in p ? p.async : !0, p.username, p.password); if (p.xhrFields) for (d in p.xhrFields) v[d] = p.xhrFields[d]; for (d in M) ea.apply(v, M[d]); 0 < p.timeout && (da = setTimeout(function () {
                                v.onreadystatechange = w; v.abort(); n(null,
                                    "timeout", v, p, r)
                            }, p.timeout)); v.send(p.data ? p.data : null); return v
            }; e.get = function () { return e.ajax(L.apply(null, arguments)) }; e.post = function () { var d = L.apply(null, arguments); d.type = "POST"; return e.ajax(d) }; e.getJSON = function () { var d = L.apply(null, arguments); d.dataType = "json"; return e.ajax(d) }; e.fn.load = function (d, c, h) {
                if (!this.length) return this; var g = this, k = d.split(/\s/); d = L(d, c, h); var p = d.success; if (1 < k.length) { d.url = k[0]; var l = k[1] } d.success = function (d) {
                    g.html(l ? e("<div>").html(d.replace(J, "")).find(l) :
                        d); p && p.apply(g, arguments)
                }; e.ajax(d); return this
            }; var W = encodeURIComponent; e.param = function (d, c) { var h = []; h.add = function (d, c) { e.isFunction(c) && (c = c()); null == c && (c = ""); this.push(W(d) + "=" + W(c)) }; E(h, d, c); return h.join("&").replace(/%20/g, "+") }
        })(r); (function (c) {
            c.fn.serializeArray = function () {
                var e, g, k = [], l = function (c) { if (c.forEach) return c.forEach(l); k.push({ name: e, value: c }) }; this[0] && c.each(this[0].elements, function (h, k) {
                    g = k.type; (e = k.name) && "fieldset" != k.nodeName.toLowerCase() && !k.disabled && "submit" !=
                        g && "reset" != g && "button" != g && "file" != g && ("radio" != g && "checkbox" != g || k.checked) && l(c(k).val())
                }); return k
            }; c.fn.serialize = function () { var c = []; this.serializeArray().forEach(function (e) { c.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)) }); return c.join("&") }; c.fn.submit = function (e) { if (0 in arguments) this.bind("submit", e); else if (this.length) { var h = c.Event("submit"); this.eq(0).trigger(h); h.isDefaultPrevented() || this.get(0).submit() } return this }
        })(r); (function () {
            try { getComputedStyle(void 0) } catch (h) {
                var e =
                    getComputedStyle; c.getComputedStyle = function (c, h) { try { return e(c, h) } catch (da) { return null } }
            }
        })(); return r
    }); (function () {
        function c(a) { return function (f, b, c, e) { b = J(b, e, 4); var m = !y(f) && d.keys(f), u = (m || f).length, h = 0 < a ? 0 : u - 1; 3 > arguments.length && (c = f[m ? m[h] : h], h += a); for (var g = b, T = c; 0 <= h && h < u; h += a) { var k = m ? m[h] : h; T = g(T, f[k], k, f) } return T } } function e(a) { return function (f, b, d) { b = x(b, d); d = t(f); for (var c = 0 < a ? 0 : d - 1; 0 <= c && c < d; c += a)if (b(f[c], c, f)) return c; return -1 } } function h(a, f, b) {
            return function (c, m, e) {
                var u =
                    0, h = t(c); if ("number" == typeof e) 0 < a ? u = 0 <= e ? e : Math.max(e + h, u) : h = 0 <= e ? Math.min(e + 1, h) : e + h + 1; else if (b && e && h) return e = b(c, m), c[e] === m ? e : -1; if (m !== m) return e = f(G.call(c, u, h), d.isNaN), 0 <= e ? e + u : -1; for (e = 0 < a ? u : h - 1; 0 <= e && e < h; e += a)if (c[e] === m) return e; return -1
            }
        } function g(a, f) { var b = R.length, c = a.constructor; c = d.isFunction(c) && c.prototype || r; var e = "constructor"; for (d.has(a, e) && !d.contains(f, e) && f.push(e); b--;)e = R[b], e in a && a[e] !== c[e] && !d.contains(f, e) && f.push(e) } var k = this, l = k._, n = Array.prototype, r = Object.prototype,
            w = n.push, G = n.slice, E = r.toString, H = r.hasOwnProperty, L = Array.isArray, P = Object.keys, I = Function.prototype.bind, D = Object.create, F = function () { }, d = function (a) { if (a instanceof d) return a; if (!(this instanceof d)) return new d(a); this._wrapped = a }; "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = d), exports._ = d) : k._ = d; d.VERSION = "1.8.3"; var J = function (a, f, b) {
                if (void 0 === f) return a; switch (null == b ? 3 : b) {
                    case 1: return function (b) { return a.call(f, b) }; case 2: return function (b,
                        d) { return a.call(f, b, d) }; case 3: return function (b, d, c) { return a.call(f, b, d, c) }; case 4: return function (b, d, c, m) { return a.call(f, b, d, c, m) }
                }return function () { return a.apply(f, arguments) }
            }, x = function (a, f, b) { return null == a ? d.identity : d.isFunction(a) ? J(a, f, b) : d.isObject(a) ? d.matcher(a) : d.property(a) }; d.iteratee = function (a, f) { return x(a, f, Infinity) }; var z = function (a, f) {
                return function (b) {
                    var d = arguments.length; if (2 > d || null == b) return b; for (var c = 1; c < d; c++)for (var m = arguments[c], e = a(m), h = e.length, g = 0; g < h; g++) {
                        var k =
                            e[g]; f && void 0 !== b[k] || (b[k] = m[k])
                    } return b
                }
            }, K = function (a) { if (!d.isObject(a)) return {}; if (D) return D(a); F.prototype = a; a = new F; F.prototype = null; return a }, C = function (a) { return function (f) { return null == f ? void 0 : f[a] } }, W = Math.pow(2, 53) - 1, t = C("length"), y = function (a) { a = t(a); return "number" == typeof a && 0 <= a && a <= W }; d.each = d.forEach = function (a, f, b) { f = J(f, b); var c; if (y(a)) for (b = 0, c = a.length; b < c; b++)f(a[b], b, a); else { var m = d.keys(a); b = 0; for (c = m.length; b < c; b++)f(a[m[b]], m[b], a) } return a }; d.map = d.collect = function (a,
                f, b) { f = x(f, b); b = !y(a) && d.keys(a); for (var c = (b || a).length, m = Array(c), e = 0; e < c; e++) { var h = b ? b[e] : e; m[e] = f(a[h], h, a) } return m }; d.reduce = d.foldl = d.inject = c(1); d.reduceRight = d.foldr = c(-1); d.find = d.detect = function (a, f, b) { f = y(a) ? d.findIndex(a, f, b) : d.findKey(a, f, b); if (void 0 !== f && -1 !== f) return a[f] }; d.filter = d.select = function (a, f, b) { var c = []; f = x(f, b); d.each(a, function (a, b, d) { f(a, b, d) && c.push(a) }); return c }; d.reject = function (a, f, b) { return d.filter(a, d.negate(x(f)), b) }; d.every = d.all = function (a, f, b) {
                    f = x(f, b);
                    b = !y(a) && d.keys(a); for (var c = (b || a).length, m = 0; m < c; m++) { var e = b ? b[m] : m; if (!f(a[e], e, a)) return !1 } return !0
                }; d.some = d.any = function (a, f, b) { f = x(f, b); b = !y(a) && d.keys(a); for (var c = (b || a).length, m = 0; m < c; m++) { var e = b ? b[m] : m; if (f(a[e], e, a)) return !0 } return !1 }; d.contains = d.includes = d.include = function (a, f, b, c) { y(a) || (a = d.values(a)); if ("number" != typeof b || c) b = 0; return 0 <= d.indexOf(a, f, b) }; d.invoke = function (a, f) {
                    var b = G.call(arguments, 2), c = d.isFunction(f); return d.map(a, function (a) {
                        var d = c ? f : a[f]; return null == d ?
                            d : d.apply(a, b)
                    })
                }; d.pluck = function (a, f) { return d.map(a, d.property(f)) }; d.where = function (a, f) { return d.filter(a, d.matcher(f)) }; d.findWhere = function (a, f) { return d.find(a, d.matcher(f)) }; d.max = function (a, f, b) { var c = -Infinity, m = -Infinity, e; if (null == f && null != a) { a = y(a) ? a : d.values(a); for (var h = 0, g = a.length; h < g; h++)b = a[h], b > c && (c = b) } else f = x(f, b), d.each(a, function (a, b, d) { e = f(a, b, d); if (e > m || -Infinity === e && -Infinity === c) c = a, m = e }); return c }; d.min = function (a, f, b) {
                    var c = Infinity, m = Infinity, e; if (null == f && null !=
                        a) { a = y(a) ? a : d.values(a); for (var h = 0, g = a.length; h < g; h++)b = a[h], b < c && (c = b) } else f = x(f, b), d.each(a, function (a, b, d) { e = f(a, b, d); if (e < m || Infinity === e && Infinity === c) c = a, m = e }); return c
                }; d.shuffle = function (a) { a = y(a) ? a : d.values(a); for (var f = a.length, b = Array(f), c = 0, e; c < f; c++)e = d.random(0, c), e !== c && (b[c] = b[e]), b[e] = a[c]; return b }; d.sample = function (a, f, b) { return null == f || b ? (y(a) || (a = d.values(a)), a[d.random(a.length - 1)]) : d.shuffle(a).slice(0, Math.max(0, f)) }; d.sortBy = function (a, f, b) {
                    f = x(f, b); return d.pluck(d.map(a,
                        function (a, b, d) { return { value: a, index: b, criteria: f(a, b, d) } }).sort(function (a, f) { var b = a.criteria, d = f.criteria; if (b !== d) { if (b > d || void 0 === b) return 1; if (b < d || void 0 === d) return -1 } return a.index - f.index }), "value")
                }; var A = function (a) { return function (f, b, c) { var m = {}; b = x(b, c); d.each(f, function (d, c) { c = b(d, c, f); a(m, d, c) }); return m } }; d.groupBy = A(function (a, f, b) { d.has(a, b) ? a[b].push(f) : a[b] = [f] }); d.indexBy = A(function (a, f, b) { a[b] = f }); d.countBy = A(function (a, f, b) { d.has(a, b) ? a[b]++ : a[b] = 1 }); d.toArray = function (a) {
                    return a ?
                        d.isArray(a) ? G.call(a) : y(a) ? d.map(a, d.identity) : d.values(a) : []
                }; d.size = function (a) { return null == a ? 0 : y(a) ? a.length : d.keys(a).length }; d.partition = function (a, f, b) { f = x(f, b); var c = [], e = []; d.each(a, function (a, b, d) { (f(a, b, d) ? c : e).push(a) }); return [c, e] }; d.first = d.head = d.take = function (a, f, b) { if (null != a) return null == f || b ? a[0] : d.initial(a, a.length - f) }; d.initial = function (a, f, b) { return G.call(a, 0, Math.max(0, a.length - (null == f || b ? 1 : f))) }; d.last = function (a, f, b) {
                    if (null != a) return null == f || b ? a[a.length - 1] : d.rest(a,
                        Math.max(0, a.length - f))
                }; d.rest = d.tail = d.drop = function (a, f, b) { return G.call(a, null == f || b ? 1 : f) }; d.compact = function (a) { return d.filter(a, d.identity) }; var N = function (a, f, b, c) { var e = [], m = 0; c = c || 0; for (var h = t(a); c < h; c++) { var g = a[c]; if (y(g) && (d.isArray(g) || d.isArguments(g))) { f || (g = N(g, f, b)); var u = 0, k = g.length; for (e.length += k; u < k;)e[m++] = g[u++] } else b || (e[m++] = g) } return e }; d.flatten = function (a, f) { return N(a, f, !1) }; d.without = function (a) { return d.difference(a, G.call(arguments, 1)) }; d.uniq = d.unique = function (a,
                    f, b, c) { d.isBoolean(f) || (c = b, b = f, f = !1); null != b && (b = x(b, c)); c = []; for (var e = [], m = 0, h = t(a); m < h; m++) { var g = a[m], u = b ? b(g, m, a) : g; f ? (m && e === u || c.push(g), e = u) : b ? d.contains(e, u) || (e.push(u), c.push(g)) : d.contains(c, g) || c.push(g) } return c }; d.union = function () { return d.uniq(N(arguments, !0, !0)) }; d.intersection = function (a) { for (var f = [], b = arguments.length, c = 0, e = t(a); c < e; c++) { var h = a[c]; if (!d.contains(f, h)) { for (var g = 1; g < b && d.contains(arguments[g], h); g++); g === b && f.push(h) } } return f }; d.difference = function (a) {
                        var f =
                            N(arguments, !0, !0, 1); return d.filter(a, function (a) { return !d.contains(f, a) })
                    }; d.zip = function () { return d.unzip(arguments) }; d.unzip = function (a) { for (var f = a && d.max(a, t).length || 0, b = Array(f), c = 0; c < f; c++)b[c] = d.pluck(a, c); return b }; d.object = function (a, f) { for (var b = {}, d = 0, c = t(a); d < c; d++)f ? b[a[d]] = f[d] : b[a[d][0]] = a[d][1]; return b }; d.findIndex = e(1); d.findLastIndex = e(-1); d.sortedIndex = function (a, f, b, d) { b = x(b, d, 1); f = b(f); d = 0; for (var c = t(a); d < c;) { var e = Math.floor((d + c) / 2); b(a[e]) < f ? d = e + 1 : c = e } return d }; d.indexOf =
                        h(1, d.findIndex, d.sortedIndex); d.lastIndexOf = h(-1, d.findLastIndex); d.range = function (a, f, b) { null == f && (f = a || 0, a = 0); b = b || 1; f = Math.max(Math.ceil((f - a) / b), 0); for (var d = Array(f), c = 0; c < f; c++, a += b)d[c] = a; return d }; var Q = function (a, f, b, c, e) { if (!(c instanceof f)) return a.apply(b, e); f = K(a.prototype); a = a.apply(f, e); return d.isObject(a) ? a : f }; d.bind = function (a, f) {
                            if (I && a.bind === I) return I.apply(a, G.call(arguments, 1)); if (!d.isFunction(a)) throw new TypeError("Bind must be called on a function"); var b = G.call(arguments,
                                2), c = function () { return Q(a, c, f, this, b.concat(G.call(arguments))) }; return c
                        }; d.partial = function (a) { var f = G.call(arguments, 1), b = function () { for (var c = 0, e = f.length, m = Array(e), h = 0; h < e; h++)m[h] = f[h] === d ? arguments[c++] : f[h]; for (; c < arguments.length;)m.push(arguments[c++]); return Q(a, b, this, this, m) }; return b }; d.bindAll = function (a) { var f, b = arguments.length; if (1 >= b) throw Error("bindAll must be passed function names"); for (f = 1; f < b; f++) { var c = arguments[f]; a[c] = d.bind(a[c], a) } return a }; d.memoize = function (a, b) {
                            var f =
                                function (c) { var e = f.cache, m = "" + (b ? b.apply(this, arguments) : c); d.has(e, m) || (e[m] = a.apply(this, arguments)); return e[m] }; f.cache = {}; return f
                        }; d.delay = function (a, b) { var f = G.call(arguments, 2); return setTimeout(function () { return a.apply(null, f) }, b) }; d.defer = d.partial(d.delay, d, 1); d.throttle = function (a, b, c) {
                            var f, e, m, h = null, g = 0; c || (c = {}); var k = function () { g = !1 === c.leading ? 0 : d.now(); h = null; m = a.apply(f, e); h || (f = e = null) }; return function () {
                                var u = d.now(); g || !1 !== c.leading || (g = u); var p = b - (u - g); f = this; e = arguments;
                                0 >= p || p > b ? (h && (clearTimeout(h), h = null), g = u, m = a.apply(f, e), h || (f = e = null)) : h || !1 === c.trailing || (h = setTimeout(k, p)); return m
                            }
                        }; d.debounce = function (a, b, c) { var f, e, h, m, g, k = function () { var u = d.now() - m; u < b && 0 <= u ? f = setTimeout(k, b - u) : (f = null, c || (g = a.apply(h, e), f || (h = e = null))) }; return function () { h = this; e = arguments; m = d.now(); var u = c && !f; f || (f = setTimeout(k, b)); u && (g = a.apply(h, e), h = e = null); return g } }; d.wrap = function (a, b) { return d.partial(b, a) }; d.negate = function (a) { return function () { return !a.apply(this, arguments) } };
        d.compose = function () { var a = arguments, b = a.length - 1; return function () { for (var f = b, c = a[b].apply(this, arguments); f--;)c = a[f].call(this, c); return c } }; d.after = function (a, b) { return function () { if (1 > --a) return b.apply(this, arguments) } }; d.before = function (a, b) { var f; return function () { 0 < --a && (f = b.apply(this, arguments)); 1 >= a && (b = null); return f } }; d.once = d.partial(d.before, 2); var U = !{ toString: null }.propertyIsEnumerable("toString"), R = "valueOf isPrototypeOf toString propertyIsEnumerable hasOwnProperty toLocaleString".split(" ");
        d.keys = function (a) { if (!d.isObject(a)) return []; if (P) return P(a); var b = [], c; for (c in a) d.has(a, c) && b.push(c); U && g(a, b); return b }; d.allKeys = function (a) { if (!d.isObject(a)) return []; var b = [], c; for (c in a) b.push(c); U && g(a, b); return b }; d.values = function (a) { for (var b = d.keys(a), c = b.length, e = Array(c), h = 0; h < c; h++)e[h] = a[b[h]]; return e }; d.mapObject = function (a, b, c) { b = x(b, c); c = d.keys(a); for (var f = c.length, e = {}, h, m = 0; m < f; m++)h = c[m], e[h] = b(a[h], h, a); return e }; d.pairs = function (a) {
            for (var b = d.keys(a), c = b.length, e = Array(c),
                h = 0; h < c; h++)e[h] = [b[h], a[b[h]]]; return e
        }; d.invert = function (a) { for (var b = {}, c = d.keys(a), e = 0, h = c.length; e < h; e++)b[a[c[e]]] = c[e]; return b }; d.functions = d.methods = function (a) { var b = [], c; for (c in a) d.isFunction(a[c]) && b.push(c); return b.sort() }; d.extend = z(d.allKeys); d.extendOwn = d.assign = z(d.keys); d.findKey = function (a, b, c) { b = x(b, c); c = d.keys(a); for (var f, e = 0, h = c.length; e < h; e++)if (f = c[e], b(a[f], f, a)) return f }; d.pick = function (a, b, c) {
            var f = {}, e = a; if (null == e) return f; if (d.isFunction(b)) {
                var h = d.allKeys(e); var g =
                    J(b, c)
            } else h = N(arguments, !1, !1, 1), g = function (a, b, f) { return b in f }, e = Object(e); for (var m = 0, k = h.length; m < k; m++) { var p = h[m], l = e[p]; g(l, p, e) && (f[p] = l) } return f
        }; d.omit = function (a, b, c) { if (d.isFunction(b)) b = d.negate(b); else { var f = d.map(N(arguments, !1, !1, 1), String); b = function (a, b) { return !d.contains(f, b) } } return d.pick(a, b, c) }; d.defaults = z(d.allKeys, !0); d.create = function (a, b) { a = K(a); b && d.extendOwn(a, b); return a }; d.clone = function (a) { return d.isObject(a) ? d.isArray(a) ? a.slice() : d.extend({}, a) : a }; d.tap = function (a,
            b) { b(a); return a }; d.isMatch = function (a, b) { var f = d.keys(b), c = f.length; if (null == a) return !c; a = Object(a); for (var e = 0; e < c; e++) { var h = f[e]; if (b[h] !== a[h] || !(h in a)) return !1 } return !0 }; var v = function (a, b, c, e) {
                if (a === b) return 0 !== a || 1 / a === 1 / b; if (null == a || null == b) return a === b; a instanceof d && (a = a._wrapped); b instanceof d && (b = b._wrapped); var f = E.call(a); if (f !== E.call(b)) return !1; switch (f) {
                    case "[object RegExp]": case "[object String]": return "" + a === "" + b; case "[object Number]": return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a ===
                        1 / b : +a === +b; case "[object Date]": case "[object Boolean]": return +a === +b
                }f = "[object Array]" === f; if (!f) { if ("object" != typeof a || "object" != typeof b) return !1; var h = a.constructor, g = b.constructor; if (h !== g && !(d.isFunction(h) && h instanceof h && d.isFunction(g) && g instanceof g) && "constructor" in a && "constructor" in b) return !1 } c = c || []; e = e || []; for (h = c.length; h--;)if (c[h] === a) return e[h] === b; c.push(a); e.push(b); if (f) { h = a.length; if (h !== b.length) return !1; for (; h--;)if (!v(a[h], b[h], c, e)) return !1 } else {
                    f = d.keys(a); h = f.length;
                    if (d.keys(b).length !== h) return !1; for (; h--;)if (g = f[h], !d.has(b, g) || !v(a[g], b[g], c, e)) return !1
                } c.pop(); e.pop(); return !0
            }; d.isEqual = function (a, b) { return v(a, b) }; d.isEmpty = function (a) { return null == a ? !0 : y(a) && (d.isArray(a) || d.isString(a) || d.isArguments(a)) ? 0 === a.length : 0 === d.keys(a).length }; d.isElement = function (a) { return !(!a || 1 !== a.nodeType) }; d.isArray = L || function (a) { return "[object Array]" === E.call(a) }; d.isObject = function (a) { var b = typeof a; return "function" === b || "object" === b && !!a }; d.each("Arguments Function String Number Date RegExp Error".split(" "),
                function (a) { d["is" + a] = function (b) { return E.call(b) === "[object " + a + "]" } }); d.isArguments(arguments) || (d.isArguments = function (a) { return d.has(a, "callee") }); "function" != typeof /./ && "object" != typeof Int8Array && (d.isFunction = function (a) { return "function" == typeof a || !1 }); d.isFinite = function (a) { return isFinite(a) && !isNaN(parseFloat(a)) }; d.isNaN = function (a) { return d.isNumber(a) && a !== +a }; d.isBoolean = function (a) { return !0 === a || !1 === a || "[object Boolean]" === E.call(a) }; d.isNull = function (a) { return null === a }; d.isUndefined =
                    function (a) { return void 0 === a }; d.has = function (a, b) { return null != a && H.call(a, b) }; d.noConflict = function () { k._ = l; return this }; d.identity = function (a) { return a }; d.constant = function (a) { return function () { return a } }; d.noop = function () { }; d.property = C; d.propertyOf = function (a) { return null == a ? function () { } : function (b) { return a[b] } }; d.matcher = d.matches = function (a) { a = d.extendOwn({}, a); return function (b) { return d.isMatch(b, a) } }; d.times = function (a, b, c) {
                        var f = Array(Math.max(0, a)); b = J(b, c, 1); for (c = 0; c < a; c++)f[c] = b(c);
                        return f
                    }; d.random = function (a, b) { null == b && (b = a, a = 0); return a + Math.floor(Math.random() * (b - a + 1)) }; d.now = Date.now || function () { return (new Date).getTime() }; L = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }; z = d.invert(L); C = function (a) { var b = function (b) { return a[b] }, c = "(?:" + d.keys(a).join("|") + ")", e = RegExp(c), h = RegExp(c, "g"); return function (a) { a = null == a ? "" : "" + a; return e.test(a) ? a.replace(h, b) : a } }; d.escape = C(L); d.unescape = C(z); d.result = function (a, b, c) {
                        b = null == a ? void 0 : a[b]; void 0 ===
                            b && (b = c); return d.isFunction(b) ? b.call(a) : b
                    }; var aa = 0; d.uniqueId = function (a) { var b = ++aa + ""; return a ? a + b : b }; d.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var S = /(.)^/, ba = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" }, X = /\\|'|\r|\n|\u2028|\u2029/g, O = function (a) { return "\\" + ba[a] }; d.template = function (a, b, c) {
                        !b && c && (b = c); b = d.defaults({}, b, d.templateSettings); c = RegExp([(b.escape || S).source, (b.interpolate || S).source, (b.evaluate ||
                            S).source].join("|") + "|$", "g"); var f = 0, e = "__p+='"; a.replace(c, function (b, c, d, h, g) { e += a.slice(f, g).replace(X, O); f = g + b.length; c ? e += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? e += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : h && (e += "';\n" + h + "\n__p+='"); return b }); e += "';\n"; b.variable || (e = "with(obj||{}){\n" + e + "}\n"); e = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + e + "return __p;\n"; try { var h = new Function(b.variable || "obj", "_", e) } catch (ca) {
                                throw ca.source = e,
                                ca;
                            } c = function (a) { return h.call(this, a, d) }; c.source = "function(" + (b.variable || "obj") + "){\n" + e + "}"; return c
                    }; d.chain = function (a) { a = d(a); a._chain = !0; return a }; var b = function (a, b) { return a._chain ? d(b).chain() : b }; d.mixin = function (a) { d.each(d.functions(a), function (f) { var c = d[f] = a[f]; d.prototype[f] = function () { var a = [this._wrapped]; w.apply(a, arguments); return b(this, c.apply(d, a)) } }) }; d.mixin(d); d.each("pop push reverse shift sort splice unshift".split(" "), function (a) {
                        var f = n[a]; d.prototype[a] = function () {
                            var c =
                                this._wrapped; f.apply(c, arguments); "shift" !== a && "splice" !== a || 0 !== c.length || delete c[0]; return b(this, c)
                        }
                    }); d.each(["concat", "join", "slice"], function (a) { var f = n[a]; d.prototype[a] = function () { return b(this, f.apply(this._wrapped, arguments)) } }); d.prototype.value = function () { return this._wrapped }; d.prototype.valueOf = d.prototype.toJSON = d.prototype.value; d.prototype.toString = function () { return "" + this._wrapped }; "function" === typeof define && define.amd && define("underscore", [], function () { return d })
    }).call(this);
    (function (c) { var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global; if ("function" === typeof define && define.amd) g.define(["underscore", "jquery", "exports"], function (h, g, k) { e.Backbone = c(e, k, h, g) }); else if ("undefined" !== typeof exports) { var h = require("underscore"); try { var k = require("jquery") } catch (M) { } c(e, exports, h, k) } else e.Backbone = c(e, {}, e._, r) })(function (c, e, h, g) {
        var p = c.Backbone, l = Array.prototype.slice; e.VERSION = "1.3.3"; e.$ = g; e.noConflict = function () {
            c.Backbone =
                p; return this
        }; e.emulateHTTP = !1; e.emulateJSON = !1; var n = function (b, a, f) { switch (b) { case 1: return function () { return h[a](this[f]) }; case 2: return function (b) { return h[a](this[f], b) }; case 3: return function (b, c) { return h[a](this[f], w(b, this), c) }; case 4: return function (b, c, d) { return h[a](this[f], w(b, this), c, d) }; default: return function () { var b = l.call(arguments); b.unshift(this[f]); return h[a].apply(h, b) } } }, r = function (b, a, c) { h.each(a, function (a, f) { h[f] && (b.prototype[f] = n(a, f, c)) }) }, w = function (b, a) {
            return h.isFunction(b) ?
                b : h.isObject(b) && !a._isModel(b) ? G(b) : h.isString(b) ? function (a) { return a.get(b) } : b
        }, G = function (b) { var a = h.matches(b); return function (b) { return a(b.attributes) } }; g = e.Events = {}; var E = /\s+/, H = function (b, a, c, d, e) { var f = 0, g; if (c && "object" === typeof c) for (void 0 !== d && ("context" in e) && void 0 === e.context && (e.context = d), g = h.keys(c); f < g.length; f++)a = H(b, a, g[f], c[g[f]], e); else if (c && E.test(c)) for (g = c.split(E); f < g.length; f++)a = b(a, g[f], d, e); else a = b(a, c, d, e); return a }; g.on = function (b, a, c) { return L(this, b, a, c) };
        var L = function (b, a, c, d, e) { b._events = H(P, b._events || {}, a, c, { context: d, ctx: b, listening: e }); e && ((b._listeners || (b._listeners = {}))[e.id] = e); return b }; g.listenTo = function (b, a, c) { if (!b) return this; var f = b._listenId || (b._listenId = h.uniqueId("l")), d = this._listeningTo || (this._listeningTo = {}), e = d[f]; e || (e = this._listenId || (this._listenId = h.uniqueId("l")), e = d[f] = { obj: b, objId: f, id: e, listeningTo: d, count: 0 }); L(b, a, c, this, e); return this }; var P = function (b, a, c, d) {
            if (c) {
                a = b[a] || (b[a] = []); var f = d.context, e = d.ctx; (d =
                    d.listening) && d.count++; a.push({ callback: c, context: f, ctx: f || e, listening: d })
            } return b
        }; g.off = function (b, a, c) { if (!this._events) return this; this._events = H(I, this._events, b, a, { context: c, listeners: this._listeners }); return this }; g.stopListening = function (b, a, c) { var f = this._listeningTo; if (!f) return this; b = b ? [b._listenId] : h.keys(f); for (var d = 0; d < b.length; d++) { var e = f[b[d]]; if (!e) break; e.obj.off(a, c, this) } return this }; var I = function (b, a, c, d) {
            if (b) {
                var f = 0, e = d.context; d = d.listeners; if (a || c || e) {
                    for (var g = a ? [a] :
                        h.keys(b); f < g.length; f++) { a = g[f]; var k = b[a]; if (!k) break; for (var m = [], p = 0; p < k.length; p++) { var l = k[p]; c && c !== l.callback && c !== l.callback._callback || e && e !== l.context ? m.push(l) : (l = l.listening) && 0 === --l.count && (delete d[l.id], delete l.listeningTo[l.objId]) } m.length ? b[a] = m : delete b[a] } return b
                } for (b = h.keys(d); f < b.length; f++)l = d[b[f]], delete d[l.id], delete l.listeningTo[l.objId]
            }
        }; g.once = function (b, a, c) { var f = H(D, {}, b, a, h.bind(this.off, this)); "string" === typeof b && null == c && (a = void 0); return this.on(f, a, c) };
        g.listenToOnce = function (b, a, c) { a = H(D, {}, a, c, h.bind(this.stopListening, this, b)); return this.listenTo(b, a) }; var D = function (b, a, c, d) { if (c) { var f = b[a] = h.once(function () { d(a, f); c.apply(this, arguments) }); f._callback = c } return b }; g.trigger = function (b) { if (!this._events) return this; for (var a = Math.max(0, arguments.length - 1), c = Array(a), d = 0; d < a; d++)c[d] = arguments[d + 1]; H(F, this._events, b, void 0, c); return this }; var F = function (b, a, c, e) { if (b) { c = b[a]; var f = b.all; c && f && (f = f.slice()); c && d(c, e); f && d(f, [a].concat(e)) } return b },
            d = function (b, a) { var c, d = -1, e = b.length, h = a[0], g = a[1], k = a[2]; switch (a.length) { case 0: for (; ++d < e;)(c = b[d]).callback.call(c.ctx); break; case 1: for (; ++d < e;)(c = b[d]).callback.call(c.ctx, h); break; case 2: for (; ++d < e;)(c = b[d]).callback.call(c.ctx, h, g); break; case 3: for (; ++d < e;)(c = b[d]).callback.call(c.ctx, h, g, k); break; default: for (; ++d < e;)(c = b[d]).callback.apply(c.ctx, a) } }; g.bind = g.on; g.unbind = g.off; h.extend(e, g); var J = e.Model = function (b, a) {
                var c = b || {}; a || (a = {}); this.cid = h.uniqueId(this.cidPrefix); this.attributes =
                    {}; a.collection && (this.collection = a.collection); a.parse && (c = this.parse(c, a) || {}); var d = h.result(this, "defaults"); c = h.defaults(h.extend({}, d, c), d); this.set(c, a); this.changed = {}; this.initialize.apply(this, arguments)
            }; h.extend(J.prototype, g, {
                changed: null, validationError: null, idAttribute: "id", cidPrefix: "c", initialize: function () { }, toJSON: function (b) { return h.clone(this.attributes) }, sync: function () { return e.sync.apply(this, arguments) }, get: function (b) { return this.attributes[b] }, escape: function (b) { return h.escape(this.get(b)) },
                has: function (b) { return null != this.get(b) }, matches: function (b) { return !!h.iteratee(b, this)(this.attributes) }, set: function (b, a, c) {
                    if (null == b) return this; if ("object" === typeof b) { var f = b; c = a } else (f = {})[b] = a; c || (c = {}); if (!this._validate(f, c)) return !1; var d = c.unset; b = c.silent; var e = [], g = this._changing; this._changing = !0; g || (this._previousAttributes = h.clone(this.attributes), this.changed = {}); var k = this.attributes, p = this.changed, l = this._previousAttributes, n; for (n in f) a = f[n], h.isEqual(k[n], a) || e.push(n), h.isEqual(l[n],
                        a) ? delete p[n] : p[n] = a, d ? delete k[n] : k[n] = a; this.idAttribute in f && (this.id = this.get(this.idAttribute)); if (!b) for (e.length && (this._pending = c), a = 0; a < e.length; a++)this.trigger("change:" + e[a], this, k[e[a]], c); if (g) return this; if (!b) for (; this._pending;)c = this._pending, this._pending = !1, this.trigger("change", this, c); this._changing = this._pending = !1; return this
                }, unset: function (b, a) { return this.set(b, void 0, h.extend({}, a, { unset: !0 })) }, clear: function (b) {
                    var a = {}, c; for (c in this.attributes) a[c] = void 0; return this.set(a,
                        h.extend({}, b, { unset: !0 }))
                }, hasChanged: function (b) { return null == b ? !h.isEmpty(this.changed) : h.has(this.changed, b) }, changedAttributes: function (b) { if (!b) return this.hasChanged() ? h.clone(this.changed) : !1; var a = this._changing ? this._previousAttributes : this.attributes, c = {}, d; for (d in b) { var e = b[d]; h.isEqual(a[d], e) || (c[d] = e) } return h.size(c) ? c : !1 }, previous: function (b) { return null != b && this._previousAttributes ? this._previousAttributes[b] : null }, previousAttributes: function () { return h.clone(this._previousAttributes) },
                fetch: function (b) { b = h.extend({ parse: !0 }, b); var a = this, c = b.success; b.success = function (d) { var f = b.parse ? a.parse(d, b) : d; if (!a.set(f, b)) return !1; c && c.call(b.context, a, d, b); a.trigger("sync", a, d, b) }; O(this, b); return this.sync("read", this, b) }, save: function (b, a, c) {
                    if (null == b || "object" === typeof b) { var d = b; c = a } else (d = {})[b] = a; c = h.extend({ validate: !0, parse: !0 }, c); var f = c.wait; if (d && !f) { if (!this.set(d, c)) return !1 } else if (!this._validate(d, c)) return !1; var e = this, g = c.success, k = this.attributes; c.success = function (a) {
                        e.attributes =
                            k; var b = c.parse ? e.parse(a, c) : a; f && (b = h.extend({}, d, b)); if (b && !e.set(b, c)) return !1; g && g.call(c.context, e, a, c); e.trigger("sync", e, a, c)
                    }; O(this, c); d && f && (this.attributes = h.extend({}, k, d)); b = this.isNew() ? "create" : c.patch ? "patch" : "update"; "patch" !== b || c.attrs || (c.attrs = d); b = this.sync(b, this, c); this.attributes = k; return b
                }, destroy: function (b) {
                    b = b ? h.clone(b) : {}; var a = this, c = b.success, d = b.wait, e = function () { a.stopListening(); a.trigger("destroy", a, a.collection, b) }; b.success = function (f) {
                        d && e(); c && c.call(b.context,
                            a, f, b); a.isNew() || a.trigger("sync", a, f, b)
                    }; var g = !1; this.isNew() ? h.defer(b.success) : (O(this, b), g = this.sync("delete", this, b)); d || e(); return g
                }, url: function () { var b = h.result(this, "urlRoot") || h.result(this.collection, "url") || X(); if (this.isNew()) return b; var a = this.get(this.idAttribute); return b.replace(/[^\/]$/, "$&/") + encodeURIComponent(a) }, parse: function (b, a) { return b }, clone: function () { return new this.constructor(this.attributes) }, isNew: function () { return !this.has(this.idAttribute) }, isValid: function (b) {
                    return this._validate({},
                        h.extend({}, b, { validate: !0 }))
                }, _validate: function (b, a) { if (!a.validate || !this.validate) return !0; b = h.extend({}, this.attributes, b); b = this.validationError = this.validate(b, a) || null; if (!b) return !0; this.trigger("invalid", this, b, h.extend(a, { validationError: b })); return !1 }
            }); r(J, { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0, omit: 0, chain: 1, isEmpty: 1 }, "attributes"); var x = e.Collection = function (b, a) {
                a || (a = {}); a.model && (this.model = a.model); void 0 !== a.comparator && (this.comparator = a.comparator); this._reset(); this.initialize.apply(this,
                    arguments); b && this.reset(b, h.extend({ silent: !0 }, a))
            }, z = { add: !0, remove: !0, merge: !0 }, K = { add: !0, remove: !1 }, C = function (b, a, c) { c = Math.min(Math.max(c, 0), b.length); var d = Array(b.length - c), f = a.length, e; for (e = 0; e < d.length; e++)d[e] = b[e + c]; for (e = 0; e < f; e++)b[e + c] = a[e]; for (e = 0; e < d.length; e++)b[e + f + c] = d[e] }; h.extend(x.prototype, g, {
                model: J, initialize: function () { }, toJSON: function (b) { return this.map(function (a) { return a.toJSON(b) }) }, sync: function () { return e.sync.apply(this, arguments) }, add: function (b, a) {
                    return this.set(b,
                        h.extend({ merge: !1 }, a, K))
                }, remove: function (b, a) { a = h.extend({}, a); var c = !h.isArray(b); b = c ? [b] : b.slice(); b = this._removeModels(b, a); !a.silent && b.length && (a.changes = { added: [], merged: [], removed: b }, this.trigger("update", this, a)); return c ? b[0] : b }, set: function (b, a) {
                    if (null != b) {
                        a = h.extend({}, z, a); a.parse && !this._isModel(b) && (b = this.parse(b, a) || []); var c = !h.isArray(b); b = c ? [b] : b.slice(); var d = a.at; null != d && (d = +d); d > this.length && (d = this.length); 0 > d && (d += this.length + 1); var e = [], g = [], k = [], p = [], l = {}, n = a.add, r = a.merge,
                            x = a.remove, q = !1, w = this.comparator && null == d && !1 !== a.sort, y = h.isString(this.comparator) ? this.comparator : null, v; for (v = 0; v < b.length; v++) { var t = b[v]; var M = this.get(t); M ? (r && t !== M && (t = this._isModel(t) ? t.attributes : t, a.parse && (t = M.parse(t, a)), M.set(t, a), k.push(M), w && !q && (q = M.hasChanged(y))), l[M.cid] || (l[M.cid] = !0, e.push(M)), b[v] = M) : n && (t = b[v] = this._prepareModel(t, a)) && (g.push(t), this._addReference(t, a), l[t.cid] = !0, e.push(t)) } if (x) {
                                for (v = 0; v < this.length; v++)t = this.models[v], l[t.cid] || p.push(t); p.length &&
                                    this._removeModels(p, a)
                            } l = !1; e.length && !w && n && x ? (l = this.length !== e.length || h.some(this.models, function (a, b) { return a !== e[b] }), this.models.length = 0, C(this.models, e, 0), this.length = this.models.length) : g.length && (w && (q = !0), C(this.models, g, null == d ? this.length : d), this.length = this.models.length); q && this.sort({ silent: !0 }); if (!a.silent) {
                                for (v = 0; v < g.length; v++)null != d && (a.index = d + v), t = g[v], t.trigger("add", t, this, a); (q || l) && this.trigger("sort", this, a); if (g.length || p.length || k.length) a.changes = {
                                    added: g, removed: p,
                                    merged: k
                                }, this.trigger("update", this, a)
                            } return c ? b[0] : b
                    }
                }, reset: function (b, a) { a = a ? h.clone(a) : {}; for (var c = 0; c < this.models.length; c++)this._removeReference(this.models[c], a); a.previousModels = this.models; this._reset(); b = this.add(b, h.extend({ silent: !0 }, a)); a.silent || this.trigger("reset", this, a); return b }, push: function (b, a) { return this.add(b, h.extend({ at: this.length }, a)) }, pop: function (b) { var a = this.at(this.length - 1); return this.remove(a, b) }, unshift: function (b, a) { return this.add(b, h.extend({ at: 0 }, a)) },
                shift: function (b) { var a = this.at(0); return this.remove(a, b) }, slice: function () { return l.apply(this.models, arguments) }, get: function (b) { if (null != b) return this._byId[b] || this._byId[this.modelId(b.attributes || b)] || b.cid && this._byId[b.cid] }, has: function (b) { return null != this.get(b) }, at: function (b) { 0 > b && (b += this.length); return this.models[b] }, where: function (b, a) { return this[a ? "find" : "filter"](b) }, findWhere: function (b) { return this.where(b, !0) }, sort: function (b) {
                    var a = this.comparator; if (!a) throw Error("Cannot sort a set without a comparator");
                    b || (b = {}); var c = a.length; h.isFunction(a) && (a = h.bind(a, this)); 1 === c || h.isString(a) ? this.models = this.sortBy(a) : this.models.sort(a); b.silent || this.trigger("sort", this, b); return this
                }, pluck: function (b) { return this.map(b + "") }, fetch: function (b) { b = h.extend({ parse: !0 }, b); var a = b.success, c = this; b.success = function (d) { c[b.reset ? "reset" : "set"](d, b); a && a.call(b.context, c, d, b); c.trigger("sync", c, d, b) }; O(this, b); return this.sync("read", this, b) }, create: function (b, a) {
                    a = a ? h.clone(a) : {}; var c = a.wait; b = this._prepareModel(b,
                        a); if (!b) return !1; c || this.add(b, a); var d = this, e = a.success; a.success = function (a, b, f) { c && d.add(a, f); e && e.call(f.context, a, b, f) }; b.save(null, a); return b
                }, parse: function (b, a) { return b }, clone: function () { return new this.constructor(this.models, { model: this.model, comparator: this.comparator }) }, modelId: function (b) { return b[this.model.prototype.idAttribute || "id"] }, _reset: function () { this.length = 0; this.models = []; this._byId = {} }, _prepareModel: function (b, a) {
                    if (this._isModel(b)) return b.collection || (b.collection =
                        this), b; a = a ? h.clone(a) : {}; a.collection = this; b = new this.model(b, a); if (!b.validationError) return b; this.trigger("invalid", this, b.validationError, a); return !1
                }, _removeModels: function (b, a) { for (var c = [], d = 0; d < b.length; d++) { var e = this.get(b[d]); if (e) { var h = this.indexOf(e); this.models.splice(h, 1); this.length--; delete this._byId[e.cid]; var g = this.modelId(e.attributes); null != g && delete this._byId[g]; a.silent || (a.index = h, e.trigger("remove", e, this, a)); c.push(e); this._removeReference(e, a) } } return c }, _isModel: function (b) {
                    return b instanceof
                        J
                }, _addReference: function (b, a) { this._byId[b.cid] = b; a = this.modelId(b.attributes); null != a && (this._byId[a] = b); b.on("all", this._onModelEvent, this) }, _removeReference: function (b, a) { delete this._byId[b.cid]; a = this.modelId(b.attributes); null != a && delete this._byId[a]; this === b.collection && delete b.collection; b.off("all", this._onModelEvent, this) }, _onModelEvent: function (b, a, c, d) {
                    if (a) {
                        if (("add" === b || "remove" === b) && c !== this) return; "destroy" === b && this.remove(a, d); if ("change" === b) {
                            var f = this.modelId(a.previousAttributes()),
                                e = this.modelId(a.attributes); f !== e && (null != f && delete this._byId[f], null != e && (this._byId[e] = a))
                        }
                    } this.trigger.apply(this, arguments)
                }
            }); r(x, {
                forEach: 3, each: 3, map: 3, collect: 3, reduce: 0, foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3, select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3, contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3, head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3, without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3, isEmpty: 1, chain: 1, sample: 3,
                partition: 3, groupBy: 3, countBy: 3, sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3
            }, "models"); r = e.View = function (b) { this.cid = h.uniqueId("view"); h.extend(this, h.pick(b, t)); this._ensureElement(); this.initialize.apply(this, arguments) }; var W = /^(\S+)\s*(.*)$/, t = "model collection el id attributes className tagName events".split(" "); h.extend(r.prototype, g, {
                tagName: "div", $: function (b) { return this.$el.find(b) }, initialize: function () { }, render: function () { return this }, remove: function () {
                    this._removeElement(); this.stopListening();
                    return this
                }, _removeElement: function () { this.$el.remove() }, setElement: function (b) { this.undelegateEvents(); this._setElement(b); this.delegateEvents(); return this }, _setElement: function (b) { this.$el = b instanceof e.$ ? b : e.$(b); this.el = this.$el[0] }, delegateEvents: function (b) { b || (b = h.result(this, "events")); if (!b) return this; this.undelegateEvents(); for (var a in b) { var c = b[a]; h.isFunction(c) || (c = this[c]); if (c) { var d = a.match(W); this.delegate(d[1], d[2], h.bind(c, this)) } } return this }, delegate: function (b, a, c) {
                    this.$el.on(b +
                        ".delegateEvents" + this.cid, a, c); return this
                }, undelegateEvents: function () { this.$el && this.$el.off(".delegateEvents" + this.cid); return this }, undelegate: function (b, a, c) { this.$el.off(b + ".delegateEvents" + this.cid, a, c); return this }, _createElement: function (b) { return document.createElement(b) }, _ensureElement: function () {
                    if (this.el) this.setElement(h.result(this, "el")); else {
                        var b = h.extend({}, h.result(this, "attributes")); this.id && (b.id = h.result(this, "id")); this.className && (b["class"] = h.result(this, "className"));
                        this.setElement(this._createElement(h.result(this, "tagName"))); this._setAttributes(b)
                    }
                }, _setAttributes: function (b) { this.$el.attr(b) }
            }); e.sync = function (b, a, c) {
                var d = y[b]; h.defaults(c || (c = {}), { emulateHTTP: e.emulateHTTP, emulateJSON: e.emulateJSON }); var f = { type: d, dataType: "json" }; c.url || (f.url = h.result(a, "url") || X()); null != c.data || !a || "create" !== b && "update" !== b && "patch" !== b || (f.contentType = "application/json", f.data = JSON.stringify(c.attrs || a.toJSON(c))); c.emulateJSON && (f.contentType = "application/x-www-form-urlencoded",
                    f.data = f.data ? { model: f.data } : {}); if (c.emulateHTTP && ("PUT" === d || "DELETE" === d || "PATCH" === d)) { f.type = "POST"; c.emulateJSON && (f.data._method = d); var g = c.beforeSend; c.beforeSend = function (a) { a.setRequestHeader("X-HTTP-Method-Override", d); if (g) return g.apply(this, arguments) } } "GET" === f.type || c.emulateJSON || (f.processData = !1); var k = c.error; c.error = function (a, b, d) { c.textStatus = b; c.errorThrown = d; k && k.call(c.context, a, b, d) }; b = c.xhr = e.ajax(h.extend(f, c)); a.trigger("request", a, b, c); return b
            }; var y = {
                create: "POST",
                update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET"
            }; e.ajax = function () { return e.$.ajax.apply(e.$, arguments) }; var A = e.Router = function (b) { b || (b = {}); b.routes && (this.routes = b.routes); this._bindRoutes(); this.initialize.apply(this, arguments) }, N = /\((.*?)\)/g, Q = /(\(\?)?:\w+/g, U = /\*\w+/g, R = /[\-{}\[\]+?.,\\\^$|#\s]/g; h.extend(A.prototype, g, {
                initialize: function () { }, route: function (b, a, c) {
                    h.isRegExp(b) || (b = this._routeToRegExp(b)); h.isFunction(a) && (c = a, a = ""); c || (c = this[a]); var d = this; e.history.route(b, function (f) {
                        f =
                            d._extractParameters(b, f); !1 !== d.execute(c, f, a) && (d.trigger.apply(d, ["route:" + a].concat(f)), d.trigger("route", a, f), e.history.trigger("route", d, a, f))
                    }); return this
                }, execute: function (b, a, c) { b && b.apply(this, a) }, navigate: function (b, a) { e.history.navigate(b, a); return this }, _bindRoutes: function () { if (this.routes) { this.routes = h.result(this, "routes"); for (var b, a = h.keys(this.routes); null != (b = a.pop());)this.route(b, this.routes[b]) } }, _routeToRegExp: function (b) {
                    b = b.replace(R, "\\$&").replace(N, "(?:$1)?").replace(Q,
                        function (a, b) { return b ? a : "([^/?]+)" }).replace(U, "([^?]*?)"); return new RegExp("^" + b + "(?:\\?([\\s\\S]*))?$")
                }, _extractParameters: function (b, a) { var c = b.exec(a).slice(1); return h.map(c, function (a, b) { return b === c.length - 1 ? a || null : a ? decodeURIComponent(a) : null }) }
            }); var v = e.History = function () { this.handlers = []; this.checkUrl = h.bind(this.checkUrl, this); "undefined" !== typeof k && (this.location = k.location, this.history = k.history) }, aa = /^[#\/]|\s+$/g, S = /^\/+|\/+$/g, ba = /#.*$/; v.started = !1; h.extend(v.prototype, g, {
                interval: 50,
                atRoot: function () { return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root && !this.getSearch() }, matchRoot: function () { return this.decodeFragment(this.location.pathname).slice(0, this.root.length - 1) + "/" === this.root }, decodeFragment: function (b) { return decodeURI(b.replace(/%25/g, "%2525")) }, getSearch: function () { var b = this.location.href.replace(/#.*/, "").match(/\?.+/); return b ? b[0] : "" }, getHash: function (b) { return (b = (b || this).location.href.match(/#(.*)$/)) ? b[1] : "" }, getPath: function () {
                    var b = this.decodeFragment(this.location.pathname +
                        this.getSearch()).slice(this.root.length - 1); return "/" === b.charAt(0) ? b.slice(1) : b
                }, getFragment: function (b) { null == b && (b = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()); return b.replace(aa, "") }, start: function (b) {
                    if (v.started) throw Error("Backbone.history has already been started"); v.started = !0; this.options = h.extend({ root: "/" }, this.options, b); this.root = this.options.root; this._wantsHashChange = !1 !== this.options.hashChange; this._hasHashChange = "onhashchange" in k && (void 0 === document.documentMode ||
                        7 < document.documentMode); this._useHashChange = this._wantsHashChange && this._hasHashChange; this._wantsPushState = !!this.options.pushState; this._hasPushState = !(!this.history || !this.history.pushState); this._usePushState = this._wantsPushState && this._hasPushState; this.fragment = this.getFragment(); this.root = ("/" + this.root + "/").replace(S, "/"); if (this._wantsHashChange && this._wantsPushState) if (this._hasPushState || this.atRoot()) this._hasPushState && this.atRoot() && this.navigate(this.getHash(), { replace: !0 }); else return b =
                            this.root.slice(0, -1) || "/", this.location.replace(b + "#" + this.getPath()), !0; this._hasHashChange || !this._wantsHashChange || this._usePushState || (this.iframe = document.createElement("iframe"), this.iframe.src = "javascript:0", this.iframe.style.display = "none", this.iframe.tabIndex = -1, b = document.body, b = b.insertBefore(this.iframe, b.firstChild).contentWindow, b.document.open(), b.document.close(), b.location.hash = "#" + this.fragment); b = k.addEventListener || function (a, b) { return attachEvent("on" + a, b) }; this._usePushState ?
                                b("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? b("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)); if (!this.options.silent) return this.loadUrl()
                }, stop: function () {
                    var b = k.removeEventListener || function (a, b) { return detachEvent("on" + a, b) }; this._usePushState ? b("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && b("hashchange", this.checkUrl, !1); this.iframe && (document.body.removeChild(this.iframe), this.iframe =
                        null); this._checkUrlInterval && clearInterval(this._checkUrlInterval); v.started = !1
                }, route: function (b, a) { this.handlers.unshift({ route: b, callback: a }) }, checkUrl: function (b) { b = this.getFragment(); b === this.fragment && this.iframe && (b = this.getHash(this.iframe.contentWindow)); if (b === this.fragment) return !1; this.iframe && this.navigate(b); this.loadUrl() }, loadUrl: function (b) {
                    if (!this.matchRoot()) return !1; b = this.fragment = this.getFragment(b); return h.some(this.handlers, function (a) {
                        if (a.route.test(b)) return a.callback(b),
                            !0
                    })
                }, navigate: function (b, a) {
                    if (!v.started) return !1; a && !0 !== a || (a = { trigger: !!a }); b = this.getFragment(b || ""); var c = this.root; if ("" === b || "?" === b.charAt(0)) c = c.slice(0, -1) || "/"; c += b; b = this.decodeFragment(b.replace(ba, "")); if (this.fragment !== b) {
                        this.fragment = b; if (this._usePushState) this.history[a.replace ? "replaceState" : "pushState"]({}, document.title, c); else if (this._wantsHashChange) this._updateHash(this.location, b, a.replace), this.iframe && b !== this.getHash(this.iframe.contentWindow) && (c = this.iframe.contentWindow,
                            a.replace || (c.document.open(), c.document.close()), this._updateHash(c.location, b, a.replace)); else return this.location.assign(c); if (a.trigger) return this.loadUrl(b)
                    }
                }, _updateHash: function (b, a, c) { c ? (c = b.href.replace(/(javascript:|#).*$/, ""), b.replace(c + "#" + a)) : b.hash = "#" + a }
            }); e.history = new v; J.extend = x.extend = A.extend = r.extend = v.extend = function (b, a) {
                var c = this; var d = b && h.has(b, "constructor") ? b.constructor : function () { return c.apply(this, arguments) }; h.extend(d, c, a); d.prototype = h.create(c.prototype, b);
                d.prototype.constructor = d; d.__super__ = c.prototype; return d
            }; var X = function () { throw Error('A "url" property or function must be specified'); }, O = function (b, a) { var c = a.error; a.error = function (d) { c && c.call(a.context, b, d, a); b.trigger("error", b, d, a) } }; return e
    }); var l = k._.noConflict(), w = k.Backbone.noConflict(), n = r, g = {}; g.core = g.core || {}; g.core.LOGGING_ENABLED = !0; g.core.log = function () {
        if (g.core.LOGGING_ENABLED && "undefined" !== typeof console && !l.isNull(console) && "function" === typeof console.log) {
            var c = ["[Klaviyo / Onsite]"].concat([].slice.call(arguments));
            console.log.apply(console, c)
        }
    }; g.core.parseQueryString = function (c) { for (var e = {}, h = /\+/g, g = /([^&=]+)=?([^&]*)/g, k; k = g.exec(c);)e[decodeURIComponent(k[1].replace(h, " "))] = decodeURIComponent(k[2].replace(h, " ")); return e }; g.core.insertCSS = function (c) { var e = document.createElement("style"); n("head").get(0).appendChild(e); e.styleSheet ? e.styleSheet.cssText = c : e.appendChild(document.createTextNode(c)) }; g.core.getCookie = function (c) { return (c = document.cookie.match(new RegExp(c + "=([^;]+)"))) ? c[1] : null }; g.core.templates =
        { _cache: {}, register: function (c, e) { this._cache[c] = l.template(e) }, render: function (c, e) { return this._cache[c](e || {}) } }; g.platforms = g.platforms || {}; g.platforms.shopify = g.platforms.shopify || {}; g.platforms.shopify.ADD_TO_CART_FORM_ID = 'form[action$="/cart/add"]'; g.platforms.shopify.ADD_TO_CART_BUTTON_ID = g.platforms.shopify.ADD_TO_CART_FORM_ID + ' button[type="submit"]'; g.platforms.shopify.isProductPage = function (c) { c || (c = k.location.toString()); return !!c.match(/\/products\//) }; g.platforms.shopify.isCollectionsPage =
            function (c, e) { c || (c = k.location.toString()); if (Array.isArray(e) && 0 < e.length) { for (var h = 0; h < e.length; h++)if (c.match(e[h])) return !0; return !!c.match(/\/collections\//) } }; g.platforms.shopify.isVariantOutOfStock = function (c, e, h) {
                return g.platforms.shopify.isVariantOutOfInventory(e, h) && g.platforms.shopify.isVariantUnavailableBasedOnInventoryManagementPolicy(e, h) && g.platforms.shopify.isVariantUnavailableBasedOnPreorderPolicy(e, h) && g.platforms.shopify.isVariantUnavailableBasedOnSellThroughPolicy(e, h) && g.platforms.shopify.isVariantIncludedBasedOnTags(c,
                    h.include_on_tags, h.exclude_on_tags)
            }; g.platforms.shopify.isVariantOutOfInventory = function (c, e) { return l.isNull(c.inventory_quantity) || l.isUndefined(c.inventory_quantity) ? !c.available : c.inventory_quantity < e.inventory_quantity_threshold }; g.platforms.shopify.isVariantUnavailableBasedOnInventoryManagementPolicy = function (c, e) { return e.is_allow_for_unmanaged_inventory ? !0 : !!c.inventory_management }; g.platforms.shopify.isVariantUnavailableBasedOnPreorderPolicy = function (c, e) {
                return e.is_allow_for_preorder ?
                    !0 : !c.available
            }; g.platforms.shopify.isVariantUnavailableBasedOnSellThroughPolicy = function (c, e) { return e.display_on_policy_continue || "continue" != c.inventory_policy ? !0 : !1 }; g.platforms.shopify.isVariantIncludedBasedOnTags = function (c, e, h) { return h.length && c.tags.length && l.intersection(c.tags, h).length || e.length && (!l.intersection(c.tags, e).length || !c.tags.length) ? !1 : !0 }; g.platforms.shopify.findSelectedVariantId = function () {
                var c = k.location.search.substring(1); return (c = g.core.parseQueryString(c).variant) ?
                    c : n('[name="id"]').val()
            }; g.platforms.shopify.isValidVariant = function (c) { return "number" != typeof parseInt(c) ? !1 : !0 }; g.platforms.shopify.productDetailsUrl = function (c) { return l.isUndefined(c.product_handle) ? "//" + (k.location.hostname.toString() + k.location.pathname.toString().replace(/\/$/, "")) + ".js" : "//" + k.location.hostname.toString() + "/products/" + c.product_handle + ".js" }; g.platforms.shopify.format_product_json = function (c) { return c }; g.platforms.bigcommerce = g.platforms.bigcommerce || {}; g.platforms.bigcommerce.ADD_TO_CART_FORM_ID =
                'form[action$="//' + k.location.hostname + '/cart.php"]'; g.platforms.bigcommerce.ADD_TO_CART_BUTTON_ID = g.platforms.bigcommerce.ADD_TO_CART_FORM_ID + ' input[type="submit"]'; g.platforms.bigcommerce.INVENTORY_TRACKING_TYPES = ["simple", "product", "variant", "sku"]; g.platforms.bigcommerce.OPTION_NAME_ELEMENT = 'input[name^="attribute"]'; g.platforms.bigcommerce.DROPDOWN_NAME_ELEMENT = 'select[name^="attribute"] option'; g.platforms.bigcommerce.PRODUCT_ID_ELEMENT = 'input[name="product_id"]'; g.platforms.bigcommerce.isProductPage =
                    function (c) { try { return page_type = document.querySelector("meta[property='og:type']").getAttribute("content"), "product" == page_type } catch (e) { return !1 } }; g.platforms.bigcommerce.isCollectionsPage = function (c, e) { return !1 }; g.platforms.bigcommerce.isVariantOutOfStock = function (c, e, h) {
                        return g.platforms.bigcommerce.isVariantTrackableBasedOnInventoryManagementPolicy(c) && g.platforms.bigcommerce.isVariantOutOfInventory(e, h) && g.platforms.bigcommerce.isVariantAvailable(e, h) && g.platforms.bigcommerce.isVariantIncludedBasedOnTags(c,
                            h.include_on_tags, h.exclude_on_tags)
                    }; g.platforms.bigcommerce.isVariantOutOfInventory = function (c, e) { return l.isNull(c.inventory_quantity) || l.isUndefined(c.inventory_quantity) ? !c.available : c.inventory_quantity < e.inventory_quantity_threshold }; g.platforms.bigcommerce.isVariantTrackableBasedOnInventoryManagementPolicy = function (c) { return g.platforms.bigcommerce.INVENTORY_TRACKING_TYPES.includes(c.inventory_policy) }; g.platforms.bigcommerce.isVariantAvailable = function (c, e) { return c.available }; g.platforms.bigcommerce.isVariantIncludedBasedOnTags =
                        function (c, e, h) { return h.length && c.tags.length && l.intersection(c.tags, h).length || e.length && (!l.intersection(c.tags, e).length || !c.tags.length) ? !1 : !0 }; g.platforms.bigcommerce.findSelectedVariantId = function () {
                            var c = [], e = l.map([g.platforms.bigcommerce.ADD_TO_CART_FORM_ID + " " + g.platforms.bigcommerce.OPTION_NAME_ELEMENT, g.platforms.bigcommerce.ADD_TO_CART_FORM_ID + " " + g.platforms.bigcommerce.DROPDOWN_NAME_ELEMENT], function (c) { return c + ":checked" }).join(); e = n(e); g.platforms.bigcommerce.selected_variant_id =
                                null; if (!l.isEmpty(e)) return l.each(e, function (e, g) { e = n(e); e.is("option") ? c.push(e.parent().attr("name") + "=" + e.val()) : c.push(e.attr("name") + "=" + e.val()) }), product_id = g.platforms.bigcommerce.productId(), variant_option_url = "//" + k.location.hostname + "/remote/v1/product-attributes/" + product_id, parameters = "action=add&qty[]=1&product_id=" + product_id + "&" + c.join("&"), parameters = encodeURI(parameters), csrf_token = g.core.getCookie("SF-CSRF-TOKEN"), n.ajax({
                                    url: variant_option_url, type: "POST", headers: {
                                        "x-sf-csrf-token": csrf_token ?
                                            csrf_token : ""
                                    }, dataType: "json", data: parameters, success: function (c) { try { c.data.purchasable && (g.platforms.bigcommerce.selected_variant_id = c.data.v3_variant_id) } catch (p) { } }
                                }), null
                        }; g.platforms.bigcommerce.isValidVariant = function (c) { return !0 }; g.platforms.bigcommerce.productId = function () { product_id_element = g.platforms.bigcommerce.ADD_TO_CART_FORM_ID + " " + g.platforms.bigcommerce.PRODUCT_ID_ELEMENT; return n(product_id_element).val() }; g.platforms.bigcommerce.productDetailsUrl = function (c) {
                            product_id = g.platforms.bigcommerce.productId();
                            return "https://fast.a.klaviyo.com/api/v1/catalog/bigcommerce/product-variants?a=" + c.account_id + "&p=" + product_id
                        }; g.platforms.bigcommerce.format_product_json = function (c) {
                            c = c.data; var e = { id: c.product_id, title: c.product_title, inventory_policy: c.inventory_tracking, variants: [] }; l.each(c.variants, function (c, g) { variant_title = l.isEmpty(c.title) ? c.sku : c.title; e.variants.push({ id: c.external_id, title: variant_title, available: c.availability, inventory_quantity: c.inventory_quantity, is_allow_for_preorder: c.availability }) });
                            return e
                        }; g.components = g.components || {}; g.components.back_in_stock = g.components.back_in_stock || {}; g.components.back_in_stock.BASE_CSS = 'body, html { background: transparent;-webkit-font-smoothing: antialiased;height: 100%;}html {font-family: sans-serif;font-size: 14px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}body {margin: 0;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 14px;line-height: 1.5;color: #222;overflow: hidden;-moz-transition: background-color 0.15s linear;-webkit-transition: background-color 0.15s linear;-o-transition: background-color 0.15s linear;transition: background-color 0.15s cubic-bezier(0.785, 0.135, 0.150, 0.860);}body.fadein {background: rgba(0, 0, 0, 0.65);}a {background-color: transparent;}a:active,a:hover {outline: 0;}h1 {font-size: 2em;margin: 0.67em 0;}h3 { font-size: 24px;}h4 {  font-size: 18px;  margin-top: 10px;  margin-bottom: 10px;}h3, h4 {  font-family: inherit;  font-weight: 500;  line-height: 1.1;  color: inherit;}button,input,optgroup,select,textarea {color: inherit;font: inherit;margin: 0;font-family: inherit;font-size: inherit;line-height: inherit;}button {overflow: visible;}button,select {text-transform: none;}button {-webkit-appearance: button;cursor: pointer;}button[disabled] {opacity: 0.6;}button::-moz-focus-inner,input::-moz-focus-inner {border: 0;padding: 0;}input {line-height: normal;}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {height: auto;}* {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}*:before,*:after {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}#container {position: relative;background: white;padding: 12px 18px 40px 18px;}.fade {opacity: 0;-webkit-transition: opacity 0.15s linear;-o-transition: opacity 0.15s linear;transition: opacity 0.15s linear;}.fade.in {opacity: 1;}.modal {  overflow-x: hidden;  overflow-y: auto;  position: fixed;  top: 0;  right: 0;  bottom: 0;  left: 0;  z-index: 999;  -webkit-overflow-scrolling: touch;  outline: 0;}.modal-title {  margin: 0;  font-size: 24px;  line-height: 1.5;}.clearfix:before,.clearfix:after {  content: " ";  display: table;}.clearfix:after {  clear: both;}.form-control {  display: block;  width: 100%;  height: 34px;  padding: 6px 12px;  font-size: 14px;  line-height: 1.5;  color: #222;  background-color: #fff;  background-image: none;  border: 1px solid #ccc;  border-radius: 2px;  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;}.input-lg {  font-size: 14px;  height: 46px;  padding: 10px 16px;  line-height: 1.3333333;}.submit-container {  margin-top: 20px;}.form-group {  margin-bottom: 15px;}.btn {  display: inline-block;  padding: 8px 12px;  margin-bottom: 0;  font-size: 14px;  font-weight: bold;  line-height: 1.5;  text-align: center;  white-space: nowrap;  vertical-align: middle;  -ms-touch-action: manipulation;  touch-action: manipulation;  cursor: pointer;  -webkit-user-select: none;  -moz-user-select: none;  -ms-user-select: none;  user-select: none;  background-image: none;  border: 1px solid transparent;  border-radius: 2px;}.btn-success {  width: 100%;  color: #fff;  background-color: #439fdb;  border-color: #439fdb;}.btn-lg {  line-height: 24px;  font-size: 15px;  padding: 14px;  line-height: 1.3333333;}.close {  -webkit-appearance: none;  padding: 0;  cursor: pointer;  background: 0 0;  border: 0;  position: absolute;  top: 7px;  right: 15px;  font-size: 30px;  font-weight: 700;  line-height: 1;  color: #ccc;  text-shadow: 0 1px 0 #fff;}.alert {  padding: 6px 11px;  font-size: 13px;  margin: 15px 0;  border: 1px solid transparent;  border-radius: 2px;}.alert-success {  color: #1B9500;  background-color: #d3efcd;  border-color: #d3efcd;}.alert-success a {   color: #1B9500;}.alert-danger {  color: #C72E2F;  background-color: #fcd6d7;  border-color: #fcd6d7;}.pull-right {  float: right;}.text-right {  text-align: right;}.small-print {  font-size: 14px;  line-height: 1.5;}.small-print a {  color: inherit;  text-decoration: underline;}.powered-by {  opacity: 0.8;}.product-title {  margin-bottom: 20px;}.accepts_marketing {  opacity: 0.835;  font-size: 13px;}.accepts_marketing input {  margin-right: 10px;}.completed_message, .error_message {  display: none;}.complete .completed_message {  display: block;}#klaviyo-bis-modal.in {  position: relative;  z-index: 999;  height: 100%;  overflow: hidden;  overflow-y: auto;  -webkit-overflow-scrolling: touch;}@media only screen and (min-width:500px) {  #klaviyo-bis-modal {    max-width: 460px;    margin: auto;  }  #container {    border-radius: 3px;    padding: 30px 40px;  }}@media only screen and (min-width:992px) {  #container {    margin-top: 100px;  }}';
    g.components = g.components || {}; g.components.back_in_stock = g.components.back_in_stock || {}; g.components.back_in_stock.DEFAULT_SETTINGS = {
        trigger: { replace_sold_out: !1, replace_anchor: !1, alternate_anchor: null, product_page_text: "Notify Me When Available", product_page_class: "btn", product_page_text_align: "center", product_page_margin: "0px", product_page_width: "auto", collection_page_class: "btn", collection_page_text_align: "center", collection_page_width: "200px", collection_page_text: "Notify Me When Available", collection_page_padding: "inherit" },
        modal: {
            headline: "{product_name}", body_content: "Enter your email address and we'll let you know when it's back.", email_field_label: "Email", is_quantity_field_enabled: !1, quantity_field_label: "Quantity Required", button_label: "Notify me when available", newsletter_subscribe_label: "Add me to your email list.", subscription_success_label: "You're in! We'll let you know when it's back.", footer_content: "", close_label: "Close", is_powered_by_link: !1, styles: g.components.back_in_stock.BASE_CSS, additional_styles: "",
            z_index: 999999, drop_background_color: "#000", background_color: "#fff", font_family: '"Helvetica Neue", Helvetica, Arial, sans-serif;', headers_font_family: '"Helvetica Neue", Helvetica, Arial, sans-serif;', text_color: "#222", button_text_color: "#fff", button_background_color: "#439fdb", close_button_color: "#ccc", error_background_color: "#fcd6d7", error_text_color: "#C72E2F", success_background_color: "#d3efcd", success_text_color: "#1B9500", subscribe_checked: !0
        }
    }; g.components.back_in_stock.Settings = w.Model.extend({
        defaults: {
            exclude_on_tags: "",
            include_on_tags: "", display_on_policy_continue: !1, inventory_quantity_threshold: 1, is_allow_for_preorder: !0, is_allow_for_unmanaged_inventory: !0, variant_id_element: null, variant_id_attribute: null
        }
    }); g.components.back_in_stock.Main = w.Model.extend(); g.components.back_in_stock.MainView = w.View.extend({
        events: { change: "variantChange", "click .klaviyo-bis-trigger": "handleBISTriggerClick" }, settings: function () { return this.model.get("settings") }, initialize: function (c) {
            c = this.settings().get("platform"); var e = this.settings().get("is_quick_view");
            this.platform_implementation = g.platforms[c]; this.model.set("is_quick_view", e); this.model.set("collection_urls", this.settings().get("collection_urls")); if (this.platform_implementation.isProductPage()) this.model.set("is_on_collections_page", !1), this.createProductPageTrigger(); else if (this.platform_implementation.isCollectionsPage(null, this.model.get("collection_urls"))) this.model.set("is_on_collections_page", !0), this.createCollectionPageTriggers(); else { this.model.set("is_on_other_page", !0); return } this.model.set("is_on_other_page",
                !1)
        }, getProductJSON: function (c, e) { var h = this; n.getJSON(c, function (c, k, n) { c = h.platform_implementation.format_product_json(c); k = c.variants; var p = [], r = {}, w = {}; h.model.set("product", c); l.each(k, function (c, e) { h.isVariantOutOfStock(c) && p.push(c); r[c.id] = c; w[c.title] = c }); h.model.set({ variants: k, unavailable_variants: p, variants_by_id: r, variants_by_title: w }); g.core.log("Variants: ", k.length, "Unavailable Variants: ", p.length); e() }) }, createProductPageTrigger: function () {
            var c = this, e = c.$(".klaviyo-bis-trigger"),
                g = { account_id: c.settings().get("account") }; g = c.platform_implementation.productDetailsUrl(g); c.getProductJSON(g, function () {
                    if (c.model.get("unavailable_variants").length) {
                        c.prepareTriggerElement(e); if (!e.length) {
                            c.trigger.renderProductPageTrigger(); var g = n(c.platform_implementation.ADD_TO_CART_BUTTON_ID).eq(0), h = c.trigger.model.get("alternate_anchor"), k = "#" + h; !l.isNull(h) && n(k).length ? (g = n(k).eq(0), g.append(c.trigger.$el), c.sold_out_button = g) : !0 !== c.trigger.model.get("replace_anchor") && !0 !== c.trigger.model.get("replace_sold_out") ||
                                !g.length ? c.$(c.platform_implementation.ADD_TO_CART_FORM_ID).eq(0).append(c.trigger.$el) : (c.sold_out_button = g, c.sold_out_button.parent().append(c.trigger.$el))
                        } c.createModal(); c.variantChange()
                    }
                })
        }, createCollectionPageTriggers: function () {
            var c = this, e = this.$(".klaviyo-bis-trigger"), g = this.$(".klaviyo-product-container"); g.length && (c.prepareTriggerElement(e), e.length || (c.trigger.prepareCollectionPageHelpers(), c.trigger.renderCollectionPageTrigger(), l.each(g, function (e) {
                e = n(e).data("klaviyo-handle");
                var g = c.trigger.$el.clone(), h = n('.klaviyo-product-container[data-klaviyo-handle="' + e + '"] .klaviyo-button-container'), k = h.parent().parent(); g.data("klaviyo-handle", e); h.append(g); "static" == k.css("position") && k.css("position", "relative")
            }), c.createModal()))
        }, prepareTriggerElement: function (c) {
            var e = this.settings(), h = {}; l.defaults(h, e.get("trigger"), g.components.back_in_stock.DEFAULT_SETTINGS.trigger); this.trigger = c.length ? new g.components.back_in_stock.TriggerView({ el: c, model: new g.components.back_in_stock.Trigger(h) }) :
                new g.components.back_in_stock.TriggerView({ el: n("<a/>"), model: new g.components.back_in_stock.Trigger(h) })
        }, createModal: function () {
            var c = this.settings(), e = {}; parent_body_font_family = n("body").css("font-family"); parent_body_font_color = n("body").css("color"); parent_headers_font_family = n("h1,h2,h3").eq(0).css("font-family"); parent_button = n(".klaviyo-bis-trigger").eq(0); parent_button_text_color = parent_button.css("color"); parent_button_background_color = parent_button.css("background-color"); l.isUndefined(parent_body_font_family) ||
                (g.components.back_in_stock.DEFAULT_SETTINGS.modal.font_family = parent_body_font_family); l.isUndefined(parent_body_font_color) || (g.components.back_in_stock.DEFAULT_SETTINGS.modal.text_color = parent_body_font_color); l.isUndefined(parent_headers_font_family) || (g.components.back_in_stock.DEFAULT_SETTINGS.modal.headers_font_family = parent_headers_font_family); l.isUndefined(parent_button_text_color) || (g.components.back_in_stock.DEFAULT_SETTINGS.modal.button_text_color = parent_button_text_color); l.isUndefined(parent_button_background_color) ||
                    (g.components.back_in_stock.DEFAULT_SETTINGS.modal.button_background_color = parent_button_background_color); l.defaults(e, c.get("modal"), g.components.back_in_stock.DEFAULT_SETTINGS.modal); l.extend(e, { account: c.get("account"), list: c.get("list"), platform: c.get("platform"), api_hostname: c.get("api_hostname"), is_quick_view: c.get("is_quick_view"), collection_urls: c.get("collection_urls") }); this.modal = new g.components.back_in_stock.ModalView({ el: n("<iframe />"), model: new g.components.back_in_stock.Modal(e) });
            this.modal.render(); this.$el.append(this.modal.$el)
        }, variantChange: function (c) {
            if (!this.model.get("is_on_other_page") && !this.model.get("is_on_collections_page") && this.trigger instanceof w.View) {
                c = 1 == this.model.get("variants").length ? this.model.get("variants")[0].id : this.platform_implementation.findSelectedVariantId(); if (!this.platform_implementation.isValidVariant(c)) { var e = this.settings(), g = e.get("variant_id_element"); e = e.get("variant_id_attribute"); g && e && (c = n(document).find(g).attr(e)) } if (l.isNull(c)) {
                    var k =
                        this; for (i = 0; 3 > i; i++)l.delay(function () { return k.setVariantAndShowUI(k.platform_implementation.selected_variant_id) }, 1E3)
                } else this.setVariantAndShowUI(c)
            }
        }, setVariantAndShowUI: function (c) {
            if (l.isUndefined(c) || l.isNull(c)) this.trigger.hide(), l.isUndefined(this.sold_out_button) || this.sold_out_button.show(); else {
                this.model.get("product"); var e = this.model.get("variants_by_id")[c] || this.model.get("variants")[0]; if (!c || isNaN(c)) c = e && e.id; g.core.log("Selected Variant: " + c); this.model.set("selected_variant_id",
                    c); this.modal.setSelectedVariantId(c); e || this.trigger.hide(); this.isVariantOutOfStock(e) ? (l.isUndefined(this.sold_out_button) || !this.trigger.model.get("replace_anchor") && !this.trigger.model.get("replace_sold_out") || this.sold_out_button.hide(), this.trigger.show()) : (this.trigger.hide(), l.isUndefined(this.sold_out_button) || this.sold_out_button.show())
            }
        }, isVariantOutOfStock: function (c) {
            var e = this.settings(); e = {
                inventory_quantity_threshold: e.get("inventory_quantity_threshold"), is_allow_for_preorder: e.get("is_allow_for_preorder"),
                is_allow_for_unmanaged_inventory: e.get("is_allow_for_unmanaged_inventory"), display_on_policy_continue: e.get("display_on_policy_continue"), exclude_on_tags: this.cleanTags(e.get("exclude_on_tags")), include_on_tags: this.cleanTags(e.get("include_on_tags")), is_quick_view: e.get("is_quick_view"), collection_urls: e.get("collection_urls")
            }; return this.platform_implementation.isVariantOutOfStock(this.model.get("product"), c, e)
        }, cleanTags: function (c) {
            try { var e = c.split(",").filter(String) } catch (h) {
                console.log("Tags not read because invalid format.  Please supply strings for included and excluded tags. If there are multiple values, please delimit with commas."),
                    e = []
            } return e.map(function (c) { return c.trim() })
        }, handleBISTriggerClick: function (c) { c && c.preventDefault() && c.stopPropagation(); var e = this; if (this.model.get("is_on_collections_page")) { var g = n(c.currentTarget).data("klaviyo-handle"), k = n(n(c.currentTarget).data("klaviyo-quickview-variant")).val(); c = e.platform_implementation.productDetailsUrl({ product_handle: g }); var r = this.model.get("is_quick_view"); e.getProductJSON(c, function () { (!l.isUndefined(k) && l.isUndefined(this.modal) || r) && e.createModal(); e.showModal(k) }) } else e.showModal() },
        showModal: function (c) { var e = this.model.get("product"); c = this.model.get("selected_variant_id") || c || this.model.get("unavailable_variants")[0].id; c = this.model.get("variants_by_id")[c]; var g = this.model.get("variants").length, k = this.model.get("unavailable_variants"); this.modal.renderForm(e, c, g, k); this.modal.show() }
    }); g.components.back_in_stock.create = function (c, e) { c = new g.components.back_in_stock.Settings(c); c.set(e); return new g.components.back_in_stock.MainView({ el: document.body, model: new g.components.back_in_stock.Main({ settings: c }) }) };
    g.components = g.components || {}; g.components.back_in_stock = g.components.back_in_stock || {}; g.components.back_in_stock.Trigger = w.Model.extend({}); g.components.back_in_stock.TriggerView = w.View.extend({
        initialize: function (c) { }, prepareCollectionPageHelpers: function () {
            var c = n(".klaviyo-product-container"), e = n(".klaviyo-button-container"), g = { display: "inline-block", position: "absolute !important", top: "50%", left: "50%", opacity: "0", "text-align": this.model.get("collection_page_text_align"), width: this.model.get("collection_page_width") };
            klaviyo_button_width = g.width.match(/\d+/); g["margin-left"] = "-" + Math.round(klaviyo_button_width / 2) + "px"; c.css({ overflow: "visible !important", position: "initial !important" }); e.css(g); c.parent().mouseover(function () { n(this).find(e).css("opacity", "1") }).mouseout(function () { n(this).find(e).css("opacity", "0") })
        }, renderCollectionPageTrigger: function () {
            var c = this.model; this.$el.attr("class", c.get("collection_page_class")).addClass("klaviyo-bis-trigger").attr("href", "#").text(c.get("collection_page_text")).css("padding",
                c.get("collection_page_padding")).css("text-align", c.get("collection_page_text_align"))
        }, renderProductPageTrigger: function () { var c = this.model; this.$el.attr("class", c.get("product_page_class")).addClass("klaviyo-bis-trigger").attr("href", "#").text(c.get("product_page_text")).css("text-align", c.get("product_page_text_align")).css("margin", c.get("product_page_margin")).css("width", c.get("product_page_width")) }, show: function () { this.$el.show() }, hide: function () { this.$el.hide() }
    }); g.components = g.components ||
        {}; g.components.back_in_stock = g.components.back_in_stock || {}; l.each({ "back_in_stock_document.html": '<!doctype html>\x3c!--[if lt IE 7]> <html class="ie6"> <![endif]--\x3e\x3c!--[if IE 7]> <html class="ie7"> <![endif]--\x3e\x3c!--[if IE 8]> <html class="ie8"> <![endif]--\x3e\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e<head><meta name="viewport" content="width=device-width"><style><%= styles %>#container {background: <%= theme.background_color %>;}body {font-family: <%= theme.font_family %>;color: <%= theme.text_color %>;}body.fadein {background: rgba( <%= theme.fade_color_rgb %>, 0.65);}h3 {font-family: <%= theme.headers_font_family %>;}.btn {color: <%= theme.button_text_color %>;background-color: <%= theme.button_background_color %>;border-color: <%= theme.button_background_color %>;}.close {color: <%= theme.close_button_color %>;}.alert-danger {border-color: <%= theme.failure_background_color %>;background-color: <%= theme.failure_background_color %>;color: <%= theme.failure_text_color %>;}.alert-success {background-color: <%= theme.success_background_color %>;border-color: <%= theme.success_background_color %>;color: <%= theme.success_text_color %>;}.alert-success a {color: <%= theme.success_text_color %>;}</style><% if (additional_styles) { %><style><%= additional_styles %></style><% } %></head><body class="klaviyo-bis-close"><div id="klaviyo-bis-modal"><div class="" id="container"><button type="button" class="close klaviyo-bis-close" data-dismiss="modal">&times;</button><h3 class="modal-title"><%= headline %></h3><p><%= body_content %></p><form action="#" class="form-horizontal clearfix"><div class="form-group"><div id="variant_select" class="col-sm-12"><input type="hidden" id="product" value="<%= product.id %>" /></input><select id="variants" class="selectpicker form-control input-lg"><% _.each(unavailable_variants, function (variant) { %><option value="<%= variant.id %>"><%= variant.title %></option><% }) %></select></div></div><div class="form-group"><div class="col-sm-12"><input type="email" id="email" placeholder="<%= email_field_label %>" class="form-control input-lg" value="" /></input></div><div id="newsletter_subscription"><p><input type="checkbox" id="subscribe_for_newsletter" <%= newsletter_subscribe_checked %>><label for="subscribe_for_newsletter" style="margin-left:10px;"><%= newsletter_subscribe_label %></label></p></div></div><div class="control-group clearfix submit-container"><button type="submit" class="btn btn-success btn-lg col-xs-12"><%= button_label %></button></div><div id="error_message" class="error_message alert alert-danger"></div><div id="completed_message" class="completed_message alert alert-success"><%= subscription_success_label %> <a href="#" class="klaviyo-bis-close"><%= close_label %></a></div></form><p class="small-print"><%= footer_content %></p><% if (is_powered_by_link) { %><p class="small-print powered-by text-right">Powered by <a href="https://www.klaviyo.com" target="_blank">Klaviyo</a></p><% } %></div></div>' },
            function (c, e) { g.core.templates.register(e, c) }); g.components.back_in_stock.Modal = w.Model.extend(); g.components.back_in_stock.ModalView = w.View.extend({
                initialize: function (c) { }, iframeDocument: function () { var c = this.$el[0]; return c.contentDocument || c.contentWindow.document }, setSelectedVariantId: function (c) { this.model.set("selected_variant_id", c) }, render: function (c, e) {
                    this.$el.attr({ id: "klaviyo-bis-iframe", frameBorder: 0, src: "about:blank", allowTransparency: !1 }).css({
                        position: "fixed", width: "100%", height: "100%",
                        top: 0, left: 0, border: "0", overflow: "hidden", "z-index": this.model.get("z_index"), background: "none"
                    }).hide()
                }, renderForm: function (c, e, h, k) {
                    var p = this; k = g.core.templates.render("back_in_stock_document.html", {
                        variant: e, product: c, unavailable_variants: k, headline: this.model.get("headline").replace("{product_name}", c.title), body_content: this.model.get("body_content").replace("{product_name}", c.title), email_field_label: this.model.get("email_field_label"), email: "", newsletter_subscribe_label: this.model.get("newsletter_subscribe_label"),
                        newsletter_subscribe_checked: this.model.get("subscribe_checked") ? "checked" : "", is_quantity_field_enabled: this.model.get("is_quantity_field_enabled"), quantity_required_label: this.model.get("quantity_field_label"), button_label: this.model.get("button_label"), footer_content: this.model.get("footer_content").replace("{product_name}", c.title), close_label: this.model.get("close_label"), is_powered_by_link: this.model.get("is_powered_by_link"), subscription_success_label: this.model.get("subscription_success_label").replace("{product_name}",
                            c.title), styles: this.model.get("styles"), additional_styles: this.model.get("additional_styles"), theme: {
                                drop_background_color: this.model.get("drop_background_color"), background_color: this.model.get("background_color"), font_family: this.model.get("font_family"), headers_font_family: this.model.get("headers_font_family"), text_color: this.model.get("text_color"), button_text_color: this.model.get("button_text_color"), button_background_color: this.model.get("button_background_color"), close_button_color: this.model.get("close_button_color"),
                                error_background_color: this.model.get("error_background_color"), error_text_color: this.model.get("error_text_color"), success_background_color: this.model.get("success_background_color"), success_text_color: this.model.get("success_text_color")
                            }
                    }); c = this.iframeDocument(); c.open(); c.write(k); c.close(); k = function (c) { n(c.target).hasClass("klaviyo-bis-close") && (c.preventDefault(), p.hide()) }; n(c).find("body").on("click", l.bind(k, this)).on("touchend", l.bind(k, this)).find("form").on("submit", l.bind(this.validateAndSubmitForm,
                        this)); 1 === h ? n(c).find("#variant_select").hide() : n(c).find('#variant_select option[value="' + e.id + '"]').prop("selected", !0); this.model.get("list") || n(c).find("#newsletter_subscription").hide()
                }, validateAndSubmitForm: function (c) {
                    c.preventDefault(); var e = this, g = n(c.currentTarget), k = this.iframeDocument(); c = n(k).find("#email").val(); var l = n(k).find("#subscribe_for_newsletter").prop("checked") && "none" !== n(k).find("#newsletter_subscription")[0].style.display; if (/@/.test(c)) {
                        g.find("button").attr("disabled",
                            !0); this.hideErrorMessage(); this.hideSuccessMessage(); g = this.model.get("account"); var r = this.model.get("list"), w = this.model.get("platform"); k = n(k).find("#variants").val(); n.ajax({
                                type: "POST", url: "//" + this.model.get("api_hostname") + "/client/back-in-stock-subscriptions/?company_id=" + g, headers: { revision: "2024-02-15", "Content-Type": "application/json", "X-Klaviyo-Onsite": "1" }, dataType: "json", data: JSON.stringify({
                                    data: {
                                        type: "back-in-stock-subscription", attributes: {
                                            profile: { data: { type: "profile", attributes: { email: c } } },
                                            channels: ["EMAIL"]
                                        }, relationships: { variant: { data: { type: "catalog-variant", id: "$" + w + ":::$default:::" + k } } }
                                    }
                                }), success: function (c) { return e.onSubmitSuccess() }, error: function (c, g, h) { return e.onSubmitFailure(h) }
                            }); r && l && n.ajax({
                                type: "POST", url: "//" + e.model.get("api_hostname") + "/client/subscriptions/?company_id=" + g, headers: { revision: "2024-02-15", "Content-Type": "application/json", "X-Klaviyo-Onsite": "1" }, dataType: "json", data: JSON.stringify({
                                    data: {
                                        type: "subscription", attributes: {
                                            profile: {
                                                data: {
                                                    type: "profile",
                                                    attributes: { email: c }
                                                }
                                            }
                                        }, relationships: { list: { data: { type: "list", id: r } } }
                                    }
                                }), success: function (c) { return e.onSubmitSuccess() }, error: function (c, g, h) { return e.onSubmitFailure(h) }
                            })
                    }
                }, onSubmitSuccess: function () { n(this.iframeDocument()).find("form").find("button").hide(); this.showSuccessMessage() }, onSubmitFailure: function (c) { n(this.iframeDocument()).find("form").find("button").removeAttr("disabled"); this.showErrorMessage(c) }, showSuccessMessage: function () {
                    n(this.iframeDocument()).find("#completed_message").show();
                    l.delay(l.bind(this.hide, this), 3E5)
                }, hideSuccessMessage: function () { n(this.iframeDocument()).find("#completed_message").hide() }, showErrorMessage: function (c) { n(this.iframeDocument()).find("#error_message").text(c).show() }, hideErrorMessage: function () { n(this.iframeDocument()).find("#error_message").hide() }, show: function () { this.$el.show(); n(this.iframeDocument()).find("body").addClass("fadein").find('[name="email"]').focus() }, hide: function () { this.$el.hide(); this.hideSuccessMessage(); n(this.iframeDocument()).find("body").addClass("fadein") }
            });
    g.components = g.components || {}; var ia = { backinstock: g.components.back_in_stock.create }; g.components.Router = { _settings: { api_hostname: "a.klaviyo.com", logging: !0, account: null, list: null, platform: null }, _components: {}, init: function (c) { l.extend(this._settings, c) }, logging: function (c) { g.core.LOGGING_ENABLED = !!c }, enable: function (c, e) { this._components[c] || ia[c] && (this._components[c] = ia[c](this._settings, e)) } }; var E = k.klaviyoBIS; if (!E || !E._initialized) {
        l.isArray(E) || (k.klaviyoBIS = [], E = k.klaviyoBIS); l.each(["init",
            "logging", "enable"], function (c) { E[c] = function () { var e = [].slice.call(arguments); return E.push([c].concat(e)) } }); try {
                k._klOnsite = k._klOnsite || [], k.klaviyo = new Proxy({}, {
                    get: function (c, e) {
                        return function (c) {
                            for (var g = [], h = 0; h < arguments.length; ++h)g[h - 0] = arguments[h]; if ("push" === e) k._klOnsite.push.apply(k._klOnsite, $jscomp.arrayFromIterable(g)); else if ("init" === e || "enable" === e || "logging" === e) k.klaviyoBIS[e].apply(null, g); else {
                                var l = "function" === typeof g[g.length - 1] ? g.pop() : void 0; return new Promise(function (c) {
                                    k._klOnsite.push([e].concat($jscomp.arrayFromIterable(g),
                                        [function (e) { l && l(e); c(e) }]))
                                })
                            }
                        }
                    }
                })
            } catch (c) { k.klaviyo = {}, k.klaviyo.init = function (c) { for (var e = [], g = 0; g < arguments.length; ++g)e[g - 0] = arguments[g]; return k.klaviyoBIS.init.apply(null, e) }, k.klaviyo.enable = function (c) { for (var e = [], g = 0; g < arguments.length; ++g)e[g - 0] = arguments[g]; return k.klaviyoBIS.enable.apply(null, e) }, k.klaviyo.logging = function (c) { for (var e = [], g = 0; g < arguments.length; ++g)e[g - 0] = arguments[g]; return k.klaviyoBIS.logging.apply(null, e) } } r(function (c) {
                g.core.log("Initializing."); for (c = function (c) {
                    g.core.log("Executing: " +
                        c[0]); if (l.isArray(c) && c && g.components.Router[c[0]]) return g.components.Router[c[0]].apply(g.components.Router, c.slice(1))
                }; E.length;)c(E.shift()); E.push = c; E._initialized = !0
            })
    }
})(window);
