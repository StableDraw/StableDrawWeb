import React, {ReactElement, useState, useRef} from 'react';
import cl from './ToolTipComponent.module.css';
import { CSSTransition } from 'react-transition-group';

const transitionClasses = {
    enter: cl.exampleEnter,
    enterActive: cl.exampleEnterActive,
    exit: cl.exampleExit,
    exitActive: cl.exampleExitActive,
};
const transitionClasses1 = {
    enter: cl.exampleEnter,
    enterActive: cl.exampleEnterActive,
    exit: cl.exampleExit,
    exitActive: cl.exampleExitActive,
};
const transitionClasses2 = {
    enter: cl.exampleEnter,
    enterActive: cl.exampleEnterActive,
    exit: cl.exampleExit,
    exitActive: cl.exampleExitActive,
};
const ToolTipComponent = ({children, text, customClass}) => {
    const [showToolTip, setShowToolTip] = useState(false);
    const refSetTimeout = useRef();
    const toolTipClasses = customClass ? `${cl.tooltip} ${customClass}` : `${cl.tooltip}`;
    const toolTipClasses1 = customClass ? `${cl.tooltip1} ${customClass}` : `${cl.tooltip1}`;
    const toolTipClasses2 = customClass ? `${cl.tooltip2} ${customClass}` : `${cl.tooltip2}`;
    const onMouseEnterHandler = () => {
        refSetTimeout.current = setTimeout(() => {
            setShowToolTip(true);
        }, 750);
    };

    const onMouseLeaveHandler = () => {
        clearTimeout(refSetTimeout.current);
        setShowToolTip(false);
    };


    return (
        <div className={cl.container} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
            {children}
            <CSSTransition in={showToolTip} timeout={750} classNames={transitionClasses} unmountOnExit>
                <div className={toolTipClasses}>{text}</div>
            </CSSTransition>
            <CSSTransition in={showToolTip} timeout={750} classNames={transitionClasses1} unmountOnExit>
                <div className={toolTipClasses1}>{text}</div>
            </CSSTransition>
            <CSSTransition in={showToolTip} timeout={750} classNames={transitionClasses2} unmountOnExit>
                <div className={toolTipClasses2}>{text}</div>
            </CSSTransition>
        </div>
    );
};

export default ToolTipComponent;