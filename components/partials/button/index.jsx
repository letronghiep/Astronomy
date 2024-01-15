"use client";
import React from "react";
import Link from "next/link";
import styles from './button.module.css';

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disabled = false,
    rounded,
    circle,
    small,
    large,
    children,
    onClick,
    leftIcon,
    rightIcon,
    centerIcon,
    ...passProps
}) {
    let Comp = 'button';

    const props = { onClick, ...passProps };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'undefined') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    
    const wrapperStyles = [
        styles.wrapper,
        primary && styles.primary,
        outline && styles.outline,
        circle && styles.circle,
        small && styles.small,
        large && styles.large,
        text && styles.text,
        disabled && styles.disabled,
        rounded && styles.rounded,
        leftIcon && styles.leftIcon,
        rightIcon && styles.rightIcon,
        centerIcon && styles.centerIcon,
    ].filter(Boolean).join(' ');

    if(children) {
        return (
            <Comp className={wrapperStyles} {...props}>
                {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
                <span className={styles.title}>{children}</span>
                {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
            </Comp>
        );
    }else {
        return (
            <Comp className={wrapperStyles} {...props}>
                {centerIcon && <span className={styles.icon}>{centerIcon}</span>}
            </Comp>
        );
    }
}

export default Button;