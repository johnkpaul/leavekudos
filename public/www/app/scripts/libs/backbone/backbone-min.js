// Backbone.js 0.9.2
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function (h, g) {
    typeof exports !== "undefined" ? g(h, exports, require("underscore")) : typeof define === "function" && define.amd ? define(["underscore", "jquery", "exports"], function (f, i, p) {
        h.Backbone = g(h, p, f, i)
    }) : h.Backbone = g(h, {}, h._, h.jQuery || h.Zepto || h.ender)
})(this, function (h, g, f, i) {
    var p = h.Backbone,
        y = Array.prototype.slice,
        z = Array.prototype.splice;
    g.VERSION = "0.9.2";
    g.setDomLibrary = function (a) {
        i = a
    };
    g.noConflict = function () {
        h.Backbone = p;
        return g
    };
    g.emulateHTTP = false;
    g.emulateJSON = false;
    var q = /\s+/,
        l = g.Events = {
            on: function (a, b, c) {
                var d, e, f, g, j;
                if (!b) return this;
                a = a.split(q);
                for (d = this._callbacks || (this._callbacks = {}); e = a.shift();) f = (j = d[e]) ? j.tail : {}, f.next = g = {}, f.context = c, f.callback = b, d[e] = {
                    tail: g,
                    next: j ? j.next : f
                };
                return this
            },
            off: function (a, b, c) {
                var d, e, k, g, j, h;
                if (e = this._callbacks) {
                    if (!a && !b && !c) return delete this._callbacks, this;
                    for (a = a ? a.split(q) : f.keys(e); d = a.shift();) if (k = e[d], delete e[d], k && (b || c)) for (g = k.tail;
                    (k = k.next) !== g;) if (j = k.callback, h = k.context, b && j !== b || c && h !== c) this.on(d, j, h);
                    return this
                }
            },
            trigger: function (a) {
                var b, c, d, e, f, g;
                if (!(d = this._callbacks)) return this;
                f = d.all;
                a = a.split(q);
                for (g = y.call(arguments, 1); b = a.shift();) {
                    if (c = d[b]) for (e = c.tail;
                    (c = c.next) !== e;) c.callback.apply(c.context || this, g);
                    if (c = f) {
                        e = c.tail;
                        for (b = [b].concat(g);
                        (c = c.next) !== e;) c.callback.apply(c.context || this, b)
                    }
                }
                return this
            }
        };
    l.bind = l.on;
    l.unbind = l.off;
    var o = g.Model = function (a, b) {
        var c;
        a || (a = {});
        b && b.parse && (a = this.parse(a));
        if (c = n(this, "defaults")) a = f.extend({}, c, a);
        if (b && b.collection) this.collection = b.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = f.uniqueId("c");
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this.set(a, {
            silent: true
        });
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this._previousAttributes = f.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    f.extend(o.prototype, l, {
        changed: null,
        _silent: null,
        _pending: null,
        idAttribute: "id",
        initialize: function () {},
        toJSON: function () {
            return f.clone(this.attributes)
        },
        get: function (a) {
            return this.attributes[a]
        },
        escape: function (a) {
            var b;
            if (b = this._escapedAttributes[a]) return b;
            b = this.get(a);
            return this._escapedAttributes[a] = f.escape(b == null ? "" : "" + b)
        },
        has: function (a) {
            return this.get(a) != null
        },
        set: function (a, b, c) {
            var d, e;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b);
            c || (c = {});
            if (!d) return this;
            if (d instanceof o) d = d.attributes;
            if (c.unset) for (e in d) d[e] = void 0;
            if (!this._validate(d, c)) return false;
            if (this.idAttribute in d) this.id = d[this.idAttribute];
            var b = c.changes = {}, g = this.attributes,
                h = this._escapedAttributes,
                j = this._previousAttributes || {};
            for (e in d) {
                a = d[e];
                if (!f.isEqual(g[e], a) || c.unset && f.has(g, e)) delete h[e], (c.silent ? this._silent : b)[e] = true;
                c.unset ? delete g[e] : g[e] = a;
                !f.isEqual(j[e], a) || f.has(g, e) != f.has(j, e) ? (this.changed[e] = a, c.silent || (this._pending[e] = true)) : (delete this.changed[e], delete this._pending[e])
            }
            c.silent || this.change(c);
            return this
        },
        unset: function (a, b) {
            (b || (b = {})).unset = true;
            return this.set(a, null, b)
        },
        clear: function (a) {
            (a || (a = {})).unset = true;
            return this.set(f.clone(this.attributes), a)
        },
        fetch: function (a) {
            var a = a ? f.clone(a) : {}, b = this,
                c = a.success;
            a.success = function (d, e, f) {
                if (!b.set(b.parse(d, f), a)) return false;
                c && c(b, d)
            };
            a.error = g.wrapError(a.error, b, a);
            return (this.sync || g.sync).call(this, "read", this, a)
        },
        save: function (a, b, c) {
            var d, e;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b);
            c = c ? f.clone(c) : {};
            if (c.wait) {
                if (!this._validate(d, c)) return false;
                e = f.clone(this.attributes)
            }
            a = f.extend({}, c, {
                silent: true
            });
            if (d && !this.set(d, c.wait ? a : c)) return false;
            var k = this,
                h = c.success;
            c.success = function (a, b, e) {
                b = k.parse(a, e);
                c.wait && (delete c.wait, b = f.extend(d || {}, b));
                if (!k.set(b, c)) return false;
                h ? h(k, a) : k.trigger("sync", k, a, c)
            };
            c.error = g.wrapError(c.error, k, c);
            b = this.isNew() ? "create" : "update";
            b = (this.sync || g.sync).call(this, b, this, c);
            c.wait && this.set(e, a);
            return b
        },
        destroy: function (a) {
            var a = a ? f.clone(a) : {}, b = this,
                c = a.success,
                d = function () {
                    b.trigger("destroy", b, b.collection, a)
                };
            if (this.isNew()) return d(), false;
            a.success = function (e) {
                a.wait && d();
                c ? c(b, e) : b.trigger("sync", b, e, a)
            };
            a.error = g.wrapError(a.error, b, a);
            var e = (this.sync || g.sync).call(this, "delete", this, a);
            a.wait || d();
            return e
        },
        url: function () {
            var a = n(this, "urlRoot") || n(this.collection, "url") || t();
            return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function (a) {
            return a
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return this.id == null
        },
        change: function (a) {
            a || (a = {});
            var b = this._changing;
            this._changing = true;
            for (var c in this._silent) this._pending[c] = true;
            var d = f.extend({}, a.changes, this._silent);
            this._silent = {};
            for (c in d) this.trigger("change:" + c, this, this.get(c), a);
            if (b) return this;
            for (; !f.isEmpty(this._pending);) {
                this._pending = {};
                this.trigger("change", this, a);
                for (c in this.changed)!this._pending[c] && !this._silent[c] && delete this.changed[c];
                this._previousAttributes = f.clone(this.attributes)
            }
            this._changing = false;
            return this
        },
        hasChanged: function (a) {
            return !arguments.length ? !f.isEmpty(this.changed) : f.has(this.changed, a)
        },
        changedAttributes: function (a) {
            if (!a) return this.hasChanged() ? f.clone(this.changed) : false;
            var b, c = false,
                d = this._previousAttributes,
                e;
            for (e in a) if (!f.isEqual(d[e], b = a[e]))(c || (c = {}))[e] = b;
            return c
        },
        previous: function (a) {
            return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[a]
        },
        previousAttributes: function () {
            return f.clone(this._previousAttributes)
        },
        isValid: function () {
            return !this.validate(this.attributes)
        },
        _validate: function (a, b) {
            if (b.silent || !this.validate) return true;
            var a = f.extend({}, this.attributes, a),
                c = this.validate(a, b);
            if (!c) return true;
            b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b);
            return false
        }
    });
    var r = g.Collection = function (a, b) {
        b || (b = {});
        if (b.model) this.model = b.model;
        if (b.comparator) this.comparator = b.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        a && this.reset(a, {
            silent: true,
            parse: b.parse
        })
    };
    f.extend(r.prototype, l, {
        model: o,
        initialize: function () {},
        toJSON: function (a) {
            return this.map(function (b) {
                return b.toJSON(a)
            })
        },
        add: function (a, b) {
            var c, d, e, g, h, j = {}, i = {}, l = [];
            b || (b = {});
            a = f.isArray(a) ? a.slice() : [a];
            for (c = 0, d = a.length; c < d; c++) {
                if (!(e = a[c] = this._prepareModel(a[c], b))) throw Error("Can't add an invalid model to a collection");
                g = e.cid;
                h = e.id;
                j[g] || this._byCid[g] || h != null && (i[h] || this._byId[h]) ? l.push(c) : j[g] = i[h] = e
            }
            for (c = l.length; c--;) a.splice(l[c], 1);
            for (c = 0, d = a.length; c < d; c++)(e = a[c]).on("all", this._onModelEvent, this), this._byCid[e.cid] = e, e.id != null && (this._byId[e.id] = e);
            this.length += d;
            z.apply(this.models, [b.at != null ? b.at : this.models.length, 0].concat(a));
            this.comparator && this.sort({
                silent: true
            });
            if (b.silent) return this;
            for (c = 0, d = this.models.length; c < d; c++) if (j[(e = this.models[c]).cid]) b.index = c, e.trigger("add", e, this, b);
            return this
        },
        remove: function (a, b) {
            var c, d, e, g;
            b || (b = {});
            a = f.isArray(a) ? a.slice() : [a];
            for (c = 0, d = a.length; c < d; c++) if (g = this.getByCid(a[c]) || this.get(a[c])) {
                delete this._byId[g.id];
                delete this._byCid[g.cid];
                e = this.indexOf(g);
                this.models.splice(e, 1);
                this.length--;
                if (!b.silent) b.index = e, g.trigger("remove", g, this, b);
                this._removeReference(g)
            }
            return this
        },
        push: function (a, b) {
            a = this._prepareModel(a, b);
            this.add(a,
            b);
            return a
        },
        pop: function (a) {
            var b = this.at(this.length - 1);
            this.remove(b, a);
            return b
        },
        unshift: function (a, b) {
            a = this._prepareModel(a, b);
            this.add(a, f.extend({
                at: 0
            }, b));
            return a
        },
        shift: function (a) {
            var b = this.at(0);
            this.remove(b, a);
            return b
        },
        get: function (a) {
            return a == null ? void 0 : this._byId[a.id != null ? a.id : a]
        },
        getByCid: function (a) {
            return a && this._byCid[a.cid || a]
        },
        at: function (a) {
            return this.models[a]
        },
        where: function (a) {
            return f.isEmpty(a) ? [] : this.filter(function (b) {
                for (var c in a) if (a[c] !== b.get(c)) return false;
                return true
            })
        },
        sort: function (a) {
            a || (a = {});
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            var b = f.bind(this.comparator, this);
            this.comparator.length == 1 ? this.models = this.sortBy(b) : this.models.sort(b);
            a.silent || this.trigger("reset", this, a);
            return this
        },
        pluck: function (a) {
            return f.map(this.models, function (b) {
                return b.get(a)
            })
        },
        reset: function (a, b) {
            a || (a = []);
            b || (b = {});
            for (var c = 0, d = this.models.length; c < d; c++) this._removeReference(this.models[c]);
            this._reset();
            this.add(a, f.extend({
                silent: true
            },
            b));
            b.silent || this.trigger("reset", this, b);
            return this
        },
        fetch: function (a) {
            a = a ? f.clone(a) : {};
            if (a.parse === void 0) a.parse = true;
            var b = this,
                c = a.success;
            a.success = function (d, e, f) {
                b[a.add ? "add" : "reset"](b.parse(d, f), a);
                c && c(b, d)
            };
            a.error = g.wrapError(a.error, b, a);
            return (this.sync || g.sync).call(this, "read", this, a)
        },
        create: function (a, b) {
            var c = this,
                b = b ? f.clone(b) : {}, a = this._prepareModel(a, b);
            if (!a) return false;
            b.wait || c.add(a, b);
            var d = b.success;
            b.success = function (e, f) {
                b.wait && c.add(e, b);
                d ? d(e, f) : e.trigger("sync",
                a, f, b)
            };
            a.save(null, b);
            return a
        },
        parse: function (a) {
            return a
        },
        chain: function () {
            return f(this.models).chain()
        },
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function (a, b) {
            b || (b = {});
            if (a instanceof o) {
                if (!a.collection) a.collection = this
            } else {
                var c;
                b.collection = this;
                a = new this.model(a, b);
                a._validate(a.attributes, b) || (a = false)
            }
            return a
        },
        _removeReference: function (a) {
            this == a.collection && delete a.collection;
            a.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (a,
        b, c, d) {
            (a == "add" || a == "remove") && c != this || (a == "destroy" && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments))
        }
    });
    f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","), function (a) {
        r.prototype[a] = function () {
            return f[a].apply(f, [this.models].concat(f.toArray(arguments)))
        }
    });
    var u = g.Router = function (a) {
        a || (a = {});
        if (a.routes) this.routes = a.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }, A = /:\w+/g,
        B = /\*\w+/g,
        C = /[-[\]{}()+?.,\\^$|#\s]/g;
    f.extend(u.prototype, l, {
        initialize: function () {},
        route: function (a, b, c) {
            g.history || (g.history = new m);
            f.isRegExp(a) || (a = this._routeToRegExp(a));
            c || (c = this[b]);
            g.history.route(a, f.bind(function (d) {
                d = this._extractParameters(a, d);
                c && c.apply(this, d);
                this.trigger.apply(this, ["route:" + b].concat(d));
                g.history.trigger("route", this, b, d)
            }, this));
            return this
        },
        navigate: function (a, b) {
            g.history.navigate(a, b)
        },
        _bindRoutes: function () {
            if (this.routes) {
                var a = [],
                    b;
                for (b in this.routes) a.unshift([b, this.routes[b]]);
                b = 0;
                for (var c = a.length; b < c; b++) this.route(a[b][0], a[b][1], this[a[b][1]])
            }
        },
        _routeToRegExp: function (a) {
            a = a.replace(C, "\\$&").replace(A, "([^/]+)").replace(B, "(.*?)");
            return RegExp("^" + a + "$")
        },
        _extractParameters: function (a, b) {
            return a.exec(b).slice(1)
        }
    });
    var m = g.History = function () {
        this.handlers = [];
        f.bindAll(this, "checkUrl")
    }, s = /^[#\/]/,
        D = /msie [\w.]+/;
    m.started = false;
    f.extend(m.prototype, l, {
        interval: 50,
        getHash: function (a) {
            return (a = (a ? a.location : window.location).href.match(/#(.*)$/)) ? a[1] : ""
        },
        getFragment: function (a, b) {
            if (a == null) if (this._hasPushState || b) {
                var a = window.location.pathname,
                    c = window.location.search;
                c && (a += c)
            } else a = this.getHash();
            a.indexOf(this.options.root) || (a = a.substr(this.options.root.length));
            return a.replace(s, "")
        },
        start: function (a) {
            if (m.started) throw Error("Backbone.history has already been started");
            m.started = true;
            this.options = f.extend({}, {
                root: "/"
            }, this.options, a);
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !! this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
            var a = this.getFragment(),
                b = document.documentMode;
            if (b = D.exec(navigator.userAgent.toLowerCase()) && (!b || b <= 7)) this.iframe = i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
            if (this._hasPushState) i(window).bind("popstate",
            this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in window && !b) i(window).bind("hashchange", this.checkUrl);
            else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            this.fragment = a;
            a = window.location;
            b = a.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b) return this.fragment = this.getFragment(null, true), window.location.replace(this.options.root + "#" + this.fragment), true;
            else if (this._wantsPushState && this._hasPushState && b && a.hash) this.fragment = this.getHash().replace(s, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment);
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function () {
            i(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            m.started = false
        },
        route: function (a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            })
        },
        checkUrl: function () {
            var a = this.getFragment();
            a == this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
            if (a == this.fragment) return false;
            this.iframe && this.navigate(a);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function (a) {
            var b = this.fragment = this.getFragment(a);
            return f.any(this.handlers, function (a) {
                if (a.route.test(b)) return a.callback(b), true
            })
        },
        navigate: function (a, b) {
            if (!m.started) return false;
            if (!b || b === true) b = {
                trigger: b
            };
            var c = (a || "").replace(s, "");
            if (this.fragment != c) this._hasPushState ? (c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history[b.replace ?
                "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a)
        },
        _updateHash: function (a, b, c) {
            c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
        }
    });
    var v = g.View = function (a) {
        this.cid = f.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }, E = /^(\S+)\s*(.*)$/,
        w = "model,collection,el,id,attributes,className,tagName".split(",");
    f.extend(v.prototype, l, {
        tagName: "div",
        $: function (a) {
            return this.$el.find(a)
        },
        initialize: function () {},
        render: function () {
            return this
        },
        remove: function () {
            this.$el.remove();
            return this
        },
        make: function (a, b, c) {
            a = document.createElement(a);
            b && i(a).attr(b);
            c != null && i(a).html(c);
            return a
        },
        setElement: function (a,
        b) {
            this.$el && this.undelegateEvents();
            this.$el = a instanceof i ? a : i(a);
            this.el = this.$el[0];
            b !== false && this.delegateEvents();
            return this
        },
        delegateEvents: function (a) {
            if (a || (a = n(this, "events"))) {
                this.undelegateEvents();
                for (var b in a) {
                    var c = a[b];
                    f.isFunction(c) || (c = this[a[b]]);
                    if (!c) throw Error('Method "' + a[b] + '" does not exist');
                    var d = b.match(E),
                        e = d[1],
                        d = d[2],
                        c = f.bind(c, this);
                    e += ".delegateEvents" + this.cid;
                    d === "" ? this.$el.bind(e, c) : this.$el.delegate(d, e, c)
                }
            }
        },
        undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function (a) {
            this.options && (a = f.extend({}, this.options, a));
            for (var b = 0, c = w.length; b < c; b++) {
                var d = w[b];
                a[d] && (this[d] = a[d])
            }
            this.options = a
        },
        _ensureElement: function () {
            if (this.el) this.setElement(this.el, false);
            else {
                var a = n(this, "attributes") || {};
                if (this.id) a.id = this.id;
                if (this.className) a["class"] = this.className;
                this.setElement(this.make(this.tagName, a), false)
            }
        }
    });
    o.extend = r.extend = u.extend = v.extend = function (a, b) {
        var c = F(this, a, b);
        c.extend = this.extend;
        return c
    };
    var G = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    g.sync = function (a, b, c) {
        var d = G[a];
        c || (c = {});
        var e = {
            type: d,
            dataType: "json"
        };
        if (!c.url) e.url = n(b, "url") || t();
        if (!c.data && b && (a == "create" || a == "update")) e.contentType = "application/json", e.data = JSON.stringify(b.toJSON());
        if (g.emulateJSON) e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {
            model: e.data
        } : {};
        if (g.emulateHTTP && (d === "PUT" || d === "DELETE")) {
            if (g.emulateJSON) e.data._method = d;
            e.type = "POST";
            e.beforeSend = function (a) {
                a.setRequestHeader("X-HTTP-Method-Override",
                d)
            }
        }
        if (e.type !== "GET" && !g.emulateJSON) e.processData = false;
        return i.ajax(f.extend(e, c))
    };
    g.wrapError = function (a, b, c) {
        return function (d, e) {
            e = d === b ? e : d;
            a ? a(b, e, c) : b.trigger("error", b, e, c)
        }
    };
    var x = function () {}, F = function (a, b, c) {
        var d;
        d = b && b.hasOwnProperty("constructor") ? b.constructor : function () {
            a.apply(this, arguments)
        };
        f.extend(d, a);
        x.prototype = a.prototype;
        d.prototype = new x;
        b && f.extend(d.prototype, b);
        c && f.extend(d, c);
        d.prototype.constructor = d;
        d.__super__ = a.prototype;
        return d
    }, n = function (a, b) {
        return !a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b]
    }, t = function () {
        throw Error('A "url" property or function must be specified');
    };
    return g
});