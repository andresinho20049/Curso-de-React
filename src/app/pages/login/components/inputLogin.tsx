import React from "react";

interface IInputLoginProps {
    label: string;
    value: string;
    type?: string;

    onChange: (value: string) => void;
    onPressEnter?: () => void;
}

export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
    return (
        <div>
            <label>
                <span>{props.label}</span>
                <input ref={ref} value={props.value} onChange={e => props.onChange(e.target.value)} type={props.type ?? 'text'}
                    onKeyDown={e => e.key === 'Enter' && props.onPressEnter ? props.onPressEnter() : undefined} />
            </label>
        </div>
    );
});