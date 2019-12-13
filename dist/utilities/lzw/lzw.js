var LZW = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * LZW Compression Algorithim
   * @url https://whatis.techtarget.com/definition/LZW-compression
   */
  var LZW = function LZW() {
    _classCallCheck(this, LZW);

    return this;
  };

  LZW.encode = function (s) {
    if (!s) { return s; }
    var dict = new Map();
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;

    for (var i = 1; i < data.length; i++) {
      currChar = data[i];

      if (dict.has(phrase + currChar)) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));
        dict.set(phrase + currChar, code);
        code++;
        phrase = currChar;
      }
    }

    out.push(phrase.length > 1 ? dict.get(phrase) : phrase.charCodeAt(0));

    for (var i = 0; i < out.length; i++) {
      out[i] = String.fromCharCode(out[i]);
    }

    return out.join("");
  };

  LZW.decode = function (s) {
    var dict = new Map(); // Use a Map!

    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;

    for (var i = 1; i < data.length; i++) {
      var currCode = data[i].charCodeAt(0);

      if (currCode < 256) {
        phrase = data[i];
      } else {
        phrase = dict.has(currCode) ? dict.get(currCode) : oldPhrase + currChar;
      }

      out.push(phrase);
      currChar = phrase.charAt(0);
      dict.set(code, oldPhrase + currChar);
      code++;
      oldPhrase = phrase;
    }

    return out.join("");
  };

  return LZW;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHp3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL2x6dy9sencuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMWlcgQ29tcHJlc3Npb24gQWxnb3JpdGhpbVxuICogQHVybCBodHRwczovL3doYXRpcy50ZWNodGFyZ2V0LmNvbS9kZWZpbml0aW9uL0xaVy1jb21wcmVzc2lvblxuICovXG5jbGFzcyBMWlcge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuTFpXLmVuY29kZSA9IGZ1bmN0aW9uKHMpIHtcbiAgaWYgKCFzKSByZXR1cm4gcztcbiAgdmFyIGRpY3QgPSBuZXcgTWFwKCk7XG4gIHZhciBkYXRhID0gKHMgKyBcIlwiKS5zcGxpdChcIlwiKTtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgY3VyckNoYXI7XG4gIHZhciBwaHJhc2UgPSBkYXRhWzBdO1xuICB2YXIgY29kZSA9IDI1NjtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN1cnJDaGFyID0gZGF0YVtpXTtcbiAgICAgIGlmIChkaWN0LmhhcyhwaHJhc2UgKyBjdXJyQ2hhcikpIHtcbiAgICAgICAgICBwaHJhc2UgKz0gY3VyckNoYXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dC5wdXNoKHBocmFzZS5sZW5ndGggPiAxID8gZGljdC5nZXQocGhyYXNlKSA6IHBocmFzZS5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgICBkaWN0LnNldChwaHJhc2UgKyBjdXJyQ2hhciwgY29kZSk7XG4gICAgICAgICAgY29kZSsrO1xuICAgICAgICAgIHBocmFzZSA9IGN1cnJDaGFyO1xuICAgICAgfVxuICB9XG5cbiAgb3V0LnB1c2gocGhyYXNlLmxlbmd0aCA+IDEgPyBkaWN0LmdldChwaHJhc2UpIDogcGhyYXNlLmNoYXJDb2RlQXQoMCkpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBvdXRbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG91dFtpXSk7XG4gIH1cblxuICByZXR1cm4gb3V0LmpvaW4oXCJcIik7XG59XG5cbkxaVy5kZWNvZGUgPSBmdW5jdGlvbihzKSB7XG4gIHZhciBkaWN0ID0gbmV3IE1hcCgpOyAvLyBVc2UgYSBNYXAhXG4gIHZhciBkYXRhID0gKHMgKyBcIlwiKS5zcGxpdChcIlwiKTtcbiAgdmFyIGN1cnJDaGFyID0gZGF0YVswXTtcbiAgdmFyIG9sZFBocmFzZSA9IGN1cnJDaGFyO1xuICB2YXIgb3V0ID0gW2N1cnJDaGFyXTtcbiAgdmFyIGNvZGUgPSAyNTY7XG4gIHZhciBwaHJhc2U7XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGN1cnJDb2RlID0gZGF0YVtpXS5jaGFyQ29kZUF0KDApO1xuXG4gICAgaWYgKGN1cnJDb2RlIDwgMjU2KSB7XG4gICAgICAgIHBocmFzZSA9IGRhdGFbaV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGhyYXNlID0gZGljdC5oYXMoY3VyckNvZGUpID8gZGljdC5nZXQoY3VyckNvZGUpIDogKG9sZFBocmFzZSArIGN1cnJDaGFyKTtcbiAgICB9XG5cbiAgICBvdXQucHVzaChwaHJhc2UpO1xuICAgIGN1cnJDaGFyID0gcGhyYXNlLmNoYXJBdCgwKTtcbiAgICBkaWN0LnNldChjb2RlLCBvbGRQaHJhc2UgKyBjdXJyQ2hhcik7XG4gICAgY29kZSsrO1xuICAgIG9sZFBocmFzZSA9IHBocmFzZTtcbiAgfVxuXG4gIHJldHVybiBvdXQuam9pbihcIlwiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTFpXOyJdLCJuYW1lcyI6WyJMWlciLCJlbmNvZGUiLCJzIiwiZGljdCIsIk1hcCIsImRhdGEiLCJzcGxpdCIsIm91dCIsImN1cnJDaGFyIiwicGhyYXNlIiwiY29kZSIsImkiLCJsZW5ndGgiLCJoYXMiLCJwdXNoIiwiZ2V0IiwiY2hhckNvZGVBdCIsInNldCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImpvaW4iLCJkZWNvZGUiLCJvbGRQaHJhc2UiLCJjdXJyQ29kZSIsImNoYXJBdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztNQUlNQSxNQUNKLGVBQWU7OztXQUNOLElBQVA7OztFQUlKQSxHQUFHLENBQUNDLE1BQUosR0FBYSxVQUFTQyxDQUFULEVBQVk7UUFDbkIsQ0FBQ0EsQ0FBTCxJQUFRLE9BQU9BLENBQVA7UUFDSkMsSUFBSSxHQUFHLElBQUlDLEdBQUosRUFBWDtRQUNJQyxJQUFJLEdBQUcsQ0FBQ0gsQ0FBQyxHQUFHLEVBQUwsRUFBU0ksS0FBVCxDQUFlLEVBQWYsQ0FBWDtRQUNJQyxHQUFHLEdBQUcsRUFBVjtRQUNJQyxRQUFKO1FBQ0lDLE1BQU0sR0FBR0osSUFBSSxDQUFDLENBQUQsQ0FBakI7UUFDSUssSUFBSSxHQUFHLEdBQVg7O1NBRUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR04sSUFBSSxDQUFDTyxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztNQUNsQ0gsUUFBUSxHQUFHSCxJQUFJLENBQUNNLENBQUQsQ0FBZjs7VUFDSVIsSUFBSSxDQUFDVSxHQUFMLENBQVNKLE1BQU0sR0FBR0QsUUFBbEIsQ0FBSixFQUFpQztRQUM3QkMsTUFBTSxJQUFJRCxRQUFWO09BREosTUFFTztRQUNIRCxHQUFHLENBQUNPLElBQUosQ0FBU0wsTUFBTSxDQUFDRyxNQUFQLEdBQWdCLENBQWhCLEdBQW9CVCxJQUFJLENBQUNZLEdBQUwsQ0FBU04sTUFBVCxDQUFwQixHQUF1Q0EsTUFBTSxDQUFDTyxVQUFQLENBQWtCLENBQWxCLENBQWhEO1FBQ0FiLElBQUksQ0FBQ2MsR0FBTCxDQUFTUixNQUFNLEdBQUdELFFBQWxCLEVBQTRCRSxJQUE1QjtRQUNBQSxJQUFJO1FBQ0pELE1BQU0sR0FBR0QsUUFBVDs7OztJQUlSRCxHQUFHLENBQUNPLElBQUosQ0FBU0wsTUFBTSxDQUFDRyxNQUFQLEdBQWdCLENBQWhCLEdBQW9CVCxJQUFJLENBQUNZLEdBQUwsQ0FBU04sTUFBVCxDQUFwQixHQUF1Q0EsTUFBTSxDQUFDTyxVQUFQLENBQWtCLENBQWxCLENBQWhEOztTQUVLLElBQUlMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7TUFDakNKLEdBQUcsQ0FBQ0ksQ0FBRCxDQUFILEdBQVNPLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQlosR0FBRyxDQUFDSSxDQUFELENBQXZCLENBQVQ7OztXQUdHSixHQUFHLENBQUNhLElBQUosQ0FBUyxFQUFULENBQVA7R0EzQkY7O0VBOEJBcEIsR0FBRyxDQUFDcUIsTUFBSixHQUFhLFVBQVNuQixDQUFULEVBQVk7UUFDbkJDLElBQUksR0FBRyxJQUFJQyxHQUFKLEVBQVgsQ0FEdUI7O1FBRW5CQyxJQUFJLEdBQUcsQ0FBQ0gsQ0FBQyxHQUFHLEVBQUwsRUFBU0ksS0FBVCxDQUFlLEVBQWYsQ0FBWDtRQUNJRSxRQUFRLEdBQUdILElBQUksQ0FBQyxDQUFELENBQW5CO1FBQ0lpQixTQUFTLEdBQUdkLFFBQWhCO1FBQ0lELEdBQUcsR0FBRyxDQUFDQyxRQUFELENBQVY7UUFDSUUsSUFBSSxHQUFHLEdBQVg7UUFDSUQsTUFBSjs7U0FFSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTixJQUFJLENBQUNPLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO1VBQ2hDWSxRQUFRLEdBQUdsQixJQUFJLENBQUNNLENBQUQsQ0FBSixDQUFRSyxVQUFSLENBQW1CLENBQW5CLENBQWY7O1VBRUlPLFFBQVEsR0FBRyxHQUFmLEVBQW9CO1FBQ2hCZCxNQUFNLEdBQUdKLElBQUksQ0FBQ00sQ0FBRCxDQUFiO09BREosTUFFTztRQUNIRixNQUFNLEdBQUdOLElBQUksQ0FBQ1UsR0FBTCxDQUFTVSxRQUFULElBQXFCcEIsSUFBSSxDQUFDWSxHQUFMLENBQVNRLFFBQVQsQ0FBckIsR0FBMkNELFNBQVMsR0FBR2QsUUFBaEU7OztNQUdKRCxHQUFHLENBQUNPLElBQUosQ0FBU0wsTUFBVDtNQUNBRCxRQUFRLEdBQUdDLE1BQU0sQ0FBQ2UsTUFBUCxDQUFjLENBQWQsQ0FBWDtNQUNBckIsSUFBSSxDQUFDYyxHQUFMLENBQVNQLElBQVQsRUFBZVksU0FBUyxHQUFHZCxRQUEzQjtNQUNBRSxJQUFJO01BQ0pZLFNBQVMsR0FBR2IsTUFBWjs7O1dBR0tGLEdBQUcsQ0FBQ2EsSUFBSixDQUFTLEVBQVQsQ0FBUDtHQXpCRjs7Ozs7Ozs7In0=