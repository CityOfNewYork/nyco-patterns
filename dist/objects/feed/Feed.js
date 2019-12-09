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
  /** Used for built-in method references. */

  var objectProto$b = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
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
    // The sourceURL gets injected into the source that's eval-ed, so be careful
    // with lookup (in case of e.g. prototype pollution), and strip newlines if any.
    // A newline wouldn't be a valid sourceURL anyway, and it'd enable code injection.

    var sourceURL = hasOwnProperty$9.call(options, 'sourceURL') ? '//# sourceURL=' + (options.sourceURL + '').replace(/[\r\n]/g, ' ') + '\n' : '';
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
    // Like with sourceURL, we take care to not check the option's prototype,
    // as this configuration is a code injection vector.

    var variable = hasOwnProperty$9.call(options, 'variable') && options.variable;

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

  var objectProto$c = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$a = objectProto$c.hasOwnProperty;
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

    return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */

  var objectProto$d = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$b = objectProto$d.hasOwnProperty;
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
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$b.call(data, key);
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
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

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
      stack || (stack = new Stack());

      if (isObject(srcValue)) {
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

  var objectProto$e = Object.prototype;
  /** Built-in value references. */

  var propertyIsEnumerable$1 = objectProto$e.propertyIsEnumerable;
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

  var objectProto$f = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$c = objectProto$f.hasOwnProperty;
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

      if (!(isPartial ? key in other : hasOwnProperty$c.call(other, key))) {
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

  var objectProto$g = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$d = objectProto$g.hasOwnProperty;
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
      var objIsWrapped = objIsObj && hasOwnProperty$d.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$d.call(other, '__wrapped__');

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
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }

    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

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
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }

    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */

  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }

    return false;
  }

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

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE$1 = 200;
  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */

  function baseUniq(array, iteratee, comparator) {
    var index = -1,
        includes = arrayIncludes,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    } else if (length >= LARGE_ARRAY_SIZE$1) {
      var set = iteratee ? null : createSet(array);

      if (set) {
        return setToArray(set);
      }

      isCommon = false;
      includes = cacheHas;
      seen = new SetCache();
    } else {
      seen = iteratee ? [] : result;
    }

    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;
      value = comparator || value !== 0 ? value : 0;

      if (isCommon && computed === computed) {
        var seenIndex = seen.length;

        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }

        if (iteratee) {
          seen.push(computed);
        }

        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }

        result.push(value);
      }
    }

    return result;
  }

  /**
   * This method is like `_.uniq` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * uniqueness is computed. The order of result values is determined by the
   * order they occur in the array. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
   * // => [2.1, 1.2]
   *
   * // The `_.property` iteratee shorthand.
   * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */

  function uniqBy(array, iteratee) {
    return array && array.length ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
  }

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

      items = uniqBy(items, function (item) {
        return item.guid;
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0Z1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29yZUpzRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzTWFza2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdG9Tb3VyY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYXRpdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRWYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE5hdGl2ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2RlZmluZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUFzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29weU9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaWRlbnRpdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcHBseS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJSZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Nob3J0T3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0VG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNMZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzSXRlcmF0ZWVDYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQXNzaWduZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVGltZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcmd1bWVudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3N0dWJGYWxzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuYXJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbm9kZVV0aWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TGlrZUtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1Byb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXNzaWduSW5XaXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXR0ZW1wdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVZhbHVlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2N1c3RvbURlZmF1bHRzQXNzaWduSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lc2NhcGVTdHJpbmdDaGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbmF0aXZlS2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVJbnRlcnBvbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eU9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXNjYXBlSHRtbENoYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRvU3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90b1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXNjYXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVFc2NhcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yZUV2YWx1YXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZVNldHRpbmdzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5RWFjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VGb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvck93bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VFYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0RnVuY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2ZvckVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVDbGVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc29jSW5kZXhPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZVNldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0xpc3RDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0RlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrR2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoRGVsZXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fSGFzaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleWFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRNYXBEYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVEZWxldGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXBDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3RhY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19VaW50OEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVBcnJheUJ1ZmZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pbml0Q2xvbmVPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2FmZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNZXJnZURlZXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy92YWx1ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRDYWNoZUFkZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0Q2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheVNvbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsQXJyYXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwVG9BcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbEJ5VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlQdXNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc3R1YkFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0U3ltYm9scy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbE9iamVjdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19EYXRhVmlldy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1Byb21pc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19XZWFrTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWxEZWVwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNNYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE1hdGNoRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hdGNoZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbWVtb2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21lbW9pemVDYXBwZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb1BhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0UGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvS2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUhhc0luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzUGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaGFzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5RGVlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXRlcmF0ZWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNvcnRCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvbXBhcmVBc2NlbmRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb21wYXJlTXVsdGlwbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlT3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvb3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGaW5kSW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYU4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpY3RJbmRleE9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUluZGV4T2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUluY2x1ZGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlJbmNsdWRlc1dpdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25vb3AuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVW5pcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdW5pcUJ5LmpzIiwiLi4vLi4vLi4vc3JjL29iamVjdHMvZmVlZC9GZWVkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbmV4cG9ydCBkZWZhdWx0IGZyZWVHbG9iYWw7XG4iLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9iamVjdFRvU3RyaW5nO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3Q7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGdW5jdGlvbjtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5leHBvcnQgZGVmYXVsdCBjb3JlSnNEYXRhO1xuIiwiaW1wb3J0IGNvcmVKc0RhdGEgZnJvbSAnLi9fY29yZUpzRGF0YS5qcyc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1NvdXJjZTtcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNNYXNrZWQgZnJvbSAnLi9faXNNYXNrZWQuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IHRvU291cmNlIGZyb20gJy4vX3RvU291cmNlLmpzJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTmF0aXZlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFZhbHVlO1xuIiwiaW1wb3J0IGJhc2VJc05hdGl2ZSBmcm9tICcuL19iYXNlSXNOYXRpdmUuanMnO1xuaW1wb3J0IGdldFZhbHVlIGZyb20gJy4vX2dldFZhbHVlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TmF0aXZlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUHJvcGVydHk7XG4iLCJpbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLi9fZGVmaW5lUHJvcGVydHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlQXNzaWduVmFsdWU7XG4iLCIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXE7XG4iLCJpbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnblZhbHVlO1xuIiwiaW1wb3J0IGFzc2lnblZhbHVlIGZyb20gJy4vX2Fzc2lnblZhbHVlLmpzJztcbmltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGlzTmV3ID0gIW9iamVjdDtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc05ldykge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcHlPYmplY3Q7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpZGVudGl0eTtcbiIsIi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwbHk7XG4iLCJpbXBvcnQgYXBwbHkgZnJvbSAnLi9fYXBwbHkuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUmVzdGAgd2hpY2ggdHJhbnNmb3JtcyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgcmVzdCBhcnJheSB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlclJlc3QoZnVuYywgc3RhcnQsIHRyYW5zZm9ybSkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSB0cmFuc2Zvcm0oYXJyYXkpO1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyUmVzdDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25zdGFudDtcbiIsImltcG9ydCBjb25zdGFudCBmcm9tICcuL2NvbnN0YW50LmpzJztcbmltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuL19kZWZpbmVQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHNldFRvU3RyaW5nYCB3aXRob3V0IHN1cHBvcnQgZm9yIGhvdCBsb29wIHNob3J0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIGJhc2VTZXRUb1N0cmluZyA9ICFkZWZpbmVQcm9wZXJ0eSA/IGlkZW50aXR5IDogZnVuY3Rpb24oZnVuYywgc3RyaW5nKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jLCAndG9TdHJpbmcnLCB7XG4gICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgJ2VudW1lcmFibGUnOiBmYWxzZSxcbiAgICAndmFsdWUnOiBjb25zdGFudChzdHJpbmcpLFxuICAgICd3cml0YWJsZSc6IHRydWVcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlU2V0VG9TdHJpbmc7XG4iLCIvKiogVXNlZCB0byBkZXRlY3QgaG90IGZ1bmN0aW9ucyBieSBudW1iZXIgb2YgY2FsbHMgd2l0aGluIGEgc3BhbiBvZiBtaWxsaXNlY29uZHMuICovXG52YXIgSE9UX0NPVU5UID0gODAwLFxuICAgIEhPVF9TUEFOID0gMTY7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVOb3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCdsbCBzaG9ydCBvdXQgYW5kIGludm9rZSBgaWRlbnRpdHlgIGluc3RlYWRcbiAqIG9mIGBmdW5jYCB3aGVuIGl0J3MgY2FsbGVkIGBIT1RfQ09VTlRgIG9yIG1vcmUgdGltZXMgaW4gYEhPVF9TUEFOYFxuICogbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNob3J0YWJsZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gc2hvcnRPdXQoZnVuYykge1xuICB2YXIgY291bnQgPSAwLFxuICAgICAgbGFzdENhbGxlZCA9IDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFtcCA9IG5hdGl2ZU5vdygpLFxuICAgICAgICByZW1haW5pbmcgPSBIT1RfU1BBTiAtIChzdGFtcCAtIGxhc3RDYWxsZWQpO1xuXG4gICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICBpZiAoKytjb3VudCA+PSBIT1RfQ09VTlQpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNob3J0T3V0O1xuIiwiaW1wb3J0IGJhc2VTZXRUb1N0cmluZyBmcm9tICcuL19iYXNlU2V0VG9TdHJpbmcuanMnO1xuaW1wb3J0IHNob3J0T3V0IGZyb20gJy4vX3Nob3J0T3V0LmpzJztcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0VG9TdHJpbmc7XG4iLCJpbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5pbXBvcnQgb3ZlclJlc3QgZnJvbSAnLi9fb3ZlclJlc3QuanMnO1xuaW1wb3J0IHNldFRvU3RyaW5nIGZyb20gJy4vX3NldFRvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VSZXN0O1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0xlbmd0aDtcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZTtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuXG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlID09ICdudW1iZXInIHx8XG4gICAgICAodHlwZSAhPSAnc3ltYm9sJyAmJiByZUlzVWludC50ZXN0KHZhbHVlKSkpICYmXG4gICAgICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNJbmRleDtcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzSXRlcmF0ZWVDYWxsO1xuIiwiaW1wb3J0IGJhc2VSZXN0IGZyb20gJy4vX2Jhc2VSZXN0LmpzJztcbmltcG9ydCBpc0l0ZXJhdGVlQ2FsbCBmcm9tICcuL19pc0l0ZXJhdGVlQ2FsbC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRpbWVzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc0FyZ3VtZW50cztcbiIsImltcG9ydCBiYXNlSXNBcmd1bWVudHMgZnJvbSAnLi9fYmFzZUlzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkZhbHNlO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5pbXBvcnQgc3R1YkZhbHNlIGZyb20gJy4vc3R1YkZhbHNlLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBpc0J1ZmZlcjtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVVuYXJ5O1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGB1dGlsLnR5cGVzYCBmb3IgTm9kZS5qcyAxMCsuXG4gICAgdmFyIHR5cGVzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlKCd1dGlsJykudHlwZXM7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcztcbiAgICB9XG5cbiAgICAvLyBMZWdhY3kgYHByb2Nlc3MuYmluZGluZygndXRpbCcpYCBmb3IgTm9kZS5qcyA8IDEwLlxuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVVdGlsO1xuIiwiaW1wb3J0IGJhc2VJc1R5cGVkQXJyYXkgZnJvbSAnLi9fYmFzZUlzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgYmFzZVVuYXJ5IGZyb20gJy4vX2Jhc2VVbmFyeS5qcyc7XG5pbXBvcnQgbm9kZVV0aWwgZnJvbSAnLi9fbm9kZVV0aWwuanMnO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNUeXBlZEFycmF5O1xuIiwiaW1wb3J0IGJhc2VUaW1lcyBmcm9tICcuL19iYXNlVGltZXMuanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlMaWtlS2V5cztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlS2V5c0luO1xuIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcbmltcG9ydCBuYXRpdmVLZXlzSW4gZnJvbSAnLi9fbmF0aXZlS2V5c0luLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUtleXNJbjtcbiIsImltcG9ydCBhcnJheUxpa2VLZXlzIGZyb20gJy4vX2FycmF5TGlrZUtleXMuanMnO1xuaW1wb3J0IGJhc2VLZXlzSW4gZnJvbSAnLi9fYmFzZUtleXNJbi5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBrZXlzSW47XG4iLCJpbXBvcnQgY29weU9iamVjdCBmcm9tICcuL19jb3B5T2JqZWN0LmpzJztcbmltcG9ydCBjcmVhdGVBc3NpZ25lciBmcm9tICcuL19jcmVhdGVBc3NpZ25lci5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbkluYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjdXN0b21pemVyYFxuICogd2hpY2ggaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zXG4gKiBgdW5kZWZpbmVkYCwgYXNzaWdubWVudCBpcyBoYW5kbGVkIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYFxuICogaXMgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzOiAob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAYWxpYXMgZXh0ZW5kV2l0aFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IHNvdXJjZXMgVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5hc3NpZ25XaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlKSB7XG4gKiAgIHJldHVybiBfLmlzVW5kZWZpbmVkKG9ialZhbHVlKSA/IHNyY1ZhbHVlIDogb2JqVmFsdWU7XG4gKiB9XG4gKlxuICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ25JbldpdGgsIGN1c3RvbWl6ZXIpO1xuICpcbiAqIGRlZmF1bHRzKHsgJ2EnOiAxIH0sIHsgJ2InOiAyIH0sIHsgJ2EnOiAzIH0pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKi9cbnZhciBhc3NpZ25JbldpdGggPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIpIHtcbiAgY29weU9iamVjdChzb3VyY2UsIGtleXNJbihzb3VyY2UpLCBvYmplY3QsIGN1c3RvbWl6ZXIpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbkluV2l0aDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJlxuICAgIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUGxhaW5PYmplY3Q7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnLi9pc1BsYWluT2JqZWN0LmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGRvbUV4Y1RhZyA9ICdbb2JqZWN0IERPTUV4Y2VwdGlvbl0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhbiBgRXJyb3JgLCBgRXZhbEVycm9yYCwgYFJhbmdlRXJyb3JgLCBgUmVmZXJlbmNlRXJyb3JgLFxuICogYFN5bnRheEVycm9yYCwgYFR5cGVFcnJvcmAsIG9yIGBVUklFcnJvcmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGVycm9yIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRXJyb3IobmV3IEVycm9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRXJyb3IoRXJyb3IpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFcnJvcih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGVycm9yVGFnIHx8IHRhZyA9PSBkb21FeGNUYWcgfHxcbiAgICAodHlwZW9mIHZhbHVlLm1lc3NhZ2UgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlLm5hbWUgPT0gJ3N0cmluZycgJiYgIWlzUGxhaW5PYmplY3QodmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNFcnJvcjtcbiIsImltcG9ydCBhcHBseSBmcm9tICcuL19hcHBseS5qcyc7XG5pbXBvcnQgYmFzZVJlc3QgZnJvbSAnLi9fYmFzZVJlc3QuanMnO1xuaW1wb3J0IGlzRXJyb3IgZnJvbSAnLi9pc0Vycm9yLmpzJztcblxuLyoqXG4gKiBBdHRlbXB0cyB0byBpbnZva2UgYGZ1bmNgLCByZXR1cm5pbmcgZWl0aGVyIHRoZSByZXN1bHQgb3IgdGhlIGNhdWdodCBlcnJvclxuICogb2JqZWN0LiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIHRvIGBmdW5jYCB3aGVuIGl0J3MgaW52b2tlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXR0ZW1wdC5cbiAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGBmdW5jYCByZXN1bHQgb3IgZXJyb3Igb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCB0aHJvd2luZyBlcnJvcnMgZm9yIGludmFsaWQgc2VsZWN0b3JzLlxuICogdmFyIGVsZW1lbnRzID0gXy5hdHRlbXB0KGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gKiAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAqIH0sICc+Xz4nKTtcbiAqXG4gKiBpZiAoXy5pc0Vycm9yKGVsZW1lbnRzKSkge1xuICogICBlbGVtZW50cyA9IFtdO1xuICogfVxuICovXG52YXIgYXR0ZW1wdCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGZ1bmMsIGFyZ3MpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdW5kZWZpbmVkLCBhcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBpc0Vycm9yKGUpID8gZSA6IG5ldyBFcnJvcihlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGF0dGVtcHQ7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheU1hcDtcbiIsImltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udmFsdWVzYCBhbmQgYF8udmFsdWVzSW5gIHdoaWNoIGNyZWF0ZXMgYW5cbiAqIGFycmF5IG9mIGBvYmplY3RgIHByb3BlcnR5IHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm9wZXJ0eSBuYW1lc1xuICogb2YgYHByb3BzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlVmFsdWVzKG9iamVjdCwgcHJvcHMpIHtcbiAgcmV0dXJuIGFycmF5TWFwKHByb3BzLCBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVmFsdWVzO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgYnkgYF8uZGVmYXVsdHNgIHRvIGN1c3RvbWl6ZSBpdHMgYF8uYXNzaWduSW5gIHVzZSB0byBhc3NpZ24gcHJvcGVydGllc1xuICogb2Ygc291cmNlIG9iamVjdHMgdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdCBmb3IgYWxsIGRlc3RpbmF0aW9uIHByb3BlcnRpZXNcbiAqIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBvYmpWYWx1ZSBUaGUgZGVzdGluYXRpb24gdmFsdWUuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSBzb3VyY2UgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHBhcmVudCBvYmplY3Qgb2YgYG9ialZhbHVlYC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGN1c3RvbURlZmF1bHRzQXNzaWduSW4ob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCkge1xuICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgKGVxKG9ialZhbHVlLCBvYmplY3RQcm90b1trZXldKSAmJiAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSB7XG4gICAgcmV0dXJuIHNyY1ZhbHVlO1xuICB9XG4gIHJldHVybiBvYmpWYWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tRGVmYXVsdHNBc3NpZ25JbjtcbiIsIi8qKiBVc2VkIHRvIGVzY2FwZSBjaGFyYWN0ZXJzIGZvciBpbmNsdXNpb24gaW4gY29tcGlsZWQgc3RyaW5nIGxpdGVyYWxzLiAqL1xudmFyIHN0cmluZ0VzY2FwZXMgPSB7XG4gICdcXFxcJzogJ1xcXFwnLFxuICBcIidcIjogXCInXCIsXG4gICdcXG4nOiAnbicsXG4gICdcXHInOiAncicsXG4gICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgJ1xcdTIwMjknOiAndTIwMjknXG59O1xuXG4vKipcbiAqIFVzZWQgYnkgYF8udGVtcGxhdGVgIHRvIGVzY2FwZSBjaGFyYWN0ZXJzIGZvciBpbmNsdXNpb24gaW4gY29tcGlsZWQgc3RyaW5nIGxpdGVyYWxzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlU3RyaW5nQ2hhcihjaHIpIHtcbiAgcmV0dXJuICdcXFxcJyArIHN0cmluZ0VzY2FwZXNbY2hyXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXNjYXBlU3RyaW5nQ2hhcjtcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUtleXM7XG4iLCJpbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXMgZnJvbSAnLi9fbmF0aXZlS2V5cy5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUtleXM7XG4iLCJpbXBvcnQgYXJyYXlMaWtlS2V5cyBmcm9tICcuL19hcnJheUxpa2VLZXlzLmpzJztcbmltcG9ydCBiYXNlS2V5cyBmcm9tICcuL19iYXNlS2V5cy5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBrZXlzO1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbnZhciByZUludGVycG9sYXRlID0gLzwlPShbXFxzXFxTXSs/KSU+L2c7XG5cbmV4cG9ydCBkZWZhdWx0IHJlSW50ZXJwb2xhdGU7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eU9mO1xuIiwiaW1wb3J0IGJhc2VQcm9wZXJ0eU9mIGZyb20gJy4vX2Jhc2VQcm9wZXJ0eU9mLmpzJztcblxuLyoqIFVzZWQgdG8gbWFwIGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy4gKi9cbnZhciBodG1sRXNjYXBlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjMzk7J1xufTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmVzY2FwZWAgdG8gY29udmVydCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG52YXIgZXNjYXBlSHRtbENoYXIgPSBiYXNlUHJvcGVydHlPZihodG1sRXNjYXBlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IGVzY2FwZUh0bWxDaGFyO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbnZlcnQgdmFsdWVzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgcmV0dXJuIGFycmF5TWFwKHZhbHVlLCBiYXNlVG9TdHJpbmcpICsgJyc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVG9TdHJpbmc7XG4iLCJpbXBvcnQgYmFzZVRvU3RyaW5nIGZyb20gJy4vX2Jhc2VUb1N0cmluZy5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9TdHJpbmc7XG4iLCJpbXBvcnQgZXNjYXBlSHRtbENoYXIgZnJvbSAnLi9fZXNjYXBlSHRtbENoYXIuanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBIVE1MIGVudGl0aWVzIGFuZCBIVE1MIGNoYXJhY3RlcnMuICovXG52YXIgcmVVbmVzY2FwZWRIdG1sID0gL1smPD5cIiddL2csXG4gICAgcmVIYXNVbmVzY2FwZWRIdG1sID0gUmVnRXhwKHJlVW5lc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBjaGFyYWN0ZXJzIFwiJlwiLCBcIjxcIiwgXCI+XCIsICdcIicsIGFuZCBcIidcIiBpbiBgc3RyaW5nYCB0byB0aGVpclxuICogY29ycmVzcG9uZGluZyBIVE1MIGVudGl0aWVzLlxuICpcbiAqICoqTm90ZToqKiBObyBvdGhlciBjaGFyYWN0ZXJzIGFyZSBlc2NhcGVkLiBUbyBlc2NhcGUgYWRkaXRpb25hbFxuICogY2hhcmFjdGVycyB1c2UgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5IGxpa2UgW19oZV9dKGh0dHBzOi8vbXRocy5iZS9oZSkuXG4gKlxuICogVGhvdWdoIHRoZSBcIj5cIiBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZVxuICogXCI+XCIgYW5kIFwiL1wiIGRvbid0IG5lZWQgZXNjYXBpbmcgaW4gSFRNTCBhbmQgaGF2ZSBubyBzcGVjaWFsIG1lYW5pbmdcbiAqIHVubGVzcyB0aGV5J3JlIHBhcnQgb2YgYSB0YWcgb3IgdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLiBTZWVcbiAqIFtNYXRoaWFzIEJ5bmVucydzIGFydGljbGVdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcylcbiAqICh1bmRlciBcInNlbWktcmVsYXRlZCBmdW4gZmFjdFwiKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFdoZW4gd29ya2luZyB3aXRoIEhUTUwgeW91IHNob3VsZCBhbHdheXNcbiAqIFtxdW90ZSBhdHRyaWJ1dGUgdmFsdWVzXShodHRwOi8vd29ua28uY29tL3Bvc3QvaHRtbC1lc2NhcGluZykgdG8gcmVkdWNlXG4gKiBYU1MgdmVjdG9ycy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGUoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gKiAvLyA9PiAnZnJlZCwgYmFybmV5LCAmYW1wOyBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiBlc2NhcGUoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzVW5lc2NhcGVkSHRtbC50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKVxuICAgIDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlc2NhcGU7XG4iLCIvKiogVXNlZCB0byBtYXRjaCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlRXNjYXBlID0gLzwlLShbXFxzXFxTXSs/KSU+L2c7XG5cbmV4cG9ydCBkZWZhdWx0IHJlRXNjYXBlO1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbnZhciByZUV2YWx1YXRlID0gLzwlKFtcXHNcXFNdKz8pJT4vZztcblxuZXhwb3J0IGRlZmF1bHQgcmVFdmFsdWF0ZTtcbiIsImltcG9ydCBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0IHJlRXNjYXBlIGZyb20gJy4vX3JlRXNjYXBlLmpzJztcbmltcG9ydCByZUV2YWx1YXRlIGZyb20gJy4vX3JlRXZhbHVhdGUuanMnO1xuaW1wb3J0IHJlSW50ZXJwb2xhdGUgZnJvbSAnLi9fcmVJbnRlcnBvbGF0ZS5qcyc7XG5cbi8qKlxuICogQnkgZGVmYXVsdCwgdGhlIHRlbXBsYXRlIGRlbGltaXRlcnMgdXNlZCBieSBsb2Rhc2ggYXJlIGxpa2UgdGhvc2UgaW5cbiAqIGVtYmVkZGVkIFJ1YnkgKEVSQikgYXMgd2VsbCBhcyBFUzIwMTUgdGVtcGxhdGUgc3RyaW5ncy4gQ2hhbmdlIHRoZVxuICogZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgdGVtcGxhdGVTZXR0aW5ncyA9IHtcblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgYGRhdGFgIHByb3BlcnR5IHZhbHVlcyB0byBiZSBIVE1MLWVzY2FwZWQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICogQHR5cGUge1JlZ0V4cH1cbiAgICovXG4gICdlc2NhcGUnOiByZUVzY2FwZSxcblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgY29kZSB0byBiZSBldmFsdWF0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICogQHR5cGUge1JlZ0V4cH1cbiAgICovXG4gICdldmFsdWF0ZSc6IHJlRXZhbHVhdGUsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZWN0IGBkYXRhYCBwcm9wZXJ0eSB2YWx1ZXMgdG8gaW5qZWN0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtSZWdFeHB9XG4gICAqL1xuICAnaW50ZXJwb2xhdGUnOiByZUludGVycG9sYXRlLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHJlZmVyZW5jZSB0aGUgZGF0YSBvYmplY3QgaW4gdGhlIHRlbXBsYXRlIHRleHQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gICd2YXJpYWJsZSc6ICcnLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGltcG9ydCB2YXJpYWJsZXMgaW50byB0aGUgY29tcGlsZWQgdGVtcGxhdGUuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gICdpbXBvcnRzJzoge1xuXG4gICAgLyoqXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGBsb2Rhc2hgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5ncy5pbXBvcnRzXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgICdfJzogeyAnZXNjYXBlJzogZXNjYXBlIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVtcGxhdGVTZXR0aW5ncztcbiIsImltcG9ydCBhc3NpZ25JbldpdGggZnJvbSAnLi9hc3NpZ25JbldpdGguanMnO1xuaW1wb3J0IGF0dGVtcHQgZnJvbSAnLi9hdHRlbXB0LmpzJztcbmltcG9ydCBiYXNlVmFsdWVzIGZyb20gJy4vX2Jhc2VWYWx1ZXMuanMnO1xuaW1wb3J0IGN1c3RvbURlZmF1bHRzQXNzaWduSW4gZnJvbSAnLi9fY3VzdG9tRGVmYXVsdHNBc3NpZ25Jbi5qcyc7XG5pbXBvcnQgZXNjYXBlU3RyaW5nQ2hhciBmcm9tICcuL19lc2NhcGVTdHJpbmdDaGFyLmpzJztcbmltcG9ydCBpc0Vycm9yIGZyb20gJy4vaXNFcnJvci5qcyc7XG5pbXBvcnQgaXNJdGVyYXRlZUNhbGwgZnJvbSAnLi9faXNJdGVyYXRlZUNhbGwuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcbmltcG9ydCByZUludGVycG9sYXRlIGZyb20gJy4vX3JlSW50ZXJwb2xhdGUuanMnO1xuaW1wb3J0IHRlbXBsYXRlU2V0dGluZ3MgZnJvbSAnLi90ZW1wbGF0ZVNldHRpbmdzLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggZW1wdHkgc3RyaW5nIGxpdGVyYWxzIGluIGNvbXBpbGVkIHRlbXBsYXRlIHNvdXJjZS4gKi9cbnZhciByZUVtcHR5U3RyaW5nTGVhZGluZyA9IC9cXGJfX3AgXFwrPSAnJzsvZyxcbiAgICByZUVtcHR5U3RyaW5nTWlkZGxlID0gL1xcYihfX3AgXFwrPSkgJycgXFwrL2csXG4gICAgcmVFbXB0eVN0cmluZ1RyYWlsaW5nID0gLyhfX2VcXCguKj9cXCl8XFxiX190XFwpKSBcXCtcXG4nJzsvZztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoXG4gKiBbRVMgdGVtcGxhdGUgZGVsaW1pdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdGVtcGxhdGUtbGl0ZXJhbC1sZXhpY2FsLWNvbXBvbmVudHMpLlxuICovXG52YXIgcmVFc1RlbXBsYXRlID0gL1xcJFxceyhbXlxcXFx9XSooPzpcXFxcLlteXFxcXH1dKikqKVxcfS9nO1xuXG4vKiogVXNlZCB0byBlbnN1cmUgY2FwdHVyaW5nIG9yZGVyIG9mIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVOb01hdGNoID0gLygkXikvO1xuXG4vKiogVXNlZCB0byBtYXRjaCB1bmVzY2FwZWQgY2hhcmFjdGVycyBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMuICovXG52YXIgcmVVbmVzY2FwZWRTdHJpbmcgPSAvWydcXG5cXHJcXHUyMDI4XFx1MjAyOVxcXFxdL2c7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNvbXBpbGVkIHRlbXBsYXRlIGZ1bmN0aW9uIHRoYXQgY2FuIGludGVycG9sYXRlIGRhdGEgcHJvcGVydGllc1xuICogaW4gXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlcnMsIEhUTUwtZXNjYXBlIGludGVycG9sYXRlZCBkYXRhIHByb3BlcnRpZXMgaW5cbiAqIFwiZXNjYXBlXCIgZGVsaW1pdGVycywgYW5kIGV4ZWN1dGUgSmF2YVNjcmlwdCBpbiBcImV2YWx1YXRlXCIgZGVsaW1pdGVycy4gRGF0YVxuICogcHJvcGVydGllcyBtYXkgYmUgYWNjZXNzZWQgYXMgZnJlZSB2YXJpYWJsZXMgaW4gdGhlIHRlbXBsYXRlLiBJZiBhIHNldHRpbmdcbiAqIG9iamVjdCBpcyBnaXZlbiwgaXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIGBfLnRlbXBsYXRlU2V0dGluZ3NgIHZhbHVlcy5cbiAqXG4gKiAqKk5vdGU6KiogSW4gdGhlIGRldmVsb3BtZW50IGJ1aWxkIGBfLnRlbXBsYXRlYCB1dGlsaXplc1xuICogW3NvdXJjZVVSTHNdKGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL2RldmVsb3BlcnRvb2xzL3NvdXJjZW1hcHMvI3RvYy1zb3VyY2V1cmwpXG4gKiBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAqXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBwcmVjb21waWxpbmcgdGVtcGxhdGVzIHNlZVxuICogW2xvZGFzaCdzIGN1c3RvbSBidWlsZHMgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9sb2Rhc2guY29tL2N1c3RvbS1idWlsZHMpLlxuICpcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIENocm9tZSBleHRlbnNpb24gc2FuZGJveGVzIHNlZVxuICogW0Nocm9tZSdzIGV4dGVuc2lvbnMgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9leHRlbnNpb25zL3NhbmRib3hpbmdFdmFsKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHRlbXBsYXRlIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtSZWdFeHB9IFtvcHRpb25zLmVzY2FwZT1fLnRlbXBsYXRlU2V0dGluZ3MuZXNjYXBlXVxuICogIFRoZSBIVE1MIFwiZXNjYXBlXCIgZGVsaW1pdGVyLlxuICogQHBhcmFtIHtSZWdFeHB9IFtvcHRpb25zLmV2YWx1YXRlPV8udGVtcGxhdGVTZXR0aW5ncy5ldmFsdWF0ZV1cbiAqICBUaGUgXCJldmFsdWF0ZVwiIGRlbGltaXRlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5pbXBvcnRzPV8udGVtcGxhdGVTZXR0aW5ncy5pbXBvcnRzXVxuICogIEFuIG9iamVjdCB0byBpbXBvcnQgaW50byB0aGUgdGVtcGxhdGUgYXMgZnJlZSB2YXJpYWJsZXMuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gW29wdGlvbnMuaW50ZXJwb2xhdGU9Xy50ZW1wbGF0ZVNldHRpbmdzLmludGVycG9sYXRlXVxuICogIFRoZSBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnNvdXJjZVVSTD0ndGVtcGxhdGVTb3VyY2VzW25dJ11cbiAqICBUaGUgc291cmNlVVJMIG9mIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy52YXJpYWJsZT0nb2JqJ11cbiAqICBUaGUgZGF0YSBvYmplY3QgdmFyaWFibGUgbmFtZS5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNvbXBpbGVkIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBVc2UgdGhlIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIgdG8gY3JlYXRlIGEgY29tcGlsZWQgdGVtcGxhdGUuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyA8JT0gdXNlciAlPiEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiAnaGVsbG8gZnJlZCEnXG4gKlxuICogLy8gVXNlIHRoZSBIVE1MIFwiZXNjYXBlXCIgZGVsaW1pdGVyIHRvIGVzY2FwZSBkYXRhIHByb3BlcnR5IHZhbHVlcy5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJzxiPjwlLSB2YWx1ZSAlPjwvYj4nKTtcbiAqIGNvbXBpbGVkKHsgJ3ZhbHVlJzogJzxzY3JpcHQ+JyB9KTtcbiAqIC8vID0+ICc8Yj4mbHQ7c2NyaXB0Jmd0OzwvYj4nXG4gKlxuICogLy8gVXNlIHRoZSBcImV2YWx1YXRlXCIgZGVsaW1pdGVyIHRvIGV4ZWN1dGUgSmF2YVNjcmlwdCBhbmQgZ2VuZXJhdGUgSFRNTC5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJzwlIF8uZm9yRWFjaCh1c2VycywgZnVuY3Rpb24odXNlcikgeyAlPjxsaT48JS0gdXNlciAlPjwvbGk+PCUgfSk7ICU+Jyk7XG4gKiBjb21waWxlZCh7ICd1c2Vycyc6IFsnZnJlZCcsICdiYXJuZXknXSB9KTtcbiAqIC8vID0+ICc8bGk+ZnJlZDwvbGk+PGxpPmJhcm5leTwvbGk+J1xuICpcbiAqIC8vIFVzZSB0aGUgaW50ZXJuYWwgYHByaW50YCBmdW5jdGlvbiBpbiBcImV2YWx1YXRlXCIgZGVsaW1pdGVycy5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJzwlIHByaW50KFwiaGVsbG8gXCIgKyB1c2VyKTsgJT4hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ2Jhcm5leScgfSk7XG4gKiAvLyA9PiAnaGVsbG8gYmFybmV5ISdcbiAqXG4gKiAvLyBVc2UgdGhlIEVTIHRlbXBsYXRlIGxpdGVyYWwgZGVsaW1pdGVyIGFzIGFuIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIuXG4gKiAvLyBEaXNhYmxlIHN1cHBvcnQgYnkgcmVwbGFjaW5nIHRoZSBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8gJHsgdXNlciB9IScpO1xuICogY29tcGlsZWQoeyAndXNlcic6ICdwZWJibGVzJyB9KTtcbiAqIC8vID0+ICdoZWxsbyBwZWJibGVzISdcbiAqXG4gKiAvLyBVc2UgYmFja3NsYXNoZXMgdG8gdHJlYXQgZGVsaW1pdGVycyBhcyBwbGFpbiB0ZXh0LlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPCU9IFwiXFxcXDwlLSB2YWx1ZSAlXFxcXD5cIiAlPicpO1xuICogY29tcGlsZWQoeyAndmFsdWUnOiAnaWdub3JlZCcgfSk7XG4gKiAvLyA9PiAnPCUtIHZhbHVlICU+J1xuICpcbiAqIC8vIFVzZSB0aGUgYGltcG9ydHNgIG9wdGlvbiB0byBpbXBvcnQgYGpRdWVyeWAgYXMgYGpxYC5cbiAqIHZhciB0ZXh0ID0gJzwlIGpxLmVhY2godXNlcnMsIGZ1bmN0aW9uKHVzZXIpIHsgJT48bGk+PCUtIHVzZXIgJT48L2xpPjwlIH0pOyAlPic7XG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKHRleHQsIHsgJ2ltcG9ydHMnOiB7ICdqcSc6IGpRdWVyeSB9IH0pO1xuICogY29tcGlsZWQoeyAndXNlcnMnOiBbJ2ZyZWQnLCAnYmFybmV5J10gfSk7XG4gKiAvLyA9PiAnPGxpPmZyZWQ8L2xpPjxsaT5iYXJuZXk8L2xpPidcbiAqXG4gKiAvLyBVc2UgdGhlIGBzb3VyY2VVUkxgIG9wdGlvbiB0byBzcGVjaWZ5IGEgY3VzdG9tIHNvdXJjZVVSTCBmb3IgdGhlIHRlbXBsYXRlLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8gPCU9IHVzZXIgJT4hJywgeyAnc291cmNlVVJMJzogJy9iYXNpYy9ncmVldGluZy5qc3QnIH0pO1xuICogY29tcGlsZWQoZGF0YSk7XG4gKiAvLyA9PiBGaW5kIHRoZSBzb3VyY2Ugb2YgXCJncmVldGluZy5qc3RcIiB1bmRlciB0aGUgU291cmNlcyB0YWIgb3IgUmVzb3VyY2VzIHBhbmVsIG9mIHRoZSB3ZWIgaW5zcGVjdG9yLlxuICpcbiAqIC8vIFVzZSB0aGUgYHZhcmlhYmxlYCBvcHRpb24gdG8gZW5zdXJlIGEgd2l0aC1zdGF0ZW1lbnQgaXNuJ3QgdXNlZCBpbiB0aGUgY29tcGlsZWQgdGVtcGxhdGUuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoaSA8JT0gZGF0YS51c2VyICU+IScsIHsgJ3ZhcmlhYmxlJzogJ2RhdGEnIH0pO1xuICogY29tcGlsZWQuc291cmNlO1xuICogLy8gPT4gZnVuY3Rpb24oZGF0YSkge1xuICogLy8gICB2YXIgX190LCBfX3AgPSAnJztcbiAqIC8vICAgX19wICs9ICdoaSAnICsgKChfX3QgPSAoIGRhdGEudXNlciApKSA9PSBudWxsID8gJycgOiBfX3QpICsgJyEnO1xuICogLy8gICByZXR1cm4gX19wO1xuICogLy8gfVxuICpcbiAqIC8vIFVzZSBjdXN0b20gdGVtcGxhdGUgZGVsaW1pdGVycy5cbiAqIF8udGVtcGxhdGVTZXR0aW5ncy5pbnRlcnBvbGF0ZSA9IC97eyhbXFxzXFxTXSs/KX19L2c7XG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyB7eyB1c2VyIH19IScpO1xuICogY29tcGlsZWQoeyAndXNlcic6ICdtdXN0YWNoZScgfSk7XG4gKiAvLyA9PiAnaGVsbG8gbXVzdGFjaGUhJ1xuICpcbiAqIC8vIFVzZSB0aGUgYHNvdXJjZWAgcHJvcGVydHkgdG8gaW5saW5lIGNvbXBpbGVkIHRlbXBsYXRlcyBmb3IgbWVhbmluZ2Z1bFxuICogLy8gbGluZSBudW1iZXJzIGluIGVycm9yIG1lc3NhZ2VzIGFuZCBzdGFjayB0cmFjZXMuXG4gKiBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnanN0LmpzJyksICdcXFxuICogICB2YXIgSlNUID0ge1xcXG4gKiAgICAgXCJtYWluXCI6ICcgKyBfLnRlbXBsYXRlKG1haW5UZXh0KS5zb3VyY2UgKyAnXFxcbiAqICAgfTtcXFxuICogJyk7XG4gKi9cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZywgb3B0aW9ucywgZ3VhcmQpIHtcbiAgLy8gQmFzZWQgb24gSm9obiBSZXNpZydzIGB0bXBsYCBpbXBsZW1lbnRhdGlvblxuICAvLyAoaHR0cDovL2Vqb2huLm9yZy9ibG9nL2phdmFzY3JpcHQtbWljcm8tdGVtcGxhdGluZy8pXG4gIC8vIGFuZCBMYXVyYSBEb2t0b3JvdmEncyBkb1QuanMgKGh0dHBzOi8vZ2l0aHViLmNvbS9vbGFkby9kb1QpLlxuICB2YXIgc2V0dGluZ3MgPSB0ZW1wbGF0ZVNldHRpbmdzLmltcG9ydHMuXy50ZW1wbGF0ZVNldHRpbmdzIHx8IHRlbXBsYXRlU2V0dGluZ3M7XG5cbiAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHN0cmluZywgb3B0aW9ucywgZ3VhcmQpKSB7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBvcHRpb25zID0gYXNzaWduSW5XaXRoKHt9LCBvcHRpb25zLCBzZXR0aW5ncywgY3VzdG9tRGVmYXVsdHNBc3NpZ25Jbik7XG5cbiAgdmFyIGltcG9ydHMgPSBhc3NpZ25JbldpdGgoe30sIG9wdGlvbnMuaW1wb3J0cywgc2V0dGluZ3MuaW1wb3J0cywgY3VzdG9tRGVmYXVsdHNBc3NpZ25JbiksXG4gICAgICBpbXBvcnRzS2V5cyA9IGtleXMoaW1wb3J0cyksXG4gICAgICBpbXBvcnRzVmFsdWVzID0gYmFzZVZhbHVlcyhpbXBvcnRzLCBpbXBvcnRzS2V5cyk7XG5cbiAgdmFyIGlzRXNjYXBpbmcsXG4gICAgICBpc0V2YWx1YXRpbmcsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBpbnRlcnBvbGF0ZSA9IG9wdGlvbnMuaW50ZXJwb2xhdGUgfHwgcmVOb01hdGNoLFxuICAgICAgc291cmNlID0gXCJfX3AgKz0gJ1wiO1xuXG4gIC8vIENvbXBpbGUgdGhlIHJlZ2V4cCB0byBtYXRjaCBlYWNoIGRlbGltaXRlci5cbiAgdmFyIHJlRGVsaW1pdGVycyA9IFJlZ0V4cChcbiAgICAob3B0aW9ucy5lc2NhcGUgfHwgcmVOb01hdGNoKS5zb3VyY2UgKyAnfCcgK1xuICAgIGludGVycG9sYXRlLnNvdXJjZSArICd8JyArXG4gICAgKGludGVycG9sYXRlID09PSByZUludGVycG9sYXRlID8gcmVFc1RlbXBsYXRlIDogcmVOb01hdGNoKS5zb3VyY2UgKyAnfCcgK1xuICAgIChvcHRpb25zLmV2YWx1YXRlIHx8IHJlTm9NYXRjaCkuc291cmNlICsgJ3wkJ1xuICAsICdnJyk7XG5cbiAgLy8gVXNlIGEgc291cmNlVVJMIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuICAvLyBUaGUgc291cmNlVVJMIGdldHMgaW5qZWN0ZWQgaW50byB0aGUgc291cmNlIHRoYXQncyBldmFsLWVkLCBzbyBiZSBjYXJlZnVsXG4gIC8vIHdpdGggbG9va3VwIChpbiBjYXNlIG9mIGUuZy4gcHJvdG90eXBlIHBvbGx1dGlvbiksIGFuZCBzdHJpcCBuZXdsaW5lcyBpZiBhbnkuXG4gIC8vIEEgbmV3bGluZSB3b3VsZG4ndCBiZSBhIHZhbGlkIHNvdXJjZVVSTCBhbnl3YXksIGFuZCBpdCdkIGVuYWJsZSBjb2RlIGluamVjdGlvbi5cbiAgdmFyIHNvdXJjZVVSTCA9IGhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgJ3NvdXJjZVVSTCcpXG4gICAgPyAoJy8vIyBzb3VyY2VVUkw9JyArXG4gICAgICAgKG9wdGlvbnMuc291cmNlVVJMICsgJycpLnJlcGxhY2UoL1tcXHJcXG5dL2csICcgJykgK1xuICAgICAgICdcXG4nKVxuICAgIDogJyc7XG5cbiAgc3RyaW5nLnJlcGxhY2UocmVEZWxpbWl0ZXJzLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlVmFsdWUsIGludGVycG9sYXRlVmFsdWUsIGVzVGVtcGxhdGVWYWx1ZSwgZXZhbHVhdGVWYWx1ZSwgb2Zmc2V0KSB7XG4gICAgaW50ZXJwb2xhdGVWYWx1ZSB8fCAoaW50ZXJwb2xhdGVWYWx1ZSA9IGVzVGVtcGxhdGVWYWx1ZSk7XG5cbiAgICAvLyBFc2NhcGUgY2hhcmFjdGVycyB0aGF0IGNhbid0IGJlIGluY2x1ZGVkIGluIHN0cmluZyBsaXRlcmFscy5cbiAgICBzb3VyY2UgKz0gc3RyaW5nLnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UocmVVbmVzY2FwZWRTdHJpbmcsIGVzY2FwZVN0cmluZ0NoYXIpO1xuXG4gICAgLy8gUmVwbGFjZSBkZWxpbWl0ZXJzIHdpdGggc25pcHBldHMuXG4gICAgaWYgKGVzY2FwZVZhbHVlKSB7XG4gICAgICBpc0VzY2FwaW5nID0gdHJ1ZTtcbiAgICAgIHNvdXJjZSArPSBcIicgK1xcbl9fZShcIiArIGVzY2FwZVZhbHVlICsgXCIpICtcXG4nXCI7XG4gICAgfVxuICAgIGlmIChldmFsdWF0ZVZhbHVlKSB7XG4gICAgICBpc0V2YWx1YXRpbmcgPSB0cnVlO1xuICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlVmFsdWUgKyBcIjtcXG5fX3AgKz0gJ1wiO1xuICAgIH1cbiAgICBpZiAoaW50ZXJwb2xhdGVWYWx1ZSkge1xuICAgICAgc291cmNlICs9IFwiJyArXFxuKChfX3QgPSAoXCIgKyBpbnRlcnBvbGF0ZVZhbHVlICsgXCIpKSA9PSBudWxsID8gJycgOiBfX3QpICtcXG4nXCI7XG4gICAgfVxuICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgLy8gVGhlIEpTIGVuZ2luZSBlbWJlZGRlZCBpbiBBZG9iZSBwcm9kdWN0cyBuZWVkcyBgbWF0Y2hgIHJldHVybmVkIGluXG4gICAgLy8gb3JkZXIgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBgb2Zmc2V0YCB2YWx1ZS5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH0pO1xuXG4gIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgLy8gSWYgYHZhcmlhYmxlYCBpcyBub3Qgc3BlY2lmaWVkIHdyYXAgYSB3aXRoLXN0YXRlbWVudCBhcm91bmQgdGhlIGdlbmVyYXRlZFxuICAvLyBjb2RlIHRvIGFkZCB0aGUgZGF0YSBvYmplY3QgdG8gdGhlIHRvcCBvZiB0aGUgc2NvcGUgY2hhaW4uXG4gIC8vIExpa2Ugd2l0aCBzb3VyY2VVUkwsIHdlIHRha2UgY2FyZSB0byBub3QgY2hlY2sgdGhlIG9wdGlvbidzIHByb3RvdHlwZSxcbiAgLy8gYXMgdGhpcyBjb25maWd1cmF0aW9uIGlzIGEgY29kZSBpbmplY3Rpb24gdmVjdG9yLlxuICB2YXIgdmFyaWFibGUgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICd2YXJpYWJsZScpICYmIG9wdGlvbnMudmFyaWFibGU7XG4gIGlmICghdmFyaWFibGUpIHtcbiAgICBzb3VyY2UgPSAnd2l0aCAob2JqKSB7XFxuJyArIHNvdXJjZSArICdcXG59XFxuJztcbiAgfVxuICAvLyBDbGVhbnVwIGNvZGUgYnkgc3RyaXBwaW5nIGVtcHR5IHN0cmluZ3MuXG4gIHNvdXJjZSA9IChpc0V2YWx1YXRpbmcgPyBzb3VyY2UucmVwbGFjZShyZUVtcHR5U3RyaW5nTGVhZGluZywgJycpIDogc291cmNlKVxuICAgIC5yZXBsYWNlKHJlRW1wdHlTdHJpbmdNaWRkbGUsICckMScpXG4gICAgLnJlcGxhY2UocmVFbXB0eVN0cmluZ1RyYWlsaW5nLCAnJDE7Jyk7XG5cbiAgLy8gRnJhbWUgY29kZSBhcyB0aGUgZnVuY3Rpb24gYm9keS5cbiAgc291cmNlID0gJ2Z1bmN0aW9uKCcgKyAodmFyaWFibGUgfHwgJ29iaicpICsgJykge1xcbicgK1xuICAgICh2YXJpYWJsZVxuICAgICAgPyAnJ1xuICAgICAgOiAnb2JqIHx8IChvYmogPSB7fSk7XFxuJ1xuICAgICkgK1xuICAgIFwidmFyIF9fdCwgX19wID0gJydcIiArXG4gICAgKGlzRXNjYXBpbmdcbiAgICAgICA/ICcsIF9fZSA9IF8uZXNjYXBlJ1xuICAgICAgIDogJydcbiAgICApICtcbiAgICAoaXNFdmFsdWF0aW5nXG4gICAgICA/ICcsIF9faiA9IEFycmF5LnByb3RvdHlwZS5qb2luO1xcbicgK1xuICAgICAgICBcImZ1bmN0aW9uIHByaW50KCkgeyBfX3AgKz0gX19qLmNhbGwoYXJndW1lbnRzLCAnJykgfVxcblwiXG4gICAgICA6ICc7XFxuJ1xuICAgICkgK1xuICAgIHNvdXJjZSArXG4gICAgJ3JldHVybiBfX3BcXG59JztcblxuICB2YXIgcmVzdWx0ID0gYXR0ZW1wdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24oaW1wb3J0c0tleXMsIHNvdXJjZVVSTCArICdyZXR1cm4gJyArIHNvdXJjZSlcbiAgICAgIC5hcHBseSh1bmRlZmluZWQsIGltcG9ydHNWYWx1ZXMpO1xuICB9KTtcblxuICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBmdW5jdGlvbidzIHNvdXJjZSBieSBpdHMgYHRvU3RyaW5nYCBtZXRob2Qgb3JcbiAgLy8gdGhlIGBzb3VyY2VgIHByb3BlcnR5IGFzIGEgY29udmVuaWVuY2UgZm9yIGlubGluaW5nIGNvbXBpbGVkIHRlbXBsYXRlcy5cbiAgcmVzdWx0LnNvdXJjZSA9IHNvdXJjZTtcbiAgaWYgKGlzRXJyb3IocmVzdWx0KSkge1xuICAgIHRocm93IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJhc2VGb3I7XG4iLCJpbXBvcnQgY3JlYXRlQmFzZUZvciBmcm9tICcuL19jcmVhdGVCYXNlRm9yLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRm9yO1xuIiwiaW1wb3J0IGJhc2VGb3IgZnJvbSAnLi9fYmFzZUZvci5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGb3JPd247XG4iLCJpbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG4gICAgaWYgKCFpc0FycmF5TGlrZShjb2xsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChjb2xsZWN0aW9uKTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJhc2VFYWNoO1xuIiwiaW1wb3J0IGJhc2VGb3JPd24gZnJvbSAnLi9fYmFzZUZvck93bi5qcyc7XG5pbXBvcnQgY3JlYXRlQmFzZUVhY2ggZnJvbSAnLi9fY3JlYXRlQmFzZUVhY2guanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUVhY2g7XG4iLCJpbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBgaWRlbnRpdHlgIGlmIGl0J3Mgbm90IGEgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgY2FzdCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY2FzdEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlIDogaWRlbnRpdHk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhc3RGdW5jdGlvbjtcbiIsImltcG9ydCBhcnJheUVhY2ggZnJvbSAnLi9fYXJyYXlFYWNoLmpzJztcbmltcG9ydCBiYXNlRWFjaCBmcm9tICcuL19iYXNlRWFjaC5qcyc7XG5pbXBvcnQgY2FzdEZ1bmN0aW9uIGZyb20gJy4vX2Nhc3RGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggZWxlbWVudC5cbiAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogKipOb3RlOioqIEFzIHdpdGggb3RoZXIgXCJDb2xsZWN0aW9uc1wiIG1ldGhvZHMsIG9iamVjdHMgd2l0aCBhIFwibGVuZ3RoXCJcbiAqIHByb3BlcnR5IGFyZSBpdGVyYXRlZCBsaWtlIGFycmF5cy4gVG8gYXZvaWQgdGhpcyBiZWhhdmlvciB1c2UgYF8uZm9ySW5gXG4gKiBvciBgXy5mb3JPd25gIGZvciBvYmplY3QgaXRlcmF0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBhbGlhcyBlYWNoXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBzZWUgXy5mb3JFYWNoUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogXy5mb3JFYWNoKFsxLCAyXSwgZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgY29uc29sZS5sb2codmFsdWUpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzIGAxYCB0aGVuIGAyYC5cbiAqXG4gKiBfLmZvckVhY2goeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RWFjaCA6IGJhc2VFYWNoO1xuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCBjYXN0RnVuY3Rpb24oaXRlcmF0ZWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9yRWFjaDtcbiIsIi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlQ2xlYXI7XG4iLCJpbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzc29jSW5kZXhPZjtcbiIsImltcG9ydCBhc3NvY0luZGV4T2YgZnJvbSAnLi9fYXNzb2NJbmRleE9mLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVEZWxldGU7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUdldDtcbiIsImltcG9ydCBhc3NvY0luZGV4T2YgZnJvbSAnLi9fYXNzb2NJbmRleE9mLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUhhcztcbiIsImltcG9ydCBhc3NvY0luZGV4T2YgZnJvbSAnLi9fYXNzb2NJbmRleE9mLmpzJztcblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICArK3RoaXMuc2l6ZTtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVTZXQ7XG4iLCJpbXBvcnQgbGlzdENhY2hlQ2xlYXIgZnJvbSAnLi9fbGlzdENhY2hlQ2xlYXIuanMnO1xuaW1wb3J0IGxpc3RDYWNoZURlbGV0ZSBmcm9tICcuL19saXN0Q2FjaGVEZWxldGUuanMnO1xuaW1wb3J0IGxpc3RDYWNoZUdldCBmcm9tICcuL19saXN0Q2FjaGVHZXQuanMnO1xuaW1wb3J0IGxpc3RDYWNoZUhhcyBmcm9tICcuL19saXN0Q2FjaGVIYXMuanMnO1xuaW1wb3J0IGxpc3RDYWNoZVNldCBmcm9tICcuL19saXN0Q2FjaGVTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RDYWNoZTtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICByZXN1bHQgPSBkYXRhWydkZWxldGUnXShrZXkpO1xuXG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tEZWxldGU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrR2V0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tIYXM7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcDtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlQ3JlYXRlO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaENsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaERlbGV0ZTtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoR2V0O1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hIYXM7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgdGhpcy5zaXplICs9IHRoaXMuaGFzKGtleSkgPyAwIDogMTtcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoU2V0O1xuIiwiaW1wb3J0IGhhc2hDbGVhciBmcm9tICcuL19oYXNoQ2xlYXIuanMnO1xuaW1wb3J0IGhhc2hEZWxldGUgZnJvbSAnLi9faGFzaERlbGV0ZS5qcyc7XG5pbXBvcnQgaGFzaEdldCBmcm9tICcuL19oYXNoR2V0LmpzJztcbmltcG9ydCBoYXNoSGFzIGZyb20gJy4vX2hhc2hIYXMuanMnO1xuaW1wb3J0IGhhc2hTZXQgZnJvbSAnLi9faGFzaFNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBIYXNoO1xuIiwiaW1wb3J0IEhhc2ggZnJvbSAnLi9fSGFzaC5qcyc7XG5pbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuc2l6ZSA9IDA7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVDbGVhcjtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNLZXlhYmxlO1xuIiwiaW1wb3J0IGlzS2V5YWJsZSBmcm9tICcuL19pc0tleWFibGUuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE1hcERhdGE7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlRGVsZXRlO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVHZXQ7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVIYXM7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZVNldDtcbiIsImltcG9ydCBtYXBDYWNoZUNsZWFyIGZyb20gJy4vX21hcENhY2hlQ2xlYXIuanMnO1xuaW1wb3J0IG1hcENhY2hlRGVsZXRlIGZyb20gJy4vX21hcENhY2hlRGVsZXRlLmpzJztcbmltcG9ydCBtYXBDYWNoZUdldCBmcm9tICcuL19tYXBDYWNoZUdldC5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVIYXMgZnJvbSAnLi9fbWFwQ2FjaGVIYXMuanMnO1xuaW1wb3J0IG1hcENhY2hlU2V0IGZyb20gJy4vX21hcENhY2hlU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcENhY2hlO1xuIiwiaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuaW1wb3J0IE1hcENhY2hlIGZyb20gJy4vX01hcENhY2hlLmpzJztcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gZGF0YS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICB0aGlzLnNpemUgPSArK2RhdGEuc2l6ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrU2V0O1xuIiwiaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuaW1wb3J0IHN0YWNrQ2xlYXIgZnJvbSAnLi9fc3RhY2tDbGVhci5qcyc7XG5pbXBvcnQgc3RhY2tEZWxldGUgZnJvbSAnLi9fc3RhY2tEZWxldGUuanMnO1xuaW1wb3J0IHN0YWNrR2V0IGZyb20gJy4vX3N0YWNrR2V0LmpzJztcbmltcG9ydCBzdGFja0hhcyBmcm9tICcuL19zdGFja0hhcy5qcyc7XG5pbXBvcnQgc3RhY2tTZXQgZnJvbSAnLi9fc3RhY2tTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWNrO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25NZXJnZVZhbHVlO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIGFsbG9jVW5zYWZlID0gQnVmZmVyID8gQnVmZmVyLmFsbG9jVW5zYWZlIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYWxsb2NVbnNhZmUgPyBhbGxvY1Vuc2FmZShsZW5ndGgpIDogbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsb25lQnVmZmVyO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IFVpbnQ4QXJyYXk7XG4iLCJpbXBvcnQgVWludDhBcnJheSBmcm9tICcuL19VaW50OEFycmF5LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlcikge1xuICB2YXIgcmVzdWx0ID0gbmV3IGFycmF5QnVmZmVyLmNvbnN0cnVjdG9yKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXN1bHQpLnNldChuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZUFycmF5QnVmZmVyO1xuIiwiaW1wb3J0IGNsb25lQXJyYXlCdWZmZXIgZnJvbSAnLi9fY2xvbmVBcnJheUJ1ZmZlci5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsb25lVHlwZWRBcnJheTtcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3B5QXJyYXk7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY3JlYXRlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFzc2lnbmluZ1xuICogcHJvcGVydGllcyB0byB0aGUgY3JlYXRlZCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90byBUaGUgb2JqZWN0IHRvIGluaGVyaXQgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbnZhciBiYXNlQ3JlYXRlID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBvYmplY3QoKSB7fVxuICByZXR1cm4gZnVuY3Rpb24ocHJvdG8pIHtcbiAgICBpZiAoIWlzT2JqZWN0KHByb3RvKSkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBpZiAob2JqZWN0Q3JlYXRlKSB7XG4gICAgICByZXR1cm4gb2JqZWN0Q3JlYXRlKHByb3RvKTtcbiAgICB9XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHByb3RvO1xuICAgIHZhciByZXN1bHQgPSBuZXcgb2JqZWN0O1xuICAgIG9iamVjdC5wcm90b3R5cGUgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VDcmVhdGU7XG4iLCJpbXBvcnQgYmFzZUNyZWF0ZSBmcm9tICcuL19iYXNlQ3JlYXRlLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdENsb25lT2JqZWN0O1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheUxpa2VPYmplY3Q7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgLCB1bmxlc3MgYGtleWAgaXMgXCJfX3Byb3RvX19cIiBvciBcImNvbnN0cnVjdG9yXCIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzYWZlR2V0KG9iamVjdCwga2V5KSB7XG4gIGlmIChrZXkgPT09ICdjb25zdHJ1Y3RvcicgJiYgdHlwZW9mIG9iamVjdFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGtleSA9PSAnX19wcm90b19fJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Rba2V5XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2FmZUdldDtcbiIsImltcG9ydCBjb3B5T2JqZWN0IGZyb20gJy4vX2NvcHlPYmplY3QuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9QbGFpbk9iamVjdDtcbiIsImltcG9ydCBhc3NpZ25NZXJnZVZhbHVlIGZyb20gJy4vX2Fzc2lnbk1lcmdlVmFsdWUuanMnO1xuaW1wb3J0IGNsb25lQnVmZmVyIGZyb20gJy4vX2Nsb25lQnVmZmVyLmpzJztcbmltcG9ydCBjbG9uZVR5cGVkQXJyYXkgZnJvbSAnLi9fY2xvbmVUeXBlZEFycmF5LmpzJztcbmltcG9ydCBjb3B5QXJyYXkgZnJvbSAnLi9fY29weUFycmF5LmpzJztcbmltcG9ydCBpbml0Q2xvbmVPYmplY3QgZnJvbSAnLi9faW5pdENsb25lT2JqZWN0LmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2VPYmplY3QgZnJvbSAnLi9pc0FycmF5TGlrZU9iamVjdC5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnLi9pc1BsYWluT2JqZWN0LmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IHNhZmVHZXQgZnJvbSAnLi9fc2FmZUdldC5qcyc7XG5pbXBvcnQgdG9QbGFpbk9iamVjdCBmcm9tICcuL3RvUGxhaW5PYmplY3QuanMnO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gc2FmZUdldChvYmplY3QsIGtleSksXG4gICAgICBzcmNWYWx1ZSA9IHNhZmVHZXQoc291cmNlLCBrZXkpLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkoc3JjVmFsdWUpLFxuICAgICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgaXNCdWZmZXIoc3JjVmFsdWUpLFxuICAgICAgICBpc1R5cGVkID0gIWlzQXJyICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKTtcblxuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyIHx8IGlzQnVmZiB8fCBpc1R5cGVkKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0J1ZmYpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZUJ1ZmZlcihzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1R5cGVkKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVUeXBlZEFycmF5KHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IGlzRnVuY3Rpb24ob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaW5pdENsb25lT2JqZWN0KHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWVyZ2VEZWVwO1xuIiwiaW1wb3J0IFN0YWNrIGZyb20gJy4vX1N0YWNrLmpzJztcbmltcG9ydCBhc3NpZ25NZXJnZVZhbHVlIGZyb20gJy4vX2Fzc2lnbk1lcmdlVmFsdWUuanMnO1xuaW1wb3J0IGJhc2VGb3IgZnJvbSAnLi9fYmFzZUZvci5qcyc7XG5pbXBvcnQgYmFzZU1lcmdlRGVlcCBmcm9tICcuL19iYXNlTWVyZ2VEZWVwLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuaW1wb3J0IHNhZmVHZXQgZnJvbSAnLi9fc2FmZUdldC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBiYXNlRm9yKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIoc2FmZUdldChvYmplY3QsIGtleSksIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSwga2V5c0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlO1xuIiwiaW1wb3J0IGJhc2VNZXJnZSBmcm9tICcuL19iYXNlTWVyZ2UuanMnO1xuaW1wb3J0IGNyZWF0ZUFzc2lnbmVyIGZyb20gJy4vX2NyZWF0ZUFzc2lnbmVyLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlO1xuIiwiaW1wb3J0IGJhc2VWYWx1ZXMgZnJvbSAnLi9fYmFzZVZhbHVlcy5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udmFsdWVzKG5ldyBGb28pO1xuICogLy8gPT4gWzEsIDJdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy52YWx1ZXMoJ2hpJyk7XG4gKiAvLyA9PiBbJ2gnLCAnaSddXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gW10gOiBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsdWVzO1xuIiwiLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldENhY2hlQWRkO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRDYWNoZUhhcztcbiIsImltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5pbXBvcnQgc2V0Q2FjaGVBZGQgZnJvbSAnLi9fc2V0Q2FjaGVBZGQuanMnO1xuaW1wb3J0IHNldENhY2hlSGFzIGZyb20gJy4vX3NldENhY2hlSGFzLmpzJztcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPT0gbnVsbCA/IDAgOiB2YWx1ZXMubGVuZ3RoO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG5leHBvcnQgZGVmYXVsdCBTZXRDYWNoZTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5U29tZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGEgYGNhY2hlYCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYWNoZUhhcztcbiIsImltcG9ydCBTZXRDYWNoZSBmcm9tICcuL19TZXRDYWNoZS5qcyc7XG5pbXBvcnQgYXJyYXlTb21lIGZyb20gJy4vX2FycmF5U29tZS5qcyc7XG5pbXBvcnQgY2FjaGVIYXMgZnJvbSAnLi9fY2FjaGVIYXMuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgQ09NUEFSRV9VTk9SREVSRURfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFjYWNoZUhhcyhzZWVuLCBvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4ucHVzaChvdGhJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHxcbiAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKVxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbEFycmF5cztcbiIsIi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFRvQXJyYXk7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRUb0FycmF5O1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLi9fVWludDhBcnJheS5qcyc7XG5pbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5pbXBvcnQgZXF1YWxBcnJheXMgZnJvbSAnLi9fZXF1YWxBcnJheXMuanMnO1xuaW1wb3J0IG1hcFRvQXJyYXkgZnJvbSAnLi9fbWFwVG9BcnJheS5qcyc7XG5pbXBvcnQgc2V0VG9BcnJheSBmcm9tICcuL19zZXRUb0FycmF5LmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gQ09NUEFSRV9VTk9SREVSRURfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxCeVRhZztcbiIsIi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlQdXNoO1xuIiwiaW1wb3J0IGFycmF5UHVzaCBmcm9tICcuL19hcnJheVB1c2guanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0QWxsS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZpbHRlcmAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHRbcmVzSW5kZXgrK10gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlGaWx0ZXI7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViQXJyYXk7XG4iLCJpbXBvcnQgYXJyYXlGaWx0ZXIgZnJvbSAnLi9fYXJyYXlGaWx0ZXIuanMnO1xuaW1wb3J0IHN0dWJBcnJheSBmcm9tICcuL3N0dWJBcnJheS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYXJyYXlGaWx0ZXIobmF0aXZlR2V0U3ltYm9scyhvYmplY3QpLCBmdW5jdGlvbihzeW1ib2wpIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHN5bWJvbCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0U3ltYm9scztcbiIsImltcG9ydCBiYXNlR2V0QWxsS2V5cyBmcm9tICcuL19iYXNlR2V0QWxsS2V5cy5qcyc7XG5pbXBvcnQgZ2V0U3ltYm9scyBmcm9tICcuL19nZXRTeW1ib2xzLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEFsbEtleXM7XG4iLCJpbXBvcnQgZ2V0QWxsS2V5cyBmcm9tICcuL19nZXRBbGxLZXlzLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBnZXRBbGxLZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGdldEFsbEtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsT2JqZWN0cztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFWaWV3O1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNldDtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBXZWFrTWFwO1xuIiwiaW1wb3J0IERhdGFWaWV3IGZyb20gJy4vX0RhdGFWaWV3LmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcbmltcG9ydCBQcm9taXNlIGZyb20gJy4vX1Byb21pc2UuanMnO1xuaW1wb3J0IFNldCBmcm9tICcuL19TZXQuanMnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLi9fV2Vha01hcC5qcyc7XG5pbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzIDwgNi5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhc2VHZXRUYWcodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogJyc7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFRhZztcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgZXF1YWxBcnJheXMgZnJvbSAnLi9fZXF1YWxBcnJheXMuanMnO1xuaW1wb3J0IGVxdWFsQnlUYWcgZnJvbSAnLi9fZXF1YWxCeVRhZy5qcyc7XG5pbXBvcnQgZXF1YWxPYmplY3RzIGZyb20gJy4vX2VxdWFsT2JqZWN0cy5qcyc7XG5pbXBvcnQgZ2V0VGFnIGZyb20gJy4vX2dldFRhZy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IG9iaklzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob2JqZWN0KSxcbiAgICAgIG90aFRhZyA9IG90aElzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob3RoZXIpO1xuXG4gIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcblxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmIGlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKG90aGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBvYmpJc0FyciA9IHRydWU7XG4gICAgb2JqSXNPYmogPSBmYWxzZTtcbiAgfVxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNFcXVhbERlZXA7XG4iLCJpbXBvcnQgYmFzZUlzRXF1YWxEZWVwIGZyb20gJy4vX2Jhc2VJc0VxdWFsRGVlcC5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy5cbiAqICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGJhc2VJc0VxdWFsLCBzdGFjayk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc0VxdWFsO1xuIiwiaW1wb3J0IFN0YWNrIGZyb20gJy4vX1N0YWNrLmpzJztcbmltcG9ydCBiYXNlSXNFcXVhbCBmcm9tICcuL19iYXNlSXNFcXVhbC5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hdGNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gbWF0Y2hEYXRhLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIGRhdGFbMl0pXG4gICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICA6ICEoZGF0YVswXSBpbiBvYmplY3QpXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIHZhciBrZXkgPSBkYXRhWzBdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IGRhdGFbMV07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIGRhdGFbMl0pIHtcbiAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2s7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgfCBDT01QQVJFX1VOT1JERVJFRF9GTEFHLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgICAgIDogcmVzdWx0XG4gICAgICAgICAgKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNNYXRjaDtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N0cmljdENvbXBhcmFibGU7XG4iLCJpbXBvcnQgaXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TWF0Y2hEYXRhO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYG1hdGNoZXNQcm9wZXJ0eWAgZm9yIHNvdXJjZSB2YWx1ZXMgc3VpdGFibGVcbiAqIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdFtrZXldID09PSBzcmNWYWx1ZSAmJlxuICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZTtcbiIsImltcG9ydCBiYXNlSXNNYXRjaCBmcm9tICcuL19iYXNlSXNNYXRjaC5qcyc7XG5pbXBvcnQgZ2V0TWF0Y2hEYXRhIGZyb20gJy4vX2dldE1hdGNoRGF0YS5qcyc7XG5pbXBvcnQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIG1hdGNoRGF0YSA9IGdldE1hdGNoRGF0YShzb3VyY2UpO1xuICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShtYXRjaERhdGFbMF1bMF0sIG1hdGNoRGF0YVswXVsxXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT09IHNvdXJjZSB8fCBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hdGNoZXM7XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzS2V5O1xuIiwiaW1wb3J0IE1hcENhY2hlIGZyb20gJy4vX01hcENhY2hlLmpzJztcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGNsZWFyYCwgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICE9IG51bGwgJiYgdHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBtZW1vaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3MpIDogYXJnc1swXSxcbiAgICAgICAgY2FjaGUgPSBtZW1vaXplZC5jYWNoZTtcblxuICAgIGlmIChjYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBtZW1vaXplZC5jYWNoZSA9IGNhY2hlLnNldChrZXksIHJlc3VsdCkgfHwgY2FjaGU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbWVtb2l6ZWQuY2FjaGUgPSBuZXcgKG1lbW9pemUuQ2FjaGUgfHwgTWFwQ2FjaGUpO1xuICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbi8vIEV4cG9zZSBgTWFwQ2FjaGVgLlxubWVtb2l6ZS5DYWNoZSA9IE1hcENhY2hlO1xuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplO1xuIiwiaW1wb3J0IG1lbW9pemUgZnJvbSAnLi9tZW1vaXplLmpzJztcblxuLyoqIFVzZWQgYXMgdGhlIG1heGltdW0gbWVtb2l6ZSBjYWNoZSBzaXplLiAqL1xudmFyIE1BWF9NRU1PSVpFX1NJWkUgPSA1MDA7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1lbW9pemVgIHdoaWNoIGNsZWFycyB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24nc1xuICogY2FjaGUgd2hlbiBpdCBleGNlZWRzIGBNQVhfTUVNT0laRV9TSVpFYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1lbW9pemVDYXBwZWQoZnVuYykge1xuICB2YXIgcmVzdWx0ID0gbWVtb2l6ZShmdW5jLCBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoY2FjaGUuc2l6ZSA9PT0gTUFYX01FTU9JWkVfU0laRSkge1xuICAgICAgY2FjaGUuY2xlYXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfSk7XG5cbiAgdmFyIGNhY2hlID0gcmVzdWx0LmNhY2hlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplQ2FwcGVkO1xuIiwiaW1wb3J0IG1lbW9pemVDYXBwZWQgZnJvbSAnLi9fbWVtb2l6ZUNhcHBlZC5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZUNhcHBlZChmdW5jdGlvbihzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAoc3RyaW5nLmNoYXJDb2RlQXQoMCkgPT09IDQ2IC8qIC4gKi8pIHtcbiAgICByZXN1bHQucHVzaCgnJyk7XG4gIH1cbiAgc3RyaW5nLnJlcGxhY2UocmVQcm9wTmFtZSwgZnVuY3Rpb24obWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuICAgIHJlc3VsdC5wdXNoKHF1b3RlID8gc3ViU3RyaW5nLnJlcGxhY2UocmVFc2NhcGVDaGFyLCAnJDEnKSA6IChudW1iZXIgfHwgbWF0Y2gpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5nVG9QYXRoO1xuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgc3RyaW5nVG9QYXRoIGZyb20gJy4vX3N0cmluZ1RvUGF0aC5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gaXNLZXkodmFsdWUsIG9iamVjdCkgPyBbdmFsdWVdIDogc3RyaW5nVG9QYXRoKHRvU3RyaW5nKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhc3RQYXRoO1xuIiwiaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9LZXk7XG4iLCJpbXBvcnQgY2FzdFBhdGggZnJvbSAnLi9fY2FzdFBhdGguanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldDtcbiIsImltcG9ydCBiYXNlR2V0IGZyb20gJy4vX2Jhc2VHZXQuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzSW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSGFzSW47XG4iLCJpbXBvcnQgY2FzdFBhdGggZnJvbSAnLi9fY2FzdFBhdGguanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGV4aXN0cyBvbiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYXNGdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjayBwcm9wZXJ0aWVzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzUGF0aChvYmplY3QsIHBhdGgsIGhhc0Z1bmMpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKTtcbiAgICBpZiAoIShyZXN1bHQgPSBvYmplY3QgIT0gbnVsbCAmJiBoYXNGdW5jKG9iamVjdCwga2V5KSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgfVxuICBpZiAocmVzdWx0IHx8ICsraW5kZXggIT0gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBvYmplY3QubGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc1BhdGg7XG4iLCJpbXBvcnQgYmFzZUhhc0luIGZyb20gJy4vX2Jhc2VIYXNJbi5qcyc7XG5pbXBvcnQgaGFzUGF0aCBmcm9tICcuL19oYXNQYXRoLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBiYXNlSGFzSW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNJbjtcbiIsImltcG9ydCBiYXNlSXNFcXVhbCBmcm9tICcuL19iYXNlSXNFcXVhbC5qcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy4vZ2V0LmpzJztcbmltcG9ydCBoYXNJbiBmcm9tICcuL2hhc0luLmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgaXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5pbXBvcnQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gIGlmIChpc0tleShwYXRoKSAmJiBpc1N0cmljdENvbXBhcmFibGUoc3JjVmFsdWUpKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKHRvS2V5KHBhdGgpLCBzcmNWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBvYmpWYWx1ZSA9IGdldChvYmplY3QsIHBhdGgpO1xuICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICA/IGhhc0luKG9iamVjdCwgcGF0aClcbiAgICAgIDogYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBDT01QQVJFX1BBUlRJQUxfRkxBRyB8IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWF0Y2hlc1Byb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVByb3BlcnR5O1xuIiwiaW1wb3J0IGJhc2VHZXQgZnJvbSAnLi9fYmFzZUdldC5qcyc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUHJvcGVydHlgIHdoaWNoIHN1cHBvcnRzIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5RGVlcChwYXRoKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHlEZWVwO1xuIiwiaW1wb3J0IGJhc2VQcm9wZXJ0eSBmcm9tICcuL19iYXNlUHJvcGVydHkuanMnO1xuaW1wb3J0IGJhc2VQcm9wZXJ0eURlZXAgZnJvbSAnLi9fYmFzZVByb3BlcnR5RGVlcC5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiB7ICdiJzogMiB9IH0sXG4gKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAqIF07XG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAqIC8vID0+IFsxLCAyXVxuICovXG5mdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gIHJldHVybiBpc0tleShwYXRoKSA/IGJhc2VQcm9wZXJ0eSh0b0tleShwYXRoKSkgOiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcm9wZXJ0eTtcbiIsImltcG9ydCBiYXNlTWF0Y2hlcyBmcm9tICcuL19iYXNlTWF0Y2hlcy5qcyc7XG5pbXBvcnQgYmFzZU1hdGNoZXNQcm9wZXJ0eSBmcm9tICcuL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzJztcbmltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAnLi9wcm9wZXJ0eS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXRlcmF0ZWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFt2YWx1ZT1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhbiBpdGVyYXRlZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJdGVyYXRlZSh2YWx1ZSkge1xuICAvLyBEb24ndCBzdG9yZSB0aGUgYHR5cGVvZmAgcmVzdWx0IGluIGEgdmFyaWFibGUgdG8gYXZvaWQgYSBKSVQgYnVnIGluIFNhZmFyaSA5LlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjAzNCBmb3IgbW9yZSBkZXRhaWxzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgPyBiYXNlTWF0Y2hlc1Byb3BlcnR5KHZhbHVlWzBdLCB2YWx1ZVsxXSlcbiAgICAgIDogYmFzZU1hdGNoZXModmFsdWUpO1xuICB9XG4gIHJldHVybiBwcm9wZXJ0eSh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJdGVyYXRlZTtcbiIsImltcG9ydCBiYXNlRWFjaCBmcm9tICcuL19iYXNlRWFjaC5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWFwYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBpc0FycmF5TGlrZShjb2xsZWN0aW9uKSA/IEFycmF5KGNvbGxlY3Rpb24ubGVuZ3RoKSA6IFtdO1xuXG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBpdGVyYXRlZSh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXA7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNvcnRCeWAgd2hpY2ggdXNlcyBgY29tcGFyZXJgIHRvIGRlZmluZSB0aGVcbiAqIHNvcnQgb3JkZXIgb2YgYGFycmF5YCBhbmQgcmVwbGFjZXMgY3JpdGVyaWEgb2JqZWN0cyB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmdcbiAqIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNvcnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJlciBUaGUgZnVuY3Rpb24gdG8gZGVmaW5lIHNvcnQgb3JkZXIuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNvcnRCeShhcnJheSwgY29tcGFyZXIpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBhcnJheS5zb3J0KGNvbXBhcmVyKTtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgYXJyYXlbbGVuZ3RoXSA9IGFycmF5W2xlbmd0aF0udmFsdWU7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlU29ydEJ5O1xuIiwiaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKipcbiAqIENvbXBhcmVzIHZhbHVlcyB0byBzb3J0IHRoZW0gaW4gYXNjZW5kaW5nIG9yZGVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHNvcnQgb3JkZXIgaW5kaWNhdG9yIGZvciBgdmFsdWVgLlxuICovXG5mdW5jdGlvbiBjb21wYXJlQXNjZW5kaW5nKHZhbHVlLCBvdGhlcikge1xuICBpZiAodmFsdWUgIT09IG90aGVyKSB7XG4gICAgdmFyIHZhbElzRGVmaW5lZCA9IHZhbHVlICE9PSB1bmRlZmluZWQsXG4gICAgICAgIHZhbElzTnVsbCA9IHZhbHVlID09PSBudWxsLFxuICAgICAgICB2YWxJc1JlZmxleGl2ZSA9IHZhbHVlID09PSB2YWx1ZSxcbiAgICAgICAgdmFsSXNTeW1ib2wgPSBpc1N5bWJvbCh2YWx1ZSk7XG5cbiAgICB2YXIgb3RoSXNEZWZpbmVkID0gb3RoZXIgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgb3RoSXNOdWxsID0gb3RoZXIgPT09IG51bGwsXG4gICAgICAgIG90aElzUmVmbGV4aXZlID0gb3RoZXIgPT09IG90aGVyLFxuICAgICAgICBvdGhJc1N5bWJvbCA9IGlzU3ltYm9sKG90aGVyKTtcblxuICAgIGlmICgoIW90aElzTnVsbCAmJiAhb3RoSXNTeW1ib2wgJiYgIXZhbElzU3ltYm9sICYmIHZhbHVlID4gb3RoZXIpIHx8XG4gICAgICAgICh2YWxJc1N5bWJvbCAmJiBvdGhJc0RlZmluZWQgJiYgb3RoSXNSZWZsZXhpdmUgJiYgIW90aElzTnVsbCAmJiAhb3RoSXNTeW1ib2wpIHx8XG4gICAgICAgICh2YWxJc051bGwgJiYgb3RoSXNEZWZpbmVkICYmIG90aElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAoIXZhbElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgIXZhbElzUmVmbGV4aXZlKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKCghdmFsSXNOdWxsICYmICF2YWxJc1N5bWJvbCAmJiAhb3RoSXNTeW1ib2wgJiYgdmFsdWUgPCBvdGhlcikgfHxcbiAgICAgICAgKG90aElzU3ltYm9sICYmIHZhbElzRGVmaW5lZCAmJiB2YWxJc1JlZmxleGl2ZSAmJiAhdmFsSXNOdWxsICYmICF2YWxJc1N5bWJvbCkgfHxcbiAgICAgICAgKG90aElzTnVsbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICghb3RoSXNEZWZpbmVkICYmIHZhbElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAhb3RoSXNSZWZsZXhpdmUpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBhcmVBc2NlbmRpbmc7XG4iLCJpbXBvcnQgY29tcGFyZUFzY2VuZGluZyBmcm9tICcuL19jb21wYXJlQXNjZW5kaW5nLmpzJztcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLm9yZGVyQnlgIHRvIGNvbXBhcmUgbXVsdGlwbGUgcHJvcGVydGllcyBvZiBhIHZhbHVlIHRvIGFub3RoZXJcbiAqIGFuZCBzdGFibGUgc29ydCB0aGVtLlxuICpcbiAqIElmIGBvcmRlcnNgIGlzIHVuc3BlY2lmaWVkLCBhbGwgdmFsdWVzIGFyZSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyLiBPdGhlcndpc2UsXG4gKiBzcGVjaWZ5IGFuIG9yZGVyIG9mIFwiZGVzY1wiIGZvciBkZXNjZW5kaW5nIG9yIFwiYXNjXCIgZm9yIGFzY2VuZGluZyBzb3J0IG9yZGVyXG4gKiBvZiBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtib29sZWFuW118c3RyaW5nW119IG9yZGVycyBUaGUgb3JkZXIgdG8gc29ydCBieSBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHNvcnQgb3JkZXIgaW5kaWNhdG9yIGZvciBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZU11bHRpcGxlKG9iamVjdCwgb3RoZXIsIG9yZGVycykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIG9iakNyaXRlcmlhID0gb2JqZWN0LmNyaXRlcmlhLFxuICAgICAgb3RoQ3JpdGVyaWEgPSBvdGhlci5jcml0ZXJpYSxcbiAgICAgIGxlbmd0aCA9IG9iakNyaXRlcmlhLmxlbmd0aCxcbiAgICAgIG9yZGVyc0xlbmd0aCA9IG9yZGVycy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgcmVzdWx0ID0gY29tcGFyZUFzY2VuZGluZyhvYmpDcml0ZXJpYVtpbmRleF0sIG90aENyaXRlcmlhW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgaWYgKGluZGV4ID49IG9yZGVyc0xlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdmFyIG9yZGVyID0gb3JkZXJzW2luZGV4XTtcbiAgICAgIHJldHVybiByZXN1bHQgKiAob3JkZXIgPT0gJ2Rlc2MnID8gLTEgOiAxKTtcbiAgICB9XG4gIH1cbiAgLy8gRml4ZXMgYW4gYEFycmF5I3NvcnRgIGJ1ZyBpbiB0aGUgSlMgZW5naW5lIGVtYmVkZGVkIGluIEFkb2JlIGFwcGxpY2F0aW9uc1xuICAvLyB0aGF0IGNhdXNlcyBpdCwgdW5kZXIgY2VydGFpbiBjaXJjdW1zdGFuY2VzLCB0byBwcm92aWRlIHRoZSBzYW1lIHZhbHVlIGZvclxuICAvLyBgb2JqZWN0YCBhbmQgYG90aGVyYC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9wdWxsLzEyNDdcbiAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgLy9cbiAgLy8gVGhpcyBhbHNvIGVuc3VyZXMgYSBzdGFibGUgc29ydCBpbiBWOCBhbmQgb3RoZXIgZW5naW5lcy5cbiAgLy8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTkwIGZvciBtb3JlIGRldGFpbHMuXG4gIHJldHVybiBvYmplY3QuaW5kZXggLSBvdGhlci5pbmRleDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcGFyZU11bHRpcGxlO1xuIiwiaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcbmltcG9ydCBiYXNlSXRlcmF0ZWUgZnJvbSAnLi9fYmFzZUl0ZXJhdGVlLmpzJztcbmltcG9ydCBiYXNlTWFwIGZyb20gJy4vX2Jhc2VNYXAuanMnO1xuaW1wb3J0IGJhc2VTb3J0QnkgZnJvbSAnLi9fYmFzZVNvcnRCeS5qcyc7XG5pbXBvcnQgYmFzZVVuYXJ5IGZyb20gJy4vX2Jhc2VVbmFyeS5qcyc7XG5pbXBvcnQgY29tcGFyZU11bHRpcGxlIGZyb20gJy4vX2NvbXBhcmVNdWx0aXBsZS5qcyc7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ub3JkZXJCeWAgd2l0aG91dCBwYXJhbSBndWFyZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb25bXXxPYmplY3RbXXxzdHJpbmdbXX0gaXRlcmF0ZWVzIFRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IG9yZGVycyBUaGUgc29ydCBvcmRlcnMgb2YgYGl0ZXJhdGVlc2AuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzb3J0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VPcmRlckJ5KGNvbGxlY3Rpb24sIGl0ZXJhdGVlcywgb3JkZXJzKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpdGVyYXRlZXMgPSBhcnJheU1hcChpdGVyYXRlZXMubGVuZ3RoID8gaXRlcmF0ZWVzIDogW2lkZW50aXR5XSwgYmFzZVVuYXJ5KGJhc2VJdGVyYXRlZSkpO1xuXG4gIHZhciByZXN1bHQgPSBiYXNlTWFwKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgY3JpdGVyaWEgPSBhcnJheU1hcChpdGVyYXRlZXMsIGZ1bmN0aW9uKGl0ZXJhdGVlKSB7XG4gICAgICByZXR1cm4gaXRlcmF0ZWUodmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiB7ICdjcml0ZXJpYSc6IGNyaXRlcmlhLCAnaW5kZXgnOiArK2luZGV4LCAndmFsdWUnOiB2YWx1ZSB9O1xuICB9KTtcblxuICByZXR1cm4gYmFzZVNvcnRCeShyZXN1bHQsIGZ1bmN0aW9uKG9iamVjdCwgb3RoZXIpIHtcbiAgICByZXR1cm4gY29tcGFyZU11bHRpcGxlKG9iamVjdCwgb3RoZXIsIG9yZGVycyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlT3JkZXJCeTtcbiIsImltcG9ydCBiYXNlT3JkZXJCeSBmcm9tICcuL19iYXNlT3JkZXJCeS5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uc29ydEJ5YCBleGNlcHQgdGhhdCBpdCBhbGxvd3Mgc3BlY2lmeWluZyB0aGUgc29ydFxuICogb3JkZXJzIG9mIHRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS4gSWYgYG9yZGVyc2AgaXMgdW5zcGVjaWZpZWQsIGFsbCB2YWx1ZXNcbiAqIGFyZSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyLiBPdGhlcndpc2UsIHNwZWNpZnkgYW4gb3JkZXIgb2YgXCJkZXNjXCIgZm9yXG4gKiBkZXNjZW5kaW5nIG9yIFwiYXNjXCIgZm9yIGFzY2VuZGluZyBzb3J0IG9yZGVyIG9mIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0FycmF5W118RnVuY3Rpb25bXXxPYmplY3RbXXxzdHJpbmdbXX0gW2l0ZXJhdGVlcz1bXy5pZGVudGl0eV1dXG4gKiAgVGhlIGl0ZXJhdGVlcyB0byBzb3J0IGJ5LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gW29yZGVyc10gVGhlIHNvcnQgb3JkZXJzIG9mIGBpdGVyYXRlZXNgLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ucmVkdWNlYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IHNvcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0OCB9LFxuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNCB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCB9LFxuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKiBdO1xuICpcbiAqIC8vIFNvcnQgYnkgYHVzZXJgIGluIGFzY2VuZGluZyBvcmRlciBhbmQgYnkgYGFnZWAgaW4gZGVzY2VuZGluZyBvcmRlci5cbiAqIF8ub3JkZXJCeSh1c2VycywgWyd1c2VyJywgJ2FnZSddLCBbJ2FzYycsICdkZXNjJ10pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgW1snYmFybmV5JywgMzZdLCBbJ2Jhcm5leScsIDM0XSwgWydmcmVkJywgNDhdLCBbJ2ZyZWQnLCA0MF1dXG4gKi9cbmZ1bmN0aW9uIG9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMsIGd1YXJkKSB7XG4gIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc0FycmF5KGl0ZXJhdGVlcykpIHtcbiAgICBpdGVyYXRlZXMgPSBpdGVyYXRlZXMgPT0gbnVsbCA/IFtdIDogW2l0ZXJhdGVlc107XG4gIH1cbiAgb3JkZXJzID0gZ3VhcmQgPyB1bmRlZmluZWQgOiBvcmRlcnM7XG4gIGlmICghaXNBcnJheShvcmRlcnMpKSB7XG4gICAgb3JkZXJzID0gb3JkZXJzID09IG51bGwgPyBbXSA6IFtvcmRlcnNdO1xuICB9XG4gIHJldHVybiBiYXNlT3JkZXJCeShjb2xsZWN0aW9uLCBpdGVyYXRlZXMsIG9yZGVycyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yZGVyQnk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZpbmRJbmRleDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hTjtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluZGV4T2ZgIHdoaWNoIHBlcmZvcm1zIHN0cmljdCBlcXVhbGl0eVxuICogY29tcGFyaXNvbnMgb2YgdmFsdWVzLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaWN0SW5kZXhPZjtcbiIsImltcG9ydCBiYXNlRmluZEluZGV4IGZyb20gJy4vX2Jhc2VGaW5kSW5kZXguanMnO1xuaW1wb3J0IGJhc2VJc05hTiBmcm9tICcuL19iYXNlSXNOYU4uanMnO1xuaW1wb3J0IHN0cmljdEluZGV4T2YgZnJvbSAnLi9fc3RyaWN0SW5kZXhPZi5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWVcbiAgICA/IHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpXG4gICAgOiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGZyb21JbmRleCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJbmRleE9mO1xuIiwiaW1wb3J0IGJhc2VJbmRleE9mIGZyb20gJy4vX2Jhc2VJbmRleE9mLmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlJbmNsdWRlcztcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhcnJheUluY2x1ZGVzYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGEgY29tcGFyYXRvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5SW5jbHVkZXNXaXRoO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm9vcDtcbiIsImltcG9ydCBTZXQgZnJvbSAnLi9fU2V0LmpzJztcbmltcG9ydCBub29wIGZyb20gJy4vbm9vcC5qcyc7XG5pbXBvcnQgc2V0VG9BcnJheSBmcm9tICcuL19zZXRUb0FycmF5LmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2V0IG9iamVjdCBvZiBgdmFsdWVzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYWRkIHRvIHRoZSBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgc2V0LlxuICovXG52YXIgY3JlYXRlU2V0ID0gIShTZXQgJiYgKDEgLyBzZXRUb0FycmF5KG5ldyBTZXQoWywtMF0pKVsxXSkgPT0gSU5GSU5JVFkpID8gbm9vcCA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldCh2YWx1ZXMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2V0O1xuIiwiaW1wb3J0IFNldENhY2hlIGZyb20gJy4vX1NldENhY2hlLmpzJztcbmltcG9ydCBhcnJheUluY2x1ZGVzIGZyb20gJy4vX2FycmF5SW5jbHVkZXMuanMnO1xuaW1wb3J0IGFycmF5SW5jbHVkZXNXaXRoIGZyb20gJy4vX2FycmF5SW5jbHVkZXNXaXRoLmpzJztcbmltcG9ydCBjYWNoZUhhcyBmcm9tICcuL19jYWNoZUhhcy5qcyc7XG5pbXBvcnQgY3JlYXRlU2V0IGZyb20gJy4vX2NyZWF0ZVNldC5qcyc7XG5pbXBvcnQgc2V0VG9BcnJheSBmcm9tICcuL19zZXRUb0FycmF5LmpzJztcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICBzZWVuID0gcmVzdWx0O1xuXG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICB9XG4gIGVsc2UgaWYgKGxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgdmFyIHNldCA9IGl0ZXJhdGVlID8gbnVsbCA6IGNyZWF0ZVNldChhcnJheSk7XG4gICAgaWYgKHNldCkge1xuICAgICAgcmV0dXJuIHNldFRvQXJyYXkoc2V0KTtcbiAgICB9XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGNhY2hlSGFzO1xuICAgIHNlZW4gPSBuZXcgU2V0Q2FjaGU7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUpIDogdmFsdWU7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpbmNsdWRlcyhzZWVuLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIGlmIChzZWVuICE9PSByZXN1bHQpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVVuaXE7XG4iLCJpbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgYmFzZVVuaXEgZnJvbSAnLi9fYmFzZVVuaXEuanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8udW5pcWAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgaXRlcmF0ZWVgIHdoaWNoIGlzXG4gKiBpbnZva2VkIGZvciBlYWNoIGVsZW1lbnQgaW4gYGFycmF5YCB0byBnZW5lcmF0ZSB0aGUgY3JpdGVyaW9uIGJ5IHdoaWNoXG4gKiB1bmlxdWVuZXNzIGlzIGNvbXB1dGVkLiBUaGUgb3JkZXIgb2YgcmVzdWx0IHZhbHVlcyBpcyBkZXRlcm1pbmVkIGJ5IHRoZVxuICogb3JkZXIgdGhleSBvY2N1ciBpbiB0aGUgYXJyYXkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OlxuICogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcUJ5KFsyLjEsIDEuMiwgMi4zXSwgTWF0aC5mbG9vcik7XG4gKiAvLyA9PiBbMi4xLCAxLjJdXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnVuaXFCeShbeyAneCc6IDEgfSwgeyAneCc6IDIgfSwgeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDEgfSwgeyAneCc6IDIgfV1cbiAqL1xuZnVuY3Rpb24gdW5pcUJ5KGFycmF5LCBpdGVyYXRlZSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkgPyBiYXNlVW5pcShhcnJheSwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAyKSkgOiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdW5pcUJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgX3RlbXBsYXRlIGZyb20gJ2xvZGFzaC1lcy90ZW1wbGF0ZSc7XG5pbXBvcnQgX2ZvckVhY2ggZnJvbSAnbG9kYXNoLWVzL2ZvckVhY2gnO1xuaW1wb3J0IF9tZXJnZSBmcm9tICdsb2Rhc2gtZXMvbWVyZ2UnO1xuaW1wb3J0IF92YWx1ZXMgZnJvbSAnbG9kYXNoLWVzL3ZhbHVlcyc7XG5pbXBvcnQgX29yZGVyQnkgZnJvbSAnbG9kYXNoLWVzL29yZGVyQnknO1xuaW1wb3J0IF91bmlxQnkgZnJvbSAnbG9kYXNoLWVzL3VuaXFCeSc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRmVlZCB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdCA9IEZlZWQuZGVmYXVsdDtcblxuICAgIHRoaXMuX3NldHRpbmdzID0gX21lcmdlKHt9LCBGZWVkLmRlZmF1bHQsIGNvbmZpZyk7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbW9kdWxlXG4gICAqL1xuICBpbml0KCkge1xuICAgIGxldCBkYXRhID0gW107XG4gICAgbGV0IGZlZWQgPSB0aGlzLl9zZXR0aW5ncy5mZWVkO1xuICAgIGxldCBjb25maWcgPSB7XG4gICAgICByc3NUb0pzb246IEZlZWQucnNzVG9Kc29uLFxuICAgICAgcnNzVXJsOiAoQXJyYXkuaXNBcnJheShmZWVkKSkgPyBmZWVkIDogW2ZlZWRdXG4gICAgfTtcblxuICAgIC8vIEdvIHRocm91Z2ggZWFjaCBmZWVkXG4gICAgX2ZvckVhY2goY29uZmlnLnJzc1VybCwgKHVybCwgaW5kZXgpID0+IHtcbiAgICAgIC8vIE1ha2UgdGhlIHJlcXVlc3RcblxuICAgICAgdGhpcy5fcmVxdWVzdChjb25maWcsIHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBkYXRhXG4gICAgICAgICAgZGF0YS5wdXNoKHRoaXMuX3Byb2Nlc3MoSlNPTi5wYXJzZShyZXNwb25zZSksIHRoaXMuX3NldHRpbmdzKSk7XG4gICAgICAgICAgLy8gV2hlbiBhbGwgZmVlZHMgaGF2ZSBiZWVuIHJlcXVlc3RlZCwgbWVyZ2UgdGhlIGRhdGEgYW5kIGNvbXBpbGVcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IGNvbmZpZy5yc3NVcmwubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZShkYXRhLCB0aGlzLl9zZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIGxldCBjb21waWxlZCA9IHRoaXMuX3JlbmRlcihcbiAgICAgICAgICAgICAgdGhpcy5fbWVyZ2UoZGF0YSwgdGhpcy5fc2V0dGluZ3MpLFxuICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9zZXR0aW5ncy5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoZWwpIGVsLmlubmVySFRNTCA9IGNvbXBpbGVkO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIFhIUiByZXF1ZXN0IGZvciB0aGUgZmVlZCBkYXRhXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnIFRoZSByZXF1ZXN0IGRhdGFcbiAgICogQHBhcmFtICB7c3RyaW5nfSB1cmwgICAgVGhlIHJlcXVlc3QgdXJsXG4gICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIFJlc29sdmVzIHdoZW4gdGhlIHJlc3BvbnNlIGlzIHJlYWR5LCByZWplY3RzIHdoZW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG9wZXJhdGlvbiB0aW1lcyBvdXQgb3IgdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAqL1xuICBfcmVxdWVzdChjb25maWcsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IF94aHIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChfeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBpZiAoX3hoci5zdGF0dXMgPj0gMjAwICYmIF94aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKF94aHIucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKF94aHIuc3RhdHVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaGUgRmVlZCByZXF1ZXN0IHRpbWVkIG91dCcpKTtcbiAgICAgIH07XG4gICAgICB4aHIub3BlbignR0VUJywgYCR7Y29uZmlnLnJzc1RvSnNvbn0/cnNzX3VybD0ke3VybH1gLCB0cnVlKTtcbiAgICAgIHhoci5zZW5kKCk7XG4gICAgICB4aHIgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZGF0YSB0byB0aGUgYXBwcm9wcmlhdGUgcHJvY2Vzc2luZyBmdW5jdGlvbiBiYXNlZCBvbiB0eXBlXG4gICAqIEBwYXJhbSAge29iamVjdH0gZGF0YSAgICAgVGhlIHJlcXVlc3RlZCBmZWVkIGRhdGEgdG8gcGFzc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IHNldHRpbmdzIFRoZSBhcHBsaWNhdGlvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwcm9jZXNzZWQgZGF0YVxuICAgKi9cbiAgX3Byb2Nlc3MoZGF0YSwgc2V0dGluZ3MpIHtcbiAgICByZXR1cm4gRmVlZC5wcm9jZXNzW3NldHRpbmdzLnR5cGVdKGRhdGEsIHNldHRpbmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGRhdGEgdG8gdGhlIGFwcHJvcHJpYXRlIG1lcmdlIGZ1bmN0aW9uIGJhc2VkIG9uIHR5cGVcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIG1lcmdlZCBmZWVkIGRhdGFcbiAgICovXG4gIF9tZXJnZShkYXRhLCBzZXR0aW5ncykge1xuICAgIHJldHVybiBGZWVkLm1lcmdlW3NldHRpbmdzLnR5cGVdKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmUgdGVtcGxhdGUgY29tcG9uZW50cywgcGFzcyBkYXRhLCBhbmQgcmV0dXJuIGNvbXBpbGVkIHRlbWxhdGVcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgVGhlIGNvbXBsaWVkIGh0bWwgc3RyaW5nXG4gICAqL1xuICBfcmVuZGVyKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgZGF0YS5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG4gICAgaWYgKHNldHRpbmdzLmxvZylcbiAgICAgIGNvbnNvbGUuZGlyKGRhdGEpO1xuXG4gICAgbGV0IHRlbXBsYXRlID0gX3ZhbHVlcyhzZXR0aW5ncy50ZW1wbGF0ZXMpLmpvaW4oJycpO1xuICAgIGxldCBjb21waWxlZCA9IF90ZW1wbGF0ZShcbiAgICAgIHRlbXBsYXRlLFxuICAgICAge1xuICAgICAgICAnaW1wb3J0cyc6IHtcbiAgICAgICAgICAnX2VhY2gnOiBfZm9yRWFjaFxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gY29tcGlsZWQoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvcGVuIFJTUyB0byBKU09OIGFwaSwgc2VlIGh0dHBzOi8vcnNzMmpzb24uY29tXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5GZWVkLnJzc1RvSnNvbiA9ICdodHRwczovL2FwaS5yc3MyanNvbi5jb20vdjEvYXBpLmpzb24nO1xuXG4vKipcbiAqIFRoZSB0ZW1wbGF0ZSBmb3IgdGhlIHdpZGdldC5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbkZlZWQudGVtcGxhdGVzID0ge1xuICBtZWRpdW06IHtcbiAgICBvcGVuZXI6IFtcbiAgICAgICc8c2VjdGlvbiBjbGFzcz1cIm8tZmVlZCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy53cmFwcGVyICU+XCIgc3R5bGU9XCInLFxuICAgICAgICAnPCUgaWYgKHNldHRpbmdzLmZvbnRTaXplKSB7ICU+Zm9udC1zaXplOiA8JS0gc2V0dGluZ3MuZm9udFNpemUgJT47PCUgfSAlPicsXG4gICAgICAgICc8JSBpZiAoc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yKSB7ICU+Ym9yZGVyLWNvbG9yOiA8JS0gc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yICU+OzwlIH0gJT4nLFxuICAgICAgJ1wiPidcbiAgICBdLFxuICAgIGhlYWRlcjogW1xuICAgICAgJzxoZWFkZXIgY2xhc3M9XCJvLWZlZWRfX2hlYWRlciA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5oZWFkZXIgJT5cIj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm8tZmVlZF9fYXZhdGFyIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmF2YXRhciAlPlwiPicsXG4gICAgICAgICAgJzxpbWcgc3JjPVwiJyxcbiAgICAgICAgICAgICAgICAnPCUgaWYgKHNldHRpbmdzLnByb2ZpbGVJbWcgIT09IFwiXCIpIHsgJT4nLFxuICAgICAgICAgICAgICAgICAgJzwlLSBzZXR0aW5ncy5wcm9maWxlSW1nICU+JyxcbiAgICAgICAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgICAgICAgJzwlLSBmZWVkLnByb2ZpbGVJbWcgJT4nLFxuICAgICAgICAgICAgICAgICc8JSB9ICU+XCIgJyxcbiAgICAgICAgICAgICAgICd3aWR0aD1cIjwlLSBzZXR0aW5ncy5yYXRpb1Byb2ZpbGVbMF0gJT5cIiAnLFxuICAgICAgICAgICAgICAgJ2hlaWdodD1cIjwlLSBzZXR0aW5ncy5yYXRpb1Byb2ZpbGVbMV0gJT5cIj4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzxhIGNsYXNzPVwiby1mZWVkX191cmwgPCUtIHNldHRpbmdzLmNsYXNzZXMuYXZhdGFyICU+XCIgJyxcbiAgICAgICAgICAnaHJlZj1cIjwlIGlmIChzZXR0aW5ncy50aXRsZVVybCAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAnPCUtIHNldHRpbmdzLnRpdGxlVXJsICU+JyxcbiAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBmZWVkLnVybCAlPicsXG4gICAgICAgICAgJzwlIH0gJT5cIiAnLFxuICAgICAgICAgICAndGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiPicsXG4gICAgICAgICAgJzwlIGlmIChzZXR0aW5ncy50aXRsZSAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAnPCUtIHNldHRpbmdzLnRpdGxlICU+JyxcbiAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBmZWVkLnRpdGxlICU+JyxcbiAgICAgICAgICAnPCUgfSAlPicsXG4gICAgICAgICc8L2E+JyxcbiAgICAgICc8L2hlYWRlcj4nXG4gICAgXSxcbiAgICBwb3N0czogW1xuICAgICAgJzxkaXYgY2xhc3M9XCJvLWZlZWRfX2l0ZW1zXCIgc3R5bGU9XCInLFxuICAgICAgICAnYm9yZGVyLWNvbG9yOiA8JS0gc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yICU+OycsXG4gICAgICAnXCI+JyxcbiAgICAgICAgJzwlIF9lYWNoKGl0ZW1zLCBmdW5jdGlvbihwb3N0KSB7ICU+JyxcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmZlZWRJdGVtICU+XCI+JyxcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjLWZlZWQtaXRlbV9fdGl0bGUgPCUtIHNldHRpbmdzLmNsYXNzZXMudGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJjLWZlZWQtaXRlbV9fbGluayA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5saW5rICU+XCInLFxuICAgICAgICAgICAgICAgICAnaHJlZj1cIjwlLSBwb3N0Lmd1aWQgJT5cIicsXG4gICAgICAgICAgICAgICAgICd0YXJnZXQ9XCJfYmxhbmtcIicsXG4gICAgICAgICAgICAgICAgICdyZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAgICAgICAnPCUtIHBvc3QudGl0bGUgJT4nLFxuICAgICAgICAgICAgICAnPC9hPicsXG4gICAgICAgICAgICAnPC9oND4nLFxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2RhdGUgPCUtIHNldHRpbmdzLmNsYXNzZXMuZGF0ZSAlPlwiICcsXG4gICAgICAgICAgICAgICAgICAndGl0bGU9XCI8JS0gc2V0dGluZ3MucG9zdERhdGVUaXRsZSAlPlwiPicsXG4gICAgICAgICAgICAgICc8JS0gcG9zdC5kYXRlICU+JyxcbiAgICAgICAgICAgICc8L3NwYW4+JyxcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYy1mZWVkLWl0ZW1fX3RodW1ibmFpbCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy50aHVtYm5haWwgJT5cIicsXG4gICAgICAgICAgICAgICAgICdzdHlsZT1cIicsXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoPCUtIHBvc3QudGh1bWJuYWlsICU+KTsnLFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0OiA8JS0gc2V0dGluZ3MucG9zdEltZ0hlaWdodCAlPjtcIicsXG4gICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbj1cInRydWVcIj4nLFxuICAgICAgICAgICAgICAnPGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgc3JjPVwiPCUtIHBvc3QudGh1bWJuYWlsICU+XCIgYWx0PVwiPCUtIHBvc3QudGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJjLWZlZWQtaXRlbV9fZXhjZXJwdCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5leGNlcnB0ICU+XCI+JyxcbiAgICAgICAgICAgICAgJzwlLSBwb3N0LmV4Y2VycHQgJT48JS0gc2V0dGluZ3MucG9zdEV4Y2VycHRUcmFpbCAlPicsXG4gICAgICAgICAgICAnPC9wPicsXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtX19mb290ZXIgPCUtIHNldHRpbmdzLmNsYXNzZXMuaXRlbUZvb3RlciAlPlwiPicsXG4gICAgICAgICAgICAgICc8YSBjbGFzcz1cImMtZmVlZC1pdGVtX19jdGEgPCUtIHNldHRpbmdzLmNsYXNzZXMuY3RhICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgJ2hyZWY9XCI8JS0gcG9zdC5ndWlkICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgJ3RhcmdldD1cIl9ibGFua1wiICcsXG4gICAgICAgICAgICAgICAgICdyZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAgICAgICAnPCUtIHNldHRpbmdzLnBvc3RDdGFUZXh0ICU+JyxcbiAgICAgICAgICAgICAgJzwvYT4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8JSB9KTsgJT4nLFxuICAgICAgJzwvZGl2PidcbiAgICBdLFxuICAgIGNsb3NlcjogW1xuICAgICAgJzwvc2VjdGlvbj4nXG4gICAgXVxuICB9XG59O1xuXG4vKipcbiAqIEZ1bmN0aW9ucyBmb3IgcHJvY2Vzc2luZyB0aGUgZGF0YSBiYXNlZCBvbiB0aGUgZmVlZCB0eXBlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuRmVlZC5wcm9jZXNzID0ge1xuICBtZWRpdW06IGZ1bmN0aW9uKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgbGV0IGxlbmd0aCA9IHNldHRpbmdzLnBvc3RFeGNlcnB0TGVuZ3RoO1xuXG4gICAgX2ZvckVhY2goZGF0YS5pdGVtcywgZnVuY3Rpb24ocG9zdCwgaW5kZXgpIHtcbiAgICAgIGxldCBleGNlcnB0ID0gJyc7XG4gICAgICBsZXQgZGF0ZSA9ICcnO1xuXG4gICAgICAvLyBSZW1vdmUgZmlndXJlcyBmaXJzdFxuICAgICAgZXhjZXJwdCA9IHBvc3QuZGVzY3JpcHRpb25cbiAgICAgICAgLnJlcGxhY2UoLzxmaWd1cmUuKj4uKj88XFwvZmlndXJlPi9nLCAnJyk7XG5cbiAgICAgIC8vIFJlbW92ZSBhbGwgdGFnc1xuICAgICAgZXhjZXJwdCA9IGV4Y2VycHQucmVwbGFjZSgvPCgufFxcbikqPz4vZywgJycpO1xuXG4gICAgICAvLyBUcmltIHRoZSBleGNlcnB0XG4gICAgICBleGNlcnB0ID0gZXhjZXJwdC5zdWJzdHIoMCwgbGVuZ3RoKTtcbiAgICAgIGV4Y2VycHQgPSBleGNlcnB0LnN1YnN0cigwLFxuICAgICAgICBNYXRoLm1pbihleGNlcnB0Lmxlbmd0aCwgZXhjZXJwdC5sYXN0SW5kZXhPZignICcpKVxuICAgICAgKTtcblxuICAgICAgcG9zdC5leGNlcnB0ID0gZXhjZXJwdDtcblxuICAgICAgLy8gRm9ybWF0IHRoZSBkYXRlXG4gICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShwb3N0LnB1YkRhdGUucmVwbGFjZSgnICcsICdUJykpKVxuICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKHNldHRpbmdzLnBvc3REYXRlTG9jYWwsIHNldHRpbmdzLnBvc3REYXRlRm9ybWF0KTtcblxuICAgICAgcG9zdC5kYXRlID0gZGF0ZTtcblxuICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuXG4vKipcbiAqIEZ1bmN0aW9ucyBmb3IgbWVyZ2luZyB0aGUgZGF0YSBmZWVkcyB0b2dldGhlciwgYmFzZWQgb24gdGhlIGZlZWQgdHlwZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbkZlZWQubWVyZ2UgPSB7XG4gIG1lZGl1bTogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBtZXJnZWQgPSB7fTtcbiAgICBsZXQgaXRlbXMgPSBbXTtcblxuICAgIC8vIENvbWJpbmUgdGhlIHBvc3QgaXRlbXNcbiAgICBkYXRhLmZvckVhY2goKGZlZWQpID0+IHtcbiAgICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGZlZWQuaXRlbXMpO1xuICAgIH0pO1xuXG4gICAgLy8gTWVyZ2UgdGhlIGRhdGEsIHRoaXMgd2lsbCBvdmVycmlkZSB2YWx1ZXMsIGl0IHByb2JhYmx5IHdvbid0IGJlXG4gICAgLy8gcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgZmVlZHMgdGhhdCBhcmUgdGhlIHNhbWUsIGJ1dCBwb3RlbnRpYWxseVxuICAgIC8vIGRpZmZlcmVudCBmZWVkIHR5cGVzIGNvdWxkIHVzZSB0aGlzIGFuZCBjb21iaW5lIHVuaXF1ZSBkYXRhXG4gICAgZGF0YS5mb3JFYWNoKChmZWVkKSA9PiB7XG4gICAgICBtZXJnZWQgPSBfbWVyZ2UobWVyZ2VkLCBmZWVkKTtcbiAgICB9KTtcblxuICAgIC8vIEdldCB1bmlxdWUgcG9zdHNcbiAgICBpdGVtcyA9IF91bmlxQnkoaXRlbXMsIChpdGVtKSA9PiBpdGVtLmd1aWQpO1xuXG4gICAgbWVyZ2VkLml0ZW1zID0gX29yZGVyQnkoaXRlbXMsICdwdWJEYXRlJywgJ2Rlc2MnKTtcblxuICAgIHJldHVybiBtZXJnZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgaHR0cHM6Ly9yc3MyanNvbi5jb20vZG9jcyBmb3IgZGV0YWlscyBvbiBkZWZhdWx0IHBhcmFtZXRlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbkZlZWQuZGVmYXVsdCA9IHtcbiAgZmVlZDogJycsXG4gIHNlbGVjdG9yOiAnI2pzLWZlZWQnLFxuICB0eXBlOiAnbWVkaXVtJyxcbiAgdGl0bGU6ICcnLFxuICB0aXRsZVVybDogJycsXG4gIHByb2ZpbGVJbWc6ICcnLFxuICBmb250U2l6ZTogJycsXG4gIHJhdGlvUHJvZmlsZTogWyc1MCcsICc1MCddLFxuICBwb3N0Qm9yZGVyQ29sb3I6ICdsaWdodHN0ZWVsYmx1ZScsXG4gIHBvc3RJbWdIZWlnaHQ6ICcyMDBweCcsXG4gIHBvc3RFeGNlcnB0TGVuZ3RoOiAxMjAsXG4gIHBvc3RFeGNlcnB0VHJhaWw6ICfigKYnLFxuICBwb3N0Q3RhVGV4dDogJ1JlYWQgdGhlIGZ1bGwgcG9zdCcsXG4gIHBvc3REYXRlTG9jYWw6ICdlbi1VUycsXG4gIHBvc3REYXRlRm9ybWF0OiB7XG4gICAgeWVhcjogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnbG9uZycsXG4gICAgZGF5OiAnbnVtZXJpYydcbiAgfSxcbiAgcG9zdERhdGVUaXRsZTogJ1B1Ymxpc2hlZCBEYXRlJyxcbiAgY2xhc3Nlczoge1xuICAgIHdyYXBwZXI6ICcnLFxuICAgIGhlYWRlcjogJycsXG4gICAgdXJsOiAnJyxcbiAgICBmZWVkSXRlbTogJycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGxpbms6ICcnLFxuICAgIHRodW1ibmFpbDogJycsXG4gICAgZXhjZXJwdDogJycsXG4gICAgaXRlbUZvb3RlcjogJycsXG4gICAgY3RhOiAnJyxcbiAgICBkYXRlOiAnJ1xuICB9LFxuICB0ZW1wbGF0ZXM6IHtcbiAgICBvcGVuZXI6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5vcGVuZXIuam9pbignJyksXG4gICAgaGVhZGVyOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0uaGVhZGVyLmpvaW4oJycpLFxuICAgIHBvc3RzOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0ucG9zdHMuam9pbignJyksXG4gICAgY2xvc2VyOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0uY2xvc2VyLmpvaW4oJycpXG4gIH0sXG4gIGxvZzogZmFsc2UsXG4gIHVuaXF1ZTogZmFsc2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZlZWQ7XG4iXSwibmFtZXMiOlsiZnJlZUdsb2JhbCIsImdsb2JhbCIsIk9iamVjdCIsImZyZWVTZWxmIiwic2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsIlN5bWJvbCIsIm9iamVjdFByb3RvIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsInRvU3RyaW5nIiwic3ltVG9TdHJpbmdUYWciLCJ0b1N0cmluZ1RhZyIsInVuZGVmaW5lZCIsImdldFJhd1RhZyIsInZhbHVlIiwiaXNPd24iLCJjYWxsIiwidGFnIiwidW5tYXNrZWQiLCJlIiwicmVzdWx0Iiwib2JqZWN0VG9TdHJpbmciLCJudWxsVGFnIiwidW5kZWZpbmVkVGFnIiwiYmFzZUdldFRhZyIsImlzT2JqZWN0IiwidHlwZSIsImFzeW5jVGFnIiwiZnVuY1RhZyIsImdlblRhZyIsInByb3h5VGFnIiwiaXNGdW5jdGlvbiIsImNvcmVKc0RhdGEiLCJtYXNrU3JjS2V5IiwidWlkIiwiZXhlYyIsImtleXMiLCJJRV9QUk9UTyIsImlzTWFza2VkIiwiZnVuYyIsImZ1bmNQcm90byIsImZ1bmNUb1N0cmluZyIsInRvU291cmNlIiwicmVSZWdFeHBDaGFyIiwicmVJc0hvc3RDdG9yIiwicmVJc05hdGl2ZSIsIlJlZ0V4cCIsInJlcGxhY2UiLCJiYXNlSXNOYXRpdmUiLCJwYXR0ZXJuIiwidGVzdCIsImdldFZhbHVlIiwib2JqZWN0Iiwia2V5IiwiZ2V0TmF0aXZlIiwiZGVmaW5lUHJvcGVydHkiLCJiYXNlQXNzaWduVmFsdWUiLCJlcSIsIm90aGVyIiwiYXNzaWduVmFsdWUiLCJvYmpWYWx1ZSIsImNvcHlPYmplY3QiLCJzb3VyY2UiLCJwcm9wcyIsImN1c3RvbWl6ZXIiLCJpc05ldyIsImluZGV4IiwibGVuZ3RoIiwibmV3VmFsdWUiLCJpZGVudGl0eSIsImFwcGx5IiwidGhpc0FyZyIsImFyZ3MiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4Iiwib3ZlclJlc3QiLCJzdGFydCIsInRyYW5zZm9ybSIsImFyZ3VtZW50cyIsImFycmF5IiwiQXJyYXkiLCJvdGhlckFyZ3MiLCJjb25zdGFudCIsImJhc2VTZXRUb1N0cmluZyIsInN0cmluZyIsIkhPVF9DT1VOVCIsIkhPVF9TUEFOIiwibmF0aXZlTm93IiwiRGF0ZSIsIm5vdyIsInNob3J0T3V0IiwiY291bnQiLCJsYXN0Q2FsbGVkIiwic3RhbXAiLCJyZW1haW5pbmciLCJzZXRUb1N0cmluZyIsImJhc2VSZXN0IiwiTUFYX1NBRkVfSU5URUdFUiIsImlzTGVuZ3RoIiwiaXNBcnJheUxpa2UiLCJyZUlzVWludCIsImlzSW5kZXgiLCJpc0l0ZXJhdGVlQ2FsbCIsImNyZWF0ZUFzc2lnbmVyIiwiYXNzaWduZXIiLCJzb3VyY2VzIiwiZ3VhcmQiLCJiYXNlVGltZXMiLCJuIiwiaXRlcmF0ZWUiLCJpc09iamVjdExpa2UiLCJhcmdzVGFnIiwiYmFzZUlzQXJndW1lbnRzIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJpc0FyZ3VtZW50cyIsImlzQXJyYXkiLCJzdHViRmFsc2UiLCJmcmVlRXhwb3J0cyIsImV4cG9ydHMiLCJub2RlVHlwZSIsImZyZWVNb2R1bGUiLCJtb2R1bGUiLCJtb2R1bGVFeHBvcnRzIiwiQnVmZmVyIiwibmF0aXZlSXNCdWZmZXIiLCJpc0J1ZmZlciIsImFycmF5VGFnIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsIm9iamVjdFRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsIndlYWtNYXBUYWciLCJhcnJheUJ1ZmZlclRhZyIsImRhdGFWaWV3VGFnIiwiZmxvYXQzMlRhZyIsImZsb2F0NjRUYWciLCJpbnQ4VGFnIiwiaW50MTZUYWciLCJpbnQzMlRhZyIsInVpbnQ4VGFnIiwidWludDhDbGFtcGVkVGFnIiwidWludDE2VGFnIiwidWludDMyVGFnIiwidHlwZWRBcnJheVRhZ3MiLCJiYXNlSXNUeXBlZEFycmF5IiwiYmFzZVVuYXJ5IiwiZnJlZVByb2Nlc3MiLCJwcm9jZXNzIiwibm9kZVV0aWwiLCJ0eXBlcyIsInJlcXVpcmUiLCJiaW5kaW5nIiwibm9kZUlzVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsImFycmF5TGlrZUtleXMiLCJpbmhlcml0ZWQiLCJpc0FyciIsImlzQXJnIiwiaXNCdWZmIiwiaXNUeXBlIiwic2tpcEluZGV4ZXMiLCJTdHJpbmciLCJwdXNoIiwiaXNQcm90b3R5cGUiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJwcm90byIsIm5hdGl2ZUtleXNJbiIsImJhc2VLZXlzSW4iLCJpc1Byb3RvIiwia2V5c0luIiwiYXNzaWduSW5XaXRoIiwic3JjSW5kZXgiLCJvdmVyQXJnIiwiYXJnIiwiZ2V0UHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJvYmplY3RDdG9yU3RyaW5nIiwiaXNQbGFpbk9iamVjdCIsImRvbUV4Y1RhZyIsImlzRXJyb3IiLCJtZXNzYWdlIiwibmFtZSIsImF0dGVtcHQiLCJFcnJvciIsImFycmF5TWFwIiwiYmFzZVZhbHVlcyIsImN1c3RvbURlZmF1bHRzQXNzaWduSW4iLCJzcmNWYWx1ZSIsInN0cmluZ0VzY2FwZXMiLCJlc2NhcGVTdHJpbmdDaGFyIiwiY2hyIiwibmF0aXZlS2V5cyIsImJhc2VLZXlzIiwicmVJbnRlcnBvbGF0ZSIsImJhc2VQcm9wZXJ0eU9mIiwiaHRtbEVzY2FwZXMiLCJlc2NhcGVIdG1sQ2hhciIsInN5bWJvbFRhZyIsImlzU3ltYm9sIiwiSU5GSU5JVFkiLCJzeW1ib2xQcm90byIsInN5bWJvbFRvU3RyaW5nIiwiYmFzZVRvU3RyaW5nIiwicmVVbmVzY2FwZWRIdG1sIiwicmVIYXNVbmVzY2FwZWRIdG1sIiwiZXNjYXBlIiwicmVFc2NhcGUiLCJyZUV2YWx1YXRlIiwidGVtcGxhdGVTZXR0aW5ncyIsInJlRW1wdHlTdHJpbmdMZWFkaW5nIiwicmVFbXB0eVN0cmluZ01pZGRsZSIsInJlRW1wdHlTdHJpbmdUcmFpbGluZyIsInJlRXNUZW1wbGF0ZSIsInJlTm9NYXRjaCIsInJlVW5lc2NhcGVkU3RyaW5nIiwidGVtcGxhdGUiLCJvcHRpb25zIiwic2V0dGluZ3MiLCJpbXBvcnRzIiwiXyIsImltcG9ydHNLZXlzIiwiaW1wb3J0c1ZhbHVlcyIsImlzRXNjYXBpbmciLCJpc0V2YWx1YXRpbmciLCJpbnRlcnBvbGF0ZSIsInJlRGVsaW1pdGVycyIsImV2YWx1YXRlIiwic291cmNlVVJMIiwibWF0Y2giLCJlc2NhcGVWYWx1ZSIsImludGVycG9sYXRlVmFsdWUiLCJlc1RlbXBsYXRlVmFsdWUiLCJldmFsdWF0ZVZhbHVlIiwib2Zmc2V0Iiwic2xpY2UiLCJ2YXJpYWJsZSIsImFycmF5RWFjaCIsImNyZWF0ZUJhc2VGb3IiLCJmcm9tUmlnaHQiLCJrZXlzRnVuYyIsIml0ZXJhYmxlIiwiYmFzZUZvciIsImJhc2VGb3JPd24iLCJjcmVhdGVCYXNlRWFjaCIsImVhY2hGdW5jIiwiY29sbGVjdGlvbiIsImJhc2VFYWNoIiwiY2FzdEZ1bmN0aW9uIiwiZm9yRWFjaCIsImxpc3RDYWNoZUNsZWFyIiwiX19kYXRhX18iLCJzaXplIiwiYXNzb2NJbmRleE9mIiwiYXJyYXlQcm90byIsInNwbGljZSIsImxpc3RDYWNoZURlbGV0ZSIsImRhdGEiLCJsYXN0SW5kZXgiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJMaXN0Q2FjaGUiLCJlbnRyaWVzIiwiY2xlYXIiLCJlbnRyeSIsInNldCIsImdldCIsImhhcyIsInN0YWNrQ2xlYXIiLCJzdGFja0RlbGV0ZSIsInN0YWNrR2V0Iiwic3RhY2tIYXMiLCJNYXAiLCJuYXRpdmVDcmVhdGUiLCJoYXNoQ2xlYXIiLCJoYXNoRGVsZXRlIiwiSEFTSF9VTkRFRklORUQiLCJoYXNoR2V0IiwiaGFzaEhhcyIsImhhc2hTZXQiLCJIYXNoIiwibWFwQ2FjaGVDbGVhciIsImlzS2V5YWJsZSIsImdldE1hcERhdGEiLCJtYXAiLCJtYXBDYWNoZURlbGV0ZSIsIm1hcENhY2hlR2V0IiwibWFwQ2FjaGVIYXMiLCJtYXBDYWNoZVNldCIsIk1hcENhY2hlIiwiTEFSR0VfQVJSQVlfU0laRSIsInN0YWNrU2V0IiwicGFpcnMiLCJTdGFjayIsImFzc2lnbk1lcmdlVmFsdWUiLCJhbGxvY1Vuc2FmZSIsImNsb25lQnVmZmVyIiwiYnVmZmVyIiwiaXNEZWVwIiwiY29weSIsIlVpbnQ4QXJyYXkiLCJjbG9uZUFycmF5QnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJieXRlTGVuZ3RoIiwiY2xvbmVUeXBlZEFycmF5IiwidHlwZWRBcnJheSIsImJ5dGVPZmZzZXQiLCJjb3B5QXJyYXkiLCJvYmplY3RDcmVhdGUiLCJjcmVhdGUiLCJiYXNlQ3JlYXRlIiwiaW5pdENsb25lT2JqZWN0IiwiaXNBcnJheUxpa2VPYmplY3QiLCJzYWZlR2V0IiwidG9QbGFpbk9iamVjdCIsImJhc2VNZXJnZURlZXAiLCJtZXJnZUZ1bmMiLCJzdGFjayIsInN0YWNrZWQiLCJpc0NvbW1vbiIsImlzVHlwZWQiLCJiYXNlTWVyZ2UiLCJtZXJnZSIsInZhbHVlcyIsInNldENhY2hlQWRkIiwic2V0Q2FjaGVIYXMiLCJTZXRDYWNoZSIsImFkZCIsImFycmF5U29tZSIsInByZWRpY2F0ZSIsImNhY2hlSGFzIiwiY2FjaGUiLCJDT01QQVJFX1BBUlRJQUxfRkxBRyIsIkNPTVBBUkVfVU5PUkRFUkVEX0ZMQUciLCJlcXVhbEFycmF5cyIsImJpdG1hc2siLCJlcXVhbEZ1bmMiLCJpc1BhcnRpYWwiLCJhcnJMZW5ndGgiLCJvdGhMZW5ndGgiLCJzZWVuIiwiYXJyVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwib3RoSW5kZXgiLCJtYXBUb0FycmF5Iiwic2V0VG9BcnJheSIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiZXF1YWxCeVRhZyIsImNvbnZlcnQiLCJhcnJheVB1c2giLCJiYXNlR2V0QWxsS2V5cyIsInN5bWJvbHNGdW5jIiwiYXJyYXlGaWx0ZXIiLCJyZXNJbmRleCIsInN0dWJBcnJheSIsIm5hdGl2ZUdldFN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRTeW1ib2xzIiwic3ltYm9sIiwiZ2V0QWxsS2V5cyIsImVxdWFsT2JqZWN0cyIsIm9ialByb3BzIiwib2JqTGVuZ3RoIiwib3RoUHJvcHMiLCJza2lwQ3RvciIsIm9iakN0b3IiLCJvdGhDdG9yIiwiRGF0YVZpZXciLCJQcm9taXNlIiwiU2V0IiwiV2Vha01hcCIsInByb21pc2VUYWciLCJkYXRhVmlld0N0b3JTdHJpbmciLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJnZXRUYWciLCJBcnJheUJ1ZmZlciIsInJlc29sdmUiLCJjdG9yU3RyaW5nIiwiYmFzZUlzRXF1YWxEZWVwIiwib2JqSXNBcnIiLCJvdGhJc0FyciIsIm9ialRhZyIsIm90aFRhZyIsIm9iaklzT2JqIiwib3RoSXNPYmoiLCJpc1NhbWVUYWciLCJvYmpJc1dyYXBwZWQiLCJvdGhJc1dyYXBwZWQiLCJvYmpVbndyYXBwZWQiLCJvdGhVbndyYXBwZWQiLCJiYXNlSXNFcXVhbCIsImJhc2VJc01hdGNoIiwibWF0Y2hEYXRhIiwibm9DdXN0b21pemVyIiwiaXNTdHJpY3RDb21wYXJhYmxlIiwiZ2V0TWF0Y2hEYXRhIiwibWF0Y2hlc1N0cmljdENvbXBhcmFibGUiLCJiYXNlTWF0Y2hlcyIsInJlSXNEZWVwUHJvcCIsInJlSXNQbGFpblByb3AiLCJpc0tleSIsIkZVTkNfRVJST1JfVEVYVCIsIm1lbW9pemUiLCJyZXNvbHZlciIsIlR5cGVFcnJvciIsIm1lbW9pemVkIiwiQ2FjaGUiLCJNQVhfTUVNT0laRV9TSVpFIiwibWVtb2l6ZUNhcHBlZCIsInJlUHJvcE5hbWUiLCJyZUVzY2FwZUNoYXIiLCJzdHJpbmdUb1BhdGgiLCJjaGFyQ29kZUF0IiwibnVtYmVyIiwicXVvdGUiLCJzdWJTdHJpbmciLCJjYXN0UGF0aCIsInRvS2V5IiwiYmFzZUdldCIsInBhdGgiLCJkZWZhdWx0VmFsdWUiLCJiYXNlSGFzSW4iLCJoYXNQYXRoIiwiaGFzRnVuYyIsImhhc0luIiwiYmFzZU1hdGNoZXNQcm9wZXJ0eSIsImJhc2VQcm9wZXJ0eSIsImJhc2VQcm9wZXJ0eURlZXAiLCJwcm9wZXJ0eSIsImJhc2VJdGVyYXRlZSIsImJhc2VNYXAiLCJiYXNlU29ydEJ5IiwiY29tcGFyZXIiLCJzb3J0IiwiY29tcGFyZUFzY2VuZGluZyIsInZhbElzRGVmaW5lZCIsInZhbElzTnVsbCIsInZhbElzUmVmbGV4aXZlIiwidmFsSXNTeW1ib2wiLCJvdGhJc0RlZmluZWQiLCJvdGhJc051bGwiLCJvdGhJc1JlZmxleGl2ZSIsIm90aElzU3ltYm9sIiwiY29tcGFyZU11bHRpcGxlIiwib3JkZXJzIiwib2JqQ3JpdGVyaWEiLCJjcml0ZXJpYSIsIm90aENyaXRlcmlhIiwib3JkZXJzTGVuZ3RoIiwib3JkZXIiLCJiYXNlT3JkZXJCeSIsIml0ZXJhdGVlcyIsIm9yZGVyQnkiLCJiYXNlRmluZEluZGV4IiwiZnJvbUluZGV4IiwiYmFzZUlzTmFOIiwic3RyaWN0SW5kZXhPZiIsImJhc2VJbmRleE9mIiwiYXJyYXlJbmNsdWRlcyIsImFycmF5SW5jbHVkZXNXaXRoIiwiY29tcGFyYXRvciIsIm5vb3AiLCJjcmVhdGVTZXQiLCJiYXNlVW5pcSIsImluY2x1ZGVzIiwib3V0ZXIiLCJjb21wdXRlZCIsInNlZW5JbmRleCIsInVuaXFCeSIsIkZlZWQiLCJjb25maWciLCJfc2V0dGluZ3MiLCJfbWVyZ2UiLCJpbml0IiwibGV0IiwiZmVlZCIsInJzc1RvSnNvbiIsInJzc1VybCIsIl9mb3JFYWNoIiwidXJsIiwidGhpcyIsIl9yZXF1ZXN0IiwidGhlbiIsInJlc3BvbnNlIiwiX3Byb2Nlc3MiLCJKU09OIiwicGFyc2UiLCJ0aGlzJDEiLCJjb21waWxlZCIsIl9yZW5kZXIiLCJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwiaW5uZXJIVE1MIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJldmVudCIsIl94aHIiLCJ0YXJnZXQiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib250aW1lb3V0Iiwib3BlbiIsInNlbmQiLCJsb2ciLCJjb25zb2xlIiwiZGlyIiwiX3ZhbHVlcyIsInRlbXBsYXRlcyIsImpvaW4iLCJfdGVtcGxhdGUiLCJtZWRpdW0iLCJvcGVuZXIiLCJoZWFkZXIiLCJwb3N0cyIsImNsb3NlciIsInBvc3RFeGNlcnB0TGVuZ3RoIiwiaXRlbXMiLCJwb3N0IiwiZXhjZXJwdCIsImRhdGUiLCJkZXNjcmlwdGlvbiIsInN1YnN0ciIsIm1pbiIsImxhc3RJbmRleE9mIiwicHViRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInBvc3REYXRlTG9jYWwiLCJwb3N0RGF0ZUZvcm1hdCIsIm1lcmdlZCIsImNvbmNhdCIsIl91bmlxQnkiLCJpdGVtIiwiZ3VpZCIsIl9vcmRlckJ5IiwidGl0bGUiLCJ0aXRsZVVybCIsInByb2ZpbGVJbWciLCJmb250U2l6ZSIsInJhdGlvUHJvZmlsZSIsInBvc3RCb3JkZXJDb2xvciIsInBvc3RJbWdIZWlnaHQiLCJwb3N0RXhjZXJwdFRyYWlsIiwicG9zdEN0YVRleHQiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJwb3N0RGF0ZVRpdGxlIiwiY2xhc3NlcyIsIndyYXBwZXIiLCJmZWVkSXRlbSIsImxpbmsiLCJ0aHVtYm5haWwiLCJpdGVtRm9vdGVyIiwiY3RhIiwidW5pcXVlIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBLElBQUlBLFVBQVUsR0FBRyxPQUFPQyxNQUFQLElBQWlCLFFBQWpCLElBQTZCQSxNQUE3QixJQUF1Q0EsTUFBTSxDQUFDQyxNQUFQLEtBQWtCQSxNQUF6RCxJQUFtRUQsTUFBcEY7Ozs7RUNFQSxJQUFJRSxRQUFRLEdBQUcsT0FBT0MsSUFBUCxJQUFlLFFBQWYsSUFBMkJBLElBQTNCLElBQW1DQSxJQUFJLENBQUNGLE1BQUwsS0FBZ0JBLE1B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
