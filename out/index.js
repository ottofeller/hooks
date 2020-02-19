'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

const useAction = (fn, args) => react.useCallback(() => fn(args), [fn, args]);
function usePopup(initial = false) {
    const [isShown, setIsShown] = react.useState(initial);
    return {
        hide: useAction(setIsShown, false),
        isShown: isShown,
        show: useAction(setIsShown, true),
        toggle: useAction(setIsShown, !isShown),
    };
}

exports.usePopup = usePopup;
