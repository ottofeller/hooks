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
    const Popup = react.useCallback((props) => isShown ? props.children : null, [isShown]);
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

exports.useClickOutsideEffect = useClickOutsideEffect;
exports.usePopup = usePopup;
exports.useToggle = useToggle;
