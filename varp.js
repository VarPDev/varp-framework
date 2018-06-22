/***** FrameWork: VarP
 ****** Author: Pasquale De Lucia
 *****/

/* RETURN A COPY OF PARAM */
function deepCopy(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

/* CREATE A TEMPLATE IN HEAD IN A SCRIPT TAG, PARAMS ARE HTML TEMPLATE AND ID OF TEMPLATE */
function generateTemplate(html, id) {
  var template = document.createElement('script');
  template.type = "text/template";
  template.id = id;
  template.innerHTML = html;
  document.head.appendChild(template);
}

function getCardType(number) {
  // Visa
  var re = new RegExp("^4");
  if (number.match(re) != null)
    return "visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  var re = new RegExp("^(5[1-5]");
  if (number.match(re) != null)
    return "mastercard";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null)
    return "visae";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null)
    return "amex";

  return false;
}

function searchInArray(search, array) {
  var results = [];
  if (!search || search != '') {
    search = trimString(search);
    for (var i = 0; i < array.length; i++) {
      for (var key in array[i]) {
        if (typeof array[i][key] === 'string' || array[i][key] instanceof String) {
          if (array[i][key].toUpperCase().indexOf(search.toUpperCase()) != -1) {
            if (!itemExists(results, array[i])) results.push(array[i]);
          }
        }
      }
    }
    return results;
  } else {
    return array;
  }
}

function trimString(s) {
  var l = 0,
    r = s.length - 1;
  while (l < s.length && s[l] == ' ') l++;
  while (r > l && s[r] == ' ') r -= 1;
  return s.substring(l, r + 1);
}

function itemExists(haystack, needle) {
  for (var i = 0; i < haystack.length; i++)
    if (compareObjects(haystack[i], needle)) return true;
  return false;
}

function compareObjects(o1, o2) {
  var k = '';
  for (k in o1)
    if (o1[k] != o2[k]) return false;
  for (k in o2)
    if (o1[k] != o2[k]) return false;
  return true;
}

function checkBrowser() {
  navigator.sayswho = (function() {
    var ua = navigator.userAgent,
      tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

  return navigator.sayswho;
}

function getAbsoluteUrl(url) {
  var a;

  if (!a) a = document.createElement('a');
  a.href = url;

  return a.href;
}