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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0Z1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29yZUpzRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzTWFza2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdG9Tb3VyY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYXRpdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRWYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE5hdGl2ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2RlZmluZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUFzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29weU9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaWRlbnRpdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcHBseS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJSZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Nob3J0T3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0VG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNMZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzSXRlcmF0ZWVDYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQXNzaWduZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVGltZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcmd1bWVudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3N0dWJGYWxzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuYXJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbm9kZVV0aWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TGlrZUtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1Byb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXNzaWduSW5XaXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXR0ZW1wdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVZhbHVlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2N1c3RvbURlZmF1bHRzQXNzaWduSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lc2NhcGVTdHJpbmdDaGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbmF0aXZlS2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVJbnRlcnBvbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eU9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXNjYXBlSHRtbENoYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRvU3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90b1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXNjYXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVFc2NhcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yZUV2YWx1YXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZVNldHRpbmdzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5RWFjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VGb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvck93bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VFYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0RnVuY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2ZvckVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVDbGVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc29jSW5kZXhPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZVNldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0xpc3RDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0RlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrR2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoRGVsZXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fSGFzaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleWFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRNYXBEYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVEZWxldGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXBDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3RhY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19VaW50OEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVBcnJheUJ1ZmZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pbml0Q2xvbmVPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2FmZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNZXJnZURlZXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy92YWx1ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRDYWNoZUFkZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0Q2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheVNvbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsQXJyYXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwVG9BcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbEJ5VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlQdXNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc3R1YkFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0U3ltYm9scy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbE9iamVjdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19EYXRhVmlldy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1Byb21pc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19XZWFrTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWxEZWVwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNNYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE1hdGNoRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hdGNoZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbWVtb2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21lbW9pemVDYXBwZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb1BhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0UGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvS2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUhhc0luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzUGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaGFzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5RGVlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXRlcmF0ZWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNvcnRCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvbXBhcmVBc2NlbmRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb21wYXJlTXVsdGlwbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlT3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvb3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGaW5kSW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYU4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpY3RJbmRleE9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlJbmNsdWRlc1dpdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25vb3AuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVTZXQuanMiLCIuLi8uLi8uLi9zcmMvb2JqZWN0cy9mZWVkL0ZlZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdDtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0Z1bmN0aW9uO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNvcmVKc0RhdGE7XG4iLCJpbXBvcnQgY29yZUpzRGF0YSBmcm9tICcuL19jb3JlSnNEYXRhLmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvU291cmNlO1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc01hc2tlZCBmcm9tICcuL19pc01hc2tlZC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNOYXRpdmU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0VmFsdWU7XG4iLCJpbXBvcnQgYmFzZUlzTmF0aXZlIGZyb20gJy4vX2Jhc2VJc05hdGl2ZS5qcyc7XG5pbXBvcnQgZ2V0VmFsdWUgZnJvbSAnLi9fZ2V0VmFsdWUuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXROYXRpdmU7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZnVuYyA9IGdldE5hdGl2ZShPYmplY3QsICdkZWZpbmVQcm9wZXJ0eScpO1xuICAgIGZ1bmMoe30sICcnLCB7fSk7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVQcm9wZXJ0eTtcbiIsImltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuL19kZWZpbmVQcm9wZXJ0eS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VBc3NpZ25WYWx1ZTtcbiIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcTtcbiIsImltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduVmFsdWU7XG4iLCJpbXBvcnQgYXNzaWduVmFsdWUgZnJvbSAnLi9fYXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICB2YXIgaXNOZXcgPSAhb2JqZWN0O1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3VmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzTmV3KSB7XG4gICAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29weU9iamVjdDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aXR5O1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBseTtcbiIsImltcG9ydCBhcHBseSBmcm9tICcuL19hcHBseS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJSZXN0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0YW50O1xuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gJy4vY29uc3RhbnQuanMnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcbmltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0VG9TdHJpbmdgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3Agc2hvcnRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldFRvU3RyaW5nID0gIWRlZmluZVByb3BlcnR5ID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBzdHJpbmcpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmMsICd0b1N0cmluZycsIHtcbiAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAnZW51bWVyYWJsZSc6IGZhbHNlLFxuICAgICd2YWx1ZSc6IGNvbnN0YW50KHN0cmluZyksXG4gICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VTZXRUb1N0cmluZztcbiIsIi8qKiBVc2VkIHRvIGRldGVjdCBob3QgZnVuY3Rpb25zIGJ5IG51bWJlciBvZiBjYWxscyB3aXRoaW4gYSBzcGFuIG9mIG1pbGxpc2Vjb25kcy4gKi9cbnZhciBIT1RfQ09VTlQgPSA4MDAsXG4gICAgSE9UX1NQQU4gPSAxNjtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0J2xsIHNob3J0IG91dCBhbmQgaW52b2tlIGBpZGVudGl0eWAgaW5zdGVhZFxuICogb2YgYGZ1bmNgIHdoZW4gaXQncyBjYWxsZWQgYEhPVF9DT1VOVGAgb3IgbW9yZSB0aW1lcyBpbiBgSE9UX1NQQU5gXG4gKiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc2hvcnRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzaG9ydE91dChmdW5jKSB7XG4gIHZhciBjb3VudCA9IDAsXG4gICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YW1wID0gbmF0aXZlTm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IEhPVF9TUEFOIC0gKHN0YW1wIC0gbGFzdENhbGxlZCk7XG5cbiAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmICgrK2NvdW50ID49IEhPVF9DT1VOVCkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvcnRPdXQ7XG4iLCJpbXBvcnQgYmFzZVNldFRvU3RyaW5nIGZyb20gJy4vX2Jhc2VTZXRUb1N0cmluZy5qcyc7XG5pbXBvcnQgc2hvcnRPdXQgZnJvbSAnLi9fc2hvcnRPdXQuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5leHBvcnQgZGVmYXVsdCBzZXRUb1N0cmluZztcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcbmltcG9ydCBvdmVyUmVzdCBmcm9tICcuL19vdmVyUmVzdC5qcyc7XG5pbXBvcnQgc2V0VG9TdHJpbmcgZnJvbSAnLi9fc2V0VG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gc2V0VG9TdHJpbmcob3ZlclJlc3QoZnVuYywgc3RhcnQsIGlkZW50aXR5KSwgZnVuYyArICcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVJlc3Q7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTGVuZ3RoO1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG5cbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGUgPT0gJ251bWJlcicgfHxcbiAgICAgICh0eXBlICE9ICdzeW1ib2wnICYmIHJlSXNVaW50LnRlc3QodmFsdWUpKSkgJiZcbiAgICAgICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0luZGV4O1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNJdGVyYXRlZUNhbGw7XG4iLCJpbXBvcnQgYmFzZVJlc3QgZnJvbSAnLi9fYmFzZVJlc3QuanMnO1xuaW1wb3J0IGlzSXRlcmF0ZWVDYWxsIGZyb20gJy4vX2lzSXRlcmF0ZWVDYWxsLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQXNzaWduZXI7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVGltZXM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzQXJndW1lbnRzO1xuIiwiaW1wb3J0IGJhc2VJc0FyZ3VtZW50cyBmcm9tICcuL19iYXNlSXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViRmFsc2U7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcbmltcG9ydCBzdHViRmFsc2UgZnJvbSAnLi9zdHViRmFsc2UuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQnVmZmVyO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVW5hcnk7XG4iLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICAvLyBVc2UgYHV0aWwudHlwZXNgIGZvciBOb2RlLmpzIDEwKy5cbiAgICB2YXIgdHlwZXMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUucmVxdWlyZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUoJ3V0aWwnKS50eXBlcztcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzO1xuICAgIH1cblxuICAgIC8vIExlZ2FjeSBgcHJvY2Vzcy5iaW5kaW5nKCd1dGlsJylgIGZvciBOb2RlLmpzIDwgMTAuXG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbm9kZVV0aWw7XG4iLCJpbXBvcnQgYmFzZUlzVHlwZWRBcnJheSBmcm9tICcuL19iYXNlSXNUeXBlZEFycmF5LmpzJztcbmltcG9ydCBiYXNlVW5hcnkgZnJvbSAnLi9fYmFzZVVuYXJ5LmpzJztcbmltcG9ydCBub2RlVXRpbCBmcm9tICcuL19ub2RlVXRpbC5qcyc7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc1R5cGVkQXJyYXk7XG4iLCJpbXBvcnQgYmFzZVRpbWVzIGZyb20gJy4vX2Jhc2VUaW1lcy5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNUeXBlZEFycmF5IGZyb20gJy4vaXNUeXBlZEFycmF5LmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUxpa2VLZXlzO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3RvdHlwZTtcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzSW47XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXNJbiBmcm9tICcuL19uYXRpdmVLZXlzSW4uanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5c0luO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXNJbiBmcm9tICcuL19iYXNlS2V5c0luLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXNJbjtcbiIsImltcG9ydCBjb3B5T2JqZWN0IGZyb20gJy4vX2NvcHlPYmplY3QuanMnO1xuaW1wb3J0IGNyZWF0ZUFzc2lnbmVyIGZyb20gJy4vX2NyZWF0ZUFzc2lnbmVyLmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduSW5gIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYGN1c3RvbWl6ZXJgXG4gKiB3aGljaCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIGFzc2lnbmVkIHZhbHVlcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnNcbiAqIGB1bmRlZmluZWRgLCBhc3NpZ25tZW50IGlzIGhhbmRsZWQgYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgXG4gKiBpcyBpbnZva2VkIHdpdGggZml2ZSBhcmd1bWVudHM6IChvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBhbGlhcyBleHRlbmRXaXRoXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlcyBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQHNlZSBfLmFzc2lnbldpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUpIHtcbiAqICAgcmV0dXJuIF8uaXNVbmRlZmluZWQob2JqVmFsdWUpID8gc3JjVmFsdWUgOiBvYmpWYWx1ZTtcbiAqIH1cbiAqXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbkluV2l0aCwgY3VzdG9taXplcik7XG4gKlxuICogZGVmYXVsdHMoeyAnYSc6IDEgfSwgeyAnYic6IDIgfSwgeyAnYSc6IDMgfSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqL1xudmFyIGFzc2lnbkluV2l0aCA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplcikge1xuICBjb3B5T2JqZWN0KHNvdXJjZSwga2V5c0luKHNvdXJjZSksIG9iamVjdCwgY3VzdG9taXplcik7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduSW5XaXRoO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICcuL2lzUGxhaW5PYmplY3QuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZG9tRXhjVGFnID0gJ1tvYmplY3QgRE9NRXhjZXB0aW9uXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGBFcnJvcmAsIGBFdmFsRXJyb3JgLCBgUmFuZ2VFcnJvcmAsIGBSZWZlcmVuY2VFcnJvcmAsXG4gKiBgU3ludGF4RXJyb3JgLCBgVHlwZUVycm9yYCwgb3IgYFVSSUVycm9yYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gZXJyb3Igb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNFcnJvcihuZXcgRXJyb3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFcnJvcihFcnJvcik7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Vycm9yKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZXJyb3JUYWcgfHwgdGFnID09IGRvbUV4Y1RhZyB8fFxuICAgICh0eXBlb2YgdmFsdWUubWVzc2FnZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUubmFtZSA9PSAnc3RyaW5nJyAmJiAhaXNQbGFpbk9iamVjdCh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0Vycm9yO1xuIiwiaW1wb3J0IGFwcGx5IGZyb20gJy4vX2FwcGx5LmpzJztcbmltcG9ydCBiYXNlUmVzdCBmcm9tICcuL19iYXNlUmVzdC5qcyc7XG5pbXBvcnQgaXNFcnJvciBmcm9tICcuL2lzRXJyb3IuanMnO1xuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGludm9rZSBgZnVuY2AsIHJldHVybmluZyBlaXRoZXIgdGhlIHJlc3VsdCBvciB0aGUgY2F1Z2h0IGVycm9yXG4gKiBvYmplY3QuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQgdG8gYGZ1bmNgIHdoZW4gaXQncyBpbnZva2VkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhdHRlbXB0LlxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYGZ1bmNgIHJlc3VsdCBvciBlcnJvciBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIHRocm93aW5nIGVycm9ycyBmb3IgaW52YWxpZCBzZWxlY3RvcnMuXG4gKiB2YXIgZWxlbWVudHMgPSBfLmF0dGVtcHQoZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAqICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICogfSwgJz5fPicpO1xuICpcbiAqIGlmIChfLmlzRXJyb3IoZWxlbWVudHMpKSB7XG4gKiAgIGVsZW1lbnRzID0gW107XG4gKiB9XG4gKi9cbnZhciBhdHRlbXB0ID0gYmFzZVJlc3QoZnVuY3Rpb24oZnVuYywgYXJncykge1xuICB0cnkge1xuICAgIHJldHVybiBhcHBseShmdW5jLCB1bmRlZmluZWQsIGFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGlzRXJyb3IoZSkgPyBlIDogbmV3IEVycm9yKGUpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYXR0ZW1wdDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5TWFwO1xuIiwiaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiBvZiBgcHJvcHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gYXJyYXlNYXAocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VWYWx1ZXM7XG4iLCJpbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25JbmAgdXNlIHRvIGFzc2lnbiBwcm9wZXJ0aWVzXG4gKiBvZiBzb3VyY2Ugb2JqZWN0cyB0byB0aGUgZGVzdGluYXRpb24gb2JqZWN0IGZvciBhbGwgZGVzdGluYXRpb24gcHJvcGVydGllc1xuICogdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9ialZhbHVlIFRoZSBkZXN0aW5hdGlvbiB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgcGFyZW50IG9iamVjdCBvZiBgb2JqVmFsdWVgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gY3VzdG9tRGVmYXVsdHNBc3NpZ25JbihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAoZXEob2JqVmFsdWUsIG9iamVjdFByb3RvW2tleV0pICYmICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpIHtcbiAgICByZXR1cm4gc3JjVmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9ialZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluO1xuIiwiLyoqIFVzZWQgdG8gZXNjYXBlIGNoYXJhY3RlcnMgZm9yIGluY2x1c2lvbiBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMuICovXG52YXIgc3RyaW5nRXNjYXBlcyA9IHtcbiAgJ1xcXFwnOiAnXFxcXCcsXG4gIFwiJ1wiOiBcIidcIixcbiAgJ1xcbic6ICduJyxcbiAgJ1xccic6ICdyJyxcbiAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAnXFx1MjAyOSc6ICd1MjAyOSdcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy50ZW1wbGF0ZWAgdG8gZXNjYXBlIGNoYXJhY3RlcnMgZm9yIGluY2x1c2lvbiBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmdDaGFyKGNocikge1xuICByZXR1cm4gJ1xcXFwnICsgc3RyaW5nRXNjYXBlc1tjaHJdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlc2NhcGVTdHJpbmdDaGFyO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlS2V5cztcbiIsImltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5cyBmcm9tICcuL19uYXRpdmVLZXlzLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5cztcbiIsImltcG9ydCBhcnJheUxpa2VLZXlzIGZyb20gJy4vX2FycmF5TGlrZUtleXMuanMnO1xuaW1wb3J0IGJhc2VLZXlzIGZyb20gJy4vX2Jhc2VLZXlzLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXM7XG4iLCIvKiogVXNlZCB0byBtYXRjaCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlSW50ZXJwb2xhdGUgPSAvPCU9KFtcXHNcXFNdKz8pJT4vZztcblxuZXhwb3J0IGRlZmF1bHQgcmVJbnRlcnBvbGF0ZTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlPZmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5T2Yob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVByb3BlcnR5T2Y7XG4iLCJpbXBvcnQgYmFzZVByb3BlcnR5T2YgZnJvbSAnLi9fYmFzZVByb3BlcnR5T2YuanMnO1xuXG4vKiogVXNlZCB0byBtYXAgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLiAqL1xudmFyIGh0bWxFc2NhcGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnXG59O1xuXG4vKipcbiAqIFVzZWQgYnkgYF8uZXNjYXBlYCB0byBjb252ZXJ0IGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNociBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbnZhciBlc2NhcGVIdG1sQ2hhciA9IGJhc2VQcm9wZXJ0eU9mKGh0bWxFc2NhcGVzKTtcblxuZXhwb3J0IGRlZmF1bHQgZXNjYXBlSHRtbENoYXI7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29udmVydCB2YWx1ZXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICByZXR1cm4gYXJyYXlNYXAodmFsdWUsIGJhc2VUb1N0cmluZykgKyAnJztcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUb1N0cmluZztcbiIsImltcG9ydCBiYXNlVG9TdHJpbmcgZnJvbSAnLi9fYmFzZVRvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1N0cmluZztcbiIsImltcG9ydCBlc2NhcGVIdG1sQ2hhciBmcm9tICcuL19lc2NhcGVIdG1sQ2hhci5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ10vZyxcbiAgICByZUhhc1VuZXNjYXBlZEh0bWwgPSBSZWdFeHAocmVVbmVzY2FwZWRIdG1sLnNvdXJjZSk7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgXCImXCIsIFwiPFwiLCBcIj5cIiwgJ1wiJywgYW5kIFwiJ1wiIGluIGBzdHJpbmdgIHRvIHRoZWlyXG4gKiBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWQuIFRvIGVzY2FwZSBhZGRpdGlvbmFsXG4gKiBjaGFyYWN0ZXJzIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAqXG4gKiBUaG91Z2ggdGhlIFwiPlwiIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlXG4gKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgbmVlZCBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICogdW5sZXNzIHRoZXkncmUgcGFydCBvZiBhIHRhZyBvciB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuIFNlZVxuICogW01hdGhpYXMgQnluZW5zJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzKVxuICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGggSFRNTCB5b3Ugc2hvdWxkIGFsd2F5c1xuICogW3F1b3RlIGF0dHJpYnV0ZSB2YWx1ZXNdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKSB0byByZWR1Y2VcbiAqIFhTUyB2ZWN0b3JzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZSgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNVbmVzY2FwZWRIdG1sLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpXG4gICAgOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVzY2FwZTtcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVFc2NhcGUgPSAvPCUtKFtcXHNcXFNdKz8pJT4vZztcblxuZXhwb3J0IGRlZmF1bHQgcmVFc2NhcGU7XG4iLCIvKiogVXNlZCB0byBtYXRjaCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlRXZhbHVhdGUgPSAvPCUoW1xcc1xcU10rPyklPi9nO1xuXG5leHBvcnQgZGVmYXVsdCByZUV2YWx1YXRlO1xuIiwiaW1wb3J0IGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5pbXBvcnQgcmVFc2NhcGUgZnJvbSAnLi9fcmVFc2NhcGUuanMnO1xuaW1wb3J0IHJlRXZhbHVhdGUgZnJvbSAnLi9fcmVFdmFsdWF0ZS5qcyc7XG5pbXBvcnQgcmVJbnRlcnBvbGF0ZSBmcm9tICcuL19yZUludGVycG9sYXRlLmpzJztcblxuLyoqXG4gKiBCeSBkZWZhdWx0LCB0aGUgdGVtcGxhdGUgZGVsaW1pdGVycyB1c2VkIGJ5IGxvZGFzaCBhcmUgbGlrZSB0aG9zZSBpblxuICogZW1iZWRkZWQgUnVieSAoRVJCKSBhcyB3ZWxsIGFzIEVTMjAxNSB0ZW1wbGF0ZSBzdHJpbmdzLiBDaGFuZ2UgdGhlXG4gKiBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciB0ZW1wbGF0ZVNldHRpbmdzID0ge1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBgZGF0YWAgcHJvcGVydHkgdmFsdWVzIHRvIGJlIEhUTUwtZXNjYXBlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgJ2VzY2FwZSc6IHJlRXNjYXBlLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBjb2RlIHRvIGJlIGV2YWx1YXRlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgJ2V2YWx1YXRlJzogcmVFdmFsdWF0ZSxcblxuICAvKipcbiAgICogVXNlZCB0byBkZXRlY3QgYGRhdGFgIHByb3BlcnR5IHZhbHVlcyB0byBpbmplY3QuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICogQHR5cGUge1JlZ0V4cH1cbiAgICovXG4gICdpbnRlcnBvbGF0ZSc6IHJlSW50ZXJwb2xhdGUsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcmVmZXJlbmNlIHRoZSBkYXRhIG9iamVjdCBpbiB0aGUgdGVtcGxhdGUgdGV4dC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgJ3ZhcmlhYmxlJzogJycsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaW1wb3J0IHZhcmlhYmxlcyBpbnRvIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgJ2ltcG9ydHMnOiB7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYGxvZGFzaGAgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzLmltcG9ydHNcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICovXG4gICAgJ18nOiB7ICdlc2NhcGUnOiBlc2NhcGUgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0ZW1wbGF0ZVNldHRpbmdzO1xuIiwiaW1wb3J0IGFzc2lnbkluV2l0aCBmcm9tICcuL2Fzc2lnbkluV2l0aC5qcyc7XG5pbXBvcnQgYXR0ZW1wdCBmcm9tICcuL2F0dGVtcHQuanMnO1xuaW1wb3J0IGJhc2VWYWx1ZXMgZnJvbSAnLi9fYmFzZVZhbHVlcy5qcyc7XG5pbXBvcnQgY3VzdG9tRGVmYXVsdHNBc3NpZ25JbiBmcm9tICcuL19jdXN0b21EZWZhdWx0c0Fzc2lnbkluLmpzJztcbmltcG9ydCBlc2NhcGVTdHJpbmdDaGFyIGZyb20gJy4vX2VzY2FwZVN0cmluZ0NoYXIuanMnO1xuaW1wb3J0IGlzRXJyb3IgZnJvbSAnLi9pc0Vycm9yLmpzJztcbmltcG9ydCBpc0l0ZXJhdGVlQ2FsbCBmcm9tICcuL19pc0l0ZXJhdGVlQ2FsbC5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuaW1wb3J0IHJlSW50ZXJwb2xhdGUgZnJvbSAnLi9fcmVJbnRlcnBvbGF0ZS5qcyc7XG5pbXBvcnQgdGVtcGxhdGVTZXR0aW5ncyBmcm9tICcuL3RlbXBsYXRlU2V0dGluZ3MuanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBlbXB0eSBzdHJpbmcgbGl0ZXJhbHMgaW4gY29tcGlsZWQgdGVtcGxhdGUgc291cmNlLiAqL1xudmFyIHJlRW1wdHlTdHJpbmdMZWFkaW5nID0gL1xcYl9fcCBcXCs9ICcnOy9nLFxuICAgIHJlRW1wdHlTdHJpbmdNaWRkbGUgPSAvXFxiKF9fcCBcXCs9KSAnJyBcXCsvZyxcbiAgICByZUVtcHR5U3RyaW5nVHJhaWxpbmcgPSAvKF9fZVxcKC4qP1xcKXxcXGJfX3RcXCkpIFxcK1xcbicnOy9nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2hcbiAqIFtFUyB0ZW1wbGF0ZSBkZWxpbWl0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10ZW1wbGF0ZS1saXRlcmFsLWxleGljYWwtY29tcG9uZW50cykuXG4gKi9cbnZhciByZUVzVGVtcGxhdGUgPSAvXFwkXFx7KFteXFxcXH1dKig/OlxcXFwuW15cXFxcfV0qKSopXFx9L2c7XG5cbi8qKiBVc2VkIHRvIGVuc3VyZSBjYXB0dXJpbmcgb3JkZXIgb2YgdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbnZhciByZU5vTWF0Y2ggPSAvKCReKS87XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHVuZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscy4gKi9cbnZhciByZVVuZXNjYXBlZFN0cmluZyA9IC9bJ1xcblxcclxcdTIwMjhcXHUyMDI5XFxcXF0vZztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY29tcGlsZWQgdGVtcGxhdGUgZnVuY3Rpb24gdGhhdCBjYW4gaW50ZXJwb2xhdGUgZGF0YSBwcm9wZXJ0aWVzXG4gKiBpbiBcImludGVycG9sYXRlXCIgZGVsaW1pdGVycywgSFRNTC1lc2NhcGUgaW50ZXJwb2xhdGVkIGRhdGEgcHJvcGVydGllcyBpblxuICogXCJlc2NhcGVcIiBkZWxpbWl0ZXJzLCBhbmQgZXhlY3V0ZSBKYXZhU2NyaXB0IGluIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXJzLiBEYXRhXG4gKiBwcm9wZXJ0aWVzIG1heSBiZSBhY2Nlc3NlZCBhcyBmcmVlIHZhcmlhYmxlcyBpbiB0aGUgdGVtcGxhdGUuIElmIGEgc2V0dGluZ1xuICogb2JqZWN0IGlzIGdpdmVuLCBpdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgYF8udGVtcGxhdGVTZXR0aW5nc2AgdmFsdWVzLlxuICpcbiAqICoqTm90ZToqKiBJbiB0aGUgZGV2ZWxvcG1lbnQgYnVpbGQgYF8udGVtcGxhdGVgIHV0aWxpemVzXG4gKiBbc291cmNlVVJMc10oaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvZGV2ZWxvcGVydG9vbHMvc291cmNlbWFwcy8jdG9jLXNvdXJjZXVybClcbiAqIGZvciBlYXNpZXIgZGVidWdnaW5nLlxuICpcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHByZWNvbXBpbGluZyB0ZW1wbGF0ZXMgc2VlXG4gKiBbbG9kYXNoJ3MgY3VzdG9tIGJ1aWxkcyBkb2N1bWVudGF0aW9uXShodHRwczovL2xvZGFzaC5jb20vY3VzdG9tLWJ1aWxkcykuXG4gKlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gQ2hyb21lIGV4dGVuc2lvbiBzYW5kYm94ZXMgc2VlXG4gKiBbQ2hyb21lJ3MgZXh0ZW5zaW9ucyBkb2N1bWVudGF0aW9uXShodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2V4dGVuc2lvbnMvc2FuZGJveGluZ0V2YWwpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgdGVtcGxhdGUgc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gW29wdGlvbnMuZXNjYXBlPV8udGVtcGxhdGVTZXR0aW5ncy5lc2NhcGVdXG4gKiAgVGhlIEhUTUwgXCJlc2NhcGVcIiBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gW29wdGlvbnMuZXZhbHVhdGU9Xy50ZW1wbGF0ZVNldHRpbmdzLmV2YWx1YXRlXVxuICogIFRoZSBcImV2YWx1YXRlXCIgZGVsaW1pdGVyLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmltcG9ydHM9Xy50ZW1wbGF0ZVNldHRpbmdzLmltcG9ydHNdXG4gKiAgQW4gb2JqZWN0IHRvIGltcG9ydCBpbnRvIHRoZSB0ZW1wbGF0ZSBhcyBmcmVlIHZhcmlhYmxlcy5cbiAqIEBwYXJhbSB7UmVnRXhwfSBbb3B0aW9ucy5pbnRlcnBvbGF0ZT1fLnRlbXBsYXRlU2V0dGluZ3MuaW50ZXJwb2xhdGVdXG4gKiAgVGhlIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuc291cmNlVVJMPSd0ZW1wbGF0ZVNvdXJjZXNbbl0nXVxuICogIFRoZSBzb3VyY2VVUkwgb2YgdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnZhcmlhYmxlPSdvYmonXVxuICogIFRoZSBkYXRhIG9iamVjdCB2YXJpYWJsZSBuYW1lLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29tcGlsZWQgdGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIFVzZSB0aGUgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlciB0byBjcmVhdGUgYSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvIDwlPSB1c2VyICU+IScpO1xuICogY29tcGlsZWQoeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+ICdoZWxsbyBmcmVkISdcbiAqXG4gKiAvLyBVc2UgdGhlIEhUTUwgXCJlc2NhcGVcIiBkZWxpbWl0ZXIgdG8gZXNjYXBlIGRhdGEgcHJvcGVydHkgdmFsdWVzLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPGI+PCUtIHZhbHVlICU+PC9iPicpO1xuICogY29tcGlsZWQoeyAndmFsdWUnOiAnPHNjcmlwdD4nIH0pO1xuICogLy8gPT4gJzxiPiZsdDtzY3JpcHQmZ3Q7PC9iPidcbiAqXG4gKiAvLyBVc2UgdGhlIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXIgdG8gZXhlY3V0ZSBKYXZhU2NyaXB0IGFuZCBnZW5lcmF0ZSBIVE1MLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPCUgXy5mb3JFYWNoKHVzZXJzLCBmdW5jdGlvbih1c2VyKSB7ICU+PGxpPjwlLSB1c2VyICU+PC9saT48JSB9KTsgJT4nKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXJzJzogWydmcmVkJywgJ2Jhcm5leSddIH0pO1xuICogLy8gPT4gJzxsaT5mcmVkPC9saT48bGk+YmFybmV5PC9saT4nXG4gKlxuICogLy8gVXNlIHRoZSBpbnRlcm5hbCBgcHJpbnRgIGZ1bmN0aW9uIGluIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXJzLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnPCUgcHJpbnQoXCJoZWxsbyBcIiArIHVzZXIpOyAlPiEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAnYmFybmV5JyB9KTtcbiAqIC8vID0+ICdoZWxsbyBiYXJuZXkhJ1xuICpcbiAqIC8vIFVzZSB0aGUgRVMgdGVtcGxhdGUgbGl0ZXJhbCBkZWxpbWl0ZXIgYXMgYW4gXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlci5cbiAqIC8vIERpc2FibGUgc3VwcG9ydCBieSByZXBsYWNpbmcgdGhlIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyAkeyB1c2VyIH0hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ3BlYmJsZXMnIH0pO1xuICogLy8gPT4gJ2hlbGxvIHBlYmJsZXMhJ1xuICpcbiAqIC8vIFVzZSBiYWNrc2xhc2hlcyB0byB0cmVhdCBkZWxpbWl0ZXJzIGFzIHBsYWluIHRleHQuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8JT0gXCJcXFxcPCUtIHZhbHVlICVcXFxcPlwiICU+Jyk7XG4gKiBjb21waWxlZCh7ICd2YWx1ZSc6ICdpZ25vcmVkJyB9KTtcbiAqIC8vID0+ICc8JS0gdmFsdWUgJT4nXG4gKlxuICogLy8gVXNlIHRoZSBgaW1wb3J0c2Agb3B0aW9uIHRvIGltcG9ydCBgalF1ZXJ5YCBhcyBganFgLlxuICogdmFyIHRleHQgPSAnPCUganEuZWFjaCh1c2VycywgZnVuY3Rpb24odXNlcikgeyAlPjxsaT48JS0gdXNlciAlPjwvbGk+PCUgfSk7ICU+JztcbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUodGV4dCwgeyAnaW1wb3J0cyc6IHsgJ2pxJzogalF1ZXJ5IH0gfSk7XG4gKiBjb21waWxlZCh7ICd1c2Vycyc6IFsnZnJlZCcsICdiYXJuZXknXSB9KTtcbiAqIC8vID0+ICc8bGk+ZnJlZDwvbGk+PGxpPmJhcm5leTwvbGk+J1xuICpcbiAqIC8vIFVzZSB0aGUgYHNvdXJjZVVSTGAgb3B0aW9uIHRvIHNwZWNpZnkgYSBjdXN0b20gc291cmNlVVJMIGZvciB0aGUgdGVtcGxhdGUuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyA8JT0gdXNlciAlPiEnLCB7ICdzb3VyY2VVUkwnOiAnL2Jhc2ljL2dyZWV0aW5nLmpzdCcgfSk7XG4gKiBjb21waWxlZChkYXRhKTtcbiAqIC8vID0+IEZpbmQgdGhlIHNvdXJjZSBvZiBcImdyZWV0aW5nLmpzdFwiIHVuZGVyIHRoZSBTb3VyY2VzIHRhYiBvciBSZXNvdXJjZXMgcGFuZWwgb2YgdGhlIHdlYiBpbnNwZWN0b3IuXG4gKlxuICogLy8gVXNlIHRoZSBgdmFyaWFibGVgIG9wdGlvbiB0byBlbnN1cmUgYSB3aXRoLXN0YXRlbWVudCBpc24ndCB1c2VkIGluIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hpIDwlPSBkYXRhLnVzZXIgJT4hJywgeyAndmFyaWFibGUnOiAnZGF0YScgfSk7XG4gKiBjb21waWxlZC5zb3VyY2U7XG4gKiAvLyA9PiBmdW5jdGlvbihkYXRhKSB7XG4gKiAvLyAgIHZhciBfX3QsIF9fcCA9ICcnO1xuICogLy8gICBfX3AgKz0gJ2hpICcgKyAoKF9fdCA9ICggZGF0YS51c2VyICkpID09IG51bGwgPyAnJyA6IF9fdCkgKyAnISc7XG4gKiAvLyAgIHJldHVybiBfX3A7XG4gKiAvLyB9XG4gKlxuICogLy8gVXNlIGN1c3RvbSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLlxuICogXy50ZW1wbGF0ZVNldHRpbmdzLmludGVycG9sYXRlID0gL3t7KFtcXHNcXFNdKz8pfX0vZztcbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvIHt7IHVzZXIgfX0hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ211c3RhY2hlJyB9KTtcbiAqIC8vID0+ICdoZWxsbyBtdXN0YWNoZSEnXG4gKlxuICogLy8gVXNlIHRoZSBgc291cmNlYCBwcm9wZXJ0eSB0byBpbmxpbmUgY29tcGlsZWQgdGVtcGxhdGVzIGZvciBtZWFuaW5nZnVsXG4gKiAvLyBsaW5lIG51bWJlcnMgaW4gZXJyb3IgbWVzc2FnZXMgYW5kIHN0YWNrIHRyYWNlcy5cbiAqIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdqc3QuanMnKSwgJ1xcXG4gKiAgIHZhciBKU1QgPSB7XFxcbiAqICAgICBcIm1haW5cIjogJyArIF8udGVtcGxhdGUobWFpblRleHQpLnNvdXJjZSArICdcXFxuICogICB9O1xcXG4gKiAnKTtcbiAqL1xuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nLCBvcHRpb25zLCBndWFyZCkge1xuICAvLyBCYXNlZCBvbiBKb2huIFJlc2lnJ3MgYHRtcGxgIGltcGxlbWVudGF0aW9uXG4gIC8vIChodHRwOi8vZWpvaG4ub3JnL2Jsb2cvamF2YXNjcmlwdC1taWNyby10ZW1wbGF0aW5nLylcbiAgLy8gYW5kIExhdXJhIERva3Rvcm92YSdzIGRvVC5qcyAoaHR0cHM6Ly9naXRodWIuY29tL29sYWRvL2RvVCkuXG4gIHZhciBzZXR0aW5ncyA9IHRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0cy5fLnRlbXBsYXRlU2V0dGluZ3MgfHwgdGVtcGxhdGVTZXR0aW5ncztcblxuICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc3RyaW5nLCBvcHRpb25zLCBndWFyZCkpIHtcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICB9XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIG9wdGlvbnMgPSBhc3NpZ25JbldpdGgoe30sIG9wdGlvbnMsIHNldHRpbmdzLCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKTtcblxuICB2YXIgaW1wb3J0cyA9IGFzc2lnbkluV2l0aCh7fSwgb3B0aW9ucy5pbXBvcnRzLCBzZXR0aW5ncy5pbXBvcnRzLCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKSxcbiAgICAgIGltcG9ydHNLZXlzID0ga2V5cyhpbXBvcnRzKSxcbiAgICAgIGltcG9ydHNWYWx1ZXMgPSBiYXNlVmFsdWVzKGltcG9ydHMsIGltcG9ydHNLZXlzKTtcblxuICB2YXIgaXNFc2NhcGluZyxcbiAgICAgIGlzRXZhbHVhdGluZyxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGludGVycG9sYXRlID0gb3B0aW9ucy5pbnRlcnBvbGF0ZSB8fCByZU5vTWF0Y2gsXG4gICAgICBzb3VyY2UgPSBcIl9fcCArPSAnXCI7XG5cbiAgLy8gQ29tcGlsZSB0aGUgcmVnZXhwIHRvIG1hdGNoIGVhY2ggZGVsaW1pdGVyLlxuICB2YXIgcmVEZWxpbWl0ZXJzID0gUmVnRXhwKFxuICAgIChvcHRpb25zLmVzY2FwZSB8fCByZU5vTWF0Y2gpLnNvdXJjZSArICd8JyArXG4gICAgaW50ZXJwb2xhdGUuc291cmNlICsgJ3wnICtcbiAgICAoaW50ZXJwb2xhdGUgPT09IHJlSW50ZXJwb2xhdGUgPyByZUVzVGVtcGxhdGUgOiByZU5vTWF0Y2gpLnNvdXJjZSArICd8JyArXG4gICAgKG9wdGlvbnMuZXZhbHVhdGUgfHwgcmVOb01hdGNoKS5zb3VyY2UgKyAnfCQnXG4gICwgJ2cnKTtcblxuICAvLyBVc2UgYSBzb3VyY2VVUkwgZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gIC8vIFRoZSBzb3VyY2VVUkwgZ2V0cyBpbmplY3RlZCBpbnRvIHRoZSBzb3VyY2UgdGhhdCdzIGV2YWwtZWQsIHNvIGJlIGNhcmVmdWxcbiAgLy8gd2l0aCBsb29rdXAgKGluIGNhc2Ugb2YgZS5nLiBwcm90b3R5cGUgcG9sbHV0aW9uKSwgYW5kIHN0cmlwIG5ld2xpbmVzIGlmIGFueS5cbiAgLy8gQSBuZXdsaW5lIHdvdWxkbid0IGJlIGEgdmFsaWQgc291cmNlVVJMIGFueXdheSwgYW5kIGl0J2QgZW5hYmxlIGNvZGUgaW5qZWN0aW9uLlxuICB2YXIgc291cmNlVVJMID0gaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAnc291cmNlVVJMJylcbiAgICA/ICgnLy8jIHNvdXJjZVVSTD0nICtcbiAgICAgICAob3B0aW9ucy5zb3VyY2VVUkwgKyAnJykucmVwbGFjZSgvW1xcclxcbl0vZywgJyAnKSArXG4gICAgICAgJ1xcbicpXG4gICAgOiAnJztcblxuICBzdHJpbmcucmVwbGFjZShyZURlbGltaXRlcnMsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGVWYWx1ZSwgaW50ZXJwb2xhdGVWYWx1ZSwgZXNUZW1wbGF0ZVZhbHVlLCBldmFsdWF0ZVZhbHVlLCBvZmZzZXQpIHtcbiAgICBpbnRlcnBvbGF0ZVZhbHVlIHx8IChpbnRlcnBvbGF0ZVZhbHVlID0gZXNUZW1wbGF0ZVZhbHVlKTtcblxuICAgIC8vIEVzY2FwZSBjaGFyYWN0ZXJzIHRoYXQgY2FuJ3QgYmUgaW5jbHVkZWQgaW4gc3RyaW5nIGxpdGVyYWxzLlxuICAgIHNvdXJjZSArPSBzdHJpbmcuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShyZVVuZXNjYXBlZFN0cmluZywgZXNjYXBlU3RyaW5nQ2hhcik7XG5cbiAgICAvLyBSZXBsYWNlIGRlbGltaXRlcnMgd2l0aCBzbmlwcGV0cy5cbiAgICBpZiAoZXNjYXBlVmFsdWUpIHtcbiAgICAgIGlzRXNjYXBpbmcgPSB0cnVlO1xuICAgICAgc291cmNlICs9IFwiJyArXFxuX19lKFwiICsgZXNjYXBlVmFsdWUgKyBcIikgK1xcbidcIjtcbiAgICB9XG4gICAgaWYgKGV2YWx1YXRlVmFsdWUpIHtcbiAgICAgIGlzRXZhbHVhdGluZyA9IHRydWU7XG4gICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGVWYWx1ZSArIFwiO1xcbl9fcCArPSAnXCI7XG4gICAgfVxuICAgIGlmIChpbnRlcnBvbGF0ZVZhbHVlKSB7XG4gICAgICBzb3VyY2UgKz0gXCInICtcXG4oKF9fdCA9IChcIiArIGludGVycG9sYXRlVmFsdWUgKyBcIikpID09IG51bGwgPyAnJyA6IF9fdCkgK1xcbidcIjtcbiAgICB9XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAvLyBUaGUgSlMgZW5naW5lIGVtYmVkZGVkIGluIEFkb2JlIHByb2R1Y3RzIG5lZWRzIGBtYXRjaGAgcmV0dXJuZWQgaW5cbiAgICAvLyBvcmRlciB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IGBvZmZzZXRgIHZhbHVlLlxuICAgIHJldHVybiBtYXRjaDtcbiAgfSk7XG5cbiAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAvLyBJZiBgdmFyaWFibGVgIGlzIG5vdCBzcGVjaWZpZWQgd3JhcCBhIHdpdGgtc3RhdGVtZW50IGFyb3VuZCB0aGUgZ2VuZXJhdGVkXG4gIC8vIGNvZGUgdG8gYWRkIHRoZSBkYXRhIG9iamVjdCB0byB0aGUgdG9wIG9mIHRoZSBzY29wZSBjaGFpbi5cbiAgLy8gTGlrZSB3aXRoIHNvdXJjZVVSTCwgd2UgdGFrZSBjYXJlIHRvIG5vdCBjaGVjayB0aGUgb3B0aW9uJ3MgcHJvdG90eXBlLFxuICAvLyBhcyB0aGlzIGNvbmZpZ3VyYXRpb24gaXMgYSBjb2RlIGluamVjdGlvbiB2ZWN0b3IuXG4gIHZhciB2YXJpYWJsZSA9IGhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgJ3ZhcmlhYmxlJykgJiYgb3B0aW9ucy52YXJpYWJsZTtcbiAgaWYgKCF2YXJpYWJsZSkge1xuICAgIHNvdXJjZSA9ICd3aXRoIChvYmopIHtcXG4nICsgc291cmNlICsgJ1xcbn1cXG4nO1xuICB9XG4gIC8vIENsZWFudXAgY29kZSBieSBzdHJpcHBpbmcgZW1wdHkgc3RyaW5ncy5cbiAgc291cmNlID0gKGlzRXZhbHVhdGluZyA/IHNvdXJjZS5yZXBsYWNlKHJlRW1wdHlTdHJpbmdMZWFkaW5nLCAnJykgOiBzb3VyY2UpXG4gICAgLnJlcGxhY2UocmVFbXB0eVN0cmluZ01pZGRsZSwgJyQxJylcbiAgICAucmVwbGFjZShyZUVtcHR5U3RyaW5nVHJhaWxpbmcsICckMTsnKTtcblxuICAvLyBGcmFtZSBjb2RlIGFzIHRoZSBmdW5jdGlvbiBib2R5LlxuICBzb3VyY2UgPSAnZnVuY3Rpb24oJyArICh2YXJpYWJsZSB8fCAnb2JqJykgKyAnKSB7XFxuJyArXG4gICAgKHZhcmlhYmxlXG4gICAgICA/ICcnXG4gICAgICA6ICdvYmogfHwgKG9iaiA9IHt9KTtcXG4nXG4gICAgKSArXG4gICAgXCJ2YXIgX190LCBfX3AgPSAnJ1wiICtcbiAgICAoaXNFc2NhcGluZ1xuICAgICAgID8gJywgX19lID0gXy5lc2NhcGUnXG4gICAgICAgOiAnJ1xuICAgICkgK1xuICAgIChpc0V2YWx1YXRpbmdcbiAgICAgID8gJywgX19qID0gQXJyYXkucHJvdG90eXBlLmpvaW47XFxuJyArXG4gICAgICAgIFwiZnVuY3Rpb24gcHJpbnQoKSB7IF9fcCArPSBfX2ouY2FsbChhcmd1bWVudHMsICcnKSB9XFxuXCJcbiAgICAgIDogJztcXG4nXG4gICAgKSArXG4gICAgc291cmNlICtcbiAgICAncmV0dXJuIF9fcFxcbn0nO1xuXG4gIHZhciByZXN1bHQgPSBhdHRlbXB0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBGdW5jdGlvbihpbXBvcnRzS2V5cywgc291cmNlVVJMICsgJ3JldHVybiAnICsgc291cmNlKVxuICAgICAgLmFwcGx5KHVuZGVmaW5lZCwgaW1wb3J0c1ZhbHVlcyk7XG4gIH0pO1xuXG4gIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uJ3Mgc291cmNlIGJ5IGl0cyBgdG9TdHJpbmdgIG1ldGhvZCBvclxuICAvLyB0aGUgYHNvdXJjZWAgcHJvcGVydHkgYXMgYSBjb252ZW5pZW5jZSBmb3IgaW5saW5pbmcgY29tcGlsZWQgdGVtcGxhdGVzLlxuICByZXN1bHQuc291cmNlID0gc291cmNlO1xuICBpZiAoaXNFcnJvcihyZXN1bHQpKSB7XG4gICAgdGhyb3cgcmVzdWx0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUVhY2g7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUZvcjtcbiIsImltcG9ydCBjcmVhdGVCYXNlRm9yIGZyb20gJy4vX2NyZWF0ZUJhc2VGb3IuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGb3I7XG4iLCJpbXBvcnQgYmFzZUZvciBmcm9tICcuL19iYXNlRm9yLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZvck93bjtcbiIsImltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUVhY2g7XG4iLCJpbXBvcnQgYmFzZUZvck93biBmcm9tICcuL19iYXNlRm9yT3duLmpzJztcbmltcG9ydCBjcmVhdGVCYXNlRWFjaCBmcm9tICcuL19jcmVhdGVCYXNlRWFjaC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRWFjaDtcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGBpZGVudGl0eWAgaWYgaXQncyBub3QgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBjYXN0IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYXN0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nID8gdmFsdWUgOiBpZGVudGl0eTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FzdEZ1bmN0aW9uO1xuIiwiaW1wb3J0IGFycmF5RWFjaCBmcm9tICcuL19hcnJheUVhY2guanMnO1xuaW1wb3J0IGJhc2VFYWNoIGZyb20gJy4vX2Jhc2VFYWNoLmpzJztcbmltcG9ydCBjYXN0RnVuY3Rpb24gZnJvbSAnLi9fY2FzdEZ1bmN0aW9uLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIlxuICogcHJvcGVydHkgYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmBcbiAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICogQHNlZSBfLmZvckVhY2hSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZvckVhY2goWzEsIDJdLCBmdW5jdGlvbih2YWx1ZSkge1xuICogICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgYDFgIHRoZW4gYDJgLlxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlFYWNoIDogYmFzZUVhY2g7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGNhc3RGdW5jdGlvbihpdGVyYXRlZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JFYWNoO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVDbGVhcjtcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzb2NJbmRleE9mO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICAtLXRoaXMuc2l6ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBhc3NvY0luZGV4T2YgZnJvbSAnLi9fYXNzb2NJbmRleE9mLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlR2V0O1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlSGFzO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgICsrdGhpcy5zaXplO1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZVNldDtcbiIsImltcG9ydCBsaXN0Q2FjaGVDbGVhciBmcm9tICcuL19saXN0Q2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbGlzdENhY2hlRGVsZXRlIGZyb20gJy4vX2xpc3RDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbGlzdENhY2hlR2V0IGZyb20gJy4vX2xpc3RDYWNoZUdldC5qcyc7XG5pbXBvcnQgbGlzdENhY2hlSGFzIGZyb20gJy4vX2xpc3RDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbGlzdENhY2hlU2V0IGZyb20gJy4vX2xpc3RDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdENhY2hlO1xuIiwiaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0NsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIHJlc3VsdCA9IGRhdGFbJ2RlbGV0ZSddKGtleSk7XG5cbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0RlbGV0ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tHZXQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0hhcztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgTWFwO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVDcmVhdGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoRGVsZXRlO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hHZXQ7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEhhcztcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hTZXQ7XG4iLCJpbXBvcnQgaGFzaENsZWFyIGZyb20gJy4vX2hhc2hDbGVhci5qcyc7XG5pbXBvcnQgaGFzaERlbGV0ZSBmcm9tICcuL19oYXNoRGVsZXRlLmpzJztcbmltcG9ydCBoYXNoR2V0IGZyb20gJy4vX2hhc2hHZXQuanMnO1xuaW1wb3J0IGhhc2hIYXMgZnJvbSAnLi9faGFzaEhhcy5qcyc7XG5pbXBvcnQgaGFzaFNldCBmcm9tICcuL19oYXNoU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IEhhc2g7XG4iLCJpbXBvcnQgSGFzaCBmcm9tICcuL19IYXNoLmpzJztcbmltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUNsZWFyO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleWFibGU7XG4iLCJpbXBvcnQgaXNLZXlhYmxlIGZyb20gJy4vX2lzS2V5YWJsZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TWFwRGF0YTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVEZWxldGU7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUdldDtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUhhcztcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlU2V0O1xuIiwiaW1wb3J0IG1hcENhY2hlQ2xlYXIgZnJvbSAnLi9fbWFwQ2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVEZWxldGUgZnJvbSAnLi9fbWFwQ2FjaGVEZWxldGUuanMnO1xuaW1wb3J0IG1hcENhY2hlR2V0IGZyb20gJy4vX21hcENhY2hlR2V0LmpzJztcbmltcG9ydCBtYXBDYWNoZUhhcyBmcm9tICcuL19tYXBDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVTZXQgZnJvbSAnLi9fbWFwQ2FjaGVTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTWFwQ2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tTZXQ7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgc3RhY2tDbGVhciBmcm9tICcuL19zdGFja0NsZWFyLmpzJztcbmltcG9ydCBzdGFja0RlbGV0ZSBmcm9tICcuL19zdGFja0RlbGV0ZS5qcyc7XG5pbXBvcnQgc3RhY2tHZXQgZnJvbSAnLi9fc3RhY2tHZXQuanMnO1xuaW1wb3J0IHN0YWNrSGFzIGZyb20gJy4vX3N0YWNrSGFzLmpzJztcbmltcG9ydCBzdGFja1NldCBmcm9tICcuL19zdGFja1NldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XG4iLCJpbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhc3NpZ25WYWx1ZWAgZXhjZXB0IHRoYXQgaXQgZG9lc24ndCBhc3NpZ25cbiAqIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWVxKG9iamVjdFtrZXldLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbk1lcmdlVmFsdWU7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgYWxsb2NVbnNhZmUgPSBCdWZmZXIgPyBCdWZmZXIuYWxsb2NVbnNhZmUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhbGxvY1Vuc2FmZSA/IGFsbG9jVW5zYWZlKGxlbmd0aCkgOiBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVCdWZmZXI7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgVWludDhBcnJheTtcbiIsImltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsb25lQXJyYXlCdWZmZXI7XG4iLCJpbXBvcnQgY2xvbmVBcnJheUJ1ZmZlciBmcm9tICcuL19jbG9uZUFycmF5QnVmZmVyLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcHlBcnJheTtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgIGlmICghaXNPYmplY3QocHJvdG8pKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGlmIChvYmplY3RDcmVhdGUpIHtcbiAgICAgIHJldHVybiBvYmplY3RDcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG87XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUNyZWF0ZTtcbiIsImltcG9ydCBiYXNlQ3JlYXRlIGZyb20gJy4vX2Jhc2VDcmVhdGUuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Q2xvbmVPYmplY3Q7XG4iLCJpbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZU9iamVjdDtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAsIHVubGVzcyBga2V5YCBpcyBcIl9fcHJvdG9fX1wiIG9yIFwiY29uc3RydWN0b3JcIi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHNhZmVHZXQob2JqZWN0LCBrZXkpIHtcbiAgaWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJyAmJiB0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzYWZlR2V0O1xuIiwiaW1wb3J0IGNvcHlPYmplY3QgZnJvbSAnLi9fY29weU9iamVjdC5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nXG4gKiBrZXllZCBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3QodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1BsYWluT2JqZWN0O1xuIiwiaW1wb3J0IGFzc2lnbk1lcmdlVmFsdWUgZnJvbSAnLi9fYXNzaWduTWVyZ2VWYWx1ZS5qcyc7XG5pbXBvcnQgY2xvbmVCdWZmZXIgZnJvbSAnLi9fY2xvbmVCdWZmZXIuanMnO1xuaW1wb3J0IGNsb25lVHlwZWRBcnJheSBmcm9tICcuL19jbG9uZVR5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGNvcHlBcnJheSBmcm9tICcuL19jb3B5QXJyYXkuanMnO1xuaW1wb3J0IGluaXRDbG9uZU9iamVjdCBmcm9tICcuL19pbml0Q2xvbmVPYmplY3QuanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0FycmF5TGlrZU9iamVjdCBmcm9tICcuL2lzQXJyYXlMaWtlT2JqZWN0LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICcuL2lzUGxhaW5PYmplY3QuanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgc2FmZUdldCBmcm9tICcuL19zYWZlR2V0LmpzJztcbmltcG9ydCB0b1BsYWluT2JqZWN0IGZyb20gJy4vdG9QbGFpbk9iamVjdC5qcyc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBzYWZlR2V0KG9iamVjdCwga2V5KSxcbiAgICAgIHNyY1ZhbHVlID0gc2FmZUdldChzb3VyY2UsIGtleSksXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgdmFyIGlzQXJyID0gaXNBcnJheShzcmNWYWx1ZSksXG4gICAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiBpc0J1ZmZlcihzcmNWYWx1ZSksXG4gICAgICAgIGlzVHlwZWQgPSAhaXNBcnIgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpO1xuXG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnIgfHwgaXNCdWZmIHx8IGlzVHlwZWQpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQnVmZikge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lQnVmZmVyKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzVHlwZWQpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZVR5cGVkQXJyYXkoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gW107XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIGlmIChpc0FyZ3VtZW50cyhvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0b1BsYWluT2JqZWN0KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc09iamVjdChvYmpWYWx1ZSkgfHwgaXNGdW5jdGlvbihvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpbml0Q2xvbmVPYmplY3Qoc3JjVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgfVxuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNZXJnZURlZXA7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGFzc2lnbk1lcmdlVmFsdWUgZnJvbSAnLi9fYXNzaWduTWVyZ2VWYWx1ZS5qcyc7XG5pbXBvcnQgYmFzZUZvciBmcm9tICcuL19iYXNlRm9yLmpzJztcbmltcG9ydCBiYXNlTWVyZ2VEZWVwIGZyb20gJy4vX2Jhc2VNZXJnZURlZXAuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5pbXBvcnQgc2FmZUdldCBmcm9tICcuL19zYWZlR2V0LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGJhc2VGb3Ioc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICAgID8gY3VzdG9taXplcihzYWZlR2V0KG9iamVjdCwga2V5KSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9LCBrZXlzSW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWVyZ2U7XG4iLCJpbXBvcnQgYmFzZU1lcmdlIGZyb20gJy4vX2Jhc2VNZXJnZS5qcyc7XG5pbXBvcnQgY3JlYXRlQXNzaWduZXIgZnJvbSAnLi9fY3JlYXRlQXNzaWduZXIuanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBtZXJnZXMgb3duIGFuZFxuICogaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgaW50byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGFyZVxuICogc2tpcHBlZCBpZiBhIGRlc3RpbmF0aW9uIHZhbHVlIGV4aXN0cy4gQXJyYXkgYW5kIHBsYWluIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZWx5LiBPdGhlciBvYmplY3RzIGFuZCB2YWx1ZSB0eXBlcyBhcmUgb3ZlcnJpZGRlbiBieVxuICogYXNzaWdubWVudC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBTdWJzZXF1ZW50XG4gKiBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC41LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2EnOiBbeyAnYic6IDIgfSwgeyAnZCc6IDQgfV1cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnYSc6IFt7ICdjJzogMyB9LCB7ICdlJzogNSB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4geyAnYSc6IFt7ICdiJzogMiwgJ2MnOiAzIH0sIHsgJ2QnOiA0LCAnZSc6IDUgfV0gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2U7XG4iLCJpbXBvcnQgYmFzZVZhbHVlcyBmcm9tICcuL19iYXNlVmFsdWVzLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnR5IHZhbHVlcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy52YWx1ZXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbMSwgMl0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLnZhbHVlcygnaGknKTtcbiAqIC8vID0+IFsnaCcsICdpJ11cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKG9iamVjdCkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyBbXSA6IGJhc2VWYWx1ZXMob2JqZWN0LCBrZXlzKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZXM7XG4iLCIvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0Q2FjaGVBZGQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldENhY2hlSGFzO1xuIiwiaW1wb3J0IE1hcENhY2hlIGZyb20gJy4vX01hcENhY2hlLmpzJztcbmltcG9ydCBzZXRDYWNoZUFkZCBmcm9tICcuL19zZXRDYWNoZUFkZC5qcyc7XG5pbXBvcnQgc2V0Q2FjaGVIYXMgZnJvbSAnLi9fc2V0Q2FjaGVIYXMuanMnO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA9PSBudWxsID8gMCA6IHZhbHVlcy5sZW5ndGg7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbmV4cG9ydCBkZWZhdWx0IFNldENhY2hlO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlTb21lO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhY2hlSGFzO1xuIiwiaW1wb3J0IFNldENhY2hlIGZyb20gJy4vX1NldENhY2hlLmpzJztcbmltcG9ydCBhcnJheVNvbWUgZnJvbSAnLi9fYXJyYXlTb21lLmpzJztcbmltcG9ydCBjYWNoZUhhcyBmcm9tICcuL19jYWNoZUhhcy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBDT01QQVJFX1VOT1JERVJFRF9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsQXJyYXlzO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwVG9BcnJheTtcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldFRvQXJyYXk7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgVWludDhBcnJheSBmcm9tICcuL19VaW50OEFycmF5LmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcbmltcG9ydCBlcXVhbEFycmF5cyBmcm9tICcuL19lcXVhbEFycmF5cy5qcyc7XG5pbXBvcnQgbWFwVG9BcnJheSBmcm9tICcuL19tYXBUb0FycmF5LmpzJztcbmltcG9ydCBzZXRUb0FycmF5IGZyb20gJy4vX3NldFRvQXJyYXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBDT01QQVJFX1VOT1JERVJFRF9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbEJ5VGFnO1xuIiwiLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheVB1c2g7XG4iLCJpbXBvcnQgYXJyYXlQdXNoIGZyb20gJy4vX2FycmF5UHVzaC5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRBbGxLZXlzO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZmlsdGVyYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RmlsdGVyKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gMCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJlc3VsdFtyZXNJbmRleCsrXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUZpbHRlcjtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWJBcnJheTtcbiIsImltcG9ydCBhcnJheUZpbHRlciBmcm9tICcuL19hcnJheUZpbHRlci5qcyc7XG5pbXBvcnQgc3R1YkFycmF5IGZyb20gJy4vc3R1YkFycmF5LmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSAhbmF0aXZlR2V0U3ltYm9scyA/IHN0dWJBcnJheSA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHJldHVybiBhcnJheUZpbHRlcihuYXRpdmVHZXRTeW1ib2xzKG9iamVjdCksIGZ1bmN0aW9uKHN5bWJvbCkge1xuICAgIHJldHVybiBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgc3ltYm9sKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRTeW1ib2xzO1xuIiwiaW1wb3J0IGJhc2VHZXRBbGxLZXlzIGZyb20gJy4vX2Jhc2VHZXRBbGxLZXlzLmpzJztcbmltcG9ydCBnZXRTeW1ib2xzIGZyb20gJy4vX2dldFN5bWJvbHMuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzLCBnZXRTeW1ib2xzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0QWxsS2V5cztcbiIsImltcG9ydCBnZXRBbGxLZXlzIGZyb20gJy4vX2dldEFsbEtleXMuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBvYmpQcm9wcyA9IGdldEFsbEtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0gZ2V0QWxsS2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIG9iamVjdCk7XG5cbiAgdmFyIHNraXBDdG9yID0gaXNQYXJ0aWFsO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKG9ialZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpXG4gICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxPYmplY3RzO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKTtcblxuZXhwb3J0IGRlZmF1bHQgRGF0YVZpZXc7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKTtcblxuZXhwb3J0IGRlZmF1bHQgU2V0O1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFdlYWtNYXA7XG4iLCJpbXBvcnQgRGF0YVZpZXcgZnJvbSAnLi9fRGF0YVZpZXcuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnLi9fUHJvbWlzZS5qcyc7XG5pbXBvcnQgU2V0IGZyb20gJy4vX1NldC5qcyc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuL19XZWFrTWFwLmpzJztcbmltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IHRvU291cmNlIGZyb20gJy4vX3RvU291cmNlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0VGFnO1xuIiwiaW1wb3J0IFN0YWNrIGZyb20gJy4vX1N0YWNrLmpzJztcbmltcG9ydCBlcXVhbEFycmF5cyBmcm9tICcuL19lcXVhbEFycmF5cy5qcyc7XG5pbXBvcnQgZXF1YWxCeVRhZyBmcm9tICcuL19lcXVhbEJ5VGFnLmpzJztcbmltcG9ydCBlcXVhbE9iamVjdHMgZnJvbSAnLi9fZXF1YWxPYmplY3RzLmpzJztcbmltcG9ydCBnZXRUYWcgZnJvbSAnLi9fZ2V0VGFnLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNUeXBlZEFycmF5IGZyb20gJy4vaXNUeXBlZEFycmF5LmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gb2JqSXNBcnIgPyBhcnJheVRhZyA6IGdldFRhZyhvYmplY3QpLFxuICAgICAgb3RoVGFnID0gb3RoSXNBcnIgPyBhcnJheVRhZyA6IGdldFRhZyhvdGhlcik7XG5cbiAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIG90aFRhZyA9IG90aFRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuXG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgaXNCdWZmZXIob2JqZWN0KSkge1xuICAgIGlmICghaXNCdWZmZXIob3RoZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG9iaklzQXJyID0gdHJ1ZTtcbiAgICBvYmpJc09iaiA9IGZhbHNlO1xuICB9XG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHZhciBvYmpVbndyYXBwZWQgPSBvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCxcbiAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9ialVud3JhcHBlZCwgb3RoVW53cmFwcGVkLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc0VxdWFsRGVlcDtcbiIsImltcG9ydCBiYXNlSXNFcXVhbERlZXAgZnJvbSAnLi9fYmFzZUlzRXF1YWxEZWVwLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICogIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3RMaWtlKHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgYmFzZUlzRXF1YWwsIHN0YWNrKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzRXF1YWw7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGJhc2VJc0VxdWFsIGZyb20gJy4vX2Jhc2VJc0VxdWFsLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gbWF0Y2hEYXRhIFRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSwgY3VzdG9taXplcikge1xuICB2YXIgaW5kZXggPSBtYXRjaERhdGEubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gaW5kZXgsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gIWxlbmd0aDtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSlcbiAgICAgICAgICA/IGRhdGFbMV0gIT09IG9iamVjdFtkYXRhWzBdXVxuICAgICAgICAgIDogIShkYXRhWzBdIGluIG9iamVjdClcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgZGF0YSA9IG1hdGNoRGF0YVtpbmRleF07XG4gICAgdmFyIGtleSA9IGRhdGFbMF0sXG4gICAgICAgIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHNyY1ZhbHVlID0gZGF0YVsxXTtcblxuICAgIGlmIChub0N1c3RvbWl6ZXIgJiYgZGF0YVsyXSkge1xuICAgICAgaWYgKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdGFjayA9IG5ldyBTdGFjaztcbiAgICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSwgc3RhY2spO1xuICAgICAgfVxuICAgICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBDT01QQVJFX1BBUlRJQUxfRkxBRyB8IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcsIGN1c3RvbWl6ZXIsIHN0YWNrKVxuICAgICAgICAgICAgOiByZXN1bHRcbiAgICAgICAgICApKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc01hdGNoO1xuIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICFpc09iamVjdCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3RyaWN0Q29tcGFyYWJsZTtcbiIsImltcG9ydCBpc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9faXNTdHJpY3RDb21wYXJhYmxlLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3Mgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbWF0Y2ggZGF0YSBvZiBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hEYXRhKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0ga2V5cyhvYmplY3QpLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YXIga2V5ID0gcmVzdWx0W2xlbmd0aF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICByZXN1bHRbbGVuZ3RoXSA9IFtrZXksIHZhbHVlLCBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRNYXRjaERhdGE7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgbWF0Y2hlc1Byb3BlcnR5YCBmb3Igc291cmNlIHZhbHVlcyBzdWl0YWJsZVxuICogZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKGtleSwgc3JjVmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0W2tleV0gPT09IHNyY1ZhbHVlICYmXG4gICAgICAoc3JjVmFsdWUgIT09IHVuZGVmaW5lZCB8fCAoa2V5IGluIE9iamVjdChvYmplY3QpKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlO1xuIiwiaW1wb3J0IGJhc2VJc01hdGNoIGZyb20gJy4vX2Jhc2VJc01hdGNoLmpzJztcbmltcG9ydCBnZXRNYXRjaERhdGEgZnJvbSAnLi9fZ2V0TWF0Y2hEYXRhLmpzJztcbmltcG9ydCBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lc24ndCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICB2YXIgbWF0Y2hEYXRhID0gZ2V0TWF0Y2hEYXRhKHNvdXJjZSk7XG4gIGlmIChtYXRjaERhdGEubGVuZ3RoID09IDEgJiYgbWF0Y2hEYXRhWzBdWzJdKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKG1hdGNoRGF0YVswXVswXSwgbWF0Y2hEYXRhWzBdWzFdKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PT0gc291cmNlIHx8IGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWF0Y2hlcztcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNLZXk7XG4iLCJpbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgY2xlYXJgLCBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgIT0gbnVsbCAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemU7XG4iLCJpbXBvcnQgbWVtb2l6ZSBmcm9tICcuL21lbW9pemUuanMnO1xuXG4vKiogVXNlZCBhcyB0aGUgbWF4aW11bSBtZW1vaXplIGNhY2hlIHNpemUuICovXG52YXIgTUFYX01FTU9JWkVfU0laRSA9IDUwMDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWVtb2l6ZWAgd2hpY2ggY2xlYXJzIHRoZSBtZW1vaXplZCBmdW5jdGlvbidzXG4gKiBjYWNoZSB3aGVuIGl0IGV4Y2VlZHMgYE1BWF9NRU1PSVpFX1NJWkVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZUNhcHBlZChmdW5jKSB7XG4gIHZhciByZXN1bHQgPSBtZW1vaXplKGZ1bmMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChjYWNoZS5zaXplID09PSBNQVhfTUVNT0laRV9TSVpFKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9KTtcblxuICB2YXIgY2FjaGUgPSByZXN1bHQuY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemVDYXBwZWQ7XG4iLCJpbXBvcnQgbWVtb2l6ZUNhcHBlZCBmcm9tICcuL19tZW1vaXplQ2FwcGVkLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplQ2FwcGVkKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChzdHJpbmcuY2hhckNvZGVBdCgwKSA9PT0gNDYgLyogLiAqLykge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdWJTdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdUb1BhdGg7XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCBzdHJpbmdUb1BhdGggZnJvbSAnLi9fc3RyaW5nVG9QYXRoLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBpc0tleSh2YWx1ZSwgb2JqZWN0KSA/IFt2YWx1ZV0gOiBzdHJpbmdUb1BhdGgodG9TdHJpbmcodmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FzdFBhdGg7XG4iLCJpbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0tleTtcbiIsImltcG9ydCBjYXN0UGF0aCBmcm9tICcuL19jYXN0UGF0aC5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0O1xuIiwiaW1wb3J0IGJhc2VHZXQgZnJvbSAnLi9fYmFzZUdldC5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VIYXNJbjtcbiIsImltcG9ydCBjYXN0UGF0aCBmcm9tICcuL19jYXN0UGF0aC5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQgfHwgKytpbmRleCAhPSBsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IG9iamVjdC5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzUGF0aDtcbiIsImltcG9ydCBiYXNlSGFzSW4gZnJvbSAnLi9fYmFzZUhhc0luLmpzJztcbmltcG9ydCBoYXNQYXRoIGZyb20gJy4vX2hhc1BhdGguanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EuYicpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc0luO1xuIiwiaW1wb3J0IGJhc2VJc0VxdWFsIGZyb20gJy4vX2Jhc2VJc0VxdWFsLmpzJztcbmltcG9ydCBnZXQgZnJvbSAnLi9nZXQuanMnO1xuaW1wb3J0IGhhc0luIGZyb20gJy4vaGFzSW4uanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCBpc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9faXNTdHJpY3RDb21wYXJhYmxlLmpzJztcbmltcG9ydCBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2Vzbid0IGNsb25lIGBzcmNWYWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkocGF0aCwgc3JjVmFsdWUpIHtcbiAgaWYgKGlzS2V5KHBhdGgpICYmIGlzU3RyaWN0Q29tcGFyYWJsZShzcmNWYWx1ZSkpIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUodG9LZXkocGF0aCksIHNyY1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgcmV0dXJuIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9ialZhbHVlID09PSBzcmNWYWx1ZSlcbiAgICAgID8gaGFzSW4ob2JqZWN0LCBwYXRoKVxuICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXRjaGVzUHJvcGVydHk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHk7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eURlZXA7XG4iLCJpbXBvcnQgYmFzZVByb3BlcnR5IGZyb20gJy4vX2Jhc2VQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgYmFzZVByb3BlcnR5RGVlcCBmcm9tICcuL19iYXNlUHJvcGVydHlEZWVwLmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBhIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAqICAgeyAnYSc6IHsgJ2InOiAxIH0gfVxuICogXTtcbiAqXG4gKiBfLm1hcChvYmplY3RzLCBfLnByb3BlcnR5KCdhLmInKSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqXG4gKiBfLm1hcChfLnNvcnRCeShvYmplY3RzLCBfLnByb3BlcnR5KFsnYScsICdiJ10pKSwgJ2EuYicpO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHRvS2V5KHBhdGgpKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb3BlcnR5O1xuIiwiaW1wb3J0IGJhc2VNYXRjaGVzIGZyb20gJy4vX2Jhc2VNYXRjaGVzLmpzJztcbmltcG9ydCBiYXNlTWF0Y2hlc1Byb3BlcnR5IGZyb20gJy4vX2Jhc2VNYXRjaGVzUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICcuL3Byb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBpdGVyYXRlZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gIC8vIERvbid0IHN0b3JlIHRoZSBgdHlwZW9mYCByZXN1bHQgaW4gYSB2YXJpYWJsZSB0byBhdm9pZCBhIEpJVCBidWcgaW4gU2FmYXJpIDkuXG4gIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUl0ZXJhdGVlO1xuIiwiaW1wb3J0IGJhc2VFYWNoIGZyb20gJy4vX2Jhc2VFYWNoLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXBgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pID8gQXJyYXkoY29sbGVjdGlvbi5sZW5ndGgpIDogW107XG5cbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IGl0ZXJhdGVlKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hcDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc29ydEJ5YCB3aGljaCB1c2VzIGBjb21wYXJlcmAgdG8gZGVmaW5lIHRoZVxuICogc29ydCBvcmRlciBvZiBgYXJyYXlgIGFuZCByZXBsYWNlcyBjcml0ZXJpYSBvYmplY3RzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZ1xuICogdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc29ydC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmVyIFRoZSBmdW5jdGlvbiB0byBkZWZpbmUgc29ydCBvcmRlci5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU29ydEJ5KGFycmF5LCBjb21wYXJlcikge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGFycmF5LnNvcnQoY29tcGFyZXIpO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBhcnJheVtsZW5ndGhdID0gYXJyYXlbbGVuZ3RoXS52YWx1ZTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VTb3J0Qnk7XG4iLCJpbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKlxuICogQ29tcGFyZXMgdmFsdWVzIHRvIHNvcnQgdGhlbSBpbiBhc2NlbmRpbmcgb3JkZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc29ydCBvcmRlciBpbmRpY2F0b3IgZm9yIGB2YWx1ZWAuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVBc2NlbmRpbmcodmFsdWUsIG90aGVyKSB7XG4gIGlmICh2YWx1ZSAhPT0gb3RoZXIpIHtcbiAgICB2YXIgdmFsSXNEZWZpbmVkID0gdmFsdWUgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgdmFsSXNOdWxsID0gdmFsdWUgPT09IG51bGwsXG4gICAgICAgIHZhbElzUmVmbGV4aXZlID0gdmFsdWUgPT09IHZhbHVlLFxuICAgICAgICB2YWxJc1N5bWJvbCA9IGlzU3ltYm9sKHZhbHVlKTtcblxuICAgIHZhciBvdGhJc0RlZmluZWQgPSBvdGhlciAhPT0gdW5kZWZpbmVkLFxuICAgICAgICBvdGhJc051bGwgPSBvdGhlciA9PT0gbnVsbCxcbiAgICAgICAgb3RoSXNSZWZsZXhpdmUgPSBvdGhlciA9PT0gb3RoZXIsXG4gICAgICAgIG90aElzU3ltYm9sID0gaXNTeW1ib2wob3RoZXIpO1xuXG4gICAgaWYgKCghb3RoSXNOdWxsICYmICFvdGhJc1N5bWJvbCAmJiAhdmFsSXNTeW1ib2wgJiYgdmFsdWUgPiBvdGhlcikgfHxcbiAgICAgICAgKHZhbElzU3ltYm9sICYmIG90aElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSAmJiAhb3RoSXNOdWxsICYmICFvdGhJc1N5bWJvbCkgfHxcbiAgICAgICAgKHZhbElzTnVsbCAmJiBvdGhJc0RlZmluZWQgJiYgb3RoSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICghdmFsSXNEZWZpbmVkICYmIG90aElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAhdmFsSXNSZWZsZXhpdmUpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBpZiAoKCF2YWxJc051bGwgJiYgIXZhbElzU3ltYm9sICYmICFvdGhJc1N5bWJvbCAmJiB2YWx1ZSA8IG90aGVyKSB8fFxuICAgICAgICAob3RoSXNTeW1ib2wgJiYgdmFsSXNEZWZpbmVkICYmIHZhbElzUmVmbGV4aXZlICYmICF2YWxJc051bGwgJiYgIXZhbElzU3ltYm9sKSB8fFxuICAgICAgICAob3RoSXNOdWxsICYmIHZhbElzRGVmaW5lZCAmJiB2YWxJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgKCFvdGhJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICFvdGhJc1JlZmxleGl2ZSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcGFyZUFzY2VuZGluZztcbiIsImltcG9ydCBjb21wYXJlQXNjZW5kaW5nIGZyb20gJy4vX2NvbXBhcmVBc2NlbmRpbmcuanMnO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8ub3JkZXJCeWAgdG8gY29tcGFyZSBtdWx0aXBsZSBwcm9wZXJ0aWVzIG9mIGEgdmFsdWUgdG8gYW5vdGhlclxuICogYW5kIHN0YWJsZSBzb3J0IHRoZW0uXG4gKlxuICogSWYgYG9yZGVyc2AgaXMgdW5zcGVjaWZpZWQsIGFsbCB2YWx1ZXMgYXJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIuIE90aGVyd2lzZSxcbiAqIHNwZWNpZnkgYW4gb3JkZXIgb2YgXCJkZXNjXCIgZm9yIGRlc2NlbmRpbmcgb3IgXCJhc2NcIiBmb3IgYXNjZW5kaW5nIHNvcnQgb3JkZXJcbiAqIG9mIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW5bXXxzdHJpbmdbXX0gb3JkZXJzIFRoZSBvcmRlciB0byBzb3J0IGJ5IGZvciBlYWNoIHByb3BlcnR5LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc29ydCBvcmRlciBpbmRpY2F0b3IgZm9yIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb21wYXJlTXVsdGlwbGUob2JqZWN0LCBvdGhlciwgb3JkZXJzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgb2JqQ3JpdGVyaWEgPSBvYmplY3QuY3JpdGVyaWEsXG4gICAgICBvdGhDcml0ZXJpYSA9IG90aGVyLmNyaXRlcmlhLFxuICAgICAgbGVuZ3RoID0gb2JqQ3JpdGVyaWEubGVuZ3RoLFxuICAgICAgb3JkZXJzTGVuZ3RoID0gb3JkZXJzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciByZXN1bHQgPSBjb21wYXJlQXNjZW5kaW5nKG9iakNyaXRlcmlhW2luZGV4XSwgb3RoQ3JpdGVyaWFbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAoaW5kZXggPj0gb3JkZXJzTGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICB2YXIgb3JkZXIgPSBvcmRlcnNbaW5kZXhdO1xuICAgICAgcmV0dXJuIHJlc3VsdCAqIChvcmRlciA9PSAnZGVzYycgPyAtMSA6IDEpO1xuICAgIH1cbiAgfVxuICAvLyBGaXhlcyBhbiBgQXJyYXkjc29ydGAgYnVnIGluIHRoZSBKUyBlbmdpbmUgZW1iZWRkZWQgaW4gQWRvYmUgYXBwbGljYXRpb25zXG4gIC8vIHRoYXQgY2F1c2VzIGl0LCB1bmRlciBjZXJ0YWluIGNpcmN1bXN0YW5jZXMsIHRvIHByb3ZpZGUgdGhlIHNhbWUgdmFsdWUgZm9yXG4gIC8vIGBvYmplY3RgIGFuZCBgb3RoZXJgLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL3B1bGwvMTI0N1xuICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAvL1xuICAvLyBUaGlzIGFsc28gZW5zdXJlcyBhIHN0YWJsZSBzb3J0IGluIFY4IGFuZCBvdGhlciBlbmdpbmVzLlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9OTAgZm9yIG1vcmUgZGV0YWlscy5cbiAgcmV0dXJuIG9iamVjdC5pbmRleCAtIG90aGVyLmluZGV4O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wYXJlTXVsdGlwbGU7XG4iLCJpbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuaW1wb3J0IGJhc2VJdGVyYXRlZSBmcm9tICcuL19iYXNlSXRlcmF0ZWUuanMnO1xuaW1wb3J0IGJhc2VNYXAgZnJvbSAnLi9fYmFzZU1hcC5qcyc7XG5pbXBvcnQgYmFzZVNvcnRCeSBmcm9tICcuL19iYXNlU29ydEJ5LmpzJztcbmltcG9ydCBiYXNlVW5hcnkgZnJvbSAnLi9fYmFzZVVuYXJ5LmpzJztcbmltcG9ydCBjb21wYXJlTXVsdGlwbGUgZnJvbSAnLi9fY29tcGFyZU11bHRpcGxlLmpzJztcbmltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5vcmRlckJ5YCB3aXRob3V0IHBhcmFtIGd1YXJkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfE9iamVjdFtdfHN0cmluZ1tdfSBpdGVyYXRlZXMgVGhlIGl0ZXJhdGVlcyB0byBzb3J0IGJ5LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3JkZXJzIFRoZSBzb3J0IG9yZGVycyBvZiBgaXRlcmF0ZWVzYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IHNvcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZU9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIGl0ZXJhdGVlcyA9IGFycmF5TWFwKGl0ZXJhdGVlcy5sZW5ndGggPyBpdGVyYXRlZXMgOiBbaWRlbnRpdHldLCBiYXNlVW5hcnkoYmFzZUl0ZXJhdGVlKSk7XG5cbiAgdmFyIHJlc3VsdCA9IGJhc2VNYXAoY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIHZhciBjcml0ZXJpYSA9IGFycmF5TWFwKGl0ZXJhdGVlcywgZnVuY3Rpb24oaXRlcmF0ZWUpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlZSh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgJ2NyaXRlcmlhJzogY3JpdGVyaWEsICdpbmRleCc6ICsraW5kZXgsICd2YWx1ZSc6IHZhbHVlIH07XG4gIH0pO1xuXG4gIHJldHVybiBiYXNlU29ydEJ5KHJlc3VsdCwgZnVuY3Rpb24ob2JqZWN0LCBvdGhlcikge1xuICAgIHJldHVybiBjb21wYXJlTXVsdGlwbGUob2JqZWN0LCBvdGhlciwgb3JkZXJzKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VPcmRlckJ5O1xuIiwiaW1wb3J0IGJhc2VPcmRlckJ5IGZyb20gJy4vX2Jhc2VPcmRlckJ5LmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5zb3J0QnlgIGV4Y2VwdCB0aGF0IGl0IGFsbG93cyBzcGVjaWZ5aW5nIHRoZSBzb3J0XG4gKiBvcmRlcnMgb2YgdGhlIGl0ZXJhdGVlcyB0byBzb3J0IGJ5LiBJZiBgb3JkZXJzYCBpcyB1bnNwZWNpZmllZCwgYWxsIHZhbHVlc1xuICogYXJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIuIE90aGVyd2lzZSwgc3BlY2lmeSBhbiBvcmRlciBvZiBcImRlc2NcIiBmb3JcbiAqIGRlc2NlbmRpbmcgb3IgXCJhc2NcIiBmb3IgYXNjZW5kaW5nIHNvcnQgb3JkZXIgb2YgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7QXJyYXlbXXxGdW5jdGlvbltdfE9iamVjdFtdfHN0cmluZ1tdfSBbaXRlcmF0ZWVzPVtfLmlkZW50aXR5XV1cbiAqICBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBbb3JkZXJzXSBUaGUgc29ydCBvcmRlcnMgb2YgYGl0ZXJhdGVlc2AuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5yZWR1Y2VgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgc29ydGVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQ4IH0sXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM0IH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQwIH0sXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqIF07XG4gKlxuICogLy8gU29ydCBieSBgdXNlcmAgaW4gYXNjZW5kaW5nIG9yZGVyIGFuZCBieSBgYWdlYCBpbiBkZXNjZW5kaW5nIG9yZGVyLlxuICogXy5vcmRlckJ5KHVzZXJzLCBbJ3VzZXInLCAnYWdlJ10sIFsnYXNjJywgJ2Rlc2MnXSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydiYXJuZXknLCAzNl0sIFsnYmFybmV5JywgMzRdLCBbJ2ZyZWQnLCA0OF0sIFsnZnJlZCcsIDQwXV1cbiAqL1xuZnVuY3Rpb24gb3JkZXJCeShjb2xsZWN0aW9uLCBpdGVyYXRlZXMsIG9yZGVycywgZ3VhcmQpIHtcbiAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzQXJyYXkoaXRlcmF0ZWVzKSkge1xuICAgIGl0ZXJhdGVlcyA9IGl0ZXJhdGVlcyA9PSBudWxsID8gW10gOiBbaXRlcmF0ZWVzXTtcbiAgfVxuICBvcmRlcnMgPSBndWFyZCA/IHVuZGVmaW5lZCA6IG9yZGVycztcbiAgaWYgKCFpc0FycmF5KG9yZGVycykpIHtcbiAgICBvcmRlcnMgPSBvcmRlcnMgPT0gbnVsbCA/IFtdIDogW29yZGVyc107XG4gIH1cbiAgcmV0dXJuIGJhc2VPcmRlckJ5KGNvbGxlY3Rpb24sIGl0ZXJhdGVlcywgb3JkZXJzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3JkZXJCeTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlRmluZEluZGV4O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTmFOO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5kZXhPZmAgd2hpY2ggcGVyZm9ybXMgc3RyaWN0IGVxdWFsaXR5XG4gKiBjb21wYXJpc29ucyBvZiB2YWx1ZXMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpY3RJbmRleE9mO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlJbmNsdWRlc1dpdGg7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYHVuZGVmaW5lZGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLm5vb3ApO1xuICogLy8gPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkXVxuICovXG5mdW5jdGlvbiBub29wKCkge1xuICAvLyBObyBvcGVyYXRpb24gcGVyZm9ybWVkLlxufVxuXG5leHBvcnQgZGVmYXVsdCBub29wO1xuIiwiaW1wb3J0IFNldCBmcm9tICcuL19TZXQuanMnO1xuaW1wb3J0IG5vb3AgZnJvbSAnLi9ub29wLmpzJztcbmltcG9ydCBzZXRUb0FycmF5IGZyb20gJy4vX3NldFRvQXJyYXkuanMnO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzZXQgb2JqZWN0IG9mIGB2YWx1ZXNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhZGQgdG8gdGhlIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBzZXQuXG4gKi9cbnZhciBjcmVhdGVTZXQgPSAhKFNldCAmJiAoMSAvIHNldFRvQXJyYXkobmV3IFNldChbLC0wXSkpWzFdKSA9PSBJTkZJTklUWSkgPyBub29wIDogZnVuY3Rpb24odmFsdWVzKSB7XG4gIHJldHVybiBuZXcgU2V0KHZhbHVlcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBfdGVtcGxhdGUgZnJvbSAnbG9kYXNoLWVzL3RlbXBsYXRlJztcbmltcG9ydCBfZm9yRWFjaCBmcm9tICdsb2Rhc2gtZXMvZm9yRWFjaCc7XG5pbXBvcnQgX21lcmdlIGZyb20gJ2xvZGFzaC1lcy9tZXJnZSc7XG5pbXBvcnQgX3ZhbHVlcyBmcm9tICdsb2Rhc2gtZXMvdmFsdWVzJztcbmltcG9ydCBfb3JkZXJCeSBmcm9tICdsb2Rhc2gtZXMvb3JkZXJCeSc7XG5pbXBvcnQgX3VuaXFCeSBmcm9tICdsb2Rhc2gtZXMvdW5pcUJ5JztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBGZWVkIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0ID0gRmVlZC5kZWZhdWx0O1xuXG4gICAgdGhpcy5fc2V0dGluZ3MgPSBfbWVyZ2Uoe30sIEZlZWQuZGVmYXVsdCwgY29uZmlnKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtb2R1bGVcbiAgICovXG4gIGluaXQoKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcbiAgICBsZXQgZmVlZCA9IHRoaXMuX3NldHRpbmdzLmZlZWQ7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgIHJzc1RvSnNvbjogRmVlZC5yc3NUb0pzb24sXG4gICAgICByc3NVcmw6IChBcnJheS5pc0FycmF5KGZlZWQpKSA/IGZlZWQgOiBbZmVlZF1cbiAgICB9O1xuXG4gICAgLy8gR28gdGhyb3VnaCBlYWNoIGZlZWRcbiAgICBfZm9yRWFjaChjb25maWcucnNzVXJsLCAodXJsLCBpbmRleCkgPT4ge1xuICAgICAgLy8gTWFrZSB0aGUgcmVxdWVzdFxuICAgICAgdGhpcy5fcmVxdWVzdChjb25maWcsIHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBkYXRhXG4gICAgICAgICAgZGF0YS5wdXNoKHRoaXMuX3Byb2Nlc3MoSlNPTi5wYXJzZShyZXNwb25zZSksIHRoaXMuX3NldHRpbmdzKSk7XG4gICAgICAgICAgLy8gV2hlbiBhbGwgZmVlZHMgaGF2ZSBiZWVuIHJlcXVlc3RlZCwgbWVyZ2UgdGhlIGRhdGEgYW5kIGNvbXBpbGVcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IGNvbmZpZy5yc3NVcmwubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZShkYXRhLCB0aGlzLl9zZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIGxldCBjb21waWxlZCA9IHRoaXMuX3JlbmRlcihcbiAgICAgICAgICAgICAgdGhpcy5fbWVyZ2UoZGF0YSwgdGhpcy5fc2V0dGluZ3MpLFxuICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9zZXR0aW5ncy5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoZWwpIGVsLmlubmVySFRNTCA9IGNvbXBpbGVkO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIFhIUiByZXF1ZXN0IGZvciB0aGUgZmVlZCBkYXRhXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnIFRoZSByZXF1ZXN0IGRhdGFcbiAgICogQHBhcmFtICB7c3RyaW5nfSB1cmwgICAgVGhlIHJlcXVlc3QgdXJsXG4gICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIFJlc29sdmVzIHdoZW4gdGhlIHJlc3BvbnNlIGlzIHJlYWR5LCByZWplY3RzIHdoZW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG9wZXJhdGlvbiB0aW1lcyBvdXQgb3IgdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAqL1xuICBfcmVxdWVzdChjb25maWcsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IF94aHIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChfeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBpZiAoX3hoci5zdGF0dXMgPj0gMjAwICYmIF94aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKF94aHIucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKF94aHIuc3RhdHVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaGUgRmVlZCByZXF1ZXN0IHRpbWVkIG91dCcpKTtcbiAgICAgIH07XG4gICAgICB4aHIub3BlbignR0VUJywgYCR7Y29uZmlnLnJzc1RvSnNvbn0/cnNzX3VybD0ke3VybH1gLCB0cnVlKTtcbiAgICAgIHhoci5zZW5kKCk7XG4gICAgICB4aHIgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZGF0YSB0byB0aGUgYXBwcm9wcmlhdGUgcHJvY2Vzc2luZyBmdW5jdGlvbiBiYXNlZCBvbiB0eXBlXG4gICAqIEBwYXJhbSAge29iamVjdH0gZGF0YSAgICAgVGhlIHJlcXVlc3RlZCBmZWVkIGRhdGEgdG8gcGFzc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IHNldHRpbmdzIFRoZSBhcHBsaWNhdGlvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwcm9jZXNzZWQgZGF0YVxuICAgKi9cbiAgX3Byb2Nlc3MoZGF0YSwgc2V0dGluZ3MpIHtcbiAgICByZXR1cm4gRmVlZC5wcm9jZXNzW3NldHRpbmdzLnR5cGVdKGRhdGEsIHNldHRpbmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGRhdGEgdG8gdGhlIGFwcHJvcHJpYXRlIG1lcmdlIGZ1bmN0aW9uIGJhc2VkIG9uIHR5cGVcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIG1lcmdlZCBmZWVkIGRhdGFcbiAgICovXG4gIF9tZXJnZShkYXRhLCBzZXR0aW5ncykge1xuICAgIHJldHVybiBGZWVkLm1lcmdlW3NldHRpbmdzLnR5cGVdKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmUgdGVtcGxhdGUgY29tcG9uZW50cywgcGFzcyBkYXRhLCBhbmQgcmV0dXJuIGNvbXBpbGVkIHRlbWxhdGVcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgVGhlIGNvbXBsaWVkIGh0bWwgc3RyaW5nXG4gICAqL1xuICBfcmVuZGVyKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgZGF0YS5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG4gICAgaWYgKHNldHRpbmdzLmxvZylcbiAgICAgIGNvbnNvbGUuZGlyKGRhdGEpO1xuXG4gICAgbGV0IHRlbXBsYXRlID0gX3ZhbHVlcyhzZXR0aW5ncy50ZW1wbGF0ZXMpLmpvaW4oJycpO1xuICAgIGxldCBjb21waWxlZCA9IF90ZW1wbGF0ZShcbiAgICAgIHRlbXBsYXRlLFxuICAgICAge1xuICAgICAgICAnaW1wb3J0cyc6IHtcbiAgICAgICAgICAnX2VhY2gnOiBfZm9yRWFjaFxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gY29tcGlsZWQoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvcGVuIFJTUyB0byBKU09OIGFwaSwgc2VlIGh0dHBzOi8vcnNzMmpzb24uY29tXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5GZWVkLnJzc1RvSnNvbiA9ICdodHRwczovL2FwaS5yc3MyanNvbi5jb20vdjEvYXBpLmpzb24nO1xuXG4vKipcbiAqIFRoZSB0ZW1wbGF0ZSBmb3IgdGhlIHdpZGdldC5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbkZlZWQudGVtcGxhdGVzID0ge1xuICBtZWRpdW06IHtcbiAgICBvcGVuZXI6IFtcbiAgICAgICc8c2VjdGlvbiBjbGFzcz1cIm8tZmVlZCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy53cmFwcGVyICU+XCIgc3R5bGU9XCInLFxuICAgICAgICAnPCUgaWYgKHNldHRpbmdzLmZvbnRTaXplKSB7ICU+Zm9udC1zaXplOiA8JS0gc2V0dGluZ3MuZm9udFNpemUgJT47PCUgfSAlPicsXG4gICAgICAgICc8JSBpZiAoc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yKSB7ICU+Ym9yZGVyLWNvbG9yOiA8JS0gc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yICU+OzwlIH0gJT4nLFxuICAgICAgJ1wiPidcbiAgICBdLFxuICAgIGhlYWRlcjogW1xuICAgICAgJzxoZWFkZXIgY2xhc3M9XCJvLWZlZWRfX2hlYWRlciA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5oZWFkZXIgJT5cIj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm8tZmVlZF9fYXZhdGFyIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmF2YXRhciAlPlwiPicsXG4gICAgICAgICAgJzxpbWcgc3JjPVwiJyxcbiAgICAgICAgICAgICAgICAnPCUgaWYgKHNldHRpbmdzLnByb2ZpbGVJbWcgIT09IFwiXCIpIHsgJT4nLFxuICAgICAgICAgICAgICAgICAgJzwlLSBzZXR0aW5ncy5wcm9maWxlSW1nICU+JyxcbiAgICAgICAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgICAgICAgJzwlLSBmZWVkLnByb2ZpbGVJbWcgJT4nLFxuICAgICAgICAgICAgICAgICc8JSB9ICU+XCIgJyxcbiAgICAgICAgICAgICAgICd3aWR0aD1cIjwlLSBzZXR0aW5ncy5yYXRpb1Byb2ZpbGVbMF0gJT5cIiAnLFxuICAgICAgICAgICAgICAgJ2hlaWdodD1cIjwlLSBzZXR0aW5ncy5yYXRpb1Byb2ZpbGVbMV0gJT5cIj4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzxhIGNsYXNzPVwiby1mZWVkX191cmwgPCUtIHNldHRpbmdzLmNsYXNzZXMuYXZhdGFyICU+XCIgJyxcbiAgICAgICAgICAnaHJlZj1cIjwlIGlmIChzZXR0aW5ncy50aXRsZVVybCAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAnPCUtIHNldHRpbmdzLnRpdGxlVXJsICU+JyxcbiAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBmZWVkLnVybCAlPicsXG4gICAgICAgICAgJzwlIH0gJT5cIiAnLFxuICAgICAgICAgICAndGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiPicsXG4gICAgICAgICAgJzwlIGlmIChzZXR0aW5ncy50aXRsZSAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAnPCUtIHNldHRpbmdzLnRpdGxlICU+JyxcbiAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBmZWVkLnRpdGxlICU+JyxcbiAgICAgICAgICAnPCUgfSAlPicsXG4gICAgICAgICc8L2E+JyxcbiAgICAgICc8L2hlYWRlcj4nXG4gICAgXSxcbiAgICBwb3N0czogW1xuICAgICAgJzxkaXYgY2xhc3M9XCJvLWZlZWRfX2l0ZW1zXCIgc3R5bGU9XCInLFxuICAgICAgICAnYm9yZGVyLWNvbG9yOiA8JS0gc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yICU+OycsXG4gICAgICAnXCI+JyxcbiAgICAgICAgJzwlIF9lYWNoKGl0ZW1zLCBmdW5jdGlvbihwb3N0KSB7ICU+JyxcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmZlZWRJdGVtICU+XCI+JyxcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjLWZlZWQtaXRlbV9fdGl0bGUgPCUtIHNldHRpbmdzLmNsYXNzZXMudGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJjLWZlZWQtaXRlbV9fbGluayA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5saW5rICU+XCInLFxuICAgICAgICAgICAgICAgICAnaHJlZj1cIjwlLSBwb3N0Lmd1aWQgJT5cIicsXG4gICAgICAgICAgICAgICAgICd0YXJnZXQ9XCJfYmxhbmtcIicsXG4gICAgICAgICAgICAgICAgICdyZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAgICAgICAnPCUtIHBvc3QudGl0bGUgJT4nLFxuICAgICAgICAgICAgICAnPC9hPicsXG4gICAgICAgICAgICAnPC9oND4nLFxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2RhdGUgPCUtIHNldHRpbmdzLmNsYXNzZXMuZGF0ZSAlPlwiICcsXG4gICAgICAgICAgICAgICAgICAndGl0bGU9XCI8JS0gc2V0dGluZ3MucG9zdERhdGVUaXRsZSAlPlwiPicsXG4gICAgICAgICAgICAgICc8JS0gcG9zdC5kYXRlICU+JyxcbiAgICAgICAgICAgICc8L3NwYW4+JyxcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYy1mZWVkLWl0ZW1fX3RodW1ibmFpbCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy50aHVtYm5haWwgJT5cIicsXG4gICAgICAgICAgICAgICAgICdzdHlsZT1cIicsXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoPCUtIHBvc3QudGh1bWJuYWlsICU+KTsnLFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0OiA8JS0gc2V0dGluZ3MucG9zdEltZ0hlaWdodCAlPjtcIicsXG4gICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbj1cInRydWVcIj4nLFxuICAgICAgICAgICAgICAnPGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgc3JjPVwiPCUtIHBvc3QudGh1bWJuYWlsICU+XCIgYWx0PVwiPCUtIHBvc3QudGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJjLWZlZWQtaXRlbV9fZXhjZXJwdCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5leGNlcnB0ICU+XCI+JyxcbiAgICAgICAgICAgICAgJzwlLSBwb3N0LmV4Y2VycHQgJT48JS0gc2V0dGluZ3MucG9zdEV4Y2VycHRUcmFpbCAlPicsXG4gICAgICAgICAgICAnPC9wPicsXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtX19mb290ZXIgPCUtIHNldHRpbmdzLmNsYXNzZXMuaXRlbUZvb3RlciAlPlwiPicsXG4gICAgICAgICAgICAgICc8YSBjbGFzcz1cImMtZmVlZC1pdGVtX19jdGEgPCUtIHNldHRpbmdzLmNsYXNzZXMuY3RhICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgJ2hyZWY9XCI8JS0gcG9zdC5ndWlkICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgJ3RhcmdldD1cIl9ibGFua1wiICcsXG4gICAgICAgICAgICAgICAgICdyZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAgICAgICAnPCUtIHNldHRpbmdzLnBvc3RDdGFUZXh0ICU+JyxcbiAgICAgICAgICAgICAgJzwvYT4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8JSB9KTsgJT4nLFxuICAgICAgJzwvZGl2PidcbiAgICBdLFxuICAgIGNsb3NlcjogW1xuICAgICAgJzwvc2VjdGlvbj4nXG4gICAgXVxuICB9XG59O1xuXG4vKipcbiAqIEZ1bmN0aW9ucyBmb3IgcHJvY2Vzc2luZyB0aGUgZGF0YSBiYXNlZCBvbiB0aGUgZmVlZCB0eXBlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuRmVlZC5wcm9jZXNzID0ge1xuICBtZWRpdW06IGZ1bmN0aW9uKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgbGV0IGxlbmd0aCA9IHNldHRpbmdzLnBvc3RFeGNlcnB0TGVuZ3RoO1xuXG4gICAgX2ZvckVhY2goZGF0YS5pdGVtcywgZnVuY3Rpb24ocG9zdCwgaW5kZXgpIHtcbiAgICAgIGxldCBleGNlcnB0ID0gJyc7XG4gICAgICBsZXQgZGF0ZSA9ICcnO1xuXG4gICAgICAvLyBSZW1vdmUgZmlndXJlcyBmaXJzdFxuICAgICAgZXhjZXJwdCA9IHBvc3QuZGVzY3JpcHRpb25cbiAgICAgICAgLnJlcGxhY2UoLzxmaWd1cmUuKj4uKj88XFwvZmlndXJlPi9nLCAnJyk7XG5cbiAgICAgIC8vIFJlbW92ZSBhbGwgdGFnc1xuICAgICAgZXhjZXJwdCA9IGV4Y2VycHQucmVwbGFjZSgvPCgufFxcbikqPz4vZywgJycpO1xuXG4gICAgICAvLyBUcmltIHRoZSBleGNlcnB0XG4gICAgICBleGNlcnB0ID0gZXhjZXJwdC5zdWJzdHIoMCwgbGVuZ3RoKTtcbiAgICAgIGV4Y2VycHQgPSBleGNlcnB0LnN1YnN0cigwLFxuICAgICAgICBNYXRoLm1pbihleGNlcnB0Lmxlbmd0aCwgZXhjZXJwdC5sYXN0SW5kZXhPZignICcpKVxuICAgICAgKTtcblxuICAgICAgcG9zdC5leGNlcnB0ID0gZXhjZXJwdDtcblxuICAgICAgLy8gRm9ybWF0IHRoZSBkYXRlXG4gICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShwb3N0LnB1YkRhdGUucmVwbGFjZSgnICcsICdUJykpKVxuICAgICAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKHNldHRpbmdzLnBvc3REYXRlTG9jYWwsIHNldHRpbmdzLnBvc3REYXRlRm9ybWF0KTtcblxuICAgICAgcG9zdC5kYXRlID0gZGF0ZTtcblxuICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuXG4vKipcbiAqIEZ1bmN0aW9ucyBmb3IgbWVyZ2luZyB0aGUgZGF0YSBmZWVkcyB0b2dldGhlciwgYmFzZWQgb24gdGhlIGZlZWQgdHlwZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbkZlZWQubWVyZ2UgPSB7XG4gIG1lZGl1bTogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBtZXJnZWQgPSB7fTtcbiAgICBsZXQgaXRlbXMgPSBbXTtcblxuICAgIC8vIENvbWJpbmUgdGhlIHBvc3QgaXRlbXNcbiAgICBkYXRhLmZvckVhY2goKGZlZWQpID0+IHtcbiAgICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGZlZWQuaXRlbXMpO1xuICAgIH0pO1xuXG4gICAgLy8gTWVyZ2UgdGhlIGRhdGEsIHRoaXMgd2lsbCBvdmVycmlkZSB2YWx1ZXMsIGl0IHByb2JhYmx5IHdvbid0IGJlXG4gICAgLy8gcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgZmVlZHMgdGhhdCBhcmUgdGhlIHNhbWUsIGJ1dCBwb3RlbnRpYWxseVxuICAgIC8vIGRpZmZlcmVudCBmZWVkIHR5cGVzIGNvdWxkIHVzZSB0aGlzIGFuZCBjb21iaW5lIHVuaXF1ZSBkYXRhXG4gICAgZGF0YS5mb3JFYWNoKChmZWVkKSA9PiB7XG4gICAgICBtZXJnZWQgPSBfbWVyZ2UobWVyZ2VkLCBmZWVkKTtcbiAgICB9KTtcblxuICAgIC8vIEdldCB1bmlxdWUgcG9zdHNcbiAgICAvLyBpdGVtcyA9IF91bmlxQnkoaXRlbXMsIChpdGVtKSA9PiBpdGVtLmd1aWQpO1xuXG4gICAgbWVyZ2VkLml0ZW1zID0gX29yZGVyQnkoaXRlbXMsICdwdWJEYXRlJywgJ2Rlc2MnKTtcblxuICAgIHJldHVybiBtZXJnZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgaHR0cHM6Ly9yc3MyanNvbi5jb20vZG9jcyBmb3IgZGV0YWlscyBvbiBkZWZhdWx0IHBhcmFtZXRlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbkZlZWQuZGVmYXVsdCA9IHtcbiAgZmVlZDogJycsXG4gIHNlbGVjdG9yOiAnI2pzLWZlZWQnLFxuICB0eXBlOiAnbWVkaXVtJyxcbiAgdGl0bGU6ICcnLFxuICB0aXRsZVVybDogJycsXG4gIHByb2ZpbGVJbWc6ICcnLFxuICBmb250U2l6ZTogJycsXG4gIHJhdGlvUHJvZmlsZTogWyc1MCcsICc1MCddLFxuICBwb3N0Qm9yZGVyQ29sb3I6ICdsaWdodHN0ZWVsYmx1ZScsXG4gIHBvc3RJbWdIZWlnaHQ6ICcyMDBweCcsXG4gIHBvc3RFeGNlcnB0TGVuZ3RoOiAxMjAsXG4gIHBvc3RFeGNlcnB0VHJhaWw6ICfigKYnLFxuICBwb3N0Q3RhVGV4dDogJ1JlYWQgdGhlIGZ1bGwgcG9zdCcsXG4gIHBvc3REYXRlTG9jYWw6ICdlbi1VUycsXG4gIHBvc3REYXRlRm9ybWF0OiB7XG4gICAgeWVhcjogJ251bWVyaWMnLFxuICAgIG1vbnRoOiAnbG9uZycsXG4gICAgZGF5OiAnbnVtZXJpYydcbiAgfSxcbiAgcG9zdERhdGVUaXRsZTogJ1B1Ymxpc2hlZCBEYXRlJyxcbiAgY2xhc3Nlczoge1xuICAgIHdyYXBwZXI6ICcnLFxuICAgIGhlYWRlcjogJycsXG4gICAgdXJsOiAnJyxcbiAgICBmZWVkSXRlbTogJycsXG4gICAgdGl0bGU6ICcnLFxuICAgIGxpbms6ICcnLFxuICAgIHRodW1ibmFpbDogJycsXG4gICAgZXhjZXJwdDogJycsXG4gICAgaXRlbUZvb3RlcjogJycsXG4gICAgY3RhOiAnJyxcbiAgICBkYXRlOiAnJ1xuICB9LFxuICB0ZW1wbGF0ZXM6IHtcbiAgICBvcGVuZXI6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5vcGVuZXIuam9pbignJyksXG4gICAgaGVhZGVyOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0uaGVhZGVyLmpvaW4oJycpLFxuICAgIHBvc3RzOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0ucG9zdHMuam9pbignJyksXG4gICAgY2xvc2VyOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0uY2xvc2VyLmpvaW4oJycpXG4gIH0sXG4gIGxvZzogZmFsc2UsXG4gIHVuaXF1ZTogZmFsc2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZlZWQ7XG4iXSwibmFtZXMiOlsiZnJlZUdsb2JhbCIsImdsb2JhbCIsIk9iamVjdCIsImZyZWVTZWxmIiwic2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsIlN5bWJvbCIsIm9iamVjdFByb3RvIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJuYXRpdmVPYmplY3RUb1N0cmluZyIsInRvU3RyaW5nIiwic3ltVG9TdHJpbmdUYWciLCJ0b1N0cmluZ1RhZyIsInVuZGVmaW5lZCIsImdldFJhd1RhZyIsInZhbHVlIiwiaXNPd24iLCJjYWxsIiwidGFnIiwidW5tYXNrZWQiLCJlIiwicmVzdWx0Iiwib2JqZWN0VG9TdHJpbmciLCJudWxsVGFnIiwidW5kZWZpbmVkVGFnIiwiYmFzZUdldFRhZyIsImlzT2JqZWN0IiwidHlwZSIsImFzeW5jVGFnIiwiZnVuY1RhZyIsImdlblRhZyIsInByb3h5VGFnIiwiaXNGdW5jdGlvbiIsImNvcmVKc0RhdGEiLCJtYXNrU3JjS2V5IiwidWlkIiwiZXhlYyIsImtleXMiLCJJRV9QUk9UTyIsImlzTWFza2VkIiwiZnVuYyIsImZ1bmNQcm90byIsImZ1bmNUb1N0cmluZyIsInRvU291cmNlIiwicmVSZWdFeHBDaGFyIiwicmVJc0hvc3RDdG9yIiwicmVJc05hdGl2ZSIsIlJlZ0V4cCIsInJlcGxhY2UiLCJiYXNlSXNOYXRpdmUiLCJwYXR0ZXJuIiwidGVzdCIsImdldFZhbHVlIiwib2JqZWN0Iiwia2V5IiwiZ2V0TmF0aXZlIiwiZGVmaW5lUHJvcGVydHkiLCJiYXNlQXNzaWduVmFsdWUiLCJlcSIsIm90aGVyIiwiYXNzaWduVmFsdWUiLCJvYmpWYWx1ZSIsImNvcHlPYmplY3QiLCJzb3VyY2UiLCJwcm9wcyIsImN1c3RvbWl6ZXIiLCJpc05ldyIsImluZGV4IiwibGVuZ3RoIiwibmV3VmFsdWUiLCJpZGVudGl0eSIsImFwcGx5IiwidGhpc0FyZyIsImFyZ3MiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4Iiwib3ZlclJlc3QiLCJzdGFydCIsInRyYW5zZm9ybSIsImFyZ3VtZW50cyIsImFycmF5IiwiQXJyYXkiLCJvdGhlckFyZ3MiLCJjb25zdGFudCIsImJhc2VTZXRUb1N0cmluZyIsInN0cmluZyIsIkhPVF9DT1VOVCIsIkhPVF9TUEFOIiwibmF0aXZlTm93IiwiRGF0ZSIsIm5vdyIsInNob3J0T3V0IiwiY291bnQiLCJsYXN0Q2FsbGVkIiwic3RhbXAiLCJyZW1haW5pbmciLCJzZXRUb1N0cmluZyIsImJhc2VSZXN0IiwiTUFYX1NBRkVfSU5URUdFUiIsImlzTGVuZ3RoIiwiaXNBcnJheUxpa2UiLCJyZUlzVWludCIsImlzSW5kZXgiLCJpc0l0ZXJhdGVlQ2FsbCIsImNyZWF0ZUFzc2lnbmVyIiwiYXNzaWduZXIiLCJzb3VyY2VzIiwiZ3VhcmQiLCJiYXNlVGltZXMiLCJuIiwiaXRlcmF0ZWUiLCJpc09iamVjdExpa2UiLCJhcmdzVGFnIiwiYmFzZUlzQXJndW1lbnRzIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJpc0FyZ3VtZW50cyIsImlzQXJyYXkiLCJzdHViRmFsc2UiLCJmcmVlRXhwb3J0cyIsImV4cG9ydHMiLCJub2RlVHlwZSIsImZyZWVNb2R1bGUiLCJtb2R1bGUiLCJtb2R1bGVFeHBvcnRzIiwiQnVmZmVyIiwibmF0aXZlSXNCdWZmZXIiLCJpc0J1ZmZlciIsImFycmF5VGFnIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsIm9iamVjdFRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsIndlYWtNYXBUYWciLCJhcnJheUJ1ZmZlclRhZyIsImRhdGFWaWV3VGFnIiwiZmxvYXQzMlRhZyIsImZsb2F0NjRUYWciLCJpbnQ4VGFnIiwiaW50MTZUYWciLCJpbnQzMlRhZyIsInVpbnQ4VGFnIiwidWludDhDbGFtcGVkVGFnIiwidWludDE2VGFnIiwidWludDMyVGFnIiwidHlwZWRBcnJheVRhZ3MiLCJiYXNlSXNUeXBlZEFycmF5IiwiYmFzZVVuYXJ5IiwiZnJlZVByb2Nlc3MiLCJwcm9jZXNzIiwibm9kZVV0aWwiLCJ0eXBlcyIsInJlcXVpcmUiLCJiaW5kaW5nIiwibm9kZUlzVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsImFycmF5TGlrZUtleXMiLCJpbmhlcml0ZWQiLCJpc0FyciIsImlzQXJnIiwiaXNCdWZmIiwiaXNUeXBlIiwic2tpcEluZGV4ZXMiLCJTdHJpbmciLCJwdXNoIiwiaXNQcm90b3R5cGUiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJwcm90byIsIm5hdGl2ZUtleXNJbiIsImJhc2VLZXlzSW4iLCJpc1Byb3RvIiwia2V5c0luIiwiYXNzaWduSW5XaXRoIiwic3JjSW5kZXgiLCJvdmVyQXJnIiwiYXJnIiwiZ2V0UHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJvYmplY3RDdG9yU3RyaW5nIiwiaXNQbGFpbk9iamVjdCIsImRvbUV4Y1RhZyIsImlzRXJyb3IiLCJtZXNzYWdlIiwibmFtZSIsImF0dGVtcHQiLCJFcnJvciIsImFycmF5TWFwIiwiYmFzZVZhbHVlcyIsImN1c3RvbURlZmF1bHRzQXNzaWduSW4iLCJzcmNWYWx1ZSIsInN0cmluZ0VzY2FwZXMiLCJlc2NhcGVTdHJpbmdDaGFyIiwiY2hyIiwibmF0aXZlS2V5cyIsImJhc2VLZXlzIiwicmVJbnRlcnBvbGF0ZSIsImJhc2VQcm9wZXJ0eU9mIiwiaHRtbEVzY2FwZXMiLCJlc2NhcGVIdG1sQ2hhciIsInN5bWJvbFRhZyIsImlzU3ltYm9sIiwiSU5GSU5JVFkiLCJzeW1ib2xQcm90byIsInN5bWJvbFRvU3RyaW5nIiwiYmFzZVRvU3RyaW5nIiwicmVVbmVzY2FwZWRIdG1sIiwicmVIYXNVbmVzY2FwZWRIdG1sIiwiZXNjYXBlIiwicmVFc2NhcGUiLCJyZUV2YWx1YXRlIiwidGVtcGxhdGVTZXR0aW5ncyIsInJlRW1wdHlTdHJpbmdMZWFkaW5nIiwicmVFbXB0eVN0cmluZ01pZGRsZSIsInJlRW1wdHlTdHJpbmdUcmFpbGluZyIsInJlRXNUZW1wbGF0ZSIsInJlTm9NYXRjaCIsInJlVW5lc2NhcGVkU3RyaW5nIiwidGVtcGxhdGUiLCJvcHRpb25zIiwic2V0dGluZ3MiLCJpbXBvcnRzIiwiXyIsImltcG9ydHNLZXlzIiwiaW1wb3J0c1ZhbHVlcyIsImlzRXNjYXBpbmciLCJpc0V2YWx1YXRpbmciLCJpbnRlcnBvbGF0ZSIsInJlRGVsaW1pdGVycyIsImV2YWx1YXRlIiwic291cmNlVVJMIiwibWF0Y2giLCJlc2NhcGVWYWx1ZSIsImludGVycG9sYXRlVmFsdWUiLCJlc1RlbXBsYXRlVmFsdWUiLCJldmFsdWF0ZVZhbHVlIiwib2Zmc2V0Iiwic2xpY2UiLCJ2YXJpYWJsZSIsImFycmF5RWFjaCIsImNyZWF0ZUJhc2VGb3IiLCJmcm9tUmlnaHQiLCJrZXlzRnVuYyIsIml0ZXJhYmxlIiwiYmFzZUZvciIsImJhc2VGb3JPd24iLCJjcmVhdGVCYXNlRWFjaCIsImVhY2hGdW5jIiwiY29sbGVjdGlvbiIsImJhc2VFYWNoIiwiY2FzdEZ1bmN0aW9uIiwiZm9yRWFjaCIsImxpc3RDYWNoZUNsZWFyIiwiX19kYXRhX18iLCJzaXplIiwiYXNzb2NJbmRleE9mIiwiYXJyYXlQcm90byIsInNwbGljZSIsImxpc3RDYWNoZURlbGV0ZSIsImRhdGEiLCJsYXN0SW5kZXgiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJMaXN0Q2FjaGUiLCJlbnRyaWVzIiwiY2xlYXIiLCJlbnRyeSIsInNldCIsImdldCIsImhhcyIsInN0YWNrQ2xlYXIiLCJzdGFja0RlbGV0ZSIsInN0YWNrR2V0Iiwic3RhY2tIYXMiLCJNYXAiLCJuYXRpdmVDcmVhdGUiLCJoYXNoQ2xlYXIiLCJoYXNoRGVsZXRlIiwiSEFTSF9VTkRFRklORUQiLCJoYXNoR2V0IiwiaGFzaEhhcyIsImhhc2hTZXQiLCJIYXNoIiwibWFwQ2FjaGVDbGVhciIsImlzS2V5YWJsZSIsImdldE1hcERhdGEiLCJtYXAiLCJtYXBDYWNoZURlbGV0ZSIsIm1hcENhY2hlR2V0IiwibWFwQ2FjaGVIYXMiLCJtYXBDYWNoZVNldCIsIk1hcENhY2hlIiwiTEFSR0VfQVJSQVlfU0laRSIsInN0YWNrU2V0IiwicGFpcnMiLCJTdGFjayIsImFzc2lnbk1lcmdlVmFsdWUiLCJhbGxvY1Vuc2FmZSIsImNsb25lQnVmZmVyIiwiYnVmZmVyIiwiaXNEZWVwIiwiY29weSIsIlVpbnQ4QXJyYXkiLCJjbG9uZUFycmF5QnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJieXRlTGVuZ3RoIiwiY2xvbmVUeXBlZEFycmF5IiwidHlwZWRBcnJheSIsImJ5dGVPZmZzZXQiLCJjb3B5QXJyYXkiLCJvYmplY3RDcmVhdGUiLCJjcmVhdGUiLCJiYXNlQ3JlYXRlIiwiaW5pdENsb25lT2JqZWN0IiwiaXNBcnJheUxpa2VPYmplY3QiLCJzYWZlR2V0IiwidG9QbGFpbk9iamVjdCIsImJhc2VNZXJnZURlZXAiLCJtZXJnZUZ1bmMiLCJzdGFjayIsInN0YWNrZWQiLCJpc0NvbW1vbiIsImlzVHlwZWQiLCJiYXNlTWVyZ2UiLCJtZXJnZSIsInZhbHVlcyIsInNldENhY2hlQWRkIiwic2V0Q2FjaGVIYXMiLCJTZXRDYWNoZSIsImFkZCIsImFycmF5U29tZSIsInByZWRpY2F0ZSIsImNhY2hlSGFzIiwiY2FjaGUiLCJDT01QQVJFX1BBUlRJQUxfRkxBRyIsIkNPTVBBUkVfVU5PUkRFUkVEX0ZMQUciLCJlcXVhbEFycmF5cyIsImJpdG1hc2siLCJlcXVhbEZ1bmMiLCJpc1BhcnRpYWwiLCJhcnJMZW5ndGgiLCJvdGhMZW5ndGgiLCJzZWVuIiwiYXJyVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwib3RoSW5kZXgiLCJtYXBUb0FycmF5Iiwic2V0VG9BcnJheSIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiZXF1YWxCeVRhZyIsImNvbnZlcnQiLCJhcnJheVB1c2giLCJiYXNlR2V0QWxsS2V5cyIsInN5bWJvbHNGdW5jIiwiYXJyYXlGaWx0ZXIiLCJyZXNJbmRleCIsInN0dWJBcnJheSIsIm5hdGl2ZUdldFN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRTeW1ib2xzIiwic3ltYm9sIiwiZ2V0QWxsS2V5cyIsImVxdWFsT2JqZWN0cyIsIm9ialByb3BzIiwib2JqTGVuZ3RoIiwib3RoUHJvcHMiLCJza2lwQ3RvciIsIm9iakN0b3IiLCJvdGhDdG9yIiwiRGF0YVZpZXciLCJQcm9taXNlIiwiU2V0IiwiV2Vha01hcCIsInByb21pc2VUYWciLCJkYXRhVmlld0N0b3JTdHJpbmciLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJnZXRUYWciLCJBcnJheUJ1ZmZlciIsInJlc29sdmUiLCJjdG9yU3RyaW5nIiwiYmFzZUlzRXF1YWxEZWVwIiwib2JqSXNBcnIiLCJvdGhJc0FyciIsIm9ialRhZyIsIm90aFRhZyIsIm9iaklzT2JqIiwib3RoSXNPYmoiLCJpc1NhbWVUYWciLCJvYmpJc1dyYXBwZWQiLCJvdGhJc1dyYXBwZWQiLCJvYmpVbndyYXBwZWQiLCJvdGhVbndyYXBwZWQiLCJiYXNlSXNFcXVhbCIsImJhc2VJc01hdGNoIiwibWF0Y2hEYXRhIiwibm9DdXN0b21pemVyIiwiaXNTdHJpY3RDb21wYXJhYmxlIiwiZ2V0TWF0Y2hEYXRhIiwibWF0Y2hlc1N0cmljdENvbXBhcmFibGUiLCJiYXNlTWF0Y2hlcyIsInJlSXNEZWVwUHJvcCIsInJlSXNQbGFpblByb3AiLCJpc0tleSIsIkZVTkNfRVJST1JfVEVYVCIsIm1lbW9pemUiLCJyZXNvbHZlciIsIlR5cGVFcnJvciIsIm1lbW9pemVkIiwiQ2FjaGUiLCJNQVhfTUVNT0laRV9TSVpFIiwibWVtb2l6ZUNhcHBlZCIsInJlUHJvcE5hbWUiLCJyZUVzY2FwZUNoYXIiLCJzdHJpbmdUb1BhdGgiLCJjaGFyQ29kZUF0IiwibnVtYmVyIiwicXVvdGUiLCJzdWJTdHJpbmciLCJjYXN0UGF0aCIsInRvS2V5IiwiYmFzZUdldCIsInBhdGgiLCJkZWZhdWx0VmFsdWUiLCJiYXNlSGFzSW4iLCJoYXNQYXRoIiwiaGFzRnVuYyIsImhhc0luIiwiYmFzZU1hdGNoZXNQcm9wZXJ0eSIsImJhc2VQcm9wZXJ0eSIsImJhc2VQcm9wZXJ0eURlZXAiLCJwcm9wZXJ0eSIsImJhc2VJdGVyYXRlZSIsImJhc2VNYXAiLCJiYXNlU29ydEJ5IiwiY29tcGFyZXIiLCJzb3J0IiwiY29tcGFyZUFzY2VuZGluZyIsInZhbElzRGVmaW5lZCIsInZhbElzTnVsbCIsInZhbElzUmVmbGV4aXZlIiwidmFsSXNTeW1ib2wiLCJvdGhJc0RlZmluZWQiLCJvdGhJc051bGwiLCJvdGhJc1JlZmxleGl2ZSIsIm90aElzU3ltYm9sIiwiY29tcGFyZU11bHRpcGxlIiwib3JkZXJzIiwib2JqQ3JpdGVyaWEiLCJjcml0ZXJpYSIsIm90aENyaXRlcmlhIiwib3JkZXJzTGVuZ3RoIiwib3JkZXIiLCJiYXNlT3JkZXJCeSIsIml0ZXJhdGVlcyIsIm9yZGVyQnkiLCJub29wIiwiY3JlYXRlU2V0IiwiRmVlZCIsImNvbmZpZyIsIl9zZXR0aW5ncyIsIl9tZXJnZSIsImluaXQiLCJsZXQiLCJmZWVkIiwicnNzVG9Kc29uIiwicnNzVXJsIiwiX2ZvckVhY2giLCJ1cmwiLCJ0aGlzIiwiX3JlcXVlc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJfcHJvY2VzcyIsIkpTT04iLCJwYXJzZSIsInRoaXMkMSIsImNvbXBpbGVkIiwiX3JlbmRlciIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJpbm5lckhUTUwiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImV2ZW50IiwiX3hociIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJvbnRpbWVvdXQiLCJvcGVuIiwic2VuZCIsImxvZyIsImNvbnNvbGUiLCJkaXIiLCJfdmFsdWVzIiwidGVtcGxhdGVzIiwiam9pbiIsIl90ZW1wbGF0ZSIsIm1lZGl1bSIsIm9wZW5lciIsImhlYWRlciIsInBvc3RzIiwiY2xvc2VyIiwicG9zdEV4Y2VycHRMZW5ndGgiLCJpdGVtcyIsInBvc3QiLCJleGNlcnB0IiwiZGF0ZSIsImRlc2NyaXB0aW9uIiwic3Vic3RyIiwibWluIiwibGFzdEluZGV4T2YiLCJwdWJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwicG9zdERhdGVMb2NhbCIsInBvc3REYXRlRm9ybWF0IiwibWVyZ2VkIiwiY29uY2F0IiwiX29yZGVyQnkiLCJ0aXRsZSIsInRpdGxlVXJsIiwicHJvZmlsZUltZyIsImZvbnRTaXplIiwicmF0aW9Qcm9maWxlIiwicG9zdEJvcmRlckNvbG9yIiwicG9zdEltZ0hlaWdodCIsInBvc3RFeGNlcnB0VHJhaWwiLCJwb3N0Q3RhVGV4dCIsInllYXIiLCJtb250aCIsImRheSIsInBvc3REYXRlVGl0bGUiLCJjbGFzc2VzIiwid3JhcHBlciIsImZlZWRJdGVtIiwibGluayIsInRodW1ibmFpbCIsIml0ZW1Gb290ZXIiLCJjdGEiLCJ1bmlxdWUiXSwibWFwcGluZ3MiOiI7OztFQUFBO0VBQ0EsSUFBSUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsSUFBaUIsUUFBakIsSUFBNkJBLE1BQTdCLElBQXVDQSxNQUFNLENBQUNDLE1BQVAsS0FBa0JBLE1BQXpELElBQW1FRCxNQUFwRjs7OztFQ0VBLElBQUlFLFFBQVEsR0FBRyxPQUFPQyxJQUFQLElBQWUsUUFBZixJQUEyQkEsSUFBM0IsSUFBbUNBLElBQUksQ0FBQ0YsTUFBTCxLQUFnQkEsTUFBbkQsSUFBNkRFLElBQTVFOzs7RUFHQSxJQUFJQyxJQUFJLEdBQUdMLFVBQVUsSUFBSUcsUUFBZCxJQUEwQkcsUUFBUSxDQUFDLGFBQUQsQ0FBUixFQUFyQzs7OztFQ0hBLElBQUlDLE1BQU0sR0FBR0YsSUFBSSxDQUFDRSxNQUFsQjs7OztFQ0FBLElBQUlDLFdB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
