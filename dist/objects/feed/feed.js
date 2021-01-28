var Feed = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.8.2',
	  mode:  'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) {
	      createNonEnumerableProperty(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject(returnMethod.call(iterator)).value;
	  }
	};

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	var $AggregateError = function AggregateError(errors, message) {
	  var that = this;
	  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
	  if (objectSetPrototypeOf) {
	    // eslint-disable-next-line unicorn/error-message
	    that = objectSetPrototypeOf(new Error(undefined), objectGetPrototypeOf(that));
	  }
	  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
	  var errorsArray = [];
	  iterate(errors, errorsArray.push, { that: errorsArray });
	  createNonEnumerableProperty(that, 'errors', errorsArray);
	  return that;
	};

	$AggregateError.prototype = objectCreate(Error.prototype, {
	  constructor: createPropertyDescriptor(5, $AggregateError),
	  message: createPropertyDescriptor(5, ''),
	  name: createPropertyDescriptor(5, 'AggregateError')
	});

	// `AggregateError` constructor
	// https://tc39.es/ecma262/#sec-aggregate-error-constructor
	_export({ global: true }, {
	  AggregateError: $AggregateError
	});

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var SPECIES$1 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (engineIsNode) {
	    defer = function (id) {
	      process.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global_1.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails(post)
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task.set;




	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var document$2 = global_1.document;
	var process$1 = global_1.process;
	var Promise$1 = global_1.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  // Node.js without promises
	  } else if (engineIsNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$5
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var process$2 = global_1.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var task$1 = task.set;











	var SPECIES$2 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$3 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && global_1.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$2] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$3.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task$1.call(global_1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  task$1.call(global_1, function () {
	    var promise = state.facade;
	    if (engineIsNode) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = engineIsNode ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `Promise.allSettled` method
	// https://tc39.es/ecma262/#sec-promise.allsettled
	_export({ target: 'Promise', stat: true }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapability.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'fulfilled', value: value };
	          --remaining || resolve(values);
	        }, function (error) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'rejected', reason: error };
	          --remaining || resolve(values);
	        });
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var PROMISE_ANY_ERROR = 'No one promise resolved';

	// `Promise.any` method
	// https://tc39.es/ecma262/#sec-promise.any
	_export({ target: 'Promise', stat: true }, {
	  any: function any(iterable) {
	    var C = this;
	    var capability = newPromiseCapability.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$1(C.resolve);
	      var errors = [];
	      var counter = 0;
	      var remaining = 1;
	      var alreadyResolved = false;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyRejected = false;
	        errors.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyResolved = true;
	          resolve(value);
	        }, function (error) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyRejected = true;
	          errors[index] = error;
	          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
	        });
	      });
	      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
	  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// patch native Promise.prototype for native async functions
	if ( typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
	  redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
	}

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR$3)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$2(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var promise$1 = path.Promise;

	// `Promise.try` method
	// https://github.com/tc39/proposal-promise-try
	_export({ target: 'Promise', stat: true }, {
	  'try': function (callbackfn) {
	    var promiseCapability = newPromiseCapability.f(this);
	    var result = perform(callbackfn);
	    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
	    return promiseCapability.promise;
	  }
	});

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Built-in value references. */
	var Symbol$2 = root.Symbol;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
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
	function objectToString$1(value) {
	  return nativeObjectToString$1.call(value);
	}

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

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
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? getRawTag(value)
	    : objectToString$1(value);
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
	function isObject$1(value) {
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
	  if (!isObject$1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
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
	      return (func + '');
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
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject$1(value) || isMasked(value)) {
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

	var defineProperty$1 = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

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
	  if (key == '__proto__' && defineProperty$1) {
	    defineProperty$1(object, key, {
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
	  return value === other || (value !== value && other !== other);
	}

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

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
	  if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
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

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

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
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
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
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
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
	  return function() {
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
	var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
	  return defineProperty$1(func, 'toString', {
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

	  return function() {
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
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
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
	  if (!isObject$1(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
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
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

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
	var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

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
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty$4.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
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
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
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
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

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
	var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

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
	    if ((inherited || hasOwnProperty$5.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
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
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$6;

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
	var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject$1(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$6.call(object, key)))) {
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
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
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
	  return function(arg) {
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
	var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

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
	  var Ctor = hasOwnProperty$7.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString$2.call(Ctor) == objectCtorString;
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
	  return tag == errorTag$1 || tag == domExcTag ||
	    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
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
	var attempt = baseRest(function(func, args) {
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
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

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
	  if (objValue === undefined ||
	      (eq(objValue, objectProto$9[key]) && !hasOwnProperty$8.call(object, key))) {
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
	var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

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
	    if (hasOwnProperty$9.call(object, key) && key != 'constructor') {
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
	function keys$1(object) {
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
	  return function(key) {
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
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
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
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
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
	function toString$1(value) {
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
	  string = toString$1(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
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
	    '_': { 'escape': escape }
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
	var hasOwnProperty$a = objectProto$b.hasOwnProperty;

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
	  string = toString$1(string);
	  options = assignInWith({}, options, settings, customDefaultsAssignIn);

	  var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
	      importsKeys = keys$1(imports),
	      importsValues = baseValues(imports, importsKeys);

	  var isEscaping,
	      isEvaluating,
	      index = 0,
	      interpolate = options.interpolate || reNoMatch,
	      source = "__p += '";

	  // Compile the regexp to match each delimiter.
	  var reDelimiters = RegExp(
	    (options.escape || reNoMatch).source + '|' +
	    interpolate.source + '|' +
	    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	    (options.evaluate || reNoMatch).source + '|$'
	  , 'g');

	  // Use a sourceURL for easier debugging.
	  // The sourceURL gets injected into the source that's eval-ed, so be careful
	  // with lookup (in case of e.g. prototype pollution), and strip newlines if any.
	  // A newline wouldn't be a valid sourceURL anyway, and it'd enable code injection.
	  var sourceURL = hasOwnProperty$a.call(options, 'sourceURL')
	    ? ('//# sourceURL=' +
	       (options.sourceURL + '').replace(/[\r\n]/g, ' ') +
	       '\n')
	    : '';

	  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	    interpolateValue || (interpolateValue = esTemplateValue);

	    // Escape characters that can't be included in string literals.
	    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	    // Replace delimiters with snippets.
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
	    index = offset + match.length;

	    // The JS engine embedded in Adobe products needs `match` returned in
	    // order to produce the correct `offset` value.
	    return match;
	  });

	  source += "';\n";

	  // If `variable` is not specified wrap a with-statement around the generated
	  // code to add the data object to the top of the scope chain.
	  // Like with sourceURL, we take care to not check the option's prototype,
	  // as this configuration is a code injection vector.
	  var variable = hasOwnProperty$a.call(options, 'variable') && options.variable;
	  if (!variable) {
	    source = 'with (obj) {\n' + source + '\n}\n';
	  }
	  // Cleanup code by stripping empty strings.
	  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	    .replace(reEmptyStringMiddle, '$1')
	    .replace(reEmptyStringTrailing, '$1;');

	  // Frame code as the function body.
	  source = 'function(' + (variable || 'obj') + ') {\n' +
	    (variable
	      ? ''
	      : 'obj || (obj = {});\n'
	    ) +
	    "var __t, __p = ''" +
	    (isEscaping
	       ? ', __e = _.escape'
	       : ''
	    ) +
	    (isEvaluating
	      ? ', __j = Array.prototype.join;\n' +
	        "function print() { __p += __j.call(arguments, '') }\n"
	      : ';\n'
	    ) +
	    source +
	    'return __p\n}';

	  var result = attempt(function() {
	    return Function(importsKeys, sourceURL + 'return ' + source)
	      .apply(undefined, importsValues);
	  });

	  // Provide the compiled function's source by its `toString` method or
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
	  return function(object, iteratee, keysFunc) {
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
	  return object && baseFor(object, iteratee, keys$1);
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
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
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
	}

	// Add methods to `ListCache`.
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
	  this.__data__ = new ListCache;
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
	var hasOwnProperty$b = objectProto$c.hasOwnProperty;

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
	  return hasOwnProperty$b.call(data, key) ? data[key] : undefined;
	}

	/** Used for built-in method references. */
	var objectProto$d = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$c = objectProto$d.hasOwnProperty;

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
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$c.call(data, key);
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
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
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
	}

	// Add methods to `Hash`.
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
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
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
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
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
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
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
	}

	// Add methods to `MapCache`.
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
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
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
	}

	// Add methods to `Stack`.
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
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
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
	var objectCreate$1 = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject$1(proto)) {
	      return {};
	    }
	    if (objectCreate$1) {
	      return objectCreate$1(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
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
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject$1(objValue) || isFunction(objValue)) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
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
	  baseFor(source, function(srcValue, key) {
	    stack || (stack = new Stack);
	    if (isObject$1(srcValue)) {
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;

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
	var merge = createAssigner(function(object, source, srcIndex) {
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
	  return object == null ? [] : baseValues(object, keys$1(object));
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

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
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
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
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

	  map.forEach(function(value, key) {
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

	  set.forEach(function(value) {
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
	var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
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
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag$1:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
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
	      return object == (other + '');

	    case mapTag$1:
	      var convert = mapToArray;

	    case setTag$1:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG$1;

	      // Recursively compare objects (susceptible to call stack limits).
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
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
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
	  return baseGetAllKeys(object, keys$1, getSymbols);
	}

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$2 = 1;

	/** Used for built-in method references. */
	var objectProto$f = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$d = objectProto$f.hasOwnProperty;

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
	    if (!(isPartial ? key in other : hasOwnProperty$d.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
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
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
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
	var Promise$2 = getNative(root, 'Promise');

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	/* Built-in method references that are verified to be native. */
	var WeakMap$2 = getNative(root, 'WeakMap');

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
	    promiseCtorString = toSource(Promise$2),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap$2);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
	    (Map && getTag(new Map) != mapTag$2) ||
	    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag$2) ||
	    (WeakMap$2 && getTag(new WeakMap$2) != weakMapTag$1)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag$2 ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag$2;
	        case mapCtorString: return mapTag$2;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag$2;
	        case weakMapCtorString: return weakMapTag$1;
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
	var hasOwnProperty$e = objectProto$g.hasOwnProperty;

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
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
	    var objIsWrapped = objIsObj && hasOwnProperty$e.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty$e.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
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
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
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
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
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
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
	            : result
	          )) {
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
	  return value === value && !isObject$1(value);
	}

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys$1(object),
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
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
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
	  return function(object) {
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
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
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
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
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
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
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
	  var result = memoize(func, function(key) {
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
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (string.charCodeAt(0) === 46 /* . */) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
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
	  return isKey(value, object) ? [value] : stringToPath(toString$1(value));
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
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
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
	  return (index && index == length) ? object : undefined;
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
	function get$1(object, path, defaultValue) {
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
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
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
	  return function(object) {
	    var objValue = get$1(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
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
	  return function(object) {
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
	  return function(object) {
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
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
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

	  baseEach(collection, function(value, key, collection) {
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

	    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	        (valIsNull && othIsDefined && othIsReflexive) ||
	        (!valIsDefined && othIsReflexive) ||
	        !valIsReflexive) {
	      return 1;
	    }
	    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	        (othIsNull && valIsDefined && valIsReflexive) ||
	        (!othIsDefined && valIsReflexive) ||
	        !othIsReflexive) {
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
	  }
	  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
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

	  var result = baseMap(collection, function(value, key, collection) {
	    var criteria = arrayMap(iteratees, function(iteratee) {
	      return iteratee(value);
	    });
	    return { 'criteria': criteria, 'index': ++index, 'value': value };
	  });

	  return baseSortBy(result, function(object, other) {
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

	  while ((fromRight ? index-- : ++index < length)) {
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
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
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
	function arrayIncludes$1(array, value) {
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
	function noop() {
	  // No operation performed.
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
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY$2) ? noop : function(values) {
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
	      includes = arrayIncludes$1,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE$1) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
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
	    }
	    else if (!includes(seen, computed, comparator)) {
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
	  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee)) : [];
	}

	/**
	 * The Spinner module
	 *
	 * @class
	 */
	class Spinner {
	  /**
	   * The Spinner constructor
	   *
	   * @constructor
	   */
	  constructor(settings = {}) {
	    this.class = (settings.hasOwnProperty('class'))
	      ? settings.class : Spinner.class;

	    this.viewbox = (settings.hasOwnProperty('viewbox'))
	      ? settings.viewbox : Spinner.viewbox;

	    this.fill = (settings.hasOwnProperty('fill'))
	      ? settings.fill : Spinner.fill;

	    return this.create();
	  }

	  /**
	   * Programatically create the Spinner SVG and return the DOM element.
	   *
	   * @return  {DOM}  The Spinner SVG
	   */
	  create() {
	    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

	    this.el.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	    this.el.setAttribute('viewBox', this.viewbox);
	    this.el.setAttribute('version', '1.1');
	    this.el.setAttribute('class', `spinner ${this.class}`);

	    this.circle.setAttribute('cx', '12');
	    this.circle.setAttribute('cy', '12');
	    this.circle.setAttribute('r', '10');
	    this.circle.setAttribute('fill', this.fill);
	    this.circle.setAttribute('class', 'spinner__path');

	    this.el.appendChild(this.circle);

	    return this.el;
	  }
	}

	Spinner.class = 'icon-4';

	Spinner.viewbox = '0 0 24 24';

	Spinner.fill = 'none';

	/**
	 * Pattern Class
	 */
	class Feed {
	  constructor(config) {
	    this.default = Feed.default;

	    this._settings = merge({}, Feed.default, config);

	    this.init();
	  }

	  /**
	   * Initializes the module
	   */
	  init() {
	    // Create a loading animation
	    let el = document.querySelector(this._settings.selector);
	    let spinner = new Spinner();
	    let loading = document.createElement('div');

	    loading.setAttribute('class', 'o-feed__spinner');
	    loading.appendChild(spinner);
	    el.appendChild(loading);

	    let data = [];
	    let feed = this._settings.feed;
	    let config = {
	      rssToJson: this._settings.rssToJson,
	      rssUrl: (Array.isArray(feed)) ? feed : [feed]
	    };

	    // Go through each feed
	    forEach(config.rssUrl, (url, index) => {
	      // Make the request
	      this._request(config, url).then((response) => {
	          let json = JSON.parse(response);

	          /**
	           * If using the free Rss2Json converter
	           * @source https://rss2json.com
	           * else if using the NYCO self hosted Rss2Json converter
	           * @source https://github.com/CityOfNewYork/nyco-rss-2-json
	           */
	          if (config.rssToJson === Feed.rssToJson)
	            json = json; // do nothing
	          else if (config.rssToJson.includes('convertRssIntoJson?rssFeed='))
	            json = Feed.nycoRssToJson(json);
	          else
	            // eslint-disable-next-line no-console
	            console.warn('NYCO Feed Object: This RSS to JSON converter is not recognized.');

	          // Process the data
	          data.push(this._process(json, this._settings));

	          // When all feeds have been requested, merge the data and compile
	          if (data.length === config.rssUrl.length) {
	            let compiled = this._render(
	              this._merge(data, this._settings),
	              this._settings
	            );

	            if (el)
	              el.innerHTML = compiled;
	            else
	              // eslint-disable-next-line no-console
	              console.warn(`NYCO Feed Object: Couldn't find the element "${this._settings.selector}"`);
	          }
	      });
	    });

	    return this;
	  }

	  /**
	   * Create an XHR request for the feed data
	   *
	   * @param  {object} config The request data
	   * @param  {string} url    The request url
	   *
	   * @return {Promise}       Resolves when the response is ready, rejects when
	   *                         the operation times out or there is an error.
	   */
	  _request(config, url) {
	    return new Promise((resolve, reject) => {
	      let xhr = new XMLHttpRequest();

	      xhr.onreadystatechange = function(event) {
	        let _xhr = event.target;
	        if (_xhr.readyState === 4)
	          if (_xhr.status >= 200 && _xhr.status < 400)
	            resolve(_xhr.response);
	          else
	            reject(new Error(_xhr.status));
	      };

	      xhr.ontimeout = function() {
	        reject(new Error('The Feed request timed out'));
	      };

	      xhr.open('GET', `${config.rssToJson}${url}`, true);
	      xhr.send();
	      xhr = null;
	    });
	  }

	  /**
	   * Pass data to the appropriate processing function based on type
	   *
	   * @param  {object} data     The requested feed data to pass
	   * @param  {object} settings The application settings
	   *
	   * @return {object}          The processed data
	   */
	  _process(data, settings) {
	    return Feed.process[settings.type](data, settings);
	  }

	  /**
	   * Pass data to the appropriate merge function based on type
	   *
	   * @param  {object} data     The requested feed data to pass
	   * @param  {object} settings The application settings
	   *
	   * @return {object}          The merged feed data
	   */
	  _merge(data, settings) {
	    return Feed.merge[settings.type](data, settings);
	  }

	  /**
	   * Combine template components, pass data, and return compiled temlate
	   *
	   * @param  {object} data     The requested feed data to pass
	   * @param  {object} settings The application settings
	   *
	   * @return {string}          The complied html string
	   */
	  _render(data, settings) {
	    data.settings = settings;

	    // eslint-disable-next-line no-console
	    if (settings.log) console.dir(data);

	    let template$1 = values(settings.templates).join('');
	    let compiled = template(
	      template$1,
	      {
	        'imports': {
	          '_each': forEach
	        }
	      }
	    );

	    return compiled(data);
	  }
	}

	/**
	 * An open RSS to JSON api, see https://rss2json.com
	 * @type {String}
	 */
	Feed.rssToJson = 'https://api.rss2json.com/v1/api.json?rss_url=';

	/**
	 * The template for the widget.
	 * @type {String}
	 */
	Feed.templates = {
	  medium: {
	    opener: [
	      '<section class="o-feed <%- settings.classes.wrapper %>" style="',
	        '<% if (settings.fontSize) { %>font-size: <%- settings.fontSize %>;<% } %>',
	        '<% if (settings.postBorderColor) { %>border-color: <%- settings.postBorderColor %>;<% } %>',
	      '">'
	    ],
	    header: [
	      '<header class="o-feed__header <%- settings.classes.header %>">',
	        '<div class="o-feed__avatar <%- settings.classes.avatar %>">',
	          '<img src="',
	                '<% if (settings.profileImg !== "") { %>',
	                  '<%- settings.profileImg %>',
	                '<% } else { %>',
	                  '<%- feed.profileImg %>',
	                '<% } %>" ',
	               'width="<%- settings.ratioProfile[0] %>" ',
	               'height="<%- settings.ratioProfile[1] %>">',
	        '</div>',
	        '<a class="o-feed__url <%- settings.classes.avatar %>" ',
	          'href="<% if (settings.titleUrl !== "") { %>',
	            '<%- settings.titleUrl %>',
	          '<% } else { %>',
	            '<%- feed.url %>',
	          '<% } %>" ',
	           'target="_blank" rel="noopener noreferrer nofollow">',
	          '<% if (settings.title !== "") { %>',
	            '<%- settings.title %>',
	          '<% } else { %>',
	            '<%- feed.title %>',
	          '<% } %>',
	        '</a>',
	      '</header>'
	    ],
	    posts: [
	      '<div class="o-feed__items" style="',
	        'border-color: <%- settings.postBorderColor %>;',
	      '">',
	        '<% _each(items, function(post) { %>',
	          '<div class="c-feed-item <%- settings.classes.feedItem %>">',
	            '<h4 class="c-feed-item__title <%- settings.classes.title %>">',
	              '<a class="c-feed-item__link <%- settings.classes.link %>"',
	                 'href="<%- post.guid %>"',
	                 'target="_blank"',
	                 'rel="noopener noreferrer nofollow">',
	                '<%- post.title %>',
	              '</a>',
	            '</h4>',
	            '<p class="c-feed-item__date <%- settings.classes.date %>" ',
	                  'title="<%- settings.postDateTitle %>">',
	              '<small><em><%- post.date %></em></small>',
	            '</p>',
	            '<div class="c-feed-item__thumbnail <%- settings.classes.thumbnail %>"',
	                 'style="',
	                    'background-image: url(<%- post.thumbnail %>);',
	                    'height: <%- settings.postImgHeight %>;"',
	                 'aria-hidden="true">',
	              '<img style="display: none;" src="<%- post.thumbnail %>" alt="<%- post.title %>">',
	            '</div>',
	            '<p class="c-feed-item__excerpt <%- settings.classes.excerpt %>">',
	              '<%- post.excerpt %><%- settings.postExcerptTrail %>',
	            '</p>',
	            '<div class="c-feed-item__footer <%- settings.classes.itemFooter %>">',
	              '<a class="c-feed-item__cta <%- settings.classes.cta %>" ',
	                 'href="<%- post.guid %>" ',
	                 'target="_blank" ',
	                 'rel="noopener noreferrer nofollow">',
	                '<%- settings.postCtaText %>',
	              '</a>',
	            '</div>',
	          '</div>',
	        '<% }); %>',
	      '</div>'
	    ],
	    closer: [
	      '</section>'
	    ]
	  }
	};

	/**
	 * Data map for the NYCO RSS to JSON coverter.
	 *
	 * @param   {Object}  json  A json object containing the feed
	 *
	 * @return  {Object}        A json object that matches the template format
	 */
	Feed.nycoRssToJson = function(json) {
	  let feed = json[0];

	  return {
	    'status': 'ok',
	    'feed': {
	      'url': feed['atom:link'][0]['$']['href'],
	      'title': feed['title'],
	      'link': feed['link'],
	      'author': '',
	      'description': feed['description'],
	      'image': feed['image'][0]['url']
	    },
	    'items': feed['item'].map(i => {
	      // Get and parse the date
	      let date = new Date(Date.parse(i['pubDate']))
	        .toISOString().replace('.000Z', '');

	      // Get the GUID, they are inconsistently nested
	      let guid = (Array.isArray(i['guid']))
	        ? i['guid'][0]['_'] : i['guid']['_'];

	      // Get the first image of the content for the thumbnail. It
	      // seems the medium feed doesn't return this by default
	      // but rss2json.com provides it (but why!?)
	      let regex =  /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
	      let thumbnail = regex.exec(i['content:encoded'])[1];

	      return {
	        'title': i['title'],
	        'pubDate': date,
	        'link': i['link'],
	        'guid': guid,
	        'author': i['dc:creator'],
	        'thumbnail': thumbnail,
	        'description': i['content:encoded'],
	        'content': i['content:encoded'],
	        'enclosure': {},
	        'categories': i['category']
	      };
	    })
	  };
	};

	/**
	 * Functions for processing the data based on the feed type.
	 * @type {Object}
	 */
	Feed.process = {
	  medium: function(data, settings) {
	    let length = settings.postExcerptLength;

	    forEach(data.items, function(post, index) {
	      let excerpt = '';
	      let date = '';

	      // Remove figures first
	      excerpt = post.description
	        .replace(/<figure.*>.*?<\/figure>/g, '');

	      // Replace break tags with spaces
	      excerpt = excerpt.replace('<br>', ' ');

	      // Remove all tags
	      excerpt = excerpt.replace(/<(.|\n)*?>/g, '');

	      // Trim the excerpt
	      excerpt = excerpt.substr(0, length);
	      excerpt = excerpt.substr(0,
	        Math.min(excerpt.length, excerpt.lastIndexOf(' '))
	      );

	      post.excerpt = excerpt;

	      // Format the date
	      date = new Date(Date.parse(post.pubDate.replace(' ', 'T')))
	        .toLocaleDateString(settings.postDateLocal, settings.postDateFormat);

	      post.date = date;

	      return post;
	    });

	    return data;
	  }
	};

	/**
	 * Functions for merging the data feeds together, based on the feed type.
	 * @type {Object}
	 */
	Feed.merge = {
	  medium: function(data, settings) {
	    let merged = {};
	    let items = [];

	    // Combine the post items
	    data.forEach((feed) => {
	      items = items.concat(feed.items);
	    });

	    // Merge the data, this will override values, it probably won't be
	    // particularly useful for feeds that are the same, but potentially
	    // different feed types could use this and combine unique data
	    data.forEach((feed) => {
	      merged = merge(merged, feed);
	    });

	    // Get unique posts
	    if (settings.unique)
	      items = uniqBy(items, (item) => item.guid);

	    merged.items = orderBy(items, 'pubDate', 'desc');

	    return merged;
	  }
	};

	/**
	 * See https://rss2json.com/docs for details on default parameters
	 * @type {Object}
	 */
	Feed.default = {
	  feed: '',
	  rssToJson: Feed.rssToJson,
	  selector: '[data-js="feed"]',
	  type: 'medium',
	  title: '',
	  titleUrl: '',
	  profileImg: '',
	  fontSize: '',
	  ratioProfile: ['50', '50'],
	  postBorderColor: 'lightsteelblue',
	  postImgHeight: '168px',
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
	  unique: true
	};

	return Feed;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFnZ3JlZ2F0ZS1lcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLWFsbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtc3BlY2llcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1pbnN0YW5jZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtaW9zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Rhc2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLXdlYm9zLXdlYmtpdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9taWNyb3Rhc2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BlcmZvcm0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuYWxsLXNldHRsZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuYW55LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLmZpbmFsbHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvZXMvcHJvbWlzZS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXNuZXh0LnByb21pc2UudHJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0Z1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29yZUpzRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzTWFza2VkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdG9Tb3VyY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYXRpdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRWYWx1ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE5hdGl2ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2RlZmluZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUFzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9lcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnblZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY29weU9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaWRlbnRpdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcHBseS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJSZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Nob3J0T3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0VG9TdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUmVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNMZW5ndGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzSXRlcmF0ZWVDYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQXNzaWduZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVGltZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcmd1bWVudHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3N0dWJGYWxzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuYXJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbm9kZVV0aWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TGlrZUtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1Byb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXNJbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXNzaWduSW5XaXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXR0ZW1wdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVZhbHVlcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2N1c3RvbURlZmF1bHRzQXNzaWduSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lc2NhcGVTdHJpbmdDaGFyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbmF0aXZlS2V5cy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVJbnRlcnBvbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eU9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXNjYXBlSHRtbENoYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRvU3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90b1N0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXNjYXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcmVFc2NhcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yZUV2YWx1YXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZVNldHRpbmdzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90ZW1wbGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5RWFjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VGb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvck93bi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VFYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0RnVuY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2ZvckVhY2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVDbGVhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc29jSW5kZXhPZi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZVNldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0xpc3RDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0RlbGV0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrR2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoRGVsZXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hIYXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fSGFzaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlQ2xlYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleWFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRNYXBEYXRhLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVEZWxldGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXBDYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrU2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3RhY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVCdWZmZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19VaW50OEFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2xvbmVBcnJheUJ1ZmZlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lVHlwZWRBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VDcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pbml0Q2xvbmVPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2FmZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNZXJnZURlZXAuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lcmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy92YWx1ZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRDYWNoZUFkZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldENhY2hlSGFzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0Q2FjaGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheVNvbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYWNoZUhhcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsQXJyYXlzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwVG9BcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbEJ5VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlQdXNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc3R1YkFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0U3ltYm9scy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldEFsbEtleXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbE9iamVjdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19EYXRhVmlldy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1Byb21pc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19XZWFrTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWxEZWVwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNNYXRjaC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE1hdGNoRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hdGNoZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbWVtb2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21lbW9pemVDYXBwZWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb1BhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0UGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvS2V5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUhhc0luLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzUGF0aC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaGFzSW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVByb3BlcnR5RGVlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXRlcmF0ZWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWFwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNvcnRCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvbXBhcmVBc2NlbmRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb21wYXJlTXVsdGlwbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlT3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvb3JkZXJCeS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGaW5kSW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNOYU4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpY3RJbmRleE9mLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUluZGV4T2YuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUluY2x1ZGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlJbmNsdWRlc1dpdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25vb3AuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVTZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVW5pcS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdW5pcUJ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BueWNvcHBvcnR1bml0eS9wdHRybi1zY3JpcHRzL3NyYy9zcGlubmVyL3NwaW5uZXIuanMiLCIuLi8uLi8uLi9zcmMvb2JqZWN0cy9mZWVkL2ZlZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgIW5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjguMicsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgdmFyIHN0YXRlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICB9XG4gICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gICAgaWYgKCFzdGF0ZS5zb3VyY2UpIHtcbiAgICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxubW9kdWxlLmV4cG9ydHMgPSBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG90eXBlIDogbnVsbDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgUHJvcGVydGllc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHJldHVybiAhU3RyaW5nKFN5bWJvbCgpKTtcbn0pO1xuIiwidmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmICFTeW1ib2wuc2hhbVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgZWxzZSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvdHlwZVtJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IpIHtcbiAgdmFyIHJldHVybk1ldGhvZCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgaWYgKHJldHVybk1ldGhvZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGFuT2JqZWN0KHJldHVybk1ldGhvZC5jYWxsKGl0ZXJhdG9yKSkudmFsdWU7XG4gIH1cbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxudmFyIFJlc3VsdCA9IGZ1bmN0aW9uIChzdG9wcGVkLCByZXN1bHQpIHtcbiAgdGhpcy5zdG9wcGVkID0gc3RvcHBlZDtcbiAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgdW5ib3VuZEZ1bmN0aW9uLCBvcHRpb25zKSB7XG4gIHZhciB0aGF0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnRoYXQ7XG4gIHZhciBBU19FTlRSSUVTID0gISEob3B0aW9ucyAmJiBvcHRpb25zLkFTX0VOVFJJRVMpO1xuICB2YXIgSVNfSVRFUkFUT1IgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSVNfSVRFUkFUT1IpO1xuICB2YXIgSU5URVJSVVBURUQgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSU5URVJSVVBURUQpO1xuICB2YXIgZm4gPSBiaW5kKHVuYm91bmRGdW5jdGlvbiwgdGhhdCwgMSArIEFTX0VOVFJJRVMgKyBJTlRFUlJVUFRFRCk7XG4gIHZhciBpdGVyYXRvciwgaXRlckZuLCBpbmRleCwgbGVuZ3RoLCByZXN1bHQsIG5leHQsIHN0ZXA7XG5cbiAgdmFyIHN0b3AgPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgaWYgKGl0ZXJhdG9yKSBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICByZXR1cm4gbmV3IFJlc3VsdCh0cnVlLCBjb25kaXRpb24pO1xuICB9O1xuXG4gIHZhciBjYWxsRm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoQVNfRU5UUklFUykge1xuICAgICAgYW5PYmplY3QodmFsdWUpO1xuICAgICAgcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWVbMF0sIHZhbHVlWzFdLCBzdG9wKSA6IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSByZXR1cm4gSU5URVJSVVBURUQgPyBmbih2YWx1ZSwgc3RvcCkgOiBmbih2YWx1ZSk7XG4gIH07XG5cbiAgaWYgKElTX0lURVJBVE9SKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYWJsZTtcbiAgfSBlbHNlIHtcbiAgICBpdGVyRm4gPSBnZXRJdGVyYXRvck1ldGhvZChpdGVyYWJsZSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKCdUYXJnZXQgaXMgbm90IGl0ZXJhYmxlJyk7XG4gICAgLy8gb3B0aW1pc2F0aW9uIGZvciBhcnJheSBpdGVyYXRvcnNcbiAgICBpZiAoaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJGbikpIHtcbiAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQgPSBjYWxsRm4oaXRlcmFibGVbaW5kZXhdKTtcbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQgaW5zdGFuY2VvZiBSZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbiAgICB9XG4gICAgaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7XG4gIH1cblxuICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gY2FsbEZuKHN0ZXAudmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAnb2JqZWN0JyAmJiByZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG5cbnZhciAkQWdncmVnYXRlRXJyb3IgPSBmdW5jdGlvbiBBZ2dyZWdhdGVFcnJvcihlcnJvcnMsIG1lc3NhZ2UpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoISh0aGF0IGluc3RhbmNlb2YgJEFnZ3JlZ2F0ZUVycm9yKSkgcmV0dXJuIG5ldyAkQWdncmVnYXRlRXJyb3IoZXJyb3JzLCBtZXNzYWdlKTtcbiAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vZXJyb3ItbWVzc2FnZVxuICAgIHRoYXQgPSBzZXRQcm90b3R5cGVPZihuZXcgRXJyb3IodW5kZWZpbmVkKSwgZ2V0UHJvdG90eXBlT2YodGhhdCkpO1xuICB9XG4gIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0aGF0LCAnbWVzc2FnZScsIFN0cmluZyhtZXNzYWdlKSk7XG4gIHZhciBlcnJvcnNBcnJheSA9IFtdO1xuICBpdGVyYXRlKGVycm9ycywgZXJyb3JzQXJyYXkucHVzaCwgeyB0aGF0OiBlcnJvcnNBcnJheSB9KTtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRoYXQsICdlcnJvcnMnLCBlcnJvcnNBcnJheSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuJEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZSA9IGNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcig1LCAkQWdncmVnYXRlRXJyb3IpLFxuICBtZXNzYWdlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoNSwgJycpLFxuICBuYW1lOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoNSwgJ0FnZ3JlZ2F0ZUVycm9yJylcbn0pO1xuXG4vLyBgQWdncmVnYXRlRXJyb3JgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFnZ3JlZ2F0ZS1lcnJvci1jb25zdHJ1Y3RvclxuJCh7IGdsb2JhbDogdHJ1ZSB9LCB7XG4gIEFnZ3JlZ2F0ZUVycm9yOiAkQWdncmVnYXRlRXJyb3Jcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IHt9LnRvU3RyaW5nIDogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbn07XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZycpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbmlmICghVE9fU1RSSU5HX1RBR19TVVBQT1JUKSB7XG4gIHJlZGVmaW5lKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIHRvU3RyaW5nLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbn1cbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlByb21pc2U7XG4iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SX05BTUUpIHtcbiAgdmFyIENvbnN0cnVjdG9yID0gZ2V0QnVpbHRJbihDT05TVFJVQ1RPUl9OQU1FKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgQ29uc3RydWN0b3IgJiYgIUNvbnN0cnVjdG9yW1NQRUNJRVNdKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFNQRUNJRVMsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICAgIH0pO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgJyArIChuYW1lID8gbmFtZSArICcgJyA6ICcnKSArICdpbnZvY2F0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIGl0ZXJhdG9yV2l0aFJldHVybiA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBkb25lOiAhIWNhbGxlZCsrIH07XG4gICAgfSxcbiAgICAncmV0dXJuJzogZnVuY3Rpb24gKCkge1xuICAgICAgU0FGRV9DTE9TSU5HID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIGl0ZXJhdG9yV2l0aFJldHVybltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20oaXRlcmF0b3JXaXRoUmV0dXJuLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBTS0lQX0NMT1NJTkcpIHtcbiAgaWYgKCFTS0lQX0NMT1NJTkcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgSVRFUkFUSU9OX1NVUFBPUlQgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4geyBkb25lOiBJVEVSQVRJT05fU1VQUE9SVCA9IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIGV4ZWMob2JqZWN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gSVRFUkFUSU9OX1NVUFBPUlQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBTcGVjaWVzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oaXBob25lfGlwb2R8aXBhZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSkuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhciA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChJU19OT0RFKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2socnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIC8vIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjI0XG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwgJiYgIUlTX0lPUykge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gYmluZChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiZcbiAgICB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICFnbG9iYWwuaW1wb3J0U2NyaXB0cyAmJlxuICAgIGxvY2F0aW9uICYmIGxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgIWZhaWxzKHBvc3QpXG4gICkge1xuICAgIGRlZmVyID0gcG9zdDtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChydW5uZXIoaWQpLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC93ZWIwcyg/IS4qY2hyb21lKS9pLnRlc3QodXNlckFnZW50KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfV0VCT1NfV0VCS0lUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy13ZWJvcy13ZWJraXQnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbi8vIE5vZGUuanMgMTEgc2hvd3MgRXhwZXJpbWVudGFsV2FybmluZyBvbiBnZXR0aW5nIGBxdWV1ZU1pY3JvdGFza2BcbnZhciBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCAncXVldWVNaWNyb3Rhc2snKTtcbnZhciBxdWV1ZU1pY3JvdGFzayA9IHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciAmJiBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IudmFsdWU7XG5cbnZhciBmbHVzaCwgaGVhZCwgbGFzdCwgbm90aWZ5LCB0b2dnbGUsIG5vZGUsIHByb21pc2UsIHRoZW47XG5cbi8vIG1vZGVybiBlbmdpbmVzIGhhdmUgcXVldWVNaWNyb3Rhc2sgbWV0aG9kXG5pZiAoIXF1ZXVlTWljcm90YXNrKSB7XG4gIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChJU19OT0RFICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXIsIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIC8vIGFsc28gZXhjZXB0IFdlYk9TIFdlYmtpdCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODk4XG4gIGlmICghSVNfSU9TICYmICFJU19OT0RFICYmICFJU19XRUJPU19XRUJLSVQgJiYgTXV0YXRpb25PYnNlcnZlciAmJiBkb2N1bWVudCkge1xuICAgIHRvZ2dsZSA9IHRydWU7XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgdGhlbiA9IHByb21pc2UudGhlbjtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGVuLmNhbGwocHJvbWlzZSwgZmx1c2gpO1xuICAgIH07XG4gIC8vIE5vZGUuanMgd2l0aG91dCBwcm9taXNlc1xuICB9IGVsc2UgaWYgKElTX05PREUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHF1ZXVlTWljcm90YXNrIHx8IGZ1bmN0aW9uIChmbikge1xuICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gIGlmICghaGVhZCkge1xuICAgIGhlYWQgPSB0YXNrO1xuICAgIG5vdGlmeSgpO1xuICB9IGxhc3QgPSB0YXNrO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcblxuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gIHZhciBjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGU7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gY29uc29sZS5lcnJvcihhKSA6IGNvbnNvbGUuZXJyb3IoYSwgYik7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IGZhbHNlLCB2YWx1ZTogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6IHRydWUsIHZhbHVlOiBlcnJvciB9O1xuICB9XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgTmF0aXZlUHJvbWlzZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtcHJvbWlzZS1jb25zdHJ1Y3RvcicpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIGl0ZXJhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0ZScpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24nKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWljcm90YXNrJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgaG9zdFJlcG9ydEVycm9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9ob3N0LXJlcG9ydC1lcnJvcnMnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wZXJmb3JtJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsUHJvbWlzZVN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoUFJPTUlTRSk7XG52YXIgUHJvbWlzZUNvbnN0cnVjdG9yID0gTmF0aXZlUHJvbWlzZTtcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciAkZmV0Y2ggPSBnZXRCdWlsdEluKCdmZXRjaCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcbnZhciBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eTtcbnZhciBESVNQQVRDSF9FVkVOVCA9ICEhKGRvY3VtZW50ICYmIGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIGdsb2JhbC5kaXNwYXRjaEV2ZW50KTtcbnZhciBOQVRJVkVfUkVKRUNUSU9OX0VWRU5UID0gdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nO1xudmFyIFVOSEFORExFRF9SRUpFQ1RJT04gPSAndW5oYW5kbGVkcmVqZWN0aW9uJztcbnZhciBSRUpFQ1RJT05fSEFORExFRCA9ICdyZWplY3Rpb25oYW5kbGVkJztcbnZhciBQRU5ESU5HID0gMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcbnZhciBIQU5ETEVEID0gMTtcbnZhciBVTkhBTkRMRUQgPSAyO1xudmFyIEludGVybmFsLCBPd25Qcm9taXNlQ2FwYWJpbGl0eSwgUHJvbWlzZVdyYXBwZXIsIG5hdGl2ZVRoZW47XG5cbnZhciBGT1JDRUQgPSBpc0ZvcmNlZChQUk9NSVNFLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBHTE9CQUxfQ09SRV9KU19QUk9NSVNFID0gaW5zcGVjdFNvdXJjZShQcm9taXNlQ29uc3RydWN0b3IpICE9PSBTdHJpbmcoUHJvbWlzZUNvbnN0cnVjdG9yKTtcbiAgaWYgKCFHTE9CQUxfQ09SRV9KU19QUk9NSVNFKSB7XG4gICAgLy8gVjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTgzMDU2NVxuICAgIC8vIFdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgaWYgKFY4X1ZFUlNJT04gPT09IDY2KSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBVbmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgaWYgKCFJU19OT0RFICYmICFOQVRJVkVfUkVKRUNUSU9OX0VWRU5UKSByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBXZSBuZWVkIFByb21pc2UjZmluYWxseSBpbiB0aGUgcHVyZSB2ZXJzaW9uIGZvciBwcmV2ZW50aW5nIHByb3RvdHlwZSBwb2xsdXRpb25cbiAgaWYgKElTX1BVUkUgJiYgIVByb21pc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGVbJ2ZpbmFsbHknXSkgcmV0dXJuIHRydWU7XG4gIC8vIFdlIGNhbid0IHVzZSBAQHNwZWNpZXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4gIC8vIGRlb3B0aW1pemF0aW9uIGFuZCBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG4gIGlmIChWOF9WRVJTSU9OID49IDUxICYmIC9uYXRpdmUgY29kZS8udGVzdChQcm9taXNlQ29uc3RydWN0b3IpKSByZXR1cm4gZmFsc2U7XG4gIC8vIERldGVjdCBjb3JyZWN0bmVzcyBvZiBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZUNvbnN0cnVjdG9yLnJlc29sdmUoMSk7XG4gIHZhciBGYWtlUHJvbWlzZSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgZXhlYyhmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sIGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG4gIH07XG4gIHZhciBjb25zdHJ1Y3RvciA9IHByb21pc2UuY29uc3RydWN0b3IgPSB7fTtcbiAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBGYWtlUHJvbWlzZTtcbiAgcmV0dXJuICEocHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZSk7XG59KTtcblxudmFyIElOQ09SUkVDVF9JVEVSQVRJT04gPSBGT1JDRUQgfHwgIWNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHtcbiAgUHJvbWlzZUNvbnN0cnVjdG9yLmFsbChpdGVyYWJsZSlbJ2NhdGNoJ10oZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbn0pO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcblxudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChzdGF0ZSwgaXNSZWplY3QpIHtcbiAgaWYgKHN0YXRlLm5vdGlmaWVkKSByZXR1cm47XG4gIHN0YXRlLm5vdGlmaWVkID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gc3RhdGUucmVhY3Rpb25zO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBvayA9IHN0YXRlLnN0YXRlID09IEZVTEZJTExFRDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBjaGFpbltpbmRleCsrXTtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnJlamVjdGlvbiA9PT0gVU5IQU5ETEVEKSBvbkhhbmRsZVVuaGFuZGxlZChzdGF0ZSk7XG4gICAgICAgICAgICBzdGF0ZS5yZWplY3Rpb24gPSBIQU5ETEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBjYW4gdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHN0YXRlLnJlYWN0aW9ucyA9IFtdO1xuICAgIHN0YXRlLm5vdGlmaWVkID0gZmFsc2U7XG4gICAgaWYgKGlzUmVqZWN0ICYmICFzdGF0ZS5yZWplY3Rpb24pIG9uVW5oYW5kbGVkKHN0YXRlKTtcbiAgfSk7XG59O1xuXG52YXIgZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChuYW1lLCBwcm9taXNlLCByZWFzb24pIHtcbiAgdmFyIGV2ZW50LCBoYW5kbGVyO1xuICBpZiAoRElTUEFUQ0hfRVZFTlQpIHtcbiAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGV2ZW50LnByb21pc2UgPSBwcm9taXNlO1xuICAgIGV2ZW50LnJlYXNvbiA9IHJlYXNvbjtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpO1xuICAgIGdsb2JhbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfSBlbHNlIGV2ZW50ID0geyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHJlYXNvbiB9O1xuICBpZiAoIU5BVElWRV9SRUpFQ1RJT05fRVZFTlQgJiYgKGhhbmRsZXIgPSBnbG9iYWxbJ29uJyArIG5hbWVdKSkgaGFuZGxlcihldmVudCk7XG4gIGVsc2UgaWYgKG5hbWUgPT09IFVOSEFORExFRF9SRUpFQ1RJT04pIGhvc3RSZXBvcnRFcnJvcnMoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHJlYXNvbik7XG59O1xuXG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gc3RhdGUuZmFjYWRlO1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBJU19VTkhBTkRMRUQgPSBpc1VuaGFuZGxlZChzdGF0ZSk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoSVNfVU5IQU5ETEVEKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKElTX05PREUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoVU5IQU5ETEVEX1JFSkVDVElPTiwgcHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgc3RhdGUucmVqZWN0aW9uID0gSVNfTk9ERSB8fCBpc1VuaGFuZGxlZChzdGF0ZSkgPyBVTkhBTkRMRUQgOiBIQU5ETEVEO1xuICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LnZhbHVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLnJlamVjdGlvbiAhPT0gSEFORExFRCAmJiAhc3RhdGUucGFyZW50O1xufTtcblxudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHN0YXRlLmZhY2FkZTtcbiAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoUkVKRUNUSU9OX0hBTkRMRUQsIHByb21pc2UsIHN0YXRlLnZhbHVlKTtcbiAgfSk7XG59O1xuXG52YXIgYmluZCA9IGZ1bmN0aW9uIChmbiwgc3RhdGUsIHVud3JhcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgZm4oc3RhdGUsIHZhbHVlLCB1bndyYXApO1xuICB9O1xufTtcblxudmFyIGludGVybmFsUmVqZWN0ID0gZnVuY3Rpb24gKHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgc3RhdGUuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgbm90aWZ5KHN0YXRlLCB0cnVlKTtcbn07XG5cbnZhciBpbnRlcm5hbFJlc29sdmUgPSBmdW5jdGlvbiAoc3RhdGUsIHZhbHVlLCB1bndyYXApIHtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybjtcbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIGlmICh1bndyYXApIHN0YXRlID0gdW53cmFwO1xuICB0cnkge1xuICAgIGlmIChzdGF0ZS5mYWNhZGUgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICB2YXIgdGhlbiA9IGlzVGhlbmFibGUodmFsdWUpO1xuICAgIGlmICh0aGVuKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsXG4gICAgICAgICAgICBiaW5kKGludGVybmFsUmVzb2x2ZSwgd3JhcHBlciwgc3RhdGUpLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlamVjdCwgd3JhcHBlciwgc3RhdGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpbnRlcm5hbFJlamVjdCh3cmFwcGVyLCBlcnJvciwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHN0YXRlLnN0YXRlID0gRlVMRklMTEVEO1xuICAgICAgbm90aWZ5KHN0YXRlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGludGVybmFsUmVqZWN0KHsgZG9uZTogZmFsc2UgfSwgZXJyb3IsIHN0YXRlKTtcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmIChGT1JDRUQpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgUHJvbWlzZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoYmluZChpbnRlcm5hbFJlc29sdmUsIHN0YXRlKSwgYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaW50ZXJuYWxSZWplY3Qoc3RhdGUsIGVycm9yKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICAgIHR5cGU6IFBST01JU0UsXG4gICAgICBkb25lOiBmYWxzZSxcbiAgICAgIG5vdGlmaWVkOiBmYWxzZSxcbiAgICAgIHBhcmVudDogZmFsc2UsXG4gICAgICByZWFjdGlvbnM6IFtdLFxuICAgICAgcmVqZWN0aW9uOiBmYWxzZSxcbiAgICAgIHN0YXRlOiBQRU5ESU5HLFxuICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZWRlZmluZUFsbChQcm9taXNlQ29uc3RydWN0b3IucHJvdG90eXBlLCB7XG4gICAgLy8gYFByb21pc2UucHJvdG90eXBlLnRoZW5gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5wcm90b3R5cGUudGhlblxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUHJvbWlzZVN0YXRlKHRoaXMpO1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIFByb21pc2VDb25zdHJ1Y3RvcikpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBJU19OT0RFID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICBzdGF0ZS5wYXJlbnQgPSB0cnVlO1xuICAgICAgc3RhdGUucmVhY3Rpb25zLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHN0YXRlLnN0YXRlICE9IFBFTkRJTkcpIG5vdGlmeShzdGF0ZSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyBgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZShwcm9taXNlKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGJpbmQoaW50ZXJuYWxSZXNvbHZlLCBzdGF0ZSk7XG4gICAgdGhpcy5yZWplY3QgPSBiaW5kKGludGVybmFsUmVqZWN0LCBzdGF0ZSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09IFByb21pc2VDb25zdHJ1Y3RvciB8fCBDID09PSBQcm9taXNlV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xuXG4gIGlmICghSVNfUFVSRSAmJiB0eXBlb2YgTmF0aXZlUHJvbWlzZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgbmF0aXZlVGhlbiA9IE5hdGl2ZVByb21pc2UucHJvdG90eXBlLnRoZW47XG5cbiAgICAvLyB3cmFwIG5hdGl2ZSBQcm9taXNlI3RoZW4gZm9yIG5hdGl2ZSBhc3luYyBmdW5jdGlvbnNcbiAgICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ3RoZW4nLCBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2VDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG5hdGl2ZVRoZW4uY2FsbCh0aGF0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY0MFxuICAgIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xuXG4gICAgLy8gd3JhcCBmZXRjaCByZXN1bHRcbiAgICBpZiAodHlwZW9mICRmZXRjaCA9PSAnZnVuY3Rpb24nKSAkKHsgZ2xvYmFsOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShQcm9taXNlQ29uc3RydWN0b3IsICRmZXRjaC5hcHBseShnbG9iYWwsIGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgUHJvbWlzZTogUHJvbWlzZUNvbnN0cnVjdG9yXG59KTtcblxuc2V0VG9TdHJpbmdUYWcoUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFLCBmYWxzZSwgdHJ1ZSk7XG5zZXRTcGVjaWVzKFBST01JU0UpO1xuXG5Qcm9taXNlV3JhcHBlciA9IGdldEJ1aWx0SW4oUFJPTUlTRSk7XG5cbi8vIHN0YXRpY3NcbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVqZWN0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJlamVjdFxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICBjYXBhYmlsaXR5LnJlamVjdC5jYWxsKHVuZGVmaW5lZCwgcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogSVNfUFVSRSB8fCBGT1JDRUQgfSwge1xuICAvLyBgUHJvbWlzZS5yZXNvbHZlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJlc29sdmVcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKElTX1BVUkUgJiYgdGhpcyA9PT0gUHJvbWlzZVdyYXBwZXIgPyBQcm9taXNlQ29uc3RydWN0b3IgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG5cbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogSU5DT1JSRUNUX0lURVJBVElPTiB9LCB7XG4gIC8vIGBQcm9taXNlLmFsbGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbGxcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIGBQcm9taXNlLnJhY2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucmFjZVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkcHJvbWlzZVJlc29sdmUgPSBhRnVuY3Rpb24oQy5yZXNvbHZlKTtcbiAgICAgIGl0ZXJhdGUoaXRlcmFibGUsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICRwcm9taXNlUmVzb2x2ZS5jYWxsKEMsIHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikgcmVqZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcblxuLy8gYFByb21pc2UuYWxsU2V0dGxlZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UuYWxsc2V0dGxlZFxuJCh7IHRhcmdldDogJ1Byb21pc2UnLCBzdGF0OiB0cnVlIH0sIHtcbiAgYWxsU2V0dGxlZDogZnVuY3Rpb24gYWxsU2V0dGxlZChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBwcm9taXNlUmVzb2x2ZS5jYWxsKEMsIHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0geyBzdGF0dXM6ICdmdWxmaWxsZWQnLCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHsgc3RhdHVzOiAncmVqZWN0ZWQnLCByZWFzb246IGVycm9yIH07XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcblxudmFyIFBST01JU0VfQU5ZX0VSUk9SID0gJ05vIG9uZSBwcm9taXNlIHJlc29sdmVkJztcblxuLy8gYFByb21pc2UuYW55YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbnlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgc3RhdDogdHJ1ZSB9LCB7XG4gIGFueTogZnVuY3Rpb24gYW55KGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZihDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIHZhciBhbHJlYWR5UmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgIGl0ZXJhdGUoaXRlcmFibGUsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGNvdW50ZXIrKztcbiAgICAgICAgdmFyIGFscmVhZHlSZWplY3RlZCA9IGZhbHNlO1xuICAgICAgICBlcnJvcnMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5UmVqZWN0ZWQgfHwgYWxyZWFkeVJlc29sdmVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlSZWplY3RlZCB8fCBhbHJlYWR5UmVzb2x2ZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5UmVqZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGVycm9yc1tpbmRleF0gPSBlcnJvcjtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZWplY3QobmV3IChnZXRCdWlsdEluKCdBZ2dyZWdhdGVFcnJvcicpKShlcnJvcnMsIFBST01JU0VfQU5ZX0VSUk9SKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZWplY3QobmV3IChnZXRCdWlsdEluKCdBZ2dyZWdhdGVFcnJvcicpKShlcnJvcnMsIFBST01JU0VfQU5ZX0VSUk9SKSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikgcmVqZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBOYXRpdmVQcm9taXNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxuLy8gU2FmYXJpIGJ1ZyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjAwODI5XG52YXIgTk9OX0dFTkVSSUMgPSAhIU5hdGl2ZVByb21pc2UgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICBOYXRpdmVQcm9taXNlLnByb3RvdHlwZVsnZmluYWxseSddLmNhbGwoeyB0aGVuOiBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0gfSwgZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbn0pO1xuXG4vLyBgUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmZpbmFsbHlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgcHJvdG86IHRydWUsIHJlYWw6IHRydWUsIGZvcmNlZDogTk9OX0dFTkVSSUMgfSwge1xuICAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBnZXRCdWlsdEluKCdQcm9taXNlJykpO1xuICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgICAgfSA6IG9uRmluYWxseSxcbiAgICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICAgIH0gOiBvbkZpbmFsbHlcbiAgICApO1xuICB9XG59KTtcblxuLy8gcGF0Y2ggbmF0aXZlIFByb21pc2UucHJvdG90eXBlIGZvciBuYXRpdmUgYXN5bmMgZnVuY3Rpb25zXG5pZiAoIUlTX1BVUkUgJiYgdHlwZW9mIE5hdGl2ZVByb21pc2UgPT0gJ2Z1bmN0aW9uJyAmJiAhTmF0aXZlUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSkge1xuICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ2ZpbmFsbHknLCBnZXRCdWlsdEluKCdQcm9taXNlJykucHJvdG90eXBlWydmaW5hbGx5J10pO1xufVxuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG5pZiAoSXRlcmF0b3JQcm90b3R5cGUgPT0gdW5kZWZpbmVkKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuaWYgKCFJU19QVVJFICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCB0cnVlLCB0cnVlKTtcbiAgICAgIGlmIChJU19QVVJFKSBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRkFVTFQgPT0gVkFMVUVTICYmIG5hdGl2ZUl0ZXJhdG9yICYmIG5hdGl2ZUl0ZXJhdG9yLm5hbWUgIT09IFZBTFVFUykge1xuICAgIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IHRydWU7XG4gICAgZGVmYXVsdEl0ZXJhdG9yID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmF0aXZlSXRlcmF0b3IuY2FsbCh0aGlzKTsgfTtcbiAgfVxuXG4gIC8vIGRlZmluZSBpdGVyYXRvclxuICBpZiAoKCFJU19QVVJFIHx8IEZPUkNFRCkgJiYgSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdICE9PSBkZWZhdWx0SXRlcmF0b3IpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IFN0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJXN0cmluZ2l0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgc3RyaW5nID0gc3RhdGUuc3RyaW5nO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleDtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9IGNoYXJBdChzdHJpbmcsIGluZGV4KTtcbiAgc3RhdGUuaW5kZXggKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIi8vIGl0ZXJhYmxlIERPTSBjb2xsZWN0aW9uc1xuLy8gZmxhZyAtIGBpdGVyYWJsZWAgaW50ZXJmYWNlIC0gJ2VudHJpZXMnLCAna2V5cycsICd2YWx1ZXMnLCAnZm9yRWFjaCcgbWV0aG9kc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENTU1J1bGVMaXN0OiAwLFxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiAwLFxuICBDU1NWYWx1ZUxpc3Q6IDAsXG4gIENsaWVudFJlY3RMaXN0OiAwLFxuICBET01SZWN0TGlzdDogMCxcbiAgRE9NU3RyaW5nTGlzdDogMCxcbiAgRE9NVG9rZW5MaXN0OiAxLFxuICBEYXRhVHJhbnNmZXJJdGVtTGlzdDogMCxcbiAgRmlsZUxpc3Q6IDAsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiAwLFxuICBIVE1MQ29sbGVjdGlvbjogMCxcbiAgSFRNTEZvcm1FbGVtZW50OiAwLFxuICBIVE1MU2VsZWN0RWxlbWVudDogMCxcbiAgTWVkaWFMaXN0OiAwLFxuICBNaW1lVHlwZUFycmF5OiAwLFxuICBOYW1lZE5vZGVNYXA6IDAsXG4gIE5vZGVMaXN0OiAxLFxuICBQYWludFJlcXVlc3RMaXN0OiAwLFxuICBQbHVnaW46IDAsXG4gIFBsdWdpbkFycmF5OiAwLFxuICBTVkdMZW5ndGhMaXN0OiAwLFxuICBTVkdOdW1iZXJMaXN0OiAwLFxuICBTVkdQYXRoU2VnTGlzdDogMCxcbiAgU1ZHUG9pbnRMaXN0OiAwLFxuICBTVkdTdHJpbmdMaXN0OiAwLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiAwLFxuICBTb3VyY2VCdWZmZXJMaXN0OiAwLFxuICBTdHlsZVNoZWV0TGlzdDogMCxcbiAgVGV4dFRyYWNrQ3VlTGlzdDogMCxcbiAgVGV4dFRyYWNrTGlzdDogMCxcbiAgVG91Y2hMaXN0OiAwXG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG52YXIgVU5TQ09QQUJMRVMgPSB3ZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgQVJSQVlfSVRFUkFUT1IgPSAnQXJyYXkgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoQVJSQVlfSVRFUkFUT1IpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmtleXNcbi8vIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnZhbHVlc1xuLy8gYEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWFycmF5aXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lSXRlcmF0b3IoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBBUlJBWV9JVEVSQVRPUixcbiAgICB0YXJnZXQ6IHRvSW5kZXhlZE9iamVjdChpdGVyYXRlZCksIC8vIHRhcmdldFxuICAgIGluZGV4OiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICAgIGtpbmQ6IGtpbmQgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2luZFxuICB9KTtcbi8vIGAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4geyB2YWx1ZTogaW5kZXgsIGRvbmU6IGZhbHNlIH07XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4geyB2YWx1ZTogdGFyZ2V0W2luZGV4XSwgZG9uZTogZmFsc2UgfTtcbiAgcmV0dXJuIHsgdmFsdWU6IFtpbmRleCwgdGFyZ2V0W2luZGV4XV0sIGRvbmU6IGZhbHNlIH07XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVtYXBwZWRhcmd1bWVudHNvYmplY3Rcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIEFycmF5SXRlcmF0b3JNZXRob2RzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgQXJyYXlWYWx1ZXMgPSBBcnJheUl0ZXJhdG9yTWV0aG9kcy52YWx1ZXM7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSkge1xuICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gQXJyYXlWYWx1ZXMpIHRyeSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gPSBBcnJheVZhbHVlcztcbiAgICB9XG4gICAgaWYgKCFDb2xsZWN0aW9uUHJvdG90eXBlW1RPX1NUUklOR19UQUddKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgICB9XG4gICAgaWYgKERPTUl0ZXJhYmxlc1tDT0xMRUNUSU9OX05BTUVdKSBmb3IgKHZhciBNRVRIT0RfTkFNRSBpbiBBcnJheUl0ZXJhdG9yTWV0aG9kcykge1xuICAgICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gIT09IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSkgdHJ5IHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIE1FVEhPRF9OQU1FLCBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gPSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFnZ3JlZ2F0ZS1lcnJvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnByb21pc2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMucHJvbWlzZS5hbGwtc2V0dGxlZCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5wcm9taXNlLmFueScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLlByb21pc2U7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wZXJmb3JtJyk7XG5cbi8vIGBQcm9taXNlLnRyeWAgbWV0aG9kXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxuJCh7IHRhcmdldDogJ1Byb21pc2UnLCBzdGF0OiB0cnVlIH0sIHtcbiAgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gICAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZih0aGlzKTtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgICAocmVzdWx0LmVycm9yID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnZhbHVlKTtcbiAgICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRnVuY3Rpb247XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuZXhwb3J0IGRlZmF1bHQgY29yZUpzRGF0YTtcbiIsImltcG9ydCBjb3JlSnNEYXRhIGZyb20gJy4vX2NvcmVKc0RhdGEuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc01hc2tlZDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Tb3VyY2U7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTWFza2VkIGZyb20gJy4vX2lzTWFza2VkLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hdGl2ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRWYWx1ZTtcbiIsImltcG9ydCBiYXNlSXNOYXRpdmUgZnJvbSAnLi9fYmFzZUlzTmF0aXZlLmpzJztcbmltcG9ydCBnZXRWYWx1ZSBmcm9tICcuL19nZXRWYWx1ZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE5hdGl2ZTtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcblxudmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmdW5jID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jyk7XG4gICAgZnVuYyh7fSwgJycsIHt9KTtcbiAgICByZXR1cm4gZnVuYztcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVByb3BlcnR5O1xuIiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYXNzaWduVmFsdWVgIGFuZCBgYXNzaWduTWVyZ2VWYWx1ZWAgd2l0aG91dFxuICogdmFsdWUgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSA9PSAnX19wcm90b19fJyAmJiBkZWZpbmVQcm9wZXJ0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICdlbnVtZXJhYmxlJzogdHJ1ZSxcbiAgICAgICd2YWx1ZSc6IHZhbHVlLFxuICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUFzc2lnblZhbHVlO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25WYWx1ZTtcbiIsImltcG9ydCBhc3NpZ25WYWx1ZSBmcm9tICcuL19hc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIHZhciBpc05ldyA9ICFvYmplY3Q7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3B5T2JqZWN0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpdHk7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcGx5O1xuIiwiaW1wb3J0IGFwcGx5IGZyb20gJy4vX2FwcGx5LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIHRyYW5zZm9ybXMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIHJlc3QgYXJyYXkgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCB0cmFuc2Zvcm0pIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gdHJhbnNmb3JtKGFycmF5KTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlclJlc3Q7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0cyk7XG4gKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzWzBdID09PSBvYmplY3RzWzFdKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uc3RhbnQ7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSAnLi9jb25zdGFudC5qcyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLi9fZGVmaW5lUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDgwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaG9ydE91dDtcbiIsImltcG9ydCBiYXNlU2V0VG9TdHJpbmcgZnJvbSAnLi9fYmFzZVNldFRvU3RyaW5nLmpzJztcbmltcG9ydCBzaG9ydE91dCBmcm9tICcuL19zaG9ydE91dC5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgYHRvU3RyaW5nYCBtZXRob2Qgb2YgYGZ1bmNgIHRvIHJldHVybiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBzZXRUb1N0cmluZyA9IHNob3J0T3V0KGJhc2VTZXRUb1N0cmluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IHNldFRvU3RyaW5nO1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuaW1wb3J0IG92ZXJSZXN0IGZyb20gJy4vX292ZXJSZXN0LmpzJztcbmltcG9ydCBzZXRUb1N0cmluZyBmcm9tICcuL19zZXRUb1N0cmluZy5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCBzdGFydCwgaWRlbnRpdHkpLCBmdW5jICsgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUmVzdDtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNMZW5ndGg7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheUxpa2U7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzSW5kZXg7XG4iLCJpbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0l0ZXJhdGVlQ2FsbDtcbiIsImltcG9ydCBiYXNlUmVzdCBmcm9tICcuL19iYXNlUmVzdC5qcyc7XG5pbXBvcnQgaXNJdGVyYXRlZUNhbGwgZnJvbSAnLi9faXNJdGVyYXRlZUNhbGwuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUaW1lcztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNBcmd1bWVudHM7XG4iLCJpbXBvcnQgYmFzZUlzQXJndW1lbnRzIGZyb20gJy4vX2Jhc2VJc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXk7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWJGYWxzZTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuaW1wb3J0IHN0dWJGYWxzZSBmcm9tICcuL3N0dWJGYWxzZS5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgaXNCdWZmZXI7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmFyeTtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIC8vIFVzZSBgdXRpbC50eXBlc2AgZm9yIE5vZGUuanMgMTArLlxuICAgIHZhciB0eXBlcyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlICYmIGZyZWVNb2R1bGUucmVxdWlyZSgndXRpbCcpLnR5cGVzO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXM7XG4gICAgfVxuXG4gICAgLy8gTGVnYWN5IGBwcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKWAgZm9yIE5vZGUuanMgPCAxMC5cbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBub2RlVXRpbDtcbiIsImltcG9ydCBiYXNlSXNUeXBlZEFycmF5IGZyb20gJy4vX2Jhc2VJc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IG5vZGVVdGlsIGZyb20gJy4vX25vZGVVdGlsLmpzJztcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzVHlwZWRBcnJheTtcbiIsImltcG9ydCBiYXNlVGltZXMgZnJvbSAnLi9fYmFzZVRpbWVzLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5TGlrZUtleXM7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUtleXNJbjtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5c0luIGZyb20gJy4vX25hdGl2ZUtleXNJbi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VLZXlzSW47XG4iLCJpbXBvcnQgYXJyYXlMaWtlS2V5cyBmcm9tICcuL19hcnJheUxpa2VLZXlzLmpzJztcbmltcG9ydCBiYXNlS2V5c0luIGZyb20gJy4vX2Jhc2VLZXlzSW4uanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQga2V5c0luO1xuIiwiaW1wb3J0IGNvcHlPYmplY3QgZnJvbSAnLi9fY29weU9iamVjdC5qcyc7XG5pbXBvcnQgY3JlYXRlQXNzaWduZXIgZnJvbSAnLi9fY3JlYXRlQXNzaWduZXIuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25JbmAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY3VzdG9taXplcmBcbiAqIHdoaWNoIGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJuc1xuICogYHVuZGVmaW5lZGAsIGFzc2lnbm1lbnQgaXMgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmBcbiAqIGlzIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50czogKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGFsaWFzIGV4dGVuZFdpdGhcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VzIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSkge1xuICogICByZXR1cm4gXy5pc1VuZGVmaW5lZChvYmpWYWx1ZSkgPyBzcmNWYWx1ZSA6IG9ialZhbHVlO1xuICogfVxuICpcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduSW5XaXRoLCBjdXN0b21pemVyKTtcbiAqXG4gKiBkZWZhdWx0cyh7ICdhJzogMSB9LCB7ICdiJzogMiB9LCB7ICdhJzogMyB9KTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICovXG52YXIgYXNzaWduSW5XaXRoID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyKSB7XG4gIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzSW4oc291cmNlKSwgb2JqZWN0LCBjdXN0b21pemVyKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25JbldpdGg7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlckFyZztcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJvdG90eXBlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJy4vaXNQbGFpbk9iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBkb21FeGNUYWcgPSAnW29iamVjdCBET01FeGNlcHRpb25dJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gYEVycm9yYCwgYEV2YWxFcnJvcmAsIGBSYW5nZUVycm9yYCwgYFJlZmVyZW5jZUVycm9yYCxcbiAqIGBTeW50YXhFcnJvcmAsIGBUeXBlRXJyb3JgLCBvciBgVVJJRXJyb3JgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBlcnJvciBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Vycm9yKG5ldyBFcnJvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Vycm9yKEVycm9yKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXJyb3IodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBlcnJvclRhZyB8fCB0YWcgPT0gZG9tRXhjVGFnIHx8XG4gICAgKHR5cGVvZiB2YWx1ZS5tZXNzYWdlID09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZS5uYW1lID09ICdzdHJpbmcnICYmICFpc1BsYWluT2JqZWN0KHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRXJyb3I7XG4iLCJpbXBvcnQgYXBwbHkgZnJvbSAnLi9fYXBwbHkuanMnO1xuaW1wb3J0IGJhc2VSZXN0IGZyb20gJy4vX2Jhc2VSZXN0LmpzJztcbmltcG9ydCBpc0Vycm9yIGZyb20gJy4vaXNFcnJvci5qcyc7XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gaW52b2tlIGBmdW5jYCwgcmV0dXJuaW5nIGVpdGhlciB0aGUgcmVzdWx0IG9yIHRoZSBjYXVnaHQgZXJyb3JcbiAqIG9iamVjdC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGFyZSBwcm92aWRlZCB0byBgZnVuY2Agd2hlbiBpdCdzIGludm9rZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGF0dGVtcHQuXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBgZnVuY2AgcmVzdWx0IG9yIGVycm9yIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgdGhyb3dpbmcgZXJyb3JzIGZvciBpbnZhbGlkIHNlbGVjdG9ycy5cbiAqIHZhciBlbGVtZW50cyA9IF8uYXR0ZW1wdChmdW5jdGlvbihzZWxlY3Rvcikge1xuICogICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gKiB9LCAnPl8+Jyk7XG4gKlxuICogaWYgKF8uaXNFcnJvcihlbGVtZW50cykpIHtcbiAqICAgZWxlbWVudHMgPSBbXTtcbiAqIH1cbiAqL1xudmFyIGF0dGVtcHQgPSBiYXNlUmVzdChmdW5jdGlvbihmdW5jLCBhcmdzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHVuZGVmaW5lZCwgYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gaXNFcnJvcihlKSA/IGUgOiBuZXcgRXJyb3IoZSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhdHRlbXB0O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlNYXA7XG4iLCJpbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIG9mIGBwcm9wc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHJldHVybiBhcnJheU1hcChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVZhbHVlcztcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmRlZmF1bHRzYCB0byBjdXN0b21pemUgaXRzIGBfLmFzc2lnbkluYCB1c2UgdG8gYXNzaWduIHByb3BlcnRpZXNcbiAqIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzXG4gKiB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gb2JqVmFsdWUgVGhlIGRlc3RpbmF0aW9uIHZhbHVlLlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgc291cmNlIHZhbHVlLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBwYXJlbnQgb2JqZWN0IG9mIGBvYmpWYWx1ZWAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgaWYgKG9ialZhbHVlID09PSB1bmRlZmluZWQgfHxcbiAgICAgIChlcShvYmpWYWx1ZSwgb2JqZWN0UHJvdG9ba2V5XSkgJiYgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkge1xuICAgIHJldHVybiBzcmNWYWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqVmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbURlZmF1bHRzQXNzaWduSW47XG4iLCIvKiogVXNlZCB0byBlc2NhcGUgY2hhcmFjdGVycyBmb3IgaW5jbHVzaW9uIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscy4gKi9cbnZhciBzdHJpbmdFc2NhcGVzID0ge1xuICAnXFxcXCc6ICdcXFxcJyxcbiAgXCInXCI6IFwiJ1wiLFxuICAnXFxuJzogJ24nLFxuICAnXFxyJzogJ3InLFxuICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICdcXHUyMDI5JzogJ3UyMDI5J1xufTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLnRlbXBsYXRlYCB0byBlc2NhcGUgY2hhcmFjdGVycyBmb3IgaW5jbHVzaW9uIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNociBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZ0NoYXIoY2hyKSB7XG4gIHJldHVybiAnXFxcXCcgKyBzdHJpbmdFc2NhcGVzW2Nocl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVzY2FwZVN0cmluZ0NoYXI7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzO1xuIiwiaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcbmltcG9ydCBuYXRpdmVLZXlzIGZyb20gJy4vX25hdGl2ZUtleXMuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VLZXlzO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXMgZnJvbSAnLi9fYmFzZUtleXMuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQga2V5cztcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVJbnRlcnBvbGF0ZSA9IC88JT0oW1xcc1xcU10rPyklPi9nO1xuXG5leHBvcnQgZGVmYXVsdCByZUludGVycG9sYXRlO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHlPZjtcbiIsImltcG9ydCBiYXNlUHJvcGVydHlPZiBmcm9tICcuL19iYXNlUHJvcGVydHlPZi5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5Oydcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xudmFyIGVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbEVzY2FwZXMpO1xuXG5leHBvcnQgZGVmYXVsdCBlc2NhcGVIdG1sQ2hhcjtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTeW1ib2w7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRvU3RyaW5nO1xuIiwiaW1wb3J0IGJhc2VUb1N0cmluZyBmcm9tICcuL19iYXNlVG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvU3RyaW5nO1xuIiwiaW1wb3J0IGVzY2FwZUh0bWxDaGFyIGZyb20gJy4vX2VzY2FwZUh0bWxDaGFyLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyBhbmQgSFRNTCBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInXS9nLFxuICAgIHJlSGFzVW5lc2NhcGVkSHRtbCA9IFJlZ0V4cChyZVVuZXNjYXBlZEh0bWwuc291cmNlKTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgY2hhcmFjdGVycyBcIiZcIiwgXCI8XCIsIFwiPlwiLCAnXCInLCBhbmQgXCInXCIgaW4gYHN0cmluZ2AgdG8gdGhlaXJcbiAqIGNvcnJlc3BvbmRpbmcgSFRNTCBlbnRpdGllcy5cbiAqXG4gKiAqKk5vdGU6KiogTm8gb3RoZXIgY2hhcmFjdGVycyBhcmUgZXNjYXBlZC4gVG8gZXNjYXBlIGFkZGl0aW9uYWxcbiAqIGNoYXJhY3RlcnMgdXNlIGEgdGhpcmQtcGFydHkgbGlicmFyeSBsaWtlIFtfaGVfXShodHRwczovL210aHMuYmUvaGUpLlxuICpcbiAqIFRob3VnaCB0aGUgXCI+XCIgY2hhcmFjdGVyIGlzIGVzY2FwZWQgZm9yIHN5bW1ldHJ5LCBjaGFyYWN0ZXJzIGxpa2VcbiAqIFwiPlwiIGFuZCBcIi9cIiBkb24ndCBuZWVkIGVzY2FwaW5nIGluIEhUTUwgYW5kIGhhdmUgbm8gc3BlY2lhbCBtZWFuaW5nXG4gKiB1bmxlc3MgdGhleSdyZSBwYXJ0IG9mIGEgdGFnIG9yIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZS4gU2VlXG4gKiBbTWF0aGlhcyBCeW5lbnMncyBhcnRpY2xlXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvYW1iaWd1b3VzLWFtcGVyc2FuZHMpXG4gKiAodW5kZXIgXCJzZW1pLXJlbGF0ZWQgZnVuIGZhY3RcIikgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBXaGVuIHdvcmtpbmcgd2l0aCBIVE1MIHlvdSBzaG91bGQgYWx3YXlzXG4gKiBbcXVvdGUgYXR0cmlidXRlIHZhbHVlc10oaHR0cDovL3dvbmtvLmNvbS9wb3N0L2h0bWwtZXNjYXBpbmcpIHRvIHJlZHVjZVxuICogWFNTIHZlY3RvcnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJ2ZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1VuZXNjYXBlZEh0bWwudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVVbmVzY2FwZWRIdG1sLCBlc2NhcGVIdG1sQ2hhcilcbiAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXNjYXBlO1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbnZhciByZUVzY2FwZSA9IC88JS0oW1xcc1xcU10rPyklPi9nO1xuXG5leHBvcnQgZGVmYXVsdCByZUVzY2FwZTtcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHRlbXBsYXRlIGRlbGltaXRlcnMuICovXG52YXIgcmVFdmFsdWF0ZSA9IC88JShbXFxzXFxTXSs/KSU+L2c7XG5cbmV4cG9ydCBkZWZhdWx0IHJlRXZhbHVhdGU7XG4iLCJpbXBvcnQgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcbmltcG9ydCByZUVzY2FwZSBmcm9tICcuL19yZUVzY2FwZS5qcyc7XG5pbXBvcnQgcmVFdmFsdWF0ZSBmcm9tICcuL19yZUV2YWx1YXRlLmpzJztcbmltcG9ydCByZUludGVycG9sYXRlIGZyb20gJy4vX3JlSW50ZXJwb2xhdGUuanMnO1xuXG4vKipcbiAqIEJ5IGRlZmF1bHQsIHRoZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzIHVzZWQgYnkgbG9kYXNoIGFyZSBsaWtlIHRob3NlIGluXG4gKiBlbWJlZGRlZCBSdWJ5IChFUkIpIGFzIHdlbGwgYXMgRVMyMDE1IHRlbXBsYXRlIHN0cmluZ3MuIENoYW5nZSB0aGVcbiAqIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIHRlbXBsYXRlU2V0dGluZ3MgPSB7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZWN0IGBkYXRhYCBwcm9wZXJ0eSB2YWx1ZXMgdG8gYmUgSFRNTC1lc2NhcGVkLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtSZWdFeHB9XG4gICAqL1xuICAnZXNjYXBlJzogcmVFc2NhcGUsXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZGV0ZWN0IGNvZGUgdG8gYmUgZXZhbHVhdGVkLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtSZWdFeHB9XG4gICAqL1xuICAnZXZhbHVhdGUnOiByZUV2YWx1YXRlLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGRldGVjdCBgZGF0YWAgcHJvcGVydHkgdmFsdWVzIHRvIGluamVjdC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgJ2ludGVycG9sYXRlJzogcmVJbnRlcnBvbGF0ZSxcblxuICAvKipcbiAgICogVXNlZCB0byByZWZlcmVuY2UgdGhlIGRhdGEgb2JqZWN0IGluIHRoZSB0ZW1wbGF0ZSB0ZXh0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICAndmFyaWFibGUnOiAnJyxcblxuICAvKipcbiAgICogVXNlZCB0byBpbXBvcnQgdmFyaWFibGVzIGludG8gdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICAnaW1wb3J0cyc6IHtcblxuICAgIC8qKlxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBgbG9kYXNoYCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0c1xuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICAnXyc6IHsgJ2VzY2FwZSc6IGVzY2FwZSB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbXBsYXRlU2V0dGluZ3M7XG4iLCJpbXBvcnQgYXNzaWduSW5XaXRoIGZyb20gJy4vYXNzaWduSW5XaXRoLmpzJztcbmltcG9ydCBhdHRlbXB0IGZyb20gJy4vYXR0ZW1wdC5qcyc7XG5pbXBvcnQgYmFzZVZhbHVlcyBmcm9tICcuL19iYXNlVmFsdWVzLmpzJztcbmltcG9ydCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluIGZyb20gJy4vX2N1c3RvbURlZmF1bHRzQXNzaWduSW4uanMnO1xuaW1wb3J0IGVzY2FwZVN0cmluZ0NoYXIgZnJvbSAnLi9fZXNjYXBlU3RyaW5nQ2hhci5qcyc7XG5pbXBvcnQgaXNFcnJvciBmcm9tICcuL2lzRXJyb3IuanMnO1xuaW1wb3J0IGlzSXRlcmF0ZWVDYWxsIGZyb20gJy4vX2lzSXRlcmF0ZWVDYWxsLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5pbXBvcnQgcmVJbnRlcnBvbGF0ZSBmcm9tICcuL19yZUludGVycG9sYXRlLmpzJztcbmltcG9ydCB0ZW1wbGF0ZVNldHRpbmdzIGZyb20gJy4vdGVtcGxhdGVTZXR0aW5ncy5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGVtcHR5IHN0cmluZyBsaXRlcmFscyBpbiBjb21waWxlZCB0ZW1wbGF0ZSBzb3VyY2UuICovXG52YXIgcmVFbXB0eVN0cmluZ0xlYWRpbmcgPSAvXFxiX19wIFxcKz0gJyc7L2csXG4gICAgcmVFbXB0eVN0cmluZ01pZGRsZSA9IC9cXGIoX19wIFxcKz0pICcnIFxcKy9nLFxuICAgIHJlRW1wdHlTdHJpbmdUcmFpbGluZyA9IC8oX19lXFwoLio/XFwpfFxcYl9fdFxcKSkgXFwrXFxuJyc7L2c7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaFxuICogW0VTIHRlbXBsYXRlIGRlbGltaXRlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRlbXBsYXRlLWxpdGVyYWwtbGV4aWNhbC1jb21wb25lbnRzKS5cbiAqL1xudmFyIHJlRXNUZW1wbGF0ZSA9IC9cXCRcXHsoW15cXFxcfV0qKD86XFxcXC5bXlxcXFx9XSopKilcXH0vZztcblxuLyoqIFVzZWQgdG8gZW5zdXJlIGNhcHR1cmluZyBvcmRlciBvZiB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLiAqL1xudmFyIHJlTm9NYXRjaCA9IC8oJF4pLztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggdW5lc2NhcGVkIGNoYXJhY3RlcnMgaW4gY29tcGlsZWQgc3RyaW5nIGxpdGVyYWxzLiAqL1xudmFyIHJlVW5lc2NhcGVkU3RyaW5nID0gL1snXFxuXFxyXFx1MjAyOFxcdTIwMjlcXFxcXS9nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjb21waWxlZCB0ZW1wbGF0ZSBmdW5jdGlvbiB0aGF0IGNhbiBpbnRlcnBvbGF0ZSBkYXRhIHByb3BlcnRpZXNcbiAqIGluIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXJzLCBIVE1MLWVzY2FwZSBpbnRlcnBvbGF0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluXG4gKiBcImVzY2FwZVwiIGRlbGltaXRlcnMsIGFuZCBleGVjdXRlIEphdmFTY3JpcHQgaW4gXCJldmFsdWF0ZVwiIGRlbGltaXRlcnMuIERhdGFcbiAqIHByb3BlcnRpZXMgbWF5IGJlIGFjY2Vzc2VkIGFzIGZyZWUgdmFyaWFibGVzIGluIHRoZSB0ZW1wbGF0ZS4gSWYgYSBzZXR0aW5nXG4gKiBvYmplY3QgaXMgZ2l2ZW4sIGl0IHRha2VzIHByZWNlZGVuY2Ugb3ZlciBgXy50ZW1wbGF0ZVNldHRpbmdzYCB2YWx1ZXMuXG4gKlxuICogKipOb3RlOioqIEluIHRoZSBkZXZlbG9wbWVudCBidWlsZCBgXy50ZW1wbGF0ZWAgdXRpbGl6ZXNcbiAqIFtzb3VyY2VVUkxzXShodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9kZXZlbG9wZXJ0b29scy9zb3VyY2VtYXBzLyN0b2Mtc291cmNldXJsKVxuICogZm9yIGVhc2llciBkZWJ1Z2dpbmcuXG4gKlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gcHJlY29tcGlsaW5nIHRlbXBsYXRlcyBzZWVcbiAqIFtsb2Rhc2gncyBjdXN0b20gYnVpbGRzIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vbG9kYXNoLmNvbS9jdXN0b20tYnVpbGRzKS5cbiAqXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBDaHJvbWUgZXh0ZW5zaW9uIHNhbmRib3hlcyBzZWVcbiAqIFtDaHJvbWUncyBleHRlbnNpb25zIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZXh0ZW5zaW9ucy9zYW5kYm94aW5nRXZhbCkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7UmVnRXhwfSBbb3B0aW9ucy5lc2NhcGU9Xy50ZW1wbGF0ZVNldHRpbmdzLmVzY2FwZV1cbiAqICBUaGUgSFRNTCBcImVzY2FwZVwiIGRlbGltaXRlci5cbiAqIEBwYXJhbSB7UmVnRXhwfSBbb3B0aW9ucy5ldmFsdWF0ZT1fLnRlbXBsYXRlU2V0dGluZ3MuZXZhbHVhdGVdXG4gKiAgVGhlIFwiZXZhbHVhdGVcIiBkZWxpbWl0ZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuaW1wb3J0cz1fLnRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0c11cbiAqICBBbiBvYmplY3QgdG8gaW1wb3J0IGludG8gdGhlIHRlbXBsYXRlIGFzIGZyZWUgdmFyaWFibGVzLlxuICogQHBhcmFtIHtSZWdFeHB9IFtvcHRpb25zLmludGVycG9sYXRlPV8udGVtcGxhdGVTZXR0aW5ncy5pbnRlcnBvbGF0ZV1cbiAqICBUaGUgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5zb3VyY2VVUkw9J3RlbXBsYXRlU291cmNlc1tuXSddXG4gKiAgVGhlIHNvdXJjZVVSTCBvZiB0aGUgY29tcGlsZWQgdGVtcGxhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudmFyaWFibGU9J29iaiddXG4gKiAgVGhlIGRhdGEgb2JqZWN0IHZhcmlhYmxlIG5hbWUuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjb21waWxlZCB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gVXNlIHRoZSBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyIHRvIGNyZWF0ZSBhIGNvbXBpbGVkIHRlbXBsYXRlLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8gPCU9IHVzZXIgJT4hJyk7XG4gKiBjb21waWxlZCh7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQhJ1xuICpcbiAqIC8vIFVzZSB0aGUgSFRNTCBcImVzY2FwZVwiIGRlbGltaXRlciB0byBlc2NhcGUgZGF0YSBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8Yj48JS0gdmFsdWUgJT48L2I+Jyk7XG4gKiBjb21waWxlZCh7ICd2YWx1ZSc6ICc8c2NyaXB0PicgfSk7XG4gKiAvLyA9PiAnPGI+Jmx0O3NjcmlwdCZndDs8L2I+J1xuICpcbiAqIC8vIFVzZSB0aGUgXCJldmFsdWF0ZVwiIGRlbGltaXRlciB0byBleGVjdXRlIEphdmFTY3JpcHQgYW5kIGdlbmVyYXRlIEhUTUwuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8JSBfLmZvckVhY2godXNlcnMsIGZ1bmN0aW9uKHVzZXIpIHsgJT48bGk+PCUtIHVzZXIgJT48L2xpPjwlIH0pOyAlPicpO1xuICogY29tcGlsZWQoeyAndXNlcnMnOiBbJ2ZyZWQnLCAnYmFybmV5J10gfSk7XG4gKiAvLyA9PiAnPGxpPmZyZWQ8L2xpPjxsaT5iYXJuZXk8L2xpPidcbiAqXG4gKiAvLyBVc2UgdGhlIGludGVybmFsIGBwcmludGAgZnVuY3Rpb24gaW4gXCJldmFsdWF0ZVwiIGRlbGltaXRlcnMuXG4gKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCc8JSBwcmludChcImhlbGxvIFwiICsgdXNlcik7ICU+IScpO1xuICogY29tcGlsZWQoeyAndXNlcic6ICdiYXJuZXknIH0pO1xuICogLy8gPT4gJ2hlbGxvIGJhcm5leSEnXG4gKlxuICogLy8gVXNlIHRoZSBFUyB0ZW1wbGF0ZSBsaXRlcmFsIGRlbGltaXRlciBhcyBhbiBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyLlxuICogLy8gRGlzYWJsZSBzdXBwb3J0IGJ5IHJlcGxhY2luZyB0aGUgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlci5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvICR7IHVzZXIgfSEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAncGViYmxlcycgfSk7XG4gKiAvLyA9PiAnaGVsbG8gcGViYmxlcyEnXG4gKlxuICogLy8gVXNlIGJhY2tzbGFzaGVzIHRvIHRyZWF0IGRlbGltaXRlcnMgYXMgcGxhaW4gdGV4dC5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJzwlPSBcIlxcXFw8JS0gdmFsdWUgJVxcXFw+XCIgJT4nKTtcbiAqIGNvbXBpbGVkKHsgJ3ZhbHVlJzogJ2lnbm9yZWQnIH0pO1xuICogLy8gPT4gJzwlLSB2YWx1ZSAlPidcbiAqXG4gKiAvLyBVc2UgdGhlIGBpbXBvcnRzYCBvcHRpb24gdG8gaW1wb3J0IGBqUXVlcnlgIGFzIGBqcWAuXG4gKiB2YXIgdGV4dCA9ICc8JSBqcS5lYWNoKHVzZXJzLCBmdW5jdGlvbih1c2VyKSB7ICU+PGxpPjwlLSB1c2VyICU+PC9saT48JSB9KTsgJT4nO1xuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSh0ZXh0LCB7ICdpbXBvcnRzJzogeyAnanEnOiBqUXVlcnkgfSB9KTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXJzJzogWydmcmVkJywgJ2Jhcm5leSddIH0pO1xuICogLy8gPT4gJzxsaT5mcmVkPC9saT48bGk+YmFybmV5PC9saT4nXG4gKlxuICogLy8gVXNlIHRoZSBgc291cmNlVVJMYCBvcHRpb24gdG8gc3BlY2lmeSBhIGN1c3RvbSBzb3VyY2VVUkwgZm9yIHRoZSB0ZW1wbGF0ZS5cbiAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hlbGxvIDwlPSB1c2VyICU+IScsIHsgJ3NvdXJjZVVSTCc6ICcvYmFzaWMvZ3JlZXRpbmcuanN0JyB9KTtcbiAqIGNvbXBpbGVkKGRhdGEpO1xuICogLy8gPT4gRmluZCB0aGUgc291cmNlIG9mIFwiZ3JlZXRpbmcuanN0XCIgdW5kZXIgdGhlIFNvdXJjZXMgdGFiIG9yIFJlc291cmNlcyBwYW5lbCBvZiB0aGUgd2ViIGluc3BlY3Rvci5cbiAqXG4gKiAvLyBVc2UgdGhlIGB2YXJpYWJsZWAgb3B0aW9uIHRvIGVuc3VyZSBhIHdpdGgtc3RhdGVtZW50IGlzbid0IHVzZWQgaW4gdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGkgPCU9IGRhdGEudXNlciAlPiEnLCB7ICd2YXJpYWJsZSc6ICdkYXRhJyB9KTtcbiAqIGNvbXBpbGVkLnNvdXJjZTtcbiAqIC8vID0+IGZ1bmN0aW9uKGRhdGEpIHtcbiAqIC8vICAgdmFyIF9fdCwgX19wID0gJyc7XG4gKiAvLyAgIF9fcCArPSAnaGkgJyArICgoX190ID0gKCBkYXRhLnVzZXIgKSkgPT0gbnVsbCA/ICcnIDogX190KSArICchJztcbiAqIC8vICAgcmV0dXJuIF9fcDtcbiAqIC8vIH1cbiAqXG4gKiAvLyBVc2UgY3VzdG9tIHRlbXBsYXRlIGRlbGltaXRlcnMuXG4gKiBfLnRlbXBsYXRlU2V0dGluZ3MuaW50ZXJwb2xhdGUgPSAve3soW1xcc1xcU10rPyl9fS9nO1xuICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8ge3sgdXNlciB9fSEnKTtcbiAqIGNvbXBpbGVkKHsgJ3VzZXInOiAnbXVzdGFjaGUnIH0pO1xuICogLy8gPT4gJ2hlbGxvIG11c3RhY2hlISdcbiAqXG4gKiAvLyBVc2UgdGhlIGBzb3VyY2VgIHByb3BlcnR5IHRvIGlubGluZSBjb21waWxlZCB0ZW1wbGF0ZXMgZm9yIG1lYW5pbmdmdWxcbiAqIC8vIGxpbmUgbnVtYmVycyBpbiBlcnJvciBtZXNzYWdlcyBhbmQgc3RhY2sgdHJhY2VzLlxuICogZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2pzdC5qcycpLCAnXFxcbiAqICAgdmFyIEpTVCA9IHtcXFxuICogICAgIFwibWFpblwiOiAnICsgXy50ZW1wbGF0ZShtYWluVGV4dCkuc291cmNlICsgJ1xcXG4gKiAgIH07XFxcbiAqICcpO1xuICovXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHJpbmcsIG9wdGlvbnMsIGd1YXJkKSB7XG4gIC8vIEJhc2VkIG9uIEpvaG4gUmVzaWcncyBgdG1wbGAgaW1wbGVtZW50YXRpb25cbiAgLy8gKGh0dHA6Ly9lam9obi5vcmcvYmxvZy9qYXZhc2NyaXB0LW1pY3JvLXRlbXBsYXRpbmcvKVxuICAvLyBhbmQgTGF1cmEgRG9rdG9yb3ZhJ3MgZG9ULmpzIChodHRwczovL2dpdGh1Yi5jb20vb2xhZG8vZG9UKS5cbiAgdmFyIHNldHRpbmdzID0gdGVtcGxhdGVTZXR0aW5ncy5pbXBvcnRzLl8udGVtcGxhdGVTZXR0aW5ncyB8fCB0ZW1wbGF0ZVNldHRpbmdzO1xuXG4gIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzdHJpbmcsIG9wdGlvbnMsIGd1YXJkKSkge1xuICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgb3B0aW9ucyA9IGFzc2lnbkluV2l0aCh7fSwgb3B0aW9ucywgc2V0dGluZ3MsIGN1c3RvbURlZmF1bHRzQXNzaWduSW4pO1xuXG4gIHZhciBpbXBvcnRzID0gYXNzaWduSW5XaXRoKHt9LCBvcHRpb25zLmltcG9ydHMsIHNldHRpbmdzLmltcG9ydHMsIGN1c3RvbURlZmF1bHRzQXNzaWduSW4pLFxuICAgICAgaW1wb3J0c0tleXMgPSBrZXlzKGltcG9ydHMpLFxuICAgICAgaW1wb3J0c1ZhbHVlcyA9IGJhc2VWYWx1ZXMoaW1wb3J0cywgaW1wb3J0c0tleXMpO1xuXG4gIHZhciBpc0VzY2FwaW5nLFxuICAgICAgaXNFdmFsdWF0aW5nLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgaW50ZXJwb2xhdGUgPSBvcHRpb25zLmludGVycG9sYXRlIHx8IHJlTm9NYXRjaCxcbiAgICAgIHNvdXJjZSA9IFwiX19wICs9ICdcIjtcblxuICAvLyBDb21waWxlIHRoZSByZWdleHAgdG8gbWF0Y2ggZWFjaCBkZWxpbWl0ZXIuXG4gIHZhciByZURlbGltaXRlcnMgPSBSZWdFeHAoXG4gICAgKG9wdGlvbnMuZXNjYXBlIHx8IHJlTm9NYXRjaCkuc291cmNlICsgJ3wnICtcbiAgICBpbnRlcnBvbGF0ZS5zb3VyY2UgKyAnfCcgK1xuICAgIChpbnRlcnBvbGF0ZSA9PT0gcmVJbnRlcnBvbGF0ZSA/IHJlRXNUZW1wbGF0ZSA6IHJlTm9NYXRjaCkuc291cmNlICsgJ3wnICtcbiAgICAob3B0aW9ucy5ldmFsdWF0ZSB8fCByZU5vTWF0Y2gpLnNvdXJjZSArICd8JCdcbiAgLCAnZycpO1xuXG4gIC8vIFVzZSBhIHNvdXJjZVVSTCBmb3IgZWFzaWVyIGRlYnVnZ2luZy5cbiAgLy8gVGhlIHNvdXJjZVVSTCBnZXRzIGluamVjdGVkIGludG8gdGhlIHNvdXJjZSB0aGF0J3MgZXZhbC1lZCwgc28gYmUgY2FyZWZ1bFxuICAvLyB3aXRoIGxvb2t1cCAoaW4gY2FzZSBvZiBlLmcuIHByb3RvdHlwZSBwb2xsdXRpb24pLCBhbmQgc3RyaXAgbmV3bGluZXMgaWYgYW55LlxuICAvLyBBIG5ld2xpbmUgd291bGRuJ3QgYmUgYSB2YWxpZCBzb3VyY2VVUkwgYW55d2F5LCBhbmQgaXQnZCBlbmFibGUgY29kZSBpbmplY3Rpb24uXG4gIHZhciBzb3VyY2VVUkwgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdzb3VyY2VVUkwnKVxuICAgID8gKCcvLyMgc291cmNlVVJMPScgK1xuICAgICAgIChvcHRpb25zLnNvdXJjZVVSTCArICcnKS5yZXBsYWNlKC9bXFxyXFxuXS9nLCAnICcpICtcbiAgICAgICAnXFxuJylcbiAgICA6ICcnO1xuXG4gIHN0cmluZy5yZXBsYWNlKHJlRGVsaW1pdGVycywgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZVZhbHVlLCBpbnRlcnBvbGF0ZVZhbHVlLCBlc1RlbXBsYXRlVmFsdWUsIGV2YWx1YXRlVmFsdWUsIG9mZnNldCkge1xuICAgIGludGVycG9sYXRlVmFsdWUgfHwgKGludGVycG9sYXRlVmFsdWUgPSBlc1RlbXBsYXRlVmFsdWUpO1xuXG4gICAgLy8gRXNjYXBlIGNoYXJhY3RlcnMgdGhhdCBjYW4ndCBiZSBpbmNsdWRlZCBpbiBzdHJpbmcgbGl0ZXJhbHMuXG4gICAgc291cmNlICs9IHN0cmluZy5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKHJlVW5lc2NhcGVkU3RyaW5nLCBlc2NhcGVTdHJpbmdDaGFyKTtcblxuICAgIC8vIFJlcGxhY2UgZGVsaW1pdGVycyB3aXRoIHNuaXBwZXRzLlxuICAgIGlmIChlc2NhcGVWYWx1ZSkge1xuICAgICAgaXNFc2NhcGluZyA9IHRydWU7XG4gICAgICBzb3VyY2UgKz0gXCInICtcXG5fX2UoXCIgKyBlc2NhcGVWYWx1ZSArIFwiKSArXFxuJ1wiO1xuICAgIH1cbiAgICBpZiAoZXZhbHVhdGVWYWx1ZSkge1xuICAgICAgaXNFdmFsdWF0aW5nID0gdHJ1ZTtcbiAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZVZhbHVlICsgXCI7XFxuX19wICs9ICdcIjtcbiAgICB9XG4gICAgaWYgKGludGVycG9sYXRlVmFsdWUpIHtcbiAgICAgIHNvdXJjZSArPSBcIicgK1xcbigoX190ID0gKFwiICsgaW50ZXJwb2xhdGVWYWx1ZSArIFwiKSkgPT0gbnVsbCA/ICcnIDogX190KSArXFxuJ1wiO1xuICAgIH1cbiAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgIC8vIFRoZSBKUyBlbmdpbmUgZW1iZWRkZWQgaW4gQWRvYmUgcHJvZHVjdHMgbmVlZHMgYG1hdGNoYCByZXR1cm5lZCBpblxuICAgIC8vIG9yZGVyIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3QgYG9mZnNldGAgdmFsdWUuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcblxuICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gIC8vIElmIGB2YXJpYWJsZWAgaXMgbm90IHNwZWNpZmllZCB3cmFwIGEgd2l0aC1zdGF0ZW1lbnQgYXJvdW5kIHRoZSBnZW5lcmF0ZWRcbiAgLy8gY29kZSB0byBhZGQgdGhlIGRhdGEgb2JqZWN0IHRvIHRoZSB0b3Agb2YgdGhlIHNjb3BlIGNoYWluLlxuICAvLyBMaWtlIHdpdGggc291cmNlVVJMLCB3ZSB0YWtlIGNhcmUgdG8gbm90IGNoZWNrIHRoZSBvcHRpb24ncyBwcm90b3R5cGUsXG4gIC8vIGFzIHRoaXMgY29uZmlndXJhdGlvbiBpcyBhIGNvZGUgaW5qZWN0aW9uIHZlY3Rvci5cbiAgdmFyIHZhcmlhYmxlID0gaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAndmFyaWFibGUnKSAmJiBvcHRpb25zLnZhcmlhYmxlO1xuICBpZiAoIXZhcmlhYmxlKSB7XG4gICAgc291cmNlID0gJ3dpdGggKG9iaikge1xcbicgKyBzb3VyY2UgKyAnXFxufVxcbic7XG4gIH1cbiAgLy8gQ2xlYW51cCBjb2RlIGJ5IHN0cmlwcGluZyBlbXB0eSBzdHJpbmdzLlxuICBzb3VyY2UgPSAoaXNFdmFsdWF0aW5nID8gc291cmNlLnJlcGxhY2UocmVFbXB0eVN0cmluZ0xlYWRpbmcsICcnKSA6IHNvdXJjZSlcbiAgICAucmVwbGFjZShyZUVtcHR5U3RyaW5nTWlkZGxlLCAnJDEnKVxuICAgIC5yZXBsYWNlKHJlRW1wdHlTdHJpbmdUcmFpbGluZywgJyQxOycpO1xuXG4gIC8vIEZyYW1lIGNvZGUgYXMgdGhlIGZ1bmN0aW9uIGJvZHkuXG4gIHNvdXJjZSA9ICdmdW5jdGlvbignICsgKHZhcmlhYmxlIHx8ICdvYmonKSArICcpIHtcXG4nICtcbiAgICAodmFyaWFibGVcbiAgICAgID8gJydcbiAgICAgIDogJ29iaiB8fCAob2JqID0ge30pO1xcbidcbiAgICApICtcbiAgICBcInZhciBfX3QsIF9fcCA9ICcnXCIgK1xuICAgIChpc0VzY2FwaW5nXG4gICAgICAgPyAnLCBfX2UgPSBfLmVzY2FwZSdcbiAgICAgICA6ICcnXG4gICAgKSArXG4gICAgKGlzRXZhbHVhdGluZ1xuICAgICAgPyAnLCBfX2ogPSBBcnJheS5wcm90b3R5cGUuam9pbjtcXG4nICtcbiAgICAgICAgXCJmdW5jdGlvbiBwcmludCgpIHsgX19wICs9IF9fai5jYWxsKGFyZ3VtZW50cywgJycpIH1cXG5cIlxuICAgICAgOiAnO1xcbidcbiAgICApICtcbiAgICBzb3VyY2UgK1xuICAgICdyZXR1cm4gX19wXFxufSc7XG5cbiAgdmFyIHJlc3VsdCA9IGF0dGVtcHQoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uKGltcG9ydHNLZXlzLCBzb3VyY2VVUkwgKyAncmV0dXJuICcgKyBzb3VyY2UpXG4gICAgICAuYXBwbHkodW5kZWZpbmVkLCBpbXBvcnRzVmFsdWVzKTtcbiAgfSk7XG5cbiAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgZnVuY3Rpb24ncyBzb3VyY2UgYnkgaXRzIGB0b1N0cmluZ2AgbWV0aG9kIG9yXG4gIC8vIHRoZSBgc291cmNlYCBwcm9wZXJ0eSBhcyBhIGNvbnZlbmllbmNlIGZvciBpbmxpbmluZyBjb21waWxlZCB0ZW1wbGF0ZXMuXG4gIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XG4gIGlmIChpc0Vycm9yKHJlc3VsdCkpIHtcbiAgICB0aHJvdyByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVtcGxhdGU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5RWFjaDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlRm9yO1xuIiwiaW1wb3J0IGNyZWF0ZUJhc2VGb3IgZnJvbSAnLi9fY3JlYXRlQmFzZUZvci5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZvcjtcbiIsImltcG9ydCBiYXNlRm9yIGZyb20gJy4vX2Jhc2VGb3IuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlRm9yT3duO1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlRWFjaDtcbiIsImltcG9ydCBiYXNlRm9yT3duIGZyb20gJy4vX2Jhc2VGb3JPd24uanMnO1xuaW1wb3J0IGNyZWF0ZUJhc2VFYWNoIGZyb20gJy4vX2NyZWF0ZUJhc2VFYWNoLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VFYWNoO1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYGlkZW50aXR5YCBpZiBpdCdzIG5vdCBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGNhc3QgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhc3RGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgPyB2YWx1ZSA6IGlkZW50aXR5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0RnVuY3Rpb247XG4iLCJpbXBvcnQgYXJyYXlFYWNoIGZyb20gJy4vX2FycmF5RWFjaC5qcyc7XG5pbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGNhc3RGdW5jdGlvbiBmcm9tICcuL19jYXN0RnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZm9yRWFjaChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgY2FzdEZ1bmN0aW9uKGl0ZXJhdGVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvckVhY2g7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUNsZWFyO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NvY0luZGV4T2Y7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlRGVsZXRlO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVHZXQ7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlU2V0O1xuIiwiaW1wb3J0IGxpc3RDYWNoZUNsZWFyIGZyb20gJy4vX2xpc3RDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVEZWxldGUgZnJvbSAnLi9fbGlzdENhY2hlRGVsZXRlLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVHZXQgZnJvbSAnLi9fbGlzdENhY2hlR2V0LmpzJztcbmltcG9ydCBsaXN0Q2FjaGVIYXMgZnJvbSAnLi9fbGlzdENhY2hlSGFzLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVTZXQgZnJvbSAnLi9fbGlzdENhY2hlU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrRGVsZXRlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0dldDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrSGFzO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUNyZWF0ZTtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hEZWxldGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEdldDtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyAoZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoSGFzO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaFNldDtcbiIsImltcG9ydCBoYXNoQ2xlYXIgZnJvbSAnLi9faGFzaENsZWFyLmpzJztcbmltcG9ydCBoYXNoRGVsZXRlIGZyb20gJy4vX2hhc2hEZWxldGUuanMnO1xuaW1wb3J0IGhhc2hHZXQgZnJvbSAnLi9faGFzaEdldC5qcyc7XG5pbXBvcnQgaGFzaEhhcyBmcm9tICcuL19oYXNoSGFzLmpzJztcbmltcG9ydCBoYXNoU2V0IGZyb20gJy4vX2hhc2hTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuZXhwb3J0IGRlZmF1bHQgSGFzaDtcbiIsImltcG9ydCBIYXNoIGZyb20gJy4vX0hhc2guanMnO1xuaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlQ2xlYXI7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzS2V5YWJsZTtcbiIsImltcG9ydCBpc0tleWFibGUgZnJvbSAnLi9faXNLZXlhYmxlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRNYXBEYXRhO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlR2V0O1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlSGFzO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVTZXQ7XG4iLCJpbXBvcnQgbWFwQ2FjaGVDbGVhciBmcm9tICcuL19tYXBDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBtYXBDYWNoZURlbGV0ZSBmcm9tICcuL19tYXBDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVHZXQgZnJvbSAnLi9fbWFwQ2FjaGVHZXQuanMnO1xuaW1wb3J0IG1hcENhY2hlSGFzIGZyb20gJy4vX21hcENhY2hlSGFzLmpzJztcbmltcG9ydCBtYXBDYWNoZVNldCBmcm9tICcuL19tYXBDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBNYXBDYWNoZTtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcbmltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGRhdGEuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgdGhpcy5zaXplID0gKytkYXRhLnNpemU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja1NldDtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBzdGFja0NsZWFyIGZyb20gJy4vX3N0YWNrQ2xlYXIuanMnO1xuaW1wb3J0IHN0YWNrRGVsZXRlIGZyb20gJy4vX3N0YWNrRGVsZXRlLmpzJztcbmltcG9ydCBzdGFja0dldCBmcm9tICcuL19zdGFja0dldC5qcyc7XG5pbXBvcnQgc3RhY2tIYXMgZnJvbSAnLi9fc3RhY2tIYXMuanMnO1xuaW1wb3J0IHN0YWNrU2V0IGZyb20gJy4vX3N0YWNrU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcbiIsImltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduTWVyZ2VWYWx1ZTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBhbGxvY1Vuc2FmZSA9IEJ1ZmZlciA/IEJ1ZmZlci5hbGxvY1Vuc2FmZSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFsbG9jVW5zYWZlID8gYWxsb2NVbnNhZmUobGVuZ3RoKSA6IG5ldyBidWZmZXIuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZUJ1ZmZlcjtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBVaW50OEFycmF5O1xuIiwiaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLi9fVWludDhBcnJheS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVBcnJheUJ1ZmZlcjtcbiIsImltcG9ydCBjbG9uZUFycmF5QnVmZmVyIGZyb20gJy4vX2Nsb25lQXJyYXlCdWZmZXIuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZVR5cGVkQXJyYXk7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29weUFycmF5O1xuIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG52YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gb2JqZWN0KCkge31cbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3RvKSB7XG4gICAgaWYgKCFpc09iamVjdChwcm90bykpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgaWYgKG9iamVjdENyZWF0ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdENyZWF0ZShwcm90byk7XG4gICAgfVxuICAgIG9iamVjdC5wcm90b3R5cGUgPSBwcm90bztcbiAgICB2YXIgcmVzdWx0ID0gbmV3IG9iamVjdDtcbiAgICBvYmplY3QucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlQ3JlYXRlO1xuIiwiaW1wb3J0IGJhc2VDcmVhdGUgZnJvbSAnLi9fYmFzZUNyZWF0ZS5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRDbG9uZU9iamVjdDtcbiIsImltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlT2JqZWN0O1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCwgdW5sZXNzIGBrZXlgIGlzIFwiX19wcm90b19fXCIgb3IgXCJjb25zdHJ1Y3RvclwiLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc2FmZUdldChvYmplY3QsIGtleSkge1xuICBpZiAoa2V5ID09PSAnY29uc3RydWN0b3InICYmIHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gb2JqZWN0W2tleV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNhZmVHZXQ7XG4iLCJpbXBvcnQgY29weU9iamVjdCBmcm9tICcuL19jb3B5T2JqZWN0LmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvUGxhaW5PYmplY3Q7XG4iLCJpbXBvcnQgYXNzaWduTWVyZ2VWYWx1ZSBmcm9tICcuL19hc3NpZ25NZXJnZVZhbHVlLmpzJztcbmltcG9ydCBjbG9uZUJ1ZmZlciBmcm9tICcuL19jbG9uZUJ1ZmZlci5qcyc7XG5pbXBvcnQgY2xvbmVUeXBlZEFycmF5IGZyb20gJy4vX2Nsb25lVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgY29weUFycmF5IGZyb20gJy4vX2NvcHlBcnJheS5qcyc7XG5pbXBvcnQgaW5pdENsb25lT2JqZWN0IGZyb20gJy4vX2luaXRDbG9uZU9iamVjdC5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlT2JqZWN0IGZyb20gJy4vaXNBcnJheUxpa2VPYmplY3QuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJy4vaXNQbGFpbk9iamVjdC5qcyc7XG5pbXBvcnQgaXNUeXBlZEFycmF5IGZyb20gJy4vaXNUeXBlZEFycmF5LmpzJztcbmltcG9ydCBzYWZlR2V0IGZyb20gJy4vX3NhZmVHZXQuanMnO1xuaW1wb3J0IHRvUGxhaW5PYmplY3QgZnJvbSAnLi90b1BsYWluT2JqZWN0LmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IHNhZmVHZXQob2JqZWN0LCBrZXkpLFxuICAgICAgc3JjVmFsdWUgPSBzYWZlR2V0KHNvdXJjZSwga2V5KSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICB2YXIgaXNBcnIgPSBpc0FycmF5KHNyY1ZhbHVlKSxcbiAgICAgICAgaXNCdWZmID0gIWlzQXJyICYmIGlzQnVmZmVyKHNyY1ZhbHVlKSxcbiAgICAgICAgaXNUeXBlZCA9ICFpc0FyciAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheShzcmNWYWx1ZSk7XG5cbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FyciB8fCBpc0J1ZmYgfHwgaXNUeXBlZCkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNCdWZmKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVCdWZmZXIoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNUeXBlZCkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lVHlwZWRBcnJheShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCBpc0Z1bmN0aW9uKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGluaXRDbG9uZU9iamVjdChzcmNWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlRGVlcDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYXNzaWduTWVyZ2VWYWx1ZSBmcm9tICcuL19hc3NpZ25NZXJnZVZhbHVlLmpzJztcbmltcG9ydCBiYXNlRm9yIGZyb20gJy4vX2Jhc2VGb3IuanMnO1xuaW1wb3J0IGJhc2VNZXJnZURlZXAgZnJvbSAnLi9fYmFzZU1lcmdlRGVlcC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcbmltcG9ydCBzYWZlR2V0IGZyb20gJy4vX3NhZmVHZXQuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYmFzZUZvcihzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKHNhZmVHZXQob2JqZWN0LCBrZXkpLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0sIGtleXNJbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNZXJnZTtcbiIsImltcG9ydCBiYXNlTWVyZ2UgZnJvbSAnLi9fYmFzZU1lcmdlLmpzJztcbmltcG9ydCBjcmVhdGVBc3NpZ25lciBmcm9tICcuL19jcmVhdGVBc3NpZ25lci5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZTtcbiIsImltcG9ydCBiYXNlVmFsdWVzIGZyb20gJy4vX2Jhc2VWYWx1ZXMuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbHVlcztcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuaW1wb3J0IHNldENhY2hlQWRkIGZyb20gJy4vX3NldENhY2hlQWRkLmpzJztcbmltcG9ydCBzZXRDYWNoZUhhcyBmcm9tICcuL19zZXRDYWNoZUhhcy5qcyc7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID09IG51bGwgPyAwIDogdmFsdWVzLmxlbmd0aDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuZXhwb3J0IGRlZmF1bHQgU2V0Q2FjaGU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheVNvbWU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FjaGVIYXM7XG4iLCJpbXBvcnQgU2V0Q2FjaGUgZnJvbSAnLi9fU2V0Q2FjaGUuanMnO1xuaW1wb3J0IGFycmF5U29tZSBmcm9tICcuL19hcnJheVNvbWUuanMnO1xuaW1wb3J0IGNhY2hlSGFzIGZyb20gJy4vX2NhY2hlSGFzLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxBcnJheXM7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0VG9BcnJheTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBtYXBUb0FycmF5IGZyb20gJy4vX21hcFRvQXJyYXkuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsQnlUYWc7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5UHVzaDtcbiIsImltcG9ydCBhcnJheVB1c2ggZnJvbSAnLi9fYXJyYXlQdXNoLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldEFsbEtleXM7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5maWx0ZXJgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlGaWx0ZXIoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0W3Jlc0luZGV4KytdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5RmlsdGVyO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkFycmF5O1xuIiwiaW1wb3J0IGFycmF5RmlsdGVyIGZyb20gJy4vX2FycmF5RmlsdGVyLmpzJztcbmltcG9ydCBzdHViQXJyYXkgZnJvbSAnLi9zdHViQXJyYXkuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9ICFuYXRpdmVHZXRTeW1ib2xzID8gc3R1YkFycmF5IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGFycmF5RmlsdGVyKG5hdGl2ZUdldFN5bWJvbHMob2JqZWN0KSwgZnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBzeW1ib2wpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFN5bWJvbHM7XG4iLCJpbXBvcnQgYmFzZUdldEFsbEtleXMgZnJvbSAnLi9fYmFzZUdldEFsbEtleXMuanMnO1xuaW1wb3J0IGdldFN5bWJvbHMgZnJvbSAnLi9fZ2V0U3ltYm9scy5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRBbGxLZXlzO1xuIiwiaW1wb3J0IGdldEFsbEtleXMgZnJvbSAnLi9fZ2V0QWxsS2V5cy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbE9iamVjdHM7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5leHBvcnQgZGVmYXVsdCBEYXRhVmlldztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5leHBvcnQgZGVmYXVsdCBTZXQ7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgV2Vha01hcDtcbiIsImltcG9ydCBEYXRhVmlldyBmcm9tICcuL19EYXRhVmlldy5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuL19Qcm9taXNlLmpzJztcbmltcG9ydCBTZXQgZnJvbSAnLi9fU2V0LmpzJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy4vX1dlYWtNYXAuanMnO1xuaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUYWc7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBlcXVhbEJ5VGFnIGZyb20gJy4vX2VxdWFsQnlUYWcuanMnO1xuaW1wb3J0IGVxdWFsT2JqZWN0cyBmcm9tICcuL19lcXVhbE9iamVjdHMuanMnO1xuaW1wb3J0IGdldFRhZyBmcm9tICcuL19nZXRUYWcuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzRXF1YWxEZWVwO1xuIiwiaW1wb3J0IGJhc2VJc0VxdWFsRGVlcCBmcm9tICcuL19iYXNlSXNFcXVhbERlZXAuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNFcXVhbDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTWF0Y2g7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwiaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIHJlc3VsdFtsZW5ndGhdID0gW2tleSwgdmFsdWUsIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE1hdGNoRGF0YTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGU7XG4iLCJpbXBvcnQgYmFzZUlzTWF0Y2ggZnJvbSAnLi9fYmFzZUlzTWF0Y2guanMnO1xuaW1wb3J0IGdldE1hdGNoRGF0YSBmcm9tICcuL19nZXRNYXRjaERhdGEuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXRjaGVzO1xuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleTtcbiIsImltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBjbGVhcmAsIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAhPSBudWxsICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJy4vbWVtb2l6ZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBtYXhpbXVtIG1lbW9pemUgY2FjaGUgc2l6ZS4gKi9cbnZhciBNQVhfTUVNT0laRV9TSVpFID0gNTAwO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tZW1vaXplYCB3aGljaCBjbGVhcnMgdGhlIG1lbW9pemVkIGZ1bmN0aW9uJ3NcbiAqIGNhY2hlIHdoZW4gaXQgZXhjZWVkcyBgTUFYX01FTU9JWkVfU0laRWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtZW1vaXplQ2FwcGVkKGZ1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IG1lbW9pemUoZnVuYywgZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKGNhY2hlLnNpemUgPT09IE1BWF9NRU1PSVpFX1NJWkUpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH0pO1xuXG4gIHZhciBjYWNoZSA9IHJlc3VsdC5jYWNoZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZUNhcHBlZDtcbiIsImltcG9ydCBtZW1vaXplQ2FwcGVkIGZyb20gJy4vX21lbW9pemVDYXBwZWQuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHN0cmluZy5jaGFyQ29kZUF0KDApID09PSA0NiAvKiAuICovKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN1YlN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1RvUGF0aDtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IHN0cmluZ1RvUGF0aCBmcm9tICcuL19zdHJpbmdUb1BhdGguanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzS2V5KHZhbHVlLCBvYmplY3QpID8gW3ZhbHVlXSA6IHN0cmluZ1RvUGF0aCh0b1N0cmluZyh2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0UGF0aDtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvS2V5O1xuIiwiaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXQ7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXQ7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmhhc0luYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzSW4ob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGtleSBpbiBPYmplY3Qob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUhhc0luO1xuIiwiaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCB8fCArK2luZGV4ICE9IGxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogb2JqZWN0Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNQYXRoO1xuIiwiaW1wb3J0IGJhc2VIYXNJbiBmcm9tICcuL19iYXNlSGFzSW4uanMnO1xuaW1wb3J0IGhhc1BhdGggZnJvbSAnLi9faGFzUGF0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzSW47XG4iLCJpbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuaW1wb3J0IGdldCBmcm9tICcuL2dldC5qcyc7XG5pbXBvcnQgaGFzSW4gZnJvbSAnLi9oYXNJbi5qcyc7XG5pbXBvcnQgaXNLZXkgZnJvbSAnLi9faXNLZXkuanMnO1xuaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNyY1ZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSh0b0tleShwYXRoKSwgc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBnZXQob2JqZWN0LCBwYXRoKTtcbiAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICA6IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgfCBDT01QQVJFX1VOT1JERVJFRF9GTEFHKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hdGNoZXNQcm9wZXJ0eTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eTtcbiIsImltcG9ydCBiYXNlR2V0IGZyb20gJy4vX2Jhc2VHZXQuanMnO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVByb3BlcnR5YCB3aGljaCBzdXBwb3J0cyBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eURlZXAocGF0aCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVByb3BlcnR5RGVlcDtcbiIsImltcG9ydCBiYXNlUHJvcGVydHkgZnJvbSAnLi9fYmFzZVByb3BlcnR5LmpzJztcbmltcG9ydCBiYXNlUHJvcGVydHlEZWVwIGZyb20gJy4vX2Jhc2VQcm9wZXJ0eURlZXAuanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCB0b0tleSBmcm9tICcuL190b0tleS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IDIgfSB9LFxuICogICB7ICdhJzogeyAnYic6IDEgfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYicpKTtcbiAqIC8vID0+IFsyLCAxXVxuICpcbiAqIF8ubWFwKF8uc29ydEJ5KG9iamVjdHMsIF8ucHJvcGVydHkoWydhJywgJ2InXSkpLCAnYS5iJyk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkodG9LZXkocGF0aCkpIDogYmFzZVByb3BlcnR5RGVlcChwYXRoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvcGVydHk7XG4iLCJpbXBvcnQgYmFzZU1hdGNoZXMgZnJvbSAnLi9fYmFzZU1hdGNoZXMuanMnO1xuaW1wb3J0IGJhc2VNYXRjaGVzUHJvcGVydHkgZnJvbSAnLi9fYmFzZU1hdGNoZXNQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJy4vcHJvcGVydHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICovXG5mdW5jdGlvbiBiYXNlSXRlcmF0ZWUodmFsdWUpIHtcbiAgLy8gRG9uJ3Qgc3RvcmUgdGhlIGB0eXBlb2ZgIHJlc3VsdCBpbiBhIHZhcmlhYmxlIHRvIGF2b2lkIGEgSklUIGJ1ZyBpbiBTYWZhcmkgOS5cbiAgLy8gU2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYwMzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICA6IGJhc2VNYXRjaGVzKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXRlcmF0ZWU7XG4iLCJpbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hcGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlTWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBBcnJheShjb2xsZWN0aW9uLmxlbmd0aCkgOiBbXTtcblxuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gaXRlcmF0ZWUodmFsdWUsIGtleSwgY29sbGVjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWFwO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zb3J0QnlgIHdoaWNoIHVzZXMgYGNvbXBhcmVyYCB0byBkZWZpbmUgdGhlXG4gKiBzb3J0IG9yZGVyIG9mIGBhcnJheWAgYW5kIHJlcGxhY2VzIGNyaXRlcmlhIG9iamVjdHMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nXG4gKiB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyZXIgVGhlIGZ1bmN0aW9uIHRvIGRlZmluZSBzb3J0IG9yZGVyLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTb3J0QnkoYXJyYXksIGNvbXBhcmVyKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgYXJyYXkuc29ydChjb21wYXJlcik7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGFycmF5W2xlbmd0aF0gPSBhcnJheVtsZW5ndGhdLnZhbHVlO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNvcnRCeTtcbiIsImltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqXG4gKiBDb21wYXJlcyB2YWx1ZXMgdG8gc29ydCB0aGVtIGluIGFzY2VuZGluZyBvcmRlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYHZhbHVlYC5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUFzY2VuZGluZyh2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKHZhbHVlICE9PSBvdGhlcikge1xuICAgIHZhciB2YWxJc0RlZmluZWQgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgICB2YWxJc051bGwgPSB2YWx1ZSA9PT0gbnVsbCxcbiAgICAgICAgdmFsSXNSZWZsZXhpdmUgPSB2YWx1ZSA9PT0gdmFsdWUsXG4gICAgICAgIHZhbElzU3ltYm9sID0gaXNTeW1ib2wodmFsdWUpO1xuXG4gICAgdmFyIG90aElzRGVmaW5lZCA9IG90aGVyICE9PSB1bmRlZmluZWQsXG4gICAgICAgIG90aElzTnVsbCA9IG90aGVyID09PSBudWxsLFxuICAgICAgICBvdGhJc1JlZmxleGl2ZSA9IG90aGVyID09PSBvdGhlcixcbiAgICAgICAgb3RoSXNTeW1ib2wgPSBpc1N5bWJvbChvdGhlcik7XG5cbiAgICBpZiAoKCFvdGhJc051bGwgJiYgIW90aElzU3ltYm9sICYmICF2YWxJc1N5bWJvbCAmJiB2YWx1ZSA+IG90aGVyKSB8fFxuICAgICAgICAodmFsSXNTeW1ib2wgJiYgb3RoSXNEZWZpbmVkICYmIG90aElzUmVmbGV4aXZlICYmICFvdGhJc051bGwgJiYgIW90aElzU3ltYm9sKSB8fFxuICAgICAgICAodmFsSXNOdWxsICYmIG90aElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgKCF2YWxJc0RlZmluZWQgJiYgb3RoSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICF2YWxJc1JlZmxleGl2ZSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmICgoIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wgJiYgIW90aElzU3ltYm9sICYmIHZhbHVlIDwgb3RoZXIpIHx8XG4gICAgICAgIChvdGhJc1N5bWJvbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUgJiYgIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wpIHx8XG4gICAgICAgIChvdGhJc051bGwgJiYgdmFsSXNEZWZpbmVkICYmIHZhbElzUmVmbGV4aXZlKSB8fFxuICAgICAgICAoIW90aElzRGVmaW5lZCAmJiB2YWxJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgIW90aElzUmVmbGV4aXZlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wYXJlQXNjZW5kaW5nO1xuIiwiaW1wb3J0IGNvbXBhcmVBc2NlbmRpbmcgZnJvbSAnLi9fY29tcGFyZUFzY2VuZGluZy5qcyc7XG5cbi8qKlxuICogVXNlZCBieSBgXy5vcmRlckJ5YCB0byBjb21wYXJlIG11bHRpcGxlIHByb3BlcnRpZXMgb2YgYSB2YWx1ZSB0byBhbm90aGVyXG4gKiBhbmQgc3RhYmxlIHNvcnQgdGhlbS5cbiAqXG4gKiBJZiBgb3JkZXJzYCBpcyB1bnNwZWNpZmllZCwgYWxsIHZhbHVlcyBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLFxuICogc3BlY2lmeSBhbiBvcmRlciBvZiBcImRlc2NcIiBmb3IgZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlclxuICogb2YgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbltdfHN0cmluZ1tdfSBvcmRlcnMgVGhlIG9yZGVyIHRvIHNvcnQgYnkgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBvYmpDcml0ZXJpYSA9IG9iamVjdC5jcml0ZXJpYSxcbiAgICAgIG90aENyaXRlcmlhID0gb3RoZXIuY3JpdGVyaWEsXG4gICAgICBsZW5ndGggPSBvYmpDcml0ZXJpYS5sZW5ndGgsXG4gICAgICBvcmRlcnNMZW5ndGggPSBvcmRlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbXBhcmVBc2NlbmRpbmcob2JqQ3JpdGVyaWFbaW5kZXhdLCBvdGhDcml0ZXJpYVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChpbmRleCA+PSBvcmRlcnNMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHZhciBvcmRlciA9IG9yZGVyc1tpbmRleF07XG4gICAgICByZXR1cm4gcmVzdWx0ICogKG9yZGVyID09ICdkZXNjJyA/IC0xIDogMSk7XG4gICAgfVxuICB9XG4gIC8vIEZpeGVzIGFuIGBBcnJheSNzb3J0YCBidWcgaW4gdGhlIEpTIGVuZ2luZSBlbWJlZGRlZCBpbiBBZG9iZSBhcHBsaWNhdGlvbnNcbiAgLy8gdGhhdCBjYXVzZXMgaXQsIHVuZGVyIGNlcnRhaW4gY2lyY3Vtc3RhbmNlcywgdG8gcHJvdmlkZSB0aGUgc2FtZSB2YWx1ZSBmb3JcbiAgLy8gYG9iamVjdGAgYW5kIGBvdGhlcmAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvcHVsbC8xMjQ3XG4gIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBlbnN1cmVzIGEgc3RhYmxlIHNvcnQgaW4gVjggYW5kIG90aGVyIGVuZ2luZXMuXG4gIC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD05MCBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gb2JqZWN0LmluZGV4IC0gb3RoZXIuaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBhcmVNdWx0aXBsZTtcbiIsImltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgYmFzZU1hcCBmcm9tICcuL19iYXNlTWFwLmpzJztcbmltcG9ydCBiYXNlU29ydEJ5IGZyb20gJy4vX2Jhc2VTb3J0QnkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IGNvbXBhcmVNdWx0aXBsZSBmcm9tICcuL19jb21wYXJlTXVsdGlwbGUuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm9yZGVyQnlgIHdpdGhvdXQgcGFyYW0gZ3VhcmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IGl0ZXJhdGVlcyBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcmRlcnMgVGhlIHNvcnQgb3JkZXJzIG9mIGBpdGVyYXRlZXNgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgc29ydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlT3JkZXJCeShjb2xsZWN0aW9uLCBpdGVyYXRlZXMsIG9yZGVycykge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgaXRlcmF0ZWVzID0gYXJyYXlNYXAoaXRlcmF0ZWVzLmxlbmd0aCA/IGl0ZXJhdGVlcyA6IFtpZGVudGl0eV0sIGJhc2VVbmFyeShiYXNlSXRlcmF0ZWUpKTtcblxuICB2YXIgcmVzdWx0ID0gYmFzZU1hcChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGNyaXRlcmlhID0gYXJyYXlNYXAoaXRlcmF0ZWVzLCBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGl0ZXJhdGVlKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyAnY3JpdGVyaWEnOiBjcml0ZXJpYSwgJ2luZGV4JzogKytpbmRleCwgJ3ZhbHVlJzogdmFsdWUgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJhc2VTb3J0QnkocmVzdWx0LCBmdW5jdGlvbihvYmplY3QsIG90aGVyKSB7XG4gICAgcmV0dXJuIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU9yZGVyQnk7XG4iLCJpbXBvcnQgYmFzZU9yZGVyQnkgZnJvbSAnLi9fYmFzZU9yZGVyQnkuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNvcnRCeWAgZXhjZXB0IHRoYXQgaXQgYWxsb3dzIHNwZWNpZnlpbmcgdGhlIHNvcnRcbiAqIG9yZGVycyBvZiB0aGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuIElmIGBvcmRlcnNgIGlzIHVuc3BlY2lmaWVkLCBhbGwgdmFsdWVzXG4gKiBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLCBzcGVjaWZ5IGFuIG9yZGVyIG9mIFwiZGVzY1wiIGZvclxuICogZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlciBvZiBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtBcnJheVtdfEZ1bmN0aW9uW118T2JqZWN0W118c3RyaW5nW119IFtpdGVyYXRlZXM9W18uaWRlbnRpdHldXVxuICogIFRoZSBpdGVyYXRlZXMgdG8gc29ydCBieS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IFtvcmRlcnNdIFRoZSBzb3J0IG9yZGVycyBvZiBgaXRlcmF0ZWVzYC5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLnJlZHVjZWAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzb3J0ZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDggfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzQgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAgfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICogXTtcbiAqXG4gKiAvLyBTb3J0IGJ5IGB1c2VyYCBpbiBhc2NlbmRpbmcgb3JkZXIgYW5kIGJ5IGBhZ2VgIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gKiBfLm9yZGVyQnkodXNlcnMsIFsndXNlcicsICdhZ2UnXSwgWydhc2MnLCAnZGVzYyddKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFtbJ2Jhcm5leScsIDM2XSwgWydiYXJuZXknLCAzNF0sIFsnZnJlZCcsIDQ4XSwgWydmcmVkJywgNDBdXVxuICovXG5mdW5jdGlvbiBvcmRlckJ5KGNvbGxlY3Rpb24sIGl0ZXJhdGVlcywgb3JkZXJzLCBndWFyZCkge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNBcnJheShpdGVyYXRlZXMpKSB7XG4gICAgaXRlcmF0ZWVzID0gaXRlcmF0ZWVzID09IG51bGwgPyBbXSA6IFtpdGVyYXRlZXNdO1xuICB9XG4gIG9yZGVycyA9IGd1YXJkID8gdW5kZWZpbmVkIDogb3JkZXJzO1xuICBpZiAoIWlzQXJyYXkob3JkZXJzKSkge1xuICAgIG9yZGVycyA9IG9yZGVycyA9PSBudWxsID8gW10gOiBbb3JkZXJzXTtcbiAgfVxuICByZXR1cm4gYmFzZU9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvcmRlckJ5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGaW5kSW5kZXg7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNOYU47XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmRleE9mYCB3aGljaCBwZXJmb3JtcyBzdHJpY3QgZXF1YWxpdHlcbiAqIGNvbXBhcmlzb25zIG9mIHZhbHVlcywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmljdEluZGV4T2Y7XG4iLCJpbXBvcnQgYmFzZUZpbmRJbmRleCBmcm9tICcuL19iYXNlRmluZEluZGV4LmpzJztcbmltcG9ydCBiYXNlSXNOYU4gZnJvbSAnLi9fYmFzZUlzTmFOLmpzJztcbmltcG9ydCBzdHJpY3RJbmRleE9mIGZyb20gJy4vX3N0cmljdEluZGV4T2YuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmluZGV4T2ZgIHdpdGhvdXQgYGZyb21JbmRleGAgYm91bmRzIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlXG4gICAgPyBzdHJpY3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KVxuICAgIDogYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUlzTmFOLCBmcm9tSW5kZXgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSW5kZXhPZjtcbiIsImltcG9ydCBiYXNlSW5kZXhPZiBmcm9tICcuL19iYXNlSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBiYXNlSW5kZXhPZihhcnJheSwgdmFsdWUsIDApID4gLTE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5SW5jbHVkZXM7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChjb21wYXJhdG9yKHZhbHVlLCBhcnJheVtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUluY2x1ZGVzV2l0aDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vb3A7XG4iLCJpbXBvcnQgU2V0IGZyb20gJy4vX1NldC5qcyc7XG5pbXBvcnQgbm9vcCBmcm9tICcuL25vb3AuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNldDtcbiIsImltcG9ydCBTZXRDYWNoZSBmcm9tICcuL19TZXRDYWNoZS5qcyc7XG5pbXBvcnQgYXJyYXlJbmNsdWRlcyBmcm9tICcuL19hcnJheUluY2x1ZGVzLmpzJztcbmltcG9ydCBhcnJheUluY2x1ZGVzV2l0aCBmcm9tICcuL19hcnJheUluY2x1ZGVzV2l0aC5qcyc7XG5pbXBvcnQgY2FjaGVIYXMgZnJvbSAnLi9fY2FjaGVIYXMuanMnO1xuaW1wb3J0IGNyZWF0ZVNldCBmcm9tICcuL19jcmVhdGVTZXQuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmlxO1xuIiwiaW1wb3J0IGJhc2VJdGVyYXRlZSBmcm9tICcuL19iYXNlSXRlcmF0ZWUuanMnO1xuaW1wb3J0IGJhc2VVbmlxIGZyb20gJy4vX2Jhc2VVbmlxLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnVuaXFgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYGl0ZXJhdGVlYCB3aGljaCBpc1xuICogaW52b2tlZCBmb3IgZWFjaCBlbGVtZW50IGluIGBhcnJheWAgdG8gZ2VuZXJhdGUgdGhlIGNyaXRlcmlvbiBieSB3aGljaFxuICogdW5pcXVlbmVzcyBpcyBjb21wdXRlZC4gVGhlIG9yZGVyIG9mIHJlc3VsdCB2YWx1ZXMgaXMgZGV0ZXJtaW5lZCBieSB0aGVcbiAqIG9yZGVyIHRoZXkgb2NjdXIgaW4gdGhlIGFycmF5LiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDpcbiAqICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXFCeShbMi4xLCAxLjIsIDIuM10sIE1hdGguZmxvb3IpO1xuICogLy8gPT4gWzIuMSwgMS4yXVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy51bmlxQnkoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXFCeShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpID8gYmFzZVVuaXEoYXJyYXksIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMikpIDogW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuaXFCeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgU3Bpbm5lciBtb2R1bGVcbiAqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgU3Bpbm5lciB7XG4gIC8qKlxuICAgKiBUaGUgU3Bpbm5lciBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzID0ge30pIHtcbiAgICB0aGlzLmNsYXNzID0gKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdjbGFzcycpKVxuICAgICAgPyBzZXR0aW5ncy5jbGFzcyA6IFNwaW5uZXIuY2xhc3M7XG5cbiAgICB0aGlzLnZpZXdib3ggPSAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3ZpZXdib3gnKSlcbiAgICAgID8gc2V0dGluZ3Mudmlld2JveCA6IFNwaW5uZXIudmlld2JveDtcblxuICAgIHRoaXMuZmlsbCA9IChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnZmlsbCcpKVxuICAgICAgPyBzZXR0aW5ncy5maWxsIDogU3Bpbm5lci5maWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvZ3JhbWF0aWNhbGx5IGNyZWF0ZSB0aGUgU3Bpbm5lciBTVkcgYW5kIHJldHVybiB0aGUgRE9NIGVsZW1lbnQuXG4gICAqXG4gICAqIEByZXR1cm4gIHtET019ICBUaGUgU3Bpbm5lciBTVkdcbiAgICovXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcbiAgICB0aGlzLmNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnY2lyY2xlJyk7XG5cbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgneG1sbnM6eGxpbmsnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycpO1xuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgdGhpcy52aWV3Ym94KTtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgndmVyc2lvbicsICcxLjEnKTtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgc3Bpbm5lciAke3RoaXMuY2xhc3N9YCk7XG5cbiAgICB0aGlzLmNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2N4JywgJzEyJyk7XG4gICAgdGhpcy5jaXJjbGUuc2V0QXR0cmlidXRlKCdjeScsICcxMicpO1xuICAgIHRoaXMuY2lyY2xlLnNldEF0dHJpYnV0ZSgncicsICcxMCcpO1xuICAgIHRoaXMuY2lyY2xlLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuZmlsbCk7XG4gICAgdGhpcy5jaXJjbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzcGlubmVyX19wYXRoJyk7XG5cbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuY2lyY2xlKTtcblxuICAgIHJldHVybiB0aGlzLmVsO1xuICB9XG59XG5cblNwaW5uZXIuY2xhc3MgPSAnaWNvbi00JztcblxuU3Bpbm5lci52aWV3Ym94ID0gJzAgMCAyNCAyNCc7XG5cblNwaW5uZXIuZmlsbCA9ICdub25lJztcblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCAnY29yZS1qcy9mZWF0dXJlcy9wcm9taXNlJztcblxuaW1wb3J0IF90ZW1wbGF0ZSBmcm9tICdsb2Rhc2gtZXMvdGVtcGxhdGUnO1xuaW1wb3J0IF9mb3JFYWNoIGZyb20gJ2xvZGFzaC1lcy9mb3JFYWNoJztcbmltcG9ydCBfbWVyZ2UgZnJvbSAnbG9kYXNoLWVzL21lcmdlJztcbmltcG9ydCBfdmFsdWVzIGZyb20gJ2xvZGFzaC1lcy92YWx1ZXMnO1xuaW1wb3J0IF9vcmRlckJ5IGZyb20gJ2xvZGFzaC1lcy9vcmRlckJ5JztcbmltcG9ydCBfdW5pcUJ5IGZyb20gJ2xvZGFzaC1lcy91bmlxQnknO1xuXG5pbXBvcnQgU3Bpbm5lciBmcm9tICdAbnljb3Bwb3J0dW5pdHkvcHR0cm4tc2NyaXB0cy9zcmMvc3Bpbm5lci9zcGlubmVyJztcblxuLyoqXG4gKiBQYXR0ZXJuIENsYXNzXG4gKi9cbmNsYXNzIEZlZWQge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHQgPSBGZWVkLmRlZmF1bHQ7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IF9tZXJnZSh7fSwgRmVlZC5kZWZhdWx0LCBjb25maWcpO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1vZHVsZVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICAvLyBDcmVhdGUgYSBsb2FkaW5nIGFuaW1hdGlvblxuICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpO1xuICAgIGxldCBzcGlubmVyID0gbmV3IFNwaW5uZXIoKTtcbiAgICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbG9hZGluZy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ28tZmVlZF9fc3Bpbm5lcicpO1xuICAgIGxvYWRpbmcuYXBwZW5kQ2hpbGQoc3Bpbm5lcik7XG4gICAgZWwuYXBwZW5kQ2hpbGQobG9hZGluZyk7XG5cbiAgICBsZXQgZGF0YSA9IFtdO1xuICAgIGxldCBmZWVkID0gdGhpcy5fc2V0dGluZ3MuZmVlZDtcbiAgICBsZXQgY29uZmlnID0ge1xuICAgICAgcnNzVG9Kc29uOiB0aGlzLl9zZXR0aW5ncy5yc3NUb0pzb24sXG4gICAgICByc3NVcmw6IChBcnJheS5pc0FycmF5KGZlZWQpKSA/IGZlZWQgOiBbZmVlZF1cbiAgICB9O1xuXG4gICAgLy8gR28gdGhyb3VnaCBlYWNoIGZlZWRcbiAgICBfZm9yRWFjaChjb25maWcucnNzVXJsLCAodXJsLCBpbmRleCkgPT4ge1xuICAgICAgLy8gTWFrZSB0aGUgcmVxdWVzdFxuICAgICAgdGhpcy5fcmVxdWVzdChjb25maWcsIHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgdXNpbmcgdGhlIGZyZWUgUnNzMkpzb24gY29udmVydGVyXG4gICAgICAgICAgICogQHNvdXJjZSBodHRwczovL3JzczJqc29uLmNvbVxuICAgICAgICAgICAqIGVsc2UgaWYgdXNpbmcgdGhlIE5ZQ08gc2VsZiBob3N0ZWQgUnNzMkpzb24gY29udmVydGVyXG4gICAgICAgICAgICogQHNvdXJjZSBodHRwczovL2dpdGh1Yi5jb20vQ2l0eU9mTmV3WW9yay9ueWNvLXJzcy0yLWpzb25cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAoY29uZmlnLnJzc1RvSnNvbiA9PT0gRmVlZC5yc3NUb0pzb24pXG4gICAgICAgICAgICBqc29uID0ganNvbjsgLy8gZG8gbm90aGluZ1xuICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5yc3NUb0pzb24uaW5jbHVkZXMoJ2NvbnZlcnRSc3NJbnRvSnNvbj9yc3NGZWVkPScpKVxuICAgICAgICAgICAganNvbiA9IEZlZWQubnljb1Jzc1RvSnNvbihqc29uKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdOWUNPIEZlZWQgT2JqZWN0OiBUaGlzIFJTUyB0byBKU09OIGNvbnZlcnRlciBpcyBub3QgcmVjb2duaXplZC4nKTtcblxuICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGRhdGFcbiAgICAgICAgICBkYXRhLnB1c2godGhpcy5fcHJvY2Vzcyhqc29uLCB0aGlzLl9zZXR0aW5ncykpO1xuXG4gICAgICAgICAgLy8gV2hlbiBhbGwgZmVlZHMgaGF2ZSBiZWVuIHJlcXVlc3RlZCwgbWVyZ2UgdGhlIGRhdGEgYW5kIGNvbXBpbGVcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IGNvbmZpZy5yc3NVcmwubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgY29tcGlsZWQgPSB0aGlzLl9yZW5kZXIoXG4gICAgICAgICAgICAgIHRoaXMuX21lcmdlKGRhdGEsIHRoaXMuX3NldHRpbmdzKSxcbiAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChlbClcbiAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gY29tcGlsZWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihgTllDTyBGZWVkIE9iamVjdDogQ291bGRuJ3QgZmluZCB0aGUgZWxlbWVudCBcIiR7dGhpcy5fc2V0dGluZ3Muc2VsZWN0b3J9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBYSFIgcmVxdWVzdCBmb3IgdGhlIGZlZWQgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBUaGUgcmVxdWVzdCBkYXRhXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgIFRoZSByZXF1ZXN0IHVybFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICBSZXNvbHZlcyB3aGVuIHRoZSByZXNwb25zZSBpcyByZWFkeSwgcmVqZWN0cyB3aGVuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBvcGVyYXRpb24gdGltZXMgb3V0IG9yIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgKi9cbiAgX3JlcXVlc3QoY29uZmlnLCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IF94aHIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChfeGhyLnJlYWR5U3RhdGUgPT09IDQpXG4gICAgICAgICAgaWYgKF94aHIuc3RhdHVzID49IDIwMCAmJiBfeGhyLnN0YXR1cyA8IDQwMClcbiAgICAgICAgICAgIHJlc29sdmUoX3hoci5yZXNwb25zZSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihfeGhyLnN0YXR1cykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaGUgRmVlZCByZXF1ZXN0IHRpbWVkIG91dCcpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCBgJHtjb25maWcucnNzVG9Kc29ufSR7dXJsfWAsIHRydWUpO1xuICAgICAgeGhyLnNlbmQoKTtcbiAgICAgIHhociA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBkYXRhIHRvIHRoZSBhcHByb3ByaWF0ZSBwcm9jZXNzaW5nIGZ1bmN0aW9uIGJhc2VkIG9uIHR5cGVcbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIHByb2Nlc3NlZCBkYXRhXG4gICAqL1xuICBfcHJvY2VzcyhkYXRhLCBzZXR0aW5ncykge1xuICAgIHJldHVybiBGZWVkLnByb2Nlc3Nbc2V0dGluZ3MudHlwZV0oZGF0YSwgc2V0dGluZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgZGF0YSB0byB0aGUgYXBwcm9wcmlhdGUgbWVyZ2UgZnVuY3Rpb24gYmFzZWQgb24gdHlwZVxuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGRhdGEgICAgIFRoZSByZXF1ZXN0ZWQgZmVlZCBkYXRhIHRvIHBhc3NcbiAgICogQHBhcmFtICB7b2JqZWN0fSBzZXR0aW5ncyBUaGUgYXBwbGljYXRpb24gc2V0dGluZ3NcbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICBUaGUgbWVyZ2VkIGZlZWQgZGF0YVxuICAgKi9cbiAgX21lcmdlKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgcmV0dXJuIEZlZWQubWVyZ2Vbc2V0dGluZ3MudHlwZV0oZGF0YSwgc2V0dGluZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmUgdGVtcGxhdGUgY29tcG9uZW50cywgcGFzcyBkYXRhLCBhbmQgcmV0dXJuIGNvbXBpbGVkIHRlbWxhdGVcbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSBkYXRhICAgICBUaGUgcmVxdWVzdGVkIGZlZWQgZGF0YSB0byBwYXNzXG4gICAqIEBwYXJhbSAge29iamVjdH0gc2V0dGluZ3MgVGhlIGFwcGxpY2F0aW9uIHNldHRpbmdzXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgVGhlIGNvbXBsaWVkIGh0bWwgc3RyaW5nXG4gICAqL1xuICBfcmVuZGVyKGRhdGEsIHNldHRpbmdzKSB7XG4gICAgZGF0YS5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBpZiAoc2V0dGluZ3MubG9nKSBjb25zb2xlLmRpcihkYXRhKTtcblxuICAgIGxldCB0ZW1wbGF0ZSA9IF92YWx1ZXMoc2V0dGluZ3MudGVtcGxhdGVzKS5qb2luKCcnKTtcbiAgICBsZXQgY29tcGlsZWQgPSBfdGVtcGxhdGUoXG4gICAgICB0ZW1wbGF0ZSxcbiAgICAgIHtcbiAgICAgICAgJ2ltcG9ydHMnOiB7XG4gICAgICAgICAgJ19lYWNoJzogX2ZvckVhY2hcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gY29tcGlsZWQoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBvcGVuIFJTUyB0byBKU09OIGFwaSwgc2VlIGh0dHBzOi8vcnNzMmpzb24uY29tXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5GZWVkLnJzc1RvSnNvbiA9ICdodHRwczovL2FwaS5yc3MyanNvbi5jb20vdjEvYXBpLmpzb24/cnNzX3VybD0nO1xuXG4vKipcbiAqIFRoZSB0ZW1wbGF0ZSBmb3IgdGhlIHdpZGdldC5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbkZlZWQudGVtcGxhdGVzID0ge1xuICBtZWRpdW06IHtcbiAgICBvcGVuZXI6IFtcbiAgICAgICc8c2VjdGlvbiBjbGFzcz1cIm8tZmVlZCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy53cmFwcGVyICU+XCIgc3R5bGU9XCInLFxuICAgICAgICAnPCUgaWYgKHNldHRpbmdzLmZvbnRTaXplKSB7ICU+Zm9udC1zaXplOiA8JS0gc2V0dGluZ3MuZm9udFNpemUgJT47PCUgfSAlPicsXG4gICAgICAgICc8JSBpZiAoc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yKSB7ICU+Ym9yZGVyLWNvbG9yOiA8JS0gc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yICU+OzwlIH0gJT4nLFxuICAgICAgJ1wiPidcbiAgICBdLFxuICAgIGhlYWRlcjogW1xuICAgICAgJzxoZWFkZXIgY2xhc3M9XCJvLWZlZWRfX2hlYWRlciA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5oZWFkZXIgJT5cIj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm8tZmVlZF9fYXZhdGFyIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmF2YXRhciAlPlwiPicsXG4gICAgICAgICAgJzxpbWcgc3JjPVwiJyxcbiAgICAgICAgICAgICAgICAnPCUgaWYgKHNldHRpbmdzLnByb2ZpbGVJbWcgIT09IFwiXCIpIHsgJT4nLFxuICAgICAgICAgICAgICAgICAgJzwlLSBzZXR0aW5ncy5wcm9maWxlSW1nICU+JyxcbiAgICAgICAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgICAgICAgJzwlLSBmZWVkLnByb2ZpbGVJbWcgJT4nLFxuICAgICAgICAgICAgICAgICc8JSB9ICU+XCIgJyxcbiAgICAgICAgICAgICAgICd3aWR0aD1cIjwlLSBzZXR0aW5ncy5yYXRpb1Byb2ZpbGVbMF0gJT5cIiAnLFxuICAgICAgICAgICAgICAgJ2hlaWdodD1cIjwlLSBzZXR0aW5ncy5yYXRpb1Byb2ZpbGVbMV0gJT5cIj4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzxhIGNsYXNzPVwiby1mZWVkX191cmwgPCUtIHNldHRpbmdzLmNsYXNzZXMuYXZhdGFyICU+XCIgJyxcbiAgICAgICAgICAnaHJlZj1cIjwlIGlmIChzZXR0aW5ncy50aXRsZVVybCAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAnPCUtIHNldHRpbmdzLnRpdGxlVXJsICU+JyxcbiAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBmZWVkLnVybCAlPicsXG4gICAgICAgICAgJzwlIH0gJT5cIiAnLFxuICAgICAgICAgICAndGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlciBub2ZvbGxvd1wiPicsXG4gICAgICAgICAgJzwlIGlmIChzZXR0aW5ncy50aXRsZSAhPT0gXCJcIikgeyAlPicsXG4gICAgICAgICAgICAnPCUtIHNldHRpbmdzLnRpdGxlICU+JyxcbiAgICAgICAgICAnPCUgfSBlbHNlIHsgJT4nLFxuICAgICAgICAgICAgJzwlLSBmZWVkLnRpdGxlICU+JyxcbiAgICAgICAgICAnPCUgfSAlPicsXG4gICAgICAgICc8L2E+JyxcbiAgICAgICc8L2hlYWRlcj4nXG4gICAgXSxcbiAgICBwb3N0czogW1xuICAgICAgJzxkaXYgY2xhc3M9XCJvLWZlZWRfX2l0ZW1zXCIgc3R5bGU9XCInLFxuICAgICAgICAnYm9yZGVyLWNvbG9yOiA8JS0gc2V0dGluZ3MucG9zdEJvcmRlckNvbG9yICU+OycsXG4gICAgICAnXCI+JyxcbiAgICAgICAgJzwlIF9lYWNoKGl0ZW1zLCBmdW5jdGlvbihwb3N0KSB7ICU+JyxcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtIDwlLSBzZXR0aW5ncy5jbGFzc2VzLmZlZWRJdGVtICU+XCI+JyxcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjLWZlZWQtaXRlbV9fdGl0bGUgPCUtIHNldHRpbmdzLmNsYXNzZXMudGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJjLWZlZWQtaXRlbV9fbGluayA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5saW5rICU+XCInLFxuICAgICAgICAgICAgICAgICAnaHJlZj1cIjwlLSBwb3N0Lmd1aWQgJT5cIicsXG4gICAgICAgICAgICAgICAgICd0YXJnZXQ9XCJfYmxhbmtcIicsXG4gICAgICAgICAgICAgICAgICdyZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAgICAgICAnPCUtIHBvc3QudGl0bGUgJT4nLFxuICAgICAgICAgICAgICAnPC9hPicsXG4gICAgICAgICAgICAnPC9oND4nLFxuICAgICAgICAgICAgJzxwIGNsYXNzPVwiYy1mZWVkLWl0ZW1fX2RhdGUgPCUtIHNldHRpbmdzLmNsYXNzZXMuZGF0ZSAlPlwiICcsXG4gICAgICAgICAgICAgICAgICAndGl0bGU9XCI8JS0gc2V0dGluZ3MucG9zdERhdGVUaXRsZSAlPlwiPicsXG4gICAgICAgICAgICAgICc8c21hbGw+PGVtPjwlLSBwb3N0LmRhdGUgJT48L2VtPjwvc21hbGw+JyxcbiAgICAgICAgICAgICc8L3A+JyxcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYy1mZWVkLWl0ZW1fX3RodW1ibmFpbCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy50aHVtYm5haWwgJT5cIicsXG4gICAgICAgICAgICAgICAgICdzdHlsZT1cIicsXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoPCUtIHBvc3QudGh1bWJuYWlsICU+KTsnLFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0OiA8JS0gc2V0dGluZ3MucG9zdEltZ0hlaWdodCAlPjtcIicsXG4gICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbj1cInRydWVcIj4nLFxuICAgICAgICAgICAgICAnPGltZyBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgc3JjPVwiPCUtIHBvc3QudGh1bWJuYWlsICU+XCIgYWx0PVwiPCUtIHBvc3QudGl0bGUgJT5cIj4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgICAnPHAgY2xhc3M9XCJjLWZlZWQtaXRlbV9fZXhjZXJwdCA8JS0gc2V0dGluZ3MuY2xhc3Nlcy5leGNlcnB0ICU+XCI+JyxcbiAgICAgICAgICAgICAgJzwlLSBwb3N0LmV4Y2VycHQgJT48JS0gc2V0dGluZ3MucG9zdEV4Y2VycHRUcmFpbCAlPicsXG4gICAgICAgICAgICAnPC9wPicsXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImMtZmVlZC1pdGVtX19mb290ZXIgPCUtIHNldHRpbmdzLmNsYXNzZXMuaXRlbUZvb3RlciAlPlwiPicsXG4gICAgICAgICAgICAgICc8YSBjbGFzcz1cImMtZmVlZC1pdGVtX19jdGEgPCUtIHNldHRpbmdzLmNsYXNzZXMuY3RhICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgJ2hyZWY9XCI8JS0gcG9zdC5ndWlkICU+XCIgJyxcbiAgICAgICAgICAgICAgICAgJ3RhcmdldD1cIl9ibGFua1wiICcsXG4gICAgICAgICAgICAgICAgICdyZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCI+JyxcbiAgICAgICAgICAgICAgICAnPCUtIHNldHRpbmdzLnBvc3RDdGFUZXh0ICU+JyxcbiAgICAgICAgICAgICAgJzwvYT4nLFxuICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8JSB9KTsgJT4nLFxuICAgICAgJzwvZGl2PidcbiAgICBdLFxuICAgIGNsb3NlcjogW1xuICAgICAgJzwvc2VjdGlvbj4nXG4gICAgXVxuICB9XG59O1xuXG4vKipcbiAqIERhdGEgbWFwIGZvciB0aGUgTllDTyBSU1MgdG8gSlNPTiBjb3ZlcnRlci5cbiAqXG4gKiBAcGFyYW0gICB7T2JqZWN0fSAganNvbiAgQSBqc29uIG9iamVjdCBjb250YWluaW5nIHRoZSBmZWVkXG4gKlxuICogQHJldHVybiAge09iamVjdH0gICAgICAgIEEganNvbiBvYmplY3QgdGhhdCBtYXRjaGVzIHRoZSB0ZW1wbGF0ZSBmb3JtYXRcbiAqL1xuRmVlZC5ueWNvUnNzVG9Kc29uID0gZnVuY3Rpb24oanNvbikge1xuICBsZXQgZmVlZCA9IGpzb25bMF07XG5cbiAgcmV0dXJuIHtcbiAgICAnc3RhdHVzJzogJ29rJyxcbiAgICAnZmVlZCc6IHtcbiAgICAgICd1cmwnOiBmZWVkWydhdG9tOmxpbmsnXVswXVsnJCddWydocmVmJ10sXG4gICAgICAndGl0bGUnOiBmZWVkWyd0aXRsZSddLFxuICAgICAgJ2xpbmsnOiBmZWVkWydsaW5rJ10sXG4gICAgICAnYXV0aG9yJzogJycsXG4gICAgICAnZGVzY3JpcHRpb24nOiBmZWVkWydkZXNjcmlwdGlvbiddLFxuICAgICAgJ2ltYWdlJzogZmVlZFsnaW1hZ2UnXVswXVsndXJsJ11cbiAgICB9LFxuICAgICdpdGVtcyc6IGZlZWRbJ2l0ZW0nXS5tYXAoaSA9PiB7XG4gICAgICAvLyBHZXQgYW5kIHBhcnNlIHRoZSBkYXRlXG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoaVsncHViRGF0ZSddKSlcbiAgICAgICAgLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgnLjAwMFonLCAnJyk7XG5cbiAgICAgIC8vIEdldCB0aGUgR1VJRCwgdGhleSBhcmUgaW5jb25zaXN0ZW50bHkgbmVzdGVkXG4gICAgICBsZXQgZ3VpZCA9IChBcnJheS5pc0FycmF5KGlbJ2d1aWQnXSkpXG4gICAgICAgID8gaVsnZ3VpZCddWzBdWydfJ10gOiBpWydndWlkJ11bJ18nXTtcblxuICAgICAgLy8gR2V0IHRoZSBmaXJzdCBpbWFnZSBvZiB0aGUgY29udGVudCBmb3IgdGhlIHRodW1ibmFpbC4gSXRcbiAgICAgIC8vIHNlZW1zIHRoZSBtZWRpdW0gZmVlZCBkb2Vzbid0IHJldHVybiB0aGlzIGJ5IGRlZmF1bHRcbiAgICAgIC8vIGJ1dCByc3MyanNvbi5jb20gcHJvdmlkZXMgaXQgKGJ1dCB3aHkhPylcbiAgICAgIGxldCByZWdleCA9ICAvPGltZ1tePl0rc3JjPVwiPyhbXlwiXFxzXSspXCI/XFxzKlxcLz4vZztcbiAgICAgIGxldCB0aHVtYm5haWwgPSByZWdleC5leGVjKGlbJ2NvbnRlbnQ6ZW5jb2RlZCddKVsxXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3RpdGxlJzogaVsndGl0bGUnXSxcbiAgICAgICAgJ3B1YkRhdGUnOiBkYXRlLFxuICAgICAgICAnbGluayc6IGlbJ2xpbmsnXSxcbiAgICAgICAgJ2d1aWQnOiBndWlkLFxuICAgICAgICAnYXV0aG9yJzogaVsnZGM6Y3JlYXRvciddLFxuICAgICAgICAndGh1bWJuYWlsJzogdGh1bWJuYWlsLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiBpWydjb250ZW50OmVuY29kZWQnXSxcbiAgICAgICAgJ2NvbnRlbnQnOiBpWydjb250ZW50OmVuY29kZWQnXSxcbiAgICAgICAgJ2VuY2xvc3VyZSc6IHt9LFxuICAgICAgICAnY2F0ZWdvcmllcyc6IGlbJ2NhdGVnb3J5J11cbiAgICAgIH07XG4gICAgfSlcbiAgfTtcbn07XG5cbi8qKlxuICogRnVuY3Rpb25zIGZvciBwcm9jZXNzaW5nIHRoZSBkYXRhIGJhc2VkIG9uIHRoZSBmZWVkIHR5cGUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5GZWVkLnByb2Nlc3MgPSB7XG4gIG1lZGl1bTogZnVuY3Rpb24oZGF0YSwgc2V0dGluZ3MpIHtcbiAgICBsZXQgbGVuZ3RoID0gc2V0dGluZ3MucG9zdEV4Y2VycHRMZW5ndGg7XG5cbiAgICBfZm9yRWFjaChkYXRhLml0ZW1zLCBmdW5jdGlvbihwb3N0LCBpbmRleCkge1xuICAgICAgbGV0IGV4Y2VycHQgPSAnJztcbiAgICAgIGxldCBkYXRlID0gJyc7XG5cbiAgICAgIC8vIFJlbW92ZSBmaWd1cmVzIGZpcnN0XG4gICAgICBleGNlcnB0ID0gcG9zdC5kZXNjcmlwdGlvblxuICAgICAgICAucmVwbGFjZSgvPGZpZ3VyZS4qPi4qPzxcXC9maWd1cmU+L2csICcnKTtcblxuICAgICAgLy8gUmVwbGFjZSBicmVhayB0YWdzIHdpdGggc3BhY2VzXG4gICAgICBleGNlcnB0ID0gZXhjZXJwdC5yZXBsYWNlKCc8YnI+JywgJyAnKTtcblxuICAgICAgLy8gUmVtb3ZlIGFsbCB0YWdzXG4gICAgICBleGNlcnB0ID0gZXhjZXJwdC5yZXBsYWNlKC88KC58XFxuKSo/Pi9nLCAnJyk7XG5cbiAgICAgIC8vIFRyaW0gdGhlIGV4Y2VycHRcbiAgICAgIGV4Y2VycHQgPSBleGNlcnB0LnN1YnN0cigwLCBsZW5ndGgpO1xuICAgICAgZXhjZXJwdCA9IGV4Y2VycHQuc3Vic3RyKDAsXG4gICAgICAgIE1hdGgubWluKGV4Y2VycHQubGVuZ3RoLCBleGNlcnB0Lmxhc3RJbmRleE9mKCcgJykpXG4gICAgICApO1xuXG4gICAgICBwb3N0LmV4Y2VycHQgPSBleGNlcnB0O1xuXG4gICAgICAvLyBGb3JtYXQgdGhlIGRhdGVcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHBvc3QucHViRGF0ZS5yZXBsYWNlKCcgJywgJ1QnKSkpXG4gICAgICAgIC50b0xvY2FsZURhdGVTdHJpbmcoc2V0dGluZ3MucG9zdERhdGVMb2NhbCwgc2V0dGluZ3MucG9zdERhdGVGb3JtYXQpO1xuXG4gICAgICBwb3N0LmRhdGUgPSBkYXRlO1xuXG4gICAgICByZXR1cm4gcG9zdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb25zIGZvciBtZXJnaW5nIHRoZSBkYXRhIGZlZWRzIHRvZ2V0aGVyLCBiYXNlZCBvbiB0aGUgZmVlZCB0eXBlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuRmVlZC5tZXJnZSA9IHtcbiAgbWVkaXVtOiBmdW5jdGlvbihkYXRhLCBzZXR0aW5ncykge1xuICAgIGxldCBtZXJnZWQgPSB7fTtcbiAgICBsZXQgaXRlbXMgPSBbXTtcblxuICAgIC8vIENvbWJpbmUgdGhlIHBvc3QgaXRlbXNcbiAgICBkYXRhLmZvckVhY2goKGZlZWQpID0+IHtcbiAgICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGZlZWQuaXRlbXMpO1xuICAgIH0pO1xuXG4gICAgLy8gTWVyZ2UgdGhlIGRhdGEsIHRoaXMgd2lsbCBvdmVycmlkZSB2YWx1ZXMsIGl0IHByb2JhYmx5IHdvbid0IGJlXG4gICAgLy8gcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgZmVlZHMgdGhhdCBhcmUgdGhlIHNhbWUsIGJ1dCBwb3RlbnRpYWxseVxuICAgIC8vIGRpZmZlcmVudCBmZWVkIHR5cGVzIGNvdWxkIHVzZSB0aGlzIGFuZCBjb21iaW5lIHVuaXF1ZSBkYXRhXG4gICAgZGF0YS5mb3JFYWNoKChmZWVkKSA9PiB7XG4gICAgICBtZXJnZWQgPSBfbWVyZ2UobWVyZ2VkLCBmZWVkKTtcbiAgICB9KTtcblxuICAgIC8vIEdldCB1bmlxdWUgcG9zdHNcbiAgICBpZiAoc2V0dGluZ3MudW5pcXVlKVxuICAgICAgaXRlbXMgPSBfdW5pcUJ5KGl0ZW1zLCAoaXRlbSkgPT4gaXRlbS5ndWlkKTtcblxuICAgIG1lcmdlZC5pdGVtcyA9IF9vcmRlckJ5KGl0ZW1zLCAncHViRGF0ZScsICdkZXNjJyk7XG5cbiAgICByZXR1cm4gbWVyZ2VkO1xuICB9XG59XG5cbi8qKlxuICogU2VlIGh0dHBzOi8vcnNzMmpzb24uY29tL2RvY3MgZm9yIGRldGFpbHMgb24gZGVmYXVsdCBwYXJhbWV0ZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5GZWVkLmRlZmF1bHQgPSB7XG4gIGZlZWQ6ICcnLFxuICByc3NUb0pzb246IEZlZWQucnNzVG9Kc29uLFxuICBzZWxlY3RvcjogJ1tkYXRhLWpzPVwiZmVlZFwiXScsXG4gIHR5cGU6ICdtZWRpdW0nLFxuICB0aXRsZTogJycsXG4gIHRpdGxlVXJsOiAnJyxcbiAgcHJvZmlsZUltZzogJycsXG4gIGZvbnRTaXplOiAnJyxcbiAgcmF0aW9Qcm9maWxlOiBbJzUwJywgJzUwJ10sXG4gIHBvc3RCb3JkZXJDb2xvcjogJ2xpZ2h0c3RlZWxibHVlJyxcbiAgcG9zdEltZ0hlaWdodDogJzE2OHB4JyxcbiAgcG9zdEV4Y2VycHRMZW5ndGg6IDEyMCxcbiAgcG9zdEV4Y2VycHRUcmFpbDogJ+KApicsXG4gIHBvc3RDdGFUZXh0OiAnUmVhZCB0aGUgZnVsbCBwb3N0JyxcbiAgcG9zdERhdGVMb2NhbDogJ2VuLVVTJyxcbiAgcG9zdERhdGVGb3JtYXQ6IHtcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJ1xuICB9LFxuICBwb3N0RGF0ZVRpdGxlOiAnUHVibGlzaGVkIERhdGUnLFxuICBjbGFzc2VzOiB7XG4gICAgd3JhcHBlcjogJycsXG4gICAgaGVhZGVyOiAnJyxcbiAgICB1cmw6ICcnLFxuICAgIGZlZWRJdGVtOiAnJyxcbiAgICB0aXRsZTogJycsXG4gICAgbGluazogJycsXG4gICAgdGh1bWJuYWlsOiAnJyxcbiAgICBleGNlcnB0OiAnJyxcbiAgICBpdGVtRm9vdGVyOiAnJyxcbiAgICBjdGE6ICcnLFxuICAgIGRhdGU6ICcnXG4gIH0sXG4gIHRlbXBsYXRlczoge1xuICAgIG9wZW5lcjogRmVlZC50ZW1wbGF0ZXMubWVkaXVtLm9wZW5lci5qb2luKCcnKSxcbiAgICBoZWFkZXI6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5oZWFkZXIuam9pbignJyksXG4gICAgcG9zdHM6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5wb3N0cy5qb2luKCcnKSxcbiAgICBjbG9zZXI6IEZlZWQudGVtcGxhdGVzLm1lZGl1bS5jbG9zZXIuam9pbignJylcbiAgfSxcbiAgbG9nOiBmYWxzZSxcbiAgdW5pcXVlOiB0cnVlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGZWVkO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsImNsYXNzb2YiLCJJbmRleGVkT2JqZWN0IiwiZG9jdW1lbnQiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJJRThfRE9NX0RFRklORSIsInByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJzdG9yZSIsIldlYWtNYXAiLCJoYXMiLCJOQVRJVkVfV0VBS19NQVAiLCJzaGFyZWQiLCJvYmplY3RIYXMiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwibWluIiwicmVxdWlyZSQkMCIsImhpZGRlbktleXMiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaXNGb3JjZWQiLCJDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIiLCJJRV9QUk9UTyIsImRlZmluZVByb3BlcnRpZXMiLCJOQVRJVkVfU1lNQk9MIiwiU3ltYm9sIiwiVVNFX1NZTUJPTF9BU19VSUQiLCJJdGVyYXRvcnMiLCJhRnVuY3Rpb24iLCJUT19TVFJJTkdfVEFHIiwiVE9fU1RSSU5HX1RBR19TVVBQT1JUIiwiSVRFUkFUT1IiLCJiaW5kIiwic2V0UHJvdG90eXBlT2YiLCJnZXRQcm90b3R5cGVPZiIsImNyZWF0ZSIsIiQiLCJ0b1N0cmluZyIsIlNQRUNJRVMiLCJ1c2VyQWdlbnQiLCJzZXQiLCJJU19OT0RFIiwiSVNfSU9TIiwicmVxdWlyZSQkMSIsInByb2Nlc3MiLCJQcm9taXNlIiwiSVNfV0VCT1NfV0VCS0lUIiwidGFzayIsIk5hdGl2ZVByb21pc2UiLCJUeXBlRXJyb3IiLCJuZXdQcm9taXNlQ2FwYWJpbGl0eSIsIm5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlIiwiVjhfVkVSU0lPTiIsIm5vdGlmeSIsImNyZWF0ZU1ldGhvZCIsIkl0ZXJhdG9yUHJvdG90eXBlIiwicmV0dXJuVGhpcyIsIkl0ZXJhdG9yc0NvcmUiLCJCVUdHWV9TQUZBUklfSVRFUkFUT1JTIiwic2V0SW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJBcnJheVByb3RvdHlwZSIsIkFycmF5SXRlcmF0b3JNZXRob2RzIiwiRE9NSXRlcmFibGVzIiwiaGFzT3duUHJvcGVydHkiLCJvYmplY3RQcm90byIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwib2JqZWN0VG9TdHJpbmciLCJzeW1Ub1N0cmluZ1RhZyIsImlzT2JqZWN0IiwiZnVuY1Byb3RvIiwiZnVuY1RvU3RyaW5nIiwiZGVmaW5lUHJvcGVydHkiLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImZ1bmNUYWciLCJmcmVlRXhwb3J0cyIsImZyZWVNb2R1bGUiLCJtb2R1bGVFeHBvcnRzIiwib2JqZWN0VGFnIiwiZXJyb3JUYWciLCJrZXlzIiwiSEFTSF9VTkRFRklORUQiLCJCdWZmZXIiLCJvYmplY3RDcmVhdGUiLCJDT01QQVJFX1BBUlRJQUxfRkxBRyIsIkNPTVBBUkVfVU5PUkRFUkVEX0ZMQUciLCJib29sVGFnIiwiZGF0ZVRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsInN5bWJvbFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJzeW1ib2xQcm90byIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwid2Vha01hcFRhZyIsImFycmF5VGFnIiwiZ2V0VGFnIiwiSU5GSU5JVFkiLCJnZXQiLCJhcnJheUluY2x1ZGVzIiwiTEFSR0VfQVJSQVlfU0laRSIsIl9tZXJnZSIsIl9mb3JFYWNoIiwidGVtcGxhdGUiLCJfdmFsdWVzIiwiX3RlbXBsYXRlIiwiX3VuaXFCeSIsIl9vcmRlckJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Q0FBQSxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMxQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztDQUNyQyxDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0EsWUFBYztDQUNkO0NBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxVQUFVLElBQUksUUFBUSxJQUFJLFVBQVUsQ0FBQztDQUNwRCxFQUFFLEtBQUssQ0FBQyxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDO0NBQzVDLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7Q0FDeEMsRUFBRSxLQUFLLENBQUMsT0FBT0EsY0FBTSxJQUFJLFFBQVEsSUFBSUEsY0FBTSxDQUFDO0NBQzVDO0NBQ0EsRUFBRSxDQUFDLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7O0NDWi9ELFNBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNqQyxFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0NBQ3BCLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLEdBQUc7Q0FDSCxDQUFDOztDQ0pEO0NBQ0EsZUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDcEMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEYsQ0FBQyxDQUFDOztDQ0pGLElBQUksMEJBQTBCLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0NBQ3pELElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0FBQy9EO0NBQ0E7Q0FDQSxJQUFJLFdBQVcsR0FBRyx3QkFBd0IsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RjtDQUNBO0NBQ0E7Q0FDQSxLQUFTLEdBQUcsV0FBVyxHQUFHLFNBQVMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFO0NBQzNELEVBQUUsSUFBSSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3JELEVBQUUsT0FBTyxDQUFDLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUM7Q0FDL0MsQ0FBQyxHQUFHLDBCQUEwQjs7Ozs7O0NDWjlCLDRCQUFjLEdBQUcsVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFO0NBQzFDLEVBQUUsT0FBTztDQUNULElBQUksVUFBVSxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUM3QixJQUFJLFlBQVksRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDL0IsSUFBSSxRQUFRLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQzNCLElBQUksS0FBSyxFQUFFLEtBQUs7Q0FDaEIsR0FBRyxDQUFDO0NBQ0osQ0FBQzs7Q0NQRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQzNCO0NBQ0EsY0FBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN4QyxDQUFDOztDQ0RELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDckI7Q0FDQTtDQUNBLGlCQUFjLEdBQUcsS0FBSyxDQUFDLFlBQVk7Q0FDbkM7Q0FDQTtDQUNBLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5QyxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNuQixFQUFFLE9BQU9DLFVBQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ25FLENBQUMsR0FBRyxNQUFNOztDQ1pWO0NBQ0E7Q0FDQSwwQkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxFQUFFLElBQUksU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3JFLEVBQUUsT0FBTyxFQUFFLENBQUM7Q0FDWixDQUFDOztDQ0xEO0FBQzJEO0FBQ21CO0FBQzlFO0NBQ0EsbUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU9DLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ25ELENBQUM7O0NDTkQsWUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsT0FBTyxPQUFPLEVBQUUsS0FBSyxRQUFRLEdBQUcsRUFBRSxLQUFLLElBQUksR0FBRyxPQUFPLEVBQUUsS0FBSyxVQUFVLENBQUM7Q0FDekUsQ0FBQzs7Q0NBRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBLGVBQWMsR0FBRyxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtDQUNwRCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDckMsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUM7Q0FDZCxFQUFFLElBQUksZ0JBQWdCLElBQUksUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDO0NBQ3BILEVBQUUsSUFBSSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUM7Q0FDL0YsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUksUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDO0NBQ3JILEVBQUUsTUFBTSxTQUFTLENBQUMseUNBQXlDLENBQUMsQ0FBQztDQUM3RCxDQUFDOztDQ2JELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7QUFDdkM7Q0FDQSxPQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFO0NBQ3BDLEVBQUUsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN0QyxDQUFDOztDQ0RELElBQUlDLFVBQVEsR0FBR0gsUUFBTSxDQUFDLFFBQVEsQ0FBQztDQUMvQjtDQUNBLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQ0csVUFBUSxDQUFDLElBQUksUUFBUSxDQUFDQSxVQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDcEU7Q0FDQSx5QkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsT0FBTyxNQUFNLEdBQUdBLFVBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQ2xELENBQUM7O0NDTEQ7Q0FDQSxnQkFBYyxHQUFHLENBQUNDLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0NBQ3BELEVBQUUsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDQyxxQkFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRTtDQUMxRCxJQUFJLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRTtDQUNsQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ1osQ0FBQyxDQUFDOztDQ0RGLElBQUksOEJBQThCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0FBQ3JFO0NBQ0E7Q0FDQTtDQUNBLE9BQVMsR0FBR0QsV0FBVyxHQUFHLDhCQUE4QixHQUFHLFNBQVMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNuRyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekIsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMzQixFQUFFLElBQUlFLFlBQWMsRUFBRSxJQUFJO0NBQzFCLElBQUksT0FBTyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDaEQsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFLGVBQWU7Q0FDakMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyx3QkFBd0IsQ0FBQyxDQUFDQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRyxDQUFDOzs7Ozs7Q0NqQkQsWUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUNyQixJQUFJLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3RELEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNkLENBQUM7O0NDREQsSUFBSSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQ2pEO0NBQ0E7Q0FDQTtDQUNBLE9BQVMsR0FBR0gsV0FBVyxHQUFHLG9CQUFvQixHQUFHLFNBQVMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFO0NBQzNGLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2QsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMzQixFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUN2QixFQUFFLElBQUlFLFlBQWMsRUFBRSxJQUFJO0NBQzFCLElBQUksT0FBTyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ2xELEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxlQUFlO0NBQ2pDLEVBQUUsSUFBSSxLQUFLLElBQUksVUFBVSxJQUFJLEtBQUssSUFBSSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztDQUM3RixFQUFFLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztDQUNyRCxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ1gsQ0FBQzs7Ozs7O0NDZkQsK0JBQWMsR0FBR0YsV0FBVyxHQUFHLFVBQVUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDN0QsRUFBRSxPQUFPSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNqRixDQUFDLEdBQUcsVUFBVSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUNsQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDdEIsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQixDQUFDOztDQ05ELGFBQWMsR0FBRyxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDdkMsRUFBRSxJQUFJO0NBQ04sSUFBSSwyQkFBMkIsQ0FBQ1IsUUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNwRCxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSUEsUUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN4QixHQUFHLENBQUMsT0FBTyxLQUFLLENBQUM7Q0FDakIsQ0FBQzs7Q0NORCxJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztDQUNsQyxJQUFJLEtBQUssR0FBR0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQ7Q0FDQSxlQUFjLEdBQUcsS0FBSzs7Q0NKdEIsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ3pDO0NBQ0E7Q0FDQSxJQUFJLE9BQU9TLFdBQUssQ0FBQyxhQUFhLElBQUksVUFBVSxFQUFFO0NBQzlDLEVBQUVBLFdBQUssQ0FBQyxhQUFhLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDdEMsSUFBSSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQyxHQUFHLENBQUM7Q0FDSixDQUFDO0FBQ0Q7Q0FDQSxpQkFBYyxHQUFHQSxXQUFLLENBQUMsYUFBYTs7Q0NScEMsSUFBSSxPQUFPLEdBQUdULFFBQU0sQ0FBQyxPQUFPLENBQUM7QUFDN0I7Q0FDQSxpQkFBYyxHQUFHLE9BQU8sT0FBTyxLQUFLLFVBQVUsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0NDRjVGLENBQUMsY0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUN4QyxFQUFFLE9BQU9TLFdBQUssQ0FBQyxHQUFHLENBQUMsS0FBS0EsV0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssS0FBSyxTQUFTLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0NBQ3hCLEVBQUUsT0FBTyxFQUFFLE9BQU87Q0FDbEIsRUFBRSxJQUFJLEdBQXFCLFFBQVE7Q0FDbkMsRUFBRSxTQUFTLEVBQUUsc0NBQXNDO0NBQ25ELENBQUMsQ0FBQzs7O0NDVEYsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ1gsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCO0NBQ0EsT0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFO0NBQ2hDLEVBQUUsT0FBTyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDakcsQ0FBQzs7Q0NGRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUI7Q0FDQSxhQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDN0MsQ0FBQzs7Q0NQRCxjQUFjLEdBQUcsRUFBRTs7Q0NTbkIsSUFBSUMsU0FBTyxHQUFHVixRQUFNLENBQUMsT0FBTyxDQUFDO0NBQzdCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRVcsS0FBRyxDQUFDO0FBQ2xCO0NBQ0EsSUFBSSxPQUFPLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDNUIsRUFBRSxPQUFPQSxLQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDekMsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJLFNBQVMsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNoQyxFQUFFLE9BQU8sVUFBVSxFQUFFLEVBQUU7Q0FDdkIsSUFBSSxJQUFJLEtBQUssQ0FBQztDQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxLQUFLLElBQUksRUFBRTtDQUMxRCxNQUFNLE1BQU0sU0FBUyxDQUFDLHlCQUF5QixHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztDQUN0RSxLQUFLLENBQUMsT0FBTyxLQUFLLENBQUM7Q0FDbkIsR0FBRyxDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJQyxhQUFlLEVBQUU7Q0FDckIsRUFBRSxJQUFJSCxPQUFLLEdBQUdJLFdBQU0sQ0FBQyxLQUFLLEtBQUtBLFdBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSUgsU0FBTyxFQUFFLENBQUMsQ0FBQztDQUM3RCxFQUFFLElBQUksS0FBSyxHQUFHRCxPQUFLLENBQUMsR0FBRyxDQUFDO0NBQ3hCLEVBQUUsSUFBSSxLQUFLLEdBQUdBLE9BQUssQ0FBQyxHQUFHLENBQUM7Q0FDeEIsRUFBRSxJQUFJLEtBQUssR0FBR0EsT0FBSyxDQUFDLEdBQUcsQ0FBQztDQUN4QixFQUFFLEdBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUU7Q0FDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUN6QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUNBLE9BQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDcEMsSUFBSSxPQUFPLFFBQVEsQ0FBQztDQUNwQixHQUFHLENBQUM7Q0FDSixFQUFFLEdBQUcsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUN0QixJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQ0EsT0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUN2QyxHQUFHLENBQUM7Q0FDSixFQUFFRSxLQUFHLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDdEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUNGLE9BQUssRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNqQyxHQUFHLENBQUM7Q0FDSixDQUFDLE1BQU07Q0FDUCxFQUFFLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNqQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDM0IsRUFBRSxHQUFHLEdBQUcsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFO0NBQ2hDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDekIsSUFBSSwyQkFBMkIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3JELElBQUksT0FBTyxRQUFRLENBQUM7Q0FDcEIsR0FBRyxDQUFDO0NBQ0osRUFBRSxHQUFHLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDdEIsSUFBSSxPQUFPSyxHQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDakQsR0FBRyxDQUFDO0NBQ0osRUFBRUgsS0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3RCLElBQUksT0FBT0csR0FBUyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNoQyxHQUFHLENBQUM7Q0FDSixDQUFDO0FBQ0Q7Q0FDQSxpQkFBYyxHQUFHO0NBQ2pCLEVBQUUsR0FBRyxFQUFFLEdBQUc7Q0FDVixFQUFFLEdBQUcsRUFBRSxHQUFHO0NBQ1YsRUFBRSxHQUFHLEVBQUVILEtBQUc7Q0FDVixFQUFFLE9BQU8sRUFBRSxPQUFPO0NBQ2xCLEVBQUUsU0FBUyxFQUFFLFNBQVM7Q0FDdEIsQ0FBQzs7O0NDeERELElBQUksZ0JBQWdCLEdBQUdJLGFBQW1CLENBQUMsR0FBRyxDQUFDO0NBQy9DLElBQUksb0JBQW9CLEdBQUdBLGFBQW1CLENBQUMsT0FBTyxDQUFDO0NBQ3ZELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUM7Q0FDQSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtDQUNwRCxFQUFFLElBQUksTUFBTSxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDbEQsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0NBQ3RELEVBQUUsSUFBSSxXQUFXLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztDQUM1RCxFQUFFLElBQUksS0FBSyxDQUFDO0NBQ1osRUFBRSxJQUFJLE9BQU8sS0FBSyxJQUFJLFVBQVUsRUFBRTtDQUNsQyxJQUFJLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTtDQUN2RCxNQUFNLDJCQUEyQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDdEQsS0FBSztDQUNMLElBQUksS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Q0FDdkIsTUFBTSxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztDQUN0RSxLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsSUFBSSxDQUFDLEtBQUtmLFFBQU0sRUFBRTtDQUNwQixJQUFJLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDL0IsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQy9CLElBQUksT0FBTztDQUNYLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0NBQ3RCLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbEIsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQ3JDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztDQUNsQixHQUFHO0NBQ0gsRUFBRSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQzdCLE9BQU8sMkJBQTJCLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNsRDtDQUNBLENBQUMsRUFBRSxRQUFRLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLFFBQVEsR0FBRztDQUN2RCxFQUFFLE9BQU8sT0FBTyxJQUFJLElBQUksVUFBVSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDM0YsQ0FBQyxDQUFDOzs7Q0NyQ0YsUUFBYyxHQUFHQSxRQUFNOztDQ0N2QixJQUFJLFNBQVMsR0FBRyxVQUFVLFFBQVEsRUFBRTtDQUNwQyxFQUFFLE9BQU8sT0FBTyxRQUFRLElBQUksVUFBVSxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUM7Q0FDOUQsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxjQUFjLEdBQUcsVUFBVSxTQUFTLEVBQUUsTUFBTSxFQUFFO0NBQzlDLEVBQUUsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDQSxRQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDMUYsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJQSxRQUFNLENBQUMsU0FBUyxDQUFDLElBQUlBLFFBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNuRyxDQUFDOztDQ1ZELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QjtDQUNBO0NBQ0E7Q0FDQSxhQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDckMsRUFBRSxPQUFPLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDbkYsQ0FBQzs7Q0NMRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ25CO0NBQ0E7Q0FDQTtDQUNBLFlBQWMsR0FBRyxVQUFVLFFBQVEsRUFBRTtDQUNyQyxFQUFFLE9BQU8sUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZFLENBQUM7O0NDTkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztDQUNuQixJQUFJZ0IsS0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbkI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxtQkFBYyxHQUFHLFVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRTtDQUMxQyxFQUFFLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNqQyxFQUFFLE9BQU8sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBR0EsS0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN2RSxDQUFDOztDQ1BEO0NBQ0EsSUFBSSxZQUFZLEdBQUcsVUFBVSxXQUFXLEVBQUU7Q0FDMUMsRUFBRSxPQUFPLFVBQVUsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUU7Q0FDekMsSUFBSSxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDbkMsSUFBSSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3BDLElBQUksSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUNuRCxJQUFJLElBQUksS0FBSyxDQUFDO0NBQ2Q7Q0FDQTtDQUNBLElBQUksSUFBSSxXQUFXLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLE1BQU0sR0FBRyxLQUFLLEVBQUU7Q0FDeEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDekI7Q0FDQSxNQUFNLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRSxPQUFPLElBQUksQ0FBQztDQUN0QztDQUNBLEtBQUssTUFBTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDMUMsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLFdBQVcsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQzNGLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUNGO0NBQ0EsaUJBQWMsR0FBRztDQUNqQjtDQUNBO0NBQ0EsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQztDQUM5QjtDQUNBO0NBQ0EsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQztDQUM5QixDQUFDOztDQzdCRCxJQUFJLE9BQU8sR0FBR0MsYUFBc0MsQ0FBQyxPQUFPLENBQUM7QUFDUjtBQUNyRDtDQUNBLHNCQUFjLEdBQUcsVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFO0NBQzFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2xDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ1osRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDbEIsRUFBRSxJQUFJLEdBQUcsQ0FBQztDQUNWLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDMUU7Q0FDQSxFQUFFLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0NBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDOUMsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQzs7Q0NoQkQ7Q0FDQSxlQUFjLEdBQUc7Q0FDakIsRUFBRSxhQUFhO0NBQ2YsRUFBRSxnQkFBZ0I7Q0FDbEIsRUFBRSxlQUFlO0NBQ2pCLEVBQUUsc0JBQXNCO0NBQ3hCLEVBQUUsZ0JBQWdCO0NBQ2xCLEVBQUUsVUFBVTtDQUNaLEVBQUUsU0FBUztDQUNYLENBQUM7O0NDTkQsSUFBSUMsWUFBVSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNEO0NBQ0E7Q0FDQTtDQUNBLE9BQVMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLElBQUksU0FBUyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUU7Q0FDMUUsRUFBRSxPQUFPQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUVELFlBQVUsQ0FBQyxDQUFDO0NBQzNDLENBQUM7Ozs7OztDQ1RELE9BQVMsR0FBRyxNQUFNLENBQUMscUJBQXFCOzs7Ozs7Q0NLeEM7Q0FDQSxXQUFjLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxTQUFTLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Q0FDMUUsRUFBRSxJQUFJLElBQUksR0FBR0UseUJBQXlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsSUFBSSxxQkFBcUIsR0FBR0MsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0NBQzVELEVBQUUsT0FBTyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQy9FLENBQUM7O0NDTEQsNkJBQWMsR0FBRyxVQUFVLE1BQU0sRUFBRSxNQUFNLEVBQUU7Q0FDM0MsRUFBRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDN0IsRUFBRSxJQUFJLGNBQWMsR0FBR2Isb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0NBQzlDLEVBQUUsSUFBSSx3QkFBd0IsR0FBR2MsOEJBQThCLENBQUMsQ0FBQyxDQUFDO0NBQ2xFLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Q0FDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM5RixHQUFHO0NBQ0gsQ0FBQzs7Q0NYRCxJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztBQUNwQztDQUNBLElBQUksUUFBUSxHQUFHLFVBQVUsT0FBTyxFQUFFLFNBQVMsRUFBRTtDQUM3QyxFQUFFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUN2QyxFQUFFLE9BQU8sS0FBSyxJQUFJLFFBQVEsR0FBRyxJQUFJO0NBQ2pDLE1BQU0sS0FBSyxJQUFJLE1BQU0sR0FBRyxLQUFLO0NBQzdCLE1BQU0sT0FBTyxTQUFTLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7Q0FDdkQsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO0NBQ2xCLENBQUMsQ0FBQztBQUNGO0NBQ0EsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLE1BQU0sRUFBRTtDQUN2RCxFQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Q0FDaEUsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztDQUM5QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztDQUNuQyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUN2QztDQUNBLGNBQWMsR0FBRyxRQUFROztDQ25CekIsSUFBSUMsMEJBQXdCLEdBQUdOLDhCQUEwRCxDQUFDLENBQUMsQ0FBQztBQUNIO0FBQ3pDO0FBQ0c7QUFDaUM7QUFDbkM7QUFDakQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsV0FBYyxHQUFHLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtDQUM1QyxFQUFFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Q0FDOUIsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0NBQzlCLEVBQUUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztDQUM1QixFQUFFLElBQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUM7Q0FDdEUsRUFBRSxJQUFJLE1BQU0sRUFBRTtDQUNkLElBQUksTUFBTSxHQUFHakIsUUFBTSxDQUFDO0NBQ3BCLEdBQUcsTUFBTSxJQUFJLE1BQU0sRUFBRTtDQUNyQixJQUFJLE1BQU0sR0FBR0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDckQsR0FBRyxNQUFNO0NBQ1QsSUFBSSxNQUFNLEdBQUcsQ0FBQ0EsUUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDOUMsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksTUFBTSxFQUFFO0NBQ2xDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNqQyxJQUFJLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtDQUM3QixNQUFNLFVBQVUsR0FBR3VCLDBCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN6RCxNQUFNLGNBQWMsR0FBRyxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQztDQUN0RCxLQUFLLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN4QyxJQUFJLE1BQU0sR0FBR0MsVUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMxRjtDQUNBLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO0NBQ2pELE1BQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxPQUFPLGNBQWMsRUFBRSxTQUFTO0NBQ3BFLE1BQU0seUJBQXlCLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQ2hFLEtBQUs7Q0FDTDtDQUNBLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGNBQWMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDakUsTUFBTSwyQkFBMkIsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2hFLEtBQUs7Q0FDTDtDQUNBLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ25ELEdBQUc7Q0FDSCxDQUFDOztDQ25ERDtDQUNBO0NBQ0EsWUFBYyxHQUFHLFVBQVUsUUFBUSxFQUFFO0NBQ3JDLEVBQUUsT0FBTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztDQUNsRCxDQUFDOztDQ0pELDBCQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUNwQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLGVBQWU7Q0FDOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Q0FDakMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUM7Q0FDeEQsQ0FBQyxDQUFDOztDQ0RGLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNyQyxJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ3ZDO0NBQ0E7Q0FDQTtDQUNBLHdCQUFjLEdBQUdDLHNCQUF3QixHQUFHLE1BQU0sQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEVBQUU7Q0FDakYsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQzNDLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxXQUFXLElBQUksVUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFO0NBQ3hFLElBQUksT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztDQUNuQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksTUFBTSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUM7Q0FDeEQsQ0FBQzs7Q0NkRCxzQkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0NBQ3BDLElBQUksTUFBTSxTQUFTLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO0NBQ25FLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNkLENBQUM7O0NDSEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSx3QkFBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEtBQUssV0FBVyxJQUFJLEVBQUUsR0FBRyxZQUFZO0NBQzNFLEVBQUUsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0NBQzdCLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxNQUFNLENBQUM7Q0FDYixFQUFFLElBQUk7Q0FDTixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUM7Q0FDaEYsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUMxQixJQUFJLGNBQWMsR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDO0NBQzNDLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxlQUFlO0NBQ2pDLEVBQUUsT0FBTyxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFO0NBQzNDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDOUIsSUFBSSxJQUFJLGNBQWMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM5QyxTQUFTLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0NBQzdCLElBQUksT0FBTyxDQUFDLENBQUM7Q0FDYixHQUFHLENBQUM7Q0FDSixDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7O0NDcEJoQjtDQUNBO0NBQ0EsY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFO0NBQ2pELEVBQUUsT0FBT04sa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0NBQzVDLENBQUM7O0NDRkQ7Q0FDQTtDQUNBLDBCQUFjLEdBQUdmLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFO0NBQ2xHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2QsRUFBRSxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDcEMsRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQzNCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLEVBQUUsSUFBSSxHQUFHLENBQUM7Q0FDVixFQUFFLE9BQU8sTUFBTSxHQUFHLEtBQUssRUFBRUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDekYsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNYLENBQUM7O0NDYkQsUUFBYyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUM7O0NDTTFELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztDQUNiLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztDQUNiLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQztDQUM1QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7Q0FDdEIsSUFBSWtCLFVBQVEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckM7Q0FDQSxJQUFJLGdCQUFnQixHQUFHLFlBQVksZUFBZSxDQUFDO0FBQ25EO0NBQ0EsSUFBSSxTQUFTLEdBQUcsVUFBVSxPQUFPLEVBQUU7Q0FDbkMsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDN0QsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQTtDQUNBLElBQUkseUJBQXlCLEdBQUcsVUFBVSxlQUFlLEVBQUU7Q0FDM0QsRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQzFCLEVBQUUsSUFBSSxJQUFJLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Q0FDakQsRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDO0NBQ3pCLEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FDZCxDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0EsSUFBSSx3QkFBd0IsR0FBRyxZQUFZO0NBQzNDO0NBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMvQyxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxjQUFjLENBQUM7Q0FDckIsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Q0FDaEMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzNCO0NBQ0EsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUMxQixFQUFFLGNBQWMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztDQUNqRCxFQUFFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUN4QixFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztDQUN2RCxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUN6QixFQUFFLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQztDQUMxQixDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLGVBQWUsQ0FBQztDQUNwQixJQUFJLGVBQWUsR0FBRyxZQUFZO0NBQ2xDLEVBQUUsSUFBSTtDQUNOO0NBQ0EsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUN2RSxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUUsZ0JBQWdCO0NBQ2xDLEVBQUUsZUFBZSxHQUFHLGVBQWUsR0FBRyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsR0FBRyx3QkFBd0IsRUFBRSxDQUFDO0NBQzlHLEVBQUUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztDQUNsQyxFQUFFLE9BQU8sTUFBTSxFQUFFLEVBQUUsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Q0FDMUUsRUFBRSxPQUFPLGVBQWUsRUFBRSxDQUFDO0NBQzNCLENBQUMsQ0FBQztBQUNGO0NBQ0EsVUFBVSxDQUFDQSxVQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDNUI7Q0FDQTtDQUNBO0NBQ0EsZ0JBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUU7Q0FDakUsRUFBRSxJQUFJLE1BQU0sQ0FBQztDQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0NBQ2xCLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzlDLElBQUksTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztDQUNwQyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUN2QztDQUNBLElBQUksTUFBTSxDQUFDQSxVQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDekIsR0FBRyxNQUFNLE1BQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztDQUNwQyxFQUFFLE9BQU8sVUFBVSxLQUFLLFNBQVMsR0FBRyxNQUFNLEdBQUdDLHNCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNsRixDQUFDOztDQzNFRCxnQkFBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtDQUN0RTtDQUNBO0NBQ0EsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Q0FDM0IsQ0FBQyxDQUFDOztDQ0pGLGtCQUFjLEdBQUdDLFlBQWE7Q0FDOUI7Q0FDQSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUk7Q0FDakI7Q0FDQSxLQUFLLE9BQU8sTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFROztDQ0N2QyxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQyxJQUFJQyxRQUFNLEdBQUc3QixRQUFNLENBQUMsTUFBTSxDQUFDO0NBQzNCLElBQUkscUJBQXFCLEdBQUc4QixjQUFpQixHQUFHRCxRQUFNLEdBQUdBLFFBQU0sSUFBSUEsUUFBTSxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUM7QUFDL0Y7Q0FDQSxtQkFBYyxHQUFHLFVBQVUsSUFBSSxFQUFFO0NBQ2pDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsRUFBRTtDQUN6QyxJQUFJLElBQUlELFlBQWEsSUFBSSxHQUFHLENBQUNDLFFBQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBR0EsUUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZGLFNBQVMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQy9FLEdBQUcsQ0FBQyxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLENBQUM7O0NDaEJELGFBQWMsR0FBRyxFQUFFOztDQ0duQixJQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDM0MsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUNyQztDQUNBO0NBQ0EseUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLE9BQU8sRUFBRSxLQUFLLFNBQVMsS0FBS0UsU0FBUyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ3pGLENBQUM7O0NDVEQsZUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxPQUFPLEVBQUUsSUFBSSxVQUFVLEVBQUU7Q0FDL0IsSUFBSSxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztDQUN2RCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDZCxDQUFDOztDQ0ZEO0NBQ0EsdUJBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQzdDLEVBQUVDLFdBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUNwQyxFQUFFLFFBQVEsTUFBTTtDQUNoQixJQUFJLEtBQUssQ0FBQyxFQUFFLE9BQU8sWUFBWTtDQUMvQixNQUFNLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMzQixLQUFLLENBQUM7Q0FDTixJQUFJLEtBQUssQ0FBQyxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUU7Q0FDaEMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzlCLEtBQUssQ0FBQztDQUNOLElBQUksS0FBSyxDQUFDLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDbkMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNqQyxLQUFLLENBQUM7Q0FDTixJQUFJLEtBQUssQ0FBQyxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtDQUN0QyxNQUFNLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNwQyxLQUFLLENBQUM7Q0FDTixHQUFHO0NBQ0gsRUFBRSxPQUFPLHlCQUF5QjtDQUNsQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDckMsR0FBRyxDQUFDO0NBQ0osQ0FBQzs7Q0NyQkQsSUFBSSxhQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ25ELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkO0NBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMxQjtDQUNBLHNCQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVk7O0NDSDlDLElBQUlDLGVBQWEsR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FDbkQ7Q0FDQSxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUM7QUFDdkY7Q0FDQTtDQUNBLElBQUksTUFBTSxHQUFHLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRTtDQUNoQyxFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ25CLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRSxlQUFlO0NBQ2pDLENBQUMsQ0FBQztBQUNGO0NBQ0E7Q0FDQSxXQUFjLEdBQUdDLGtCQUFxQixHQUFHLFVBQVUsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUNwRSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7Q0FDckIsRUFBRSxPQUFPLEVBQUUsS0FBSyxTQUFTLEdBQUcsV0FBVyxHQUFHLEVBQUUsS0FBSyxJQUFJLEdBQUcsTUFBTTtDQUM5RDtDQUNBLE1BQU0sUUFBUSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUVELGVBQWEsQ0FBQyxDQUFDLElBQUksUUFBUSxHQUFHLEdBQUc7Q0FDNUU7Q0FDQSxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDdkM7Q0FDQSxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO0NBQ25HLENBQUM7O0NDckJELElBQUlFLFVBQVEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0M7Q0FDQSxxQkFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQy9CLEVBQUUsSUFBSSxFQUFFLElBQUksU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDQSxVQUFRLENBQUM7Q0FDMUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO0NBQ3ZCLE9BQU9KLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM5QixDQUFDOztDQ1JELGlCQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUU7Q0FDckMsRUFBRSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDeEMsRUFBRSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7Q0FDbEMsSUFBSSxPQUFPLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0NBQ3ZELEdBQUc7Q0FDSCxDQUFDOztDQ0FELElBQUksTUFBTSxHQUFHLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtDQUN4QyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQ3pCLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdkIsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxXQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRTtDQUMvRCxFQUFFLElBQUksSUFBSSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDckQsRUFBRSxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN2RCxFQUFFLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ3ZELEVBQUUsSUFBSSxFQUFFLEdBQUdLLG1CQUFJLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0NBQ3JFLEVBQUUsSUFBSSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7QUFDMUQ7Q0FDQSxFQUFFLElBQUksSUFBSSxHQUFHLFVBQVUsU0FBUyxFQUFFO0NBQ2xDLElBQUksSUFBSSxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQzFDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDdkMsR0FBRyxDQUFDO0FBQ0o7Q0FDQSxFQUFFLElBQUksTUFBTSxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ2hDLElBQUksSUFBSSxVQUFVLEVBQUU7Q0FDcEIsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDdEIsTUFBTSxPQUFPLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pGLEtBQUssQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN2RCxHQUFHLENBQUM7QUFDSjtDQUNBLEVBQUUsSUFBSSxXQUFXLEVBQUU7Q0FDbkIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDO0NBQ3hCLEdBQUcsTUFBTTtDQUNULElBQUksTUFBTSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ3pDLElBQUksSUFBSSxPQUFPLE1BQU0sSUFBSSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQztDQUMvRTtDQUNBLElBQUksSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUN2QyxNQUFNLEtBQUssS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQ25GLFFBQVEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUN6QyxRQUFRLElBQUksTUFBTSxJQUFJLE1BQU0sWUFBWSxNQUFNLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDOUQsT0FBTyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDakMsS0FBSztDQUNMLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDckMsR0FBRztBQUNIO0NBQ0EsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztDQUN2QixFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRTtDQUM3QyxJQUFJLElBQUk7Q0FDUixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2xDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNwQixNQUFNLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUM5QixNQUFNLE1BQU0sS0FBSyxDQUFDO0NBQ2xCLEtBQUs7Q0FDTCxJQUFJLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLFlBQVksTUFBTSxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ3ZGLEdBQUcsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzdCLENBQUM7O0NDaERELElBQUksZUFBZSxHQUFHLFNBQVMsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUU7Q0FDL0QsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDbEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxZQUFZLGVBQWUsQ0FBQyxFQUFFLE9BQU8sSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3RGLEVBQUUsSUFBSUMsb0JBQWMsRUFBRTtDQUN0QjtDQUNBLElBQUksSUFBSSxHQUFHQSxvQkFBYyxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFQyxvQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDdEUsR0FBRztDQUNILEVBQUUsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLDJCQUEyQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDM0YsRUFBRSxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7Q0FDdkIsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztDQUMzRCxFQUFFLDJCQUEyQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FDM0QsRUFBRSxPQUFPLElBQUksQ0FBQztDQUNkLENBQUMsQ0FBQztBQUNGO0NBQ0EsZUFBZSxDQUFDLFNBQVMsR0FBR0MsWUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Q0FDcEQsRUFBRSxXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQztDQUMzRCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQzFDLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQztDQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNIO0NBQ0E7Q0FDQTtBQUNBQyxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FDcEIsRUFBRSxjQUFjLEVBQUUsZUFBZTtDQUNqQyxDQUFDLENBQUM7O0NDN0JGO0NBQ0E7Q0FDQSxrQkFBYyxHQUFHTixrQkFBcUIsR0FBRyxFQUFFLENBQUMsUUFBUSxHQUFHLFNBQVMsUUFBUSxHQUFHO0NBQzNFLEVBQUUsT0FBTyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUMxQyxDQUFDOztDQ0pEO0NBQ0E7Q0FDQSxJQUFJLENBQUNBLGtCQUFxQixFQUFFO0NBQzVCLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFTyxjQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUNyRTs7Q0NOQSw0QkFBYyxHQUFHekMsUUFBTSxDQUFDLE9BQU87O0NDQS9CLGVBQWMsR0FBRyxVQUFVLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0NBQ2pELEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ2hFLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQzs7Q0NMRCxJQUFJLGNBQWMsR0FBR2lCLG9CQUE4QyxDQUFDLENBQUMsQ0FBQztBQUNoQztBQUMwQjtBQUNoRTtDQUNBLElBQUlnQixlQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ25EO0NBQ0Esa0JBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0NBQzVDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRUEsZUFBYSxDQUFDLEVBQUU7Q0FDbEUsSUFBSSxjQUFjLENBQUMsRUFBRSxFQUFFQSxlQUFhLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQzFFLEdBQUc7Q0FDSCxDQUFDOztDQ0pELElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QztDQUNBLGNBQWMsR0FBRyxVQUFVLGdCQUFnQixFQUFFO0NBQzdDLEVBQUUsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Q0FDakQsRUFBRSxJQUFJLGNBQWMsR0FBR3pCLG9CQUFvQixDQUFDLENBQUMsQ0FBQztBQUM5QztDQUNBLEVBQUUsSUFBSUosV0FBVyxJQUFJLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtDQUMzRCxJQUFJLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0NBQ3pDLE1BQU0sWUFBWSxFQUFFLElBQUk7Q0FDeEIsTUFBTSxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUU7Q0FDdkMsS0FBSyxDQUFDLENBQUM7Q0FDUCxHQUFHO0NBQ0gsQ0FBQzs7Q0NsQkQsY0FBYyxHQUFHLFVBQVUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Q0FDbEQsRUFBRSxJQUFJLEVBQUUsRUFBRSxZQUFZLFdBQVcsQ0FBQyxFQUFFO0NBQ3BDLElBQUksTUFBTSxTQUFTLENBQUMsWUFBWSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO0NBQzVFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNkLENBQUM7O0NDRkQsSUFBSStCLFVBQVEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDM0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQ3pCO0NBQ0EsSUFBSTtDQUNKLEVBQUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQ2pCLEVBQUUsSUFBSSxrQkFBa0IsR0FBRztDQUMzQixJQUFJLElBQUksRUFBRSxZQUFZO0NBQ3RCLE1BQU0sT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztDQUNsQyxLQUFLO0NBQ0wsSUFBSSxRQUFRLEVBQUUsWUFBWTtDQUMxQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7Q0FDMUIsS0FBSztDQUNMLEdBQUcsQ0FBQztDQUNKLEVBQUUsa0JBQWtCLENBQUNBLFVBQVEsQ0FBQyxHQUFHLFlBQVk7Q0FDN0MsSUFBSSxPQUFPLElBQUksQ0FBQztDQUNoQixHQUFHLENBQUM7Q0FDSjtDQUNBLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDM0QsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLGVBQWU7QUFDL0I7Q0FDQSwrQkFBYyxHQUFHLFVBQVUsSUFBSSxFQUFFLFlBQVksRUFBRTtDQUMvQyxFQUFFLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDbkQsRUFBRSxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQztDQUNoQyxFQUFFLElBQUk7Q0FDTixJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNwQixJQUFJLE1BQU0sQ0FBQ0EsVUFBUSxDQUFDLEdBQUcsWUFBWTtDQUNuQyxNQUFNLE9BQU87Q0FDYixRQUFRLElBQUksRUFBRSxZQUFZO0NBQzFCLFVBQVUsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsQ0FBQztDQUNwRCxTQUFTO0NBQ1QsT0FBTyxDQUFDO0NBQ1IsS0FBSyxDQUFDO0NBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDakIsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFLGVBQWU7Q0FDakMsRUFBRSxPQUFPLGlCQUFpQixDQUFDO0NBQzNCLENBQUM7O0NDakNELElBQUlPLFNBQU8sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekM7Q0FDQTtDQUNBO0NBQ0Esc0JBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxrQkFBa0IsRUFBRTtDQUNsRCxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7Q0FDbEMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNSLEVBQUUsT0FBTyxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsU0FBTyxDQUFDLEtBQUssU0FBUyxHQUFHLGtCQUFrQixHQUFHVixXQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEcsQ0FBQzs7Q0NWRCxtQkFBYyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRTs7Q0NBM0QsZUFBYyxHQUFHLGtDQUFrQyxDQUFDLElBQUksQ0FBQ1csZUFBUyxDQUFDOztDQ0NuRSxnQkFBYyxHQUFHMUMsVUFBTyxDQUFDRCxRQUFNLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUzs7Q0NLckQsSUFBSSxRQUFRLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLENBQUM7Q0FDL0IsSUFBSTRDLEtBQUcsR0FBRzVDLFFBQU0sQ0FBQyxZQUFZLENBQUM7Q0FDOUIsSUFBSSxLQUFLLEdBQUdBLFFBQU0sQ0FBQyxjQUFjLENBQUM7Q0FDbEMsSUFBSSxPQUFPLEdBQUdBLFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxjQUFjLEdBQUdBLFFBQU0sQ0FBQyxjQUFjLENBQUM7Q0FDM0MsSUFBSSxRQUFRLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLENBQUM7Q0FDL0IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNmLElBQUksa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7Q0FDOUMsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQztBQUN6QjtDQUNBLElBQUksR0FBRyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3hCO0NBQ0EsRUFBRSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDaEMsSUFBSSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdkIsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNyQixJQUFJLEVBQUUsRUFBRSxDQUFDO0NBQ1QsR0FBRztDQUNILENBQUMsQ0FBQztBQUNGO0NBQ0EsSUFBSSxNQUFNLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDM0IsRUFBRSxPQUFPLFlBQVk7Q0FDckIsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDWixHQUFHLENBQUM7Q0FDSixDQUFDLENBQUM7QUFDRjtDQUNBLElBQUksUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ2hDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsQixDQUFDLENBQUM7QUFDRjtDQUNBLElBQUksSUFBSSxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQ3pCO0NBQ0EsRUFBRUEsUUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN4RSxDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0EsSUFBSSxDQUFDNEMsS0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0NBQ3BCLEVBQUVBLEtBQUcsR0FBRyxTQUFTLFlBQVksQ0FBQyxFQUFFLEVBQUU7Q0FDbEMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDbEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDZCxJQUFJLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzNELElBQUksS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsWUFBWTtDQUNuQztDQUNBLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxVQUFVLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzNFLEtBQUssQ0FBQztDQUNOLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ25CLElBQUksT0FBTyxPQUFPLENBQUM7Q0FDbkIsR0FBRyxDQUFDO0NBQ0osRUFBRSxLQUFLLEdBQUcsU0FBUyxjQUFjLENBQUMsRUFBRSxFQUFFO0NBQ3RDLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDckIsR0FBRyxDQUFDO0NBQ0o7Q0FDQSxFQUFFLElBQUlDLFlBQU8sRUFBRTtDQUNmLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzFCLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNuQyxLQUFLLENBQUM7Q0FDTjtDQUNBLEdBQUcsTUFBTSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO0NBQ3ZDLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzFCLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMvQixLQUFLLENBQUM7Q0FDTjtDQUNBO0NBQ0EsR0FBRyxNQUFNLElBQUksY0FBYyxJQUFJLENBQUNDLFdBQU0sRUFBRTtDQUN4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0NBQ25DLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Q0FDekIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Q0FDdkMsSUFBSSxLQUFLLEdBQUdWLG1CQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDNUM7Q0FDQTtDQUNBLEdBQUcsTUFBTTtDQUNULElBQUlwQyxRQUFNLENBQUMsZ0JBQWdCO0NBQzNCLElBQUksT0FBTyxXQUFXLElBQUksVUFBVTtDQUNwQyxJQUFJLENBQUNBLFFBQU0sQ0FBQyxhQUFhO0NBQ3pCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssT0FBTztDQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztDQUNoQixJQUFJO0NBQ0osSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLElBQUlBLFFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3hEO0NBQ0EsR0FBRyxNQUFNLElBQUksa0JBQWtCLElBQUlLLHFCQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7Q0FDNUQsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFLEVBQUU7Q0FDMUIsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDQSxxQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxZQUFZO0NBQ2xGLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUMvQixRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNoQixPQUFPLENBQUM7Q0FDUixLQUFLLENBQUM7Q0FDTjtDQUNBLEdBQUcsTUFBTTtDQUNULElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzFCLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNoQyxLQUFLLENBQUM7Q0FDTixHQUFHO0NBQ0gsQ0FBQztBQUNEO0NBQ0EsUUFBYyxHQUFHO0NBQ2pCLEVBQUUsR0FBRyxFQUFFdUMsS0FBRztDQUNWLEVBQUUsS0FBSyxFQUFFLEtBQUs7Q0FDZCxDQUFDOztDQ3hHRCx1QkFBYyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQ0QsZUFBUyxDQUFDOztDQ0RyRCxJQUFJcEIsMEJBQXdCLEdBQUdOLDhCQUEwRCxDQUFDLENBQUMsQ0FBQztDQUM1RixJQUFJLFNBQVMsR0FBRzhCLElBQTRCLENBQUMsR0FBRyxDQUFDO0FBQ0U7QUFDa0I7QUFDaEI7QUFDckQ7Q0FDQSxJQUFJLGdCQUFnQixHQUFHL0MsUUFBTSxDQUFDLGdCQUFnQixJQUFJQSxRQUFNLENBQUMsc0JBQXNCLENBQUM7Q0FDaEYsSUFBSUcsVUFBUSxHQUFHSCxRQUFNLENBQUMsUUFBUSxDQUFDO0NBQy9CLElBQUlnRCxTQUFPLEdBQUdoRCxRQUFNLENBQUMsT0FBTyxDQUFDO0NBQzdCLElBQUlpRCxTQUFPLEdBQUdqRCxRQUFNLENBQUMsT0FBTyxDQUFDO0NBQzdCO0NBQ0EsSUFBSSx3QkFBd0IsR0FBR3VCLDBCQUF3QixDQUFDdkIsUUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Q0FDbEYsSUFBSSxjQUFjLEdBQUcsd0JBQXdCLElBQUksd0JBQXdCLENBQUMsS0FBSyxDQUFDO0FBQ2hGO0NBQ0EsSUFBSSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO0FBQzNEO0NBQ0E7Q0FDQSxJQUFJLENBQUMsY0FBYyxFQUFFO0NBQ3JCLEVBQUUsS0FBSyxHQUFHLFlBQVk7Q0FDdEIsSUFBSSxJQUFJLE1BQU0sRUFBRSxFQUFFLENBQUM7Q0FDbkIsSUFBSSxJQUFJNkMsWUFBTyxLQUFLLE1BQU0sR0FBR0csU0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUM1RCxJQUFJLE9BQU8sSUFBSSxFQUFFO0NBQ2pCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUN2QixNQUFNLElBQUk7Q0FDVixRQUFRLEVBQUUsRUFBRSxDQUFDO0NBQ2IsT0FBTyxDQUFDLE9BQU8sS0FBSyxFQUFFO0NBQ3RCLFFBQVEsSUFBSSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7Q0FDM0IsYUFBYSxJQUFJLEdBQUcsU0FBUyxDQUFDO0NBQzlCLFFBQVEsTUFBTSxLQUFLLENBQUM7Q0FDcEIsT0FBTztDQUNQLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0NBQ3ZCLElBQUksSUFBSSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQy9CLEdBQUcsQ0FBQztBQUNKO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsSUFBSSxDQUFDRixXQUFNLElBQUksQ0FBQ0QsWUFBTyxJQUFJLENBQUNLLG1CQUFlLElBQUksZ0JBQWdCLElBQUkvQyxVQUFRLEVBQUU7Q0FDL0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0NBQ2xCLElBQUksSUFBSSxHQUFHQSxVQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZDLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Q0FDdkUsSUFBSSxNQUFNLEdBQUcsWUFBWTtDQUN6QixNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO0NBQ25DLEtBQUssQ0FBQztDQUNOO0NBQ0EsR0FBRyxNQUFNLElBQUk4QyxTQUFPLElBQUlBLFNBQU8sQ0FBQyxPQUFPLEVBQUU7Q0FDekM7Q0FDQSxJQUFJLE9BQU8sR0FBR0EsU0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUN6QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQ3hCLElBQUksTUFBTSxHQUFHLFlBQVk7Q0FDekIsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNoQyxLQUFLLENBQUM7Q0FDTjtDQUNBLEdBQUcsTUFBTSxJQUFJSixZQUFPLEVBQUU7Q0FDdEIsSUFBSSxNQUFNLEdBQUcsWUFBWTtDQUN6QixNQUFNRyxTQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzlCLEtBQUssQ0FBQztDQUNOO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEdBQUcsTUFBTTtDQUNULElBQUksTUFBTSxHQUFHLFlBQVk7Q0FDekI7Q0FDQSxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUNoRCxRQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDcEMsS0FBSyxDQUFDO0NBQ04sR0FBRztDQUNILENBQUM7QUFDRDtDQUNBLGFBQWMsR0FBRyxjQUFjLElBQUksVUFBVSxFQUFFLEVBQUU7Q0FDakQsRUFBRSxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0NBQ3pDLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDN0IsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0NBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ2hCLElBQUksTUFBTSxFQUFFLENBQUM7Q0FDYixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNoQixDQUFDOztDQzVFRCxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxFQUFFO0NBQ3JDLEVBQUUsSUFBSSxPQUFPLEVBQUUsTUFBTSxDQUFDO0NBQ3RCLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLFNBQVMsRUFBRSxRQUFRLEVBQUU7Q0FDdEQsSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0NBQ2xHLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztDQUN4QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7Q0FDdEIsR0FBRyxDQUFDLENBQUM7Q0FDTCxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUdnQyxXQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDcEMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHQSxXQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDbEMsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQTtDQUNBLE9BQWdCLEdBQUcsVUFBVSxDQUFDLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsQ0FBQzs7Ozs7O0NDYkQsa0JBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDakMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDZCxFQUFFLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ25ELEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDcEQsRUFBRSxJQUFJLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7Q0FDMUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDYixFQUFFLE9BQU8saUJBQWlCLENBQUMsT0FBTyxDQUFDO0NBQ25DLENBQUM7O0NDVEQsb0JBQWMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7Q0FDakMsRUFBRSxJQUFJLE9BQU8sR0FBR2hDLFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDL0IsRUFBRSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO0NBQ2hDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNwRSxHQUFHO0NBQ0gsQ0FBQzs7Q0NQRCxXQUFjLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDakMsRUFBRSxJQUFJO0NBQ04sSUFBSSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztDQUMzQyxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7Q0FDekMsR0FBRztDQUNILENBQUM7O0NDSEQsSUFBSWdELFNBQU8sR0FBR2hELFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxRQUFRLEdBQUdnRCxTQUFPLElBQUlBLFNBQU8sQ0FBQyxRQUFRLENBQUM7Q0FDM0MsSUFBSSxFQUFFLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7Q0FDakMsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDO0FBQ25CO0NBQ0EsSUFBSSxFQUFFLEVBQUU7Q0FDUixFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3hCLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEMsQ0FBQyxNQUFNLElBQUlMLGVBQVMsRUFBRTtDQUN0QixFQUFFLEtBQUssR0FBR0EsZUFBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUN6QyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtDQUNoQyxJQUFJLEtBQUssR0FBR0EsZUFBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUM3QyxJQUFJLElBQUksS0FBSyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEMsR0FBRztDQUNILENBQUM7QUFDRDtDQUNBLG1CQUFjLEdBQUcsT0FBTyxJQUFJLENBQUMsT0FBTzs7Q0NGcEMsSUFBSVEsTUFBSSxHQUFHbEMsSUFBNEIsQ0FBQyxHQUFHLENBQUM7QUFDTTtBQUNXO0FBQ0s7QUFDYztBQUNsQztBQUNtQjtBQUNoQjtBQUNlO0FBQ1g7QUFDTTtBQUMzRDtDQUNBLElBQUl5QixTQUFPLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3pDLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztDQUN4QixJQUFJLGdCQUFnQixHQUFHM0IsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSxnQkFBZ0IsR0FBR0EsYUFBbUIsQ0FBQyxHQUFHLENBQUM7Q0FDL0MsSUFBSSx1QkFBdUIsR0FBR0EsYUFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDckUsSUFBSSxrQkFBa0IsR0FBR3FDLHdCQUFhLENBQUM7Q0FDdkMsSUFBSUMsV0FBUyxHQUFHckQsUUFBTSxDQUFDLFNBQVMsQ0FBQztDQUNqQyxJQUFJRyxVQUFRLEdBQUdILFFBQU0sQ0FBQyxRQUFRLENBQUM7Q0FDL0IsSUFBSWdELFNBQU8sR0FBR2hELFFBQU0sQ0FBQyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pDLElBQUlzRCxzQkFBb0IsR0FBR0Msb0JBQTBCLENBQUMsQ0FBQyxDQUFDO0NBQ3hELElBQUksMkJBQTJCLEdBQUdELHNCQUFvQixDQUFDO0NBQ3ZELElBQUksY0FBYyxHQUFHLENBQUMsRUFBRW5ELFVBQVEsSUFBSUEsVUFBUSxDQUFDLFdBQVcsSUFBSUgsUUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQ2xGLElBQUksc0JBQXNCLEdBQUcsT0FBTyxxQkFBcUIsSUFBSSxVQUFVLENBQUM7Q0FDeEUsSUFBSSxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztDQUMvQyxJQUFJLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0NBQzNDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztDQUNoQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDbEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0NBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztDQUNoQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDbEIsSUFBSSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztBQUMvRDtDQUNBLElBQUksTUFBTSxHQUFHd0IsVUFBUSxDQUFDLE9BQU8sRUFBRSxZQUFZO0NBQzNDLEVBQUUsSUFBSSxzQkFBc0IsR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsS0FBSyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztDQUNoRyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtDQUMvQjtDQUNBO0NBQ0E7Q0FDQSxJQUFJLElBQUlnQyxlQUFVLEtBQUssRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ3ZDO0NBQ0EsSUFBSSxJQUFJLENBQUNYLFlBQU8sSUFBSSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ3pELEdBQUc7Q0FHSDtDQUNBO0NBQ0E7Q0FDQSxFQUFFLElBQUlXLGVBQVUsSUFBSSxFQUFFLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQy9FO0NBQ0EsRUFBRSxJQUFJLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsRUFBRSxJQUFJLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNwQyxJQUFJLElBQUksQ0FBQyxZQUFZLGVBQWUsRUFBRSxZQUFZLGVBQWUsQ0FBQyxDQUFDO0NBQ25FLEdBQUcsQ0FBQztDQUNKLEVBQUUsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7Q0FDN0MsRUFBRSxXQUFXLENBQUNkLFNBQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztDQUNyQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksZUFBZSxDQUFDLFlBQVksV0FBVyxDQUFDLENBQUM7Q0FDN0UsQ0FBQyxDQUFDLENBQUM7QUFDSDtDQUNBLElBQUksbUJBQW1CLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxRQUFRLEVBQUU7Q0FDckYsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxlQUFlLENBQUMsQ0FBQztDQUN6RSxDQUFDLENBQUMsQ0FBQztBQUNIO0NBQ0E7Q0FDQSxJQUFJLFVBQVUsR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMvQixFQUFFLElBQUksSUFBSSxDQUFDO0NBQ1gsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7Q0FDOUUsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJZSxRQUFNLEdBQUcsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFO0NBQ3hDLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU87Q0FDN0IsRUFBRSxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztDQUN4QixFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7Q0FDOUIsRUFBRSxTQUFTLENBQUMsWUFBWTtDQUN4QixJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Q0FDNUIsSUFBSSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztDQUN0QyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQjtDQUNBLElBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtDQUNqQyxNQUFNLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ3BDLE1BQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztDQUNyRCxNQUFNLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7Q0FDckMsTUFBTSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0NBQ25DLE1BQU0sSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztDQUNuQyxNQUFNLElBQUksTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7Q0FDL0IsTUFBTSxJQUFJO0NBQ1YsUUFBUSxJQUFJLE9BQU8sRUFBRTtDQUNyQixVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDbkIsWUFBWSxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hFLFlBQVksS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7Q0FDdEMsV0FBVztDQUNYLFVBQVUsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDL0MsZUFBZTtDQUNmLFlBQVksSUFBSSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3ZDLFlBQVksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNwQyxZQUFZLElBQUksTUFBTSxFQUFFO0NBQ3hCLGNBQWMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0NBQzVCLGNBQWMsTUFBTSxHQUFHLElBQUksQ0FBQztDQUM1QixhQUFhO0NBQ2IsV0FBVztDQUNYLFVBQVUsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLE9BQU8sRUFBRTtDQUMzQyxZQUFZLE1BQU0sQ0FBQ0osV0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztDQUNyRCxXQUFXLE1BQU0sSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0NBQ2hELFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQy9DLFdBQVcsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDakMsU0FBUyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM3QixPQUFPLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDdEIsUUFBUSxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDN0MsUUFBUSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDdEIsT0FBTztDQUNQLEtBQUs7Q0FDTCxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0NBQ3pCLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Q0FDM0IsSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pELEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJLGFBQWEsR0FBRyxVQUFVLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO0NBQ3JELEVBQUUsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDO0NBQ3JCLEVBQUUsSUFBSSxjQUFjLEVBQUU7Q0FDdEIsSUFBSSxLQUFLLEdBQUdsRCxVQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQzFDLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDNUIsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUMxQixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztDQUN2QyxJQUFJSCxRQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsTUFBTSxLQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQztDQUN0RCxFQUFFLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxPQUFPLEdBQUdBLFFBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDakYsT0FBTyxJQUFJLElBQUksS0FBSyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUNqRyxDQUFDLENBQUM7QUFDRjtDQUNBLElBQUksV0FBVyxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ25DLEVBQUVtRCxNQUFJLENBQUMsSUFBSSxDQUFDbkQsUUFBTSxFQUFFLFlBQVk7Q0FDaEMsSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQy9CLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztDQUM1QixJQUFJLElBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQyxJQUFJLElBQUksTUFBTSxDQUFDO0NBQ2YsSUFBSSxJQUFJLFlBQVksRUFBRTtDQUN0QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWTtDQUNuQyxRQUFRLElBQUk2QyxZQUFPLEVBQUU7Q0FDckIsVUFBVUcsU0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDN0QsU0FBUyxNQUFNLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDbEUsT0FBTyxDQUFDLENBQUM7Q0FDVDtDQUNBLE1BQU0sS0FBSyxDQUFDLFNBQVMsR0FBR0gsWUFBTyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDO0NBQzVFLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztDQUMzQyxLQUFLO0NBQ0wsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUM7QUFDRjtDQUNBLElBQUksV0FBVyxHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ25DLEVBQUUsT0FBTyxLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDdEQsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJLGlCQUFpQixHQUFHLFVBQVUsS0FBSyxFQUFFO0NBQ3pDLEVBQUVNLE1BQUksQ0FBQyxJQUFJLENBQUNuRCxRQUFNLEVBQUUsWUFBWTtDQUNoQyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDL0IsSUFBSSxJQUFJNkMsWUFBTyxFQUFFO0NBQ2pCLE1BQU1HLFNBQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDaEQsS0FBSyxNQUFNLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2xFLEdBQUcsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDO0FBQ0Y7Q0FDQSxJQUFJLElBQUksR0FBRyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0NBQ3hDLEVBQUUsT0FBTyxVQUFVLEtBQUssRUFBRTtDQUMxQixJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQzdCLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUNGO0NBQ0EsSUFBSSxjQUFjLEdBQUcsVUFBVSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtDQUNyRCxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPO0NBQ3pCLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDcEIsRUFBRSxJQUFJLE1BQU0sRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDO0NBQzdCLEVBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDdEIsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztDQUN6QixFQUFFUyxRQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3RCLENBQUMsQ0FBQztBQUNGO0NBQ0EsSUFBSSxlQUFlLEdBQUcsVUFBVSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtDQUN0RCxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPO0NBQ3pCLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDcEIsRUFBRSxJQUFJLE1BQU0sRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDO0NBQzdCLEVBQUUsSUFBSTtDQUNOLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRSxNQUFNSixXQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztDQUNwRixJQUFJLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNqQyxJQUFJLElBQUksSUFBSSxFQUFFO0NBQ2QsTUFBTSxTQUFTLENBQUMsWUFBWTtDQUM1QixRQUFRLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ3RDLFFBQVEsSUFBSTtDQUNaLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO0NBQ3pCLFlBQVksSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDO0NBQ2pELFlBQVksSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDO0NBQ2hELFdBQVcsQ0FBQztDQUNaLFNBQVMsQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUN4QixVQUFVLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hELFNBQVM7Q0FDVCxPQUFPLENBQUMsQ0FBQztDQUNULEtBQUssTUFBTTtDQUNYLE1BQU0sS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDMUIsTUFBTSxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztDQUM5QixNQUFNSSxRQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzNCLEtBQUs7Q0FDTCxHQUFHLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDbEIsSUFBSSxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2xELEdBQUc7Q0FDSCxDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0EsSUFBSSxNQUFNLEVBQUU7Q0FDWjtDQUNBLEVBQUUsa0JBQWtCLEdBQUcsU0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFO0NBQ2xELElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNsRCxJQUFJekIsV0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ3hCLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN4QixJQUFJLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZDLElBQUksSUFBSTtDQUNSLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQzFFLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNwQixNQUFNLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDbkMsS0FBSztDQUNMLEdBQUcsQ0FBQztDQUNKO0NBQ0EsRUFBRSxRQUFRLEdBQUcsU0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFO0NBQ3hDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0NBQzNCLE1BQU0sSUFBSSxFQUFFLE9BQU87Q0FDbkIsTUFBTSxJQUFJLEVBQUUsS0FBSztDQUNqQixNQUFNLFFBQVEsRUFBRSxLQUFLO0NBQ3JCLE1BQU0sTUFBTSxFQUFFLEtBQUs7Q0FDbkIsTUFBTSxTQUFTLEVBQUUsRUFBRTtDQUNuQixNQUFNLFNBQVMsRUFBRSxLQUFLO0NBQ3RCLE1BQU0sS0FBSyxFQUFFLE9BQU87Q0FDcEIsTUFBTSxLQUFLLEVBQUUsU0FBUztDQUN0QixLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUcsQ0FBQztDQUNKLEVBQUUsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFO0NBQ2pFO0NBQ0E7Q0FDQSxJQUFJLElBQUksRUFBRSxTQUFTLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFO0NBQ2pELE1BQU0sSUFBSSxLQUFLLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDaEQsTUFBTSxJQUFJLFFBQVEsR0FBR3NCLHNCQUFvQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Q0FDeEYsTUFBTSxRQUFRLENBQUMsRUFBRSxHQUFHLE9BQU8sV0FBVyxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO0NBQzFFLE1BQU0sUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLFVBQVUsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDO0NBQ3BFLE1BQU0sUUFBUSxDQUFDLE1BQU0sR0FBR1QsWUFBTyxHQUFHRyxTQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztDQUM3RCxNQUFNLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0NBQzFCLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxFQUFFUyxRQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3ZELE1BQU0sT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0NBQzlCLEtBQUs7Q0FDTDtDQUNBO0NBQ0EsSUFBSSxPQUFPLEVBQUUsVUFBVSxVQUFVLEVBQUU7Q0FDbkMsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQzlDLEtBQUs7Q0FDTCxHQUFHLENBQUMsQ0FBQztDQUNMLEVBQUUsb0JBQW9CLEdBQUcsWUFBWTtDQUNyQyxJQUFJLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7Q0FDakMsSUFBSSxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzlDLEdBQUcsQ0FBQztDQUNKLEVBQUVGLG9CQUEwQixDQUFDLENBQUMsR0FBR0Qsc0JBQW9CLEdBQUcsVUFBVSxDQUFDLEVBQUU7Q0FDckUsSUFBSSxPQUFPLENBQUMsS0FBSyxrQkFBa0IsSUFBSSxDQUFDLEtBQUssY0FBYztDQUMzRCxRQUFRLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0NBQ25DLFFBQVEsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkMsR0FBRyxDQUFDO0FBQ0o7Q0FDQSxFQUFFLEtBQWdCLE9BQU9GLHdCQUFhLElBQUksVUFBVSxFQUFFO0NBQ3RELElBQUksVUFBVSxHQUFHQSx3QkFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDOUM7Q0FDQTtDQUNBLElBQUksUUFBUSxDQUFDQSx3QkFBYSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRTtDQUNyRixNQUFNLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztDQUN0QixNQUFNLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7Q0FDL0QsUUFBUSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDL0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUN2QztDQUNBLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCO0NBQ0E7Q0FDQSxJQUFJLElBQUksT0FBTyxNQUFNLElBQUksVUFBVSxFQUFFWixPQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO0NBQ3pGO0NBQ0EsTUFBTSxLQUFLLEVBQUUsU0FBUyxLQUFLLENBQUMsS0FBSyxlQUFlO0NBQ2hELFFBQVEsT0FBTyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQ3hDLFFBQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQ25GLE9BQU87Q0FDUCxLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUc7Q0FDSCxDQUFDO0FBQ0Q7QUFDQXdDLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7Q0FDaEQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCO0NBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0g7Q0FDQSxjQUFjLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLEtBQVcsQ0FBQyxDQUFDO0NBQ3pELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQjtDQUNBLGNBQWMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckM7Q0FDQTtBQUNBQSxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0NBQ25EO0NBQ0E7Q0FDQSxFQUFFLE1BQU0sRUFBRSxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUU7Q0FDN0IsSUFBSSxJQUFJLFVBQVUsR0FBR2Msc0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDaEQsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDekMsSUFBSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7Q0FDOUIsR0FBRztDQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQWQsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBYSxNQUFNLEVBQUUsRUFBRTtDQUM5RDtDQUNBO0NBQ0EsRUFBRSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFO0NBQy9CLElBQUksT0FBTyxjQUFjLEVBQTJELElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3RixHQUFHO0NBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBQSxRQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUU7Q0FDaEU7Q0FDQTtDQUNBLEVBQUUsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDLFFBQVEsRUFBRTtDQUM5QixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztDQUNqQixJQUFJLElBQUksVUFBVSxHQUFHYyxzQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QyxJQUFJLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7Q0FDckMsSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0NBQ25DLElBQUksSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVk7Q0FDckMsTUFBTSxJQUFJLGVBQWUsR0FBR3RCLFdBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDakQsTUFBTSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDdEIsTUFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Q0FDdEIsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDeEIsTUFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsT0FBTyxFQUFFO0NBQzNDLFFBQVEsSUFBSSxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUM7Q0FDOUIsUUFBUSxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7Q0FDbEMsUUFBUSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQy9CLFFBQVEsU0FBUyxFQUFFLENBQUM7Q0FDcEIsUUFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7Q0FDL0QsVUFBVSxJQUFJLGFBQWEsRUFBRSxPQUFPO0NBQ3BDLFVBQVUsYUFBYSxHQUFHLElBQUksQ0FBQztDQUMvQixVQUFVLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDaEMsVUFBVSxFQUFFLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ25CLE9BQU8sQ0FBQyxDQUFDO0NBQ1QsTUFBTSxFQUFFLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDckMsS0FBSyxDQUFDLENBQUM7Q0FDUCxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzNDLElBQUksT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDO0NBQzlCLEdBQUc7Q0FDSDtDQUNBO0NBQ0EsRUFBRSxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFO0NBQ2hDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLElBQUksSUFBSSxVQUFVLEdBQUdzQixzQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QyxJQUFJLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7Q0FDbkMsSUFBSSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWTtDQUNyQyxNQUFNLElBQUksZUFBZSxHQUFHdEIsV0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNqRCxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxPQUFPLEVBQUU7Q0FDM0MsUUFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztDQUMxRSxPQUFPLENBQUMsQ0FBQztDQUNULEtBQUssQ0FBQyxDQUFDO0NBQ1AsSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMzQyxJQUFJLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQztDQUM5QixHQUFHO0NBQ0gsQ0FBQyxDQUFDOztDQ3JYRjtDQUNBO0FBQ0FRLFFBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO0NBQ3JDLEVBQUUsVUFBVSxFQUFFLFNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRTtDQUM1QyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztDQUNqQixJQUFJLElBQUksVUFBVSxHQUFHZSxvQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDckQsSUFBSSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO0NBQ3JDLElBQUksSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztDQUNuQyxJQUFJLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZO0NBQ3JDLE1BQU0sSUFBSSxjQUFjLEdBQUd2QixXQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2hELE1BQU0sSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ3RCLE1BQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0NBQ3RCLE1BQU0sSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0NBQ3hCLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLE9BQU8sRUFBRTtDQUMzQyxRQUFRLElBQUksS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDO0NBQzlCLFFBQVEsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0NBQ2xDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUMvQixRQUFRLFNBQVMsRUFBRSxDQUFDO0NBQ3BCLFFBQVEsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFO0NBQzlELFVBQVUsSUFBSSxhQUFhLEVBQUUsT0FBTztDQUNwQyxVQUFVLGFBQWEsR0FBRyxJQUFJLENBQUM7Q0FDL0IsVUFBVSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUNoRSxVQUFVLEVBQUUsU0FBUyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN6QyxTQUFTLEVBQUUsVUFBVSxLQUFLLEVBQUU7Q0FDNUIsVUFBVSxJQUFJLGFBQWEsRUFBRSxPQUFPO0NBQ3BDLFVBQVUsYUFBYSxHQUFHLElBQUksQ0FBQztDQUMvQixVQUFVLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ2hFLFVBQVUsRUFBRSxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3pDLFNBQVMsQ0FBQyxDQUFDO0NBQ1gsT0FBTyxDQUFDLENBQUM7Q0FDVCxNQUFNLEVBQUUsU0FBUyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNyQyxLQUFLLENBQUMsQ0FBQztDQUNQLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDM0MsSUFBSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7Q0FDOUIsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NsQ0YsSUFBSSxpQkFBaUIsR0FBRyx5QkFBeUIsQ0FBQztBQUNsRDtDQUNBO0NBQ0E7QUFDQVEsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FDckMsRUFBRSxHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsUUFBUSxFQUFFO0NBQzlCLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLElBQUksSUFBSSxVQUFVLEdBQUdlLG9CQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNyRCxJQUFJLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7Q0FDckMsSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0NBQ25DLElBQUksSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVk7Q0FDckMsTUFBTSxJQUFJLGNBQWMsR0FBR3ZCLFdBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDaEQsTUFBTSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDdEIsTUFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Q0FDdEIsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Q0FDeEIsTUFBTSxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7Q0FDbEMsTUFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsT0FBTyxFQUFFO0NBQzNDLFFBQVEsSUFBSSxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUM7Q0FDOUIsUUFBUSxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7Q0FDcEMsUUFBUSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQy9CLFFBQVEsU0FBUyxFQUFFLENBQUM7Q0FDcEIsUUFBUSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7Q0FDOUQsVUFBVSxJQUFJLGVBQWUsSUFBSSxlQUFlLEVBQUUsT0FBTztDQUN6RCxVQUFVLGVBQWUsR0FBRyxJQUFJLENBQUM7Q0FDakMsVUFBVSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDekIsU0FBUyxFQUFFLFVBQVUsS0FBSyxFQUFFO0NBQzVCLFVBQVUsSUFBSSxlQUFlLElBQUksZUFBZSxFQUFFLE9BQU87Q0FDekQsVUFBVSxlQUFlLEdBQUcsSUFBSSxDQUFDO0NBQ2pDLFVBQVUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUNoQyxVQUFVLEVBQUUsU0FBUyxJQUFJLE1BQU0sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Q0FDL0YsU0FBUyxDQUFDLENBQUM7Q0FDWCxPQUFPLENBQUMsQ0FBQztDQUNULE1BQU0sRUFBRSxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQztDQUMzRixLQUFLLENBQUMsQ0FBQztDQUNQLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDM0MsSUFBSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7Q0FDOUIsR0FBRztDQUNILENBQUMsQ0FBQzs7Q0NuQ0Y7Q0FDQSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUNvQix3QkFBYSxJQUFJLEtBQUssQ0FBQyxZQUFZO0NBQ3ZELEVBQUVBLHdCQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLGVBQWUsRUFBRSxFQUFFLFlBQVksZUFBZSxDQUFDLENBQUM7Q0FDOUcsQ0FBQyxDQUFDLENBQUM7QUFDSDtDQUNBO0NBQ0E7QUFDQVosUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFO0NBQ3ZFLEVBQUUsU0FBUyxFQUFFLFVBQVUsU0FBUyxFQUFFO0NBQ2xDLElBQUksSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQzVELElBQUksSUFBSSxVQUFVLEdBQUcsT0FBTyxTQUFTLElBQUksVUFBVSxDQUFDO0NBQ3BELElBQUksT0FBTyxJQUFJLENBQUMsSUFBSTtDQUNwQixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsRUFBRTtDQUNoQyxRQUFRLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDOUUsT0FBTyxHQUFHLFNBQVM7Q0FDbkIsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEVBQUU7Q0FDaEMsUUFBUSxPQUFPLGNBQWMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzdFLE9BQU8sR0FBRyxTQUFTO0NBQ25CLEtBQUssQ0FBQztDQUNOLEdBQUc7Q0FDSCxDQUFDLENBQUMsQ0FBQztBQUNIO0NBQ0E7Q0FDQSxLQUFnQixPQUFPWSx3QkFBYSxJQUFJLFVBQVUsSUFBSSxDQUFDQSx3QkFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtDQUMzRixFQUFFLFFBQVEsQ0FBQ0Esd0JBQWEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztDQUMzRjs7Q0NoQ0E7Q0FDQSxJQUFJTSxjQUFZLEdBQUcsVUFBVSxpQkFBaUIsRUFBRTtDQUNoRCxFQUFFLE9BQU8sVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQy9CLElBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDbEQsSUFBSSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbEMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQ3hCLElBQUksSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO0NBQ3RCLElBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsT0FBTyxpQkFBaUIsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO0NBQ3BGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbkMsSUFBSSxPQUFPLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSyxHQUFHLE1BQU0sSUFBSSxRQUFRLEdBQUcsQ0FBQyxLQUFLLElBQUk7Q0FDcEUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHLE1BQU07Q0FDMUUsVUFBVSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUs7Q0FDeEQsVUFBVSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxJQUFJLEVBQUUsS0FBSyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO0NBQ3JILEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUNGO0NBQ0EsbUJBQWMsR0FBRztDQUNqQjtDQUNBO0NBQ0EsRUFBRSxNQUFNLEVBQUVBLGNBQVksQ0FBQyxLQUFLLENBQUM7Q0FDN0I7Q0FDQTtDQUNBLEVBQUUsTUFBTSxFQUFFQSxjQUFZLENBQUMsSUFBSSxDQUFDO0NBQzVCLENBQUM7O0NDbkJELElBQUl2QixVQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzNDLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0FBQ25DO0NBQ0EsSUFBSSxVQUFVLEdBQUcsWUFBWSxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUM5QztDQUNBO0NBQ0E7Q0FDQSxJQUFJLGlCQUFpQixFQUFFLGlDQUFpQyxFQUFFLGFBQWEsQ0FBQztBQUN4RTtDQUNBLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtDQUNiLEVBQUUsYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUM1QjtDQUNBLEVBQUUsSUFBSSxFQUFFLE1BQU0sSUFBSSxhQUFhLENBQUMsRUFBRSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7Q0FDaEUsT0FBTztDQUNQLElBQUksaUNBQWlDLEdBQUdHLG9CQUFjLENBQUNBLG9CQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztDQUN0RixJQUFJLElBQUksaUNBQWlDLEtBQUssTUFBTSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsR0FBRyxpQ0FBaUMsQ0FBQztDQUN0SCxHQUFHO0NBQ0gsQ0FBQztBQUNEO0NBQ0EsSUFBSSxpQkFBaUIsSUFBSSxTQUFTLEVBQUUsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzNEO0NBQ0E7Q0FDQSxLQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRUgsVUFBUSxDQUFDLEVBQUU7Q0FDbkQsRUFBRSwyQkFBMkIsQ0FBQyxpQkFBaUIsRUFBRUEsVUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3ZFLENBQUM7QUFDRDtDQUNBLGlCQUFjLEdBQUc7Q0FDakIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUI7Q0FDdEMsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0I7Q0FDaEQsQ0FBQzs7Q0NuQ0QsSUFBSXdCLG1CQUFpQixHQUFHMUMsYUFBc0MsQ0FBQyxpQkFBaUIsQ0FBQztBQUM5QjtBQUMrQjtBQUNuQjtBQUNiO0FBQ2xEO0NBQ0EsSUFBSTJDLFlBQVUsR0FBRyxZQUFZLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzlDO0NBQ0EsNkJBQWMsR0FBRyxVQUFVLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7Q0FDNUQsRUFBRSxJQUFJLGFBQWEsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO0NBQ3pDLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxHQUFHckIsWUFBTSxDQUFDb0IsbUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN6RyxFQUFFLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsS0FBVyxDQUFDLENBQUM7Q0FDbEUsRUFBRTVCLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRzZCLFlBQVUsQ0FBQztDQUN4QyxFQUFFLE9BQU8sbUJBQW1CLENBQUM7Q0FDN0IsQ0FBQzs7Q0NGRCxJQUFJRCxtQkFBaUIsR0FBR0UsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0NBQ3hELElBQUlDLHdCQUFzQixHQUFHRCxhQUFhLENBQUMsc0JBQXNCLENBQUM7Q0FDbEUsSUFBSTFCLFVBQVEsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDM0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO0NBQ2xCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQztDQUN0QixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDeEI7Q0FDQSxJQUFJeUIsWUFBVSxHQUFHLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDOUM7Q0FDQSxrQkFBYyxHQUFHLFVBQVUsUUFBUSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7Q0FDL0YsRUFBRSx5QkFBeUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0Q7Q0FDQSxFQUFFLElBQUksa0JBQWtCLEdBQUcsVUFBVSxJQUFJLEVBQUU7Q0FDM0MsSUFBSSxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksZUFBZSxFQUFFLE9BQU8sZUFBZSxDQUFDO0NBQ3BFLElBQUksSUFBSSxDQUFDRSx3QkFBc0IsSUFBSSxJQUFJLElBQUksaUJBQWlCLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM3RixJQUFJLFFBQVEsSUFBSTtDQUNoQixNQUFNLEtBQUssSUFBSSxFQUFFLE9BQU8sU0FBUyxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUN4RixNQUFNLEtBQUssTUFBTSxFQUFFLE9BQU8sU0FBUyxNQUFNLEdBQUcsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUM1RixNQUFNLEtBQUssT0FBTyxFQUFFLE9BQU8sU0FBUyxPQUFPLEdBQUcsRUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUM5RixLQUFLLENBQUMsT0FBTyxZQUFZLEVBQUUsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNuRSxHQUFHLENBQUM7QUFDSjtDQUNBLEVBQUUsSUFBSSxhQUFhLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQztDQUN6QyxFQUFFLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0NBQ3BDLEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO0NBQzdDLEVBQUUsSUFBSSxjQUFjLEdBQUcsaUJBQWlCLENBQUMzQixVQUFRLENBQUM7Q0FDbEQsT0FBTyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7Q0FDdEMsT0FBTyxPQUFPLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDN0MsRUFBRSxJQUFJLGVBQWUsR0FBRyxDQUFDMkIsd0JBQXNCLElBQUksY0FBYyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pHLEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLElBQUksT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sSUFBSSxjQUFjLEdBQUcsY0FBYyxDQUFDO0NBQ3pHLEVBQUUsSUFBSSx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO0FBQzdDO0NBQ0E7Q0FDQSxFQUFFLElBQUksaUJBQWlCLEVBQUU7Q0FDekIsSUFBSSx3QkFBd0IsR0FBR3hCLG9CQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3RGLElBQUksSUFBSXFCLG1CQUFpQixLQUFLLE1BQU0sQ0FBQyxTQUFTLElBQUksd0JBQXdCLENBQUMsSUFBSSxFQUFFO0NBQ2pGLE1BQU0sS0FBZ0JyQixvQkFBYyxDQUFDLHdCQUF3QixDQUFDLEtBQUtxQixtQkFBaUIsRUFBRTtDQUN0RixRQUFRLElBQUl0QixvQkFBYyxFQUFFO0NBQzVCLFVBQVVBLG9CQUFjLENBQUMsd0JBQXdCLEVBQUVzQixtQkFBaUIsQ0FBQyxDQUFDO0NBQ3RFLFNBQVMsTUFBTSxJQUFJLE9BQU8sd0JBQXdCLENBQUN4QixVQUFRLENBQUMsSUFBSSxVQUFVLEVBQUU7Q0FDNUUsVUFBVSwyQkFBMkIsQ0FBQyx3QkFBd0IsRUFBRUEsVUFBUSxFQUFFeUIsWUFBVSxDQUFDLENBQUM7Q0FDdEYsU0FBUztDQUNULE9BQU87Q0FDUDtDQUNBLE1BQU0sY0FBYyxDQUFDLHdCQUF3QixFQUFFLGFBQWEsRUFBRSxJQUFVLENBQUMsQ0FBQztDQUUxRSxLQUFLO0NBQ0wsR0FBRztBQUNIO0NBQ0E7Q0FDQSxFQUFFLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Q0FDN0UsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUM7Q0FDakMsSUFBSSxlQUFlLEdBQUcsU0FBUyxNQUFNLEdBQUcsRUFBRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQzlFLEdBQUc7QUFDSDtDQUNBO0NBQ0EsRUFBRSxLQUE0QixpQkFBaUIsQ0FBQ3pCLFVBQVEsQ0FBQyxLQUFLLGVBQWUsRUFBRTtDQUMvRSxJQUFJLDJCQUEyQixDQUFDLGlCQUFpQixFQUFFQSxVQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7Q0FDOUUsR0FBRztDQUNILEVBQUVKLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUM7QUFDcEM7Q0FDQTtDQUNBLEVBQUUsSUFBSSxPQUFPLEVBQUU7Q0FDZixJQUFJLE9BQU8sR0FBRztDQUNkLE1BQU0sTUFBTSxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztDQUN4QyxNQUFNLElBQUksRUFBRSxNQUFNLEdBQUcsZUFBZSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztDQUMvRCxNQUFNLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7Q0FDMUMsS0FBSyxDQUFDO0NBQ04sSUFBSSxJQUFJLE1BQU0sRUFBRSxLQUFLLEdBQUcsSUFBSSxPQUFPLEVBQUU7Q0FDckMsTUFBTSxJQUFJK0Isd0JBQXNCLElBQUkscUJBQXFCLElBQUksRUFBRSxHQUFHLElBQUksaUJBQWlCLENBQUMsRUFBRTtDQUMxRixRQUFRLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDdkQsT0FBTztDQUNQLEtBQUssTUFBTXRCLE9BQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUVzQix3QkFBc0IsSUFBSSxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQzlHLEdBQUc7QUFDSDtDQUNBLEVBQUUsT0FBTyxPQUFPLENBQUM7Q0FDakIsQ0FBQzs7Q0N4RkQsSUFBSSxNQUFNLEdBQUc3QyxlQUF3QyxDQUFDLE1BQU0sQ0FBQztBQUNJO0FBQ0o7QUFDN0Q7Q0FDQSxJQUFJLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztDQUN4QyxJQUFJOEMsa0JBQWdCLEdBQUdoRCxhQUFtQixDQUFDLEdBQUcsQ0FBQztDQUMvQyxJQUFJaUQsa0JBQWdCLEdBQUdqRCxhQUFtQixDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN0RTtDQUNBO0NBQ0E7Q0FDQSxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLFFBQVEsRUFBRTtDQUNyRCxFQUFFZ0Qsa0JBQWdCLENBQUMsSUFBSSxFQUFFO0NBQ3pCLElBQUksSUFBSSxFQUFFLGVBQWU7Q0FDekIsSUFBSSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztDQUM1QixJQUFJLEtBQUssRUFBRSxDQUFDO0NBQ1osR0FBRyxDQUFDLENBQUM7Q0FDTDtDQUNBO0NBQ0EsQ0FBQyxFQUFFLFNBQVMsSUFBSSxHQUFHO0NBQ25CLEVBQUUsSUFBSSxLQUFLLEdBQUdDLGtCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUM1QixFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Q0FDMUIsRUFBRSxJQUFJLEtBQUssQ0FBQztDQUNaLEVBQUUsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDdEUsRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNoQyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUM5QixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUN2QyxDQUFDLENBQUM7O0NDNUJGO0NBQ0E7Q0FDQSxnQkFBYyxHQUFHO0NBQ2pCLEVBQUUsV0FBVyxFQUFFLENBQUM7Q0FDaEIsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0NBQ3hCLEVBQUUsWUFBWSxFQUFFLENBQUM7Q0FDakIsRUFBRSxjQUFjLEVBQUUsQ0FBQztDQUNuQixFQUFFLFdBQVcsRUFBRSxDQUFDO0NBQ2hCLEVBQUUsYUFBYSxFQUFFLENBQUM7Q0FDbEIsRUFBRSxZQUFZLEVBQUUsQ0FBQztDQUNqQixFQUFFLG9CQUFvQixFQUFFLENBQUM7Q0FDekIsRUFBRSxRQUFRLEVBQUUsQ0FBQztDQUNiLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztDQUN0QixFQUFFLGNBQWMsRUFBRSxDQUFDO0NBQ25CLEVBQUUsZUFBZSxFQUFFLENBQUM7Q0FDcEIsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO0NBQ3RCLEVBQUUsU0FBUyxFQUFFLENBQUM7Q0FDZCxFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsWUFBWSxFQUFFLENBQUM7Q0FDakIsRUFBRSxRQUFRLEVBQUUsQ0FBQztDQUNiLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztDQUNyQixFQUFFLE1BQU0sRUFBRSxDQUFDO0NBQ1gsRUFBRSxXQUFXLEVBQUUsQ0FBQztDQUNoQixFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsYUFBYSxFQUFFLENBQUM7Q0FDbEIsRUFBRSxjQUFjLEVBQUUsQ0FBQztDQUNuQixFQUFFLFlBQVksRUFBRSxDQUFDO0NBQ2pCLEVBQUUsYUFBYSxFQUFFLENBQUM7Q0FDbEIsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0NBQ3JCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztDQUNyQixFQUFFLGNBQWMsRUFBRSxDQUFDO0NBQ25CLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztDQUNyQixFQUFFLGFBQWEsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsU0FBUyxFQUFFLENBQUM7Q0FDZCxDQUFDOztDQzlCRCxJQUFJLFdBQVcsR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FDakQsSUFBSUMsZ0JBQWMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ3JDO0NBQ0E7Q0FDQTtDQUNBLElBQUlBLGdCQUFjLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxFQUFFO0NBQzlDLEVBQUV6RCxvQkFBb0IsQ0FBQyxDQUFDLENBQUN5RCxnQkFBYyxFQUFFLFdBQVcsRUFBRTtDQUN0RCxJQUFJLFlBQVksRUFBRSxJQUFJO0NBQ3RCLElBQUksS0FBSyxFQUFFMUIsWUFBTSxDQUFDLElBQUksQ0FBQztDQUN2QixHQUFHLENBQUMsQ0FBQztDQUNMLENBQUM7QUFDRDtDQUNBO0NBQ0Esb0JBQWMsR0FBRyxVQUFVLEdBQUcsRUFBRTtDQUNoQyxFQUFFMEIsZ0JBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDMUMsQ0FBQzs7Q0NaRCxJQUFJLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztDQUN0QyxJQUFJRixrQkFBZ0IsR0FBR2hELGFBQW1CLENBQUMsR0FBRyxDQUFDO0NBQy9DLElBQUlpRCxrQkFBZ0IsR0FBR2pELGFBQW1CLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxxQkFBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsUUFBUSxFQUFFLElBQUksRUFBRTtDQUMxRSxFQUFFZ0Qsa0JBQWdCLENBQUMsSUFBSSxFQUFFO0NBQ3pCLElBQUksSUFBSSxFQUFFLGNBQWM7Q0FDeEIsSUFBSSxNQUFNLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQztDQUNyQyxJQUFJLEtBQUssRUFBRSxDQUFDO0NBQ1osSUFBSSxJQUFJLEVBQUUsSUFBSTtDQUNkLEdBQUcsQ0FBQyxDQUFDO0NBQ0w7Q0FDQTtDQUNBLENBQUMsRUFBRSxZQUFZO0NBQ2YsRUFBRSxJQUFJLEtBQUssR0FBR0Msa0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDckMsRUFBRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0NBQzVCLEVBQUUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztDQUN4QixFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUM1QixFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Q0FDekMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztDQUM3QixJQUFJLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUM1QyxHQUFHO0NBQ0gsRUFBRSxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQzNELEVBQUUsSUFBSSxJQUFJLElBQUksUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztDQUNyRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ3hELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNiO0NBQ0E7Q0FDQTtDQUNBO0FBQ0FqQyxVQUFTLENBQUMsU0FBUyxHQUFHQSxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQ3RDO0NBQ0E7Q0FDQSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN6QixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMzQixnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7O0NDOUMzQixJQUFJSSxVQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQzNDLElBQUlGLGVBQWEsR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FDbkQsSUFBSSxXQUFXLEdBQUdpQyxpQkFBb0IsQ0FBQyxNQUFNLENBQUM7QUFDOUM7Q0FDQSxLQUFLLElBQUksZUFBZSxJQUFJQyxZQUFZLEVBQUU7Q0FDMUMsRUFBRSxJQUFJLFVBQVUsR0FBR25FLFFBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUMzQyxFQUFFLElBQUksbUJBQW1CLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUM7Q0FDL0QsRUFBRSxJQUFJLG1CQUFtQixFQUFFO0NBQzNCO0NBQ0EsSUFBSSxJQUFJLG1CQUFtQixDQUFDbUMsVUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFLElBQUk7Q0FDM0QsTUFBTSwyQkFBMkIsQ0FBQyxtQkFBbUIsRUFBRUEsVUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0NBQzlFLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNwQixNQUFNLG1CQUFtQixDQUFDQSxVQUFRLENBQUMsR0FBRyxXQUFXLENBQUM7Q0FDbEQsS0FBSztDQUNMLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDRixlQUFhLENBQUMsRUFBRTtDQUM3QyxNQUFNLDJCQUEyQixDQUFDLG1CQUFtQixFQUFFQSxlQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7Q0FDdkYsS0FBSztDQUNMLElBQUksSUFBSWtDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLElBQUksV0FBVyxJQUFJRCxpQkFBb0IsRUFBRTtDQUNyRjtDQUNBLE1BQU0sSUFBSSxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsS0FBS0EsaUJBQW9CLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSTtDQUN0RixRQUFRLDJCQUEyQixDQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBRUEsaUJBQW9CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztDQUN6RyxPQUFPLENBQUMsT0FBTyxLQUFLLEVBQUU7Q0FDdEIsUUFBUSxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsR0FBR0EsaUJBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDN0UsT0FBTztDQUNQLEtBQUs7Q0FDTCxHQUFHO0NBQ0g7O0NDdEJBLGFBQWMsR0FBRyxJQUFJLENBQUMsT0FBTzs7Q0NMN0I7Q0FDQTtBQUNBMUIsUUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7Q0FDckMsRUFBRSxLQUFLLEVBQUUsVUFBVSxVQUFVLEVBQUU7Q0FDL0IsSUFBSSxJQUFJLGlCQUFpQixHQUFHZSxvQkFBMEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDL0QsSUFBSSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEYsSUFBSSxPQUFPLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztDQUNyQyxHQUFHO0NBQ0gsQ0FBQyxDQUFDOztDQ2RGO0NBQ0EsSUFBSSxVQUFVLEdBQUcsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNOztDQ0MxRjtDQUNBLElBQUksUUFBUSxHQUFHLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQ2pGO0NBQ0E7Q0FDQSxJQUFJLElBQUksR0FBRyxVQUFVLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTs7Q0NKOUQ7Q0FDQSxJQUFJMUIsUUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNOztDQ0R4QjtDQUNBLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkM7Q0FDQTtDQUNBLElBQUl1QyxnQkFBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7QUFDaEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQSxJQUFJLGNBQWMsR0FBR3ZDLFFBQU0sR0FBR0EsUUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDN0Q7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtDQUMxQixFQUFFLElBQUksS0FBSyxHQUFHdUMsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQztDQUN4RCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbEM7Q0FDQSxFQUFFLElBQUk7Q0FDTixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDdEMsSUFBSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7Q0FDeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDaEI7Q0FDQSxFQUFFLElBQUksTUFBTSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoRCxFQUFFLElBQUksUUFBUSxFQUFFO0NBQ2hCLElBQUksSUFBSSxLQUFLLEVBQUU7Q0FDZixNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDbEMsS0FBSyxNQUFNO0NBQ1gsTUFBTSxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztDQUNuQyxLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDM0NBO0NBQ0EsSUFBSUMsYUFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSUMsc0JBQW9CLEdBQUdELGFBQVcsQ0FBQyxRQUFRLENBQUM7QUFDaEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVNFLGdCQUFjLENBQUMsS0FBSyxFQUFFO0NBQy9CLEVBQUUsT0FBT0Qsc0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFDOztDQ2ZBO0NBQ0EsSUFBSSxPQUFPLEdBQUcsZUFBZTtDQUM3QixJQUFJLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztBQUN4QztDQUNBO0NBQ0EsSUFBSUUsZ0JBQWMsR0FBRzNDLFFBQU0sR0FBR0EsUUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDN0Q7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRTtDQUMzQixFQUFFLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtDQUNyQixJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsR0FBRyxZQUFZLEdBQUcsT0FBTyxDQUFDO0NBQ3hELEdBQUc7Q0FDSCxFQUFFLE9BQU8sQ0FBQzJDLGdCQUFjLElBQUlBLGdCQUFjLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztDQUMzRCxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7Q0FDdEIsTUFBTUQsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM1Qjs7Q0N6QkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTRSxVQUFRLENBQUMsS0FBSyxFQUFFO0NBQ3pCLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxLQUFLLENBQUM7Q0FDMUIsRUFBRSxPQUFPLEtBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLENBQUM7Q0FDbkU7O0NDekJBO0NBQ0EsSUFBSSxRQUFRLEdBQUcsd0JBQXdCO0NBQ3ZDLElBQUksT0FBTyxHQUFHLG1CQUFtQjtDQUNqQyxJQUFJLE1BQU0sR0FBRyw0QkFBNEI7Q0FDekMsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7QUFDaEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0NBQzNCLEVBQUUsSUFBSSxDQUFDQSxVQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Q0FDeEIsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHO0NBQ0g7Q0FDQTtDQUNBLEVBQUUsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzlCLEVBQUUsT0FBTyxHQUFHLElBQUksT0FBTyxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDO0NBQy9FOztDQ2hDQTtDQUNBLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQzs7Q0NEM0M7Q0FDQSxJQUFJLFVBQVUsSUFBSSxXQUFXO0NBQzdCLEVBQUUsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUMzRixFQUFFLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7Q0FDN0MsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNMO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Q0FDeEIsRUFBRSxPQUFPLENBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDO0NBQzlDOztDQ2pCQTtDQUNBLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDbkM7Q0FDQTtDQUNBLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDdEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRTtDQUN4QixFQUFFLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtDQUNwQixJQUFJLElBQUk7Q0FDUixNQUFNLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtDQUNsQixJQUFJLElBQUk7Q0FDUixNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUUsRUFBRTtDQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtDQUNsQixHQUFHO0NBQ0gsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUNaOztDQ2xCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksWUFBWSxHQUFHLHFCQUFxQixDQUFDO0FBQ3pDO0NBQ0E7Q0FDQSxJQUFJLFlBQVksR0FBRyw2QkFBNkIsQ0FBQztBQUNqRDtDQUNBO0NBQ0EsSUFBSUMsV0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTO0NBQ2xDLElBQUlMLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJTSxjQUFZLEdBQUdELFdBQVMsQ0FBQyxRQUFRLENBQUM7QUFDdEM7Q0FDQTtDQUNBLElBQUlOLGdCQUFjLEdBQUdDLGFBQVcsQ0FBQyxjQUFjLENBQUM7QUFDaEQ7Q0FDQTtDQUNBLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHO0NBQzNCLEVBQUVNLGNBQVksQ0FBQyxJQUFJLENBQUNQLGdCQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztDQUNqRSxHQUFHLE9BQU8sQ0FBQyx3REFBd0QsRUFBRSxPQUFPLENBQUMsR0FBRyxHQUFHO0NBQ25GLENBQUMsQ0FBQztBQUNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRTtDQUM3QixFQUFFLElBQUksQ0FBQ0ssVUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtDQUMzQyxJQUFJLE9BQU8sS0FBSyxDQUFDO0NBQ2pCLEdBQUc7Q0FDSCxFQUFFLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLEdBQUcsWUFBWSxDQUFDO0NBQzlELEVBQUUsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDOztDQzVDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtDQUMvQixFQUFFLE9BQU8sTUFBTSxJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2xEOztDQ1BBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0NBQ2hDLEVBQUUsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNwQyxFQUFFLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUM7Q0FDakQ7O0NDWkEsSUFBSUcsZ0JBQWMsSUFBSSxXQUFXO0NBQ2pDLEVBQUUsSUFBSTtDQUNOLElBQUksSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0NBQ25ELElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDckIsSUFBSSxPQUFPLElBQUksQ0FBQztDQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtDQUNoQixDQUFDLEVBQUUsQ0FBQzs7Q0NOSjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUM3QyxFQUFFLElBQUksR0FBRyxJQUFJLFdBQVcsSUFBSUEsZ0JBQWMsRUFBRTtDQUM1QyxJQUFJQSxnQkFBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Q0FDaEMsTUFBTSxjQUFjLEVBQUUsSUFBSTtDQUMxQixNQUFNLFlBQVksRUFBRSxJQUFJO0NBQ3hCLE1BQU0sT0FBTyxFQUFFLEtBQUs7Q0FDcEIsTUFBTSxVQUFVLEVBQUUsSUFBSTtDQUN0QixLQUFLLENBQUMsQ0FBQztDQUNQLEdBQUcsTUFBTTtDQUNULElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUN4QixHQUFHO0NBQ0g7O0NDdEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQzFCLEVBQUUsT0FBTyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO0NBQ2pFOztDQy9CQTtDQUNBLElBQUlQLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUN6QyxFQUFFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM3QixFQUFFLElBQUksRUFBRUQsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDaEUsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7Q0FDakQsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN4QyxHQUFHO0NBQ0g7O0NDdEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO0NBQ3ZELEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUM7Q0FDdEIsRUFBRSxNQUFNLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzFCO0NBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM1QjtDQUNBLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUU7Q0FDM0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0I7Q0FDQSxJQUFJLElBQUksUUFBUSxHQUFHLFVBQVU7Q0FDN0IsUUFBUSxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztDQUNqRSxRQUFRLFNBQVMsQ0FBQztBQUNsQjtDQUNBLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0NBQ2hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM3QixLQUFLO0NBQ0wsSUFBSSxJQUFJLEtBQUssRUFBRTtDQUNmLE1BQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDN0MsS0FBSyxNQUFNO0NBQ1gsTUFBTSxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUN6QyxLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDckNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0NBQ3pCLEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDZjs7Q0NsQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtDQUNwQyxFQUFFLFFBQVEsSUFBSSxDQUFDLE1BQU07Q0FDckIsSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDdEMsSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQy9DLElBQUksS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDeEQsSUFBSSxLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDakUsR0FBRztDQUNILEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNuQzs7Q0NoQkE7Q0FDQSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3pCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7Q0FDMUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3hFLEVBQUUsT0FBTyxXQUFXO0NBQ3BCLElBQUksSUFBSSxJQUFJLEdBQUcsU0FBUztDQUN4QixRQUFRLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDbEIsUUFBUSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztDQUNsRCxRQUFRLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUI7Q0FDQSxJQUFJLE9BQU8sRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQzdCLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7Q0FDekMsS0FBSztDQUNMLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2YsSUFBSSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ3JDLElBQUksT0FBTyxFQUFFLEtBQUssR0FBRyxLQUFLLEVBQUU7Q0FDNUIsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3JDLEtBQUs7Q0FDTCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEMsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDLEdBQUcsQ0FBQztDQUNKOztDQ2pDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRTtDQUN6QixFQUFFLE9BQU8sV0FBVztDQUNwQixJQUFJLE9BQU8sS0FBSyxDQUFDO0NBQ2pCLEdBQUcsQ0FBQztDQUNKOztDQ25CQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxlQUFlLEdBQUcsQ0FBQ1EsZ0JBQWMsR0FBRyxRQUFRLEdBQUcsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQzFFLEVBQUUsT0FBT0EsZ0JBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQzFDLElBQUksY0FBYyxFQUFFLElBQUk7Q0FDeEIsSUFBSSxZQUFZLEVBQUUsS0FBSztDQUN2QixJQUFJLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDO0NBQzdCLElBQUksVUFBVSxFQUFFLElBQUk7Q0FDcEIsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDOztDQ25CRDtDQUNBLElBQUksU0FBUyxHQUFHLEdBQUc7Q0FDbkIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCO0NBQ0E7Q0FDQSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3pCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFO0NBQ3hCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQztDQUNmLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNyQjtDQUNBLEVBQUUsT0FBTyxXQUFXO0NBQ3BCLElBQUksSUFBSSxLQUFLLEdBQUcsU0FBUyxFQUFFO0NBQzNCLFFBQVEsU0FBUyxHQUFHLFFBQVEsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUM7QUFDcEQ7Q0FDQSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7Q0FDdkIsSUFBSSxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7Q0FDdkIsTUFBTSxJQUFJLEVBQUUsS0FBSyxJQUFJLFNBQVMsRUFBRTtDQUNoQyxRQUFRLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVCLE9BQU87Q0FDUCxLQUFLLE1BQU07Q0FDWCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsS0FBSztDQUNMLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztDQUM1QyxHQUFHLENBQUM7Q0FDSjs7Q0MvQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7O0NDUDNDO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0NBQy9CLEVBQUUsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ2pFOztDQ2RBO0NBQ0EsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUN4QztDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Q0FDekIsRUFBRSxPQUFPLE9BQU8sS0FBSyxJQUFJLFFBQVE7Q0FDakMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLGdCQUFnQixDQUFDO0NBQzlEOztDQzdCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRTtDQUM1QixFQUFFLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3ZFOztDQzlCQTtDQUNBLElBQUlDLGtCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQ3hDO0NBQ0E7Q0FDQSxJQUFJLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztBQUNsQztDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0NBQ2hDLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxLQUFLLENBQUM7Q0FDMUIsRUFBRSxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksR0FBR0Esa0JBQWdCLEdBQUcsTUFBTSxDQUFDO0FBQ3REO0NBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNO0NBQ2pCLEtBQUssSUFBSSxJQUFJLFFBQVE7Q0FDckIsT0FBTyxJQUFJLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNqRCxTQUFTLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7Q0FDekQ7O0NDakJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7Q0FDOUMsRUFBRSxJQUFJLENBQUNKLFVBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUN6QixJQUFJLE9BQU8sS0FBSyxDQUFDO0NBQ2pCLEdBQUc7Q0FDSCxFQUFFLElBQUksSUFBSSxHQUFHLE9BQU8sS0FBSyxDQUFDO0NBQzFCLEVBQUUsSUFBSSxJQUFJLElBQUksUUFBUTtDQUN0QixXQUFXLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDL0QsV0FBVyxJQUFJLElBQUksUUFBUSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUM7Q0FDL0MsUUFBUTtDQUNSLElBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3BDLEdBQUc7Q0FDSCxFQUFFLE9BQU8sS0FBSyxDQUFDO0NBQ2Y7O0NDeEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxjQUFjLENBQUMsUUFBUSxFQUFFO0NBQ2xDLEVBQUUsT0FBTyxRQUFRLENBQUMsU0FBUyxNQUFNLEVBQUUsT0FBTyxFQUFFO0NBQzVDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2xCLFFBQVEsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNO0NBQy9CLFFBQVEsVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTO0NBQ2pFLFFBQVEsS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUNwRDtDQUNBLElBQUksVUFBVSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxVQUFVLElBQUksVUFBVTtDQUN4RSxTQUFTLE1BQU0sRUFBRSxFQUFFLFVBQVU7Q0FDN0IsUUFBUSxTQUFTLENBQUM7QUFDbEI7Q0FDQSxJQUFJLElBQUksS0FBSyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFO0NBQ2hFLE1BQU0sVUFBVSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQztDQUN2RCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7Q0FDakIsS0FBSztDQUNMLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM1QixJQUFJLE9BQU8sRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQzdCLE1BQU0sSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2xDLE1BQU0sSUFBSSxNQUFNLEVBQUU7Q0FDbEIsUUFBUSxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDcEQsT0FBTztDQUNQLEtBQUs7Q0FDTCxJQUFJLE9BQU8sTUFBTSxDQUFDO0NBQ2xCLEdBQUcsQ0FBQyxDQUFDO0NBQ0w7O0NDbENBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUU7Q0FDaEMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRTtDQUN0QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDcEMsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDakJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRTtDQUM3QixFQUFFLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7Q0FDbkQ7O0NDdkJBO0NBQ0EsSUFBSSxPQUFPLEdBQUcsb0JBQW9CLENBQUM7QUFDbkM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRTtDQUNoQyxFQUFFLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUM7Q0FDN0Q7O0NDWkE7Q0FDQSxJQUFJSixhQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQztDQUNBO0NBQ0EsSUFBSUQsZ0JBQWMsR0FBR0MsYUFBVyxDQUFDLGNBQWMsQ0FBQztBQUNoRDtDQUNBO0NBQ0EsSUFBSSxvQkFBb0IsR0FBR0EsYUFBVyxDQUFDLG9CQUFvQixDQUFDO0FBQzVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDLFdBQVcsRUFBRSxPQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLGVBQWUsR0FBRyxTQUFTLEtBQUssRUFBRTtDQUMxRyxFQUFFLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJRCxnQkFBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO0NBQ3BFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ2hELENBQUM7O0NDakNEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTzs7Q0N2QjNCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxTQUFTLEdBQUc7Q0FDckIsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNmOztDQ1pBO0NBQ0EsSUFBSSxXQUFXLEdBQUcsT0FBTyxPQUFPLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDO0FBQ3hGO0NBQ0E7Q0FDQSxJQUFJLFVBQVUsR0FBRyxXQUFXLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDO0FBQ2xHO0NBQ0E7Q0FDQSxJQUFJLGFBQWEsR0FBRyxVQUFVLElBQUksVUFBVSxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUM7QUFDckU7Q0FDQTtDQUNBLElBQUksTUFBTSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUNyRDtDQUNBO0NBQ0EsSUFBSSxjQUFjLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQzFEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksUUFBUSxHQUFHLGNBQWMsSUFBSSxTQUFTOztDQy9CMUM7Q0FDQSxJQUFJVSxTQUFPLEdBQUcsb0JBQW9CO0NBQ2xDLElBQUksUUFBUSxHQUFHLGdCQUFnQjtDQUMvQixJQUFJLE9BQU8sR0FBRyxrQkFBa0I7Q0FDaEMsSUFBSSxPQUFPLEdBQUcsZUFBZTtDQUM3QixJQUFJLFFBQVEsR0FBRyxnQkFBZ0I7Q0FDL0IsSUFBSUMsU0FBTyxHQUFHLG1CQUFtQjtDQUNqQyxJQUFJLE1BQU0sR0FBRyxjQUFjO0NBQzNCLElBQUksU0FBUyxHQUFHLGlCQUFpQjtDQUNqQyxJQUFJLFNBQVMsR0FBRyxpQkFBaUI7Q0FDakMsSUFBSSxTQUFTLEdBQUcsaUJBQWlCO0NBQ2pDLElBQUksTUFBTSxHQUFHLGNBQWM7Q0FDM0IsSUFBSSxTQUFTLEdBQUcsaUJBQWlCO0NBQ2pDLElBQUksVUFBVSxHQUFHLGtCQUFrQixDQUFDO0FBQ3BDO0NBQ0EsSUFBSSxjQUFjLEdBQUcsc0JBQXNCO0NBQzNDLElBQUksV0FBVyxHQUFHLG1CQUFtQjtDQUNyQyxJQUFJLFVBQVUsR0FBRyx1QkFBdUI7Q0FDeEMsSUFBSSxVQUFVLEdBQUcsdUJBQXVCO0NBQ3hDLElBQUksT0FBTyxHQUFHLG9CQUFvQjtDQUNsQyxJQUFJLFFBQVEsR0FBRyxxQkFBcUI7Q0FDcEMsSUFBSSxRQUFRLEdBQUcscUJBQXFCO0NBQ3BDLElBQUksUUFBUSxHQUFHLHFCQUFxQjtDQUNwQyxJQUFJLGVBQWUsR0FBRyw0QkFBNEI7Q0FDbEQsSUFBSSxTQUFTLEdBQUcsc0JBQXNCO0NBQ3RDLElBQUksU0FBUyxHQUFHLHNCQUFzQixDQUFDO0FBQ3ZDO0NBQ0E7Q0FDQSxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7Q0FDeEIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7Q0FDdkQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7Q0FDbEQsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7Q0FDbkQsY0FBYyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDM0QsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUNqQyxjQUFjLENBQUNELFNBQU8sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7Q0FDbEQsY0FBYyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7Q0FDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7Q0FDckQsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGNBQWMsQ0FBQ0MsU0FBTyxDQUFDO0NBQ2xELGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ2xELGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ3JELGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ2xELGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDbkM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0NBQ2pDLEVBQUUsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO0NBQzVCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2xFOztDQ3pEQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRTtDQUN6QixFQUFFLE9BQU8sU0FBUyxLQUFLLEVBQUU7Q0FDekIsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN2QixHQUFHLENBQUM7Q0FDSjs7Q0NUQTtDQUNBLElBQUlDLGFBQVcsR0FBRyxPQUFPLE9BQU8sSUFBSSxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUM7QUFDeEY7Q0FDQTtDQUNBLElBQUlDLFlBQVUsR0FBR0QsYUFBVyxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztBQUNsRztDQUNBO0NBQ0EsSUFBSUUsZUFBYSxHQUFHRCxZQUFVLElBQUlBLFlBQVUsQ0FBQyxPQUFPLEtBQUtELGFBQVcsQ0FBQztBQUNyRTtDQUNBO0NBQ0EsSUFBSSxXQUFXLEdBQUdFLGVBQWEsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDO0FBQ3REO0NBQ0E7Q0FDQSxJQUFJLFFBQVEsSUFBSSxXQUFXO0NBQzNCLEVBQUUsSUFBSTtDQUNOO0NBQ0EsSUFBSSxJQUFJLEtBQUssR0FBR0QsWUFBVSxJQUFJQSxZQUFVLENBQUMsT0FBTyxJQUFJQSxZQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNyRjtDQUNBLElBQUksSUFBSSxLQUFLLEVBQUU7Q0FDZixNQUFNLE9BQU8sS0FBSyxDQUFDO0NBQ25CLEtBQUs7QUFDTDtDQUNBO0NBQ0EsSUFBSSxPQUFPLFdBQVcsSUFBSSxXQUFXLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDN0UsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Q0FDaEIsQ0FBQyxFQUFFLENBQUM7O0NDdkJKO0NBQ0EsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQztBQUN6RDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLFlBQVksR0FBRyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxnQkFBZ0I7O0NDakJwRjtDQUNBLElBQUlaLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7Q0FDekMsRUFBRSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0NBQzVCLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7Q0FDMUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQztDQUNsRCxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO0NBQ2pFLE1BQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLE1BQU07Q0FDdEQsTUFBTSxNQUFNLEdBQUcsV0FBVyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Q0FDakUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM3QjtDQUNBLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7Q0FDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJRCxnQkFBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO0NBQ3JELFFBQVEsRUFBRSxXQUFXO0NBQ3JCO0NBQ0EsV0FBVyxHQUFHLElBQUksUUFBUTtDQUMxQjtDQUNBLFlBQVksTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0NBQzNEO0NBQ0EsWUFBWSxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsSUFBSSxHQUFHLElBQUksWUFBWSxJQUFJLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQztDQUN0RjtDQUNBLFdBQVcsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7Q0FDL0IsU0FBUyxDQUFDLEVBQUU7Q0FDWixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDdkIsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCOztDQzlDQTtDQUNBLElBQUlDLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Q0FDNUIsRUFBRSxJQUFJLElBQUksR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVc7Q0FDdkMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBS0EsYUFBVyxDQUFDO0FBQzNFO0NBQ0EsRUFBRSxPQUFPLEtBQUssS0FBSyxLQUFLLENBQUM7Q0FDekI7O0NDZkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxZQUFZLENBQUMsTUFBTSxFQUFFO0NBQzlCLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0NBQ3RCLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDcEMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZCLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0NiQTtDQUNBLElBQUlBLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Q0FDNUIsRUFBRSxJQUFJLENBQUNJLFVBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUN6QixJQUFJLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2hDLEdBQUc7Q0FDSCxFQUFFLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7Q0FDbkMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCO0NBQ0EsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtDQUMxQixJQUFJLElBQUksRUFBRSxHQUFHLElBQUksYUFBYSxLQUFLLE9BQU8sSUFBSSxDQUFDTCxnQkFBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQ25GLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN2QixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDMUJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Q0FDeEIsRUFBRSxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNoRjs7Q0N6QkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQyxTQUFTLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtDQUNqRixFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztDQUN6RCxDQUFDLENBQUM7O0NDbkNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0NBQ2xDLEVBQUUsT0FBTyxTQUFTLEdBQUcsRUFBRTtDQUN2QixJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLEdBQUcsQ0FBQztDQUNKOztDQ1ZBO0NBQ0EsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDOztDQ0N6RDtDQUNBLElBQUllLFdBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUNsQztDQUNBO0NBQ0EsSUFBSVQsV0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTO0NBQ2xDLElBQUlMLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJTSxjQUFZLEdBQUdELFdBQVMsQ0FBQyxRQUFRLENBQUM7QUFDdEM7Q0FDQTtDQUNBLElBQUlOLGdCQUFjLEdBQUdDLGFBQVcsQ0FBQyxjQUFjLENBQUM7QUFDaEQ7Q0FDQTtDQUNBLElBQUksZ0JBQWdCLEdBQUdNLGNBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRTtDQUM5QixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJUSxXQUFTLEVBQUU7Q0FDOUQsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHO0NBQ0gsRUFBRSxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDbEMsRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Q0FDdEIsSUFBSSxPQUFPLElBQUksQ0FBQztDQUNoQixHQUFHO0NBQ0gsRUFBRSxJQUFJLElBQUksR0FBR2YsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUM7Q0FDNUUsRUFBRSxPQUFPLE9BQU8sSUFBSSxJQUFJLFVBQVUsSUFBSSxJQUFJLFlBQVksSUFBSTtDQUMxRCxJQUFJTyxjQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDO0NBQ2hEOztDQ3ZEQTtDQUNBLElBQUksU0FBUyxHQUFHLHVCQUF1QjtDQUN2QyxJQUFJUyxVQUFRLEdBQUcsZ0JBQWdCLENBQUM7QUFDaEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Q0FDeEIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQzVCLElBQUksT0FBTyxLQUFLLENBQUM7Q0FDakIsR0FBRztDQUNILEVBQUUsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzlCLEVBQUUsT0FBTyxHQUFHLElBQUlBLFVBQVEsSUFBSSxHQUFHLElBQUksU0FBUztDQUM1QyxLQUFLLE9BQU8sS0FBSyxDQUFDLE9BQU8sSUFBSSxRQUFRLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2pHOztDQzdCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUU7Q0FDNUMsRUFBRSxJQUFJO0NBQ04sSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtDQUNkLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLEdBQUc7Q0FDSCxDQUFDLENBQUM7O0NDaENGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7Q0FDbkMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU07Q0FDL0MsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN6RCxHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0NoQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0NBQ25DLEVBQUUsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsR0FBRyxFQUFFO0NBQ3ZDLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDdkIsR0FBRyxDQUFDLENBQUM7Q0FDTDs7Q0NkQTtDQUNBLElBQUlmLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Q0FDakUsRUFBRSxJQUFJLFFBQVEsS0FBSyxTQUFTO0NBQzVCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRUEsYUFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQ0QsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Q0FDN0UsSUFBSSxPQUFPLFFBQVEsQ0FBQztDQUNwQixHQUFHO0NBQ0gsRUFBRSxPQUFPLFFBQVEsQ0FBQztDQUNsQjs7Q0MxQkE7Q0FDQSxJQUFJLGFBQWEsR0FBRztDQUNwQixFQUFFLElBQUksRUFBRSxJQUFJO0NBQ1osRUFBRSxHQUFHLEVBQUUsR0FBRztDQUNWLEVBQUUsSUFBSSxFQUFFLEdBQUc7Q0FDWCxFQUFFLElBQUksRUFBRSxHQUFHO0NBQ1gsRUFBRSxRQUFRLEVBQUUsT0FBTztDQUNuQixFQUFFLFFBQVEsRUFBRSxPQUFPO0NBQ25CLENBQUMsQ0FBQztBQUNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtDQUMvQixFQUFFLE9BQU8sSUFBSSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNuQzs7Q0NqQkE7Q0FDQSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7O0NDQTdDO0NBQ0EsSUFBSUMsYUFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkM7Q0FDQTtDQUNBLElBQUlELGdCQUFjLEdBQUdDLGFBQVcsQ0FBQyxjQUFjLENBQUM7QUFDaEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRTtDQUMxQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDNUIsSUFBSSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM5QixHQUFHO0NBQ0gsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDbEIsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUNsQyxJQUFJLElBQUlELGdCQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFO0NBQ2xFLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN2QixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDdkJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBU2lCLE1BQUksQ0FBQyxNQUFNLEVBQUU7Q0FDdEIsRUFBRSxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3hFOztDQ2xDQTtDQUNBLElBQUksYUFBYSxHQUFHLGtCQUFrQjs7Q0NEdEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLFNBQVMsR0FBRyxFQUFFO0NBQ3ZCLElBQUksT0FBTyxNQUFNLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDcEQsR0FBRyxDQUFDO0NBQ0o7O0NDVEE7Q0FDQSxJQUFJLFdBQVcsR0FBRztDQUNsQixFQUFFLEdBQUcsRUFBRSxPQUFPO0NBQ2QsRUFBRSxHQUFHLEVBQUUsTUFBTTtDQUNiLEVBQUUsR0FBRyxFQUFFLE1BQU07Q0FDYixFQUFFLEdBQUcsRUFBRSxRQUFRO0NBQ2YsRUFBRSxHQUFHLEVBQUUsT0FBTztDQUNkLENBQUMsQ0FBQztBQUNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLGNBQWMsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDOztDQ2ZoRDtDQUNBLElBQUksU0FBUyxHQUFHLGlCQUFpQixDQUFDO0FBQ2xDO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRTtDQUN6QixFQUFFLE9BQU8sT0FBTyxLQUFLLElBQUksUUFBUTtDQUNqQyxLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUM7Q0FDNUQ7O0NDckJBO0NBQ0EsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQjtDQUNBO0NBQ0EsSUFBSSxXQUFXLEdBQUd4RCxRQUFNLEdBQUdBLFFBQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUztDQUN2RCxJQUFJLGNBQWMsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDcEU7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFO0NBQzdCO0NBQ0EsRUFBRSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtDQUNoQyxJQUFJLE9BQU8sS0FBSyxDQUFDO0NBQ2pCLEdBQUc7Q0FDSCxFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQ3RCO0NBQ0EsSUFBSSxPQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO0NBQzlDLEdBQUc7Q0FDSCxFQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQ3ZCLElBQUksT0FBTyxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDNUQsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQzVCLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7Q0FDckU7O0NDaENBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVNZLFVBQVEsQ0FBQyxLQUFLLEVBQUU7Q0FDekIsRUFBRSxPQUFPLEtBQUssSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNsRDs7Q0N0QkE7Q0FDQSxJQUFJLGVBQWUsR0FBRyxVQUFVO0NBQ2hDLElBQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFO0NBQ3hCLEVBQUUsTUFBTSxHQUFHQSxVQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDNUIsRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Q0FDbkQsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUM7Q0FDckQsTUFBTSxNQUFNLENBQUM7Q0FDYjs7Q0N4Q0E7Q0FDQSxJQUFJLFFBQVEsR0FBRyxrQkFBa0I7O0NDRGpDO0NBQ0EsSUFBSSxVQUFVLEdBQUcsaUJBQWlCOztDQ0lsQztDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLGdCQUFnQixHQUFHO0FBQ3ZCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsRUFBRSxRQUFRLEVBQUUsUUFBUTtBQUNwQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsVUFBVSxFQUFFLFVBQVU7QUFDeEI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLGFBQWEsRUFBRSxhQUFhO0FBQzlCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsRUFBRSxVQUFVLEVBQUUsRUFBRTtBQUNoQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsU0FBUyxFQUFFO0FBQ2I7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Q0FDN0IsR0FBRztDQUNILENBQUM7O0NDcEREO0NBQ0EsSUFBSSxvQkFBb0IsR0FBRyxnQkFBZ0I7Q0FDM0MsSUFBSSxtQkFBbUIsR0FBRyxvQkFBb0I7Q0FDOUMsSUFBSSxxQkFBcUIsR0FBRywrQkFBK0IsQ0FBQztBQUM1RDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxZQUFZLEdBQUcsaUNBQWlDLENBQUM7QUFDckQ7Q0FDQTtDQUNBLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QjtDQUNBO0NBQ0EsSUFBSSxpQkFBaUIsR0FBRyx3QkFBd0IsQ0FBQztBQUNqRDtDQUNBO0NBQ0EsSUFBSTRCLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0NBQzFDO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQztBQUNqRjtDQUNBLEVBQUUsSUFBSSxLQUFLLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Q0FDdkQsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO0NBQ3hCLEdBQUc7Q0FDSCxFQUFFLE1BQU0sR0FBRzVCLFVBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM1QixFQUFFLE9BQU8sR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUN4RTtDQUNBLEVBQUUsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLENBQUM7Q0FDM0YsTUFBTSxXQUFXLEdBQUc0QyxNQUFJLENBQUMsT0FBTyxDQUFDO0NBQ2pDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDdkQ7Q0FDQSxFQUFFLElBQUksVUFBVTtDQUNoQixNQUFNLFlBQVk7Q0FDbEIsTUFBTSxLQUFLLEdBQUcsQ0FBQztDQUNmLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksU0FBUztDQUNwRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFDMUI7Q0FDQTtDQUNBLEVBQUUsSUFBSSxZQUFZLEdBQUcsTUFBTTtDQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUUsTUFBTSxHQUFHLEdBQUc7Q0FDOUMsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUc7Q0FDNUIsSUFBSSxDQUFDLFdBQVcsS0FBSyxhQUFhLEdBQUcsWUFBWSxHQUFHLFNBQVMsRUFBRSxNQUFNLEdBQUcsR0FBRztDQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUUsTUFBTSxHQUFHLElBQUk7Q0FDakQsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNUO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLElBQUksU0FBUyxHQUFHakIsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztDQUMzRCxPQUFPLGdCQUFnQjtDQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7Q0FDdkQsT0FBTyxJQUFJO0NBQ1gsTUFBTSxFQUFFLENBQUM7QUFDVDtDQUNBLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFO0NBQ3RILElBQUksZ0JBQWdCLEtBQUssZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLENBQUM7QUFDN0Q7Q0FDQTtDQUNBLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZGO0NBQ0E7Q0FDQSxJQUFJLElBQUksV0FBVyxFQUFFO0NBQ3JCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztDQUN4QixNQUFNLE1BQU0sSUFBSSxXQUFXLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQztDQUNyRCxLQUFLO0NBQ0wsSUFBSSxJQUFJLGFBQWEsRUFBRTtDQUN2QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7Q0FDMUIsTUFBTSxNQUFNLElBQUksTUFBTSxHQUFHLGFBQWEsR0FBRyxhQUFhLENBQUM7Q0FDdkQsS0FBSztDQUNMLElBQUksSUFBSSxnQkFBZ0IsRUFBRTtDQUMxQixNQUFNLE1BQU0sSUFBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyw2QkFBNkIsQ0FBQztDQUNwRixLQUFLO0NBQ0wsSUFBSSxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEM7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHLENBQUMsQ0FBQztBQUNMO0NBQ0EsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDO0FBQ25CO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLElBQUksUUFBUSxHQUFHQSxnQkFBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUM5RSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7Q0FDakIsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQztDQUNqRCxHQUFHO0NBQ0g7Q0FDQSxFQUFFLE1BQU0sR0FBRyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxHQUFHLE1BQU07Q0FDNUUsS0FBSyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDO0NBQ3ZDLEtBQUssT0FBTyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNDO0NBQ0E7Q0FDQSxFQUFFLE1BQU0sR0FBRyxXQUFXLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxHQUFHLE9BQU87Q0FDdEQsS0FBSyxRQUFRO0NBQ2IsUUFBUSxFQUFFO0NBQ1YsUUFBUSxzQkFBc0I7Q0FDOUIsS0FBSztDQUNMLElBQUksbUJBQW1CO0NBQ3ZCLEtBQUssVUFBVTtDQUNmLFNBQVMsa0JBQWtCO0NBQzNCLFNBQVMsRUFBRTtDQUNYLEtBQUs7Q0FDTCxLQUFLLFlBQVk7Q0FDakIsUUFBUSxpQ0FBaUM7Q0FDekMsUUFBUSx1REFBdUQ7Q0FDL0QsUUFBUSxLQUFLO0NBQ2IsS0FBSztDQUNMLElBQUksTUFBTTtDQUNWLElBQUksZUFBZSxDQUFDO0FBQ3BCO0NBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVztDQUNsQyxJQUFJLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQztDQUNoRSxPQUFPLEtBQUssQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7Q0FDdkMsR0FBRyxDQUFDLENBQUM7QUFDTDtDQUNBO0NBQ0E7Q0FDQSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQ3pCLEVBQUUsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDdkIsSUFBSSxNQUFNLE1BQU0sQ0FBQztDQUNqQixHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0MxUEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRTtDQUNwQyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLE1BQU0sR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2hEO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO0NBQ3hELE1BQU0sTUFBTTtDQUNaLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNmOztDQ25CQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsYUFBYSxDQUFDLFNBQVMsRUFBRTtDQUNsQyxFQUFFLE9BQU8sU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtDQUM5QyxJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNsQixRQUFRLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0NBQ2pDLFFBQVEsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Q0FDaEMsUUFBUSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM5QjtDQUNBLElBQUksT0FBTyxNQUFNLEVBQUUsRUFBRTtDQUNyQixNQUFNLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDcEQsTUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtDQUM1RCxRQUFRLE1BQU07Q0FDZCxPQUFPO0NBQ1AsS0FBSztDQUNMLElBQUksT0FBTyxNQUFNLENBQUM7Q0FDbEIsR0FBRyxDQUFDO0NBQ0o7O0NDcEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLE9BQU8sR0FBRyxhQUFhLEVBQUU7O0NDVjdCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO0NBQ3RDLEVBQUUsT0FBTyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUVpQixNQUFJLENBQUMsQ0FBQztDQUNuRDs7Q0NYQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxjQUFjLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRTtDQUM3QyxFQUFFLE9BQU8sU0FBUyxVQUFVLEVBQUUsUUFBUSxFQUFFO0NBQ3hDLElBQUksSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO0NBQzVCLE1BQU0sT0FBTyxVQUFVLENBQUM7Q0FDeEIsS0FBSztDQUNMLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRTtDQUNsQyxNQUFNLE9BQU8sUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUM1QyxLQUFLO0NBQ0wsSUFBSSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTTtDQUNsQyxRQUFRLEtBQUssR0FBRyxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUN2QyxRQUFRLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEM7Q0FDQSxJQUFJLFFBQVEsU0FBUyxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHLE1BQU0sR0FBRztDQUNyRCxNQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO0NBQ2hFLFFBQVEsTUFBTTtDQUNkLE9BQU87Q0FDUCxLQUFLO0NBQ0wsSUFBSSxPQUFPLFVBQVUsQ0FBQztDQUN0QixHQUFHLENBQUM7Q0FDSjs7Q0MxQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7O0NDVHpDO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFO0NBQzdCLEVBQUUsT0FBTyxPQUFPLEtBQUssSUFBSSxVQUFVLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztDQUN2RDs7Q0NOQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFO0NBQ3ZDLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7Q0FDeEQsRUFBRSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Q0FDbEQ7O0NDdENBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxjQUFjLEdBQUc7Q0FDMUIsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztDQUNyQixFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCOztDQ1JBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQ2xDLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUM1QixFQUFFLE9BQU8sTUFBTSxFQUFFLEVBQUU7Q0FDbkIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7Q0FDbkMsTUFBTSxPQUFPLE1BQU0sQ0FBQztDQUNwQixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUNaOztDQ2hCQTtDQUNBLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDakM7Q0FDQTtDQUNBLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDL0I7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUU7Q0FDOUIsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTtDQUMxQixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDO0NBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Q0FDakIsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHO0NBQ0gsRUFBRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUNsQyxFQUFFLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtDQUMxQixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNmLEdBQUcsTUFBTTtDQUNULElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ2hDLEdBQUc7Q0FDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztDQUNkLEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FDZDs7Q0M5QkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFO0NBQzNCLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7Q0FDMUIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0QztDQUNBLEVBQUUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEQ7O0NDZEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFO0NBQzNCLEVBQUUsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUMvQzs7Q0NYQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7Q0FDbEMsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTtDQUMxQixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDO0NBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Q0FDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDNUIsR0FBRyxNQUFNO0NBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0NBQzNCLEdBQUc7Q0FDSCxFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ2Q7O0NDakJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFO0NBQzVCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDcEQ7Q0FDQSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUNmLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUU7Q0FDM0IsSUFBSSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDL0IsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqQyxHQUFHO0NBQ0gsQ0FBQztBQUNEO0NBQ0E7Q0FDQSxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7Q0FDM0MsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxlQUFlLENBQUM7Q0FDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO0NBQ3ZDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztDQUN2QyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxZQUFZOztDQzNCdEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFVBQVUsR0FBRztDQUN0QixFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUM7Q0FDaEMsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztDQUNoQjs7Q0NaQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Q0FDMUIsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTtDQUMxQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkM7Q0FDQSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUN4QixFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCOztDQ2ZBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtDQUN2QixFQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDaEM7O0NDWEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0NBQ3ZCLEVBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNoQzs7Q0NSQTtDQUNBLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDOztDQ0ZoQztDQUNBLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDOztDQ0Q5QztDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxHQUFHO0NBQ3JCLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUN6RCxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCOztDQ1pBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0NBQ3pCLEVBQUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDMUQsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzlCLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDWkE7Q0FDQSxJQUFJLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztBQUNqRDtDQUNBO0NBQ0EsSUFBSWhCLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0NBQ3RCLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztDQUMzQixFQUFFLElBQUksWUFBWSxFQUFFO0NBQ3BCLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzNCLElBQUksT0FBTyxNQUFNLEtBQUssY0FBYyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUM7Q0FDMUQsR0FBRztDQUNILEVBQUUsT0FBT0QsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7Q0FDaEU7O0NDekJBO0NBQ0EsSUFBSUMsYUFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbkM7Q0FDQTtDQUNBLElBQUlELGdCQUFjLEdBQUdDLGFBQVcsQ0FBQyxjQUFjLENBQUM7QUFDaEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Q0FDdEIsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0NBQzNCLEVBQUUsT0FBTyxZQUFZLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsSUFBSUQsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ25GOztDQ2xCQTtDQUNBLElBQUlrQixnQkFBYyxHQUFHLDJCQUEyQixDQUFDO0FBQ2pEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQzdCLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztDQUMzQixFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3JDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUlBLGdCQUFjLEdBQUcsS0FBSyxDQUFDO0NBQzdFLEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FDZDs7Q0NkQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRTtDQUN2QixFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLE1BQU0sR0FBRyxPQUFPLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ3BEO0NBQ0EsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDZixFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQzNCLElBQUksSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQy9CLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDakMsR0FBRztDQUNILENBQUM7QUFDRDtDQUNBO0NBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0NBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDO0NBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztDQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7Q0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsT0FBTzs7Q0N6QjVCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxhQUFhLEdBQUc7Q0FDekIsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztDQUNoQixFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUc7Q0FDbEIsSUFBSSxNQUFNLEVBQUUsSUFBSSxJQUFJO0NBQ3BCLElBQUksS0FBSyxFQUFFLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQztDQUNqQyxJQUFJLFFBQVEsRUFBRSxJQUFJLElBQUk7Q0FDdEIsR0FBRyxDQUFDO0NBQ0o7O0NDbEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO0NBQzFCLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxLQUFLLENBQUM7Q0FDMUIsRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFNBQVM7Q0FDdkYsT0FBTyxLQUFLLEtBQUssV0FBVztDQUM1QixPQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztDQUN2Qjs7Q0NWQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtDQUM5QixFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Q0FDMUIsRUFBRSxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUM7Q0FDdkIsTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7Q0FDdEQsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDO0NBQ2Y7O0NDYkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFO0NBQzdCLEVBQUUsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwRCxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDOUIsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0NiQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Q0FDMUIsRUFBRSxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3hDOztDQ1hBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRTtDQUMxQixFQUFFLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDeEM7O0NDWEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQ2pDLEVBQUUsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7Q0FDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN2QjtDQUNBLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDdkIsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDekMsRUFBRSxPQUFPLElBQUksQ0FBQztDQUNkOztDQ2JBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFO0NBQzNCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDcEQ7Q0FDQSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUNmLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUU7Q0FDM0IsSUFBSSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDL0IsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqQyxHQUFHO0NBQ0gsQ0FBQztBQUNEO0NBQ0E7Q0FDQSxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7Q0FDekMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxjQUFjLENBQUM7Q0FDOUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO0NBQ3JDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQztDQUNyQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxXQUFXOztDQ3pCcEM7Q0FDQSxJQUFJLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztBQUMzQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtDQUM5QixFQUFFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Q0FDM0IsRUFBRSxJQUFJLElBQUksWUFBWSxTQUFTLEVBQUU7Q0FDakMsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0NBQzlCLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFO0NBQ3ZELE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQy9CLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Q0FDOUIsTUFBTSxPQUFPLElBQUksQ0FBQztDQUNsQixLQUFLO0NBQ0wsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMvQyxHQUFHO0NBQ0gsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN2QixFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUN4QixFQUFFLE9BQU8sSUFBSSxDQUFDO0NBQ2Q7O0NDeEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxLQUFLLENBQUMsT0FBTyxFQUFFO0NBQ3hCLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNwRCxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztDQUN4QixDQUFDO0FBQ0Q7Q0FDQTtDQUNBLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztDQUNuQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsQ0FBQztDQUN4QyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7Q0FDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO0NBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFFBQVE7O0NDckI5QjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0NBQzlDLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQztDQUNyRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRTtDQUNqRCxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3hDLEdBQUc7Q0FDSDs7Q0NmQTtDQUNBLElBQUlOLGFBQVcsR0FBRyxPQUFPLE9BQU8sSUFBSSxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUM7QUFDeEY7Q0FDQTtDQUNBLElBQUlDLFlBQVUsR0FBR0QsYUFBVyxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztBQUNsRztDQUNBO0NBQ0EsSUFBSUUsZUFBYSxHQUFHRCxZQUFVLElBQUlBLFlBQVUsQ0FBQyxPQUFPLEtBQUtELGFBQVcsQ0FBQztBQUNyRTtDQUNBO0NBQ0EsSUFBSU8sUUFBTSxHQUFHTCxlQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTO0NBQ3BELElBQUksV0FBVyxHQUFHSyxRQUFNLEdBQUdBLFFBQU0sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQzFEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7Q0FDckMsRUFBRSxJQUFJLE1BQU0sRUFBRTtDQUNkLElBQUksT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDMUIsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07Q0FDNUIsTUFBTSxNQUFNLEdBQUcsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEY7Q0FDQSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDdEIsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0M5QkE7Q0FDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVTs7Q0NEaEM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtDQUN2QyxFQUFFLElBQUksTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDbkUsRUFBRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztDQUMxRCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCOztDQ1hBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGVBQWUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFO0NBQzdDLEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0NBQ2hGLEVBQUUsT0FBTyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3RGOztDQ2JBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0NBQ2xDLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDN0I7Q0FDQSxFQUFFLEtBQUssS0FBSyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Q0FDbkMsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDakMsR0FBRztDQUNILEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDZjs7Q0NmQTtDQUNBLElBQUlDLGNBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2pDO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksVUFBVSxJQUFJLFdBQVc7Q0FDN0IsRUFBRSxTQUFTLE1BQU0sR0FBRyxFQUFFO0NBQ3RCLEVBQUUsT0FBTyxTQUFTLEtBQUssRUFBRTtDQUN6QixJQUFJLElBQUksQ0FBQ2YsVUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQzFCLE1BQU0sT0FBTyxFQUFFLENBQUM7Q0FDaEIsS0FBSztDQUNMLElBQUksSUFBSWUsY0FBWSxFQUFFO0NBQ3RCLE1BQU0sT0FBT0EsY0FBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2pDLEtBQUs7Q0FDTCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0NBQzdCLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUM7Q0FDNUIsSUFBSSxNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztDQUNqQyxJQUFJLE9BQU8sTUFBTSxDQUFDO0NBQ2xCLEdBQUcsQ0FBQztDQUNKLENBQUMsRUFBRSxDQUFDOztDQ3ZCSjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRTtDQUNqQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksVUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztDQUN6RSxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDdEMsTUFBTSxFQUFFLENBQUM7Q0FDVDs7Q0NaQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO0NBQ2xDLEVBQUUsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ25EOztDQzlCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtDQUM5QixFQUFFLElBQUksR0FBRyxLQUFLLGFBQWEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLEVBQUU7Q0FDbEUsSUFBSSxPQUFPO0NBQ1gsR0FBRztBQUNIO0NBQ0EsRUFBRSxJQUFJLEdBQUcsSUFBSSxXQUFXLEVBQUU7Q0FDMUIsSUFBSSxPQUFPO0NBQ1gsR0FBRztBQUNIO0NBQ0EsRUFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNyQjs7Q0NmQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUU7Q0FDOUIsRUFBRSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDMUM7O0NDYkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO0NBQ3BGLEVBQUUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7Q0FDckMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7Q0FDckMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwQztDQUNBLEVBQUUsSUFBSSxPQUFPLEVBQUU7Q0FDZixJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDM0MsSUFBSSxPQUFPO0NBQ1gsR0FBRztDQUNILEVBQUUsSUFBSSxRQUFRLEdBQUcsVUFBVTtDQUMzQixNQUFNLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7Q0FDdkUsTUFBTSxTQUFTLENBQUM7QUFDaEI7Q0FDQSxFQUFFLElBQUksUUFBUSxHQUFHLFFBQVEsS0FBSyxTQUFTLENBQUM7QUFDeEM7Q0FDQSxFQUFFLElBQUksUUFBUSxFQUFFO0NBQ2hCLElBQUksSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUNqQyxRQUFRLE1BQU0sR0FBRyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDO0NBQzdDLFFBQVEsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5RDtDQUNBLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztDQUN4QixJQUFJLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7Q0FDcEMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUM3QixRQUFRLFFBQVEsR0FBRyxRQUFRLENBQUM7Q0FDNUIsT0FBTztDQUNQLFdBQVcsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUM1QyxRQUFRLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDdkMsT0FBTztDQUNQLFdBQVcsSUFBSSxNQUFNLEVBQUU7Q0FDdkIsUUFBUSxRQUFRLEdBQUcsS0FBSyxDQUFDO0NBQ3pCLFFBQVEsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDL0MsT0FBTztDQUNQLFdBQVcsSUFBSSxPQUFPLEVBQUU7Q0FDeEIsUUFBUSxRQUFRLEdBQUcsS0FBSyxDQUFDO0NBQ3pCLFFBQVEsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDbkQsT0FBTztDQUNQLFdBQVc7Q0FDWCxRQUFRLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDdEIsT0FBTztDQUNQLEtBQUs7Q0FDTCxTQUFTLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUMvRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUM7Q0FDMUIsTUFBTSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUNqQyxRQUFRLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDM0MsT0FBTztDQUNQLFdBQVcsSUFBSSxDQUFDZixVQUFRLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0NBQzVELFFBQVEsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUM3QyxPQUFPO0NBQ1AsS0FBSztDQUNMLFNBQVM7Q0FDVCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUM7Q0FDdkIsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLElBQUksUUFBUSxFQUFFO0NBQ2hCO0NBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUNsQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDL0QsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDOUIsR0FBRztDQUNILEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUMxQzs7Q0NuRkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7Q0FDaEUsRUFBRSxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7Q0FDekIsSUFBSSxPQUFPO0NBQ1gsR0FBRztDQUNILEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLFFBQVEsRUFBRSxHQUFHLEVBQUU7Q0FDMUMsSUFBSSxLQUFLLEtBQUssS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7Q0FDakMsSUFBSSxJQUFJQSxVQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7Q0FDNUIsTUFBTSxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDakYsS0FBSztDQUNMLFNBQVM7Q0FDVCxNQUFNLElBQUksUUFBUSxHQUFHLFVBQVU7Q0FDL0IsVUFBVSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztDQUN2RixVQUFVLFNBQVMsQ0FBQztBQUNwQjtDQUNBLE1BQU0sSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0NBQ2xDLFFBQVEsUUFBUSxHQUFHLFFBQVEsQ0FBQztDQUM1QixPQUFPO0NBQ1AsTUFBTSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQzlDLEtBQUs7Q0FDTCxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDYjs7Q0NwQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsU0FBUyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtDQUM5RCxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3RDLENBQUMsQ0FBQzs7Q0NqQ0Y7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRTtDQUN4QixFQUFFLE9BQU8sTUFBTSxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRVksTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Q0FDaEU7O0NDL0JBO0NBQ0EsSUFBSUMsZ0JBQWMsR0FBRywyQkFBMkIsQ0FBQztBQUNqRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFO0NBQzVCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFQSxnQkFBYyxDQUFDLENBQUM7Q0FDM0MsRUFBRSxPQUFPLElBQUksQ0FBQztDQUNkOztDQ2hCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Q0FDNUIsRUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2xDOztDQ1BBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Q0FDMUIsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsRDtDQUNBLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztDQUMvQixFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQzNCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUM1QixHQUFHO0NBQ0gsQ0FBQztBQUNEO0NBQ0E7Q0FDQSxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7Q0FDL0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsV0FBVzs7Q0N4QnBDO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtDQUNyQyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLE1BQU0sR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2hEO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7Q0FDL0MsTUFBTSxPQUFPLElBQUksQ0FBQztDQUNsQixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDZjs7Q0NwQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7Q0FDOUIsRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDeEI7O0NDTkE7Q0FDQSxJQUFJLG9CQUFvQixHQUFHLENBQUM7Q0FDNUIsSUFBSSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDL0I7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO0NBQzFFLEVBQUUsSUFBSSxTQUFTLEdBQUcsT0FBTyxHQUFHLG9CQUFvQjtDQUNoRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTTtDQUM5QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CO0NBQ0EsRUFBRSxJQUFJLFNBQVMsSUFBSSxTQUFTLElBQUksRUFBRSxTQUFTLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxFQUFFO0NBQ3ZFLElBQUksT0FBTyxLQUFLLENBQUM7Q0FDakIsR0FBRztDQUNIO0NBQ0EsRUFBRSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2pDLEVBQUUsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtDQUNuQyxJQUFJLE9BQU8sT0FBTyxJQUFJLEtBQUssQ0FBQztDQUM1QixHQUFHO0NBQ0gsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsSUFBSTtDQUNuQixNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsSUFBSSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDM0U7Q0FDQSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzFCLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUI7Q0FDQTtDQUNBLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxTQUFTLEVBQUU7Q0FDOUIsSUFBSSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0NBQy9CLFFBQVEsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQztDQUNBLElBQUksSUFBSSxVQUFVLEVBQUU7Q0FDcEIsTUFBTSxJQUFJLFFBQVEsR0FBRyxTQUFTO0NBQzlCLFVBQVUsVUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0NBQ3BFLFVBQVUsVUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDckUsS0FBSztDQUNMLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO0NBQ2hDLE1BQU0sSUFBSSxRQUFRLEVBQUU7Q0FDcEIsUUFBUSxTQUFTO0NBQ2pCLE9BQU87Q0FDUCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDckIsTUFBTSxNQUFNO0NBQ1osS0FBSztDQUNMO0NBQ0EsSUFBSSxJQUFJLElBQUksRUFBRTtDQUNkLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxRQUFRLEVBQUUsUUFBUSxFQUFFO0NBQ3pELFlBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO0NBQ3pDLGlCQUFpQixRQUFRLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtDQUN0RyxjQUFjLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN6QyxhQUFhO0NBQ2IsV0FBVyxDQUFDLEVBQUU7Q0FDZCxRQUFRLE1BQU0sR0FBRyxLQUFLLENBQUM7Q0FDdkIsUUFBUSxNQUFNO0NBQ2QsT0FBTztDQUNQLEtBQUssTUFBTSxJQUFJO0NBQ2YsVUFBVSxRQUFRLEtBQUssUUFBUTtDQUMvQixZQUFZLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDO0NBQ3JFLFNBQVMsRUFBRTtDQUNYLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQztDQUNyQixNQUFNLE1BQU07Q0FDWixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDaEZBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0NBQ3pCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0I7Q0FDQSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUUsR0FBRyxFQUFFO0NBQ25DLElBQUksTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDbkMsR0FBRyxDQUFDLENBQUM7Q0FDTCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCOztDQ2ZBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0NBQ3pCLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0I7Q0FDQSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUU7Q0FDOUIsSUFBSSxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDNUIsR0FBRyxDQUFDLENBQUM7Q0FDTCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCOztDQ1JBO0NBQ0EsSUFBSUcsc0JBQW9CLEdBQUcsQ0FBQztDQUM1QixJQUFJQyx3QkFBc0IsR0FBRyxDQUFDLENBQUM7QUFDL0I7Q0FDQTtDQUNBLElBQUlDLFNBQU8sR0FBRyxrQkFBa0I7Q0FDaEMsSUFBSUMsU0FBTyxHQUFHLGVBQWU7Q0FDN0IsSUFBSVIsVUFBUSxHQUFHLGdCQUFnQjtDQUMvQixJQUFJUyxRQUFNLEdBQUcsY0FBYztDQUMzQixJQUFJQyxXQUFTLEdBQUcsaUJBQWlCO0NBQ2pDLElBQUlDLFdBQVMsR0FBRyxpQkFBaUI7Q0FDakMsSUFBSUMsUUFBTSxHQUFHLGNBQWM7Q0FDM0IsSUFBSUMsV0FBUyxHQUFHLGlCQUFpQjtDQUNqQyxJQUFJQyxXQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDbEM7Q0FDQSxJQUFJQyxnQkFBYyxHQUFHLHNCQUFzQjtDQUMzQyxJQUFJQyxhQUFXLEdBQUcsbUJBQW1CLENBQUM7QUFDdEM7Q0FDQTtDQUNBLElBQUlDLGFBQVcsR0FBR3hFLFFBQU0sR0FBR0EsUUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTO0NBQ3ZELElBQUksYUFBYSxHQUFHd0UsYUFBVyxHQUFHQSxhQUFXLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUNsRTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7Q0FDL0UsRUFBRSxRQUFRLEdBQUc7Q0FDYixJQUFJLEtBQUtELGFBQVc7Q0FDcEIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVTtDQUNoRCxXQUFXLE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0NBQ25ELFFBQVEsT0FBTyxLQUFLLENBQUM7Q0FDckIsT0FBTztDQUNQLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDN0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUMzQjtDQUNBLElBQUksS0FBS0QsZ0JBQWM7Q0FDdkIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVTtDQUNoRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Q0FDckUsUUFBUSxPQUFPLEtBQUssQ0FBQztDQUNyQixPQUFPO0NBQ1AsTUFBTSxPQUFPLElBQUksQ0FBQztBQUNsQjtDQUNBLElBQUksS0FBS1IsU0FBTyxDQUFDO0NBQ2pCLElBQUksS0FBS0MsU0FBTyxDQUFDO0NBQ2pCLElBQUksS0FBS0UsV0FBUztDQUNsQjtDQUNBO0NBQ0EsTUFBTSxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDO0NBQ0EsSUFBSSxLQUFLVixVQUFRO0NBQ2pCLE1BQU0sT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFFO0NBQ0EsSUFBSSxLQUFLVyxXQUFTLENBQUM7Q0FDbkIsSUFBSSxLQUFLRSxXQUFTO0NBQ2xCO0NBQ0E7Q0FDQTtDQUNBLE1BQU0sT0FBTyxNQUFNLEtBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDO0NBQ0EsSUFBSSxLQUFLSixRQUFNO0NBQ2YsTUFBTSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFDL0I7Q0FDQSxJQUFJLEtBQUtHLFFBQU07Q0FDZixNQUFNLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBR1Asc0JBQW9CLENBQUM7Q0FDckQsTUFBTSxPQUFPLEtBQUssT0FBTyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0FBQ3hDO0NBQ0EsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtDQUNuRCxRQUFRLE9BQU8sS0FBSyxDQUFDO0NBQ3JCLE9BQU87Q0FDUDtDQUNBLE1BQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN0QyxNQUFNLElBQUksT0FBTyxFQUFFO0NBQ25CLFFBQVEsT0FBTyxPQUFPLElBQUksS0FBSyxDQUFDO0NBQ2hDLE9BQU87Q0FDUCxNQUFNLE9BQU8sSUFBSUMsd0JBQXNCLENBQUM7QUFDeEM7Q0FDQTtDQUNBLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDL0IsTUFBTSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN2RyxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM5QixNQUFNLE9BQU8sTUFBTSxDQUFDO0FBQ3BCO0NBQ0EsSUFBSSxLQUFLUSxXQUFTO0NBQ2xCLE1BQU0sSUFBSSxhQUFhLEVBQUU7Q0FDekIsUUFBUSxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN2RSxPQUFPO0NBQ1AsR0FBRztDQUNILEVBQUUsT0FBTyxLQUFLLENBQUM7Q0FDZjs7Q0M3R0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7Q0FDbEMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU07Q0FDNUIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM1QjtDQUNBLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUU7Q0FDM0IsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxQyxHQUFHO0NBQ0gsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNmOztDQ2RBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtDQUN2RCxFQUFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNoQyxFQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQzNFOztDQ2pCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO0NBQ3ZDLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sTUFBTSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNO0NBQy9DLE1BQU0sUUFBUSxHQUFHLENBQUM7Q0FDbEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM3QixJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7Q0FDeEMsTUFBTSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Q0FDakMsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLE9BQU8sTUFBTSxDQUFDO0NBQ2hCOztDQ3RCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFNBQVMsR0FBRztDQUNyQixFQUFFLE9BQU8sRUFBRSxDQUFDO0NBQ1o7O0NDakJBO0NBQ0EsSUFBSTdCLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJaUMsc0JBQW9CLEdBQUdqQyxhQUFXLENBQUMsb0JBQW9CLENBQUM7QUFDNUQ7Q0FDQTtDQUNBLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0FBQ3BEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLFVBQVUsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsR0FBRyxTQUFTLE1BQU0sRUFBRTtDQUNsRSxFQUFFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtDQUN0QixJQUFJLE9BQU8sRUFBRSxDQUFDO0NBQ2QsR0FBRztDQUNILEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUMxQixFQUFFLE9BQU8sV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsTUFBTSxFQUFFO0NBQ2hFLElBQUksT0FBT2lDLHNCQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDckQsR0FBRyxDQUFDLENBQUM7Q0FDTCxDQUFDOztDQ3ZCRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRTtDQUM1QixFQUFFLE9BQU8sY0FBYyxDQUFDLE1BQU0sRUFBRWpCLE1BQUksRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNsRDs7Q0NYQTtDQUNBLElBQUlJLHNCQUFvQixHQUFHLENBQUMsQ0FBQztBQUM3QjtDQUNBO0NBQ0EsSUFBSXBCLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtDQUM1RSxFQUFFLElBQUksU0FBUyxHQUFHLE9BQU8sR0FBR29CLHNCQUFvQjtDQUNoRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0NBQ25DLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNO0NBQ2pDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7Q0FDbEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQztDQUNBLEVBQUUsSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJLENBQUMsU0FBUyxFQUFFO0NBQzVDLElBQUksT0FBTyxLQUFLLENBQUM7Q0FDakIsR0FBRztDQUNILEVBQUUsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO0NBQ3hCLEVBQUUsT0FBTyxLQUFLLEVBQUUsRUFBRTtDQUNsQixJQUFJLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUM5QixJQUFJLElBQUksRUFBRSxTQUFTLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBR3JCLGdCQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0NBQ3ZFLE1BQU0sT0FBTyxLQUFLLENBQUM7Q0FDbkIsS0FBSztDQUNMLEdBQUc7Q0FDSDtDQUNBLEVBQUUsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNsQyxFQUFFLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Q0FDbkMsSUFBSSxPQUFPLE9BQU8sSUFBSSxLQUFLLENBQUM7Q0FDNUIsR0FBRztDQUNILEVBQUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDM0IsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQjtDQUNBLEVBQUUsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO0NBQzNCLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxTQUFTLEVBQUU7Q0FDOUIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFCLElBQUksSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztDQUM5QixRQUFRLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUI7Q0FDQSxJQUFJLElBQUksVUFBVSxFQUFFO0NBQ3BCLE1BQU0sSUFBSSxRQUFRLEdBQUcsU0FBUztDQUM5QixVQUFVLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztDQUNuRSxVQUFVLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ3BFLEtBQUs7Q0FDTDtDQUNBLElBQUksSUFBSSxFQUFFLFFBQVEsS0FBSyxTQUFTO0NBQ2hDLGFBQWEsUUFBUSxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQztDQUMvRixZQUFZLFFBQVE7Q0FDcEIsU0FBUyxFQUFFO0NBQ1gsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDO0NBQ3JCLE1BQU0sTUFBTTtDQUNaLEtBQUs7Q0FDTCxJQUFJLFFBQVEsS0FBSyxRQUFRLEdBQUcsR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDO0NBQ2xELEdBQUc7Q0FDSCxFQUFFLElBQUksTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO0NBQzNCLElBQUksSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVc7Q0FDcEMsUUFBUSxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztBQUNwQztDQUNBO0NBQ0EsSUFBSSxJQUFJLE9BQU8sSUFBSSxPQUFPO0NBQzFCLFNBQVMsYUFBYSxJQUFJLE1BQU0sSUFBSSxhQUFhLElBQUksS0FBSyxDQUFDO0NBQzNELFFBQVEsRUFBRSxPQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksT0FBTyxZQUFZLE9BQU87Q0FDcEUsVUFBVSxPQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksT0FBTyxZQUFZLE9BQU8sQ0FBQyxFQUFFO0NBQ3ZFLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQztDQUNyQixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzFCLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDbkZBO0NBQ0EsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7O0NDRDFDO0NBQ0EsSUFBSW5CLFNBQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQzs7Q0NEeEM7Q0FDQSxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzs7Q0NEaEM7Q0FDQSxJQUFJdkMsU0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDOztDQ0l4QztDQUNBLElBQUltRixRQUFNLEdBQUcsY0FBYztDQUMzQixJQUFJVixXQUFTLEdBQUcsaUJBQWlCO0NBQ2pDLElBQUksVUFBVSxHQUFHLGtCQUFrQjtDQUNuQyxJQUFJYSxRQUFNLEdBQUcsY0FBYztDQUMzQixJQUFJTyxZQUFVLEdBQUcsa0JBQWtCLENBQUM7QUFDcEM7Q0FDQSxJQUFJSCxhQUFXLEdBQUcsbUJBQW1CLENBQUM7QUFDdEM7Q0FDQTtDQUNBLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztDQUMzQyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO0NBQ2pDLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDbkQsU0FBTyxDQUFDO0NBQ3pDLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7Q0FDakMsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUN2QyxTQUFPLENBQUMsQ0FBQztBQUMxQztDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDO0FBQ3hCO0NBQ0E7Q0FDQSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUkwRixhQUFXO0NBQ3hFLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJUCxRQUFNLENBQUM7Q0FDdEMsS0FBSzVDLFNBQU8sSUFBSSxNQUFNLENBQUNBLFNBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQztDQUN4RCxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSStDLFFBQU0sQ0FBQztDQUN0QyxLQUFLdEYsU0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJQSxTQUFPLENBQUMsSUFBSTZGLFlBQVUsQ0FBQyxFQUFFO0NBQ3BELEVBQUUsTUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFO0NBQzNCLElBQUksSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztDQUNsQyxRQUFRLElBQUksR0FBRyxNQUFNLElBQUlwQixXQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxTQUFTO0NBQ2xFLFFBQVEsVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2hEO0NBQ0EsSUFBSSxJQUFJLFVBQVUsRUFBRTtDQUNwQixNQUFNLFFBQVEsVUFBVTtDQUN4QixRQUFRLEtBQUssa0JBQWtCLEVBQUUsT0FBT2lCLGFBQVcsQ0FBQztDQUNwRCxRQUFRLEtBQUssYUFBYSxFQUFFLE9BQU9QLFFBQU0sQ0FBQztDQUMxQyxRQUFRLEtBQUssaUJBQWlCLEVBQUUsT0FBTyxVQUFVLENBQUM7Q0FDbEQsUUFBUSxLQUFLLGFBQWEsRUFBRSxPQUFPRyxRQUFNLENBQUM7Q0FDMUMsUUFBUSxLQUFLLGlCQUFpQixFQUFFLE9BQU9PLFlBQVUsQ0FBQztDQUNsRCxPQUFPO0NBQ1AsS0FBSztDQUNMLElBQUksT0FBTyxNQUFNLENBQUM7Q0FDbEIsR0FBRyxDQUFDO0NBQ0osQ0FBQztBQUNEO0FBQ0EsZ0JBQWUsTUFBTTs7Q0NoRHJCO0NBQ0EsSUFBSWQsc0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQzdCO0NBQ0E7Q0FDQSxJQUFJWCxTQUFPLEdBQUcsb0JBQW9CO0NBQ2xDLElBQUkwQixVQUFRLEdBQUcsZ0JBQWdCO0NBQy9CLElBQUlyQixXQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDbEM7Q0FDQTtDQUNBLElBQUlkLGFBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DO0NBQ0E7Q0FDQSxJQUFJRCxnQkFBYyxHQUFHQyxhQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO0NBQy9FLEVBQUUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUNoQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0NBQy9CLE1BQU0sTUFBTSxHQUFHLFFBQVEsR0FBR21DLFVBQVEsR0FBR0MsUUFBTSxDQUFDLE1BQU0sQ0FBQztDQUNuRCxNQUFNLE1BQU0sR0FBRyxRQUFRLEdBQUdELFVBQVEsR0FBR0MsUUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25EO0NBQ0EsRUFBRSxNQUFNLEdBQUcsTUFBTSxJQUFJM0IsU0FBTyxHQUFHSyxXQUFTLEdBQUcsTUFBTSxDQUFDO0NBQ2xELEVBQUUsTUFBTSxHQUFHLE1BQU0sSUFBSUwsU0FBTyxHQUFHSyxXQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ2xEO0NBQ0EsRUFBRSxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUlBLFdBQVM7Q0FDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJQSxXQUFTO0NBQ3BDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFDbkM7Q0FDQSxFQUFFLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUNyQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Q0FDMUIsTUFBTSxPQUFPLEtBQUssQ0FBQztDQUNuQixLQUFLO0NBQ0wsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztDQUNyQixHQUFHO0NBQ0gsRUFBRSxJQUFJLFNBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTtDQUM5QixJQUFJLEtBQUssS0FBSyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQztDQUNqQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQztDQUM1QyxRQUFRLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQztDQUN6RSxRQUFRLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNqRixHQUFHO0NBQ0gsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHTSxzQkFBb0IsQ0FBQyxFQUFFO0NBQ3pDLElBQUksSUFBSSxZQUFZLEdBQUcsUUFBUSxJQUFJckIsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQztDQUM3RSxRQUFRLFlBQVksR0FBRyxRQUFRLElBQUlBLGdCQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztBQUM3RTtDQUNBLElBQUksSUFBSSxZQUFZLElBQUksWUFBWSxFQUFFO0NBQ3RDLE1BQU0sSUFBSSxZQUFZLEdBQUcsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxNQUFNO0NBQy9ELFVBQVUsWUFBWSxHQUFHLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzlEO0NBQ0EsTUFBTSxLQUFLLEtBQUssS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7Q0FDbkMsTUFBTSxPQUFPLFNBQVMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDL0UsS0FBSztDQUNMLEdBQUc7Q0FDSCxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7Q0FDbEIsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHO0NBQ0gsRUFBRSxLQUFLLEtBQUssS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7Q0FDL0IsRUFBRSxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQzVFOztDQzdFQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtDQUMvRCxFQUFFLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtDQUN2QixJQUFJLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLEdBQUc7Q0FDSCxFQUFFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Q0FDeEYsSUFBSSxPQUFPLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztDQUM5QyxHQUFHO0NBQ0gsRUFBRSxPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0NBQ2hGOztDQ3RCQTtDQUNBLElBQUlxQixzQkFBb0IsR0FBRyxDQUFDO0NBQzVCLElBQUlDLHdCQUFzQixHQUFHLENBQUMsQ0FBQztBQUMvQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFO0NBQzVELEVBQUUsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU07Q0FDOUIsTUFBTSxNQUFNLEdBQUcsS0FBSztDQUNwQixNQUFNLFlBQVksR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUNqQztDQUNBLEVBQUUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0NBQ3RCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztDQUNuQixHQUFHO0NBQ0gsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzFCLEVBQUUsT0FBTyxLQUFLLEVBQUUsRUFBRTtDQUNsQixJQUFJLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNoQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO0NBQ2hDLFVBQVU7Q0FDVixNQUFNLE9BQU8sS0FBSyxDQUFDO0NBQ25CLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDNUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0NBQ3JCLFFBQVEsUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7Q0FDOUIsUUFBUSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCO0NBQ0EsSUFBSSxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDakMsTUFBTSxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEVBQUU7Q0FDdEQsUUFBUSxPQUFPLEtBQUssQ0FBQztDQUNyQixPQUFPO0NBQ1AsS0FBSyxNQUFNO0NBQ1gsTUFBTSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQztDQUM1QixNQUFNLElBQUksVUFBVSxFQUFFO0NBQ3RCLFFBQVEsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDaEYsT0FBTztDQUNQLE1BQU0sSUFBSSxFQUFFLE1BQU0sS0FBSyxTQUFTO0NBQ2hDLGNBQWMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUVELHNCQUFvQixHQUFHQyx3QkFBc0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDO0NBQy9HLGNBQWMsTUFBTTtDQUNwQixXQUFXLEVBQUU7Q0FDYixRQUFRLE9BQU8sS0FBSyxDQUFDO0NBQ3JCLE9BQU87Q0FDUCxLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxJQUFJLENBQUM7Q0FDZDs7Q0N6REE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsa0JBQWtCLENBQUMsS0FBSyxFQUFFO0NBQ25DLEVBQUUsT0FBTyxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUNqQixVQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDN0M7O0NDVEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUU7Q0FDOUIsRUFBRSxJQUFJLE1BQU0sR0FBR1ksTUFBSSxDQUFDLE1BQU0sQ0FBQztDQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzdCO0NBQ0EsRUFBRSxPQUFPLE1BQU0sRUFBRSxFQUFFO0NBQ25CLElBQUksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUM1QixRQUFRLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUI7Q0FDQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUM3RCxHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0NyQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO0NBQ2hELEVBQUUsT0FBTyxTQUFTLE1BQU0sRUFBRTtDQUMxQixJQUFJLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtDQUN4QixNQUFNLE9BQU8sS0FBSyxDQUFDO0NBQ25CLEtBQUs7Q0FDTCxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7Q0FDbkMsT0FBTyxRQUFRLEtBQUssU0FBUyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzFELEdBQUcsQ0FBQztDQUNKOztDQ2JBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0NBQzdCLEVBQUUsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3ZDLEVBQUUsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Q0FDaEQsSUFBSSxPQUFPLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNyRSxHQUFHO0NBQ0gsRUFBRSxPQUFPLFNBQVMsTUFBTSxFQUFFO0NBQzFCLElBQUksT0FBTyxNQUFNLEtBQUssTUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3ZFLEdBQUcsQ0FBQztDQUNKOztDQ2hCQTtDQUNBLElBQUksWUFBWSxHQUFHLGtEQUFrRDtDQUNyRSxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFDNUI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtDQUM5QixFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQ3RCLElBQUksT0FBTyxLQUFLLENBQUM7Q0FDakIsR0FBRztDQUNILEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxLQUFLLENBQUM7Q0FDMUIsRUFBRSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksU0FBUztDQUMvRCxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQ3hDLElBQUksT0FBTyxJQUFJLENBQUM7Q0FDaEIsR0FBRztDQUNILEVBQUUsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDL0QsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUNoRDs7Q0N4QkE7Q0FDQSxJQUFJLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQztBQUM1QztDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0NBQ2pDLEVBQUUsSUFBSSxPQUFPLElBQUksSUFBSSxVQUFVLEtBQUssUUFBUSxJQUFJLElBQUksSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLENBQUMsRUFBRTtDQUN4RixJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDekMsR0FBRztDQUNILEVBQUUsSUFBSSxRQUFRLEdBQUcsV0FBVztDQUM1QixJQUFJLElBQUksSUFBSSxHQUFHLFNBQVM7Q0FDeEIsUUFBUSxHQUFHLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDN0QsUUFBUSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUMvQjtDQUNBLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQ3hCLE1BQU0sT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzVCLEtBQUs7Q0FDTCxJQUFJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3hDLElBQUksUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUM7Q0FDckQsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHLENBQUM7Q0FDSixFQUFFLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0NBQ25ELEVBQUUsT0FBTyxRQUFRLENBQUM7Q0FDbEIsQ0FBQztBQUNEO0NBQ0E7Q0FDQSxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVE7O0NDcEV4QjtDQUNBLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0FBQzNCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRTtDQUM3QixFQUFFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEVBQUU7Q0FDM0MsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7Q0FDekMsTUFBTSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDcEIsS0FBSztDQUNMLElBQUksT0FBTyxHQUFHLENBQUM7Q0FDZixHQUFHLENBQUMsQ0FBQztBQUNMO0NBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0NBQzNCLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEI7O0NDckJBO0NBQ0EsSUFBSSxVQUFVLEdBQUcsa0dBQWtHLENBQUM7QUFDcEg7Q0FDQTtDQUNBLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQztBQUM5QjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLFNBQVMsTUFBTSxFQUFFO0NBQ2xELEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2xCLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVTtDQUMzQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDcEIsR0FBRztDQUNILEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7Q0FDdkUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNuRixHQUFHLENBQUMsQ0FBQztDQUNMLEVBQUUsT0FBTyxNQUFNLENBQUM7Q0FDaEIsQ0FBQyxDQUFDOztDQ25CRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtDQUNqQyxFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQ3RCLElBQUksT0FBTyxLQUFLLENBQUM7Q0FDakIsR0FBRztDQUNILEVBQUUsT0FBTyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBWSxDQUFDNUMsVUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDeEU7O0NDaEJBO0NBQ0EsSUFBSWlFLFVBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUU7Q0FDdEIsRUFBRSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Q0FDbkQsSUFBSSxPQUFPLEtBQUssQ0FBQztDQUNqQixHQUFHO0NBQ0gsRUFBRSxJQUFJLE1BQU0sSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7Q0FDNUIsRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQ0EsVUFBUSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7Q0FDckU7O0NDZkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7Q0FDL0IsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQztDQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQztDQUNmLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0I7Q0FDQSxFQUFFLE9BQU8sTUFBTSxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQzNDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzFDLEdBQUc7Q0FDSCxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO0NBQ3pEOztDQ25CQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVNDLEtBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtDQUN6QyxFQUFFLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDbEUsRUFBRSxPQUFPLE1BQU0sS0FBSyxTQUFTLEdBQUcsWUFBWSxHQUFHLE1BQU0sQ0FBQztDQUN0RDs7Q0M5QkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Q0FDaEMsRUFBRSxPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNqRDs7Q0NIQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtDQUN4QyxFQUFFLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDO0NBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDaEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07Q0FDMUIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3JCO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNqQyxJQUFJLElBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Q0FDNUQsTUFBTSxNQUFNO0NBQ1osS0FBSztDQUNMLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN6QixHQUFHO0NBQ0gsRUFBRSxJQUFJLE1BQU0sSUFBSSxFQUFFLEtBQUssSUFBSSxNQUFNLEVBQUU7Q0FDbkMsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0NBQ0gsRUFBRSxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztDQUM5QyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7Q0FDN0QsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Q0FDN0M7O0NDakNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0NBQzdCLEVBQUUsT0FBTyxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQzVEOztDQ3ZCQTtDQUNBLElBQUlsQixzQkFBb0IsR0FBRyxDQUFDO0NBQzVCLElBQUlDLHdCQUFzQixHQUFHLENBQUMsQ0FBQztBQUMvQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7Q0FDN0MsRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtDQUNuRCxJQUFJLE9BQU8sdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQzFELEdBQUc7Q0FDSCxFQUFFLE9BQU8sU0FBUyxNQUFNLEVBQUU7Q0FDMUIsSUFBSSxJQUFJLFFBQVEsR0FBR2lCLEtBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDckMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssUUFBUTtDQUMzRCxRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0NBQzNCLFFBQVEsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUVsQixzQkFBb0IsR0FBR0Msd0JBQXNCLENBQUMsQ0FBQztDQUN2RixHQUFHLENBQUM7Q0FDSjs7Q0M5QkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7Q0FDM0IsRUFBRSxPQUFPLFNBQVMsTUFBTSxFQUFFO0NBQzFCLElBQUksT0FBTyxNQUFNLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDcEQsR0FBRyxDQUFDO0NBQ0o7O0NDVEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtDQUNoQyxFQUFFLE9BQU8sU0FBUyxNQUFNLEVBQUU7Q0FDMUIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDakMsR0FBRyxDQUFDO0NBQ0o7O0NDUkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Q0FDeEIsRUFBRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUU7O0NDdkJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFO0NBQzdCO0NBQ0E7Q0FDQSxFQUFFLElBQUksT0FBTyxLQUFLLElBQUksVUFBVSxFQUFFO0NBQ2xDLElBQUksT0FBTyxLQUFLLENBQUM7Q0FDakIsR0FBRztDQUNILEVBQUUsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0NBQ3JCLElBQUksT0FBTyxRQUFRLENBQUM7Q0FDcEIsR0FBRztDQUNILEVBQUUsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7Q0FDaEMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7Q0FDekIsUUFBUSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQy9DLFFBQVEsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzNCLEdBQUc7Q0FDSCxFQUFFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCOztDQ3pCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRTtDQUN2QyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkU7Q0FDQSxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtDQUN4RCxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3ZELEdBQUcsQ0FBQyxDQUFDO0NBQ0wsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0NuQkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0NBQ3JDLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM1QjtDQUNBLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN2QixFQUFFLE9BQU8sTUFBTSxFQUFFLEVBQUU7Q0FDbkIsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztDQUN4QyxHQUFHO0NBQ0gsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNmOztDQ2hCQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0NBQ3hDLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO0NBQ3ZCLElBQUksSUFBSSxZQUFZLEdBQUcsS0FBSyxLQUFLLFNBQVM7Q0FDMUMsUUFBUSxTQUFTLEdBQUcsS0FBSyxLQUFLLElBQUk7Q0FDbEMsUUFBUSxjQUFjLEdBQUcsS0FBSyxLQUFLLEtBQUs7Q0FDeEMsUUFBUSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RDO0NBQ0EsSUFBSSxJQUFJLFlBQVksR0FBRyxLQUFLLEtBQUssU0FBUztDQUMxQyxRQUFRLFNBQVMsR0FBRyxLQUFLLEtBQUssSUFBSTtDQUNsQyxRQUFRLGNBQWMsR0FBRyxLQUFLLEtBQUssS0FBSztDQUN4QyxRQUFRLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEM7Q0FDQSxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLEdBQUcsS0FBSztDQUNwRSxTQUFTLFdBQVcsSUFBSSxZQUFZLElBQUksY0FBYyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDO0NBQ3JGLFNBQVMsU0FBUyxJQUFJLFlBQVksSUFBSSxjQUFjLENBQUM7Q0FDckQsU0FBUyxDQUFDLFlBQVksSUFBSSxjQUFjLENBQUM7Q0FDekMsUUFBUSxDQUFDLGNBQWMsRUFBRTtDQUN6QixNQUFNLE9BQU8sQ0FBQyxDQUFDO0NBQ2YsS0FBSztDQUNMLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssR0FBRyxLQUFLO0NBQ3BFLFNBQVMsV0FBVyxJQUFJLFlBQVksSUFBSSxjQUFjLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUM7Q0FDckYsU0FBUyxTQUFTLElBQUksWUFBWSxJQUFJLGNBQWMsQ0FBQztDQUNyRCxTQUFTLENBQUMsWUFBWSxJQUFJLGNBQWMsQ0FBQztDQUN6QyxRQUFRLENBQUMsY0FBYyxFQUFFO0NBQ3pCLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQztDQUNoQixLQUFLO0NBQ0wsR0FBRztDQUNILEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDWDs7Q0NwQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO0NBQ2hELEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0NBQ2hCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRO0NBQ25DLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRO0NBQ2xDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNO0NBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbkM7Q0FDQSxFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFO0NBQzNCLElBQUksSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQzFFLElBQUksSUFBSSxNQUFNLEVBQUU7Q0FDaEIsTUFBTSxJQUFJLEtBQUssSUFBSSxZQUFZLEVBQUU7Q0FDakMsUUFBUSxPQUFPLE1BQU0sQ0FBQztDQUN0QixPQUFPO0NBQ1AsTUFBTSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEMsTUFBTSxPQUFPLE1BQU0sSUFBSSxLQUFLLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2pELEtBQUs7Q0FDTCxHQUFHO0NBQ0g7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLE9BQU8sTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0NBQ3BDOztDQ2pDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtDQUNwRCxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2pCLEVBQUUsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzNGO0NBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7Q0FDcEUsSUFBSSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLFNBQVMsUUFBUSxFQUFFO0NBQzFELE1BQU0sT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDN0IsS0FBSyxDQUFDLENBQUM7Q0FDUCxJQUFJLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7Q0FDdEUsR0FBRyxDQUFDLENBQUM7QUFDTDtDQUNBLEVBQUUsT0FBTyxVQUFVLENBQUMsTUFBTSxFQUFFLFNBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtDQUNwRCxJQUFJLE9BQU8sZUFBZSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDbEQsR0FBRyxDQUFDLENBQUM7Q0FDTDs7Q0M1QkE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtDQUN2RCxFQUFFLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtDQUMxQixJQUFJLE9BQU8sRUFBRSxDQUFDO0NBQ2QsR0FBRztDQUNILEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtDQUMzQixJQUFJLFNBQVMsR0FBRyxTQUFTLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3JELEdBQUc7Q0FDSCxFQUFFLE1BQU0sR0FBRyxLQUFLLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQztDQUN0QyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Q0FDeEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM1QyxHQUFHO0NBQ0gsRUFBRSxPQUFPLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3BEOztDQzVDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFO0NBQy9ELEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU07Q0FDM0IsTUFBTSxLQUFLLEdBQUcsU0FBUyxJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQztDQUNBLEVBQUUsUUFBUSxTQUFTLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsTUFBTSxHQUFHO0NBQ25ELElBQUksSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtDQUMvQyxNQUFNLE9BQU8sS0FBSyxDQUFDO0NBQ25CLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0NBQ1o7O0NDckJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO0NBQzFCLEVBQUUsT0FBTyxLQUFLLEtBQUssS0FBSyxDQUFDO0NBQ3pCOztDQ1RBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7Q0FDaEQsRUFBRSxJQUFJLEtBQUssR0FBRyxTQUFTLEdBQUcsQ0FBQztDQUMzQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzVCO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtDQUNoQyxNQUFNLE9BQU8sS0FBSyxDQUFDO0NBQ25CLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0NBQ1o7O0NDaEJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO0NBQzlDLEVBQUUsT0FBTyxLQUFLLEtBQUssS0FBSztDQUN4QixNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztDQUM1QyxNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ2pEOztDQ2ZBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVNrQixlQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtDQUNyQyxFQUFFLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDaEQsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDdkQ7O0NDZEE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtDQUNyRCxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLE1BQU0sR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2hEO0NBQ0EsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtDQUN6QyxNQUFNLE9BQU8sSUFBSSxDQUFDO0NBQ2xCLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLEtBQUssQ0FBQztDQUNmOztDQ25CQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLElBQUksR0FBRztDQUNoQjtDQUNBOztDQ1ZBO0NBQ0EsSUFBSUYsVUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksU0FBUyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLQSxVQUFRLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxNQUFNLEVBQUU7Q0FDcEcsRUFBRSxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3pCLENBQUM7O0NDVEQ7Q0FDQSxJQUFJRyxrQkFBZ0IsR0FBRyxHQUFHLENBQUM7QUFDM0I7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtDQUMvQyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNoQixNQUFNLFFBQVEsR0FBR0QsZUFBYTtDQUM5QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtDQUMzQixNQUFNLFFBQVEsR0FBRyxJQUFJO0NBQ3JCLE1BQU0sTUFBTSxHQUFHLEVBQUU7Q0FDakIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ3BCO0NBQ0EsRUFBRSxJQUFJLFVBQVUsRUFBRTtDQUNsQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7Q0FDckIsSUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUM7Q0FDakMsR0FBRztDQUNILE9BQU8sSUFBSSxNQUFNLElBQUlDLGtCQUFnQixFQUFFO0NBQ3ZDLElBQUksSUFBSSxHQUFHLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDakQsSUFBSSxJQUFJLEdBQUcsRUFBRTtDQUNiLE1BQU0sT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDN0IsS0FBSztDQUNMLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztDQUNyQixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUM7Q0FDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUM7Q0FDeEIsR0FBRztDQUNILE9BQU87Q0FDUCxJQUFJLElBQUksR0FBRyxRQUFRLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztDQUNsQyxHQUFHO0NBQ0gsRUFBRSxLQUFLO0NBQ1AsRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtDQUMzQixJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Q0FDNUIsUUFBUSxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDdEQ7Q0FDQSxJQUFJLEtBQUssR0FBRyxDQUFDLFVBQVUsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDcEQsSUFBSSxJQUFJLFFBQVEsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO0NBQzNDLE1BQU0sSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUNsQyxNQUFNLE9BQU8sU0FBUyxFQUFFLEVBQUU7Q0FDMUIsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxRQUFRLEVBQUU7Q0FDMUMsVUFBVSxTQUFTLEtBQUssQ0FBQztDQUN6QixTQUFTO0NBQ1QsT0FBTztDQUNQLE1BQU0sSUFBSSxRQUFRLEVBQUU7Q0FDcEIsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQzVCLE9BQU87Q0FDUCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDekIsS0FBSztDQUNMLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0NBQ3BELE1BQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO0NBQzNCLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUM1QixPQUFPO0NBQ1AsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pCLEtBQUs7Q0FDTCxHQUFHO0NBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztDQUNoQjs7Q0NsRUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLFNBQVMsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7Q0FDakMsRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDbkY7O0NDMUJBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxNQUFNLE9BQU8sQ0FBQztDQUNkO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFO0NBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO0NBQ2xELFFBQVEsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3ZDO0NBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDdEQsUUFBUSxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDM0M7Q0FDQSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztDQUNoRCxRQUFRLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUNyQztDQUNBLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Q0FDekIsR0FBRztBQUNIO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsTUFBTSxHQUFHO0NBQ1gsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDNUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkY7Q0FDQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0NBQ3hFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNsRCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMzQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNEO0NBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDeEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZEO0NBQ0EsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckM7Q0FDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUNuQixHQUFHO0NBQ0gsQ0FBQztBQUNEO0NBQ0EsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7QUFDekI7Q0FDQSxPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUM5QjtDQUNBLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTTs7Q0N4Q3JCO0NBQ0E7Q0FDQTtDQUNBLE1BQU0sSUFBSSxDQUFDO0NBQ1gsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFO0NBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2hDO0NBQ0EsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHQyxLQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdEQ7Q0FDQSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUNoQixHQUFHO0FBQ0g7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLElBQUksR0FBRztDQUNUO0NBQ0EsSUFBSSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDN0QsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0NBQ2hDLElBQUksSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRDtDQUNBLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztDQUNyRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDakMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCO0NBQ0EsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7Q0FDbEIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztDQUNuQyxJQUFJLElBQUksTUFBTSxHQUFHO0NBQ2pCLE1BQU0sU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztDQUN6QyxNQUFNLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQ25ELEtBQUssQ0FBQztBQUNOO0NBQ0E7Q0FDQSxJQUFJQyxPQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEtBQUs7Q0FDNUM7Q0FDQSxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSztDQUNwRCxVQUFVLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUM7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxVQUFVLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUztDQUNqRCxZQUFZLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDeEIsZUFBZSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDO0NBQzNFLFlBQVksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDNUM7Q0FDQTtDQUNBLFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO0FBQzVGO0NBQ0E7Q0FDQSxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDekQ7Q0FDQTtDQUNBLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0NBQ3BELFlBQVksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU87Q0FDdkMsY0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO0NBQy9DLGNBQWMsSUFBSSxDQUFDLFNBQVM7Q0FDNUIsYUFBYSxDQUFDO0FBQ2Q7Q0FDQSxZQUFZLElBQUksRUFBRTtDQUNsQixjQUFjLEVBQUUsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0NBQ3RDO0NBQ0E7Q0FDQSxjQUFjLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyw2Q0FBNkMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZHLFdBQVc7Q0FDWCxPQUFPLENBQUMsQ0FBQztDQUNULEtBQUssQ0FBQyxDQUFDO0FBQ1A7Q0FDQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLEdBQUc7QUFDSDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Q0FDeEIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sS0FBSztDQUM1QyxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFDckM7Q0FDQSxNQUFNLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLEtBQUssRUFBRTtDQUMvQyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Q0FDaEMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQztDQUNqQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHO0NBQ3JELFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNuQztDQUNBLFlBQVksTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQzNDLE9BQU8sQ0FBQztBQUNSO0NBQ0EsTUFBTSxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVc7Q0FDakMsUUFBUSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0NBQ3hELE9BQU8sQ0FBQztBQUNSO0NBQ0EsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDekQsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDakIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLEtBQUssQ0FBQyxDQUFDO0NBQ1AsR0FBRztBQUNIO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7Q0FDM0IsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUN2RCxHQUFHO0FBQ0g7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtDQUN6QixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3JELEdBQUc7QUFDSDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0NBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDN0I7Q0FDQTtDQUNBLElBQUksSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEM7Q0FDQSxJQUFJLElBQUlDLFVBQVEsR0FBR0MsTUFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDeEQsSUFBSSxJQUFJLFFBQVEsR0FBR0MsUUFBUztDQUM1QixNQUFNRixVQUFRO0NBQ2QsTUFBTTtDQUNOLFFBQVEsU0FBUyxFQUFFO0NBQ25CLFVBQVUsT0FBTyxFQUFFRCxPQUFRO0NBQzNCLFNBQVM7Q0FDVCxPQUFPO0NBQ1AsS0FBSyxDQUFDO0FBQ047Q0FDQSxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFCLEdBQUc7Q0FDSCxDQUFDO0FBQ0Q7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksQ0FBQyxTQUFTLEdBQUcsK0NBQStDLENBQUM7QUFDakU7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksQ0FBQyxTQUFTLEdBQUc7Q0FDakIsRUFBRSxNQUFNLEVBQUU7Q0FDVixJQUFJLE1BQU0sRUFBRTtDQUNaLE1BQU0saUVBQWlFO0NBQ3ZFLFFBQVEsMkVBQTJFO0NBQ25GLFFBQVEsNEZBQTRGO0NBQ3BHLE1BQU0sSUFBSTtDQUNWLEtBQUs7Q0FDTCxJQUFJLE1BQU0sRUFBRTtDQUNaLE1BQU0sZ0VBQWdFO0NBQ3RFLFFBQVEsNkRBQTZEO0NBQ3JFLFVBQVUsWUFBWTtDQUN0QixnQkFBZ0IseUNBQXlDO0NBQ3pELGtCQUFrQiw0QkFBNEI7Q0FDOUMsZ0JBQWdCLGdCQUFnQjtDQUNoQyxrQkFBa0Isd0JBQXdCO0NBQzFDLGdCQUFnQixXQUFXO0NBQzNCLGVBQWUsMENBQTBDO0NBQ3pELGVBQWUsMkNBQTJDO0NBQzFELFFBQVEsUUFBUTtDQUNoQixRQUFRLHdEQUF3RDtDQUNoRSxVQUFVLDZDQUE2QztDQUN2RCxZQUFZLDBCQUEwQjtDQUN0QyxVQUFVLGdCQUFnQjtDQUMxQixZQUFZLGlCQUFpQjtDQUM3QixVQUFVLFdBQVc7Q0FDckIsV0FBVyxxREFBcUQ7Q0FDaEUsVUFBVSxvQ0FBb0M7Q0FDOUMsWUFBWSx1QkFBdUI7Q0FDbkMsVUFBVSxnQkFBZ0I7Q0FDMUIsWUFBWSxtQkFBbUI7Q0FDL0IsVUFBVSxTQUFTO0NBQ25CLFFBQVEsTUFBTTtDQUNkLE1BQU0sV0FBVztDQUNqQixLQUFLO0NBQ0wsSUFBSSxLQUFLLEVBQUU7Q0FDWCxNQUFNLG9DQUFvQztDQUMxQyxRQUFRLGdEQUFnRDtDQUN4RCxNQUFNLElBQUk7Q0FDVixRQUFRLHFDQUFxQztDQUM3QyxVQUFVLDREQUE0RDtDQUN0RSxZQUFZLCtEQUErRDtDQUMzRSxjQUFjLDJEQUEyRDtDQUN6RSxpQkFBaUIseUJBQXlCO0NBQzFDLGlCQUFpQixpQkFBaUI7Q0FDbEMsaUJBQWlCLHFDQUFxQztDQUN0RCxnQkFBZ0IsbUJBQW1CO0NBQ25DLGNBQWMsTUFBTTtDQUNwQixZQUFZLE9BQU87Q0FDbkIsWUFBWSw0REFBNEQ7Q0FDeEUsa0JBQWtCLHdDQUF3QztDQUMxRCxjQUFjLDBDQUEwQztDQUN4RCxZQUFZLE1BQU07Q0FDbEIsWUFBWSx1RUFBdUU7Q0FDbkYsaUJBQWlCLFNBQVM7Q0FDMUIsb0JBQW9CLCtDQUErQztDQUNuRSxvQkFBb0IseUNBQXlDO0NBQzdELGlCQUFpQixxQkFBcUI7Q0FDdEMsY0FBYyxrRkFBa0Y7Q0FDaEcsWUFBWSxRQUFRO0NBQ3BCLFlBQVksa0VBQWtFO0NBQzlFLGNBQWMscURBQXFEO0NBQ25FLFlBQVksTUFBTTtDQUNsQixZQUFZLHNFQUFzRTtDQUNsRixjQUFjLDBEQUEwRDtDQUN4RSxpQkFBaUIsMEJBQTBCO0NBQzNDLGlCQUFpQixrQkFBa0I7Q0FDbkMsaUJBQWlCLHFDQUFxQztDQUN0RCxnQkFBZ0IsNkJBQTZCO0NBQzdDLGNBQWMsTUFBTTtDQUNwQixZQUFZLFFBQVE7Q0FDcEIsVUFBVSxRQUFRO0NBQ2xCLFFBQVEsV0FBVztDQUNuQixNQUFNLFFBQVE7Q0FDZCxLQUFLO0NBQ0wsSUFBSSxNQUFNLEVBQUU7Q0FDWixNQUFNLFlBQVk7Q0FDbEIsS0FBSztDQUNMLEdBQUc7Q0FDSCxDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLElBQUksRUFBRTtDQUNwQyxFQUFFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQjtDQUNBLEVBQUUsT0FBTztDQUNULElBQUksUUFBUSxFQUFFLElBQUk7Q0FDbEIsSUFBSSxNQUFNLEVBQUU7Q0FDWixNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQzlDLE1BQU0sT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7Q0FDNUIsTUFBTSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztDQUMxQixNQUFNLFFBQVEsRUFBRSxFQUFFO0NBQ2xCLE1BQU0sYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7Q0FDeEMsTUFBTSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztDQUN0QyxLQUFLO0NBQ0wsSUFBSSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUk7Q0FDbkM7Q0FDQSxNQUFNLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Q0FDbkQsU0FBUyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzVDO0NBQ0E7Q0FDQSxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDMUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdDO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsTUFBTSxJQUFJLEtBQUssSUFBSSxtQ0FBbUMsQ0FBQztDQUN2RCxNQUFNLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRDtDQUNBLE1BQU0sT0FBTztDQUNiLFFBQVEsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7Q0FDM0IsUUFBUSxTQUFTLEVBQUUsSUFBSTtDQUN2QixRQUFRLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO0NBQ3pCLFFBQVEsTUFBTSxFQUFFLElBQUk7Q0FDcEIsUUFBUSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztDQUNqQyxRQUFRLFdBQVcsRUFBRSxTQUFTO0NBQzlCLFFBQVEsYUFBYSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztDQUMzQyxRQUFRLFNBQVMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7Q0FDdkMsUUFBUSxXQUFXLEVBQUUsRUFBRTtDQUN2QixRQUFRLFlBQVksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0NBQ25DLE9BQU8sQ0FBQztDQUNSLEtBQUssQ0FBQztDQUNOLEdBQUcsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUNGO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLENBQUMsT0FBTyxHQUFHO0NBQ2YsRUFBRSxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUUsUUFBUSxFQUFFO0NBQ25DLElBQUksSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0FBQzVDO0NBQ0EsSUFBSUEsT0FBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFO0NBQy9DLE1BQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0NBQ3ZCLE1BQU0sSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCO0NBQ0E7Q0FDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVztDQUNoQyxTQUFTLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNqRDtDQUNBO0NBQ0EsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0M7Q0FDQTtDQUNBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25EO0NBQ0E7Q0FDQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUMxQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDaEMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxRCxPQUFPLENBQUM7QUFDUjtDQUNBLE1BQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDN0I7Q0FDQTtDQUNBLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDakUsU0FBUyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3RTtDQUNBLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDdkI7Q0FDQSxNQUFNLE9BQU8sSUFBSSxDQUFDO0NBQ2xCLEtBQUssQ0FBQyxDQUFDO0FBQ1A7Q0FDQSxJQUFJLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLEdBQUc7Q0FDSCxFQUFDO0FBQ0Q7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBLElBQUksQ0FBQyxLQUFLLEdBQUc7Q0FDYixFQUFFLE1BQU0sRUFBRSxTQUFTLElBQUksRUFBRSxRQUFRLEVBQUU7Q0FDbkMsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Q0FDcEIsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbkI7Q0FDQTtDQUNBLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSztDQUMzQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN2QyxLQUFLLENBQUMsQ0FBQztBQUNQO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLO0NBQzNCLE1BQU0sTUFBTSxHQUFHRCxLQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3BDLEtBQUssQ0FBQyxDQUFDO0FBQ1A7Q0FDQTtDQUNBLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTTtDQUN2QixNQUFNLEtBQUssR0FBR0ssTUFBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQ7Q0FDQSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUdDLE9BQVEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3REO0NBQ0EsSUFBSSxPQUFPLE1BQU0sQ0FBQztDQUNsQixHQUFHO0NBQ0gsRUFBQztBQUNEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxJQUFJLENBQUMsT0FBTyxHQUFHO0NBQ2YsRUFBRSxJQUFJLEVBQUUsRUFBRTtDQUNWLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO0NBQzNCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQjtDQUM5QixFQUFFLElBQUksRUFBRSxRQUFRO0NBQ2hCLEVBQUUsS0FBSyxFQUFFLEVBQUU7Q0FDWCxFQUFFLFFBQVEsRUFBRSxFQUFFO0NBQ2QsRUFBRSxVQUFVLEVBQUUsRUFBRTtDQUNoQixFQUFFLFFBQVEsRUFBRSxFQUFFO0NBQ2QsRUFBRSxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQzVCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQjtDQUNuQyxFQUFFLGFBQWEsRUFBRSxPQUFPO0NBQ3hCLEVBQUUsaUJBQWlCLEVBQUUsR0FBRztDQUN4QixFQUFFLGdCQUFnQixFQUFFLEdBQUc7Q0FDdkIsRUFBRSxXQUFXLEVBQUUsb0JBQW9CO0NBQ25DLEVBQUUsYUFBYSxFQUFFLE9BQU87Q0FDeEIsRUFBRSxjQUFjLEVBQUU7Q0FDbEIsSUFBSSxJQUFJLEVBQUUsU0FBUztDQUNuQixJQUFJLEtBQUssRUFBRSxNQUFNO0NBQ2pCLElBQUksR0FBRyxFQUFFLFNBQVM7Q0FDbEIsR0FBRztDQUNILEVBQUUsYUFBYSxFQUFFLGdCQUFnQjtDQUNqQyxFQUFFLE9BQU8sRUFBRTtDQUNYLElBQUksT0FBTyxFQUFFLEVBQUU7Q0FDZixJQUFJLE1BQU0sRUFBRSxFQUFFO0NBQ2QsSUFBSSxHQUFHLEVBQUUsRUFBRTtDQUNYLElBQUksUUFBUSxFQUFFLEVBQUU7Q0FDaEIsSUFBSSxLQUFLLEVBQUUsRUFBRTtDQUNiLElBQUksSUFBSSxFQUFFLEVBQUU7Q0FDWixJQUFJLFNBQVMsRUFBRSxFQUFFO0NBQ2pCLElBQUksT0FBTyxFQUFFLEVBQUU7Q0FDZixJQUFJLFVBQVUsRUFBRSxFQUFFO0NBQ2xCLElBQUksR0FBRyxFQUFFLEVBQUU7Q0FDWCxJQUFJLElBQUksRUFBRSxFQUFFO0NBQ1osR0FBRztDQUNILEVBQUUsU0FBUyxFQUFFO0NBQ2IsSUFBSSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDakQsSUFBSSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDakQsSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDL0MsSUFBSSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Q0FDakQsR0FBRztDQUNILEVBQUUsR0FBRyxFQUFFLEtBQUs7Q0FDWixFQUFFLE1BQU0sRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7Ozs7Ozs7In0=
