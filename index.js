var e = this && this.__awaiter || function (e, a, l, t) {
    return new(l || (l = Promise))((function (s, r) {
        function i(e) {
            try {
                n(t.next(e))
            } catch (e) {
                r(e)
            }
        }
        function o(e) {
            try {
                n(t.throw(e))
            } catch (e) {
                r(e)
            }
        }
        function n(e) {
            var a;
            e.done ? s(e.value) : (a = e.value, a instanceof l ? a : new l((function (e) {
                e(a)
            }))).then(i, o)
        }
        n((t = t.apply(e, a || [])).next())
    }))
}, a = this && this.__generator || function (e, a) {
    var l, t, s, r = {
        label: 0,
        sent: function () {
            if (1 & s[0]) throw s[1];
            return s[1]
        },
        trys: [],
        ops: []
    }, i = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
    return i.next = o(0), i.throw = o(1), i.return = o(2), "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this
    }), i;
    function o(o) {
        return function (n) {
            return function (o) {
                if (l) throw new TypeError("Generator is already executing.");
                for (; i && (i = 0, o[0] && (r = 0)), r;) try {
                    if (l = 1, t && (s = 2 & o[0] ? t.return : o[0] ? t.throw || ((s = t.return) && s.call(t), 0) : t.next) && !(s = s.call(t, o[1])).done) return s;
                    switch (t = 0, s && (o = [2 & o[0], s.value]), o[0]) {
                        case 0:
                        case 1:
                            s = o;
                            break;
                        case 4:
                            return r.label++, {
                                value: o[1],
                                done: !1
                            };
                        case 5:
                            r.label++, t = o[1], o = [0];
                            continue;
                        case 7:
                            o = r.ops.pop(), r.trys.pop();
                            continue;
                        default:
                            if (!(s = r.trys, (s = s.length > 0 && s[s.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                r = 0;
                                continue
                            }
                            if (3 === o[0] && (!s || o[1] > s[0] && o[1] < s[3])) {
                                r.label = o[1];
                                break
                            }
                            if (6 === o[0] && r.label < s[1]) {
                                r.label = s[1], s = o;
                                break
                            }
                            if (s && r.label < s[2]) {
                                r.label = s[2], r.ops.push(o);
                                break
                            }
                            s[2] && r.ops.pop(), r.trys.pop();
                            continue
                    }
                    o = a.call(e, r)
                } catch (e) {
                    o = [6, e], t = 0
                } finally {
                    l = s = 0
                }
                if (5 & o[0]) throw o[1];
                return {
                    value: o[0] ? o[1] : void 0,
                    done: !0
                }
            }([o, n])
        }
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var l = require("cheerio"),
    t = require("htmlparser2"),
    s = require("@libs/fetch"),
    r = require("@libs/novelStatus"),
    i = require("@libs/defaultCover"),
    o = require("@libs/storage");

function n(e, a) {
    var l = e.match(/(\d+)$/);
    l && l[0] && (a.chapterNumber = parseInt(l[0]))
}
var u = new(function () {
    function u(e) {
        var a, l, t;
        this.hideLocked = o.storage.get("hideLocked"), 
        this.id = e.id, 
        this.name = e.sourceName, 
        this.icon = "multisrc/realmnovel/icon.png", 
        this.site = e.sourceSite;
        var s = (null === (a = e.options) || void 0 === a ? void 0 : a.versionIncrements) || 0;
        this.version = "1.0.".concat(1 + s), 
        this.options = null !== (l = e.options) && void 0 !== l ? l : {}, 
        this.filters = e.filters, 
        (null === (t = this.options) || void 0 === t ? void 0 : t.hasLocked) && (this.pluginSettings = {
            hideLocked: {
                value: "",
                label: "Hide locked chapters",
                type: "Switch"
            }
        })
    }
    return u.prototype.getHostname = function (e) {
            var a = (e = e.split("/")[2]).split(".");
            return a.pop(), a.join(".")
        }, 
        u.prototype.safeFetch = function (l, t) {
            return e(this, void 0, void 0, (function () {
                var e, r, i, o, n, u, c, v;
                return a(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return e = l.split("://"), r = e.shift(), i = e[0].replace(/\/\//g, "/"), [4, (0, s.fetchApi)(r + "://" + i)];
                        case 1:
                            if (!(o = a.sent()).ok && 1 != t) throw new Error("Could not reach site (" + o.status + ") try to open in webview.");
                            return [4, o.text()];
                        case 2:
                            if (n = a.sent(), u = null === (v = null === (c = n.match(/<title>(.*?)<\/title>/)) || void 0 === c ? void 0 : c[1]) || void 0 === v ? void 0 : v.trim(), this.getHostname(l) != this.getHostname(o.url) || u && ("Bot Verification" == u || "You are being redirected..." == u || "Un instant..." == u || "Just a moment..." == u || "Redirecting..." == u)) throw new Error("Captcha error, please open in webview (or the website has changed url)");
                            return [2, n]
                    }
                }))
            }))
        }, 
        u.prototype.parseNovels = function (e) {
            var a = this;
            e = (0, l.load)(e).html();
            var t = [];
            return (e.match(/<article([^]*?)<\/article>/g) || []).forEach((function (e) {
                var l = e.match(/<a href="([^\"]*)".*? title="([^\"]*)"/) || [],
                    s = l[1],
                    r = l[2];
                if (r && s) {
                    var o = e.match(/<img [^>]*?src="([^\"]*)"[^>]*?(?: data-src="([^\"]*)")?[^>]*>/) || [],
                        n = void 0;
                    if (s.includes(a.site)) n = s.replace(a.site, "");
                    else {
                        var u = s.split("/");
                        u.shift(), u.shift(), u.shift(), n = u.join("/")
                    }
                    t.push({
                        name: r,
                        cover: o[2] || o[1] || i.defaultCover,
                        path: n
                    })
                }
            })), t
        }, 
        u.prototype.popularNovels = function (l, t) {
            return e(this, arguments, void 0, (function (e, l) {
                var t, s, r, i, o, n, u, c, v, h = l.filters,
                    b = l.showLatestNovels;
                return a(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            for (r in t = "/novel/", s = this.site + t + "?page=" + e, h || (h = this.filters || {}), b && (s += "&order=latest"), h) if ("object" == typeof h[r].value) for (i = 0, o = h[r].value; i < o.length; i++) n = o[i], s += "&".concat(r, "=").concat(n);
                            else h[r].value && (s += "&".concat(r, "=").concat(h[r].value));
                            return [4, this.safeFetch(s, !1)];
                        case 1:
                            return u = a.sent(), [2, this.parseNovels(u)]
                    }
                }))
            }))
        }, 
        u.prototype.parseNovel = function (l) {
            return e(this, void 0, void 0, (function () {
                var e, s, o, u, c, v, h, b, p, d, f, m, g, y, w, k, x, N, C, S, j;
                return a(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return e = this.site, [4, this.safeFetch(e + l, !1)];
                        case 1:
                            return s = a.sent(), o = {
                                path: l,
                                name: "",
                                genres: "",
                                summary: "",
                                author: "",
                                artist: "",
                                status: "",
                                chapters: []
                            }, u = !1, c = !1, v = 0, h = !1, b = !1, p = !1, d = !1, f = !1, m = !1, g = !1, y = 0, w = !1, k = !1, x = [], N = {}, C = this.hideLocked, S = new t.Parser({
                                onopentag: function (a, l) {
                                    var t;
                                    !o.cover && (null === (t = l.class) || void 0 === t ? void 0 : t.includes("novel-cover")) ? (o.name = l.alt, o.cover = l["data-src"] || l.src || i.defaultCover) : "genres" === l.class ? u = !0 : u && "a" === a ? c = !0 : "div" !== a || "summary" !== l.class && "description" !== l.itemprop ? "info" === l.class ? h = !0 : h && "span" === a ? b = !0 : "div" === a && "status" === l.class ? (h = !0, b = !0, f = !0) : l.class && l.class.includes("chapter-list") ? m = !0 : m && "li" === a ? g = !0 : g ? "a" === a && void 0 === N.path ? N.path = l.href.replace(e, "").trim() : "chapter-number" === l.class ? y = 1 : "chapter-title" === l.class ? y = 2 : "chapter-date" === l.class ? y = 3 : "chapter-locked" === l.class && (y = 4) : v && "div" === a && v++ : v++
                                },
                                ontext: function (e) {
                                    var a, l;
                                    if (u) c && (o.genres += e + ", ");
                                    else if (1 === v) o.summary += e.trim();
                                    else if (h) {
                                        if (b) {
                                            var t = e.toLowerCase().replace(":", "").trim();
                                            if (p) o.author += e || "Unknown";
                                            else if (d) o.artist += e || "Unknown";
                                            else if (f) switch (t) {
                                                case "completed":
                                                case "مكتملة":
                                                    o.status = r.NovelStatus.Completed;
                                                    break;
                                                case "ongoing":
                                                case "مستمرة":
                                                    o.status = r.NovelStatus.Ongoing;
                                                    break;
                                                case "hiatus":
                                                case "متوقفة":
                                                    o.status = r.NovelStatus.OnHiatus;
                                                    break;
                                                default:
                                                    o.status = r.NovelStatus.Unknown
                                            }
                                            switch (t) {
                                                case "author":
                                                case "الكاتب":
                                                    p = !0;
                                                    break;
                                                case "status":
                                                case "الحالة":
                                                    f = !0;
                                                    break;
                                                case "artist":
                                                case "الفنان":
                                                    d = !0
                                            }
                                        }
                                    } else if (m && g) if (1 === y) e.includes("🔒") ? (w = !0, k = !0) : k && (w = !1), n(e, N);
                                    else if (2 === y) N.name = (null === (l = null === (a = e.match(RegExp("^".concat(o.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "\\s*(.+)")))) || void 0 === a ? void 0 : a[1]) || void 0 === l ? void 0 : l.trim()) || e.trim(), N.chapterNumber || n(e, N);
                                    else if (3 === y) N.releaseTime = e;
                                    else if (4 === y) switch (t = e.toLowerCase().trim()) {
                                        case "free":
                                        case "gratuit":
                                        case "مجاني":
                                            w = !1;
                                            break;
                                        default:
                                            w = !0
                                    }
                                },
                                onclosetag: function (e) {
                                    var a, l, t;
                                    u ? c ? c = !1 : (u = !1, o.genres = null === (a = o.genres) || void 0 === a ? void 0 : a.slice(0, -2)) : v ? "br" === e ? o.summary += "\n" : "div" === e && v-- : h ? b ? "span" === e && (b = !1, p && o.author ? p = !1 : d && o.artist ? d = !1 : f && "" !== o.status && (f = !1)) : "div" === e && (h = !1, o.author = null === (l = o.author) || void 0 === l ? void 0 : l.trim(), o.artist = null === (t = o.artist) || void 0 === t ? void 0 : t.trim()) : m && (g ? 1 === y || 2 === y || 3 === y || 4 === y ? y = 0 : "li" === e && (g = !1, N.chapterNumber || (N.chapterNumber = 0), w && (N.name = "🔒 " + N.name), C && w || x.push(N), N = {}) : "ul" === e && (m = !1))
                                }
                            }), S.write(s), S.end(), x.length && ((null === (j = this.options) || void 0 === j ? void 0 : j.reverseChapters) && x.reverse(), o.chapters = x), [2, o]
                    }
                }))
            }))
        }, 
        u.prototype.parseChapter = function (t) {
            return e(this, void 0, void 0, (function () {
                var e, s, r, i, o, n;
                return a(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return [4, this.safeFetch(this.site + t, !1)];
                        case 1:
                            if (e = a.sent(), null === (r = this.options) || void 0 === r ? void 0 : r.customJs) try {
                                s = (0, l.load)(e), null === (i = s("article > style").text().match(/\.\w+(?=\s*[,{])/g)) || void 0 === i || i.forEach((function (e) {
                                    return s("p".concat(e)).remove()
                                })), s(".chapter-content .ads").remove(), e = s.html()
                            } catch (e) {
                                throw console.error("Error executing customJs:", e), e
                            }
                            return [2, (null === (n = null === (o = e.match(/<div.*?class="chapter-content ([^]*?)<div.*?class="?chapter-nav/g)) || void 0 === o ? void 0 : o[0].match(/<p[^>]*>([^]*?)<\/p>/g)) || void 0 === n ? void 0 : n.join("\n")) || ""]
                    }
                }))
            }))
        }, 
        u.prototype.searchNovels = function (l, t) {
            return e(this, void 0, void 0, (function () {
                var e, s;
                return a(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return e = this.site + "search?query=" + encodeURIComponent(l) + "&page=" + t, [4, this.safeFetch(e, !0)];
                        case 1:
                            return s = a.sent(), [2, this.parseNovels(s)]
                    }
                }))
            }))
        }, u
})({
    id: "realmnovel",
    sourceSite: "https://www.realmnovel.com/",
    sourceName: "RealmNovel",
    options: {
        lang: "ara",
        reverseChapters: !0,
        customJs: "$('article > style').text().match(/\\.\\w+(?=\\s*[,{])/g)?.forEach(tag => $(`p${tag}`).remove());$('.chapter-content .ads').remove();",
        versionIncrements: 0
    },
    filters: {
        "genre[]": {
            type: "Checkbox",
            label: "Genre",
            value: [],
            options: [{
                label: "Action",
                value: "action"
            }, {
                label: "Adventure",
                value: "adventure"
            }, {
                label: "Comedy",
                value: "comedy"
            }, {
                label: "Drama",
                value: "drama"
            }, {
                label: "Fantasy",
                value: "fantasy"
            }, {
                label: "Harem",
                value: "harem"
            }, {
                label: "Historical",
                value: "historical"
            }, {
                label: "Horror",
                value: "horror"
            }, {
                label: "Martial Arts",
                value: "martial-arts"
            }, {
                label: "Mature",
                value: "mature"
            }, {
                label: "Mystery",
                value: "mystery"
            }, {
                label: "Psychological",
                value: "psychological"
            }, {
                label: "Romance",
                value: "romance"
            }, {
                label: "Sci-fi",
                value: "sci-fi"
            }, {
                label: "Slice of Life",
                value: "slice-of-life"
            }, {
                label: "Supernatural",
                value: "supernatural"
            }, {
                label: "Tragedy",
                value: "tragedy"
            }]
        },
        "status": {
            type: "Picker",
            label: "Status",
            value: "",
            options: [{
                label: "All",
                value: ""
            }, {
                label: "Ongoing",
                value: "ongoing"
            }, {
                label: "Completed",
                value: "completed"
            }, {
                label: "Hiatus",
                value: "hiatus"
            }]
        },
        "order": {
            type: "Picker",
            label: "Order by",
            value: "",
            options: [{
                label: "Default",
                value: ""
            }, {
                label: "A-Z",
                value: "title"
            }, {
                label: "Z-A",
                value: "titlereverse"
            }, {
                label: "Latest Updates",
                value: "update"
            }, {
                label: "Newest",
                value: "latest"
            }, {
                label: "Popular",
                value: "popular"
            }]
        }
    }
});
exports.default = u;
