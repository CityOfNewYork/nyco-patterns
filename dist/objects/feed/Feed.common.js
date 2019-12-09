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

module.exports = Feed;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZC5jb21tb24uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNGdW5jdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcmVKc0RhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc01hc2tlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvU291cmNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTmF0aXZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VmFsdWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXROYXRpdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25WYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lkZW50aXR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXBwbHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlU2V0VG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zaG9ydE91dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvU3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVJlc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzTGVuZ3RoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5TGlrZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzSW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUFzc2lnbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRpbWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNBcmd1bWVudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJndW1lbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zdHViRmFsc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQnVmZmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VVbmFyeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25vZGVVdGlsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1R5cGVkQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUxpa2VLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNQcm90b3R5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVLZXlzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlS2V5c0luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2Fzc2lnbkluV2l0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRQcm90b3R5cGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzRXJyb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2F0dGVtcHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheU1hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VWYWx1ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jdXN0b21EZWZhdWx0c0Fzc2lnbkluLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXNjYXBlU3RyaW5nQ2hhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlS2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMva2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3JlSW50ZXJwb2xhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUHJvcGVydHlPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VzY2FwZUh0bWxDaGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1N5bWJvbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2VzY2FwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3JlRXNjYXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVFdmFsdWF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdGVtcGxhdGVTZXR0aW5ncy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdGVtcGxhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVCYXNlRm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGb3JPd24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVCYXNlRWFjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VFYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FzdEZ1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9mb3JFYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbGlzdENhY2hlQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NvY0luZGV4T2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVEZWxldGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVHZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19MaXN0Q2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0NsZWFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tEZWxldGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0dldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbmF0aXZlQ3JlYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaENsZWFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaERlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hHZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaFNldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0hhc2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUNsZWFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNLZXlhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0TWFwRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlRGVsZXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVHZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwQ2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja1NldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N0YWNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXNzaWduTWVyZ2VWYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQnVmZmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fVWludDhBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQXJyYXlCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jbG9uZVR5cGVkQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb3B5QXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlQ3JlYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faW5pdENsb25lT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0FycmF5TGlrZU9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NhZmVHZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3RvUGxhaW5PYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2VEZWVwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdmFsdWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0Q2FjaGVBZGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRDYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1NldENhY2hlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlTb21lLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FjaGVIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbEFycmF5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRUb0FycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXF1YWxCeVRhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5UHVzaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRBbGxLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlGaWx0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3N0dWJBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFN5bWJvbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRBbGxLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXF1YWxPYmplY3RzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fRGF0YVZpZXcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19Qcm9taXNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fV2Vha01hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFRhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0VxdWFsRGVlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0VxdWFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTWF0Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1N0cmljdENvbXBhcmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRNYXRjaERhdGEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNYXRjaGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNLZXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lbW9pemUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tZW1vaXplQ2FwcGVkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RyaW5nVG9QYXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FzdFBhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL190b0tleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2dldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VIYXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc1BhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2hhc0luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hdGNoZXNQcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eURlZXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3Byb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUl0ZXJhdGVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTb3J0QnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb21wYXJlQXNjZW5kaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29tcGFyZU11bHRpcGxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU9yZGVyQnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL29yZGVyQnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRmluZEluZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTmFOLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RyaWN0SW5kZXhPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJbmRleE9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlJbmNsdWRlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5SW5jbHVkZXNXaXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9ub29wLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuaXEuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3VuaXFCeS5qcyIsIi4uLy4uLy4uL3NyYy9vYmplY3RzL2ZlZWQvRmVlZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRnVuY3Rpb247XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuZXhwb3J0IGRlZmF1bHQgY29yZUpzRGF0YTtcbiIsImltcG9ydCBjb3JlSnNEYXRhIGZyb20gJy4vX2NvcmVKc0RhdGEuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc01hc2tlZDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Tb3VyY2U7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTWFza2VkIGZyb20gJy4vX2lzTWFza2VkLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hdGl2ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRWYWx1ZTtcbiIsImltcG9ydCBiYXNlSXNOYXRpdmUgZnJvbSAnLi9fYmFzZUlzTmF0aXZlLmpzJztcbmltcG9ydCBnZXRWYWx1ZSBmcm9tICcuL19nZXRWYWx1ZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE5hdGl2ZTtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcblxudmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmdW5jID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jyk7XG4gICAgZnVuYyh7fSwgJycsIHt9KTtcbiAgICByZXR1cm4gZnVuYztcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVByb3BlcnR5O1xuIiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYXNzaWduVmFsdWVgIGFuZCBgYXNzaWduTWVyZ2VWYWx1ZWAgd2l0aG91dFxuICogdmFsdWUgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSA9PSAnX19wcm90b19fJyAmJiBkZWZpbmVQcm9wZXJ0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICdlbnVtZXJhYmxlJzogdHJ1ZSxcbiAgICAgICd2YWx1ZSc6IHZhbHVlLFxuICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUFzc2lnblZhbHVlO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25WYWx1ZTtcbiIsImltcG9ydCBhc3NpZ25WYWx1ZSBmcm9tICcuL19hc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIHZhciBpc05ldyA9ICFvYmplY3Q7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3B5T2JqZWN0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpdHk7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcGx5O1xuIiwiaW1wb3J0IGFwcGx5IGZyb20gJy4vX2FwcGx5LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIHRyYW5zZm9ybXMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIHJlc3QgYXJyYXkgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCB0cmFuc2Zvcm0pIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gdHJhbnNmb3JtKGFycmF5KTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlclJlc3Q7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0cyk7XG4gKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzWzBdID09PSBvYmplY3RzWzFdKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uc3RhbnQ7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSAnLi9jb25zdGFudC5qcyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLi9fZGVmaW5lUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDgwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaG9ydE91dDtcbiIsImltcG9ydCBiYXNlU2V0VG9TdHJpbmcgZnJvbSAnLi9fYmFzZVNldFRvU3RyaW5nLmpzJztcbmltcG9ydCBzaG9ydE91dCBmcm9tICcuL19zaG9ydE91dC5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgYHRvU3RyaW5nYCBtZXRob2Qgb2YgYGZ1bmNgIHRvIHJldHVybiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBzZXRUb1N0cmluZyA9IHNob3J0T3V0KGJhc2VTZXRUb1N0cmluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IHNldFRvU3RyaW5nO1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuaW1wb3J0IG92ZXJSZXN0IGZyb20gJy4vX292ZXJSZXN0LmpzJztcbmltcG9ydCBzZXRUb1N0cmluZyBmcm9tICcuL19zZXRUb1N0cmluZy5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCBzdGFydCwgaWRlbnRpdHkpLCBmdW5jICsgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUmVzdDtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNMZW5ndGg7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheUxpa2U7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzSW5kZXg7XG4iLCJpbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0l0ZXJhdGVlQ2FsbDtcbiIsImltcG9ydCBiYXNlUmVzdCBmcm9tICcuL19iYXNlUmVzdC5qcyc7XG5pbXBvcnQgaXNJdGVyYXRlZUNhbGwgZnJvbSAnLi9faXNJdGVyYXRlZUNhbGwuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUaW1lcztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNBcmd1bWVudHM7XG4iLCJpbXBvcnQgYmFzZUlzQXJndW1lbnRzIGZyb20gJy4vX2Jhc2VJc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXk7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWJGYWxzZTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuaW1wb3J0IHN0dWJGYWxzZSBmcm9tICcuL3N0dWJGYWxzZS5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgaXNCdWZmZXI7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmFyeTtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIC8vIFVzZSBgdXRpbC50eXBlc2AgZm9yIE5vZGUuanMgMTArLlxuICAgIHZhciB0eXBlcyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlICYmIGZyZWVNb2R1bGUucmVxdWlyZSgndXRpbCcpLnR5cGVzO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXM7XG4gICAgfVxuXG4gICAgLy8gTGVnYWN5IGBwcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKWAgZm9yIE5vZGUuanMgPCAxMC5cbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBub2RlVXRpbDtcbiIsImltcG9ydCBiYXNlSXNUeXBlZEFycmF5IGZyb20gJy4vX2Jhc2VJc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IG5vZGVVdGlsIGZyb20gJy4vX25vZGVVdGlsLmpzJztcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzVHlwZWRBcnJheTtcbiIsImltcG9ydCBiYXNlVGltZXMgZnJvbSAnLi9fYmFzZVRpbWVzLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5TGlrZUtleXM7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUtleXNJbjtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5c0luIGZyb20gJy4vX25hdGl2ZUtleXNJbi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VLZXlzSW47XG4iLCJpbXBvcnQgYXJyYXlMaWtlS2V5cyBmcm9tICcuL19hcnJheUxpa2VLZXlzLmpzJztcbmltcG9ydCBiYXNlS2V5c0luIGZyb20gJy4vX2Jhc2VLZXlzSW4uanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQga2V5c0luO1xuIiwiaW1wb3J0IGNvcHlPYmplY3QgZnJvbSAnLi9fY29weU9iamVjdC5qcyc7XG5pbXBvcnQgY3JlYXRlQXNzaWduZXIgZnJvbSAnLi9fY3JlYXRlQXNzaWduZXIuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25JbmAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY3VzdG9taXplcmBcbiAqIHdoaWNoIGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJuc1xuICogYHVuZGVmaW5lZGAsIGFzc2lnbm1lbnQgaXMgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmBcbiAqIGlzIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50czogKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGFsaWFzIGV4dGVuZFdpdGhcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VzIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSkge1xuICogICByZXR1cm4gXy5pc1VuZGVmaW5lZChvYmpWYWx1ZSkgPyBzcmNWYWx1ZSA6IG9ialZhbHVlO1xuICogfVxuICpcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduSW5XaXRoLCBjdXN0b21pemVyKTtcbiAqXG4gKiBkZWZhdWx0cyh7ICdhJzogMSB9LCB7ICdiJzogMiB9LCB7ICdhJzogMyB9KTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICovXG52YXIgYXNzaWduSW5XaXRoID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyKSB7XG4gIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzSW4oc291cmNlKSwgb2JqZWN0LCBjdXN0b21pemVyKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25JbldpdGg7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlckFyZztcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJvdG90eXBlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJy4vaXNQbGFpbk9iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBkb21FeGNUYWcgPSAnW29iamVjdCBET01FeGNlcHRpb25dJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gYEVycm9yYCwgYEV2YWxFcnJvcmAsIGBSYW5nZUVycm9yYCwgYFJlZmVyZW5jZUVycm9yYCxcbiAqIGBTeW50YXhFcnJvcmAsIGBUeXBlRXJyb3JgLCBvciBgVVJJRXJyb3JgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBlcnJvciBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Vycm9yKG5ldyBFcnJvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Vycm9yKEVycm9yKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXJyb3IodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBlcnJvclRhZyB8fCB0YWcgPT0gZG9tRXhjVGFnIHx8XG4gICAgKHR5cGVvZiB2YWx1ZS5tZXNzYWdlID09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZS5uYW1lID09ICdzdHJpbmcnICYmICFpc1BsYWluT2JqZWN0KHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRXJyb3I7XG4iLCJpbXBvcnQgYXBwbHkgZnJvbSAnLi9fYXBwbHkuanMnO1xuaW1wb3J0IGJhc2VSZXN0IGZyb20gJy4vX2Jhc2VSZXN0LmpzJztcbmltcG9ydCBpc0Vycm9yIGZyb20gJy4vaXNFcnJvci5qcyc7XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gaW52b2tlIGBmdW5jYCwgcmV0dXJuaW5nIGVpdGhlciB0aGUgcmVzdWx0IG9yIHRoZSBjYXVnaHQgZXJyb3JcbiAqIG9iamVjdC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGFyZSBwcm92aWRlZCB0byBgZnVuY2Agd2hlbiBpdCdzIGludm9rZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGF0dGVtcHQuXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBgZnVuY2AgcmVzdWx0IG9yIGVycm9yIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgdGhyb3dpbmcgZXJyb3JzIGZvciBpbnZhbGlkIHNlbGVjdG9ycy5cbiAqIHZhciBlbGVtZW50cyA9IF8uYXR0ZW1wdChmdW5jdGlvbihzZWxlY3Rvcikge1xuICogICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gKiB9LCAnPl8+Jyk7XG4gKlxuICogaWYgKF8uaXNFcnJvcihlbGVtZW50cykpIHtcbiAqICAgZWxlbWVudHMgPSBbXTtcbiAqIH1cbiAqL1xudmFyIGF0dGVtcHQgPSBiYXNlUmVzdChmdW5jdGlvbihmdW5jLCBhcmdzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHVuZGVmaW5lZCwgYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gaXNFcnJvcihlKSA/IGUgOiBuZXcgRXJyb3IoZSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhdHRlbXB0O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlNYXA7XG4iLCJpbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIG9mIGBwcm9wc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHJldHVybiBhcnJheU1hcChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVZhbHVlcztcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmRlZmF1bHRzYCB0byBjdXN0b21pemUgaXRzIGBfLmFzc2lnbkluYCB1c2UgdG8gYXNzaWduIHByb3BlcnRpZXNcbiAqIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzXG4gKiB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gb2JqVmFsdWUgVGhlIGRlc3RpbmF0aW9uIHZhbHVlLlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgc291cmNlIHZhbHVlLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBwYXJlbnQgb2JqZWN0IG9mIGBvYmpWYWx1ZWAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgaWYgKG9ialZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICAgIChlcShvYmpWYWx1ZSwgb2JqZWN0UHJvdG9ba2V5XSkgJiYgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkge1xuICAgIHJldHVybiBzcmNWYWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqVmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbURlZmF1bHRzQXNzaWduSW47XG4iLCIvKiogVXNlZCB0byBlc2NhcGUgY2hhcmFjdGVycyBmb3IgaW5jbHVzaW9uIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscy4gKi9cbnZhciBzdHJpbmdFc2NhcGVzID0ge1xuICAnXFxcXCc6ICdcXFxcJyxcbiAgXCInXCI6IFwiJ1wiLFxuICAnXFxuJzogJ24nLFxuICAnXFxyJzogJ3InLFxuICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICdcXHUyMDI5JzogJ3UyMDI5J1xufTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLnRlbXBsYXRlYCB0byBlc2NhcGUgY2hhcmFjdGVycyBmb3IgaW5jbHVzaW9uIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNociBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZ0NoYXIoY2hyKSB7XG4gIHJldHVybiAnXFxcXCcgKyBzdHJpbmdFc2NhcGVzW2Nocl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVzY2FwZVN0cmluZ0NoYXI7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzO1xuIiwiaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcbmltcG9ydCBuYXRpdmVLZXlzIGZyb20gJy4vX25hdGl2ZUtleXMuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VLZXlzO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXMgZnJvbSAnLi9fYmFzZUtleXMuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQga2V5cztcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVJbnRlcnBvbGF0ZSA9IC88JT0oW1xcc1xcU10rPyklPi9nO1xuXG5leHBvcnQgZGVmYXVsdCByZUludGVycG9sYXRlO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHlPZjtcbiIsImltcG9ydCBiYXNlUHJvcGVydHlPZiBmcm9tICcuL19iYXNlUHJvcGVydHlPZi5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5Oydcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xudmFyIGVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbEVzY2FwZXMpO1xuXG5leHBvcnQgZGVmYXVsdCBlc2NhcGVIdG1sQ2hhcjtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRvU3RyaW5nO1xuIiwiaW1wb3J0IGJhc2VUb1N0cmluZyBmcm9tICcuL19iYXNlVG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvU3RyaW5nO1xuIiwiaW1wb3J0IGVzY2FwZUh0bWxDaGFyIGZyb20gJy4vX2VzY2FwZUh0bWxDaGFyLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyBhbmQgSFRNTCBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInXS9nLFxuICAgIHJlSGFzVW5lc2NhcGVkSHRtbCA9IFJlZ0V4cChyZVVuZXNjYXBlZEh0bWwuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgY2hhcmFjdGVycyBcIiZcIiwgXCI8XCIsIFwiPlwiLCAnXCInLCBhbmQgXCInXCIgaW4gYHN0cmluZ2AgdG8gdGhlaXJcbiAqIGNvcnJlc3BvbmRpbmcgSFRNTCBlbnRpdGllcy5cbiAqXG4gKiAqKk5vdGU6KiogTm8gb3RoZXIgY2hhcmFjdGVycyBhcmUgZXNjYXBlZC4gVG8gZXNjYXBlIGFkZGl0aW9uYWxcbiAqIGNoYXJhY3RlcnMgdXNlIGEgdGhpcmQtcGFydHkgbGlicmFyeSBsaWtlIFtfaGVfXShodHRwczovL210aHMuYmUvaGUpLlxuICpcbiAqIFRob3VnaCB0aGUgXCI+XCIgY2hhcmFjdGVyIGlzIGVzY2FwZWQgZm9yIHN5bW1ldHJ5LCBjaGFyYWN0ZXJzIGxpa2VcbiAqIFwiPlwiIGFuZCBcIi9cIiBkb24ndCBuZWVkIGVzY2FwaW5nIGluIEhUTUwgYW5kIGhhdmUgbm8gc3BlY2lhbCBtZWFuaW5nXG4gKiB1bmxlc3MgdGhleSdyZSBwYXJ0IG9mIGEgdGFnIG9yIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZS4gU2VlXG4gKiBbTWF0aGlhcyBCeW5lbnMncyBhcnRpY2xlXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvYW1iaWd1b3VzLWFtcGVyc2FuZHMpXG4gKiAodW5kZXIgXCJzZW1pLXJlbGF0ZWQgZnVuIGZhY3RcIikgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBXaGVuIHdvcmtpbmcgd2l0aCBIVE1MIHlvdSBzaG91bGQgYWx3YXlzXG4gKiBbcXVvdGUgYXR0cmlidXRlIHZhbHVlc10oaHR0cDovL3dvbmtvLmNvbS9wb3N0L2h0bWwtZXNjYXBpbmcpIHRvIHJlZHVjZVxuICogWFNTIHZlY3RvcnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJ2ZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1VuZXNjYXBlZEh0bWwudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVVbmVzY2FwZWRIdG1sLCBlc2NhcGVIdG1sQ2hhcilcbiAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXNjYXBlO1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbnZhciByZUVzY2FwZSA9IC88JS0oW1xcc1xcU10rPyklPi9nO1xuXG5leHBvcnQgZGVmYXVsdCByZUVzY2FwZTtcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVFdmFsdWF0ZSA9IC88JShbXFxzXFxTXSs/KSU+L2c7XG5cbmV4cG9ydCBkZWZhdWx0IHJlRXZhbHVhdGU7XG4iLCJpbXBvcnQgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcbmltcG9ydCByZUVzY2FwZSBmcm9tICcuL19yZUVzY2FwZS5qcyc7XG5pbXBvcnQgcmVFdmFsdWF0ZSBmcm9tICcuL19yZUV2YWx1YXRlLmpzJztcbmltcG9ydCByZUludGVycG9sYXRlIGZyb20gJy4vX3JlSW50ZXJwb2xhdGUuanMnO1xuXG4vKipcbiAqIEJ5IGRlZmF1bHQsIHRoZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzIHVzZWQgYnkgbG9kYXNoIGFyZSBsaWtlIHRob3NlIGluXG4gKiBlbWJlZGRlZCBSdWJ5IChFUkIpIGFzIHdlbGwgYXMgRVMyMDE1IHRlbXBsYXRlIHN0cmluZ3MuIENoYW5nZSB0aGVcbiAqIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIHRlbXBsYXRlU2V0dGluZ3MgPSB7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZWN0IGBkYXRhYCBwcm9wZXJ0eSB2YWx1ZXMgdG8gYmUgSFRNTC1lc2NhcGVkLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtSZWdFeHB9XG4gICAqL1xuICAnZXNjYXBlJzogcmVFc2NhcGUsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZWN0IGNvZGUgdG8gYmUgZXZhbHVhdGVkLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtSZWdFeHB9XG4gICAqL1xuICAnZXZhbHVhdGUnOiByZUV2YWx1YXRlLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBgZGF0YWAgcHJvcGVydHkgdmFsdWVzIHRvIGluamVjdC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgJ2ludGVycG9sYXRlJzogcmVJbnRlcnBvbGF0ZSxcblxuICAvKipcbiAgICogVXNlZCB0byByZWZlcmVuY2UgdGhlIGRhdGEgb2JqZWN0IGluIHRoZSB0ZW1wbGF0ZSB0ZXh0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICAndmFyaWFibGUnOiAnJyxcblxuICAvKipcbiAgICogVXNlZCB0byBpbXBvcnQgdmFyaWFibGVzIGludG8gdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICAnaW1wb3J0cyc6IHtcblxuICAgIC8qKlxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBgbG9kYXNoYCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0c1xuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICAnXyc6IHsgJ2VzY2FwZSc6IGVzY2FwZSB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlU2V0dGluZ3M7XG4iLCJpbXBvcnQgYXNzaWduSW5XaXRoIGZyb20gJy4vYXNzaWduSW5XaXRoLmpzJztcbmltcG9ydCBhdHRlbXB0IGZyb20gJy4vYXR0ZW1wdC5qcyc7XG5pbXBvcnQgYmFzZVZhbHVlcyBmcm9tICcuL19iYXNlVmFsdWVzLmpzJztcbmltcG9ydCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluIGZyb20gJy4vX2N1c3RvbURlZmF1bHRzQXNzaWduSW4uanMnO1xuaW1wb3J0IGVzY2FwZVN0cmluZ0NoYXIgZnJvbSAnLi9fZXNjYXBlU3RyaW5nQ2hhci5qcyc7XG5pbXBvcnQgaXNFcnJvciBmcm9tICcuL2lzRXJyb3IuanMnO1xuaW1wb3J0IGlzSXRlcmF0ZWVDYWxsIGZyb20gJy4vX2lzSXRlcmF0ZWVDYWxsLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5pbXBvcnQgcmVJbnRlcnBvbGF0ZSBmcm9tICcuL19yZUludGVycG9sYXRlLmpzJztcbmltcG9ydCB0ZW1wbGF0ZVNldHRpbmdzIGZyb20gJy4vdGVtcGxhdGVTZXR0aW5ncy5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGVtcHR5IHN0cmluZyBsaXRlcmFscyBpbiBjb21waWxlZCB0ZW1wbGF0ZSBzb3VyY2UuICovXG52YXIgcmVFbXB0eVN0cmluZ0xlYWRpbmcgPSAvXFxiX19wIFxcKz0gJyc7L2csXG4gICAgcmVFbXB0eVN0cmluZ01pZGRsZSA9IC9cXGIoX19wIFxcKz0pICcnIFxcKy9nLFxuICAgIHJlRW1wdHlTdHJpbmdUcmFpbGluZyA9IC8oX19lXFwoLio/XFwpfFxcYl9fdFxcKSkgXFwrXFxuJyc7L2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaFxuICogW0VTIHRlbXBsYXRlIGRlbGltaXRlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRlbXBsYXRlLWxpdGVyYWwtbGV4aWNhbC1jb21wb25lbnRzKS5cbiAqL1xudmFyIHJlRXNUZW1wbGF0ZSA9IC9cXCRcXHsoW15cXFxcfV0qKD86XFxcXC5bXlxcXFx9XSopKilcXH0vZztcblxuLyoqIFVzZWQgdG8gZW5zdXJlIGNhcHR1cmluZyBvcmRlciBvZiB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlTm9NYXRjaCA9IC8oJF4pLztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggdW5lc2NhcGVkIGNoYXJhY3RlcnMgaW4gY29tcGlsZWQgc3RyaW5nIGxpdGVyYWxzLiAqL1xudmFyIHJlVW5lc2NhcGVkU3RyaW5nID0gL1snXFxuXFxyXFx1MjAyOFxcdTIwMjlcXFxcXS9nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjb21waWxlZCB0ZW1wbGF0ZSBmdW5jdGlvbiB0aGF0IGNhbiBpbnRlcnBvbGF0ZSBkYXRhIHByb3BlcnRpZXNcbiAqIGluIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXJzLCBIVE1MLWVzY2FwZSBpbnRlcnBvbGF0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluXG4gKiBcImVzY2FwZVwiIGRlbGltaXRlcnMsIGFuZCBleGVjdXRlIEphdmFTY3JpcHQgaW4gXCJldmFsdWF0ZVwiIGRlbGltaXRlcnMuIERhdGFcbiAqIHByb3BlcnRpZXMgbWF5IGJlIGFjY2Vzc2VkIGFzIGZyZWUgdmFyaWFibGVzIGluIHRoZSB0ZW1wbGF0ZS4gSWYgYSBzZXR0aW5nXG4gKiBvYmplY3QgaXMgZ2l2ZW4sIGl0IHRha2VzIHByZWNlZGVuY2Ugb3ZlciBgXy50ZW1wbGF0ZVNldHRpbmdzYCB2YWx1ZXMuXG4gKlxuICogKipOb3RlOioqIEluIHRoZSBkZXZlbG9wbWVudCBidWlsZCBgXy50ZW1wbGF0ZWAgdXRpbGl6ZXNcbiAqIFtzb3VyY2VVUkxzXShodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9kZXZlbG9wZXJ0b29scy9zb3VyY2VtYXBzLyN0b2Mtc291cmNldXJsKVxuICogZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gKlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gcHJlY29tcGlsaW5nIHRlbXBsYXRlcyBzZWVcbiAqIFtsb2Rhc2gncyBjdXN0b20gYnVpbGRzIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vbG9kYXNoLmNvbS9jdXN0b20tYnVpbGRzKS5cbiAqXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBDaHJvbWUgZXh0ZW5zaW9uIHNhbmRib3hlcyBzZWVcbiAqIFtDaHJvbWUncyBleHRlbnNpb25zIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZXh0ZW5zaW9ucy9zYW5kYm94aW5nRXZhbCkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7UmVnRXhwfSBbb3B0aW9ucy5lc2NhcGU9Xy50ZW1wbGF0ZVNldHRpbmdzLmVzY2FwZV1cbiAqICBUaGUgSFRNTCBcImVzY2FwZVwiIGRlbGltaXRlci5cbiAqIEBwYXJhbSB7UmVnRXhwfSBbb3B0aW9ucy5ldmFsdWF0ZT1fLnRlbXBsYXRlU2V0dGluZ3MuZXZhbHVhdGVdXG4gKiAgVGhlIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuaW1wb3J0cz1fLnRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0c11cbiAqICBBbiBvYmplY3QgdG8gaW1wb3J0IGludG8gdGhlIHRlbXBsYXRlIGFzIGZyZWUgdmFyaWFibGVzLlxuICogQHBhcmFtIHtSZWdFeHB9IFtvcHRpb25zLmludGVycG9sYXRlPV8udGVtcGxhdGVTZXR0aW5ncy5pbnRlcnBvbGF0ZV1cbiAqICBUaGUgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zb3VyY2VVUkw9J3RlbXBsYXRlU291cmNlc1tuXSddXG4gKiAgVGhlIHNvdXJjZVVSTCBvZiB0aGUgY29tcGlsZWQgdGVtcGxhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudmFyaWFibGU9J29iaiddXG4gKiAgVGhlIGRhdGEgb2JqZWN0IHZhcmlhYmxlIG5hbWUuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjb21waWxlZCB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gVXNlIHRoZSBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyIHRvIGNyZWF0ZSBhIGNvbXBpbGVkIHRlbXBsYXRlLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8gPCU9IHVzZXIgJT4hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQhJ1xuICpcbiAqIC8vIFVzZSB0aGUgSFRNTCBcImVzY2FwZVwiIGRlbGltaXRlciB0byBlc2NhcGUgZGF0YSBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8Yj48JS0gdmFsdWUgJT48L2I+Jyk7XG4gKiBjb21waWxlZCh7ICd2YWx1ZSc6ICc8c2NyaXB0PicgfSk7XG4gKiAvLyA9PiAnPGI+Jmx0O3NjcmlwdCZndDs8L2I+J1xuICpcbiAqIC8vIFVzZSB0aGUgXCJldmFsdWF0ZVwiIGRlbGltaXRlciB0byBleGVjdXRlIEphdmFTY3JpcHQgYW5kIGdlbmVyYXRlIEhUTUwuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8JSBfLmZvckVhY2godXNlcnMsIGZ1bmN0aW9uKHVzZXIpIHsgJT48bGk+PCUtIHVzZXIgJT48L2xpPjwlIH0pOyAlPicpO1xuICogY29tcGlsZWQoeyAndXNlcnMnOiBbJ2ZyZWQnLCAnYmFybmV5J10gfSk7XG4gKiAvLyA9PiAnPGxpPmZyZWQ8L2xpPjxsaT5iYXJuZXk8L2xpPidcbiAqXG4gKiAvLyBVc2UgdGhlIGludGVybmFsIGBwcmludGAgZnVuY3Rpb24gaW4gXCJldmFsdWF0ZVwiIGRlbGltaXRlcnMuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8JSBwcmludChcImhlbGxvIFwiICsgdXNlcik7ICU+IScpO1xuICogY29tcGlsZWQoeyAndXNlcic6ICdiYXJuZXknIH0pO1xuICogLy8gPT4gJ2hlbGxvIGJhcm5leSEnXG4gKlxuICogLy8gVXNlIHRoZSBFUyB0ZW1wbGF0ZSBsaXRlcmFsIGRlbGltaXRlciBhcyBhbiBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyLlxuICogLy8gRGlzYWJsZSBzdXBwb3J0IGJ5IHJlcGxhY2luZyB0aGUgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlci5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvICR7IHVzZXIgfSEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAncGViYmxlcycgfSk7XG4gKiAvLyA9PiAnaGVsbG8gcGViYmxlcyEnXG4gKlxuICogLy8gVXNlIGJhY2tzbGFzaGVzIHRvIHRyZWF0IGRlbGltaXRlcnMgYXMgcGxhaW4gdGV4dC5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJzwlPSBcIlxcXFw8JS0gdmFsdWUgJVxcXFw+XCIgJT4nKTtcbiAqIGNvbXBpbGVkKHsgJ3ZhbHVlJzogJ2lnbm9yZWQnIH0pO1xuICogLy8gPT4gJzwlLSB2YWx1ZSAlPidcbiAqXG4gKiAvLyBVc2UgdGhlIGBpbXBvcnRzYCBvcHRpb24gdG8gaW1wb3J0IGBqUXVlcnlgIGFzIGBqcWAuXG4gKiB2YXIgdGV4dCA9ICc8JSBqcS5lYWNoKHVzZXJzLCBmdW5jdGlvbih1c2VyKSB7ICU+PGxpPjwlLSB1c2VyICU+PC9saT48JSB9KTsgJT4nO1xuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSh0ZXh0LCB7ICdpbXBvcnRzJzogeyAnanEnOiBqUXVlcnkgfSB9KTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXJzJzogWydmcmVkJywgJ2Jhcm5leSddIH0pO1xuICogLy8gPT4gJzxsaT5mcmVkPC9saT48bGk+YmFybmV5PC9saT4nXG4gKlxuICogLy8gVXNlIHRoZSBgc291cmNlVVJMYCBvcHRpb24gdG8gc3BlY2lmeSBhIGN1c3RvbSBzb3VyY2VVUkwgZm9yIHRoZSB0ZW1wbGF0ZS5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvIDwlPSB1c2VyICU+IScsIHsgJ3NvdXJjZVVSTCc6ICcvYmFzaWMvZ3JlZXRpbmcuanN0JyB9KTtcbiAqIGNvbXBpbGVkKGRhdGEpO1xuICogLy8gPT4gRmluZCB0aGUgc291cmNlIG9mIFwiZ3JlZXRpbmcuanN0XCIgdW5kZXIgdGhlIFNvdXJjZXMgdGFiIG9yIFJlc291cmNlcyBwYW5lbCBvZiB0aGUgd2ViIGluc3BlY3Rvci5cbiAqXG4gKiAvLyBVc2UgdGhlIGB2YXJpYWJsZWAgb3B0aW9uIHRvIGVuc3VyZSBhIHdpdGgtc3RhdGVtZW50IGlzbid0IHVzZWQgaW4gdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGkgPCU9IGRhdGEudXNlciAlPiEnLCB7ICd2YXJpYWJsZSc6ICdkYXRhJyB9KTtcbiAqIGNvbXBpbGVkLnNvdXJjZTtcbiAqIC8vID0+IGZ1bmN0aW9uKGRhdGEpIHtcbiAqIC8vICAgdmFyIF9fdCwgX19wID0gJyc7XG4gKiAvLyAgIF9fcCArPSAnaGkgJyArICgoX190ID0gKCBkYXRhLnVzZXIgKSkgPT0gbnVsbCA/ICcnIDogX190KSArICchJztcbiAqIC8vICAgcmV0dXJuIF9fcDtcbiAqIC8vIH1cbiAqXG4gKiAvLyBVc2UgY3VzdG9tIHRlbXBsYXRlIGRlbGltaXRlcnMuXG4gKiBfLnRlbXBsYXRlU2V0dGluZ3MuaW50ZXJwb2xhdGUgPSAve3soW1xcc1xcU10rPyl9fS9nO1xuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8ge3sgdXNlciB9fSEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAnbXVzdGFjaGUnIH0pO1xuICogLy8gPT4gJ2hlbGxvIG11c3RhY2hlISdcbiAqXG4gKiAvLyBVc2UgdGhlIGBzb3VyY2VgIHByb3BlcnR5IHRvIGlubGluZSBjb21waWxlZCB0ZW1wbGF0ZXMgZm9yIG1lYW5pbmdmdWxcbiAqIC8vIGxpbmUgbnVtYmVycyBpbiBlcnJvciBtZXNzYWdlcyBhbmQgc3RhY2sgdHJhY2VzLlxuICogZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2pzdC5qcycpLCAnXFxcbiAqICAgdmFyIEpTVCA9IHtcXFxuICogICAgIFwibWFpblwiOiAnICsgXy50ZW1wbGF0ZShtYWluVGV4dCkuc291cmNlICsgJ1xcXG4gKiAgIH07XFxcbiAqICcpO1xuICovXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHJpbmcsIG9wdGlvbnMsIGd1YXJkKSB7XG4gIC8vIEJhc2VkIG9uIEpvaG4gUmVzaWcncyBgdG1wbGAgaW1wbGVtZW50YXRpb25cbiAgLy8gKGh0dHA6Ly9lam9obi5vcmcvYmxvZy9qYXZhc2NyaXB0LW1pY3JvLXRlbXBsYXRpbmcvKVxuICAvLyBhbmQgTGF1cmEgRG9rdG9yb3ZhJ3MgZG9ULmpzIChodHRwczovL2dpdGh1Yi5jb20vb2xhZG8vZG9UKS5cbiAgdmFyIHNldHRpbmdzID0gdGVtcGxhdGVTZXR0aW5ncy5pbXBvcnRzLl8udGVtcGxhdGVTZXR0aW5ncyB8fCB0ZW1wbGF0ZVNldHRpbmdzO1xuXG4gIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzdHJpbmcsIG9wdGlvbnMsIGd1YXJkKSkge1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgb3B0aW9ucyA9IGFzc2lnbkluV2l0aCh7fSwgb3B0aW9ucywgc2V0dGluZ3MsIGN1c3RvbURlZmF1bHRzQXNzaWduSW4pO1xuXG4gIHZhciBpbXBvcnRzID0gYXNzaWduSW5XaXRoKHt9LCBvcHRpb25zLmltcG9ydHMsIHNldHRpbmdzLmltcG9ydHMsIGN1c3RvbURlZmF1bHRzQXNzaWduSW4pLFxuICAgICAgaW1wb3J0c0tleXMgPSBrZXlzKGltcG9ydHMpLFxuICAgICAgaW1wb3J0c1ZhbHVlcyA9IGJhc2VWYWx1ZXMoaW1wb3J0cywgaW1wb3J0c0tleXMpO1xuXG4gIHZhciBpc0VzY2FwaW5nLFxuICAgICAgaXNFdmFsdWF0aW5nLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgaW50ZXJwb2xhdGUgPSBvcHRpb25zLmludGVycG9sYXRlIHx8IHJlTm9NYXRjaCxcbiAgICAgIHNvdXJjZSA9IFwiX19wICs9ICdcIjtcblxuICAvLyBDb21waWxlIHRoZSByZWdleHAgdG8gbWF0Y2ggZWFjaCBkZWxpbWl0ZXIuXG4gIHZhciByZURlbGltaXRlcnMgPSBSZWdFeHAoXG4gICAgKG9wdGlvbnMuZXNjYXBlIHx8IHJlTm9NYXRjaCkuc291cmNlICsgJ3wnICtcbiAgICBpbnRlcnBvbGF0ZS5zb3VyY2UgKyAnfCcgK1xuICAgIChpbnRlcnBvbGF0ZSA9PT0gcmVJbnRlcnBvbGF0ZSA/IHJlRXNUZW1wbGF0ZSA6IHJlTm9NYXRjaCkuc291cmNlICsgJ3wnICtcbiAgICAob3B0aW9ucy5ldmFsdWF0ZSB8fCByZU5vTWF0Y2gpLnNvdXJjZSArICd8JCdcbiAgLCAnZycpO1xuXG4gIC8vIFVzZSBhIHNvdXJjZVVSTCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgLy8gVGhlIHNvdXJjZVVSTCBnZXRzIGluamVjdGVkIGludG8gdGhlIHNvdXJjZSB0aGF0J3MgZXZhbC1lZCwgc28gYmUgY2FyZWZ1bFxuICAvLyB3aXRoIGxvb2t1cCAoaW4gY2FzZSBvZiBlLmcuIHByb3RvdHlwZSBwb2xsdXRpb24pLCBhbmQgc3RyaXAgbmV3bGluZXMgaWYgYW55LlxuICAvLyBBIG5ld2xpbmUgd291bGRuJ3QgYmUgYSB2YWxpZCBzb3VyY2VVUkwgYW55d2F5LCBhbmQgaXQnZCBlbmFibGUgY29kZSBpbmplY3Rpb24uXG4gIHZhciBzb3VyY2VVUkwgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdzb3VyY2VVUkwnKVxuICAgID8gKCcvLyMgc291cmNlVVJMPScgK1xuICAgICAgIChvcHRpb25zLnNvdXJjZVVSTCArICcnKS5yZXBsYWNlKC9bXFxyXFxuXS9nLCAnICcpICtcbiAgICAgICAnXFxuJylcbiAgICA6ICcnO1xuXG4gIHN0cmluZy5yZXBsYWNlKHJlRGVsaW1pdGVycywgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZVZhbHVlLCBpbnRlcnBvbGF0ZVZhbHVlLCBlc1RlbXBsYXRlVmFsdWUsIGV2YWx1YXRlVmFsdWUsIG9mZnNldCkge1xuICAgIGludGVycG9sYXRlVmFsdWUgfHwgKGludGVycG9sYXRlVmFsdWUgPSBlc1RlbXBsYXRlVmFsdWUpO1xuXG4gICAgLy8gRXNjYXBlIGNoYXJhY3RlcnMgdGhhdCBjYW4ndCBiZSBpbmNsdWRlZCBpbiBzdHJpbmcgbGl0ZXJhbHMuXG4gICAgc291cmNlICs9IHN0cmluZy5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKHJlVW5lc2NhcGVkU3RyaW5nLCBlc2NhcGVTdHJpbmdDaGFyKTtcblxuICAgIC8vIFJlcGxhY2UgZGVsaW1pdGVycyB3aXRoIHNuaXBwZXRzLlxuICAgIGlmIChlc2NhcGVWYWx1ZSkge1xuICAgICAgaXNFc2NhcGluZyA9IHRydWU7XG4gICAgICBzb3VyY2UgKz0gXCInICtcXG5fX2UoXCIgKyBlc2NhcGVWYWx1ZSArIFwiKSArXFxuJ1wiO1xuICAgIH1cbiAgICBpZiAoZXZhbHVhdGVWYWx1ZSkge1xuICAgICAgaXNFdmFsdWF0aW5nID0gdHJ1ZTtcbiAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZVZhbHVlICsgXCI7XFxuX19wICs9ICdcIjtcbiAgICB9XG4gICAgaWYgKGludGVycG9sYXRlVmFsdWUpIHtcbiAgICAgIHNvdXJjZSArPSBcIicgK1xcbigoX190ID0gKFwiICsgaW50ZXJwb2xhdGVWYWx1ZSArIFwiKSkgPT0gbnVsbCA/ICcnIDogX190KSArXFxuJ1wiO1xuICAgIH1cbiAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgIC8vIFRoZSBKUyBlbmdpbmUgZW1iZWRkZWQgaW4gQWRvYmUgcHJvZHVjdHMgbmVlZHMgYG1hdGNoYCByZXR1cm5lZCBpblxuICAgIC8vIG9yZGVyIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3QgYG9mZnNldGAgdmFsdWUuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcblxuICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gIC8vIElmIGB2YXJpYWJsZWAgaXMgbm90IHNwZWNpZmllZCB3cmFwIGEgd2l0aC1zdGF0ZW1lbnQgYXJvdW5kIHRoZSBnZW5lcmF0ZWRcbiAgLy8gY29kZSB0byBhZGQgdGhlIGRhdGEgb2JqZWN0IHRvIHRoZSB0b3Agb2YgdGhlIHNjb3BlIGNoYWluLlxuICAvLyBMaWtlIHdpdGggc291cmNlVVJMLCB3ZSB0YWtlIGNhcmUgdG8gbm90IGNoZWNrIHRoZSBvcHRpb24ncyBwcm90b3R5cGUsXG4gIC8vIGFzIHRoaXMgY29uZmlndXJhdGlvbiBpcyBhIGNvZGUgaW5qZWN0aW9uIHZlY3Rvci5cbiAgdmFyIHZhcmlhYmxlID0gaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAndmFyaWFibGUnKSAmJiBvcHRpb25zLnZhcmlhYmxlO1xuICBpZiAoIXZhcmlhYmxlKSB7XG4gICAgc291cmNlID0gJ3dpdGggKG9iaikge1xcbicgKyBzb3VyY2UgKyAnXFxufVxcbic7XG4gIH1cbiAgLy8gQ2xlYW51cCBjb2RlIGJ5IHN0cmlwcGluZyBlbXB0eSBzdHJpbmdzLlxuICBzb3VyY2UgPSAoaXNFdmFsdWF0aW5nID8gc291cmNlLnJlcGxhY2UocmVFbXB0eVN0cmluZ0xlYWRpbmcsICcnKSA6IHNvdXJjZSlcbiAgICAucmVwbGFjZShyZUVtcHR5U3RyaW5nTWlkZGxlLCAnJDEnKVxuICAgIC5yZXBsYWNlKHJlRW1wdHlTdHJpbmdUcmFpbGluZywgJyQxOycpO1xuXG4gIC8vIEZyYW1lIGNvZGUgYXMgdGhlIGZ1bmN0aW9uIGJvZHkuXG4gIHNvdXJjZSA9ICdmdW5jdGlvbignICsgKHZhcmlhYmxlIHx8ICdvYmonKSArICcpIHtcXG4nICtcbiAgICAodmFyaWFibGVcbiAgICAgID8gJydcbiAgICAgIDogJ29iaiB8fCAob2JqID0ge30pO1xcbidcbiAgICApICtcbiAgICBcInZhciBfX3QsIF9fcCA9ICcnXCIgK1xuICAgIChpc0VzY2FwaW5nXG4gICAgICAgPyAnLCBfX2UgPSBfLmVzY2FwZSdcbiAgICAgICA6ICcnXG4gICAgKSArXG4gICAgKGlzRXZhbHVhdGluZ1xuICAgICAgPyAnLCBfX2ogPSBBcnJheS5wcm90b3R5cGUuam9pbjtcXG4nICtcbiAgICAgICAgXCJmdW5jdGlvbiBwcmludCgpIHsgX19wICs9IF9fai5jYWxsKGFyZ3VtZW50cywgJycpIH1cXG5cIlxuICAgICAgOiAnO1xcbidcbiAgICApICtcbiAgICBzb3VyY2UgK1xuICAgICdyZXR1cm4gX19wXFxufSc7XG5cbiAgdmFyIHJlc3VsdCA9IGF0dGVtcHQoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uKGltcG9ydHNLZXlzLCBzb3VyY2VVUkwgKyAncmV0dXJuICcgKyBzb3VyY2UpXG4gICAgICAuYXBwbHkodW5kZWZpbmVkLCBpbXBvcnRzVmFsdWVzKTtcbiAgfSk7XG5cbiAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgZnVuY3Rpb24ncyBzb3VyY2UgYnkgaXRzIGB0b1N0cmluZ2AgbWV0aG9kIG9yXG4gIC8vIHRoZSBgc291cmNlYCBwcm9wZXJ0eSBhcyBhIGNvbnZlbmllbmNlIGZvciBpbmxpbmluZyBjb21waWxlZCB0ZW1wbGF0ZXMuXG4gIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XG4gIGlmIChpc0Vycm9yKHJlc3VsdCkpIHtcbiAgICB0aHJvdyByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVtcGxhdGU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5RWFjaDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlRm9yO1xuIiwiaW1wb3J0IGNyZWF0ZUJhc2VGb3IgZnJvbSAnLi9fY3JlYXRlQmFzZUZvci5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZvcjtcbiIsImltcG9ydCBiYXNlRm9yIGZyb20gJy4vX2Jhc2VGb3IuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlRm9yT3duO1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlRWFjaDtcbiIsImltcG9ydCBiYXNlRm9yT3duIGZyb20gJy4vX2Jhc2VGb3JPd24uanMnO1xuaW1wb3J0IGNyZWF0ZUJhc2VFYWNoIGZyb20gJy4vX2NyZWF0ZUJhc2VFYWNoLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VFYWNoO1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYGlkZW50aXR5YCBpZiBpdCdzIG5vdCBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGNhc3QgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhc3RGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgPyB2YWx1ZSA6IGlkZW50aXR5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0RnVuY3Rpb247XG4iLCJpbXBvcnQgYXJyYXlFYWNoIGZyb20gJy4vX2FycmF5RWFjaC5qcyc7XG5pbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGNhc3RGdW5jdGlvbiBmcm9tICcuL19jYXN0RnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZm9yRWFjaChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgY2FzdEZ1bmN0aW9uKGl0ZXJhdGVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvckVhY2g7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUNsZWFyO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NvY0luZGV4T2Y7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlRGVsZXRlO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVHZXQ7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlU2V0O1xuIiwiaW1wb3J0IGxpc3RDYWNoZUNsZWFyIGZyb20gJy4vX2xpc3RDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVEZWxldGUgZnJvbSAnLi9fbGlzdENhY2hlRGVsZXRlLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVHZXQgZnJvbSAnLi9fbGlzdENhY2hlR2V0LmpzJztcbmltcG9ydCBsaXN0Q2FjaGVIYXMgZnJvbSAnLi9fbGlzdENhY2hlSGFzLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVTZXQgZnJvbSAnLi9fbGlzdENhY2hlU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrRGVsZXRlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0dldDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrSGFzO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUNyZWF0ZTtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hEZWxldGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEdldDtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyAoZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoSGFzO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaFNldDtcbiIsImltcG9ydCBoYXNoQ2xlYXIgZnJvbSAnLi9faGFzaENsZWFyLmpzJztcbmltcG9ydCBoYXNoRGVsZXRlIGZyb20gJy4vX2hhc2hEZWxldGUuanMnO1xuaW1wb3J0IGhhc2hHZXQgZnJvbSAnLi9faGFzaEdldC5qcyc7XG5pbXBvcnQgaGFzaEhhcyBmcm9tICcuL19oYXNoSGFzLmpzJztcbmltcG9ydCBoYXNoU2V0IGZyb20gJy4vX2hhc2hTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuZXhwb3J0IGRlZmF1bHQgSGFzaDtcbiIsImltcG9ydCBIYXNoIGZyb20gJy4vX0hhc2guanMnO1xuaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlQ2xlYXI7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzS2V5YWJsZTtcbiIsImltcG9ydCBpc0tleWFibGUgZnJvbSAnLi9faXNLZXlhYmxlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRNYXBEYXRhO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlR2V0O1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlSGFzO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVTZXQ7XG4iLCJpbXBvcnQgbWFwQ2FjaGVDbGVhciBmcm9tICcuL19tYXBDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBtYXBDYWNoZURlbGV0ZSBmcm9tICcuL19tYXBDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVHZXQgZnJvbSAnLi9fbWFwQ2FjaGVHZXQuanMnO1xuaW1wb3J0IG1hcENhY2hlSGFzIGZyb20gJy4vX21hcENhY2hlSGFzLmpzJztcbmltcG9ydCBtYXBDYWNoZVNldCBmcm9tICcuL19tYXBDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBNYXBDYWNoZTtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcbmltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGRhdGEuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgdGhpcy5zaXplID0gKytkYXRhLnNpemU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja1NldDtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBzdGFja0NsZWFyIGZyb20gJy4vX3N0YWNrQ2xlYXIuanMnO1xuaW1wb3J0IHN0YWNrRGVsZXRlIGZyb20gJy4vX3N0YWNrRGVsZXRlLmpzJztcbmltcG9ydCBzdGFja0dldCBmcm9tICcuL19zdGFja0dldC5qcyc7XG5pbXBvcnQgc3RhY2tIYXMgZnJvbSAnLi9fc3RhY2tIYXMuanMnO1xuaW1wb3J0IHN0YWNrU2V0IGZyb20gJy4vX3N0YWNrU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcbiIsImltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduTWVyZ2VWYWx1ZTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBhbGxvY1Vuc2FmZSA9IEJ1ZmZlciA/IEJ1ZmZlci5hbGxvY1Vuc2FmZSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFsbG9jVW5zYWZlID8gYWxsb2NVbnNhZmUobGVuZ3RoKSA6IG5ldyBidWZmZXIuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZUJ1ZmZlcjtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBVaW50OEFycmF5O1xuIiwiaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLi9fVWludDhBcnJheS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVBcnJheUJ1ZmZlcjtcbiIsImltcG9ydCBjbG9uZUFycmF5QnVmZmVyIGZyb20gJy4vX2Nsb25lQXJyYXlCdWZmZXIuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZVR5cGVkQXJyYXk7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29weUFycmF5O1xuIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG52YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gb2JqZWN0KCkge31cbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3RvKSB7XG4gICAgaWYgKCFpc09iamVjdChwcm90bykpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgaWYgKG9iamVjdENyZWF0ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdENyZWF0ZShwcm90byk7XG4gICAgfVxuICAgIG9iamVjdC5wcm90b3R5cGUgPSBwcm90bztcbiAgICB2YXIgcmVzdWx0ID0gbmV3IG9iamVjdDtcbiAgICBvYmplY3QucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlQ3JlYXRlO1xuIiwiaW1wb3J0IGJhc2VDcmVhdGUgZnJvbSAnLi9fYmFzZUNyZWF0ZS5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRDbG9uZU9iamVjdDtcbiIsImltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlT2JqZWN0O1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCwgdW5sZXNzIGBrZXlgIGlzIFwiX19wcm90b19fXCIgb3IgXCJjb25zdHJ1Y3RvclwiLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc2FmZUdldChvYmplY3QsIGtleSkge1xuICBpZiAoa2V5ID09PSAnY29uc3RydWN0b3InICYmIHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gb2JqZWN0W2tleV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNhZmVHZXQ7XG4iLCJpbXBvcnQgY29weU9iamVjdCBmcm9tICcuL19jb3B5T2JqZWN0LmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvUGxhaW5PYmplY3Q7XG4iLCJpbXBvcnQgYXNzaWduTWVyZ2VWYWx1ZSBmcm9tICcuL19hc3NpZ25NZXJnZVZhbHVlLmpzJztcbmltcG9ydCBjbG9uZUJ1ZmZlciBmcm9tICcuL19jbG9uZUJ1ZmZlci5qcyc7XG5pbXBvcnQgY2xvbmVUeXBlZEFycmF5IGZyb20gJy4vX2Nsb25lVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgY29weUFycmF5IGZyb20gJy4vX2NvcHlBcnJheS5qcyc7XG5pbXBvcnQgaW5pdENsb25lT2JqZWN0IGZyb20gJy4vX2luaXRDbG9uZU9iamVjdC5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlT2JqZWN0IGZyb20gJy4vaXNBcnJheUxpa2VPYmplY3QuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJy4vaXNQbGFpbk9iamVjdC5qcyc7XG5pbXBvcnQgaXNUeXBlZEFycmF5IGZyb20gJy4vaXNUeXBlZEFycmF5LmpzJztcbmltcG9ydCBzYWZlR2V0IGZyb20gJy4vX3NhZmVHZXQuanMnO1xuaW1wb3J0IHRvUGxhaW5PYmplY3QgZnJvbSAnLi90b1BsYWluT2JqZWN0LmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IHNhZmVHZXQob2JqZWN0LCBrZXkpLFxuICAgICAgc3JjVmFsdWUgPSBzYWZlR2V0KHNvdXJjZSwga2V5KSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICB2YXIgaXNBcnIgPSBpc0FycmF5KHNyY1ZhbHVlKSxcbiAgICAgICAgaXNCdWZmID0gIWlzQXJyICYmIGlzQnVmZmVyKHNyY1ZhbHVlKSxcbiAgICAgICAgaXNUeXBlZCA9ICFpc0FyciAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheShzcmNWYWx1ZSk7XG5cbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FyciB8fCBpc0J1ZmYgfHwgaXNUeXBlZCkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNCdWZmKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVCdWZmZXIoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNUeXBlZCkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lVHlwZWRBcnJheShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCBpc0Z1bmN0aW9uKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGluaXRDbG9uZU9iamVjdChzcmNWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlRGVlcDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYXNzaWduTWVyZ2VWYWx1ZSBmcm9tICcuL19hc3NpZ25NZXJnZVZhbHVlLmpzJztcbmltcG9ydCBiYXNlRm9yIGZyb20gJy4vX2Jhc2VGb3IuanMnO1xuaW1wb3J0IGJhc2VNZXJnZURlZXAgZnJvbSAnLi9fYmFzZU1lcmdlRGVlcC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcbmltcG9ydCBzYWZlR2V0IGZyb20gJy4vX3NhZmVHZXQuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYmFzZUZvcihzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKHNhZmVHZXQob2JqZWN0LCBrZXkpLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0sIGtleXNJbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNZXJnZTtcbiIsImltcG9ydCBiYXNlTWVyZ2UgZnJvbSAnLi9fYmFzZU1lcmdlLmpzJztcbmltcG9ydCBjcmVhdGVBc3NpZ25lciBmcm9tICcuL19jcmVhdGVBc3NpZ25lci5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZTtcbiIsImltcG9ydCBiYXNlVmFsdWVzIGZyb20gJy4vX2Jhc2VWYWx1ZXMuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbHVlcztcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuaW1wb3J0IHNldENhY2hlQWRkIGZyb20gJy4vX3NldENhY2hlQWRkLmpzJztcbmltcG9ydCBzZXRDYWNoZUhhcyBmcm9tICcuL19zZXRDYWNoZUhhcy5qcyc7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID09IG51bGwgPyAwIDogdmFsdWVzLmxlbmd0aDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuZXhwb3J0IGRlZmF1bHQgU2V0Q2FjaGU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheVNvbWU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FjaGVIYXM7XG4iLCJpbXBvcnQgU2V0Q2FjaGUgZnJvbSAnLi9fU2V0Q2FjaGUuanMnO1xuaW1wb3J0IGFycmF5U29tZSBmcm9tICcuL19hcnJheVNvbWUuanMnO1xuaW1wb3J0IGNhY2hlSGFzIGZyb20gJy4vX2NhY2hlSGFzLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxBcnJheXM7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0VG9BcnJheTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBtYXBUb0FycmF5IGZyb20gJy4vX21hcFRvQXJyYXkuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsQnlUYWc7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5UHVzaDtcbiIsImltcG9ydCBhcnJheVB1c2ggZnJvbSAnLi9fYXJyYXlQdXNoLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldEFsbEtleXM7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5maWx0ZXJgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlGaWx0ZXIoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0W3Jlc0luZGV4KytdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5RmlsdGVyO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkFycmF5O1xuIiwiaW1wb3J0IGFycmF5RmlsdGVyIGZyb20gJy4vX2FycmF5RmlsdGVyLmpzJztcbmltcG9ydCBzdHViQXJyYXkgZnJvbSAnLi9zdHViQXJyYXkuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9ICFuYXRpdmVHZXRTeW1ib2xzID8gc3R1YkFycmF5IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGFycmF5RmlsdGVyKG5hdGl2ZUdldFN5bWJvbHMob2JqZWN0KSwgZnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBzeW1ib2wpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFN5bWJvbHM7XG4iLCJpbXBvcnQgYmFzZUdldEFsbEtleXMgZnJvbSAnLi9fYmFzZUdldEFsbEtleXMuanMnO1xuaW1wb3J0IGdldFN5bWJvbHMgZnJvbSAnLi9fZ2V0U3ltYm9scy5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRBbGxLZXlzO1xuIiwiaW1wb3J0IGdldEFsbEtleXMgZnJvbSAnLi9fZ2V0QWxsS2V5cy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbE9iamVjdHM7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5leHBvcnQgZGVmYXVsdCBEYXRhVmlldztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5leHBvcnQgZGVmYXVsdCBTZXQ7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgV2Vha01hcDtcbiIsImltcG9ydCBEYXRhVmlldyBmcm9tICcuL19EYXRhVmlldy5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuL19Qcm9taXNlLmpzJztcbmltcG9ydCBTZXQgZnJvbSAnLi9fU2V0LmpzJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy4vX1dlYWtNYXAuanMnO1xuaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUYWc7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBlcXVhbEJ5VGFnIGZyb20gJy4vX2VxdWFsQnlUYWcuanMnO1xuaW1wb3J0IGVxdWFsT2JqZWN0cyBmcm9tICcuL19lcXVhbE9iamVjdHMuanMnO1xuaW1wb3J0IGdldFRhZyBmcm9tICcuL19nZXRUYWcuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzRXF1YWxEZWVwO1xuIiwiaW1wb3J0IGJhc2VJc0VxdWFsRGVlcCBmcm9tICcuL19iYXNlSXNFcXVhbERlZXAuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNFcXVhbDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTWF0Y2g7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwiaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIHJlc3VsdFtsZW5ndGhdID0gW2tleSwgdmFsdWUsIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE1hdGNoRGF0YTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGU7XG4iLCJpbXBvcnQgYmFzZUlzTWF0Y2ggZnJvbSAnLi9fYmFzZUlzTWF0Y2guanMnO1xuaW1wb3J0IGdldE1hdGNoRGF0YSBmcm9tICcuL19nZXRNYXRjaERhdGEuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXRjaGVzO1xuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleTtcbiIsImltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBjbGVhcmAsIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAhPSBudWxsICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJy4vbWVtb2l6ZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBtYXhpbXVtIG1lbW9pemUgY2FjaGUgc2l6ZS4gKi9cbnZhciBNQVhfTUVNT0laRV9TSVpFID0gNTAwO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tZW1vaXplYCB3aGljaCBjbGVhcnMgdGhlIG1lbW9pemVkIGZ1bmN0aW9uJ3NcbiAqIGNhY2hlIHdoZW4gaXQgZXhjZWVkcyBgTUFYX01FTU9JWkVfU0laRWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtZW1vaXplQ2FwcGVkKGZ1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IG1lbW9pemUoZnVuYywgZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKGNhY2hlLnNpemUgPT09IE1BWF9NRU1PSVpFX1NJWkUpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH0pO1xuXG4gIHZhciBjYWNoZSA9IHJlc3VsdC5jYWNoZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZUNhcHBlZDtcbiIsImltcG9ydCBtZW1vaXplQ2FwcGVkIGZyb20gJy4vX21lbW9pemVDYXBwZWQuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHN0cmluZy5jaGFyQ29kZUF0KDApID09PSA0NiAvKiAuICovKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN1YlN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1RvUGF0aDtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IHN0cmluZ1RvUGF0aCBmcm9tICcuL19zdHJpbmdUb1BhdGguanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzS2V5KHZhbHVlLCBvYmplY3QpID8gW3ZhbHVlXSA6IHN0cmluZ1RvUGF0aCh0b1N0cmluZyh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0UGF0aDtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvS2V5O1xuIiwiaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXQ7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXQ7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzSW4ob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUhhc0luO1xuIiwiaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCB8fCArK2luZGV4ICE9IGxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogb2JqZWN0Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNQYXRoO1xuIiwiaW1wb3J0IGJhc2VIYXNJbiBmcm9tICcuL19iYXNlSGFzSW4uanMnO1xuaW1wb3J0IGhhc1BhdGggZnJvbSAnLi9faGFzUGF0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzSW47XG4iLCJpbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuaW1wb3J0IGdldCBmcm9tICcuL2dldC5qcyc7XG5pbXBvcnQgaGFzSW4gZnJvbSAnLi9oYXNJbi5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNyY1ZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSh0b0tleShwYXRoKSwgc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBnZXQob2JqZWN0LCBwYXRoKTtcbiAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICA6IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgfCBDT01QQVJFX1VOT1JERVJFRF9GTEFHKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hdGNoZXNQcm9wZXJ0eTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eTtcbiIsImltcG9ydCBiYXNlR2V0IGZyb20gJy4vX2Jhc2VHZXQuanMnO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVByb3BlcnR5RGVlcDtcbiIsImltcG9ydCBiYXNlUHJvcGVydHkgZnJvbSAnLi9fYmFzZVByb3BlcnR5LmpzJztcbmltcG9ydCBiYXNlUHJvcGVydHlEZWVwIGZyb20gJy4vX2Jhc2VQcm9wZXJ0eURlZXAuanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IDIgfSB9LFxuICogICB7ICdhJzogeyAnYic6IDEgfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYicpKTtcbiAqIC8vID0+IFsyLCAxXVxuICpcbiAqIF8ubWFwKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InXSkpLCAnYS5iJyk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvcGVydHk7XG4iLCJpbXBvcnQgYmFzZU1hdGNoZXMgZnJvbSAnLi9fYmFzZU1hdGNoZXMuanMnO1xuaW1wb3J0IGJhc2VNYXRjaGVzUHJvcGVydHkgZnJvbSAnLi9fYmFzZU1hdGNoZXNQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJy4vcHJvcGVydHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICovXG5mdW5jdGlvbiBiYXNlSXRlcmF0ZWUodmFsdWUpIHtcbiAgLy8gRG9uJ3Qgc3RvcmUgdGhlIGB0eXBlb2ZgIHJlc3VsdCBpbiBhIHZhcmlhYmxlIHRvIGF2b2lkIGEgSklUIGJ1ZyBpbiBTYWZhcmkgOS5cbiAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICA6IGJhc2VNYXRjaGVzKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXRlcmF0ZWU7XG4iLCJpbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hcGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlTWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBBcnJheShjb2xsZWN0aW9uLmxlbmd0aCkgOiBbXTtcblxuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gaXRlcmF0ZWUodmFsdWUsIGtleSwgY29sbGVjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWFwO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zb3J0QnlgIHdoaWNoIHVzZXMgYGNvbXBhcmVyYCB0byBkZWZpbmUgdGhlXG4gKiBzb3J0IG9yZGVyIG9mIGBhcnJheWAgYW5kIHJlcGxhY2VzIGNyaXRlcmlhIG9iamVjdHMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyZXIgVGhlIGZ1bmN0aW9uIHRvIGRlZmluZSBzb3J0IG9yZGVyLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTb3J0QnkoYXJyYXksIGNvbXBhcmVyKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgYXJyYXkuc29ydChjb21wYXJlcik7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGFycmF5W2xlbmd0aF0gPSBhcnJheVtsZW5ndGhdLnZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNvcnRCeTtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqXG4gKiBDb21wYXJlcyB2YWx1ZXMgdG8gc29ydCB0aGVtIGluIGFzY2VuZGluZyBvcmRlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYHZhbHVlYC5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUFzY2VuZGluZyh2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKHZhbHVlICE9PSBvdGhlcikge1xuICAgIHZhciB2YWxJc0RlZmluZWQgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgICB2YWxJc051bGwgPSB2YWx1ZSA9PT0gbnVsbCxcbiAgICAgICAgdmFsSXNSZWZsZXhpdmUgPSB2YWx1ZSA9PT0gdmFsdWUsXG4gICAgICAgIHZhbElzU3ltYm9sID0gaXNTeW1ib2wodmFsdWUpO1xuXG4gICAgdmFyIG90aElzRGVmaW5lZCA9IG90aGVyICE9PSB1bmRlZmluZWQsXG4gICAgICAgIG90aElzTnVsbCA9IG90aGVyID09PSBudWxsLFxuICAgICAgICBvdGhJc1JlZmxleGl2ZSA9IG90aGVyID09PSBvdGhlcixcbiAgICAgICAgb3RoSXNTeW1ib2wgPSBpc1N5bWJvbChvdGhlcik7XG5cbiAgICBpZiAoKCFvdGhJc051bGwgJiYgIW90aElzU3ltYm9sICYmICF2YWxJc1N5bWJvbCAmJiB2YWx1ZSA+IG90aGVyKSB8fFxuICAgICAgICAodmFsSXNTeW1ib2wgJiYgb3RoSXNEZWZpbmVkICYmIG90aElzUmVmbGV4aXZlICYmICFvdGhJc051bGwgJiYgIW90aElzU3ltYm9sKSB8fFxuICAgICAgICAodmFsSXNOdWxsICYmIG90aElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgKCF2YWxJc0RlZmluZWQgJiYgb3RoSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICF2YWxJc1JlZmxleGl2ZSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmICgoIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wgJiYgIW90aElzU3ltYm9sICYmIHZhbHVlIDwgb3RoZXIpIHx8XG4gICAgICAgIChvdGhJc1N5bWJvbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUgJiYgIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wpIHx8XG4gICAgICAgIChvdGhJc051bGwgJiYgdmFsSXNEZWZpbmVkICYmIHZhbElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAoIW90aElzRGVmaW5lZCAmJiB2YWxJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgIW90aElzUmVmbGV4aXZlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wYXJlQXNjZW5kaW5nO1xuIiwiaW1wb3J0IGNvbXBhcmVBc2NlbmRpbmcgZnJvbSAnLi9fY29tcGFyZUFzY2VuZGluZy5qcyc7XG5cbi8qKlxuICogVXNlZCBieSBgXy5vcmRlckJ5YCB0byBjb21wYXJlIG11bHRpcGxlIHByb3BlcnRpZXMgb2YgYSB2YWx1ZSB0byBhbm90aGVyXG4gKiBhbmQgc3RhYmxlIHNvcnQgdGhlbS5cbiAqXG4gKiBJZiBgb3JkZXJzYCBpcyB1bnNwZWNpZmllZCwgYWxsIHZhbHVlcyBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLFxuICogc3BlY2lmeSBhbiBvcmRlciBvZiBcImRlc2NcIiBmb3IgZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlclxuICogb2YgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbltdfHN0cmluZ1tdfSBvcmRlcnMgVGhlIG9yZGVyIHRvIHNvcnQgYnkgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBvYmpDcml0ZXJpYSA9IG9iamVjdC5jcml0ZXJpYSxcbiAgICAgIG90aENyaXRlcmlhID0gb3RoZXIuY3JpdGVyaWEsXG4gICAgICBsZW5ndGggPSBvYmpDcml0ZXJpYS5sZW5ndGgsXG4gICAgICBvcmRlcnNMZW5ndGggPSBvcmRlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbXBhcmVBc2NlbmRpbmcob2JqQ3JpdGVyaWFbaW5kZXhdLCBvdGhDcml0ZXJpYVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChpbmRleCA+PSBvcmRlcnNMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHZhciBvcmRlciA9IG9yZGVyc1tpbmRleF07XG4gICAgICByZXR1cm4gcmVzdWx0ICogKG9yZGVyID09ICdkZXNjJyA/IC0xIDogMSk7XG4gICAgfVxuICB9XG4gIC8vIEZpeGVzIGFuIGBBcnJheSNzb3J0YCBidWcgaW4gdGhlIEpTIGVuZ2luZSBlbWJlZGRlZCBpbiBBZG9iZSBhcHBsaWNhdGlvbnNcbiAgLy8gdGhhdCBjYXVzZXMgaXQsIHVuZGVyIGNlcnRhaW4gY2lyY3Vtc3RhbmNlcywgdG8gcHJvdmlkZSB0aGUgc2FtZSB2YWx1ZSBmb3JcbiAgLy8gYG9iamVjdGAgYW5kIGBvdGhlcmAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvcHVsbC8xMjQ3XG4gIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBlbnN1cmVzIGEgc3RhYmxlIHNvcnQgaW4gVjggYW5kIG90aGVyIGVuZ2luZXMuXG4gIC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD05MCBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gb2JqZWN0LmluZGV4IC0gb3RoZXIuaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBhcmVNdWx0aXBsZTtcbiIsImltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgYmFzZU1hcCBmcm9tICcuL19iYXNlTWFwLmpzJztcbmltcG9ydCBiYXNlU29ydEJ5IGZyb20gJy4vX2Jhc2VTb3J0QnkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IGNvbXBhcmVNdWx0aXBsZSBmcm9tICcuL19jb21wYXJlTXVsdGlwbGUuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm9yZGVyQnlgIHdpdGhvdXQgcGFyYW0gZ3VhcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IGl0ZXJhdGVlcyBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcmRlcnMgVGhlIHNvcnQgb3JkZXJzIG9mIGBpdGVyYXRlZXNgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgc29ydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlT3JkZXJCeShjb2xsZWN0aW9uLCBpdGVyYXRlZXMsIG9yZGVycykge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaXRlcmF0ZWVzID0gYXJyYXlNYXAoaXRlcmF0ZWVzLmxlbmd0aCA/IGl0ZXJhdGVlcyA6IFtpZGVudGl0eV0sIGJhc2VVbmFyeShiYXNlSXRlcmF0ZWUpKTtcblxuICB2YXIgcmVzdWx0ID0gYmFzZU1hcChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGNyaXRlcmlhID0gYXJyYXlNYXAoaXRlcmF0ZWVzLCBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGl0ZXJhdGVlKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyAnY3JpdGVyaWEnOiBjcml0ZXJpYSwgJ2luZGV4JzogKytpbmRleCwgJ3ZhbHVlJzogdmFsdWUgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJhc2VTb3J0QnkocmVzdWx0LCBmdW5jdGlvbihvYmplY3QsIG90aGVyKSB7XG4gICAgcmV0dXJuIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU9yZGVyQnk7XG4iLCJpbXBvcnQgYmFzZU9yZGVyQnkgZnJvbSAnLi9fYmFzZU9yZGVyQnkuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNvcnRCeWAgZXhjZXB0IHRoYXQgaXQgYWxsb3dzIHNwZWNpZnlpbmcgdGhlIHNvcnRcbiAqIG9yZGVycyBvZiB0aGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuIElmIGBvcmRlcnNgIGlzIHVuc3BlY2lmaWVkLCBhbGwgdmFsdWVzXG4gKiBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLCBzcGVjaWZ5IGFuIG9yZGVyIG9mIFwiZGVzY1wiIGZvclxuICogZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlciBvZiBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtBcnJheVtdfEZ1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IFtpdGVyYXRlZXM9W18uaWRlbnRpdHldXVxuICogIFRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IFtvcmRlcnNdIFRoZSBzb3J0IG9yZGVycyBvZiBgaXRlcmF0ZWVzYC5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLnJlZHVjZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzb3J0ZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDggfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzQgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAgfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICogXTtcbiAqXG4gKiAvLyBTb3J0IGJ5IGB1c2VyYCBpbiBhc2NlbmRpbmcgb3JkZXIgYW5kIGJ5IGBhZ2VgIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gKiBfLm9yZGVyQnkodXNlcnMsIFsndXNlcicsICdhZ2UnXSwgWydhc2MnLCAnZGVzYyddKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFtbJ2Jhcm5leScsIDM2XSwgWydiYXJuZXknLCAzNF0sIFsnZnJlZCcsIDQ4XSwgWydmcmVkJywgNDBdXVxuICovXG5mdW5jdGlvbiBvcmRlckJ5KGNvbGxlY3Rpb24sIGl0ZXJhdGVlcywgb3JkZXJzLCBndWFyZCkge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNBcnJheShpdGVyYXRlZXMpKSB7XG4gICAgaXRlcmF0ZWVzID0gaXRlcmF0ZWVzID09IG51bGwgPyBbXSA6IFtpdGVyYXRlZXNdO1xuICB9XG4gIG9yZGVycyA9IGd1YXJkID8gdW5kZWZpbmVkIDogb3JkZXJzO1xuICBpZiAoIWlzQXJyYXkob3JkZXJzKSkge1xuICAgIG9yZGVycyA9IG9yZGVycyA9PSBudWxsID8gW10gOiBbb3JkZXJzXTtcbiAgfVxuICByZXR1cm4gYmFzZU9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvcmRlckJ5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGaW5kSW5kZXg7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNOYU47XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmRleE9mYCB3aGljaCBwZXJmb3JtcyBzdHJpY3QgZXF1YWxpdHlcbiAqIGNvbXBhcmlzb25zIG9mIHZhbHVlcywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmljdEluZGV4T2Y7XG4iLCJpbXBvcnQgYmFzZUZpbmRJbmRleCBmcm9tICcuL19iYXNlRmluZEluZGV4LmpzJztcbmltcG9ydCBiYXNlSXNOYU4gZnJvbSAnLi9fYmFzZUlzTmFOLmpzJztcbmltcG9ydCBzdHJpY3RJbmRleE9mIGZyb20gJy4vX3N0cmljdEluZGV4T2YuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgYGZyb21JbmRleGAgYm91bmRzIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlXG4gICAgPyBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KVxuICAgIDogYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSW5kZXhPZjtcbiIsImltcG9ydCBiYXNlSW5kZXhPZiBmcm9tICcuL19iYXNlSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIDApID4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5SW5jbHVkZXM7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUluY2x1ZGVzV2l0aDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vb3A7XG4iLCJpbXBvcnQgU2V0IGZyb20gJy4vX1NldC5qcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuL25vb3AuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNldDtcbiIsImltcG9ydCBTZXRDYWNoZSBmcm9tICcuL19TZXRDYWNoZS5qcyc7XG5pbXBvcnQgYXJyYXlJbmNsdWRlcyBmcm9tICcuL19hcnJheUluY2x1ZGVzLmpzJztcbmltcG9ydCBhcnJheUluY2x1ZGVzV2l0aCBmcm9tICcuL19hcnJheUluY2x1ZGVzV2l0aC5qcyc7XG5pbXBvcnQgY2FjaGVIYXMgZnJvbSAnLi9fY2FjaGVIYXMuanMnO1xuaW1wb3J0IGNyZWF0ZVNldCBmcm9tICcuL19jcmVhdGVTZXQuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmlxO1xuIiwiaW1wb3J0IGJhc2VJdGVyYXRlZSBmcm9tICcuL19iYXNlSXRlcmF0ZWUuanMnO1xuaW1wb3J0IGJhc2VVbmlxIGZyb20gJy4vX2Jhc2VVbmlxLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnVuaXFgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYGl0ZXJhdGVlYCB3aGljaCBpc1xuICogaW52b2tlZCBmb3IgZWFjaCBlbGVtZW50IGluIGBhcnJheWAgdG8gZ2VuZXJhdGUgdGhlIGNyaXRlcmlvbiBieSB3aGljaFxuICogdW5pcXVlbmVzcyBpcyBjb21wdXRlZC4gVGhlIG9yZGVyIG9mIHJlc3VsdCB2YWx1ZXMgaXMgZGV0ZXJtaW5lZCBieSB0aGVcbiAqIG9yZGVyIHRoZXkgb2NjdXIgaW4gdGhlIGFycmF5LiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDpcbiAqICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXFCeShbMi4xLCAxLjIsIDIuM10sIE1hdGguZmxvb3IpO1xuICogLy8gPT4gWzIuMSwgMS4yXVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy51bmlxQnkoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXFCeShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpID8gYmFzZVVuaXEoYXJyYXksIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMikpIDogW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuaXFCeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IF90ZW1wbGF0ZSBmcm9tICdsb2Rhc2gtZXMvdGVtcGxhdGUnO1xuaW1wb3J0IF9mb3JFYWNoIGZyb20gJ2xvZGFzaC1lcy9mb3JFYWNoJztcbmltcG9ydCBfbWVyZ2UgZnJvbSAnbG9kYXNoLWVzL21lcmdlJztcbmltcG9ydCBfdmFsdWVzIGZyb20gJ2xvZGFzaC1lcy92YWx1ZXMnO1xuaW1wb3J0IF9vcmRlckJ5IGZyb20gJ2xvZGFzaC1lcy9vcmRlckJ5JztcbmltcG9ydCBfdW5pcUJ5IGZyb20gJ2xvZGFzaC1lcy91bmlxQnknO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEZlZWQge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHQgPSBGZWVkLmRlZmF1bHQ7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IF9tZXJnZSh7fSwgRmVlZC5kZWZhdWx0LCBjb25maWcpO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1vZHVsZVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICBsZXQgZGF0YSA9IFtdO1xuICAgIGxldCBmZWVkID0gdGhpcy5fc2V0dGluZ3MuZmVlZDtcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgcnNzVG9Kc29uOiBGZWVkLnJzc1RvSnNvbixcbiAgICAgIHJzc1VybDogKEFycmF5LmlzQXJyYXkoZmVlZCkpID8gZmVlZCA6IFtmZWVkXVxuICAgIH07XG5cbiAgICAvLyBHbyB0aHJvdWdoIGVhY2ggZmVlZFxuICAgIF9mb3JFYWNoKGNvbmZpZy5yc3NVcmwsICh1cmwsIGluZGV4KSA9PiB7XG4gICAgICAvLyBNYWtlIHRoZSByZXF1ZXN0XG5cbiAgICAgIHRoaXMuX3JlcXVlc3QoY29uZmlnLCB1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgLy8gUHJvY2VzcyB0aGUgZGF0YVxuICAgICAgICAgIGRhdGEucHVzaCh0aGlzLl9wcm9jZXNzKEpTT04ucGFyc2UocmVzcG9uc2UpLCB0aGlzLl9zZXR0aW5ncykpO1xuICAgICAgICAgIC8vIFdoZW4gYWxsIGZlZWRzIGhhdmUgYmVlbiByZXF1ZXN0ZWQsIG1lcmdlIHRoZSBkYXRhIGFuZCBjb21waWxlXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSBjb25maWcucnNzVXJsLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fbWVyZ2UoZGF0YSwgdGhpcy5fc2V0dGluZ3MpO1xuXG4gICAgICAgICAgICBsZXQgY29tcGlsZWQgPSB0aGlzLl9yZW5kZXIoXG4gICAgICAgICAgICAgIHRoaXMuX21lcmdlKGRhdGEsIHRoaXMuX3NldHRpbmdzKSxcbiAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKGVsKSBlbC5pbm5lckhUTUwgPSBjb21waWxlZDtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBYSFIgcmVxdWVzdCBmb3IgdGhlIGZlZWQgZGF0YVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBUaGUgcmVxdWVzdCBkYXRhXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgIFRoZSByZXF1ZXN0IHVybFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICBSZXNvbHZlcyB3aGVuIHRoZSByZXNwb25zZSBpcyByZWFkeSwgcmVqZWN0cyB3aGVuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBvcGVyYXRpb24gdGltZXMgb3V0IG9yIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgKi9cbiAgX3JlcXVlc3QoY29uZmlnLCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCBfeGhyID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoX3hoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgaWYgKF94aHIuc3RhdHVzID49IDIwMCAmJiBfeGhyLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShfeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihfeGhyLnN0YXR1cykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGhlIEZlZWQgcmVxdWVzdCB0aW1lZCBvdXQnKSk7XG4gICAgICB9O1xuICAgICAgeGhyLm9wZW4oJ0dFVCcsIGAke2NvbmZpZy5yc3NUb0pzb259P3Jzc191cmw9JHt1cmx9YCwgdHJ1ZSk7XG4gICAgICB4aHIuc2VuZCgpO1xuICAgICAgeGhyID0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGRhdGEgdG8gdGhlIGFwcHJvcHJpYXRlIHByb2Nlc3NpbmcgZnVuY3Rpb24gYmFzZWQgb24gdHlwZVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgICAgIFRoZSByZXF1ZXN0ZWQgZmVlZCBkYXRhIHRvIHBhc3NcbiAgICogQHBhcmFtICB7b2JqZWN0fSBzZXR0aW5ncyBUaGUgYXBwbGljYXRpb24gc2V0dGluZ3NcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgcHJvY2Vzc2VkIGRhdGFcbiAgICovXG4gIF9wcm9jZXNzKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgcmV0dXJuIEZlZWQucHJvY2Vzc1tzZXR0aW5ncy50eXBlXShkYXRhLCBzZXR0aW5ncyk7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBkYXRhIHRvIHRoZSBhcHByb3ByaWF0ZSBtZXJnZSBmdW5jdGlvbiBiYXNlZCBvbiB0eXBlXG4gICAqIEBwYXJhbSAge29iamVjdH0gZGF0YSAgICAgVGhlIHJlcXVlc3RlZCBmZWVkIGRhdGEgdG8gcGFzc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IHNldHRpbmdzIFRoZSBhcHBsaWNhdGlvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBtZXJnZWQgZmVlZCBkYXRhXG4gICAqL1xuICBfbWVyZ2UoZGF0YSwgc2V0dGluZ3MpIHtcbiAgICByZXR1cm4gRmVlZC5tZXJnZVtzZXR0aW5ncy50eXBlXShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lIHRlbXBsYXRlIGNvbXBvbmVudHMsIHBhc3MgZGF0YSwgYW5kIHJldHVybiBjb21waWxlZCB0ZW1sYXRlXG4gICAqIEBwYXJhbSAge29iamVjdH0gZGF0YSAgICAgVGhlIHJlcXVlc3RlZCBmZWVkIGRhdGEgdG8gcGFzc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IHNldHRpbmdzIFRoZSBhcHBsaWNhdGlvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgIFRoZSBjb21wbGllZCBodG1sIHN0cmluZ1xuICAgKi9cbiAgX3JlbmRlcihkYXRhLCBzZXR0aW5ncykge1xuICAgIGRhdGEuc2V0dGluZ3MgPSBzZXR0aW5ncztcblxuICAgIGlmIChzZXR0aW5ncy5sb2cpXG4gICAgICBjb25zb2xlLmRpcihkYXRhKTtcblxuICAgIGxldCB0ZW1wbGF0ZSA9IF92YWx1ZXMoc2V0dGluZ3MudGVtcGxhdGVzKS5qb2luKCcnKTtcbiAgICBsZXQgY29tcGlsZWQgPSBfdGVtcGxhdGUoXG4gICAgICB0ZW1wbGF0ZSxcbiAgICAgIHtcbiAgICAgICAgJ2ltcG9ydHMnOiB7XG4gICAgICAgICAgJ19lYWNoJzogX2ZvckVhY2hcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIGNvbXBpbGVkKGRhdGEpO1xuICB9XG59XG5cbi8qKlxuICogQW4gb3BlbiBSU1MgdG8gSlNPTiBhcGksIHNlZSBodHRwczovL3JzczJqc29uLmNvbVxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuRmVlZC5yc3NUb0pzb24gPSAnaHR0cHM6Ly9hcGkucnNzMmpzb24uY29tL3YxL2FwaS5qc29uJztcblxuLyoqXG4gKiBUaGUgdGVtcGxhdGUgZm9yIHRoZSB3aWRnZXQuXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5GZWVkLnRlbXBsYXRlcyA9IHtcbiAgbWVkaXVtOiB7XG4gICAgb3BlbmVyOiBbXG4gICAgICAnPHNlY3Rpb24gY2xhc3M9XCJvLWZlZWQgPCUtIHNldHRpbmdzLmNsYXNzZXMud3JhcHBlciAlPlwiIHN0eWxlPVwiJyxcbiAgICAgICAgJzwlIGlmIChzZXR0aW5ncy5mb250U2l6ZSkgeyAlPmZvbnQtc2l6ZTogPCUtIHNldHRpbmdzLmZvbnRTaXplICU+OzwlIH0gJT4nLFxuICAgICAgICAnPCUgaWYgKHNldHRpbmdzLnBvc3RCb3JkZXJDb2xvcikgeyAlPmJvcmRlci1jb2xvcjogPCUtIHNldHRpbmdzLnBvc3RCb3JkZXJDb2xvciAlPjs8JSB9ICU+JyxcbiAgICAgICdcIj4nXG4gICAgXSxcbiAgICBoZWFkZXI6IFtcbiAgICAgICc8aGVhZGVyIGNsYXNzPVwiby1mZWVkX19oZWFkZXIgPCUtIHNldHRpbmdzLmNsYXNzZXMuaGVhZGVyICU+XCI+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvLWZlZWRfX2F2YXRhciA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5hdmF0YXIgJT5cIj4nLFxuICAgICAgICAgICc8aW1nIHNyYz1cIicsXG4gICAgICAgICAgICAgICAgJzwlIGlmIChzZXR0aW5ncy5wcm9maWxlSW1nICE9PSBcIlwiKSB7ICU+JyxcbiAgICAgICAgICAgICAgICAgICc8JS0gc2V0dGluZ3MucHJvZmlsZUltZyAlPicsXG4gICAgICAgICAgICAgICAgJzwlIH0gZWxzZSB7ICU+JyxcbiAgICAgICAgICAgICAgICAgICc8JS0gZmVlZC5wcm9maWxlSW1nICU+JyxcbiAgICAgICAgICAgICAgICAnPCUgfSAlPlwiICcsXG4gICAgICAgICAgICAgICAnd2lkdGg9XCI8JS0gc2V0dGluZ3MucmF0aW9Qcm9maWxlWzBdICU+XCIgJyxcbiAgICAgICAgICAgICAgICdoZWlnaHQ9XCI8JS0gc2V0dGluZ3MucmF0aW9Qcm9maWxlWzFdICU+XCI+JyxcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8YSBjbGFzcz1cIm8tZmVlZF9fdXJsIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmF2YXRhciAlPlwiICcsXG4gICAgICAgICAgJ2hyZWY9XCI8JSBpZiAoc2V0dGluZ3MudGl0bGVVcmwgIT09IFwiXCIpIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBzZXR0aW5ncy50aXRsZVVybCAlPicsXG4gICAgICAgICAgJzwlIH0gZWxzZSB7ICU+JyxcbiAgICAgICAgICAgICc8JS0gZmVlZC51cmwgJT4nLFxuICAgICAgICAgICc8JSB9ICU+XCIgJyxcbiAgICAgICAgICAgJ3RhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXIgbm9mb2xsb3dcIj4nLFxuICAgICAgICAgICc8JSBpZiAoc2V0dGluZ3MudGl0bGUgIT09IFwiXCIpIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBzZXR0aW5ncy50aXRsZSAlPicsXG4gICAgICAgICAgJzwlIH0gZWxzZSB7ICU+JyxcbiAgICAgICAgICAgICc8JS0gZmVlZC50aXRsZSAlPicsXG4gICAgICAgICAgJzwlIH0gJT4nLFxuICAgICAgICAnPC9hPicsXG4gICAgICAnPC9oZWFkZXI+J1xuICAgIF0sXG4gICAgcG9zdHM6IFtcbiAgICAgICc8ZGl2IGNsYXNzPVwiby1mZWVkX19pdGVtc1wiIHN0eWxlPVwiJyxcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogPCUtIHNldHRpbmdzLnBvc3RCb3JkZXJDb2xvciAlPjsnLFxuICAgICAgJ1wiPicsXG4gICAgICAgICc8JSBfZWFjaChpdGVtcywgZnVuY3Rpb24ocG9zdCkgeyAlPicsXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJjLWZlZWQtaXRlbSA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5mZWVkSXRlbSAlPlwiPicsXG4gICAgICAgICAgICAnPGg0IGNsYXNzPVwiYy1mZWVkLWl0ZW1fX3RpdGxlIDwlLSBzZXR0aW5ncy5jbGFzc2VzLnRpdGxlICU+XCI+JyxcbiAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2xpbmsgPCUtIHNldHRpbmdzLmNsYXNzZXMubGluayAlPlwiJyxcbiAgICAgICAgICAgICAgICAgJ2hyZWY9XCI8JS0gcG9zdC5ndWlkICU+XCInLFxuICAgICAgICAgICAgICAgICAndGFyZ2V0PVwiX2JsYW5rXCInLFxuICAgICAgICAgICAgICAgICAncmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiPicsXG4gICAgICAgICAgICAgICAgJzwlLSBwb3N0LnRpdGxlICU+JyxcbiAgICAgICAgICAgICAgJzwvYT4nLFxuICAgICAgICAgICAgJzwvaDQ+JyxcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImMtZmVlZC1pdGVtX19kYXRlIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmRhdGUgJT5cIiAnLFxuICAgICAgICAgICAgICAgICAgJ3RpdGxlPVwiPCUtIHNldHRpbmdzLnBvc3REYXRlVGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgICAnPCUtIHBvc3QuZGF0ZSAlPicsXG4gICAgICAgICAgICAnPC9zcGFuPicsXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtX190aHVtYm5haWwgPCUtIHNldHRpbmdzLmNsYXNzZXMudGh1bWJuYWlsICU+XCInLFxuICAgICAgICAgICAgICAgICAnc3R5bGU9XCInLFxuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZTogdXJsKDwlLSBwb3N0LnRodW1ibmFpbCAlPik7JyxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodDogPCUtIHNldHRpbmdzLnBvc3RJbWdIZWlnaHQgJT47XCInLFxuICAgICAgICAgICAgICAgICAnYXJpYS1oaWRkZW49XCJ0cnVlXCI+JyxcbiAgICAgICAgICAgICAgJzxpbWcgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIHNyYz1cIjwlLSBwb3N0LnRodW1ibmFpbCAlPlwiIGFsdD1cIjwlLSBwb3N0LnRpdGxlICU+XCI+JyxcbiAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgJzxwIGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2V4Y2VycHQgPCUtIHNldHRpbmdzLmNsYXNzZXMuZXhjZXJwdCAlPlwiPicsXG4gICAgICAgICAgICAgICc8JS0gcG9zdC5leGNlcnB0ICU+PCUtIHNldHRpbmdzLnBvc3RFeGNlcnB0VHJhaWwgJT4nLFxuICAgICAgICAgICAgJzwvcD4nLFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjLWZlZWQtaXRlbV9fZm9vdGVyIDwlLSBzZXR0aW5ncy5jbGFzc2VzLml0ZW1Gb290ZXIgJT5cIj4nLFxuICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJjLWZlZWQtaXRlbV9fY3RhIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmN0YSAlPlwiICcsXG4gICAgICAgICAgICAgICAgICdocmVmPVwiPCUtIHBvc3QuZ3VpZCAlPlwiICcsXG4gICAgICAgICAgICAgICAgICd0YXJnZXQ9XCJfYmxhbmtcIiAnLFxuICAgICAgICAgICAgICAgICAncmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiPicsXG4gICAgICAgICAgICAgICAgJzwlLSBzZXR0aW5ncy5wb3N0Q3RhVGV4dCAlPicsXG4gICAgICAgICAgICAgICc8L2E+JyxcbiAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPCUgfSk7ICU+JyxcbiAgICAgICc8L2Rpdj4nXG4gICAgXSxcbiAgICBjbG9zZXI6IFtcbiAgICAgICc8L3NlY3Rpb24+J1xuICAgIF1cbiAgfVxufTtcblxuLyoqXG4gKiBGdW5jdGlvbnMgZm9yIHByb2Nlc3NpbmcgdGhlIGRhdGEgYmFzZWQgb24gdGhlIGZlZWQgdHlwZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbkZlZWQucHJvY2VzcyA9IHtcbiAgbWVkaXVtOiBmdW5jdGlvbihkYXRhLCBzZXR0aW5ncykge1xuICAgIGxldCBsZW5ndGggPSBzZXR0aW5ncy5wb3N0RXhjZXJwdExlbmd0aDtcblxuICAgIF9mb3JFYWNoKGRhdGEuaXRlbXMsIGZ1bmN0aW9uKHBvc3QsIGluZGV4KSB7XG4gICAgICBsZXQgZXhjZXJwdCA9ICcnO1xuICAgICAgbGV0IGRhdGUgPSAnJztcblxuICAgICAgLy8gUmVtb3ZlIGZpZ3VyZXMgZmlyc3RcbiAgICAgIGV4Y2VycHQgPSBwb3N0LmRlc2NyaXB0aW9uXG4gICAgICAgIC5yZXBsYWNlKC88ZmlndXJlLio+Lio/PFxcL2ZpZ3VyZT4vZywgJycpO1xuXG4gICAgICAvLyBSZW1vdmUgYWxsIHRhZ3NcbiAgICAgIGV4Y2VycHQgPSBleGNlcnB0LnJlcGxhY2UoLzwoLnxcXG4pKj8+L2csICcnKTtcblxuICAgICAgLy8gVHJpbSB0aGUgZXhjZXJwdFxuICAgICAgZXhjZXJwdCA9IGV4Y2VycHQuc3Vic3RyKDAsIGxlbmd0aCk7XG4gICAgICBleGNlcnB0ID0gZXhjZXJwdC5zdWJzdHIoMCxcbiAgICAgICAgTWF0aC5taW4oZXhjZXJwdC5sZW5ndGgsIGV4Y2VycHQubGFzdEluZGV4T2YoJyAnKSlcbiAgICAgICk7XG5cbiAgICAgIHBvc3QuZXhjZXJwdCA9IGV4Y2VycHQ7XG5cbiAgICAgIC8vIEZvcm1hdCB0aGUgZGF0ZVxuICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UocG9zdC5wdWJEYXRlLnJlcGxhY2UoJyAnLCAnVCcpKSlcbiAgICAgICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzZXR0aW5ncy5wb3N0RGF0ZUxvY2FsLCBzZXR0aW5ncy5wb3N0RGF0ZUZvcm1hdCk7XG5cbiAgICAgIHBvc3QuZGF0ZSA9IGRhdGU7XG5cbiAgICAgIHJldHVybiBwb3N0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBGdW5jdGlvbnMgZm9yIG1lcmdpbmcgdGhlIGRhdGEgZmVlZHMgdG9nZXRoZXIsIGJhc2VkIG9uIHRoZSBmZWVkIHR5cGUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5GZWVkLm1lcmdlID0ge1xuICBtZWRpdW06IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgbWVyZ2VkID0ge307XG4gICAgbGV0IGl0ZW1zID0gW107XG5cbiAgICAvLyBDb21iaW5lIHRoZSBwb3N0IGl0ZW1zXG4gICAgZGF0YS5mb3JFYWNoKChmZWVkKSA9PiB7XG4gICAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChmZWVkLml0ZW1zKTtcbiAgICB9KTtcblxuICAgIC8vIE1lcmdlIHRoZSBkYXRhLCB0aGlzIHdpbGwgb3ZlcnJpZGUgdmFsdWVzLCBpdCBwcm9iYWJseSB3b24ndCBiZVxuICAgIC8vIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIGZlZWRzIHRoYXQgYXJlIHRoZSBzYW1lLCBidXQgcG90ZW50aWFsbHlcbiAgICAvLyBkaWZmZXJlbnQgZmVlZCB0eXBlcyBjb3VsZCB1c2UgdGhpcyBhbmQgY29tYmluZSB1bmlxdWUgZGF0YVxuICAgIGRhdGEuZm9yRWFjaCgoZmVlZCkgPT4ge1xuICAgICAgbWVyZ2VkID0gX21lcmdlKG1lcmdlZCwgZmVlZCk7XG4gICAgfSk7XG5cbiAgICAvLyBHZXQgdW5pcXVlIHBvc3RzXG4gICAgaXRlbXMgPSBfdW5pcUJ5KGl0ZW1zLCAoaXRlbSkgPT4gaXRlbS5ndWlkKTtcblxuICAgIG1lcmdlZC5pdGVtcyA9IF9vcmRlckJ5KGl0ZW1zLCAncHViRGF0ZScsICdkZXNjJyk7XG5cbiAgICByZXR1cm4gbWVyZ2VkO1xuICB9XG59XG5cbi8qKlxuICogU2VlIGh0dHBzOi8vcnNzMmpzb24uY29tL2RvY3MgZm9yIGRldGFpbHMgb24gZGVmYXVsdCBwYXJhbWV0ZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5GZWVkLmRlZmF1bHQgPSB7XG4gIGZlZWQ6ICcnLFxuICBzZWxlY3RvcjogJyNqcy1mZWVkJyxcbiAgdHlwZTogJ21lZGl1bScsXG4gIHRpdGxlOiAnJyxcbiAgdGl0bGVVcmw6ICcnLFxuICBwcm9maWxlSW1nOiAnJyxcbiAgZm9udFNpemU6ICcnLFxuICByYXRpb1Byb2ZpbGU6IFsnNTAnLCAnNTAnXSxcbiAgcG9zdEJvcmRlckNvbG9yOiAnbGlnaHRzdGVlbGJsdWUnLFxuICBwb3N0SW1nSGVpZ2h0OiAnMjAwcHgnLFxuICBwb3N0RXhjZXJwdExlbmd0aDogMTIwLFxuICBwb3N0RXhjZXJwdFRyYWlsOiAn4oCmJyxcbiAgcG9zdEN0YVRleHQ6ICdSZWFkIHRoZSBmdWxsIHBvc3QnLFxuICBwb3N0RGF0ZUxvY2FsOiAnZW4tVVMnLFxuICBwb3N0RGF0ZUZvcm1hdDoge1xuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBtb250aDogJ2xvbmcnLFxuICAgIGRheTogJ251bWVyaWMnXG4gIH0sXG4gIHBvc3REYXRlVGl0bGU6ICdQdWJsaXNoZWQgRGF0ZScsXG4gIGNsYXNzZXM6IHtcbiAgICB3cmFwcGVyOiAnJyxcbiAgICBoZWFkZXI6ICcnLFxuICAgIHVybDogJycsXG4gICAgZmVlZEl0ZW06ICcnLFxuICAgIHRpdGxlOiAnJyxcbiAgICBsaW5rOiAnJyxcbiAgICB0aHVtYm5haWw6ICcnLFxuICAgIGV4Y2VycHQ6ICcnLFxuICAgIGl0ZW1Gb290ZXI6ICcnLFxuICAgIGN0YTogJycsXG4gICAgZGF0ZTogJydcbiAgfSxcbiAgdGVtcGxhdGVzOiB7XG4gICAgb3BlbmVyOiBGZWVkLnRlbXBsYXRlcy5tZWRpdW0ub3BlbmVyLmpvaW4oJycpLFxuICAgIGhlYWRlcjogRmVlZC50ZW1wbGF0ZXMubWVkaXVtLmhlYWRlci5qb2luKCcnKSxcbiAgICBwb3N0czogRmVlZC50ZW1wbGF0ZXMubWVkaXVtLnBvc3RzLmpvaW4oJycpLFxuICAgIGNsb3NlcjogRmVlZC50ZW1wbGF0ZXMubWVkaXVtLmNsb3Nlci5qb2luKCcnKVxuICB9LFxuICBsb2c6IGZhbHNlLFxuICB1bmlxdWU6IGZhbHNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGZWVkO1xuIl0sIm5hbWVzIjpbImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJPYmplY3QiLCJmcmVlU2VsZiIsInNlbGYiLCJyb290IiwiRnVuY3Rpb24iLCJTeW1ib2wiLCJvYmplY3RQcm90byIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwibmF0aXZlT2JqZWN0VG9TdHJpbmciLCJ0b1N0cmluZyIsInN5bVRvU3RyaW5nVGFnIiwidG9TdHJpbmdUYWciLCJ1bmRlZmluZWQiLCJnZXRSYXdUYWciLCJ2YWx1ZSIsImlzT3duIiwiY2FsbCIsInRhZyIsInVubWFza2VkIiwiZSIsInJlc3VsdCIsIm9iamVjdFRvU3RyaW5nIiwibnVsbFRhZyIsInVuZGVmaW5lZFRhZyIsImJhc2VHZXRUYWciLCJpc09iamVjdCIsInR5cGUiLCJhc3luY1RhZyIsImZ1bmNUYWciLCJnZW5UYWciLCJwcm94eVRhZyIsImlzRnVuY3Rpb24iLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsImV4ZWMiLCJrZXlzIiwiSUVfUFJPVE8iLCJpc01hc2tlZCIsImZ1bmMiLCJmdW5jUHJvdG8iLCJmdW5jVG9TdHJpbmciLCJ0b1NvdXJjZSIsInJlUmVnRXhwQ2hhciIsInJlSXNIb3N0Q3RvciIsInJlSXNOYXRpdmUiLCJSZWdFeHAiLCJyZXBsYWNlIiwiYmFzZUlzTmF0aXZlIiwicGF0dGVybiIsInRlc3QiLCJnZXRWYWx1ZSIsIm9iamVjdCIsImtleSIsImdldE5hdGl2ZSIsImRlZmluZVByb3BlcnR5IiwiYmFzZUFzc2lnblZhbHVlIiwiZXEiLCJvdGhlciIsImFzc2lnblZhbHVlIiwib2JqVmFsdWUiLCJjb3B5T2JqZWN0Iiwic291cmNlIiwicHJvcHMiLCJjdXN0b21pemVyIiwiaXNOZXciLCJpbmRleCIsImxlbmd0aCIsIm5ld1ZhbHVlIiwiaWRlbnRpdHkiLCJhcHBseSIsInRoaXNBcmciLCJhcmdzIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsIm92ZXJSZXN0Iiwic3RhcnQiLCJ0cmFuc2Zvcm0iLCJhcmd1bWVudHMiLCJhcnJheSIsIkFycmF5Iiwib3RoZXJBcmdzIiwiY29uc3RhbnQiLCJiYXNlU2V0VG9TdHJpbmciLCJzdHJpbmciLCJIT1RfQ09VTlQiLCJIT1RfU1BBTiIsIm5hdGl2ZU5vdyIsIkRhdGUiLCJub3ciLCJzaG9ydE91dCIsImNvdW50IiwibGFzdENhbGxlZCIsInN0YW1wIiwicmVtYWluaW5nIiwic2V0VG9TdHJpbmciLCJiYXNlUmVzdCIsIk1BWF9TQUZFX0lOVEVHRVIiLCJpc0xlbmd0aCIsImlzQXJyYXlMaWtlIiwicmVJc1VpbnQiLCJpc0luZGV4IiwiaXNJdGVyYXRlZUNhbGwiLCJjcmVhdGVBc3NpZ25lciIsImFzc2lnbmVyIiwic291cmNlcyIsImd1YXJkIiwiYmFzZVRpbWVzIiwibiIsIml0ZXJhdGVlIiwiaXNPYmplY3RMaWtlIiwiYXJnc1RhZyIsImJhc2VJc0FyZ3VtZW50cyIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiaXNBcmd1bWVudHMiLCJpc0FycmF5Iiwic3R1YkZhbHNlIiwiZnJlZUV4cG9ydHMiLCJleHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlIiwibW9kdWxlRXhwb3J0cyIsIkJ1ZmZlciIsIm5hdGl2ZUlzQnVmZmVyIiwiaXNCdWZmZXIiLCJhcnJheVRhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJtYXBUYWciLCJudW1iZXJUYWciLCJvYmplY3RUYWciLCJyZWdleHBUYWciLCJzZXRUYWciLCJzdHJpbmdUYWciLCJ3ZWFrTWFwVGFnIiwiYXJyYXlCdWZmZXJUYWciLCJkYXRhVmlld1RhZyIsImZsb2F0MzJUYWciLCJmbG9hdDY0VGFnIiwiaW50OFRhZyIsImludDE2VGFnIiwiaW50MzJUYWciLCJ1aW50OFRhZyIsInVpbnQ4Q2xhbXBlZFRhZyIsInVpbnQxNlRhZyIsInVpbnQzMlRhZyIsInR5cGVkQXJyYXlUYWdzIiwiYmFzZUlzVHlwZWRBcnJheSIsImJhc2VVbmFyeSIsImZyZWVQcm9jZXNzIiwicHJvY2VzcyIsIm5vZGVVdGlsIiwidHlwZXMiLCJyZXF1aXJlIiwiYmluZGluZyIsIm5vZGVJc1R5cGVkQXJyYXkiLCJpc1R5cGVkQXJyYXkiLCJhcnJheUxpa2VLZXlzIiwiaW5oZXJpdGVkIiwiaXNBcnIiLCJpc0FyZyIsImlzQnVmZiIsImlzVHlwZSIsInNraXBJbmRleGVzIiwiU3RyaW5nIiwicHVzaCIsImlzUHJvdG90eXBlIiwiQ3RvciIsImNvbnN0cnVjdG9yIiwicHJvdG8iLCJuYXRpdmVLZXlzSW4iLCJiYXNlS2V5c0luIiwiaXNQcm90byIsImtleXNJbiIsImFzc2lnbkluV2l0aCIsInNyY0luZGV4Iiwib3ZlckFyZyIsImFyZyIsImdldFByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwib2JqZWN0Q3RvclN0cmluZyIsImlzUGxhaW5PYmplY3QiLCJkb21FeGNUYWciLCJpc0Vycm9yIiwibWVzc2FnZSIsIm5hbWUiLCJhdHRlbXB0IiwiRXJyb3IiLCJhcnJheU1hcCIsImJhc2VWYWx1ZXMiLCJjdXN0b21EZWZhdWx0c0Fzc2lnbkluIiwic3JjVmFsdWUiLCJzdHJpbmdFc2NhcGVzIiwiZXNjYXBlU3RyaW5nQ2hhciIsImNociIsIm5hdGl2ZUtleXMiLCJiYXNlS2V5cyIsInJlSW50ZXJwb2xhdGUiLCJiYXNlUHJvcGVydHlPZiIsImh0bWxFc2NhcGVzIiwiZXNjYXBlSHRtbENoYXIiLCJzeW1ib2xUYWciLCJpc1N5bWJvbCIsIklORklOSVRZIiwic3ltYm9sUHJvdG8iLCJzeW1ib2xUb1N0cmluZyIsImJhc2VUb1N0cmluZyIsInJlVW5lc2NhcGVkSHRtbCIsInJlSGFzVW5lc2NhcGVkSHRtbCIsImVzY2FwZSIsInJlRXNjYXBlIiwicmVFdmFsdWF0ZSIsInRlbXBsYXRlU2V0dGluZ3MiLCJyZUVtcHR5U3RyaW5nTGVhZGluZyIsInJlRW1wdHlTdHJpbmdNaWRkbGUiLCJyZUVtcHR5U3RyaW5nVHJhaWxpbmciLCJyZUVzVGVtcGxhdGUiLCJyZU5vTWF0Y2giLCJyZVVuZXNjYXBlZFN0cmluZyIsInRlbXBsYXRlIiwib3B0aW9ucyIsInNldHRpbmdzIiwiaW1wb3J0cyIsIl8iLCJpbXBvcnRzS2V5cyIsImltcG9ydHNWYWx1ZXMiLCJpc0VzY2FwaW5nIiwiaXNFdmFsdWF0aW5nIiwiaW50ZXJwb2xhdGUiLCJyZURlbGltaXRlcnMiLCJldmFsdWF0ZSIsInNvdXJjZVVSTCIsIm1hdGNoIiwiZXNjYXBlVmFsdWUiLCJpbnRlcnBvbGF0ZVZhbHVlIiwiZXNUZW1wbGF0ZVZhbHVlIiwiZXZhbHVhdGVWYWx1ZSIsIm9mZnNldCIsInNsaWNlIiwidmFyaWFibGUiLCJhcnJheUVhY2giLCJjcmVhdGVCYXNlRm9yIiwiZnJvbVJpZ2h0Iiwia2V5c0Z1bmMiLCJpdGVyYWJsZSIsImJhc2VGb3IiLCJiYXNlRm9yT3duIiwiY3JlYXRlQmFzZUVhY2giLCJlYWNoRnVuYyIsImNvbGxlY3Rpb24iLCJiYXNlRWFjaCIsImNhc3RGdW5jdGlvbiIsImZvckVhY2giLCJsaXN0Q2FjaGVDbGVhciIsIl9fZGF0YV9fIiwic2l6ZSIsImFzc29jSW5kZXhPZiIsImFycmF5UHJvdG8iLCJzcGxpY2UiLCJsaXN0Q2FjaGVEZWxldGUiLCJkYXRhIiwibGFzdEluZGV4IiwicG9wIiwibGlzdENhY2hlR2V0IiwibGlzdENhY2hlSGFzIiwibGlzdENhY2hlU2V0IiwiTGlzdENhY2hlIiwiZW50cmllcyIsImNsZWFyIiwiZW50cnkiLCJzZXQiLCJnZXQiLCJoYXMiLCJzdGFja0NsZWFyIiwic3RhY2tEZWxldGUiLCJzdGFja0dldCIsInN0YWNrSGFzIiwiTWFwIiwibmF0aXZlQ3JlYXRlIiwiaGFzaENsZWFyIiwiaGFzaERlbGV0ZSIsIkhBU0hfVU5ERUZJTkVEIiwiaGFzaEdldCIsImhhc2hIYXMiLCJoYXNoU2V0IiwiSGFzaCIsIm1hcENhY2hlQ2xlYXIiLCJpc0tleWFibGUiLCJnZXRNYXBEYXRhIiwibWFwIiwibWFwQ2FjaGVEZWxldGUiLCJtYXBDYWNoZUdldCIsIm1hcENhY2hlSGFzIiwibWFwQ2FjaGVTZXQiLCJNYXBDYWNoZSIsIkxBUkdFX0FSUkFZX1NJWkUiLCJzdGFja1NldCIsInBhaXJzIiwiU3RhY2siLCJhc3NpZ25NZXJnZVZhbHVlIiwiYWxsb2NVbnNhZmUiLCJjbG9uZUJ1ZmZlciIsImJ1ZmZlciIsImlzRGVlcCIsImNvcHkiLCJVaW50OEFycmF5IiwiY2xvbmVBcnJheUJ1ZmZlciIsImFycmF5QnVmZmVyIiwiYnl0ZUxlbmd0aCIsImNsb25lVHlwZWRBcnJheSIsInR5cGVkQXJyYXkiLCJieXRlT2Zmc2V0IiwiY29weUFycmF5Iiwib2JqZWN0Q3JlYXRlIiwiY3JlYXRlIiwiYmFzZUNyZWF0ZSIsImluaXRDbG9uZU9iamVjdCIsImlzQXJyYXlMaWtlT2JqZWN0Iiwic2FmZUdldCIsInRvUGxhaW5PYmplY3QiLCJiYXNlTWVyZ2VEZWVwIiwibWVyZ2VGdW5jIiwic3RhY2siLCJzdGFja2VkIiwiaXNDb21tb24iLCJpc1R5cGVkIiwiYmFzZU1lcmdlIiwibWVyZ2UiLCJ2YWx1ZXMiLCJzZXRDYWNoZUFkZCIsInNldENhY2hlSGFzIiwiU2V0Q2FjaGUiLCJhZGQiLCJhcnJheVNvbWUiLCJwcmVkaWNhdGUiLCJjYWNoZUhhcyIsImNhY2hlIiwiQ09NUEFSRV9QQVJUSUFMX0ZMQUciLCJDT01QQVJFX1VOT1JERVJFRF9GTEFHIiwiZXF1YWxBcnJheXMiLCJiaXRtYXNrIiwiZXF1YWxGdW5jIiwiaXNQYXJ0aWFsIiwiYXJyTGVuZ3RoIiwib3RoTGVuZ3RoIiwic2VlbiIsImFyclZhbHVlIiwib3RoVmFsdWUiLCJjb21wYXJlZCIsIm90aEluZGV4IiwibWFwVG9BcnJheSIsInNldFRvQXJyYXkiLCJzeW1ib2xWYWx1ZU9mIiwidmFsdWVPZiIsImVxdWFsQnlUYWciLCJjb252ZXJ0IiwiYXJyYXlQdXNoIiwiYmFzZUdldEFsbEtleXMiLCJzeW1ib2xzRnVuYyIsImFycmF5RmlsdGVyIiwicmVzSW5kZXgiLCJzdHViQXJyYXkiLCJuYXRpdmVHZXRTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0U3ltYm9scyIsInN5bWJvbCIsImdldEFsbEtleXMiLCJlcXVhbE9iamVjdHMiLCJvYmpQcm9wcyIsIm9iakxlbmd0aCIsIm90aFByb3BzIiwic2tpcEN0b3IiLCJvYmpDdG9yIiwib3RoQ3RvciIsIkRhdGFWaWV3IiwiUHJvbWlzZSIsIlNldCIsIldlYWtNYXAiLCJwcm9taXNlVGFnIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwibWFwQ3RvclN0cmluZyIsInByb21pc2VDdG9yU3RyaW5nIiwic2V0Q3RvclN0cmluZyIsIndlYWtNYXBDdG9yU3RyaW5nIiwiZ2V0VGFnIiwiQXJyYXlCdWZmZXIiLCJyZXNvbHZlIiwiY3RvclN0cmluZyIsImJhc2VJc0VxdWFsRGVlcCIsIm9iaklzQXJyIiwib3RoSXNBcnIiLCJvYmpUYWciLCJvdGhUYWciLCJvYmpJc09iaiIsIm90aElzT2JqIiwiaXNTYW1lVGFnIiwib2JqSXNXcmFwcGVkIiwib3RoSXNXcmFwcGVkIiwib2JqVW53cmFwcGVkIiwib3RoVW53cmFwcGVkIiwiYmFzZUlzRXF1YWwiLCJiYXNlSXNNYXRjaCIsIm1hdGNoRGF0YSIsIm5vQ3VzdG9taXplciIsImlzU3RyaWN0Q29tcGFyYWJsZSIsImdldE1hdGNoRGF0YSIsIm1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIiwiYmFzZU1hdGNoZXMiLCJyZUlzRGVlcFByb3AiLCJyZUlzUGxhaW5Qcm9wIiwiaXNLZXkiLCJGVU5DX0VSUk9SX1RFWFQiLCJtZW1vaXplIiwicmVzb2x2ZXIiLCJUeXBlRXJyb3IiLCJtZW1vaXplZCIsIkNhY2hlIiwiTUFYX01FTU9JWkVfU0laRSIsIm1lbW9pemVDYXBwZWQiLCJyZVByb3BOYW1lIiwicmVFc2NhcGVDaGFyIiwic3RyaW5nVG9QYXRoIiwiY2hhckNvZGVBdCIsIm51bWJlciIsInF1b3RlIiwic3ViU3RyaW5nIiwiY2FzdFBhdGgiLCJ0b0tleSIsImJhc2VHZXQiLCJwYXRoIiwiZGVmYXVsdFZhbHVlIiwiYmFzZUhhc0luIiwiaGFzUGF0aCIsImhhc0Z1bmMiLCJoYXNJbiIsImJhc2VNYXRjaGVzUHJvcGVydHkiLCJiYXNlUHJvcGVydHkiLCJiYXNlUHJvcGVydHlEZWVwIiwicHJvcGVydHkiLCJiYXNlSXRlcmF0ZWUiLCJiYXNlTWFwIiwiYmFzZVNvcnRCeSIsImNvbXBhcmVyIiwic29ydCIsImNvbXBhcmVBc2NlbmRpbmciLCJ2YWxJc0RlZmluZWQiLCJ2YWxJc051bGwiLCJ2YWxJc1JlZmxleGl2ZSIsInZhbElzU3ltYm9sIiwib3RoSXNEZWZpbmVkIiwib3RoSXNOdWxsIiwib3RoSXNSZWZsZXhpdmUiLCJvdGhJc1N5bWJvbCIsImNvbXBhcmVNdWx0aXBsZSIsIm9yZGVycyIsIm9iakNyaXRlcmlhIiwiY3JpdGVyaWEiLCJvdGhDcml0ZXJpYSIsIm9yZGVyc0xlbmd0aCIsIm9yZGVyIiwiYmFzZU9yZGVyQnkiLCJpdGVyYXRlZXMiLCJvcmRlckJ5IiwiYmFzZUZpbmRJbmRleCIsImZyb21JbmRleCIsImJhc2VJc05hTiIsInN0cmljdEluZGV4T2YiLCJiYXNlSW5kZXhPZiIsImFycmF5SW5jbHVkZXMiLCJhcnJheUluY2x1ZGVzV2l0aCIsImNvbXBhcmF0b3IiLCJub29wIiwiY3JlYXRlU2V0IiwiYmFzZVVuaXEiLCJpbmNsdWRlcyIsIm91dGVyIiwiY29tcHV0ZWQiLCJzZWVuSW5kZXgiLCJ1bmlxQnkiLCJGZWVkIiwiY29uZmlnIiwiX3NldHRpbmdzIiwiX21lcmdlIiwiaW5pdCIsImxldCIsImZlZWQiLCJyc3NUb0pzb24iLCJyc3NVcmwiLCJfZm9yRWFjaCIsInVybCIsInRoaXMiLCJfcmVxdWVzdCIsInRoZW4iLCJyZXNwb25zZSIsIl9wcm9jZXNzIiwiSlNPTiIsInBhcnNlIiwidGhpcyQxIiwiY29tcGlsZWQiLCJfcmVuZGVyIiwiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsImlubmVySFRNTCIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwiZXZlbnQiLCJfeGhyIiwidGFyZ2V0IiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIm9udGltZW91dCIsIm9wZW4iLCJzZW5kIiwibG9nIiwiY29uc29sZSIsImRpciIsIl92YWx1ZXMiLCJ0ZW1wbGF0ZXMiLCJqb2luIiwiX3RlbXBsYXRlIiwibWVkaXVtIiwib3BlbmVyIiwiaGVhZGVyIiwicG9zdHMiLCJjbG9zZXIiLCJwb3N0RXhjZXJwdExlbmd0aCIsIml0ZW1zIiwicG9zdCIsImV4Y2VycHQiLCJkYXRlIiwiZGVzY3JpcHRpb24iLCJzdWJzdHIiLCJtaW4iLCJsYXN0SW5kZXhPZiIsInB1YkRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJwb3N0RGF0ZUxvY2FsIiwicG9zdERhdGVGb3JtYXQiLCJtZXJnZWQiLCJjb25jYXQiLCJfdW5pcUJ5IiwiaXRlbSIsImd1aWQiLCJfb3JkZXJCeSIsInRpdGxlIiwidGl0bGVVcmwiLCJwcm9maWxlSW1nIiwiZm9udFNpemUiLCJyYXRpb1Byb2ZpbGUiLCJwb3N0Qm9yZGVyQ29sb3IiLCJwb3N0SW1nSGVpZ2h0IiwicG9zdEV4Y2VycHRUcmFpbCIsInBvc3RDdGFUZXh0IiwieWVhciIsIm1vbnRoIiwiZGF5IiwicG9zdERhdGVUaXRsZSIsImNsYXNzZXMiLCJ3cmFwcGVyIiwiZmVlZEl0ZW0iLCJsaW5rIiwidGh1bWJuYWlsIiwiaXRlbUZvb3RlciIsImN0YSIsInVuaXF1ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLFVBQVUsR0FBRyxPQUFPQyxNQUFQLElBQWlCLFFBQWpCLElBQTZCQSxNQUE3QixJQUF1Q0EsTUFBTSxDQUFDQyxNQUFQLEtBQWtCQSxNQUF6RCxJQUFtRUQsTUFBcEY7Ozs7QUNFQSxJQUFJRSxRQUFRLEdBQUcsT0FBT0MsSUFBUCxJQUFlLFFBQWYsSUFBMkJBLElBQTNCLElBQW1DQSxJQUFJLENBQUNGLE1BQUwsS0FB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
