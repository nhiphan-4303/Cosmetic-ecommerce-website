!(function () {
  "use strict";
  function t() {
    const t = `${n}?t=e&message=${encodeURI("failed to load")}&v=${e}`,
      a = new Image(1, 1);
    return (a.src = t), a;
  }
  const n = "https://events.attentivemobile.com/e",
    e = "4-latest_ab9a7d39ea",
    a =
      "eyJjb21wYW55Ijoic3Vsd2hhc29vIiwiY2VpZCI6IlVBTSIsImFwIjp7InRyZyI6W3sicHQiOiJzcHAiLCJpZCI6InQwIiwicHQiOiJzcHAiLCJwbCI6eyJlbnIiOlsic2hwIiwibHRjIiwiamxkIiwibWV0Il0sInRybiI6WyJkcyJdfSwibXQiOlsiQWRkIHRvIGNhcnQiLCJBZGQgdG8gQmFnIiwiQnV5IE5vdyIsIkFkZCIsIiNhZGRUb0NhcnQiLCIjYWRkLXRvLWNhcnQiLCIjQWRkVG9DYXJ0IiwiT3JkZXIgTm93IiwiQnV5IGl0IG5vdyIsIi5wcm9kdWN0X19hZGQtdG8tY2FydCIsIltuYW1lPVwiYWRkXCJdIiwiW2RhdGEtbGFiZWw9XCJBZGQgdG8gQ2FydFwiXSIsIltkYXRhLWFkZC10by1jYXJ0XSIsIiNhZGRUb0NhcnRCdG4iLCJbdmFsdWU9XCJBZGQgdG8gQmFnXCJdIiwiW3ZhbHVlPVwiQWRkIHRvIENhcnRcIl0iLCJbdmFsdWU9XCJBZGQgdG8gT3JkZXJcIl0iXSwiZWF0YyI6ZmFsc2UsImVzaXQiOnRydWV9LHsicHQiOiJ0MCIsImlkIjoidDEiLCJjbmQiOlt7InR5cGUiOiJ3cyIsInR5cGUiOiJ3cyIsIndzIjoiY2FydF9qc29uIn1dLCJwdCI6InQwIiwibXUiOiIvcHVyY2hhc2UvdGhhbmtzIiwibXQiOltdLCJ0bXMiOjAsInQiOiJwIiwicGwiOnsiZW5yIjpbInJlYyIsImx0YyJdLCJ0cm4iOlsicmUiLCJkcyJdfX0seyJwdCI6InQwIiwiaWQiOiJ0MiIsImNuZCI6W3sidHlwZSI6IndzIiwidHlwZSI6IndzIiwid3MiOiJjaERhdGEub3JkZXIifV0sInB0IjoidDAiLCJtdSI6Ii9zZWN1cmUvdGhhbmsteW91IiwibXQiOltdLCJ0bXMiOjAsInQiOiJwIiwicGwiOnsiZW5yIjpbImNhciIsImx0YyJdLCJ0cm4iOlsiY2giLCJkcyJdfX1dLCJlbnIiOnsiY2FyIjp7InB0Ijoid3NwIiwicHQiOiJ3c3AiLCJtcCI6eyJlbWFpbCI6ImNoRGF0YS5vcmRlci5jdXN0b21lci5lbWFpbCIsIml0ZW1zIjoiY2hEYXRhLm9yZGVyLmxpbmVfaXRlbXMiLCJwaG9uZSI6ImNoRGF0YS5vcmRlci5iaWxsaW5nX2FkZHJlc3MucGhvbmUiLCJvcmRlcklkIjoiY2hEYXRhLm9yZGVyLm9yZGVyX251bWJlciIsImNhcnRUb3RhbCI6ImNoRGF0YS5vcmRlci5zdWJ0b3RhbF9wcmljZSJ9fSwiamxkIjp7InB0IjoiamxkIiwicHQiOiJqbGQiLCJtcCI6eyJza3UiOiJza3UiLCJuYW1lIjoibmFtZSIsImltYWdlIjoiaW1hZ2UifX0sImx0YyI6eyJwdCI6Imx0YyIsInB0IjoibHRjIn0sIm1ldCI6eyJwdCI6Im1ldCIsInB0IjoibWV0IiwibXAiOnsibmFtZSI6Im9nOnRpdGxlIiwiaW1hZ2UiOiJvZzppbWFnZSIsInByaWNlIjoib2c6cHJpY2U6YW1vdW50IiwiY3VycmVuY3kiOiJvZzpwcmljZTpjdXJyZW5jeSJ9fSwicmVjIjp7InB0Ijoid3NwIiwicHQiOiJ3c3AiLCJtcCI6eyJlbWFpbCI6ImNhcnRfanNvbi5lbWFpbCIsIml0ZW1zIjoiY2FydF9qc29uLmxpbmVfaXRlbXMiLCJwaG9uZSI6ImNhcnRfanNvbi5waG9uZSIsIm9yZGVySWQiOiJjYXJ0X2pzb24uY2hhcmdlX2lkIiwiY2FydFRvdGFsIjoiY2FydF9qc29uLnN1YnRvdGFsX3ByaWNlIn19LCJzaHAiOnsicHQiOiJzaHAiLCJwdCI6InNocCIsInZpZGMiOlt7Im1wIjp7InN1YlByb2R1Y3RJZCI6eyJzIjoiW25hbWU9aWRdIiwicHJvcCI6InZhbHVlIn19LCJwdCI6ImRzcCIsImNzayI6Iml0ZW1zIn0seyJtcCI6eyJzdWJQcm9kdWN0SWQiOlt7InB0Ijoid3NwIiwid3MiOiJTaG9waWZ5QW5hbHl0aWNzLm1ldGEuc2VsZWN0ZWRWYXJpYW50SWQifV19LCJwdCI6ImNtcHMifSx7Im1wIjp7InN1YlByb2R1Y3RJZCI6W3sicHQiOiJxcHNwIiwicXAiOiJ2YXJpYW50In1dfSwicHQiOiJjbXBzIn1dfSwiaW50bCI6eyJwdCI6ImNtcHMiLCJwdCI6ImNtcHMiLCJtcCI6eyJjdXJyZW5jeSI6W3sicHQiOiJ3c3AiLCJwdCI6IndzcCIsIndzIjoiU2hvcGlmeS5jaGVja291dC5wcmVzZW50bWVudF9jdXJyZW5jeSJ9LHsicHQiOiJ3c3AiLCJwdCI6IndzcCIsIndzIjoiU2hvcGlmeS5DaGVja291dC5jdXJyZW5jeSJ9XSwiY2FydEN1cnJlbmN5IjpbeyJwdCI6IndzcCIsInB0Ijoid3NwIiwid3MiOiJTaG9waWZ5LmNoZWNrb3V0LnByZXNlbnRtZW50X2N1cnJlbmN5In0seyJwdCI6IndzcCIsInB0Ijoid3NwIiwid3MiOiJTaG9waWZ5LkNoZWNrb3V0LmN1cnJlbmN5In1dfX19LCJ0cm4iOnsiY2giOnsicHQiOiJtdiIsInB0IjoibXYiLCJwdGgiOlsiY2FyLml0ZW1zIl0sIm1wIjp7ImlkIjoic2t1IiwidGl0bGUiOiJuYW1lIiwidmFyaWFudF9pZCI6InN1YlByb2R1Y3RJZCJ9fSwiZHMiOnsicHQiOiJkcyIsInB0IjoiZHMiLCJtcCI6eyJza3UiOlsicmVjIiwiY2FyIiwic2hwIiwiKiIsImpsZCJdLCJuYW1lIjpbInJlYyIsImNhciIsIioiLCJzaHAiLCJtZXQiLCJqbGQiXSwiZW1haWwiOlsicmVjIiwiY2FyIiwiKiIsImx0YyJdLCJpbWFnZSI6WyJyZWMiLCJjYXIiLCIqIiwic2hwIiwibWV0Il0sInBob25lIjpbInJlYyIsImNhciIsInNocCIsImx0YyJdLCJwcmljZSI6WyJyZWMiLCJjYXIiLCJzaHAiLCIqIiwibWV0Il0sIm9yZGVySWQiOlsicmVjIiwiY2FyIiwiKiIsInNocCJdLCJjYXRlZ29yeSI6WyIqIiwic2hwIl0sImN1cnJlbmN5IjpbImludGwiLCIqIiwic2hwIiwibWV0Il0sInF1YW50aXR5IjpbInJlYyIsImNhciIsIioiLCJzaHAiXSwiY2FydFRvdGFsIjpbInJlYyIsImNhciIsIioiLCJzaHAiXSwicHJvZHVjdElkIjpbInJlYyIsImNhciIsInNocCIsIioiLCJqbGQiXSwiY2FydENvdXBvbiI6WyIqIiwic2hwIiwibHRjIl0sImNhcnRDdXJyZW5jeSI6WyJpbnRsIiwiKiIsInNocCIsIm1ldCJdLCJjYXJ0RGlzY291bnQiOlsiKiIsInNocCJdLCJzdWJQcm9kdWN0SWQiOlsicmVjIiwiY2FyIiwic2hwIiwiKiJdfX0sInJlIjp7InB0IjoibXYiLCJwdCI6Im12IiwicHRoIjpbInJlYy5pdGVtcyJdLCJtcCI6eyJza3UiOiJwcm9kdWN0SWQiLCJ0aXRsZSI6Im5hbWUiLCJwcm9kdWN0X2lkIjoic2t1IiwidmFyaWFudF9pZCI6InN1YlByb2R1Y3RJZCJ9fX19LCJjYyI6eyJpdCI6dHJ1ZX19",
    o = "sulwhasoo.attn.tv",
    i = "https://cdn.attn.tv/tag",
    d = "4-latest";
  let c = {};
  try {
    c = JSON.parse(atob(a));
  } catch {
    t();
  }
  function r(t, n, e) {
    const a = document.createElement("script");
    return (
      a.setAttribute("async", "true"),
      (a.type = "text/javascript"),
      n && (a.onload = n),
      e && (a.onerror = e),
      (a.src = t),
      (
        (document.getElementsByTagName("head") || [null])[0] ||
        document.getElementsByTagName("script")[0].parentNode
      ).appendChild(a),
      a
    );
  }
  function s(t) {
    return `${i}/${d}/${t}?v=${e}`;
  }
  function _() {
    var t;
    try {
      return !1 !== (null == (t = null == c ? void 0 : c.cc) ? void 0 : t.it);
    } catch {
      return !1;
    }
  }
  function u(n = () => {}) {
    const e = s(
      `${_() ? "unified-" : ""}${
        window.navigator.userAgent.indexOf("MSIE ") > 0 ||
        navigator.userAgent.match(/Trident.*rv:11\./)
          ? "tag-ie.js"
          : "tag.js"
      }`
    );
    (window.attn_d0x0b_cfg = a), r(e, n, t);
  }
  !(function (n, a) {
    function i(t) {
      return function () {
        n.attn_d0x0b_evt.push({ func: t, args: arguments });
      };
    }
    function w() {
      var o;
      n.__attentive_cfg = JSON.parse(
        '{"ceid":"UAM","pp":"META","os":"ALL","mov":"3.07.05","lt":"0","ap":"META"}'
      );
      _() || r("https://cdn.attn.tv/attn.js?v=" + e),
        (null == (o = null == c ? void 0 : c.cc) ? void 0 : o.dap) ||
          (function () {
            if (window.__poll_for_path_change) return;
            let t = window.location.pathname;
            const n = () => {
              window.__attentive &&
                window.__attentive.show &&
                window.__attentive.show();
            };
            (window.__poll_for_path_change = !0),
              setInterval(function () {
                if (t !== window.location.pathname) {
                  const e = document.querySelector("#attentive_overlay");
                  null != e && e.parentNode && e.parentNode.removeChild(e),
                    (t = window.location.pathname),
                    n();
                }
              }, 500),
              n();
          })(),
        (function () {
          try {
            if (window.location.hash.indexOf("attn") > -1) {
              const t = window.location.hash.slice(5);
              sessionStorage.setItem("_d0x0b_", t);
            }
            const t = sessionStorage.getItem("_d0x0b_");
            return !!t && ((window.attn_d0x0b_cfg = t), !0);
          } catch (t) {
            return !1;
          }
        })()
          ? (function (n = () => {}) {
              r(s("tag-debug.js"), n, t);
            })()
          : u(),
        a.removeEventListener("DOMContentLoaded", w);
    }
    n.__attnLoaded ||
      ((n.__attnLoaded = !0),
      (n.attn_d0x0b_evt = n.attn_d0x0b_evt || []),
      (n.attentive = {
        version: d,
        analytics: {
          enable: i("enable"),
          disable: i("disable"),
          track: i("track"),
          pageView: i("pageView"),
          addToCart: i("addToCart"),
          productView: i("productView"),
          purchase: i("purchase"),
        },
      }),
      (window.__attentive_domain = o),
      window.__attentive ||
        (window.__attentive = {
          invoked: !1,
          show: function () {
            window.__attentive.invoked = !0;
          },
        }),
      "loading" === a.readyState
        ? a.addEventListener("DOMContentLoaded", w)
        : w());
  })(window, document);
})();
