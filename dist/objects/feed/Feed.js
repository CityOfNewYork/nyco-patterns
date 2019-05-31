var Feed = (function () {
  'use strict';

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */

  var Symbol = root.Symbol;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */

  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */

  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  var defineProperty = function () {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }();

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  /** Used for built-in method references. */

  var objectProto$3 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function assignValue(object, key, value) {
    var objValue = object[key];

    if (!(hasOwnProperty$2.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */

  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }

      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }

    return object;
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);

      case 1:
        return func.call(thisArg, args[0]);

      case 2:
        return func.call(thisArg, args[0], args[1]);

      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }

    return func.apply(thisArg, args);
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max;
  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */

  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }

      index = -1;
      var otherArgs = Array(start + 1);

      while (++index < start) {
        otherArgs[index] = args[index];
      }

      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function () {
      return value;
    };
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var baseSetToString = !defineProperty ? identity : function (func, string) {
    return defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeNow = Date.now;
  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */

  function shortOut(func) {
    var count = 0,
        lastCalled = 0;
    return function () {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;

      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }

      return func.apply(undefined, arguments);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var setToString = shortOut(baseSetToString);

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */

  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */

  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  /** Used to detect unsigned integer values. */

  var reIsUint = /^(?:0|[1-9]\d*)$/;
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */

  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */

  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }

    var type = typeof index;

    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
      return eq(object[index], value);
    }

    return false;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */

  function createAssigner(assigner) {
    return baseRest(function (object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;
      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }

      object = Object(object);

      while (++index < length) {
        var source = sources[index];

        if (source) {
          assigner(object, source, index, customizer);
        }
      }

      return object;
    });
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */

  var argsTag = '[object Arguments]';
  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */

  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  /** Built-in value references. */

  var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */

  var isArguments = baseIsArguments(function () {
    return arguments;
  }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty$3.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */

  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Built-in value references. */

  var Buffer = moduleExports ? root.Buffer : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */

  var isBuffer = nativeIsBuffer || stubFalse;

  /** `Object#toString` result references. */

  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */

  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */

  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  /** Detect free variable `process` from Node.js. */

  var freeProcess = moduleExports$1 && freeGlobal.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil = function () {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

      if (types) {
        return types;
      } // Legacy `process.binding('util')` for Node.js < 10.


      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  /* Node.js helper references. */

  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */

  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /** Used for built-in method references. */

  var objectProto$5 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */

  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
      key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;
  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */

  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;
    return value === proto;
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];

    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }

    return result;
  }

  /** Used for built-in method references. */

  var objectProto$7 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }

    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
        result.push(key);
      }
    }

    return result;
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */

  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * This method is like `_.assignIn` except that it accepts `customizer`
   * which is invoked to produce the assigned values. If `customizer` returns
   * `undefined`, assignment is handled by the method instead. The `customizer`
   * is invoked with five arguments: (objValue, srcValue, key, object, source).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extendWith
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @see _.assignWith
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   return _.isUndefined(objValue) ? srcValue : objValue;
   * }
   *
   * var defaults = _.partialRight(_.assignInWith, customizer);
   *
   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */

  var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object, customizer);
  });

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  /** Built-in value references. */

  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /** `Object#toString` result references. */

  var objectTag$1 = '[object Object]';
  /** Used for built-in method references. */

  var funcProto$2 = Function.prototype,
      objectProto$8 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$2 = funcProto$2.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
  /** Used to infer the `Object` constructor. */

  var objectCtorString = funcToString$2.call(Object);
  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */

  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
      return false;
    }

    var proto = getPrototype(value);

    if (proto === null) {
      return true;
    }

    var Ctor = hasOwnProperty$6.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
  }

  /** `Object#toString` result references. */

  var domExcTag = '[object DOMException]',
      errorTag$1 = '[object Error]';
  /**
   * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
   * `SyntaxError`, `TypeError`, or `URIError` object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
   * @example
   *
   * _.isError(new Error);
   * // => true
   *
   * _.isError(Error);
   * // => false
   */

  function isError(value) {
    if (!isObjectLike(value)) {
      return false;
    }

    var tag = baseGetTag(value);
    return tag == errorTag$1 || tag == domExcTag || typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value);
  }

  /**
   * Attempts to invoke `func`, returning either the result or the caught error
   * object. Any additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Util
   * @param {Function} func The function to attempt.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {*} Returns the `func` result or error object.
   * @example
   *
   * // Avoid throwing errors for invalid selectors.
   * var elements = _.attempt(function(selector) {
   *   return document.querySelectorAll(selector);
   * }, '>_>');
   *
   * if (_.isError(elements)) {
   *   elements = [];
   * }
   */

  var attempt = baseRest(function (func, args) {
    try {
      return apply(func, undefined, args);
    } catch (e) {
      return isError(e) ? e : new Error(e);
    }
  });

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */

  function baseValues(object, props) {
    return arrayMap(props, function (key) {
      return object[key];
    });
  }

  /** Used for built-in method references. */

  var objectProto$9 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  /**
   * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
   * of source objects to the destination object for all destination properties
   * that resolve to `undefined`.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to assign.
   * @param {Object} object The parent object of `objValue`.
   * @returns {*} Returns the value to assign.
   */

  function customDefaultsAssignIn(objValue, srcValue, key, object) {
    if (objValue === undefined || eq(objValue, objectProto$9[key]) && !hasOwnProperty$7.call(object, key)) {
      return srcValue;
    }

    return objValue;
  }

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };
  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */

  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeKeys = overArg(Object.keys, Object);

  /** Used for built-in method references. */

  var objectProto$a = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }

    var result = [];

    for (var key in Object(object)) {
      if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }

    return result;
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */

  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /** Used to match template delimiters. */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function (key) {
      return object == null ? undefined : object[key];
    };
  }

  /** Used to map characters to HTML entities. */

  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */

  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */

  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }

  /** Used as references for various `Number` constants. */

  var INFINITY = 1 / 0;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */

  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    if (isArray(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }

    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */

  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  /** Used to match HTML entities and HTML characters. */

  var reUnescapedHtml = /[&<>"']/g,
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
  /**
   * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
   * corresponding HTML entities.
   *
   * **Note:** No other characters are escaped. To escape additional
   * characters use a third-party library like [_he_](https://mths.be/he).
   *
   * Though the ">" character is escaped for symmetry, characters like
   * ">" and "/" don't need escaping in HTML and have no special meaning
   * unless they're part of a tag or unquoted attribute value. See
   * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
   * (under "semi-related fun fact") for more details.
   *
   * When working with HTML you should always
   * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
   * XSS vectors.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escape('fred, barney, & pebbles');
   * // => 'fred, barney, &amp; pebbles'
   */

  function escape(string) {
    string = toString(string);
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
  }

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g;

  /** Used to match template delimiters. */
  var reEvaluate = /<%([\s\S]+?)%>/g;

  /**
   * By default, the template delimiters used by lodash are like those in
   * embedded Ruby (ERB) as well as ES2015 template strings. Change the
   * following template settings to use alternative delimiters.
   *
   * @static
   * @memberOf _
   * @type {Object}
   */

  var templateSettings = {
    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @memberOf _.templateSettings
     * @type {RegExp}
     */
    'escape': reEscape,

    /**
     * Used to detect code to be evaluated.
     *
     * @memberOf _.templateSettings
     * @type {RegExp}
     */
    'evaluate': reEvaluate,

    /**
     * Used to detect `data` property values to inject.
     *
     * @memberOf _.templateSettings
     * @type {RegExp}
     */
    'interpolate': reInterpolate,

    /**
     * Used to reference the data object in the template text.
     *
     * @memberOf _.templateSettings
     * @type {string}
     */
    'variable': '',

    /**
     * Used to import variables into the compiled template.
     *
     * @memberOf _.templateSettings
     * @type {Object}
     */
    'imports': {
      /**
       * A reference to the `lodash` function.
       *
       * @memberOf _.templateSettings.imports
       * @type {Function}
       */
      '_': {
        'escape': escape
      }
    }
  };

  /** Used to match empty string literals in compiled template source. */

  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */

  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
  /** Used to ensure capturing order of template delimiters. */

  var reNoMatch = /($^)/;
  /** Used to match unescaped characters in compiled string literals. */

  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
  /**
   * Creates a compiled template function that can interpolate data properties
   * in "interpolate" delimiters, HTML-escape interpolated data properties in
   * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
   * properties may be accessed as free variables in the template. If a setting
   * object is given, it takes precedence over `_.templateSettings` values.
   *
   * **Note:** In the development build `_.template` utilizes
   * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
   * for easier debugging.
   *
   * For more information on precompiling templates see
   * [lodash's custom builds documentation](https://lodash.com/custom-builds).
   *
   * For more information on Chrome extension sandboxes see
   * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category String
   * @param {string} [string=''] The template string.
   * @param {Object} [options={}] The options object.
   * @param {RegExp} [options.escape=_.templateSettings.escape]
   *  The HTML "escape" delimiter.
   * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
   *  The "evaluate" delimiter.
   * @param {Object} [options.imports=_.templateSettings.imports]
   *  An object to import into the template as free variables.
   * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
   *  The "interpolate" delimiter.
   * @param {string} [options.sourceURL='templateSources[n]']
   *  The sourceURL of the compiled template.
   * @param {string} [options.variable='obj']
   *  The data object variable name.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the compiled template function.
   * @example
   *
   * // Use the "interpolate" delimiter to create a compiled template.
   * var compiled = _.template('hello <%= user %>!');
   * compiled({ 'user': 'fred' });
   * // => 'hello fred!'
   *
   * // Use the HTML "escape" delimiter to escape data property values.
   * var compiled = _.template('<b><%- value %></b>');
   * compiled({ 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
   * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
   * compiled({ 'users': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // Use the internal `print` function in "evaluate" delimiters.
   * var compiled = _.template('<% print("hello " + user); %>!');
   * compiled({ 'user': 'barney' });
   * // => 'hello barney!'
   *
   * // Use the ES template literal delimiter as an "interpolate" delimiter.
   * // Disable support by replacing the "interpolate" delimiter.
   * var compiled = _.template('hello ${ user }!');
   * compiled({ 'user': 'pebbles' });
   * // => 'hello pebbles!'
   *
   * // Use backslashes to treat delimiters as plain text.
   * var compiled = _.template('<%= "\\<%- value %\\>" %>');
   * compiled({ 'value': 'ignored' });
   * // => '<%- value %>'
   *
   * // Use the `imports` option to import `jQuery` as `jq`.
   * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
   * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
   * compiled({ 'users': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // Use the `sourceURL` option to specify a custom sourceURL for the template.
   * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
   * compiled(data);
   * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
   *
   * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
   * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   * //   var __t, __p = '';
   * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
   * //   return __p;
   * // }
   *
   * // Use custom template delimiters.
   * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
   * var compiled = _.template('hello {{ user }}!');
   * compiled({ 'user': 'mustache' });
   * // => 'hello mustache!'
   *
   * // Use the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and stack traces.
   * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */

  function template(string, options, guard) {
    // Based on John Resig's `tmpl` implementation
    // (http://ejohn.org/blog/javascript-micro-templating/)
    // and Laura Doktorova's doT.js (https://github.com/olado/doT).
    var settings = templateSettings.imports._.templateSettings || templateSettings;

    if (guard && isIterateeCall(string, options, guard)) {
      options = undefined;
    }

    string = toString(string);
    options = assignInWith({}, options, settings, customDefaultsAssignIn);
    var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
        importsKeys = keys(imports),
        importsValues = baseValues(imports, importsKeys);
    var isEscaping,
        isEvaluating,
        index = 0,
        interpolate = options.interpolate || reNoMatch,
        source = "__p += '"; // Compile the regexp to match each delimiter.

    var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g'); // Use a sourceURL for easier debugging.

    var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';
    string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
      interpolateValue || (interpolateValue = esTemplateValue); // Escape characters that can't be included in string literals.

      source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar); // Replace delimiters with snippets.

      if (escapeValue) {
        isEscaping = true;
        source += "' +\n__e(" + escapeValue + ") +\n'";
      }

      if (evaluateValue) {
        isEvaluating = true;
        source += "';\n" + evaluateValue + ";\n__p += '";
      }

      if (interpolateValue) {
        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }

      index = offset + match.length; // The JS engine embedded in Adobe products needs `match` returned in
      // order to produce the correct `offset` value.

      return match;
    });
    source += "';\n"; // If `variable` is not specified wrap a with-statement around the generated
    // code to add the data object to the top of the scope chain.

    var variable = options.variable;

    if (!variable) {
      source = 'with (obj) {\n' + source + '\n}\n';
    } // Cleanup code by stripping empty strings.


    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;'); // Frame code as the function body.

    source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
    var result = attempt(function () {
      return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
    }); // Provide the compiled function's source by its `toString` method or
    // the `source` property as a convenience for inlining compiled templates.

    result.source = source;

    if (isError(result)) {
      throw result;
    }

    return result;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }

    return array;
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];

        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }

      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */

  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */

  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */

  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }

      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }

      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }

      return collection;
    };
  }

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */

  var baseEach = createBaseEach(baseForOwn);

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */

  function castFunction(value) {
    return typeof value == 'function' ? value : identity;
  }

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */

  function forEach(collection, iteratee) {
    var func = isArray(collection) ? arrayEach : baseEach;
    return func(collection, castFunction(iteratee));
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  /** Used for built-in method references. */

  var arrayProto = Array.prototype;
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */

  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);
    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /* Built-in method references that are verified to be native. */

  var Map = getNative(root, 'Map');

  /* Built-in method references that are verified to be native. */

  var nativeCreate = getNative(Object, 'create');

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$b = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet(key) {
    var data = this.__data__;

    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$9.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */

  var objectProto$c = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$a = objectProto$c.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$a.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */

  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash(),
      'map': new (Map || ListCache)(),
      'string': new Hash()
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */

  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE = 200;
  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */

  function stackSet(key, value) {
    var data = this.__data__;

    if (data instanceof ListCache) {
      var pairs = data.__data__;

      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }

      data = this.__data__ = new MapCache(pairs);
    }

    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  } // Add methods to `Stack`.


  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function assignMergeValue(object, key, value) {
    if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }

  /** Detect free variable `exports`. */

  var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  /** Built-in value references. */

  var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
      allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;
  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */

  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }

    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }

  /** Built-in value references. */

  var Uint8Array = root.Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */

  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */

  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));

    while (++index < length) {
      array[index] = source[index];
    }

    return array;
  }

  /** Built-in value references. */

  var objectCreate = Object.create;
  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */

  var baseCreate = function () {
    function object() {}

    return function (proto) {
      if (!isObject(proto)) {
        return {};
      }

      if (objectCreate) {
        return objectCreate(proto);
      }

      object.prototype = proto;
      var result = new object();
      object.prototype = undefined;
      return result;
    };
  }();

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */

  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */

  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Gets the value at `key`, unless `key` is "__proto__".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */

  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */

  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }

    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray(srcValue),
          isBuff = !isArr && isBuffer(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray(srcValue);
      newValue = srcValue;

      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;

        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }

    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }

    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */

  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }

    baseFor(source, function (srcValue, key) {
      if (isObject(srcValue)) {
        stack || (stack = new Stack());
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }

        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */

  var merge = createAssigner(function (object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */

  function values(object) {
    return object == null ? [] : baseValues(object, keys(object));
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */

  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);

    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */

  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();

    while (++index < length) {
      this.add(values[index]);
    }
  } // Add methods to `SetCache`.


  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;
  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */

  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    } // Assume cyclic values are equal.


    var stacked = stack.get(array);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var index = -1,
        result = true,
        seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
    stack.set(array, other);
    stack.set(other, array); // Ignore non-index properties.

    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }

      if (compared !== undefined) {
        if (compared) {
          continue;
        }

        result = false;
        break;
      } // Recursively compare arrays (susceptible to call stack limits).


      if (seen) {
        if (!arraySome(other, function (othValue, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }

    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;
  /** `Object#toString` result references. */

  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$2 = '[object Error]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';
  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]';
  /** Used to convert symbols to primitives and strings. */

  var symbolProto$1 = Symbol ? Symbol.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }

        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag$1:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }

        return true;

      case boolTag$1:
      case dateTag$1:
      case numberTag$1:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag$2:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

      case mapTag$1:
        var convert = mapToArray;

      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        } // Assume cyclic values are equal.


        var stacked = stack.get(object);

        if (stacked) {
          return stacked == other;
        }

        bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }

    }

    return false;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }

    return result;
  }

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  /** Used for built-in method references. */

  var objectProto$d = Object.prototype;
  /** Built-in value references. */

  var propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeGetSymbols = Object.getOwnPropertySymbols;
  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */

  var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
    if (object == null) {
      return [];
    }

    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function (symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$2 = 1;
  /** Used for built-in method references. */

  var objectProto$e = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$b = objectProto$e.hasOwnProperty;
  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
        objProps = getAllKeys(object),
        objLength = objProps.length,
        othProps = getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }

    var index = objLength;

    while (index--) {
      var key = objProps[index];

      if (!(isPartial ? key in other : hasOwnProperty$b.call(other, key))) {
        return false;
      }
    } // Assume cyclic values are equal.


    var stacked = stack.get(object);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;

    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      } // Recursively compare objects (susceptible to call stack limits).


      if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }

      skipCtor || (skipCtor = key == 'constructor');
    }

    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }

    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  /* Built-in method references that are verified to be native. */

  var DataView = getNative(root, 'DataView');

  /* Built-in method references that are verified to be native. */

  var Promise$1 = getNative(root, 'Promise');

  /* Built-in method references that are verified to be native. */

  var Set = getNative(root, 'Set');

  /* Built-in method references that are verified to be native. */

  var WeakMap = getNative(root, 'WeakMap');

  /** `Object#toString` result references. */

  var mapTag$2 = '[object Map]',
      objectTag$2 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';
  var dataViewTag$2 = '[object DataView]';
  /** Used to detect maps, sets, and weakmaps. */

  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);
  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag(new Map()) != mapTag$2 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$2 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
    getTag = function (value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag$2 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2;

          case mapCtorString:
            return mapTag$2;

          case promiseCtorString:
            return promiseTag;

          case setCtorString:
            return setTag$2;

          case weakMapCtorString:
            return weakMapTag$1;
        }
      }

      return result;
    };
  }

  var getTag$1 = getTag;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$3 = 1;
  /** `Object#toString` result references. */

  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$3 = '[object Object]';
  /** Used for built-in method references. */

  var objectProto$f = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$c = objectProto$f.hasOwnProperty;
  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = objIsArr ? arrayTag$1 : getTag$1(object),
        othTag = othIsArr ? arrayTag$1 : getTag$1(other);
    objTag = objTag == argsTag$2 ? objectTag$3 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$3 : othTag;
    var objIsObj = objTag == objectTag$3,
        othIsObj = othTag == objectTag$3,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }

      objIsArr = true;
      objIsObj = false;
    }

    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }

    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$c.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$c.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }

    if (!isSameTag) {
      return false;
    }

    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */

  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }

    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }

    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;
  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */

  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }

    object = Object(object);

    while (index--) {
      var data = matchData[index];

      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }

    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();

        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }

        if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */

  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */

  function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];
      result[length] = [key, value, isStrictComparable(value)];
    }

    return result;
  }

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function (object) {
      if (object == null) {
        return false;
      }

      return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatches(source) {
    var matchData = getMatchData(source);

    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }

    return function (object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }

  /** Used to match property names within property paths. */

  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;
  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */

  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }

    var type = typeof value;

    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
      return true;
    }

    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  /** Error message constants. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */

  function memoize(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    var memoized = function () {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  } // Expose `MapCache`.


  memoize.Cache = MapCache;

  /** Used as the maximum memoize cache size. */

  var MAX_MEMOIZE_SIZE = 500;
  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */

  function memoizeCapped(func) {
    var result = memoize(func, function (key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }

      return key;
    });
    var cache = result.cache;
    return result;
  }

  /** Used to match property names within property paths. */

  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  /** Used to match backslashes in property paths. */

  var reEscapeChar = /\\(\\)?/g;
  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */

  var stringToPath = memoizeCapped(function (string) {
    var result = [];

    if (string.charCodeAt(0) === 46
    /* . */
    ) {
        result.push('');
      }

    string.replace(rePropName, function (match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */

  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }

    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }

  /** Used as references for various `Number` constants. */

  var INFINITY$1 = 1 / 0;
  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */

  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */

  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }

    return index && index == length ? object : undefined;
  }

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */

  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */

  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey(path[index]);

      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }

      object = object[key];
    }

    if (result || ++index != length) {
      return result;
    }

    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */

  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;
  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }

    return function (object) {
      var objValue = get(object, path);
      return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */

  function basePropertyDeep(path) {
    return function (object) {
      return baseGet(object, path);
    };
  }

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */

  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */

  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }

    if (value == null) {
      return identity;
    }

    if (typeof value == 'object') {
      return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }

    return property(value);
  }

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */

  function baseMap(collection, iteratee) {
    var index = -1,
        result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);

    while (length--) {
      array[length] = array[length].value;
    }

    return array;
  }

  /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */

  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined,
          valIsNull = value === null,
          valIsReflexive = value === value,
          valIsSymbol = isSymbol(value);
      var othIsDefined = other !== undefined,
          othIsNull = other === null,
          othIsReflexive = other === other,
          othIsSymbol = isSymbol(other);

      if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
        return 1;
      }

      if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
        return -1;
      }
    }

    return 0;
  }

  /**
   * Used by `_.orderBy` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
   * specify an order of "desc" for descending or "asc" for ascending sort order
   * of corresponding values.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]|string[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */

  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = compareAscending(objCriteria[index], othCriteria[index]);

      if (result) {
        if (index >= ordersLength) {
          return result;
        }

        var order = orders[index];
        return result * (order == 'desc' ? -1 : 1);
      }
    } // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.


    return object.index - other.index;
  }

  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */

  function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));
    var result = baseMap(collection, function (value, key, collection) {
      var criteria = arrayMap(iteratees, function (iteratee) {
        return iteratee(value);
      });
      return {
        'criteria': criteria,
        'index': ++index,
        'value': value
      };
    });
    return baseSortBy(result, function (object, other) {
      return compareMultiple(object, other, orders);
    });
  }

  /**
   * This method is like `_.sortBy` except that it allows specifying the sort
   * orders of the iteratees to sort by. If `orders` is unspecified, all values
   * are sorted in ascending order. Otherwise, specify an order of "desc" for
   * descending or "asc" for ascending sort order of corresponding values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @param {string[]} [orders] The sort orders of `iteratees`.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 34 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 36 }
   * ];
   *
   * // Sort by `user` in ascending order and by `age` in descending order.
   * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   */

  function orderBy(collection, iteratees, orders, guard) {
    if (collection == null) {
      return [];
    }

    if (!isArray(iteratees)) {
      iteratees = iteratees == null ? [] : [iteratees];
    }

    orders = guard ? undefined : orders;

    if (!isArray(orders)) {
      orders = orders == null ? [] : [orders];
    }

    return baseOrderBy(collection, iteratees, orders);
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {// No operation performed.
  }

  /** Used as references for various `Number` constants. */

  var INFINITY$2 = 1 / 0;
  /**
   * Creates a set object of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */

  var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY$2) ? noop : function (values) {
    return new Set(values);
  };

  /**
   *
   */

  var Feed = function Feed(config) {
    this["default"] = Feed["default"];
    this._settings = merge({}, Feed["default"], config);
    this.init();
  };
  /**
   * Initializes the module
   */


  Feed.prototype.init = function init() {
    var this$1 = this;
    var data = [];
    var feed = this._settings.feed;
    var config = {
      rssToJson: Feed.rssToJson,
      rssUrl: Array.isArray(feed) ? feed : [feed]
    }; // Go through each feed

    forEach(config.rssUrl, function (url, index) {
      // Make the request
      this$1._request(config, url).then(function (response) {
        // Process the data
        data.push(this$1._process(JSON.parse(response), this$1._settings)); // When all feeds have been requested, merge the data and compile

        if (data.length === config.rssUrl.length) {
          this$1._merge(data, this$1._settings);

          var compiled = this$1._render(this$1._merge(data, this$1._settings), this$1._settings);

          var el = document.querySelector(this$1._settings.selector);

          if (el) {
            el.innerHTML = compiled;
          }
        }
      });
    });

    return this;
  };
  /**
   * Create an XHR request for the feed data
   * @param{object} config The request data
   * @param{string} url  The request url
   * @return {Promise}     Resolves when the response is ready, rejects when
   *                       the operation times out or there is an error.
   */


  Feed.prototype._request = function _request(config, url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function (event) {
        var _xhr = event.target;

        if (_xhr.readyState === 4) {
          if (_xhr.status >= 200 && _xhr.status < 400) {
            resolve(_xhr.response);
          } else {
            reject(new Error(_xhr.status));
          }
        }
      };

      xhr.ontimeout = function () {
        reject(new Error('The Feed request timed out'));
      };

      xhr.open('GET', config.rssToJson + "?rss_url=" + url, true);
      xhr.send();
      xhr = null;
    });
  };
  /**
   * Pass data to the appropriate processing function based on type
   * @param{object} data   The requested feed data to pass
   * @param{object} settings The application settings
   * @return {object}        The processed data
   */


  Feed.prototype._process = function _process(data, settings) {
    return Feed.process[settings.type](data, settings);
  };
  /**
   * Pass data to the appropriate merge function based on type
   * @param{object} data   The requested feed data to pass
   * @param{object} settings The application settings
   * @return {object}        The merged feed data
   */


  Feed.prototype._merge = function _merge(data, settings) {
    return Feed.merge[settings.type](data);
  };
  /**
   * Combine template components, pass data, and return compiled temlate
   * @param{object} data   The requested feed data to pass
   * @param{object} settings The application settings
   * @return {string}        The complied html string
   */


  Feed.prototype._render = function _render(data, settings) {
    data.settings = settings;

    if (settings.log) {
      console.dir(data);
    }

    var template$1 = values(settings.templates).join('');

    var compiled = template(template$1, {
      'imports': {
        '_each': forEach
      }
    });

    return compiled(data);
  };
  /**
   * An open RSS to JSON api, see https://rss2json.com
   * @type {String}
   */


  Feed.rssToJson = 'https://api.rss2json.com/v1/api.json';
  /**
   * The template for the widget.
   * @type {String}
   */

  Feed.templates = {
    medium: {
      opener: ['<section class="o-feed <%- settings.classes.wrapper %>" style="', '<% if (settings.fontSize) { %>font-size: <%- settings.fontSize %>;<% } %>', '<% if (settings.postBorderColor) { %>border-color: <%- settings.postBorderColor %>;<% } %>', '">'],
      header: ['<header class="o-feed__header <%- settings.classes.header %>">', '<div class="o-feed__avatar <%- settings.classes.avatar %>">', '<img src="', '<% if (settings.profileImg !== "") { %>', '<%- settings.profileImg %>', '<% } else { %>', '<%- feed.profileImg %>', '<% } %>" ', 'width="<%- settings.ratioProfile[0] %>" ', 'height="<%- settings.ratioProfile[1] %>">', '</div>', '<a class="o-feed__url <%- settings.classes.avatar %>" ', 'href="<% if (settings.titleUrl !== "") { %>', '<%- settings.titleUrl %>', '<% } else { %>', '<%- feed.url %>', '<% } %>" ', 'target="_blank" rel="noopener noreferrer nofollow">', '<% if (settings.title !== "") { %>', '<%- settings.title %>', '<% } else { %>', '<%- feed.title %>', '<% } %>', '</a>', '</header>'],
      posts: ['<div class="o-feed__items" style="', 'border-color: <%- settings.postBorderColor %>;', '">', '<% _each(items, function(post) { %>', '<div class="c-feed-item <%- settings.classes.feedItem %>">', '<h4 class="c-feed-item__title <%- settings.classes.title %>">', '<a class="c-feed-item__link <%- settings.classes.link %>"', 'href="<%- post.guid %>"', 'target="_blank"', 'rel="noopener noreferrer nofollow">', '<%- post.title %>', '</a>', '</h4>', '<span class="c-feed-item__date <%- settings.classes.date %>" ', 'title="<%- settings.postDateTitle %>">', '<%- post.date %>', '</span>', '<div class="c-feed-item__thumbnail <%- settings.classes.thumbnail %>"', 'style="', 'background-image: url(<%- post.thumbnail %>);', 'height: <%- settings.postImgHeight %>;"', 'aria-hidden="true">', '<img style="display: none;" src="<%- post.thumbnail %>" alt="<%- post.title %>">', '</div>', '<p class="c-feed-item__excerpt <%- settings.classes.excerpt %>">', '<%- post.excerpt %><%- settings.postExcerptTrail %>', '</p>', '<div class="c-feed-item__footer <%- settings.classes.itemFooter %>">', '<a class="c-feed-item__cta <%- settings.classes.cta %>" ', 'href="<%- post.guid %>" ', 'target="_blank" ', 'rel="noopener noreferrer nofollow">', '<%- settings.postCtaText %>', '</a>', '</div>', '</div>', '<% }); %>', '</div>'],
      closer: ['</section>']
    }
  };
  /**
   * Functions for processing the data based on the feed type.
   * @type {Object}
   */

  Feed.process = {
    medium: function medium(data, settings) {
      var length = settings.postExcerptLength;

      forEach(data.items, function (post, index) {
        var excerpt = '';
        var date = ''; // Remove figures first

        excerpt = post.description.replace(/<figure.*>.*?<\/figure>/g, ''); // Remove all tags

        excerpt = excerpt.replace(/<(.|\n)*?>/g, ''); // Trim the excerpt

        excerpt = excerpt.substr(0, length);
        excerpt = excerpt.substr(0, Math.min(excerpt.length, excerpt.lastIndexOf(' ')));
        post.excerpt = excerpt; // Format the date

        date = new Date(Date.parse(post.pubDate.replace(' ', 'T'))).toLocaleDateString(settings.postDateLocal, settings.postDateFormat);
        post.date = date;
        return post;
      });

      return data;
    }
    /**
     * Functions for merging the data feeds together, based on the feed type.
     * @type {Object}
     */

  };
  Feed.merge = {
    medium: function medium(data) {
      var merged = {};
      var items = []; // Combine the post items

      data.forEach(function (feed) {
        items = items.concat(feed.items);
      }); // Merge the data, this will override values, it probably won't be
      // particularly useful for feeds that are the same, but potentially
      // different feed types could use this and combine unique data

      data.forEach(function (feed) {
        merged = merge(merged, feed);
      }); // Get unique posts
      // items = _uniqBy(items, (item) => item.guid);

      merged.items = orderBy(items, 'pubDate', 'desc');
      return merged;
    }
    /**
     * See https://rss2json.com/docs for details on default parameters
     * @type {Object}
     */

  };
  Feed["default"] = {
    feed: '',
    selector: '#js-feed',
    type: 'medium',
    title: '',
    titleUrl: '',
    profileImg: '',
    fontSize: '',
    ratioProfile: ['50', '50'],
    postBorderColor: 'lightsteelblue',
    postImgHeight: '200px',
    postExcerptLength: 120,
    postExcerptTrail: '…',
    postCtaText: 'Read the full post',
    postDateLocal: 'en-US',
    postDateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    postDateTitle: 'Published Date',
    classes: {
      wrapper: '',
      header: '',
      url: '',
      feedItem: '',
      title: '',
      link: '',
      thumbnail: '',
      excerpt: '',
      itemFooter: '',
      cta: '',
      date: ''
    },
    templates: {
      opener: Feed.templates.medium.opener.join(''),
      header: Feed.templates.medium.header.join(''),
      posts: Feed.templates.medium.posts.join(''),
      closer: Feed.templates.medium.closer.join('')
    },
    log: false,
    unique: false
  };

  return Feed;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0Z1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29yZUpzRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzTWFza2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdG9Tb3VyY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYXRpdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRWYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE5hdGl2ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2RlZmluZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUFzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29weU9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaWRlbnRpdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcHBseS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJSZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Nob3J0T3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0VG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNMZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzSXRlcmF0ZWVDYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQXNzaWduZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVGltZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcmd1bWVudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3N0dWJGYWxzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuYXJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbm9kZVV0aWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TGlrZUtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1Byb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXNzaWduSW5XaXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXR0ZW1wdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVZhbHVlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2N1c3RvbURlZmF1bHRzQXNzaWduSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lc2NhcGVTdHJpbmdDaGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbmF0aXZlS2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVJbnRlcnBvbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eU9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXNjYXBlSHRtbENoYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRvU3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90b1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXNjYXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVFc2NhcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yZUV2YWx1YXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZVNldHRpbmdzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5RWFjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VGb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvck93bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VFYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0RnVuY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2ZvckVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVDbGVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc29jSW5kZXhPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZVNldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0xpc3RDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0RlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrR2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoRGVsZXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fSGFzaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleWFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRNYXBEYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVEZWxldGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXBDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3RhY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19VaW50OEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVBcnJheUJ1ZmZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pbml0Q2xvbmVPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2FmZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNZXJnZURlZXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy92YWx1ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRDYWNoZUFkZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0Q2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheVNvbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsQXJyYXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwVG9BcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbEJ5VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlQdXNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc3R1YkFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0U3ltYm9scy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbE9iamVjdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19EYXRhVmlldy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1Byb21pc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19XZWFrTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWxEZWVwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNNYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE1hdGNoRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hdGNoZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbWVtb2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21lbW9pemVDYXBwZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb1BhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0UGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvS2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUhhc0luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzUGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaGFzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5RGVlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXRlcmF0ZWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNvcnRCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvbXBhcmVBc2NlbmRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb21wYXJlTXVsdGlwbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlT3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvb3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGaW5kSW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYU4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpY3RJbmRleE9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlJbmNsdWRlc1dpdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25vb3AuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVTZXQuanMiLCIuLi8uLi8uLi9zcmMvb2JqZWN0cy9mZWVkL0ZlZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdDtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0Z1bmN0aW9uO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNvcmVKc0RhdGE7XG4iLCJpbXBvcnQgY29yZUpzRGF0YSBmcm9tICcuL19jb3JlSnNEYXRhLmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvU291cmNlO1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc01hc2tlZCBmcm9tICcuL19pc01hc2tlZC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNOYXRpdmU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0VmFsdWU7XG4iLCJpbXBvcnQgYmFzZUlzTmF0aXZlIGZyb20gJy4vX2Jhc2VJc05hdGl2ZS5qcyc7XG5pbXBvcnQgZ2V0VmFsdWUgZnJvbSAnLi9fZ2V0VmFsdWUuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXROYXRpdmU7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZnVuYyA9IGdldE5hdGl2ZShPYmplY3QsICdkZWZpbmVQcm9wZXJ0eScpO1xuICAgIGZ1bmMoe30sICcnLCB7fSk7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVQcm9wZXJ0eTtcbiIsImltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuL19kZWZpbmVQcm9wZXJ0eS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VBc3NpZ25WYWx1ZTtcbiIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcTtcbiIsImltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduVmFsdWU7XG4iLCJpbXBvcnQgYXNzaWduVmFsdWUgZnJvbSAnLi9fYXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICB2YXIgaXNOZXcgPSAhb2JqZWN0O1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3VmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzTmV3KSB7XG4gICAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29weU9iamVjdDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aXR5O1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBseTtcbiIsImltcG9ydCBhcHBseSBmcm9tICcuL19hcHBseS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJSZXN0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0YW50O1xuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gJy4vY29uc3RhbnQuanMnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcbmltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0VG9TdHJpbmdgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3Agc2hvcnRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldFRvU3RyaW5nID0gIWRlZmluZVByb3BlcnR5ID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBzdHJpbmcpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmMsICd0b1N0cmluZycsIHtcbiAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAnZW51bWVyYWJsZSc6IGZhbHNlLFxuICAgICd2YWx1ZSc6IGNvbnN0YW50KHN0cmluZyksXG4gICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VTZXRUb1N0cmluZztcbiIsIi8qKiBVc2VkIHRvIGRldGVjdCBob3QgZnVuY3Rpb25zIGJ5IG51bWJlciBvZiBjYWxscyB3aXRoaW4gYSBzcGFuIG9mIG1pbGxpc2Vjb25kcy4gKi9cbnZhciBIT1RfQ09VTlQgPSA4MDAsXG4gICAgSE9UX1NQQU4gPSAxNjtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0J2xsIHNob3J0IG91dCBhbmQgaW52b2tlIGBpZGVudGl0eWAgaW5zdGVhZFxuICogb2YgYGZ1bmNgIHdoZW4gaXQncyBjYWxsZWQgYEhPVF9DT1VOVGAgb3IgbW9yZSB0aW1lcyBpbiBgSE9UX1NQQU5gXG4gKiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc2hvcnRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzaG9ydE91dChmdW5jKSB7XG4gIHZhciBjb3VudCA9IDAsXG4gICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YW1wID0gbmF0aXZlTm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IEhPVF9TUEFOIC0gKHN0YW1wIC0gbGFzdENhbGxlZCk7XG5cbiAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmICgrK2NvdW50ID49IEhPVF9DT1VOVCkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvcnRPdXQ7XG4iLCJpbXBvcnQgYmFzZVNldFRvU3RyaW5nIGZyb20gJy4vX2Jhc2VTZXRUb1N0cmluZy5qcyc7XG5pbXBvcnQgc2hvcnRPdXQgZnJvbSAnLi9fc2hvcnRPdXQuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5leHBvcnQgZGVmYXVsdCBzZXRUb1N0cmluZztcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcbmltcG9ydCBvdmVyUmVzdCBmcm9tICcuL19vdmVyUmVzdC5qcyc7XG5pbXBvcnQgc2V0VG9TdHJpbmcgZnJvbSAnLi9fc2V0VG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gc2V0VG9TdHJpbmcob3ZlclJlc3QoZnVuYywgc3RhcnQsIGlkZW50aXR5KSwgZnVuYyArICcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVJlc3Q7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTGVuZ3RoO1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG5cbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGUgPT0gJ251bWJlcicgfHxcbiAgICAgICh0eXBlICE9ICdzeW1ib2wnICYmIHJlSXNVaW50LnRlc3QodmFsdWUpKSkgJiZcbiAgICAgICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0luZGV4O1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNJdGVyYXRlZUNhbGw7XG4iLCJpbXBvcnQgYmFzZVJlc3QgZnJvbSAnLi9fYmFzZVJlc3QuanMnO1xuaW1wb3J0IGlzSXRlcmF0ZWVDYWxsIGZyb20gJy4vX2lzSXRlcmF0ZWVDYWxsLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQXNzaWduZXI7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVGltZXM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzQXJndW1lbnRzO1xuIiwiaW1wb3J0IGJhc2VJc0FyZ3VtZW50cyBmcm9tICcuL19iYXNlSXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViRmFsc2U7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcbmltcG9ydCBzdHViRmFsc2UgZnJvbSAnLi9zdHViRmFsc2UuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQnVmZmVyO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVW5hcnk7XG4iLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbm9kZVV0aWw7XG4iLCJpbXBvcnQgYmFzZUlzVHlwZWRBcnJheSBmcm9tICcuL19iYXNlSXNUeXBlZEFycmF5LmpzJztcbmltcG9ydCBiYXNlVW5hcnkgZnJvbSAnLi9fYmFzZVVuYXJ5LmpzJztcbmltcG9ydCBub2RlVXRpbCBmcm9tICcuL19ub2RlVXRpbC5qcyc7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc1R5cGVkQXJyYXk7XG4iLCJpbXBvcnQgYmFzZVRpbWVzIGZyb20gJy4vX2Jhc2VUaW1lcy5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNUeXBlZEFycmF5IGZyb20gJy4vaXNUeXBlZEFycmF5LmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUxpa2VLZXlzO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3RvdHlwZTtcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzSW47XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXNJbiBmcm9tICcuL19uYXRpdmVLZXlzSW4uanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5c0luO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXNJbiBmcm9tICcuL19iYXNlS2V5c0luLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXNJbjtcbiIsImltcG9ydCBjb3B5T2JqZWN0IGZyb20gJy4vX2NvcHlPYmplY3QuanMnO1xuaW1wb3J0IGNyZWF0ZUFzc2lnbmVyIGZyb20gJy4vX2NyZWF0ZUFzc2lnbmVyLmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduSW5gIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYGN1c3RvbWl6ZXJgXG4gKiB3aGljaCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIGFzc2lnbmVkIHZhbHVlcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnNcbiAqIGB1bmRlZmluZWRgLCBhc3NpZ25tZW50IGlzIGhhbmRsZWQgYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgXG4gKiBpcyBpbnZva2VkIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBhbGlhcyBleHRlbmRXaXRoXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlcyBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQHNlZSBfLmFzc2lnbldpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUpIHtcbiAqICAgcmV0dXJuIF8uaXNVbmRlZmluZWQob2JqVmFsdWUpID8gc3JjVmFsdWUgOiBvYmpWYWx1ZTtcbiAqIH1cbiAqXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbkluV2l0aCwgY3VzdG9taXplcik7XG4gKlxuICogZGVmYXVsdHMoeyAnYSc6IDEgfSwgeyAnYic6IDIgfSwgeyAnYSc6IDMgfSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqL1xudmFyIGFzc2lnbkluV2l0aCA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplcikge1xuICBjb3B5T2JqZWN0KHNvdXJjZSwga2V5c0luKHNvdXJjZSksIG9iamVjdCwgY3VzdG9taXplcik7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduSW5XaXRoO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICcuL2lzUGxhaW5PYmplY3QuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZG9tRXhjVGFnID0gJ1tvYmplY3QgRE9NRXhjZXB0aW9uXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGBFcnJvcmAsIGBFdmFsRXJyb3JgLCBgUmFuZ2VFcnJvcmAsIGBSZWZlcmVuY2VFcnJvcmAsXG4gKiBgU3ludGF4RXJyb3JgLCBgVHlwZUVycm9yYCwgb3IgYFVSSUVycm9yYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gZXJyb3Igb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNFcnJvcihuZXcgRXJyb3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFcnJvcihFcnJvcik7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Vycm9yKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZXJyb3JUYWcgfHwgdGFnID09IGRvbUV4Y1RhZyB8fFxuICAgICh0eXBlb2YgdmFsdWUubWVzc2FnZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUubmFtZSA9PSAnc3RyaW5nJyAmJiAhaXNQbGFpbk9iamVjdCh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0Vycm9yO1xuIiwiaW1wb3J0IGFwcGx5IGZyb20gJy4vX2FwcGx5LmpzJztcbmltcG9ydCBiYXNlUmVzdCBmcm9tICcuL19iYXNlUmVzdC5qcyc7XG5pbXBvcnQgaXNFcnJvciBmcm9tICcuL2lzRXJyb3IuanMnO1xuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGludm9rZSBgZnVuY2AsIHJldHVybmluZyBlaXRoZXIgdGhlIHJlc3VsdCBvciB0aGUgY2F1Z2h0IGVycm9yXG4gKiBvYmplY3QuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQgdG8gYGZ1bmNgIHdoZW4gaXQncyBpbnZva2VkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhdHRlbXB0LlxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYGZ1bmNgIHJlc3VsdCBvciBlcnJvciBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIHRocm93aW5nIGVycm9ycyBmb3IgaW52YWxpZCBzZWxlY3RvcnMuXG4gKiB2YXIgZWxlbWVudHMgPSBfLmF0dGVtcHQoZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAqICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICogfSwgJz5fPicpO1xuICpcbiAqIGlmIChfLmlzRXJyb3IoZWxlbWVudHMpKSB7XG4gKiAgIGVsZW1lbnRzID0gW107XG4gKiB9XG4gKi9cbnZhciBhdHRlbXB0ID0gYmFzZVJlc3QoZnVuY3Rpb24oZnVuYywgYXJncykge1xuICB0cnkge1xuICAgIHJldHVybiBhcHBseShmdW5jLCB1bmRlZmluZWQsIGFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGlzRXJyb3IoZSkgPyBlIDogbmV3IEVycm9yKGUpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXR0ZW1wdDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5TWFwO1xuIiwiaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiBvZiBgcHJvcHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gYXJyYXlNYXAocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VWYWx1ZXM7XG4iLCJpbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25JbmAgdXNlIHRvIGFzc2lnbiBwcm9wZXJ0aWVzXG4gKiBvZiBzb3VyY2Ugb2JqZWN0cyB0byB0aGUgZGVzdGluYXRpb24gb2JqZWN0IGZvciBhbGwgZGVzdGluYXRpb24gcHJvcGVydGllc1xuICogdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9ialZhbHVlIFRoZSBkZXN0aW5hdGlvbiB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgcGFyZW50IG9iamVjdCBvZiBgb2JqVmFsdWVgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gY3VzdG9tRGVmYXVsdHNBc3NpZ25JbihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAoZXEob2JqVmFsdWUsIG9iamVjdFByb3RvW2tleV0pICYmICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpIHtcbiAgICByZXR1cm4gc3JjVmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9ialZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluO1xuIiwiLyoqIFVzZWQgdG8gZXNjYXBlIGNoYXJhY3RlcnMgZm9yIGluY2x1c2lvbiBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMuICovXG52YXIgc3RyaW5nRXNjYXBlcyA9IHtcbiAgJ1xcXFwnOiAnXFxcXCcsXG4gIFwiJ1wiOiBcIidcIixcbiAgJ1xcbic6ICduJyxcbiAgJ1xccic6ICdyJyxcbiAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAnXFx1MjAyOSc6ICd1MjAyOSdcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy50ZW1wbGF0ZWAgdG8gZXNjYXBlIGNoYXJhY3RlcnMgZm9yIGluY2x1c2lvbiBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmdDaGFyKGNocikge1xuICByZXR1cm4gJ1xcXFwnICsgc3RyaW5nRXNjYXBlc1tjaHJdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlc2NhcGVTdHJpbmdDaGFyO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlS2V5cztcbiIsImltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5cyBmcm9tICcuL19uYXRpdmVLZXlzLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5cztcbiIsImltcG9ydCBhcnJheUxpa2VLZXlzIGZyb20gJy4vX2FycmF5TGlrZUtleXMuanMnO1xuaW1wb3J0IGJhc2VLZXlzIGZyb20gJy4vX2Jhc2VLZXlzLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXM7XG4iLCIvKiogVXNlZCB0byBtYXRjaCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlSW50ZXJwb2xhdGUgPSAvPCU9KFtcXHNcXFNdKz8pJT4vZztcblxuZXhwb3J0IGRlZmF1bHQgcmVJbnRlcnBvbGF0ZTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5T2Yob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVByb3BlcnR5T2Y7XG4iLCJpbXBvcnQgYmFzZVByb3BlcnR5T2YgZnJvbSAnLi9fYmFzZVByb3BlcnR5T2YuanMnO1xuXG4vKiogVXNlZCB0byBtYXAgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLiAqL1xudmFyIGh0bWxFc2NhcGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnXG59O1xuXG4vKipcbiAqIFVzZWQgYnkgYF8uZXNjYXBlYCB0byBjb252ZXJ0IGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNociBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbnZhciBlc2NhcGVIdG1sQ2hhciA9IGJhc2VQcm9wZXJ0eU9mKGh0bWxFc2NhcGVzKTtcblxuZXhwb3J0IGRlZmF1bHQgZXNjYXBlSHRtbENoYXI7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29udmVydCB2YWx1ZXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICByZXR1cm4gYXJyYXlNYXAodmFsdWUsIGJhc2VUb1N0cmluZykgKyAnJztcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUb1N0cmluZztcbiIsImltcG9ydCBiYXNlVG9TdHJpbmcgZnJvbSAnLi9fYmFzZVRvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1N0cmluZztcbiIsImltcG9ydCBlc2NhcGVIdG1sQ2hhciBmcm9tICcuL19lc2NhcGVIdG1sQ2hhci5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ10vZyxcbiAgICByZUhhc1VuZXNjYXBlZEh0bWwgPSBSZWdFeHAocmVVbmVzY2FwZWRIdG1sLnNvdXJjZSk7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgXCImXCIsIFwiPFwiLCBcIj5cIiwgJ1wiJywgYW5kIFwiJ1wiIGluIGBzdHJpbmdgIHRvIHRoZWlyXG4gKiBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWQuIFRvIGVzY2FwZSBhZGRpdGlvbmFsXG4gKiBjaGFyYWN0ZXJzIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAqXG4gKiBUaG91Z2ggdGhlIFwiPlwiIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlXG4gKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgbmVlZCBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICogdW5sZXNzIHRoZXkncmUgcGFydCBvZiBhIHRhZyBvciB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuIFNlZVxuICogW01hdGhpYXMgQnluZW5zJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzKVxuICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGggSFRNTCB5b3Ugc2hvdWxkIGFsd2F5c1xuICogW3F1b3RlIGF0dHJpYnV0ZSB2YWx1ZXNdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKSB0byByZWR1Y2VcbiAqIFhTUyB2ZWN0b3JzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZSgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNVbmVzY2FwZWRIdG1sLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpXG4gICAgOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVzY2FwZTtcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVFc2NhcGUgPSAvPCUtKFtcXHNcXFNdKz8pJT4vZztcblxuZXhwb3J0IGRlZmF1bHQgcmVFc2NhcGU7XG4iLCIvKiogVXNlZCB0byBtYXRjaCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlRXZhbHVhdGUgPSAvPCUoW1xcc1xcU10rPyklPi9nO1xuXG5leHBvcnQgZGVmYXVsdCByZUV2YWx1YXRlO1xuIiwiaW1wb3J0IGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5pbXBvcnQgcmVFc2NhcGUgZnJvbSAnLi9fcmVFc2NhcGUuanMnO1xuaW1wb3J0IHJlRXZhbHVhdGUgZnJvbSAnLi9fcmVFdmFsdWF0ZS5qcyc7XG5pbXBvcnQgcmVJbnRlcnBvbGF0ZSBmcm9tICcuL19yZUludGVycG9sYXRlLmpzJztcblxuLyoqXG4gKiBCeSBkZWZhdWx0LCB0aGUgdGVtcGxhdGUgZGVsaW1pdGVycyB1c2VkIGJ5IGxvZGFzaCBhcmUgbGlrZSB0aG9zZSBpblxuICogZW1iZWRkZWQgUnVieSAoRVJCKSBhcyB3ZWxsIGFzIEVTMjAxNSB0ZW1wbGF0ZSBzdHJpbmdzLiBDaGFuZ2UgdGhlXG4gKiBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciB0ZW1wbGF0ZVNldHRpbmdzID0ge1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBgZGF0YWAgcHJvcGVydHkgdmFsdWVzIHRvIGJlIEhUTUwtZXNjYXBlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgJ2VzY2FwZSc6IHJlRXNjYXBlLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBjb2RlIHRvIGJlIGV2YWx1YXRlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgJ2V2YWx1YXRlJzogcmVFdmFsdWF0ZSxcblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgYGRhdGFgIHByb3BlcnR5IHZhbHVlcyB0byBpbmplY3QuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICogQHR5cGUge1JlZ0V4cH1cbiAgICovXG4gICdpbnRlcnBvbGF0ZSc6IHJlSW50ZXJwb2xhdGUsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcmVmZXJlbmNlIHRoZSBkYXRhIG9iamVjdCBpbiB0aGUgdGVtcGxhdGUgdGV4dC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgJ3ZhcmlhYmxlJzogJycsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaW1wb3J0IHZhcmlhYmxlcyBpbnRvIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgJ2ltcG9ydHMnOiB7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYGxvZGFzaGAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzLmltcG9ydHNcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICovXG4gICAgJ18nOiB7ICdlc2NhcGUnOiBlc2NhcGUgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZVNldHRpbmdzO1xuIiwiaW1wb3J0IGFzc2lnbkluV2l0aCBmcm9tICcuL2Fzc2lnbkluV2l0aC5qcyc7XG5pbXBvcnQgYXR0ZW1wdCBmcm9tICcuL2F0dGVtcHQuanMnO1xuaW1wb3J0IGJhc2VWYWx1ZXMgZnJvbSAnLi9fYmFzZVZhbHVlcy5qcyc7XG5pbXBvcnQgY3VzdG9tRGVmYXVsdHNBc3NpZ25JbiBmcm9tICcuL19jdXN0b21EZWZhdWx0c0Fzc2lnbkluLmpzJztcbmltcG9ydCBlc2NhcGVTdHJpbmdDaGFyIGZyb20gJy4vX2VzY2FwZVN0cmluZ0NoYXIuanMnO1xuaW1wb3J0IGlzRXJyb3IgZnJvbSAnLi9pc0Vycm9yLmpzJztcbmltcG9ydCBpc0l0ZXJhdGVlQ2FsbCBmcm9tICcuL19pc0l0ZXJhdGVlQ2FsbC5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuaW1wb3J0IHJlSW50ZXJwb2xhdGUgZnJvbSAnLi9fcmVJbnRlcnBvbGF0ZS5qcyc7XG5pbXBvcnQgdGVtcGxhdGVTZXR0aW5ncyBmcm9tICcuL3RlbXBsYXRlU2V0dGluZ3MuanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBlbXB0eSBzdHJpbmcgbGl0ZXJhbHMgaW4gY29tcGlsZWQgdGVtcGxhdGUgc291cmNlLiAqL1xudmFyIHJlRW1wdHlTdHJpbmdMZWFkaW5nID0gL1xcYl9fcCBcXCs9ICcnOy9nLFxuICAgIHJlRW1wdHlTdHJpbmdNaWRkbGUgPSAvXFxiKF9fcCBcXCs9KSAnJyBcXCsvZyxcbiAgICByZUVtcHR5U3RyaW5nVHJhaWxpbmcgPSAvKF9fZVxcKC4qP1xcKXxcXGJfX3RcXCkpIFxcK1xcbicnOy9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2hcbiAqIFtFUyB0ZW1wbGF0ZSBkZWxpbWl0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10ZW1wbGF0ZS1saXRlcmFsLWxleGljYWwtY29tcG9uZW50cykuXG4gKi9cbnZhciByZUVzVGVtcGxhdGUgPSAvXFwkXFx7KFteXFxcXH1dKig/OlxcXFwuW15cXFxcfV0qKSopXFx9L2c7XG5cbi8qKiBVc2VkIHRvIGVuc3VyZSBjYXB0dXJpbmcgb3JkZXIgb2YgdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbnZhciByZU5vTWF0Y2ggPSAvKCReKS87XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHVuZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscy4gKi9cbnZhciByZVVuZXNjYXBlZFN0cmluZyA9IC9bJ1xcblxcclxcdTIwMjhcXHUyMDI5XFxcXF0vZztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY29tcGlsZWQgdGVtcGxhdGUgZnVuY3Rpb24gdGhhdCBjYW4gaW50ZXJwb2xhdGUgZGF0YSBwcm9wZXJ0aWVzXG4gKiBpbiBcImludGVycG9sYXRlXCIgZGVsaW1pdGVycywgSFRNTC1lc2NhcGUgaW50ZXJwb2xhdGVkIGRhdGEgcHJvcGVydGllcyBpblxuICogXCJlc2NhcGVcIiBkZWxpbWl0ZXJzLCBhbmQgZXhlY3V0ZSBKYXZhU2NyaXB0IGluIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXJzLiBEYXRhXG4gKiBwcm9wZXJ0aWVzIG1heSBiZSBhY2Nlc3NlZCBhcyBmcmVlIHZhcmlhYmxlcyBpbiB0aGUgdGVtcGxhdGUuIElmIGEgc2V0dGluZ1xuICogb2JqZWN0IGlzIGdpdmVuLCBpdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYF8udGVtcGxhdGVTZXR0aW5nc2AgdmFsdWVzLlxuICpcbiAqICoqTm90ZToqKiBJbiB0aGUgZGV2ZWxvcG1lbnQgYnVpbGQgYF8udGVtcGxhdGVgIHV0aWxpemVzXG4gKiBbc291cmNlVVJMc10oaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvZGV2ZWxvcGVydG9vbHMvc291cmNlbWFwcy8jdG9jLXNvdXJjZXVybClcbiAqIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuICpcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHByZWNvbXBpbGluZyB0ZW1wbGF0ZXMgc2VlXG4gKiBbbG9kYXNoJ3MgY3VzdG9tIGJ1aWxkcyBkb2N1bWVudGF0aW9uXShodHRwczovL2xvZGFzaC5jb20vY3VzdG9tLWJ1aWxkcykuXG4gKlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gQ2hyb21lIGV4dGVuc2lvbiBzYW5kYm94ZXMgc2VlXG4gKiBbQ2hyb21lJ3MgZXh0ZW5zaW9ucyBkb2N1bWVudGF0aW9uXShodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2V4dGVuc2lvbnMvc2FuZGJveGluZ0V2YWwpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgdGVtcGxhdGUgc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gW29wdGlvbnMuZXNjYXBlPV8udGVtcGxhdGVTZXR0aW5ncy5lc2NhcGVdXG4gKiAgVGhlIEhUTUwgXCJlc2NhcGVcIiBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gW29wdGlvbnMuZXZhbHVhdGU9Xy50ZW1wbGF0ZVNldHRpbmdzLmV2YWx1YXRlXVxuICogIFRoZSBcImV2YWx1YXRlXCIgZGVsaW1pdGVyLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmltcG9ydHM9Xy50ZW1wbGF0ZVNldHRpbmdzLmltcG9ydHNdXG4gKiAgQW4gb2JqZWN0IHRvIGltcG9ydCBpbnRvIHRoZSB0ZW1wbGF0ZSBhcyBmcmVlIHZhcmlhYmxlcy5cbiAqIEBwYXJhbSB7UmVnRXhwfSBbb3B0aW9ucy5pbnRlcnBvbGF0ZT1fLnRlbXBsYXRlU2V0dGluZ3MuaW50ZXJwb2xhdGVdXG4gKiAgVGhlIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuc291cmNlVVJMPSd0ZW1wbGF0ZVNvdXJjZXNbbl0nXVxuICogIFRoZSBzb3VyY2VVUkwgb2YgdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnZhcmlhYmxlPSdvYmonXVxuICogIFRoZSBkYXRhIG9iamVjdCB2YXJpYWJsZSBuYW1lLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29tcGlsZWQgdGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIFVzZSB0aGUgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlciB0byBjcmVhdGUgYSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvIDwlPSB1c2VyICU+IScpO1xuICogY29tcGlsZWQoeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+ICdoZWxsbyBmcmVkISdcbiAqXG4gKiAvLyBVc2UgdGhlIEhUTUwgXCJlc2NhcGVcIiBkZWxpbWl0ZXIgdG8gZXNjYXBlIGRhdGEgcHJvcGVydHkgdmFsdWVzLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPGI+PCUtIHZhbHVlICU+PC9iPicpO1xuICogY29tcGlsZWQoeyAndmFsdWUnOiAnPHNjcmlwdD4nIH0pO1xuICogLy8gPT4gJzxiPiZsdDtzY3JpcHQmZ3Q7PC9iPidcbiAqXG4gKiAvLyBVc2UgdGhlIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXIgdG8gZXhlY3V0ZSBKYXZhU2NyaXB0IGFuZCBnZW5lcmF0ZSBIVE1MLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPCUgXy5mb3JFYWNoKHVzZXJzLCBmdW5jdGlvbih1c2VyKSB7ICU+PGxpPjwlLSB1c2VyICU+PC9saT48JSB9KTsgJT4nKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXJzJzogWydmcmVkJywgJ2Jhcm5leSddIH0pO1xuICogLy8gPT4gJzxsaT5mcmVkPC9saT48bGk+YmFybmV5PC9saT4nXG4gKlxuICogLy8gVXNlIHRoZSBpbnRlcm5hbCBgcHJpbnRgIGZ1bmN0aW9uIGluIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXJzLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPCUgcHJpbnQoXCJoZWxsbyBcIiArIHVzZXIpOyAlPiEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAnYmFybmV5JyB9KTtcbiAqIC8vID0+ICdoZWxsbyBiYXJuZXkhJ1xuICpcbiAqIC8vIFVzZSB0aGUgRVMgdGVtcGxhdGUgbGl0ZXJhbCBkZWxpbWl0ZXIgYXMgYW4gXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlci5cbiAqIC8vIERpc2FibGUgc3VwcG9ydCBieSByZXBsYWNpbmcgdGhlIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyAkeyB1c2VyIH0hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ3BlYmJsZXMnIH0pO1xuICogLy8gPT4gJ2hlbGxvIHBlYmJsZXMhJ1xuICpcbiAqIC8vIFVzZSBiYWNrc2xhc2hlcyB0byB0cmVhdCBkZWxpbWl0ZXJzIGFzIHBsYWluIHRleHQuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8JT0gXCJcXFxcPCUtIHZhbHVlICVcXFxcPlwiICU+Jyk7XG4gKiBjb21waWxlZCh7ICd2YWx1ZSc6ICdpZ25vcmVkJyB9KTtcbiAqIC8vID0+ICc8JS0gdmFsdWUgJT4nXG4gKlxuICogLy8gVXNlIHRoZSBgaW1wb3J0c2Agb3B0aW9uIHRvIGltcG9ydCBgalF1ZXJ5YCBhcyBganFgLlxuICogdmFyIHRleHQgPSAnPCUganEuZWFjaCh1c2VycywgZnVuY3Rpb24odXNlcikgeyAlPjxsaT48JS0gdXNlciAlPjwvbGk+PCUgfSk7ICU+JztcbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUodGV4dCwgeyAnaW1wb3J0cyc6IHsgJ2pxJzogalF1ZXJ5IH0gfSk7XG4gKiBjb21waWxlZCh7ICd1c2Vycyc6IFsnZnJlZCcsICdiYXJuZXknXSB9KTtcbiAqIC8vID0+ICc8bGk+ZnJlZDwvbGk+PGxpPmJhcm5leTwvbGk+J1xuICpcbiAqIC8vIFVzZSB0aGUgYHNvdXJjZVVSTGAgb3B0aW9uIHRvIHNwZWNpZnkgYSBjdXN0b20gc291cmNlVVJMIGZvciB0aGUgdGVtcGxhdGUuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyA8JT0gdXNlciAlPiEnLCB7ICdzb3VyY2VVUkwnOiAnL2Jhc2ljL2dyZWV0aW5nLmpzdCcgfSk7XG4gKiBjb21waWxlZChkYXRhKTtcbiAqIC8vID0+IEZpbmQgdGhlIHNvdXJjZSBvZiBcImdyZWV0aW5nLmpzdFwiIHVuZGVyIHRoZSBTb3VyY2VzIHRhYiBvciBSZXNvdXJjZXMgcGFuZWwgb2YgdGhlIHdlYiBpbnNwZWN0b3IuXG4gKlxuICogLy8gVXNlIHRoZSBgdmFyaWFibGVgIG9wdGlvbiB0byBlbnN1cmUgYSB3aXRoLXN0YXRlbWVudCBpc24ndCB1c2VkIGluIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hpIDwlPSBkYXRhLnVzZXIgJT4hJywgeyAndmFyaWFibGUnOiAnZGF0YScgfSk7XG4gKiBjb21waWxlZC5zb3VyY2U7XG4gKiAvLyA9PiBmdW5jdGlvbihkYXRhKSB7XG4gKiAvLyAgIHZhciBfX3QsIF9fcCA9ICcnO1xuICogLy8gICBfX3AgKz0gJ2hpICcgKyAoKF9fdCA9ICggZGF0YS51c2VyICkpID09IG51bGwgPyAnJyA6IF9fdCkgKyAnISc7XG4gKiAvLyAgIHJldHVybiBfX3A7XG4gKiAvLyB9XG4gKlxuICogLy8gVXNlIGN1c3RvbSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLlxuICogXy50ZW1wbGF0ZVNldHRpbmdzLmludGVycG9sYXRlID0gL3t7KFtcXHNcXFNdKz8pfX0vZztcbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvIHt7IHVzZXIgfX0hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ211c3RhY2hlJyB9KTtcbiAqIC8vID0+ICdoZWxsbyBtdXN0YWNoZSEnXG4gKlxuICogLy8gVXNlIHRoZSBgc291cmNlYCBwcm9wZXJ0eSB0byBpbmxpbmUgY29tcGlsZWQgdGVtcGxhdGVzIGZvciBtZWFuaW5nZnVsXG4gKiAvLyBsaW5lIG51bWJlcnMgaW4gZXJyb3IgbWVzc2FnZXMgYW5kIHN0YWNrIHRyYWNlcy5cbiAqIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdqc3QuanMnKSwgJ1xcXG4gKiAgIHZhciBKU1QgPSB7XFxcbiAqICAgICBcIm1haW5cIjogJyArIF8udGVtcGxhdGUobWFpblRleHQpLnNvdXJjZSArICdcXFxuICogICB9O1xcXG4gKiAnKTtcbiAqL1xuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nLCBvcHRpb25zLCBndWFyZCkge1xuICAvLyBCYXNlZCBvbiBKb2huIFJlc2lnJ3MgYHRtcGxgIGltcGxlbWVudGF0aW9uXG4gIC8vIChodHRwOi8vZWpvaG4ub3JnL2Jsb2cvamF2YXNjcmlwdC1taWNyby10ZW1wbGF0aW5nLylcbiAgLy8gYW5kIExhdXJhIERva3Rvcm92YSdzIGRvVC5qcyAoaHR0cHM6Ly9naXRodWIuY29tL29sYWRvL2RvVCkuXG4gIHZhciBzZXR0aW5ncyA9IHRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0cy5fLnRlbXBsYXRlU2V0dGluZ3MgfHwgdGVtcGxhdGVTZXR0aW5ncztcblxuICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc3RyaW5nLCBvcHRpb25zLCBndWFyZCkpIHtcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIG9wdGlvbnMgPSBhc3NpZ25JbldpdGgoe30sIG9wdGlvbnMsIHNldHRpbmdzLCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKTtcblxuICB2YXIgaW1wb3J0cyA9IGFzc2lnbkluV2l0aCh7fSwgb3B0aW9ucy5pbXBvcnRzLCBzZXR0aW5ncy5pbXBvcnRzLCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKSxcbiAgICAgIGltcG9ydHNLZXlzID0ga2V5cyhpbXBvcnRzKSxcbiAgICAgIGltcG9ydHNWYWx1ZXMgPSBiYXNlVmFsdWVzKGltcG9ydHMsIGltcG9ydHNLZXlzKTtcblxuICB2YXIgaXNFc2NhcGluZyxcbiAgICAgIGlzRXZhbHVhdGluZyxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGludGVycG9sYXRlID0gb3B0aW9ucy5pbnRlcnBvbGF0ZSB8fCByZU5vTWF0Y2gsXG4gICAgICBzb3VyY2UgPSBcIl9fcCArPSAnXCI7XG5cbiAgLy8gQ29tcGlsZSB0aGUgcmVnZXhwIHRvIG1hdGNoIGVhY2ggZGVsaW1pdGVyLlxuICB2YXIgcmVEZWxpbWl0ZXJzID0gUmVnRXhwKFxuICAgIChvcHRpb25zLmVzY2FwZSB8fCByZU5vTWF0Y2gpLnNvdXJjZSArICd8JyArXG4gICAgaW50ZXJwb2xhdGUuc291cmNlICsgJ3wnICtcbiAgICAoaW50ZXJwb2xhdGUgPT09IHJlSW50ZXJwb2xhdGUgPyByZUVzVGVtcGxhdGUgOiByZU5vTWF0Y2gpLnNvdXJjZSArICd8JyArXG4gICAgKG9wdGlvbnMuZXZhbHVhdGUgfHwgcmVOb01hdGNoKS5zb3VyY2UgKyAnfCQnXG4gICwgJ2cnKTtcblxuICAvLyBVc2UgYSBzb3VyY2VVUkwgZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gIHZhciBzb3VyY2VVUkwgPSAnc291cmNlVVJMJyBpbiBvcHRpb25zID8gJy8vIyBzb3VyY2VVUkw9JyArIG9wdGlvbnMuc291cmNlVVJMICsgJ1xcbicgOiAnJztcblxuICBzdHJpbmcucmVwbGFjZShyZURlbGltaXRlcnMsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGVWYWx1ZSwgaW50ZXJwb2xhdGVWYWx1ZSwgZXNUZW1wbGF0ZVZhbHVlLCBldmFsdWF0ZVZhbHVlLCBvZmZzZXQpIHtcbiAgICBpbnRlcnBvbGF0ZVZhbHVlIHx8IChpbnRlcnBvbGF0ZVZhbHVlID0gZXNUZW1wbGF0ZVZhbHVlKTtcblxuICAgIC8vIEVzY2FwZSBjaGFyYWN0ZXJzIHRoYXQgY2FuJ3QgYmUgaW5jbHVkZWQgaW4gc3RyaW5nIGxpdGVyYWxzLlxuICAgIHNvdXJjZSArPSBzdHJpbmcuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShyZVVuZXNjYXBlZFN0cmluZywgZXNjYXBlU3RyaW5nQ2hhcik7XG5cbiAgICAvLyBSZXBsYWNlIGRlbGltaXRlcnMgd2l0aCBzbmlwcGV0cy5cbiAgICBpZiAoZXNjYXBlVmFsdWUpIHtcbiAgICAgIGlzRXNjYXBpbmcgPSB0cnVlO1xuICAgICAgc291cmNlICs9IFwiJyArXFxuX19lKFwiICsgZXNjYXBlVmFsdWUgKyBcIikgK1xcbidcIjtcbiAgICB9XG4gICAgaWYgKGV2YWx1YXRlVmFsdWUpIHtcbiAgICAgIGlzRXZhbHVhdGluZyA9IHRydWU7XG4gICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGVWYWx1ZSArIFwiO1xcbl9fcCArPSAnXCI7XG4gICAgfVxuICAgIGlmIChpbnRlcnBvbGF0ZVZhbHVlKSB7XG4gICAgICBzb3VyY2UgKz0gXCInICtcXG4oKF9fdCA9IChcIiArIGludGVycG9sYXRlVmFsdWUgKyBcIikpID09IG51bGwgPyAnJyA6IF9fdCkgK1xcbidcIjtcbiAgICB9XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAvLyBUaGUgSlMgZW5naW5lIGVtYmVkZGVkIGluIEFkb2JlIHByb2R1Y3RzIG5lZWRzIGBtYXRjaGAgcmV0dXJuZWQgaW5cbiAgICAvLyBvcmRlciB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IGBvZmZzZXRgIHZhbHVlLlxuICAgIHJldHVybiBtYXRjaDtcbiAgfSk7XG5cbiAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAvLyBJZiBgdmFyaWFibGVgIGlzIG5vdCBzcGVjaWZpZWQgd3JhcCBhIHdpdGgtc3RhdGVtZW50IGFyb3VuZCB0aGUgZ2VuZXJhdGVkXG4gIC8vIGNvZGUgdG8gYWRkIHRoZSBkYXRhIG9iamVjdCB0byB0aGUgdG9wIG9mIHRoZSBzY29wZSBjaGFpbi5cbiAgdmFyIHZhcmlhYmxlID0gb3B0aW9ucy52YXJpYWJsZTtcbiAgaWYgKCF2YXJpYWJsZSkge1xuICAgIHNvdXJjZSA9ICd3aXRoIChvYmopIHtcXG4nICsgc291cmNlICsgJ1xcbn1cXG4nO1xuICB9XG4gIC8vIENsZWFudXAgY29kZSBieSBzdHJpcHBpbmcgZW1wdHkgc3RyaW5ncy5cbiAgc291cmNlID0gKGlzRXZhbHVhdGluZyA/IHNvdXJjZS5yZXBsYWNlKHJlRW1wdHlTdHJpbmdMZWFkaW5nLCAnJykgOiBzb3VyY2UpXG4gICAgLnJlcGxhY2UocmVFbXB0eVN0cmluZ01pZGRsZSwgJyQxJylcbiAgICAucmVwbGFjZShyZUVtcHR5U3RyaW5nVHJhaWxpbmcsICckMTsnKTtcblxuICAvLyBGcmFtZSBjb2RlIGFzIHRoZSBmdW5jdGlvbiBib2R5LlxuICBzb3VyY2UgPSAnZnVuY3Rpb24oJyArICh2YXJpYWJsZSB8fCAnb2JqJykgKyAnKSB7XFxuJyArXG4gICAgKHZhcmlhYmxlXG4gICAgICA/ICcnXG4gICAgICA6ICdvYmogfHwgKG9iaiA9IHt9KTtcXG4nXG4gICAgKSArXG4gICAgXCJ2YXIgX190LCBfX3AgPSAnJ1wiICtcbiAgICAoaXNFc2NhcGluZ1xuICAgICAgID8gJywgX19lID0gXy5lc2NhcGUnXG4gICAgICAgOiAnJ1xuICAgICkgK1xuICAgIChpc0V2YWx1YXRpbmdcbiAgICAgID8gJywgX19qID0gQXJyYXkucHJvdG90eXBlLmpvaW47XFxuJyArXG4gICAgICAgIFwiZnVuY3Rpb24gcHJpbnQoKSB7IF9fcCArPSBfX2ouY2FsbChhcmd1bWVudHMsICcnKSB9XFxuXCJcbiAgICAgIDogJztcXG4nXG4gICAgKSArXG4gICAgc291cmNlICtcbiAgICAncmV0dXJuIF9fcFxcbn0nO1xuXG4gIHZhciByZXN1bHQgPSBhdHRlbXB0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBGdW5jdGlvbihpbXBvcnRzS2V5cywgc291cmNlVVJMICsgJ3JldHVybiAnICsgc291cmNlKVxuICAgICAgLmFwcGx5KHVuZGVmaW5lZCwgaW1wb3J0c1ZhbHVlcyk7XG4gIH0pO1xuXG4gIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uJ3Mgc291cmNlIGJ5IGl0cyBgdG9TdHJpbmdgIG1ldGhvZCBvclxuICAvLyB0aGUgYHNvdXJjZWAgcHJvcGVydHkgYXMgYSBjb252ZW5pZW5jZSBmb3IgaW5saW5pbmcgY29tcGlsZWQgdGVtcGxhdGVzLlxuICByZXN1bHQuc291cmNlID0gc291cmNlO1xuICBpZiAoaXNFcnJvcihyZXN1bHQpKSB7XG4gICAgdGhyb3cgcmVzdWx0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUVhY2g7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUZvcjtcbiIsImltcG9ydCBjcmVhdGVCYXNlRm9yIGZyb20gJy4vX2NyZWF0ZUJhc2VGb3IuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGb3I7XG4iLCJpbXBvcnQgYmFzZUZvciBmcm9tICcuL19iYXNlRm9yLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZvck93bjtcbiIsImltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUVhY2g7XG4iLCJpbXBvcnQgYmFzZUZvck93biBmcm9tICcuL19iYXNlRm9yT3duLmpzJztcbmltcG9ydCBjcmVhdGVCYXNlRWFjaCBmcm9tICcuL19jcmVhdGVCYXNlRWFjaC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRWFjaDtcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGBpZGVudGl0eWAgaWYgaXQncyBub3QgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBjYXN0IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYXN0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nID8gdmFsdWUgOiBpZGVudGl0eTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FzdEZ1bmN0aW9uO1xuIiwiaW1wb3J0IGFycmF5RWFjaCBmcm9tICcuL19hcnJheUVhY2guanMnO1xuaW1wb3J0IGJhc2VFYWNoIGZyb20gJy4vX2Jhc2VFYWNoLmpzJztcbmltcG9ydCBjYXN0RnVuY3Rpb24gZnJvbSAnLi9fY2FzdEZ1bmN0aW9uLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIlxuICogcHJvcGVydHkgYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmBcbiAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICogQHNlZSBfLmZvckVhY2hSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZvckVhY2goWzEsIDJdLCBmdW5jdGlvbih2YWx1ZSkge1xuICogICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgYDFgIHRoZW4gYDJgLlxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlFYWNoIDogYmFzZUVhY2g7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGNhc3RGdW5jdGlvbihpdGVyYXRlZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JFYWNoO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVDbGVhcjtcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzb2NJbmRleE9mO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICAtLXRoaXMuc2l6ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBhc3NvY0luZGV4T2YgZnJvbSAnLi9fYXNzb2NJbmRleE9mLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlR2V0O1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlSGFzO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgICsrdGhpcy5zaXplO1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZVNldDtcbiIsImltcG9ydCBsaXN0Q2FjaGVDbGVhciBmcm9tICcuL19saXN0Q2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbGlzdENhY2hlRGVsZXRlIGZyb20gJy4vX2xpc3RDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbGlzdENhY2hlR2V0IGZyb20gJy4vX2xpc3RDYWNoZUdldC5qcyc7XG5pbXBvcnQgbGlzdENhY2hlSGFzIGZyb20gJy4vX2xpc3RDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbGlzdENhY2hlU2V0IGZyb20gJy4vX2xpc3RDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdENhY2hlO1xuIiwiaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0NsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIHJlc3VsdCA9IGRhdGFbJ2RlbGV0ZSddKGtleSk7XG5cbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0RlbGV0ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tHZXQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0hhcztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgTWFwO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVDcmVhdGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoRGVsZXRlO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hHZXQ7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEhhcztcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hTZXQ7XG4iLCJpbXBvcnQgaGFzaENsZWFyIGZyb20gJy4vX2hhc2hDbGVhci5qcyc7XG5pbXBvcnQgaGFzaERlbGV0ZSBmcm9tICcuL19oYXNoRGVsZXRlLmpzJztcbmltcG9ydCBoYXNoR2V0IGZyb20gJy4vX2hhc2hHZXQuanMnO1xuaW1wb3J0IGhhc2hIYXMgZnJvbSAnLi9faGFzaEhhcy5qcyc7XG5pbXBvcnQgaGFzaFNldCBmcm9tICcuL19oYXNoU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IEhhc2g7XG4iLCJpbXBvcnQgSGFzaCBmcm9tICcuL19IYXNoLmpzJztcbmltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUNsZWFyO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleWFibGU7XG4iLCJpbXBvcnQgaXNLZXlhYmxlIGZyb20gJy4vX2lzS2V5YWJsZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TWFwRGF0YTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVEZWxldGU7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUdldDtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUhhcztcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlU2V0O1xuIiwiaW1wb3J0IG1hcENhY2hlQ2xlYXIgZnJvbSAnLi9fbWFwQ2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVEZWxldGUgZnJvbSAnLi9fbWFwQ2FjaGVEZWxldGUuanMnO1xuaW1wb3J0IG1hcENhY2hlR2V0IGZyb20gJy4vX21hcENhY2hlR2V0LmpzJztcbmltcG9ydCBtYXBDYWNoZUhhcyBmcm9tICcuL19tYXBDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVTZXQgZnJvbSAnLi9fbWFwQ2FjaGVTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTWFwQ2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tTZXQ7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgc3RhY2tDbGVhciBmcm9tICcuL19zdGFja0NsZWFyLmpzJztcbmltcG9ydCBzdGFja0RlbGV0ZSBmcm9tICcuL19zdGFja0RlbGV0ZS5qcyc7XG5pbXBvcnQgc3RhY2tHZXQgZnJvbSAnLi9fc3RhY2tHZXQuanMnO1xuaW1wb3J0IHN0YWNrSGFzIGZyb20gJy4vX3N0YWNrSGFzLmpzJztcbmltcG9ydCBzdGFja1NldCBmcm9tICcuL19zdGFja1NldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XG4iLCJpbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhc3NpZ25WYWx1ZWAgZXhjZXB0IHRoYXQgaXQgZG9lc24ndCBhc3NpZ25cbiAqIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWVxKG9iamVjdFtrZXldLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbk1lcmdlVmFsdWU7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgYWxsb2NVbnNhZmUgPSBCdWZmZXIgPyBCdWZmZXIuYWxsb2NVbnNhZmUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhbGxvY1Vuc2FmZSA/IGFsbG9jVW5zYWZlKGxlbmd0aCkgOiBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVCdWZmZXI7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgVWludDhBcnJheTtcbiIsImltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsb25lQXJyYXlCdWZmZXI7XG4iLCJpbXBvcnQgY2xvbmVBcnJheUJ1ZmZlciBmcm9tICcuL19jbG9uZUFycmF5QnVmZmVyLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcHlBcnJheTtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgIGlmICghaXNPYmplY3QocHJvdG8pKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGlmIChvYmplY3RDcmVhdGUpIHtcbiAgICAgIHJldHVybiBvYmplY3RDcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG87XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUNyZWF0ZTtcbiIsImltcG9ydCBiYXNlQ3JlYXRlIGZyb20gJy4vX2Jhc2VDcmVhdGUuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Q2xvbmVPYmplY3Q7XG4iLCJpbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZU9iamVjdDtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAsIHVubGVzcyBga2V5YCBpcyBcIl9fcHJvdG9fX1wiLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc2FmZUdldChvYmplY3QsIGtleSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzYWZlR2V0O1xuIiwiaW1wb3J0IGNvcHlPYmplY3QgZnJvbSAnLi9fY29weU9iamVjdC5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nXG4gKiBrZXllZCBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3QodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1BsYWluT2JqZWN0O1xuIiwiaW1wb3J0IGFzc2lnbk1lcmdlVmFsdWUgZnJvbSAnLi9fYXNzaWduTWVyZ2VWYWx1ZS5qcyc7XG5pbXBvcnQgY2xvbmVCdWZmZXIgZnJvbSAnLi9fY2xvbmVCdWZmZXIuanMnO1xuaW1wb3J0IGNsb25lVHlwZWRBcnJheSBmcm9tICcuL19jbG9uZVR5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGNvcHlBcnJheSBmcm9tICcuL19jb3B5QXJyYXkuanMnO1xuaW1wb3J0IGluaXRDbG9uZU9iamVjdCBmcm9tICcuL19pbml0Q2xvbmVPYmplY3QuanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0FycmF5TGlrZU9iamVjdCBmcm9tICcuL2lzQXJyYXlMaWtlT2JqZWN0LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICcuL2lzUGxhaW5PYmplY3QuanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgc2FmZUdldCBmcm9tICcuL19zYWZlR2V0LmpzJztcbmltcG9ydCB0b1BsYWluT2JqZWN0IGZyb20gJy4vdG9QbGFpbk9iamVjdC5qcyc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBzYWZlR2V0KG9iamVjdCwga2V5KSxcbiAgICAgIHNyY1ZhbHVlID0gc2FmZUdldChzb3VyY2UsIGtleSksXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgdmFyIGlzQXJyID0gaXNBcnJheShzcmNWYWx1ZSksXG4gICAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiBpc0J1ZmZlcihzcmNWYWx1ZSksXG4gICAgICAgIGlzVHlwZWQgPSAhaXNBcnIgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpO1xuXG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnIgfHwgaXNCdWZmIHx8IGlzVHlwZWQpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQnVmZikge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lQnVmZmVyKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzVHlwZWQpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZVR5cGVkQXJyYXkoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gW107XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIGlmIChpc0FyZ3VtZW50cyhvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0b1BsYWluT2JqZWN0KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc09iamVjdChvYmpWYWx1ZSkgfHwgaXNGdW5jdGlvbihvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpbml0Q2xvbmVPYmplY3Qoc3JjVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgfVxuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNZXJnZURlZXA7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGFzc2lnbk1lcmdlVmFsdWUgZnJvbSAnLi9fYXNzaWduTWVyZ2VWYWx1ZS5qcyc7XG5pbXBvcnQgYmFzZUZvciBmcm9tICcuL19iYXNlRm9yLmpzJztcbmltcG9ydCBiYXNlTWVyZ2VEZWVwIGZyb20gJy4vX2Jhc2VNZXJnZURlZXAuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5pbXBvcnQgc2FmZUdldCBmcm9tICcuL19zYWZlR2V0LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGJhc2VGb3Ioc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKHNhZmVHZXQob2JqZWN0LCBrZXkpLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0sIGtleXNJbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNZXJnZTtcbiIsImltcG9ydCBiYXNlTWVyZ2UgZnJvbSAnLi9fYmFzZU1lcmdlLmpzJztcbmltcG9ydCBjcmVhdGVBc3NpZ25lciBmcm9tICcuL19jcmVhdGVBc3NpZ25lci5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZTtcbiIsImltcG9ydCBiYXNlVmFsdWVzIGZyb20gJy4vX2Jhc2VWYWx1ZXMuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbHVlcztcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuaW1wb3J0IHNldENhY2hlQWRkIGZyb20gJy4vX3NldENhY2hlQWRkLmpzJztcbmltcG9ydCBzZXRDYWNoZUhhcyBmcm9tICcuL19zZXRDYWNoZUhhcy5qcyc7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID09IG51bGwgPyAwIDogdmFsdWVzLmxlbmd0aDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuZXhwb3J0IGRlZmF1bHQgU2V0Q2FjaGU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheVNvbWU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FjaGVIYXM7XG4iLCJpbXBvcnQgU2V0Q2FjaGUgZnJvbSAnLi9fU2V0Q2FjaGUuanMnO1xuaW1wb3J0IGFycmF5U29tZSBmcm9tICcuL19hcnJheVNvbWUuanMnO1xuaW1wb3J0IGNhY2hlSGFzIGZyb20gJy4vX2NhY2hlSGFzLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxBcnJheXM7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0VG9BcnJheTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBtYXBUb0FycmF5IGZyb20gJy4vX21hcFRvQXJyYXkuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsQnlUYWc7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5UHVzaDtcbiIsImltcG9ydCBhcnJheVB1c2ggZnJvbSAnLi9fYXJyYXlQdXNoLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldEFsbEtleXM7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5maWx0ZXJgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlGaWx0ZXIoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0W3Jlc0luZGV4KytdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5RmlsdGVyO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkFycmF5O1xuIiwiaW1wb3J0IGFycmF5RmlsdGVyIGZyb20gJy4vX2FycmF5RmlsdGVyLmpzJztcbmltcG9ydCBzdHViQXJyYXkgZnJvbSAnLi9zdHViQXJyYXkuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9ICFuYXRpdmVHZXRTeW1ib2xzID8gc3R1YkFycmF5IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGFycmF5RmlsdGVyKG5hdGl2ZUdldFN5bWJvbHMob2JqZWN0KSwgZnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBzeW1ib2wpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFN5bWJvbHM7XG4iLCJpbXBvcnQgYmFzZUdldEFsbEtleXMgZnJvbSAnLi9fYmFzZUdldEFsbEtleXMuanMnO1xuaW1wb3J0IGdldFN5bWJvbHMgZnJvbSAnLi9fZ2V0U3ltYm9scy5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRBbGxLZXlzO1xuIiwiaW1wb3J0IGdldEFsbEtleXMgZnJvbSAnLi9fZ2V0QWxsS2V5cy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbE9iamVjdHM7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5leHBvcnQgZGVmYXVsdCBEYXRhVmlldztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5leHBvcnQgZGVmYXVsdCBTZXQ7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgV2Vha01hcDtcbiIsImltcG9ydCBEYXRhVmlldyBmcm9tICcuL19EYXRhVmlldy5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuL19Qcm9taXNlLmpzJztcbmltcG9ydCBTZXQgZnJvbSAnLi9fU2V0LmpzJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy4vX1dlYWtNYXAuanMnO1xuaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUYWc7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBlcXVhbEJ5VGFnIGZyb20gJy4vX2VxdWFsQnlUYWcuanMnO1xuaW1wb3J0IGVxdWFsT2JqZWN0cyBmcm9tICcuL19lcXVhbE9iamVjdHMuanMnO1xuaW1wb3J0IGdldFRhZyBmcm9tICcuL19nZXRUYWcuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzRXF1YWxEZWVwO1xuIiwiaW1wb3J0IGJhc2VJc0VxdWFsRGVlcCBmcm9tICcuL19iYXNlSXNFcXVhbERlZXAuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNFcXVhbDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTWF0Y2g7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwiaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIHJlc3VsdFtsZW5ndGhdID0gW2tleSwgdmFsdWUsIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE1hdGNoRGF0YTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGU7XG4iLCJpbXBvcnQgYmFzZUlzTWF0Y2ggZnJvbSAnLi9fYmFzZUlzTWF0Y2guanMnO1xuaW1wb3J0IGdldE1hdGNoRGF0YSBmcm9tICcuL19nZXRNYXRjaERhdGEuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXRjaGVzO1xuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleTtcbiIsImltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBjbGVhcmAsIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAhPSBudWxsICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJy4vbWVtb2l6ZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBtYXhpbXVtIG1lbW9pemUgY2FjaGUgc2l6ZS4gKi9cbnZhciBNQVhfTUVNT0laRV9TSVpFID0gNTAwO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tZW1vaXplYCB3aGljaCBjbGVhcnMgdGhlIG1lbW9pemVkIGZ1bmN0aW9uJ3NcbiAqIGNhY2hlIHdoZW4gaXQgZXhjZWVkcyBgTUFYX01FTU9JWkVfU0laRWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtZW1vaXplQ2FwcGVkKGZ1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IG1lbW9pemUoZnVuYywgZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKGNhY2hlLnNpemUgPT09IE1BWF9NRU1PSVpFX1NJWkUpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH0pO1xuXG4gIHZhciBjYWNoZSA9IHJlc3VsdC5jYWNoZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZUNhcHBlZDtcbiIsImltcG9ydCBtZW1vaXplQ2FwcGVkIGZyb20gJy4vX21lbW9pemVDYXBwZWQuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHN0cmluZy5jaGFyQ29kZUF0KDApID09PSA0NiAvKiAuICovKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN1YlN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1RvUGF0aDtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IHN0cmluZ1RvUGF0aCBmcm9tICcuL19zdHJpbmdUb1BhdGguanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzS2V5KHZhbHVlLCBvYmplY3QpID8gW3ZhbHVlXSA6IHN0cmluZ1RvUGF0aCh0b1N0cmluZyh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0UGF0aDtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvS2V5O1xuIiwiaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXQ7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXQ7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzSW4ob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUhhc0luO1xuIiwiaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCB8fCArK2luZGV4ICE9IGxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogb2JqZWN0Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNQYXRoO1xuIiwiaW1wb3J0IGJhc2VIYXNJbiBmcm9tICcuL19iYXNlSGFzSW4uanMnO1xuaW1wb3J0IGhhc1BhdGggZnJvbSAnLi9faGFzUGF0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzSW47XG4iLCJpbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuaW1wb3J0IGdldCBmcm9tICcuL2dldC5qcyc7XG5pbXBvcnQgaGFzSW4gZnJvbSAnLi9oYXNJbi5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNyY1ZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSh0b0tleShwYXRoKSwgc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBnZXQob2JqZWN0LCBwYXRoKTtcbiAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICA6IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgfCBDT01QQVJFX1VOT1JERVJFRF9GTEFHKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hdGNoZXNQcm9wZXJ0eTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eTtcbiIsImltcG9ydCBiYXNlR2V0IGZyb20gJy4vX2Jhc2VHZXQuanMnO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVByb3BlcnR5RGVlcDtcbiIsImltcG9ydCBiYXNlUHJvcGVydHkgZnJvbSAnLi9fYmFzZVByb3BlcnR5LmpzJztcbmltcG9ydCBiYXNlUHJvcGVydHlEZWVwIGZyb20gJy4vX2Jhc2VQcm9wZXJ0eURlZXAuanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IDIgfSB9LFxuICogICB7ICdhJzogeyAnYic6IDEgfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYicpKTtcbiAqIC8vID0+IFsyLCAxXVxuICpcbiAqIF8ubWFwKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InXSkpLCAnYS5iJyk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvcGVydHk7XG4iLCJpbXBvcnQgYmFzZU1hdGNoZXMgZnJvbSAnLi9fYmFzZU1hdGNoZXMuanMnO1xuaW1wb3J0IGJhc2VNYXRjaGVzUHJvcGVydHkgZnJvbSAnLi9fYmFzZU1hdGNoZXNQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJy4vcHJvcGVydHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICovXG5mdW5jdGlvbiBiYXNlSXRlcmF0ZWUodmFsdWUpIHtcbiAgLy8gRG9uJ3Qgc3RvcmUgdGhlIGB0eXBlb2ZgIHJlc3VsdCBpbiBhIHZhcmlhYmxlIHRvIGF2b2lkIGEgSklUIGJ1ZyBpbiBTYWZhcmkgOS5cbiAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICA6IGJhc2VNYXRjaGVzKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXRlcmF0ZWU7XG4iLCJpbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hcGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlTWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBBcnJheShjb2xsZWN0aW9uLmxlbmd0aCkgOiBbXTtcblxuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gaXRlcmF0ZWUodmFsdWUsIGtleSwgY29sbGVjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWFwO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zb3J0QnlgIHdoaWNoIHVzZXMgYGNvbXBhcmVyYCB0byBkZWZpbmUgdGhlXG4gKiBzb3J0IG9yZGVyIG9mIGBhcnJheWAgYW5kIHJlcGxhY2VzIGNyaXRlcmlhIG9iamVjdHMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyZXIgVGhlIGZ1bmN0aW9uIHRvIGRlZmluZSBzb3J0IG9yZGVyLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTb3J0QnkoYXJyYXksIGNvbXBhcmVyKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgYXJyYXkuc29ydChjb21wYXJlcik7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGFycmF5W2xlbmd0aF0gPSBhcnJheVtsZW5ndGhdLnZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNvcnRCeTtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqXG4gKiBDb21wYXJlcyB2YWx1ZXMgdG8gc29ydCB0aGVtIGluIGFzY2VuZGluZyBvcmRlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYHZhbHVlYC5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUFzY2VuZGluZyh2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKHZhbHVlICE9PSBvdGhlcikge1xuICAgIHZhciB2YWxJc0RlZmluZWQgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgICB2YWxJc051bGwgPSB2YWx1ZSA9PT0gbnVsbCxcbiAgICAgICAgdmFsSXNSZWZsZXhpdmUgPSB2YWx1ZSA9PT0gdmFsdWUsXG4gICAgICAgIHZhbElzU3ltYm9sID0gaXNTeW1ib2wodmFsdWUpO1xuXG4gICAgdmFyIG90aElzRGVmaW5lZCA9IG90aGVyICE9PSB1bmRlZmluZWQsXG4gICAgICAgIG90aElzTnVsbCA9IG90aGVyID09PSBudWxsLFxuICAgICAgICBvdGhJc1JlZmxleGl2ZSA9IG90aGVyID09PSBvdGhlcixcbiAgICAgICAgb3RoSXNTeW1ib2wgPSBpc1N5bWJvbChvdGhlcik7XG5cbiAgICBpZiAoKCFvdGhJc051bGwgJiYgIW90aElzU3ltYm9sICYmICF2YWxJc1N5bWJvbCAmJiB2YWx1ZSA+IG90aGVyKSB8fFxuICAgICAgICAodmFsSXNTeW1ib2wgJiYgb3RoSXNEZWZpbmVkICYmIG90aElzUmVmbGV4aXZlICYmICFvdGhJc051bGwgJiYgIW90aElzU3ltYm9sKSB8fFxuICAgICAgICAodmFsSXNOdWxsICYmIG90aElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgKCF2YWxJc0RlZmluZWQgJiYgb3RoSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICF2YWxJc1JlZmxleGl2ZSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmICgoIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wgJiYgIW90aElzU3ltYm9sICYmIHZhbHVlIDwgb3RoZXIpIHx8XG4gICAgICAgIChvdGhJc1N5bWJvbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUgJiYgIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wpIHx8XG4gICAgICAgIChvdGhJc051bGwgJiYgdmFsSXNEZWZpbmVkICYmIHZhbElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAoIW90aElzRGVmaW5lZCAmJiB2YWxJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgIW90aElzUmVmbGV4aXZlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wYXJlQXNjZW5kaW5nO1xuIiwiaW1wb3J0IGNvbXBhcmVBc2NlbmRpbmcgZnJvbSAnLi9fY29tcGFyZUFzY2VuZGluZy5qcyc7XG5cbi8qKlxuICogVXNlZCBieSBgXy5vcmRlckJ5YCB0byBjb21wYXJlIG11bHRpcGxlIHByb3BlcnRpZXMgb2YgYSB2YWx1ZSB0byBhbm90aGVyXG4gKiBhbmQgc3RhYmxlIHNvcnQgdGhlbS5cbiAqXG4gKiBJZiBgb3JkZXJzYCBpcyB1bnNwZWNpZmllZCwgYWxsIHZhbHVlcyBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLFxuICogc3BlY2lmeSBhbiBvcmRlciBvZiBcImRlc2NcIiBmb3IgZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlclxuICogb2YgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbltdfHN0cmluZ1tdfSBvcmRlcnMgVGhlIG9yZGVyIHRvIHNvcnQgYnkgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBvYmpDcml0ZXJpYSA9IG9iamVjdC5jcml0ZXJpYSxcbiAgICAgIG90aENyaXRlcmlhID0gb3RoZXIuY3JpdGVyaWEsXG4gICAgICBsZW5ndGggPSBvYmpDcml0ZXJpYS5sZW5ndGgsXG4gICAgICBvcmRlcnNMZW5ndGggPSBvcmRlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbXBhcmVBc2NlbmRpbmcob2JqQ3JpdGVyaWFbaW5kZXhdLCBvdGhDcml0ZXJpYVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChpbmRleCA+PSBvcmRlcnNMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHZhciBvcmRlciA9IG9yZGVyc1tpbmRleF07XG4gICAgICByZXR1cm4gcmVzdWx0ICogKG9yZGVyID09ICdkZXNjJyA/IC0xIDogMSk7XG4gICAgfVxuICB9XG4gIC8vIEZpeGVzIGFuIGBBcnJheSNzb3J0YCBidWcgaW4gdGhlIEpTIGVuZ2luZSBlbWJlZGRlZCBpbiBBZG9iZSBhcHBsaWNhdGlvbnNcbiAgLy8gdGhhdCBjYXVzZXMgaXQsIHVuZGVyIGNlcnRhaW4gY2lyY3Vtc3RhbmNlcywgdG8gcHJvdmlkZSB0aGUgc2FtZSB2YWx1ZSBmb3JcbiAgLy8gYG9iamVjdGAgYW5kIGBvdGhlcmAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvcHVsbC8xMjQ3XG4gIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBlbnN1cmVzIGEgc3RhYmxlIHNvcnQgaW4gVjggYW5kIG90aGVyIGVuZ2luZXMuXG4gIC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD05MCBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gb2JqZWN0LmluZGV4IC0gb3RoZXIuaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBhcmVNdWx0aXBsZTtcbiIsImltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgYmFzZU1hcCBmcm9tICcuL19iYXNlTWFwLmpzJztcbmltcG9ydCBiYXNlU29ydEJ5IGZyb20gJy4vX2Jhc2VTb3J0QnkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IGNvbXBhcmVNdWx0aXBsZSBmcm9tICcuL19jb21wYXJlTXVsdGlwbGUuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm9yZGVyQnlgIHdpdGhvdXQgcGFyYW0gZ3VhcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IGl0ZXJhdGVlcyBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcmRlcnMgVGhlIHNvcnQgb3JkZXJzIG9mIGBpdGVyYXRlZXNgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgc29ydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlT3JkZXJCeShjb2xsZWN0aW9uLCBpdGVyYXRlZXMsIG9yZGVycykge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaXRlcmF0ZWVzID0gYXJyYXlNYXAoaXRlcmF0ZWVzLmxlbmd0aCA/IGl0ZXJhdGVlcyA6IFtpZGVudGl0eV0sIGJhc2VVbmFyeShiYXNlSXRlcmF0ZWUpKTtcblxuICB2YXIgcmVzdWx0ID0gYmFzZU1hcChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGNyaXRlcmlhID0gYXJyYXlNYXAoaXRlcmF0ZWVzLCBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGl0ZXJhdGVlKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyAnY3JpdGVyaWEnOiBjcml0ZXJpYSwgJ2luZGV4JzogKytpbmRleCwgJ3ZhbHVlJzogdmFsdWUgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJhc2VTb3J0QnkocmVzdWx0LCBmdW5jdGlvbihvYmplY3QsIG90aGVyKSB7XG4gICAgcmV0dXJuIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU9yZGVyQnk7XG4iLCJpbXBvcnQgYmFzZU9yZGVyQnkgZnJvbSAnLi9fYmFzZU9yZGVyQnkuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNvcnRCeWAgZXhjZXB0IHRoYXQgaXQgYWxsb3dzIHNwZWNpZnlpbmcgdGhlIHNvcnRcbiAqIG9yZGVycyBvZiB0aGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuIElmIGBvcmRlcnNgIGlzIHVuc3BlY2lmaWVkLCBhbGwgdmFsdWVzXG4gKiBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLCBzcGVjaWZ5IGFuIG9yZGVyIG9mIFwiZGVzY1wiIGZvclxuICogZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlciBvZiBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtBcnJheVtdfEZ1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IFtpdGVyYXRlZXM9W18uaWRlbnRpdHldXVxuICogIFRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IFtvcmRlcnNdIFRoZSBzb3J0IG9yZGVycyBvZiBgaXRlcmF0ZWVzYC5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLnJlZHVjZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzb3J0ZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDggfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzQgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAgfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICogXTtcbiAqXG4gKiAvLyBTb3J0IGJ5IGB1c2VyYCBpbiBhc2NlbmRpbmcgb3JkZXIgYW5kIGJ5IGBhZ2VgIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gKiBfLm9yZGVyQnkodXNlcnMsIFsndXNlcicsICdhZ2UnXSwgWydhc2MnLCAnZGVzYyddKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFtbJ2Jhcm5leScsIDM2XSwgWydiYXJuZXknLCAzNF0sIFsnZnJlZCcsIDQ4XSwgWydmcmVkJywgNDBdXVxuICovXG5mdW5jdGlvbiBvcmRlckJ5KGNvbGxlY3Rpb24sIGl0ZXJhdGVlcywgb3JkZXJzLCBndWFyZCkge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNBcnJheShpdGVyYXRlZXMpKSB7XG4gICAgaXRlcmF0ZWVzID0gaXRlcmF0ZWVzID09IG51bGwgPyBbXSA6IFtpdGVyYXRlZXNdO1xuICB9XG4gIG9yZGVycyA9IGd1YXJkID8gdW5kZWZpbmVkIDogb3JkZXJzO1xuICBpZiAoIWlzQXJyYXkob3JkZXJzKSkge1xuICAgIG9yZGVycyA9IG9yZGVycyA9PSBudWxsID8gW10gOiBbb3JkZXJzXTtcbiAgfVxuICByZXR1cm4gYmFzZU9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvcmRlckJ5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGaW5kSW5kZXg7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNOYU47XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmRleE9mYCB3aGljaCBwZXJmb3JtcyBzdHJpY3QgZXF1YWxpdHlcbiAqIGNvbXBhcmlzb25zIG9mIHZhbHVlcywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmljdEluZGV4T2Y7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUluY2x1ZGVzV2l0aDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vb3A7XG4iLCJpbXBvcnQgU2V0IGZyb20gJy4vX1NldC5qcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuL25vb3AuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IF90ZW1wbGF0ZSBmcm9tICdsb2Rhc2gtZXMvdGVtcGxhdGUnO1xuaW1wb3J0IF9mb3JFYWNoIGZyb20gJ2xvZGFzaC1lcy9mb3JFYWNoJztcbmltcG9ydCBfbWVyZ2UgZnJvbSAnbG9kYXNoLWVzL21lcmdlJztcbmltcG9ydCBfdmFsdWVzIGZyb20gJ2xvZGFzaC1lcy92YWx1ZXMnO1xuaW1wb3J0IF9vcmRlckJ5IGZyb20gJ2xvZGFzaC1lcy9vcmRlckJ5JztcbmltcG9ydCBfdW5pcUJ5IGZyb20gJ2xvZGFzaC1lcy91bmlxQnknO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEZlZWQge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHQgPSBGZWVkLmRlZmF1bHQ7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IF9tZXJnZSh7fSwgRmVlZC5kZWZhdWx0LCBjb25maWcpO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1vZHVsZVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICBsZXQgZGF0YSA9IFtdO1xuICAgIGxldCBmZWVkID0gdGhpcy5fc2V0dGluZ3MuZmVlZDtcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgcnNzVG9Kc29uOiBGZWVkLnJzc1RvSnNvbixcbiAgICAgIHJzc1VybDogKEFycmF5LmlzQXJyYXkoZmVlZCkpID8gZmVlZCA6IFtmZWVkXVxuICAgIH07XG5cbiAgICAvLyBHbyB0aHJvdWdoIGVhY2ggZmVlZFxuICAgIF9mb3JFYWNoKGNvbmZpZy5yc3NVcmwsICh1cmwsIGluZGV4KSA9PiB7XG4gICAgICAvLyBNYWtlIHRoZSByZXF1ZXN0XG4gICAgICB0aGlzLl9yZXF1ZXN0KGNvbmZpZywgdXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGRhdGFcbiAgICAgICAgICBkYXRhLnB1c2godGhpcy5fcHJvY2VzcyhKU09OLnBhcnNlKHJlc3BvbnNlKSwgdGhpcy5fc2V0dGluZ3MpKTtcbiAgICAgICAgICAvLyBXaGVuIGFsbCBmZWVkcyBoYXZlIGJlZW4gcmVxdWVzdGVkLCBtZXJnZSB0aGUgZGF0YSBhbmQgY29tcGlsZVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gY29uZmlnLnJzc1VybC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX21lcmdlKGRhdGEsIHRoaXMuX3NldHRpbmdzKTtcblxuICAgICAgICAgICAgbGV0IGNvbXBpbGVkID0gdGhpcy5fcmVuZGVyKFxuICAgICAgICAgICAgICB0aGlzLl9tZXJnZShkYXRhLCB0aGlzLl9zZXR0aW5ncyksXG4gICAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuX3NldHRpbmdzLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChlbCkgZWwuaW5uZXJIVE1MID0gY29tcGlsZWQ7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gWEhSIHJlcXVlc3QgZm9yIHRoZSBmZWVkIGRhdGFcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgVGhlIHJlcXVlc3QgZGF0YVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHVybCAgICBUaGUgcmVxdWVzdCB1cmxcbiAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgUmVzb2x2ZXMgd2hlbiB0aGUgcmVzcG9uc2UgaXMgcmVhZHksIHJlamVjdHMgd2hlblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgb3BlcmF0aW9uIHRpbWVzIG91dCBvciB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICovXG4gIF9yZXF1ZXN0KGNvbmZpZywgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBsZXQgX3hociA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKF94aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIGlmIChfeGhyLnN0YXR1cyA+PSAyMDAgJiYgX3hoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoX3hoci5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoX3hoci5zdGF0dXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RoZSBGZWVkIHJlcXVlc3QgdGltZWQgb3V0JykpO1xuICAgICAgfTtcbiAgICAgIHhoci5vcGVuKCdHRVQnLCBgJHtjb25maWcucnNzVG9Kc29ufT9yc3NfdXJsPSR7dXJsfWAsIHRydWUpO1xuICAgICAgeGhyLnNlbmQoKTtcbiAgICAgIHhociA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBkYXRhIHRvIHRoZSBhcHByb3ByaWF0ZSBwcm9jZXNzaW5nIGZ1bmN0aW9uIGJhc2VkIG9uIHR5cGVcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIHByb2Nlc3NlZCBkYXRhXG4gICAqL1xuICBfcHJvY2VzcyhkYXRhLCBzZXR0aW5ncykge1xuICAgIHJldHVybiBGZWVkLnByb2Nlc3Nbc2V0dGluZ3MudHlwZV0oZGF0YSwgc2V0dGluZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZGF0YSB0byB0aGUgYXBwcm9wcmlhdGUgbWVyZ2UgZnVuY3Rpb24gYmFzZWQgb24gdHlwZVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgICAgIFRoZSByZXF1ZXN0ZWQgZmVlZCBkYXRhIHRvIHBhc3NcbiAgICogQHBhcmFtICB7b2JqZWN0fSBzZXR0aW5ncyBUaGUgYXBwbGljYXRpb24gc2V0dGluZ3NcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgbWVyZ2VkIGZlZWQgZGF0YVxuICAgKi9cbiAgX21lcmdlKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgcmV0dXJuIEZlZWQubWVyZ2Vbc2V0dGluZ3MudHlwZV0oZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZSB0ZW1wbGF0ZSBjb21wb25lbnRzLCBwYXNzIGRhdGEsIGFuZCByZXR1cm4gY29tcGlsZWQgdGVtbGF0ZVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgICAgIFRoZSByZXF1ZXN0ZWQgZmVlZCBkYXRhIHRvIHBhc3NcbiAgICogQHBhcmFtICB7b2JqZWN0fSBzZXR0aW5ncyBUaGUgYXBwbGljYXRpb24gc2V0dGluZ3NcbiAgICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICBUaGUgY29tcGxpZWQgaHRtbCBzdHJpbmdcbiAgICovXG4gIF9yZW5kZXIoZGF0YSwgc2V0dGluZ3MpIHtcbiAgICBkYXRhLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICBpZiAoc2V0dGluZ3MubG9nKVxuICAgICAgY29uc29sZS5kaXIoZGF0YSk7XG5cbiAgICBsZXQgdGVtcGxhdGUgPSBfdmFsdWVzKHNldHRpbmdzLnRlbXBsYXRlcykuam9pbignJyk7XG4gICAgbGV0IGNvbXBpbGVkID0gX3RlbXBsYXRlKFxuICAgICAgdGVtcGxhdGUsXG4gICAgICB7XG4gICAgICAgICdpbXBvcnRzJzoge1xuICAgICAgICAgICdfZWFjaCc6IF9mb3JFYWNoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiBjb21waWxlZChkYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIEFuIG9wZW4gUlNTIHRvIEpTT04gYXBpLCBzZWUgaHR0cHM6Ly9yc3MyanNvbi5jb21cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbkZlZWQucnNzVG9Kc29uID0gJ2h0dHBzOi8vYXBpLnJzczJqc29uLmNvbS92MS9hcGkuanNvbic7XG5cbi8qKlxuICogVGhlIHRlbXBsYXRlIGZvciB0aGUgd2lkZ2V0LlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuRmVlZC50ZW1wbGF0ZXMgPSB7XG4gIG1lZGl1bToge1xuICAgIG9wZW5lcjogW1xuICAgICAgJzxzZWN0aW9uIGNsYXNzPVwiby1mZWVkIDwlLSBzZXR0aW5ncy5jbGFzc2VzLndyYXBwZXIgJT5cIiBzdHlsZT1cIicsXG4gICAgICAgICc8JSBpZiAoc2V0dGluZ3MuZm9udFNpemUpIHsgJT5mb250LXNpemU6IDwlLSBzZXR0aW5ncy5mb250U2l6ZSAlPjs8JSB9ICU+JyxcbiAgICAgICAgJzwlIGlmIChzZXR0aW5ncy5wb3N0Qm9yZGVyQ29sb3IpIHsgJT5ib3JkZXItY29sb3I6IDwlLSBzZXR0aW5ncy5wb3N0Qm9yZGVyQ29sb3IgJT47PCUgfSAlPicsXG4gICAgICAnXCI+J1xuICAgIF0sXG4gICAgaGVhZGVyOiBbXG4gICAgICAnPGhlYWRlciBjbGFzcz1cIm8tZmVlZF9faGVhZGVyIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmhlYWRlciAlPlwiPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiby1mZWVkX19hdmF0YXIgPCUtIHNldHRpbmdzLmNsYXNzZXMuYXZhdGFyICU+XCI+JyxcbiAgICAgICAgICAnPGltZyBzcmM9XCInLFxuICAgICAgICAgICAgICAgICc8JSBpZiAoc2V0dGluZ3MucHJvZmlsZUltZyAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAgICAgICAnPCUtIHNldHRpbmdzLnByb2ZpbGVJbWcgJT4nLFxuICAgICAgICAgICAgICAgICc8JSB9IGVsc2UgeyAlPicsXG4gICAgICAgICAgICAgICAgICAnPCUtIGZlZWQucHJvZmlsZUltZyAlPicsXG4gICAgICAgICAgICAgICAgJzwlIH0gJT5cIiAnLFxuICAgICAgICAgICAgICAgJ3dpZHRoPVwiPCUtIHNldHRpbmdzLnJhdGlvUHJvZmlsZVswXSAlPlwiICcsXG4gICAgICAgICAgICAgICAnaGVpZ2h0PVwiPCUtIHNldHRpbmdzLnJhdGlvUHJvZmlsZVsxXSAlPlwiPicsXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPGEgY2xhc3M9XCJvLWZlZWRfX3VybCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5hdmF0YXIgJT5cIiAnLFxuICAgICAgICAgICdocmVmPVwiPCUgaWYgKHNldHRpbmdzLnRpdGxlVXJsICE9PSBcIlwiKSB7ICU+JyxcbiAgICAgICAgICAgICc8JS0gc2V0dGluZ3MudGl0bGVVcmwgJT4nLFxuICAgICAgICAgICc8JSB9IGVsc2UgeyAlPicsXG4gICAgICAgICAgICAnPCUtIGZlZWQudXJsICU+JyxcbiAgICAgICAgICAnPCUgfSAlPlwiICcsXG4gICAgICAgICAgICd0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAnPCUgaWYgKHNldHRpbmdzLnRpdGxlICE9PSBcIlwiKSB7ICU+JyxcbiAgICAgICAgICAgICc8JS0gc2V0dGluZ3MudGl0bGUgJT4nLFxuICAgICAgICAgICc8JSB9IGVsc2UgeyAlPicsXG4gICAgICAgICAgICAnPCUtIGZlZWQudGl0bGUgJT4nLFxuICAgICAgICAgICc8JSB9ICU+JyxcbiAgICAgICAgJzwvYT4nLFxuICAgICAgJzwvaGVhZGVyPidcbiAgICBdLFxuICAgIHBvc3RzOiBbXG4gICAgICAnPGRpdiBjbGFzcz1cIm8tZmVlZF9faXRlbXNcIiBzdHlsZT1cIicsXG4gICAgICAgICdib3JkZXItY29sb3I6IDwlLSBzZXR0aW5ncy5wb3N0Qm9yZGVyQ29sb3IgJT47JyxcbiAgICAgICdcIj4nLFxuICAgICAgICAnPCUgX2VhY2goaXRlbXMsIGZ1bmN0aW9uKHBvc3QpIHsgJT4nLFxuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYy1mZWVkLWl0ZW0gPCUtIHNldHRpbmdzLmNsYXNzZXMuZmVlZEl0ZW0gJT5cIj4nLFxuICAgICAgICAgICAgJzxoNCBjbGFzcz1cImMtZmVlZC1pdGVtX190aXRsZSA8JS0gc2V0dGluZ3MuY2xhc3Nlcy50aXRsZSAlPlwiPicsXG4gICAgICAgICAgICAgICc8YSBjbGFzcz1cImMtZmVlZC1pdGVtX19saW5rIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmxpbmsgJT5cIicsXG4gICAgICAgICAgICAgICAgICdocmVmPVwiPCUtIHBvc3QuZ3VpZCAlPlwiJyxcbiAgICAgICAgICAgICAgICAgJ3RhcmdldD1cIl9ibGFua1wiJyxcbiAgICAgICAgICAgICAgICAgJ3JlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIj4nLFxuICAgICAgICAgICAgICAgICc8JS0gcG9zdC50aXRsZSAlPicsXG4gICAgICAgICAgICAgICc8L2E+JyxcbiAgICAgICAgICAgICc8L2g0PicsXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJjLWZlZWQtaXRlbV9fZGF0ZSA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5kYXRlICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgICd0aXRsZT1cIjwlLSBzZXR0aW5ncy5wb3N0RGF0ZVRpdGxlICU+XCI+JyxcbiAgICAgICAgICAgICAgJzwlLSBwb3N0LmRhdGUgJT4nLFxuICAgICAgICAgICAgJzwvc3Bhbj4nLFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjLWZlZWQtaXRlbV9fdGh1bWJuYWlsIDwlLSBzZXR0aW5ncy5jbGFzc2VzLnRodW1ibmFpbCAlPlwiJyxcbiAgICAgICAgICAgICAgICAgJ3N0eWxlPVwiJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2U6IHVybCg8JS0gcG9zdC50aHVtYm5haWwgJT4pOycsXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQ6IDwlLSBzZXR0aW5ncy5wb3N0SW1nSGVpZ2h0ICU+O1wiJyxcbiAgICAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuPVwidHJ1ZVwiPicsXG4gICAgICAgICAgICAgICc8aW1nIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBzcmM9XCI8JS0gcG9zdC50aHVtYm5haWwgJT5cIiBhbHQ9XCI8JS0gcG9zdC50aXRsZSAlPlwiPicsXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICc8cCBjbGFzcz1cImMtZmVlZC1pdGVtX19leGNlcnB0IDwlLSBzZXR0aW5ncy5jbGFzc2VzLmV4Y2VycHQgJT5cIj4nLFxuICAgICAgICAgICAgICAnPCUtIHBvc3QuZXhjZXJwdCAlPjwlLSBzZXR0aW5ncy5wb3N0RXhjZXJwdFRyYWlsICU+JyxcbiAgICAgICAgICAgICc8L3A+JyxcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2Zvb3RlciA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5pdGVtRm9vdGVyICU+XCI+JyxcbiAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2N0YSA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5jdGEgJT5cIiAnLFxuICAgICAgICAgICAgICAgICAnaHJlZj1cIjwlLSBwb3N0Lmd1aWQgJT5cIiAnLFxuICAgICAgICAgICAgICAgICAndGFyZ2V0PVwiX2JsYW5rXCIgJyxcbiAgICAgICAgICAgICAgICAgJ3JlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIj4nLFxuICAgICAgICAgICAgICAgICc8JS0gc2V0dGluZ3MucG9zdEN0YVRleHQgJT4nLFxuICAgICAgICAgICAgICAnPC9hPicsXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzwlIH0pOyAlPicsXG4gICAgICAnPC9kaXY+J1xuICAgIF0sXG4gICAgY2xvc2VyOiBbXG4gICAgICAnPC9zZWN0aW9uPidcbiAgICBdXG4gIH1cbn07XG5cbi8qKlxuICogRnVuY3Rpb25zIGZvciBwcm9jZXNzaW5nIHRoZSBkYXRhIGJhc2VkIG9uIHRoZSBmZWVkIHR5cGUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5GZWVkLnByb2Nlc3MgPSB7XG4gIG1lZGl1bTogZnVuY3Rpb24oZGF0YSwgc2V0dGluZ3MpIHtcbiAgICBsZXQgbGVuZ3RoID0gc2V0dGluZ3MucG9zdEV4Y2VycHRMZW5ndGg7XG5cbiAgICBfZm9yRWFjaChkYXRhLml0ZW1zLCBmdW5jdGlvbihwb3N0LCBpbmRleCkge1xuICAgICAgbGV0IGV4Y2VycHQgPSAnJztcbiAgICAgIGxldCBkYXRlID0gJyc7XG5cbiAgICAgIC8vIFJlbW92ZSBmaWd1cmVzIGZpcnN0XG4gICAgICBleGNlcnB0ID0gcG9zdC5kZXNjcmlwdGlvblxuICAgICAgICAucmVwbGFjZSgvPGZpZ3VyZS4qPi4qPzxcXC9maWd1cmU+L2csICcnKTtcblxuICAgICAgLy8gUmVtb3ZlIGFsbCB0YWdzXG4gICAgICBleGNlcnB0ID0gZXhjZXJwdC5yZXBsYWNlKC88KC58XFxuKSo/Pi9nLCAnJyk7XG5cbiAgICAgIC8vIFRyaW0gdGhlIGV4Y2VycHRcbiAgICAgIGV4Y2VycHQgPSBleGNlcnB0LnN1YnN0cigwLCBsZW5ndGgpO1xuICAgICAgZXhjZXJwdCA9IGV4Y2VycHQuc3Vic3RyKDAsXG4gICAgICAgIE1hdGgubWluKGV4Y2VycHQubGVuZ3RoLCBleGNlcnB0Lmxhc3RJbmRleE9mKCcgJykpXG4gICAgICApO1xuXG4gICAgICBwb3N0LmV4Y2VycHQgPSBleGNlcnB0O1xuXG4gICAgICAvLyBGb3JtYXQgdGhlIGRhdGVcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHBvc3QucHViRGF0ZS5yZXBsYWNlKCcgJywgJ1QnKSkpXG4gICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoc2V0dGluZ3MucG9zdERhdGVMb2NhbCwgc2V0dGluZ3MucG9zdERhdGVGb3JtYXQpO1xuXG4gICAgICBwb3N0LmRhdGUgPSBkYXRlO1xuXG4gICAgICByZXR1cm4gcG9zdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb25zIGZvciBtZXJnaW5nIHRoZSBkYXRhIGZlZWRzIHRvZ2V0aGVyLCBiYXNlZCBvbiB0aGUgZmVlZCB0eXBlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuRmVlZC5tZXJnZSA9IHtcbiAgbWVkaXVtOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IG1lcmdlZCA9IHt9O1xuICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgLy8gQ29tYmluZSB0aGUgcG9zdCBpdGVtc1xuICAgIGRhdGEuZm9yRWFjaCgoZmVlZCkgPT4ge1xuICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQoZmVlZC5pdGVtcyk7XG4gICAgfSk7XG5cbiAgICAvLyBNZXJnZSB0aGUgZGF0YSwgdGhpcyB3aWxsIG92ZXJyaWRlIHZhbHVlcywgaXQgcHJvYmFibHkgd29uJ3QgYmVcbiAgICAvLyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBmZWVkcyB0aGF0IGFyZSB0aGUgc2FtZSwgYnV0IHBvdGVudGlhbGx5XG4gICAgLy8gZGlmZmVyZW50IGZlZWQgdHlwZXMgY291bGQgdXNlIHRoaXMgYW5kIGNvbWJpbmUgdW5pcXVlIGRhdGFcbiAgICBkYXRhLmZvckVhY2goKGZlZWQpID0+IHtcbiAgICAgIG1lcmdlZCA9IF9tZXJnZShtZXJnZWQsIGZlZWQpO1xuICAgIH0pO1xuXG4gICAgLy8gR2V0IHVuaXF1ZSBwb3N0c1xuICAgIC8vIGl0ZW1zID0gX3VuaXFCeShpdGVtcywgKGl0ZW0pID0+IGl0ZW0uZ3VpZCk7XG5cbiAgICBtZXJnZWQuaXRlbXMgPSBfb3JkZXJCeShpdGVtcywgJ3B1YkRhdGUnLCAnZGVzYycpO1xuXG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBodHRwczovL3JzczJqc29uLmNvbS9kb2NzIGZvciBkZXRhaWxzIG9uIGRlZmF1bHQgcGFyYW1ldGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuRmVlZC5kZWZhdWx0ID0ge1xuICBmZWVkOiAnJyxcbiAgc2VsZWN0b3I6ICcjanMtZmVlZCcsXG4gIHR5cGU6ICdtZWRpdW0nLFxuICB0aXRsZTogJycsXG4gIHRpdGxlVXJsOiAnJyxcbiAgcHJvZmlsZUltZzogJycsXG4gIGZvbnRTaXplOiAnJyxcbiAgcmF0aW9Qcm9maWxlOiBbJzUwJywgJzUwJ10sXG4gIHBvc3RCb3JkZXJDb2xvcjogJ2xpZ2h0c3RlZWxibHVlJyxcbiAgcG9zdEltZ0hlaWdodDogJzIwMHB4JyxcbiAgcG9zdEV4Y2VycHRMZW5ndGg6IDEyMCxcbiAgcG9zdEV4Y2VycHRUcmFpbDogJ+KApicsXG4gIHBvc3RDdGFUZXh0OiAnUmVhZCB0aGUgZnVsbCBwb3N0JyxcbiAgcG9zdERhdGVMb2NhbDogJ2VuLVVTJyxcbiAgcG9zdERhdGVGb3JtYXQ6IHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJ1xuICB9LFxuICBwb3N0RGF0ZVRpdGxlOiAnUHVibGlzaGVkIERhdGUnLFxuICBjbGFzc2VzOiB7XG4gICAgd3JhcHBlcjogJycsXG4gICAgaGVhZGVyOiAnJyxcbiAgICB1cmw6ICcnLFxuICAgIGZlZWRJdGVtOiAnJyxcbiAgICB0aXRsZTogJycsXG4gICAgbGluazogJycsXG4gICAgdGh1bWJuYWlsOiAnJyxcbiAgICBleGNlcnB0OiAnJyxcbiAgICBpdGVtRm9vdGVyOiAnJyxcbiAgICBjdGE6ICcnLFxuICAgIGRhdGU6ICcnXG4gIH0sXG4gIHRlbXBsYXRlczoge1xuICAgIG9wZW5lcjogRmVlZC50ZW1wbGF0ZXMubWVkaXVtLm9wZW5lci5qb2luKCcnKSxcbiAgICBoZWFkZXI6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5oZWFkZXIuam9pbignJyksXG4gICAgcG9zdHM6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5wb3N0cy5qb2luKCcnKSxcbiAgICBjbG9zZXI6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5jbG9zZXIuam9pbignJylcbiAgfSxcbiAgbG9nOiBmYWxzZSxcbiAgdW5pcXVlOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRmVlZDtcbiJdLCJuYW1lcyI6WyJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiT2JqZWN0IiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwiU3ltYm9sIiwib2JqZWN0UHJvdG8iLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwidG9TdHJpbmciLCJzeW1Ub1N0cmluZ1RhZyIsInRvU3RyaW5nVGFnIiwidW5kZWZpbmVkIiwiZ2V0UmF3VGFnIiwidmFsdWUiLCJpc093biIsImNhbGwiLCJ0YWciLCJ1bm1hc2tlZCIsImUiLCJyZXN1bHQiLCJvYmplY3RUb1N0cmluZyIsIm51bGxUYWciLCJ1bmRlZmluZWRUYWciLCJiYXNlR2V0VGFnIiwiaXNPYmplY3QiLCJ0eXBlIiwiYXN5bmNUYWciLCJmdW5jVGFnIiwiZ2VuVGFnIiwicHJveHlUYWciLCJpc0Z1bmN0aW9uIiwiY29yZUpzRGF0YSIsIm1hc2tTcmNLZXkiLCJ1aWQiLCJleGVjIiwia2V5cyIsIklFX1BST1RPIiwiaXNNYXNrZWQiLCJmdW5jIiwiZnVuY1Byb3RvIiwiZnVuY1RvU3RyaW5nIiwidG9Tb3VyY2UiLCJyZVJlZ0V4cENoYXIiLCJyZUlzSG9zdEN0b3IiLCJyZUlzTmF0aXZlIiwiUmVnRXhwIiwicmVwbGFjZSIsImJhc2VJc05hdGl2ZSIsInBhdHRlcm4iLCJ0ZXN0IiwiZ2V0VmFsdWUiLCJvYmplY3QiLCJrZXkiLCJnZXROYXRpdmUiLCJkZWZpbmVQcm9wZXJ0eSIsImJhc2VBc3NpZ25WYWx1ZSIsImVxIiwib3RoZXIiLCJhc3NpZ25WYWx1ZSIsIm9ialZhbHVlIiwiY29weU9iamVjdCIsInNvdXJjZSIsInByb3BzIiwiY3VzdG9taXplciIsImlzTmV3IiwiaW5kZXgiLCJsZW5ndGgiLCJuZXdWYWx1ZSIsImlkZW50aXR5IiwiYXBwbHkiLCJ0aGlzQXJnIiwiYXJncyIsIm5hdGl2ZU1heCIsIk1hdGgiLCJtYXgiLCJvdmVyUmVzdCIsInN0YXJ0IiwidHJhbnNmb3JtIiwiYXJndW1lbnRzIiwiYXJyYXkiLCJBcnJheSIsIm90aGVyQXJncyIsImNvbnN0YW50IiwiYmFzZVNldFRvU3RyaW5nIiwic3RyaW5nIiwiSE9UX0NPVU5UIiwiSE9UX1NQQU4iLCJuYXRpdmVOb3ciLCJEYXRlIiwibm93Iiwic2hvcnRPdXQiLCJjb3VudCIsImxhc3RDYWxsZWQiLCJzdGFtcCIsInJlbWFpbmluZyIsInNldFRvU3RyaW5nIiwiYmFzZVJlc3QiLCJNQVhfU0FGRV9JTlRFR0VSIiwiaXNMZW5ndGgiLCJpc0FycmF5TGlrZSIsInJlSXNVaW50IiwiaXNJbmRleCIsImlzSXRlcmF0ZWVDYWxsIiwiY3JlYXRlQXNzaWduZXIiLCJhc3NpZ25lciIsInNvdXJjZXMiLCJndWFyZCIsImJhc2VUaW1lcyIsIm4iLCJpdGVyYXRlZSIsImlzT2JqZWN0TGlrZSIsImFyZ3NUYWciLCJiYXNlSXNBcmd1bWVudHMiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImlzQXJndW1lbnRzIiwiaXNBcnJheSIsInN0dWJGYWxzZSIsImZyZWVFeHBvcnRzIiwiZXhwb3J0cyIsIm5vZGVUeXBlIiwiZnJlZU1vZHVsZSIsIm1vZHVsZSIsIm1vZHVsZUV4cG9ydHMiLCJCdWZmZXIiLCJuYXRpdmVJc0J1ZmZlciIsImlzQnVmZmVyIiwiYXJyYXlUYWciLCJib29sVGFnIiwiZGF0ZVRhZyIsImVycm9yVGFnIiwibWFwVGFnIiwibnVtYmVyVGFnIiwib2JqZWN0VGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwid2Vha01hcFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJmbG9hdDMyVGFnIiwiZmxvYXQ2NFRhZyIsImludDhUYWciLCJpbnQxNlRhZyIsImludDMyVGFnIiwidWludDhUYWciLCJ1aW50OENsYW1wZWRUYWciLCJ1aW50MTZUYWciLCJ1aW50MzJUYWciLCJ0eXBlZEFycmF5VGFncyIsImJhc2VJc1R5cGVkQXJyYXkiLCJiYXNlVW5hcnkiLCJmcmVlUHJvY2VzcyIsInByb2Nlc3MiLCJub2RlVXRpbCIsInR5cGVzIiwicmVxdWlyZSIsImJpbmRpbmciLCJub2RlSXNUeXBlZEFycmF5IiwiaXNUeXBlZEFycmF5IiwiYXJyYXlMaWtlS2V5cyIsImluaGVyaXRlZCIsImlzQXJyIiwiaXNBcmciLCJpc0J1ZmYiLCJpc1R5cGUiLCJza2lwSW5kZXhlcyIsIlN0cmluZyIsInB1c2giLCJpc1Byb3RvdHlwZSIsIkN0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvIiwibmF0aXZlS2V5c0luIiwiYmFzZUtleXNJbiIsImlzUHJvdG8iLCJrZXlzSW4iLCJhc3NpZ25JbldpdGgiLCJzcmNJbmRleCIsIm92ZXJBcmciLCJhcmciLCJnZXRQcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsIm9iamVjdEN0b3JTdHJpbmciLCJpc1BsYWluT2JqZWN0IiwiZG9tRXhjVGFnIiwiaXNFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiYXR0ZW1wdCIsIkVycm9yIiwiYXJyYXlNYXAiLCJiYXNlVmFsdWVzIiwiY3VzdG9tRGVmYXVsdHNBc3NpZ25JbiIsInNyY1ZhbHVlIiwic3RyaW5nRXNjYXBlcyIsImVzY2FwZVN0cmluZ0NoYXIiLCJjaHIiLCJuYXRpdmVLZXlzIiwiYmFzZUtleXMiLCJyZUludGVycG9sYXRlIiwiYmFzZVByb3BlcnR5T2YiLCJodG1sRXNjYXBlcyIsImVzY2FwZUh0bWxDaGFyIiwic3ltYm9sVGFnIiwiaXNTeW1ib2wiLCJJTkZJTklUWSIsInN5bWJvbFByb3RvIiwic3ltYm9sVG9TdHJpbmciLCJiYXNlVG9TdHJpbmciLCJyZVVuZXNjYXBlZEh0bWwiLCJyZUhhc1VuZXNjYXBlZEh0bWwiLCJlc2NhcGUiLCJyZUVzY2FwZSIsInJlRXZhbHVhdGUiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwicmVFbXB0eVN0cmluZ0xlYWRpbmciLCJyZUVtcHR5U3RyaW5nTWlkZGxlIiwicmVFbXB0eVN0cmluZ1RyYWlsaW5nIiwicmVFc1RlbXBsYXRlIiwicmVOb01hdGNoIiwicmVVbmVzY2FwZWRTdHJpbmciLCJ0ZW1wbGF0ZSIsIm9wdGlvbnMiLCJzZXR0aW5ncyIsImltcG9ydHMiLCJfIiwiaW1wb3J0c0tleXMiLCJpbXBvcnRzVmFsdWVzIiwiaXNFc2NhcGluZyIsImlzRXZhbHVhdGluZyIsImludGVycG9sYXRlIiwicmVEZWxpbWl0ZXJzIiwiZXZhbHVhdGUiLCJzb3VyY2VVUkwiLCJtYXRjaCIsImVzY2FwZVZhbHVlIiwiaW50ZXJwb2xhdGVWYWx1ZSIsImVzVGVtcGxhdGVWYWx1ZSIsImV2YWx1YXRlVmFsdWUiLCJvZmZzZXQiLCJzbGljZSIsInZhcmlhYmxlIiwiYXJyYXlFYWNoIiwiY3JlYXRlQmFzZUZvciIsImZyb21SaWdodCIsImtleXNGdW5jIiwiaXRlcmFibGUiLCJiYXNlRm9yIiwiYmFzZUZvck93biIsImNyZWF0ZUJhc2VFYWNoIiwiZWFjaEZ1bmMiLCJjb2xsZWN0aW9uIiwiYmFzZUVhY2giLCJjYXN0RnVuY3Rpb24iLCJmb3JFYWNoIiwibGlzdENhY2hlQ2xlYXIiLCJfX2RhdGFfXyIsInNpemUiLCJhc3NvY0luZGV4T2YiLCJhcnJheVByb3RvIiwic3BsaWNlIiwibGlzdENhY2hlRGVsZXRlIiwiZGF0YSIsImxhc3RJbmRleCIsInBvcCIsImxpc3RDYWNoZUdldCIsImxpc3RDYWNoZUhhcyIsImxpc3RDYWNoZVNldCIsIkxpc3RDYWNoZSIsImVudHJpZXMiLCJjbGVhciIsImVudHJ5Iiwic2V0IiwiZ2V0IiwiaGFzIiwic3RhY2tDbGVhciIsInN0YWNrRGVsZXRlIiwic3RhY2tHZXQiLCJzdGFja0hhcyIsIk1hcCIsIm5hdGl2ZUNyZWF0ZSIsImhhc2hDbGVhciIsImhhc2hEZWxldGUiLCJIQVNIX1VOREVGSU5FRCIsImhhc2hHZXQiLCJoYXNoSGFzIiwiaGFzaFNldCIsIkhhc2giLCJtYXBDYWNoZUNsZWFyIiwiaXNLZXlhYmxlIiwiZ2V0TWFwRGF0YSIsIm1hcCIsIm1hcENhY2hlRGVsZXRlIiwibWFwQ2FjaGVHZXQiLCJtYXBDYWNoZUhhcyIsIm1hcENhY2hlU2V0IiwiTWFwQ2FjaGUiLCJMQVJHRV9BUlJBWV9TSVpFIiwic3RhY2tTZXQiLCJwYWlycyIsIlN0YWNrIiwiYXNzaWduTWVyZ2VWYWx1ZSIsImFsbG9jVW5zYWZlIiwiY2xvbmVCdWZmZXIiLCJidWZmZXIiLCJpc0RlZXAiLCJjb3B5IiwiVWludDhBcnJheSIsImNsb25lQXJyYXlCdWZmZXIiLCJhcnJheUJ1ZmZlciIsImJ5dGVMZW5ndGgiLCJjbG9uZVR5cGVkQXJyYXkiLCJ0eXBlZEFycmF5IiwiYnl0ZU9mZnNldCIsImNvcHlBcnJheSIsIm9iamVjdENyZWF0ZSIsImNyZWF0ZSIsImJhc2VDcmVhdGUiLCJpbml0Q2xvbmVPYmplY3QiLCJpc0FycmF5TGlrZU9iamVjdCIsInNhZmVHZXQiLCJ0b1BsYWluT2JqZWN0IiwiYmFzZU1lcmdlRGVlcCIsIm1lcmdlRnVuYyIsInN0YWNrIiwic3RhY2tlZCIsImlzQ29tbW9uIiwiaXNUeXBlZCIsImJhc2VNZXJnZSIsIm1lcmdlIiwidmFsdWVzIiwic2V0Q2FjaGVBZGQiLCJzZXRDYWNoZUhhcyIsIlNldENhY2hlIiwiYWRkIiwiYXJyYXlTb21lIiwicHJlZGljYXRlIiwiY2FjaGVIYXMiLCJjYWNoZSIsIkNPTVBBUkVfUEFSVElBTF9GTEFHIiwiQ09NUEFSRV9VTk9SREVSRURfRkxBRyIsImVxdWFsQXJyYXlzIiwiYml0bWFzayIsImVxdWFsRnVuYyIsImlzUGFydGlhbCIsImFyckxlbmd0aCIsIm90aExlbmd0aCIsInNlZW4iLCJhcnJWYWx1ZSIsIm90aFZhbHVlIiwiY29tcGFyZWQiLCJvdGhJbmRleCIsIm1hcFRvQXJyYXkiLCJzZXRUb0FycmF5Iiwic3ltYm9sVmFsdWVPZiIsInZhbHVlT2YiLCJlcXVhbEJ5VGFnIiwiY29udmVydCIsImFycmF5UHVzaCIsImJhc2VHZXRBbGxLZXlzIiwic3ltYm9sc0Z1bmMiLCJhcnJheUZpbHRlciIsInJlc0luZGV4Iiwic3R1YkFycmF5IiwibmF0aXZlR2V0U3ltYm9scyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImdldFN5bWJvbHMiLCJzeW1ib2wiLCJnZXRBbGxLZXlzIiwiZXF1YWxPYmplY3RzIiwib2JqUHJvcHMiLCJvYmpMZW5ndGgiLCJvdGhQcm9wcyIsInNraXBDdG9yIiwib2JqQ3RvciIsIm90aEN0b3IiLCJEYXRhVmlldyIsIlByb21pc2UiLCJTZXQiLCJXZWFrTWFwIiwicHJvbWlzZVRhZyIsImRhdGFWaWV3Q3RvclN0cmluZyIsIm1hcEN0b3JTdHJpbmciLCJwcm9taXNlQ3RvclN0cmluZyIsInNldEN0b3JTdHJpbmciLCJ3ZWFrTWFwQ3RvclN0cmluZyIsImdldFRhZyIsIkFycmF5QnVmZmVyIiwicmVzb2x2ZSIsImN0b3JTdHJpbmciLCJiYXNlSXNFcXVhbERlZXAiLCJvYmpJc0FyciIsIm90aElzQXJyIiwib2JqVGFnIiwib3RoVGFnIiwib2JqSXNPYmoiLCJvdGhJc09iaiIsImlzU2FtZVRhZyIsIm9iaklzV3JhcHBlZCIsIm90aElzV3JhcHBlZCIsIm9ialVud3JhcHBlZCIsIm90aFVud3JhcHBlZCIsImJhc2VJc0VxdWFsIiwiYmFzZUlzTWF0Y2giLCJtYXRjaERhdGEiLCJub0N1c3RvbWl6ZXIiLCJpc1N0cmljdENvbXBhcmFibGUiLCJnZXRNYXRjaERhdGEiLCJtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSIsImJhc2VNYXRjaGVzIiwicmVJc0RlZXBQcm9wIiwicmVJc1BsYWluUHJvcCIsImlzS2V5IiwiRlVOQ19FUlJPUl9URVhUIiwibWVtb2l6ZSIsInJlc29sdmVyIiwiVHlwZUVycm9yIiwibWVtb2l6ZWQiLCJDYWNoZSIsIk1BWF9NRU1PSVpFX1NJWkUiLCJtZW1vaXplQ2FwcGVkIiwicmVQcm9wTmFtZSIsInJlRXNjYXBlQ2hhciIsInN0cmluZ1RvUGF0aCIsImNoYXJDb2RlQXQiLCJudW1iZXIiLCJxdW90ZSIsInN1YlN0cmluZyIsImNhc3RQYXRoIiwidG9LZXkiLCJiYXNlR2V0IiwicGF0aCIsImRlZmF1bHRWYWx1ZSIsImJhc2VIYXNJbiIsImhhc1BhdGgiLCJoYXNGdW5jIiwiaGFzSW4iLCJiYXNlTWF0Y2hlc1Byb3BlcnR5IiwiYmFzZVByb3BlcnR5IiwiYmFzZVByb3BlcnR5RGVlcCIsInByb3BlcnR5IiwiYmFzZUl0ZXJhdGVlIiwiYmFzZU1hcCIsImJhc2VTb3J0QnkiLCJjb21wYXJlciIsInNvcnQiLCJjb21wYXJlQXNjZW5kaW5nIiwidmFsSXNEZWZpbmVkIiwidmFsSXNOdWxsIiwidmFsSXNSZWZsZXhpdmUiLCJ2YWxJc1N5bWJvbCIsIm90aElzRGVmaW5lZCIsIm90aElzTnVsbCIsIm90aElzUmVmbGV4aXZlIiwib3RoSXNTeW1ib2wiLCJjb21wYXJlTXVsdGlwbGUiLCJvcmRlcnMiLCJvYmpDcml0ZXJpYSIsImNyaXRlcmlhIiwib3RoQ3JpdGVyaWEiLCJvcmRlcnNMZW5ndGgiLCJvcmRlciIsImJhc2VPcmRlckJ5IiwiaXRlcmF0ZWVzIiwib3JkZXJCeSIsIm5vb3AiLCJjcmVhdGVTZXQiLCJGZWVkIiwiY29uZmlnIiwiX3NldHRpbmdzIiwiX21lcmdlIiwiaW5pdCIsImxldCIsImZlZWQiLCJyc3NUb0pzb24iLCJyc3NVcmwiLCJfZm9yRWFjaCIsInVybCIsInRoaXMiLCJfcmVxdWVzdCIsInRoZW4iLCJyZXNwb25zZSIsIl9wcm9jZXNzIiwiSlNPTiIsInBhcnNlIiwidGhpcyQxIiwiY29tcGlsZWQiLCJfcmVuZGVyIiwiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsImlubmVySFRNTCIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwiZXZlbnQiLCJfeGhyIiwidGFyZ2V0IiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIm9udGltZW91dCIsIm9wZW4iLCJzZW5kIiwibG9nIiwiY29uc29sZSIsImRpciIsIl92YWx1ZXMiLCJ0ZW1wbGF0ZXMiLCJqb2luIiwiX3RlbXBsYXRlIiwibWVkaXVtIiwib3BlbmVyIiwiaGVhZGVyIiwicG9zdHMiLCJjbG9zZXIiLCJwb3N0RXhjZXJwdExlbmd0aCIsIml0ZW1zIiwicG9zdCIsImV4Y2VycHQiLCJkYXRlIiwiZGVzY3JpcHRpb24iLCJzdWJzdHIiLCJtaW4iLCJsYXN0SW5kZXhPZiIsInB1YkRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJwb3N0RGF0ZUxvY2FsIiwicG9zdERhdGVGb3JtYXQiLCJtZXJnZWQiLCJjb25jYXQiLCJfb3JkZXJCeSIsInRpdGxlIiwidGl0bGVVcmwiLCJwcm9maWxlSW1nIiwiZm9udFNpemUiLCJyYXRpb1Byb2ZpbGUiLCJwb3N0Qm9yZGVyQ29sb3IiLCJwb3N0SW1nSGVpZ2h0IiwicG9zdEV4Y2VycHRUcmFpbCIsInBvc3RDdGFUZXh0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwicG9zdERhdGVUaXRsZSIsImNsYXNzZXMiLCJ3cmFwcGVyIiwiZmVlZEl0ZW0iLCJsaW5rIiwidGh1bWJuYWlsIiwiaXRlbUZvb3RlciIsImN0YSIsInVuaXF1ZSJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7RUFDQSxJQUFJQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxJQUFpQixRQUFqQixJQUE2QkEsTUFBN0IsSUFBdUNBLE1BQU0sQ0FBQ0MsTUFBUCxLQUFrQkEsTUFBekQsSUFBbUVELE1BQXBGOzs7O0VDRUEsSUFBSUUsUUFBUSxHQUFHLE9BQU9DLElBQVAsSUFBZSxRQUFmLElBQTJCQSxJQUEzQixJQUFtQ0EsSUFBSSxDQUFDRixNQUFMLEtBQWdCQSxNQUFuRCxJQUE2REUsSUFBNUU7OztFQUdBLElBQUlDLElBQUksR0FBR0wsVUFBVSxJ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
