'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

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

exports.useClickOutsideEffect = useClickOutsideEffect;
exports.usePopup = usePopup;
