function loadMore(e, t) {
    "use strict";
    var n = this;
    var r = { name: "Load More", version: "2.1", replacerKeys: "{{@%s%}}" };
    var i = ["config", "baseElement"];
    var s = {
        config: { object: "", method: "GET", requestData: null },
        itemsInit: 1,
        itemsPerLoad: 1,
        buttonToLoadMore: null,
        baseElement: null,
        scrollToLoadMore: false,
        waitLoadMore: true,
        autoScroll: false,
        minDelay: 0,
        effectOnLoadItems: false,
        specificObject: null,
        onLoadData: function (e) {
            void 0;
        },
        beforeLoadMore: function (e) {
            void 0;
        },
        afterLoadMore: function (e, t) {
            void 0;
        },
        lastLoadMore: function (e) {
            void 0;
        },
        clickButtonLoadMore: function () {
            void 0;
        },
        alwaysEndLoadMore: function () {
            void 0;
        },
    };
    var o = ["fadeIn", "zoomIn"];
    var u = ["buttonToLoadMore", "scrollToLoadMore"];
    var a = e,
        f = null,
        l = new Object(),
        c = "GET",
        h = "",
        p = null,
        d = 1,
        v = null,
        m = null,
        g = null,
        y = 0,
        b = false,
        w = false,
        E = false;
    this.minDelay = 0;
    this.itemsPerLoad = 1;
    this.loadMoreTimes = 0;
    this.scrollToLoadMore = false;
    this.effectOnLoadItems = false;
    this.autoScroll = false;
    this.specificObject = null;
    this.waitLoadMore = true;
    var S = function (e, t, n) {
        var r = typeof t;
        t = j.variableNotExitType(t, n);
        if ((t === false && r != "boolean") || (r == "boolean" && typeof n != "boolean")) {
            O(2, { find: ["%p%", "%t%"], replace: [e, r] });
            return false;
        }
        return n;
    };
    var x = function () {
        n.minDelay = S("minDelay", n.minDelay, s.minDelay);
        n.itemsPerLoad = S("itemsPerLoad", n.itemsPerLoad, s.itemsPerLoad);
        n.scrollToLoadMore = S("scrollToLoadMore", n.scrollToLoadMore, s.scrollToLoadMore);
        n.waitLoadMore = S("waitLoadMore", n.waitLoadMore, s.waitLoadMore);
        n.autoScroll = S("autoScroll", n.autoScroll, s.autoScroll);
        d = S("itemsInit", d, s.itemsInit);
        c = S("Data - Method", c, s.config.method);
        var e = typeof s.config.object;
        if (!j.alternateValueComparate(e, ["string", "object"])) {
            O(2, { find: ["%p%", "%t%"], replace: ["Data - URL", "string or object"] });
        } else if (e == "string") {
            var t = j.urlObject(s.config.object);
            f = t["protocol"] + "//" + t["host"] + t["pathname"];
        } else if (e == "object") {
            l = s.config.object;
        }
        var r = typeof s.baseElement;
        var i;
        if (!j.alternateValueComparate(r, ["string", "object"]) || (r == "object" && !j.isElement(s.baseElement))) {
            O(2, { find: ["%p%", "%t%"], replace: ["baseElement", "string or element"] });
        } else if (r == "string") {
            i = document.querySelector(s.baseElement);
            if (i == null) {
                O(3, { find: ["%s%"], replace: [s.baseElement] });
            }
        } else if (r == "object") {
            i = s.baseElement;
        }
        p = i.cloneNode(true);
        p.removeAttribute("id");
        i.remove();
        if (s.buttonToLoadMore != null && s.buttonToLoadMore != undefined) {
            var u = typeof s.buttonToLoadMore;
            if (u == "string") {
                v = document.querySelector(s.buttonToLoadMore);
                if (v == null) {
                    O(3, { find: ["%s%"], replace: [s.buttonToLoadMore] });
                }
            } else if (u == "object") {
                if (!j.isElement(s.buttonToLoadMore)) {
                    O(2, { find: ["%p%", "%t%"], replace: ["buttonToLoadMore", "string or element"] });
                }
                v = s.buttonToLoadMore;
            }
        } else {
            v = null;
        }
        var m = typeof s.effectOnLoadItems;
        if (!j.alternateValueComparate(m, ["string", "boolean"])) {
            O(2, { find: ["%p%", "%t%"], replace: ["effectOnLoadItems", "string or booelan"] });
        } else if (s.effectOnLoadItems === true) {
            O(4);
        } else if (m == "string" && o.indexOf(s.effectOnLoadItems) == -1) {
            O(5);
        } else if (o.indexOf(s.effectOnLoadItems) != -1) {
            n.effectOnLoadItems = s.effectOnLoadItems;
        }
        var y = typeof s.config.requestData;
        if (h != null) {
            if (y != "object") {
                O(2, { find: ["%p%", "%t%"], replace: ["postData", "object"] });
            } else {
                h = s.config.requestData;
            }
        }
        if (s.specificObject != null) {
            var b = typeof s.specificObject;
            var w = /\[([^\[,\]]{1,})\]/g;
            if (b != "string") {
                O(2, { find: ["%p%", "%t%"], replace: ["specificObject", "string"] });
            } else if (w.exec(s.specificObject) == null) {
                O(7);
            } else {
                n.specificObject = s.specificObject;
            }
        }
        g = a.cloneNode(0);
        n.onLoadData = S("onLoadData", n.onLoadData, s.onLoadData);
        n.beforeLoadMore = S("beforeLoadMore", n.beforeLoadMore, s.beforeLoadMore);
        n.afterLoadMore = S("afterLoadMore", n.afterLoadMore, s.afterLoadMore);
        n.lastLoadMore = S("lastLoadMore", n.lastLoadMore, s.lastLoadMore);
        n.clickButtonLoadMore = S("clickButtonLoadMore", n.clickButtonLoadMore, s.clickButtonLoadMore);
        n.alwaysEndLoadMore = S("alwaysEndLoadMore", n.alwaysEndLoadMore, s.alwaysEndLoadMore);
    };
    var T = function () {
        E = true;
        if (n.autoScroll == false) {
            E = false;
            return false;
        }
        var e = j.getPositionTop(a.childNodes[a.childNodes.length - 1]);
        setTimeout(function () {
            j.scrollTo(e);
            setTimeout(function () {
                E = false;
            }, 700);
        }, 100);
    };
    var N = function () {
        window.addEventListener("scroll", function () {
            if (!n.scrollToLoadMore) {
                return false;
            }
            var e = document.body.scrollTop;
            if (e < y) {
                y = e;
                return false;
            }
            y = e;
            var t = j.getPositionTop(a) + a.getBoundingClientRect().top * -1;
            if (e >= t && b == false && w == false && E == false) {
                n.loadMore();
            }
        });
    };
    var C = function () {
        n.clickButtonLoadMore();
        n.loadMore({}, n.itemsPerLoad);
    };
    var k = function () {
        if (v != null) {
            v.addEventListener("click", C);
        }
    };
    var L = function (e) {
        if (j.objLength(l) > 0) {
            e();
            return true;
        } else {
            j.requestAJAX(f, c.toLowerCase(), h, function (t) {
                e(t);
            });
        }
    };
    var A = [
        "Not exists parameters in function loadMore",
        "The required parameters are " + i.join(", "),
        "The parameter %p% must be of type %t%",
        "Can not find the element with selector equal: %s%",
        "Select the effect in the parameter effectOnLoadItems, the your value can't be equal true",
        "Not exists this effect, the available effects are: " + o.join(", "),
        "In function %f% - The %a% must be of type %t%",
        "The parameter specificObject must be build so: ' [key1][key2][key...] '",
        "Obtained object isn't two-dimensional, in this case it's mandatory to use the property specificObject",
    ];
    var O = function (e, t) {
        var n = r.name + " " + r.version;
        var i = t != undefined ? j.replaceArray(A[e], t["find"], t["replace"]) : A[e];
        throw new Error(n + " - " + i + ".");
    };
    var M = function (e) {
        var t = r.name + " " + r.version;
        console.error(t + " - " + e + ".");
    };
    var _ = function (e) {
        if (e) {
            var t = 0;
            for (var r in i) {
                if (Object.keys(e).indexOf(i[r]) != -1) {
                    if (i[r] == "config") {
                        if (e.config.object != undefined) {
                            t++;
                        }
                        continue;
                    }
                    t++;
                } else {
                    break;
                }
            }
            if (t != i.length) {
                O(1);
            }
            for (var o in e) {
                if (s.hasOwnProperty(o)) {
                    if (typeof e[o] == "object" && !j.isElement(e[o]) && typeof s[o] == "object" && s[o] != null) {
                        for (var r in e[o]) {
                            s[o][r] = e[o][r];
                        }
                    } else {
                        s[o] = e[o];
                    }
                }
            }
        } else {
            O(0);
        }
        x();
        L(function (e) {
            if (e) {
                if (typeof e != "object") {
                    l = JSON.parse(e);
                }
                if (!j.isBidimensionalObject(l) && n.specificObject == null) {
                    O(8);
                }
            }
            n.onLoadData(l);
            k();
            n.loadMore({}, d);
            N();
        });
    };
    var D = function (e, t, r) {
        if (r != undefined && r != null && typeof r != "string") {
            M("The argument specificObject must be type of string");
        }
        if (r == undefined || r == "" || r == null) {
            r = n.specificObject;
        }
        var i = /\[([^\[,\]]{1,})\]/g;
        if (i.exec(r) == null) {
            M('The format to specificObject is: "[%variable%]"');
        }
        var s = m == null ? l : m;
        s = r != null ? j.getPartOfObject(r, s) : s;
        e = e == undefined ? new Object() : e;
        t = t == undefined || t == null ? n.itemsPerLoad : t;
        if (s.length == 0) {
            n.alwaysEndLoadMore();
            return false;
        }
        if (typeof e != "object") {
            O(6, { find: ["%f%", "%a%", "%t%"], replace: ["loadMore", "first argument (specificLoad)", "object"] });
        }
        if (typeof t != "number") {
            O(6, { find: ["%f%", "%a%", "%t%"], replace: ["loadMore", "second argument (itemsToLoad)", "number"] });
        }
        return { objectInitial: s, specificLoad: e, itemsToLoad: t, specificObject: r };
    };
    var P = function (e) {
        a.innerHTML += e;
    };
    var H = function (e) {
        if (n.effectOnLoadItems == false) {
            return e;
        }
        a.style.transition = "height .5s";
        for (var t = 0; t < e.childNodes.length; t++) {
            if (e.childNodes[t] == undefined || e.childNodes[t].style == undefined) {
                continue;
            }
            e.childNodes[t].style.opacity = "0";
            e.childNodes[t].style.height = "0";
            e.childNodes[t].style.width = "0";
            e.childNodes[t].style.margin = "0";
            e.childNodes[t].style.padding = "0";
            e.childNodes[t].style.transition = "height .5s, width .5s, opacity .7s, margin .5s, padding .5s";
            if (n.effectOnLoadItems == "zoomIn") {
                e.childNodes[t].style.transition = "height .5s, width .5s, opacity .7s, margin .5s, padding .5s, transform .5s";
                e.childNodes[t].style.transform = "scale3d(.3, .3, .3)";
            }
        }
        return e;
    };
    var B = function (e) {
        if (n.effectOnLoadItems == false) {
            e(false);
            return false;
        }
        var t = {
            fadeIn: function () {
                for (var e = 0; e < a.childNodes.length; e++) {
                    if (a.childNodes[e] == undefined || a.childNodes[e].style == undefined) {
                        continue;
                    }
                    a.childNodes[e].style.opacity = "";
                }
            },
            zoomIn: function () {
                for (var e = 0; e < a.childNodes.length; e++) {
                    if (a.childNodes[e] == undefined || a.childNodes[e].style == undefined) {
                        continue;
                    }
                    a.childNodes[e].style.opacity = "";
                    a.childNodes[e].style.transform = "";
                }
            },
        };
        setTimeout(function () {
            for (var r = 0; r < a.childNodes.length; r++) {
                if (a.childNodes[r] == undefined || a.childNodes[r].style == undefined) {
                    continue;
                }
                a.childNodes[r].style.height = "";
                a.childNodes[r].style.width = "";
                a.childNodes[r].style.margin = "";
                a.childNodes[r].style.padding = "";
            }
            if (typeof t[n.effectOnLoadItems] == "function") {
                setTimeout(function () {
                    t[n.effectOnLoadItems]();
                    a.style.transition = "";
                    e(true);
                }, 500);
            }
        }, 300);
    };
    this.loadMore = function (e, t, i) {
        if (b && n.waitLoadMore == true) {
            return false;
        }
        b = true;
        n.beforeLoadMore(n.loadMoreTimes);
        var s = D(e, t, i);
        if (!s) {
            b = false;
            return false;
        }
        var o = s.objectInitial;
        var e = s.specificLoad;
        var t = s.itemsToLoad;
        var i = s.specificObject;
        var u = new Object();
        if (j.objLength(e) > 0) {
            var f = j.search(objInitial, e);
            u = f != -1 ? f : o;
        }
        u = o;
        var c = [];
        var h = document.createElement("div");
        for (var d = 0; d < t; d++) {
            var v = u[d];
            c.push(v);
            var g;
            var y = j.getCompleteHTML(p);
            var E = r.replacerKeys.split("%s%");
            for (var S in v) {
                var x = E[0] + S + E[1];
                y = y.replace(new RegExp(x, "g"), v[S]);
                y = y.replace(new RegExp("data-src", "g"), "src");
            }
            g = j.createElementFromHTML(y);
            h.appendChild(g);
        }
        h = H(h);
        m = j.severalSplice(o, c);
        if (i != null) {
            var N = new RegExp(/\[([^\[,\]]{1,})\]/g);
            var C = N.exec(i)[1];
            var k = j.cloneObject(l);
            k[C] = m;
            m = k;
        }
        setTimeout(function () {
            P(h.innerHTML);
            B(function () {
                T();
                b = false;
            });
            var e = [];
            for (var r = a.childNodes.length - 1; r >= a.childNodes.length - t; r--) {
                var s = a.childNodes[r];
                e.push(s);
            }
            n.loadMoreTimes++;
            n.afterLoadMore(e, n.loadMoreTimes);
            if (i != null ? j.objLength(j.getPartOfObject(i, m)) == 0 : j.objLength(m) == 0) {
                n.lastLoadMore(e);
                w = true;
            }
        }, n.minDelay);
    };
    this.destroy = function () {
        a.innerHTML = g.innerHTML;
    };
    this.restart = function () {
        m = null;
    };
    this.getNameSpecificObject = function () {
        var e = new RegExp(/\[([^\[,\]]{1,})\]/g);
        return e.exec(n.specificObject)[1];
    };
    this.onLoadData = function (e) {
        void 0;
    };
    this.beforeLoadMore = function (e) {
        void 0;
    };
    this.afterLoadMore = function (e, t) {
        void 0;
    };
    this.lastLoadMore = function (e) {
        void 0;
    };
    this.clickButtonLoadMore = function () {
        void 0;
    };
    this.alwaysEndLoadMore = function () {
        void 0;
    };
    var j = {
        isElement: function (e) {
            return !!(e && e.nodeType == 1);
        },
        requestAJAX: function (e, t, n, r) {
            var i = {};
            i.x = function () {
                if (typeof XMLHttpRequest !== "undefined") {
                    return new XMLHttpRequest();
                }
                var e = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"];
                var t;
                for (var n = 0; n < e.length; n++) {
                    try {
                        t = new ActiveXObject(e[n]);
                        break;
                    } catch (r) {}
                }
                return t;
            };
            i.send = function (e, t, n, r) {
                var s = i.x();
                s.open(n, e);
                s.onreadystatechange = function () {
                    if (s.readyState == 4) {
                        t(s.responseText);
                    }
                };
                if (n == "POST") {
                    s.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
                s.send(r);
            };
            i.get = function (e, t, n) {
                var r = [];
                for (var s in t) {
                    r.push(encodeURIComponent(s) + "=" + encodeURIComponent(t[s]));
                }
                i.send(e + "?" + r.join("&"), n, "GET", null);
            };
            i.post = function (e, t, n) {
                var r = [];
                for (var s in t) {
                    r.push(encodeURIComponent(s) + "=" + encodeURIComponent(t[s]));
                }
                i.send(e, n, "POST", r.join("&"));
            };
            i[t](e, n, r);
        },
        alternateValueComparate: function (e, t) {
            for (var n in t) {
                if (e == t[n]) {
                    return true;
                }
            }
            return false;
        },
        variableNotExitType: function (e, t) {
            if (typeof e == typeof t) return t;
            return false;
        },
        replaceArray: function (e, t, n) {
            for (var r = 0; r < t.length; r++) {
                e = e.replace(new RegExp(t[r], "g"), n[r]);
            }
            return e;
        },
        objLength: function (e) {
            if (typeof e != "object" || e == null) return false;
            return Object.keys(e).length;
        },
        urlObject: function (e) {
            var t = document.createElement("a");
            t.setAttribute("href", e);
            var n = { protocol: t.protocol, hostname: t.hostname, host: t.host, port: t.port, hash: t.hash.substr(1), pathname: t.pathname, search: t.search };
            return n;
        },
        search: function (e, t) {
            if (!(Object.keys(t).length > 0)) return e;
            var n = [];
            for (var r in e) {
                var i = e[r];
                var s = 0;
                for (var o in t) {
                    if (i[o] != t[o]) break;
                    s++;
                    if (s == Object.keys(t).length) n.push(i);
                }
            }
            if (n.length == 0) return -1;
            else return n;
        },
        severalSplice: function (e, t) {
            if (j.objLength(e) == 0) {
                return n;
            }
            var n = e.slice(0);
            for (var r in t) {
                var i = n.indexOf(t[r]);
                if (i != -1) n.splice(i, 1);
            }
            return n;
        },
        getCompleteHTML: function (e) {
            var t = e.cloneNode(true);
            var n = document.createElement("div");
            n.appendChild(t);
            return n.innerHTML;
        },
        createElementFromHTML: function (e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            return t.childNodes[0];
        },
        getPositionTop: function (e) {
            var t = document.body.getBoundingClientRect(),
                n = e.getBoundingClientRect(),
                r = n.top - t.top;
            return r;
        },
        scrollTo: function (e, t) {
            function u() {
                var e;
                i = (Date.now() - r) / 500;
                if (i >= 1) {
                    clearInterval(n);
                    i = 1;
                }
                e = i * o + s;
                window.scrollBy(0, e - window.pageYOffset);
            }
            var n, r, i;
            var s = window.pageYOffset,
                o = e - window.pageYOffset;
            t = 500 || 1e3;
            r = Date.now();
            i = 0;
            if (n) {
                clearInterval(n);
            }
            n = setInterval(u, 10);
            return n;
        },
        getPartOfObject: function (e, t) {
            var n = /\[([^\[,\]]{1,})\]/g,
                r,
                i = t;
            while ((r = n.exec(e)) != null) {
                var s = r[1];
                i = i[s];
            }
            return i;
        },
        isBidimensionalObject: function (e) {
            for (var t in e) {
                for (var n in e[t]) {
                    if (typeof e[t][n] == "object" || typeof e[t][n] == "array") {
                        return false;
                    }
                }
            }
            return true;
        },
        cloneObject: function (e) {
            var t = new Object();
            for (var n in e) {
                t[n] = e[n];
            }
            return t;
        },
    };
    _(t);
}
Element.prototype.loadMore = function (e) {
    return new loadMore(this, e);
};