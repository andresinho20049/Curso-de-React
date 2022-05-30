interface IButtonLoginProps {
    type?: "button" | "reset" | "submit";
    label: string;
    onClick: () => void;
}

export const ButtonLogin: React.FC<IButtonLoginProps> = ({ type, onClick, label}) => {
    return (
        <button type={type} onClick={onClick}>
                    {label}
                </button>
    );
}