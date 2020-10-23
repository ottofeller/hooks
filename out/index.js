'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var react__default = _interopDefault(react);
var reactDom = _interopDefault(require('react-dom'));

// Run a callback if a click happens outside of the desired area
const useClickOutsideEffect = (params) => {
    const handleClickOutsideDatesPopup = react.useCallback(event => {
        if (params.toggleNodeRef.current &&
            params.nodeRef.current &&
            !params.toggleNodeRef.current.contains(event.target) &&
            !params.nodeRef.current.contains(event.target)) {
            params.callback();
        }
    }, [params]);
    react.useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }
        document.addEventListener('click', handleClickOutsideDatesPopup, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideDatesPopup, true);
        };
    }, [handleClickOutsideDatesPopup]);
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var useSSR = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Device;
(function (Device) {
    Device["Browser"] = "browser";
    Device["Server"] = "server";
    Device["Native"] = "native";
})(Device = exports.Device || (exports.Device = {}));
var Browser = Device.Browser, Server = Device.Server, Native = Device.Native;
var canUseDOM = !!(typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement);
var canUseNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative';
var device = canUseNative ? Native : canUseDOM ? Browser : Server;
var SSRObject = {
    isBrowser: device === Browser,
    isServer: device === Server,
    isNative: device === Native,
    device: device,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: device === Browser && !!window.addEventListener,
    canUseViewport: device === Browser && !!window.screen,
};
// TODO: instead of this, do a polyfill for `Object.assign` https://www.npmjs.com/package/es6-object-assign
var assign = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, obj) { return (__assign(__assign({}, acc), obj)); }, {});
};
var values = function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); };
var toArrayObject = function () { return assign((values(SSRObject), SSRObject)); };
var useSSRObject = toArrayObject();
exports.weAreServer = function () {
    SSRObject.isServer = true;
    useSSRObject = toArrayObject();
};
exports.useSSR = function () { return useSSRObject; };
exports.default = exports.useSSR;
});

unwrapExports(useSSR);
var useSSR_1 = useSSR.Device;
var useSSR_2 = useSSR.weAreServer;
var useSSR_3 = useSSR.useSSR;

var usePortal_1 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });


var use_ssr_1 = __importDefault(useSSR);
exports.errorMessage1 = 'You must either add a `ref` to the element you are interacting with or pass an `event` to openPortal(e) or togglePortal(e).';
function usePortal(_a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.closeOnOutsideClick, closeOnOutsideClick = _b === void 0 ? true : _b, _c = _a.closeOnEsc, closeOnEsc = _c === void 0 ? true : _c, bindTo = _a.bindTo, // attach the portal to this node in the DOM
    _d = _a.isOpen, // attach the portal to this node in the DOM
    defaultIsOpen = _d === void 0 ? false : _d, onOpen = _a.onOpen, onClose = _a.onClose, onPortalClick = _a.onPortalClick, eventHandlers = __rest(_a, ["closeOnOutsideClick", "closeOnEsc", "bindTo", "isOpen", "onOpen", "onClose", "onPortalClick"]);
    var _e = use_ssr_1.default(), isServer = _e.isServer, isBrowser = _e.isBrowser;
    var _f = react__default.useState(defaultIsOpen), isOpen = _f[0], makeOpen = _f[1];
    // we use this ref because `isOpen` is stale for handleOutsideMouseClick
    var open = react__default.useRef(isOpen);
    var setOpen = react__default.useCallback(function (v) {
        // workaround to not have stale `isOpen` in the handleOutsideMouseClick
        open.current = v;
        makeOpen(v);
    }, []);
    var targetEl = react__default.useRef(); // this is the element you are clicking/hovering/whatever, to trigger opening the portal
    var portal = react__default.useRef(isBrowser ? document.createElement('div') : null);
    react__default.useEffect(function () {
        if (isBrowser && !portal.current)
            portal.current = document.createElement('div');
    }, [isBrowser, portal]);
    var elToMountTo = react__default.useMemo(function () {
        if (isServer)
            return;
        return (bindTo && reactDom.findDOMNode(bindTo)) || document.body;
    }, [isServer, bindTo]);
    var createCustomEvent = function (e) {
        if (!e)
            return { portal: portal, targetEl: targetEl, event: e };
        var event = e || {};
        if (event.persist)
            event.persist();
        event.portal = portal;
        event.targetEl = targetEl;
        event.event = e;
        var currentTarget = e.currentTarget;
        if (!targetEl.current && currentTarget && currentTarget !== document)
            targetEl.current = event.currentTarget;
        return event;
    };
    // this should handle all eventHandlers like onClick, onMouseOver, etc. passed into the config
    var customEventHandlers = Object
        .entries(eventHandlers)
        .reduce(function (acc, _a) {
        var handlerName = _a[0], eventHandler = _a[1];
        acc[handlerName] = function (event) {
            if (isServer)
                return;
            eventHandler(createCustomEvent(event));
        };
        return acc;
    }, {});
    var openPortal = react__default.useCallback(function (e) {
        if (isServer)
            return;
        var customEvent = createCustomEvent(e);
        // for some reason, when we don't have the event argument, there
        // is a weird race condition. Would like to see if we can remove
        // setTimeout, but for now this works
        if (targetEl.current == null) {
            setTimeout(function () { return setOpen(true); }, 0);
            throw Error(exports.errorMessage1);
        }
        if (onOpen)
            onOpen(customEvent);
        setOpen(true);
    }, [isServer, portal, setOpen, targetEl, onOpen]);
    var closePortal = react__default.useCallback(function (e) {
        if (isServer)
            return;
        var customEvent = createCustomEvent(e);
        if (onClose && open.current)
            onClose(customEvent);
        if (open.current)
            setOpen(false);
    }, [isServer, onClose, setOpen]);
    var togglePortal = react__default.useCallback(function (e) {
        return open.current ? closePortal(e) : openPortal(e);
    }, [closePortal, openPortal]);
    var handleKeydown = react__default.useCallback(function (e) {
        return (e.key === 'Escape' && closeOnEsc) ? closePortal(e) : undefined;
    }, [closeOnEsc, closePortal]);
    var handleOutsideMouseClick = react__default.useCallback(function (e) {
        var containsTarget = function (target) { return target.current.contains(e.target); };
        if (containsTarget(portal) || e.button !== 0 || !open.current || containsTarget(targetEl))
            return;
        if (closeOnOutsideClick)
            closePortal(e);
    }, [isServer, closePortal, closeOnOutsideClick, portal]);
    var handleMouseDown = react__default.useCallback(function (e) {
        if (isServer || !(portal.current instanceof HTMLElement))
            return;
        var customEvent = createCustomEvent(e);
        if (portal.current.contains(customEvent.target) && onPortalClick)
            onPortalClick(customEvent);
        handleOutsideMouseClick(e);
    }, [handleOutsideMouseClick]);
    // used to remove the event listeners on unmount
    var eventListeners = react__default.useRef({});
    react__default.useEffect(function () {
        if (isServer)
            return;
        if (!(elToMountTo instanceof HTMLElement) || !(portal.current instanceof HTMLElement))
            return;
        // TODO: eventually will need to figure out a better solution for this.
        // Surely we can find a way to map onScroll/onWheel -> scroll/wheel better,
        // but for all other event handlers. For now this works.
        var eventHandlerMap = {
            onScroll: 'scroll',
            onWheel: 'wheel',
        };
        var node = portal.current;
        elToMountTo.appendChild(portal.current);
        // handles all special case handlers. Currently only onScroll and onWheel
        Object.entries(eventHandlerMap).forEach(function (_a) {
            var handlerName = _a[0] /* onScroll */, eventListenerName = _a[1] /* scroll */;
            if (!eventHandlers[handlerName])
                return;
            eventListeners.current[handlerName] = function (e) { return eventHandlers[handlerName](createCustomEvent(e)); };
            document.addEventListener(eventListenerName, eventListeners.current[handlerName]);
        });
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('mousedown', handleMouseDown);
        return function () {
            // handles all special case handlers. Currently only onScroll and onWheel
            Object.entries(eventHandlerMap).forEach(function (_a) {
                var handlerName = _a[0], eventListenerName = _a[1];
                if (!eventHandlers[handlerName])
                    return;
                document.removeEventListener(eventListenerName, eventListeners.current[handlerName]);
                delete eventListeners.current[handlerName];
            });
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('mousedown', handleMouseDown);
            elToMountTo.removeChild(node);
        };
    }, [isServer, handleOutsideMouseClick, handleKeydown, elToMountTo, portal]);
    var Portal = react__default.useCallback(function (_a) {
        var children = _a.children;
        if (portal.current != null)
            return reactDom.createPortal(children, portal.current);
        return null;
    }, [portal]);
    return Object.assign([openPortal, closePortal, open.current, Portal, togglePortal, targetEl, portal], __assign(__assign({ isOpen: open.current, openPortal: openPortal, ref: targetEl, closePortal: closePortal,
        togglePortal: togglePortal,
        Portal: Portal, portalRef: portal }, customEventHandlers), { bind: __assign({ ref: targetEl }, customEventHandlers) }));
}
exports.default = usePortal;

});

var usePortal = unwrapExports(usePortal_1);
var usePortal_2 = usePortal_1.errorMessage1;

const useAction = (fn, args) => react.useCallback(() => fn(args), [fn, args]);
function usePopup(initial = false) {
    const [isShown, setIsShown] = react.useState(initial);
    const { Portal } = usePortal();
    const Popup = react.useCallback((props) => isShown ? react.createElement(Portal, null, props.children) : null, [Portal, isShown]);
    return {
        hide: useAction(setIsShown, false),
        isShown,
        Popup,
        show: useAction(setIsShown, true),
        toggle: useAction(setIsShown, !isShown),
    };
}

const useAction$1 = (fn, args) => react.useCallback(() => fn(args), [fn, args]);
function useToggle(initial = false) {
    const [isOn, setIsOn] = react.useState(initial);
    return {
        isOn: isOn,
        toggle: useAction$1(setIsOn, !isOn),
        toggleOff: useAction$1(setIsOn, false),
        toggleOn: useAction$1(setIsOn, true),
    };
}

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = react.useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (error) { }
    };
    return [storedValue, setValue];
};

const axios = require('axios');
const useUpload = (params) => {
    const [isUploading, setStateIsUploading] = react.useState(false);
    const [isUploadError, setIsUploadError] = react.useState(false);
    const upload = react.useCallback(async (file) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const config = {
            cancelToken: source.token,
            onUploadProgress: progressEvent => {
                if (typeof params.setUploadProgress === 'function') {
                    params.setUploadProgress(Math.round(progressEvent.loaded * 100 / progressEvent.total));
                }
            },
        };
        const data = new FormData();
        data.append(params.fileFieldName || 'file', file[0]);
        if (typeof params.onStart === 'function') {
            params.onStart(source);
        }
        try {
            setIsUploadError(null);
            setStateIsUploading(true);
            const response = await axios.put(params.urlOrPath, data, config);
            if (typeof params.onSuccess === 'function') {
                params.onSuccess(response);
            }
            return response;
        }
        catch (error) {
            setIsUploadError(error);
            if (typeof params.onError === 'function') {
                params.onError(error);
            }
        }
        finally {
            setStateIsUploading(false);
            if (typeof params.onFinish === 'function') {
                params.onFinish();
            }
        }
    }, []);
    return { isUploading, isUploadError, upload };
};

exports.useClickOutsideEffect = useClickOutsideEffect;
exports.useLocalStorage = useLocalStorage;
exports.usePopup = usePopup;
exports.useToggle = useToggle;
exports.useUpload = useUpload;
