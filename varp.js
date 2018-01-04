/***** FrameWork: VarP
****** Author: Pasquale De Lucia
*****/

/* RETURN A COPY OF PARAM */
function DeepCopy(obj) {
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
function GenerateTemplate(html, id) {
  var template = document.createElement('script');
  template.type = "text/template";
  template.id = id;
  template.innerHTML = html;
  document.head.appendChild(template);
}

function GetCardType(number) {
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
