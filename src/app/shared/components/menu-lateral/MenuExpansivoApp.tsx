import { Divider, Icon, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";

export interface IMenuOptionProps {
    text: string;
    onClick: () => void;
    disabled?: boolean
    dividerAfter?: boolean;
}

interface IMenuExpansivoProps {
    iconMenu: string;
    textMenu: string;
    selected?: string;
    options: IMenuOptionProps[];
}

export const MenuExpansivoApp = ({
    iconMenu,
    textMenu,

    selected,
    options
}: IMenuExpansivoProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: MouseEvent<HTMLElement>,
        handleClick: () => void
    ) => {
        setAnchorEl(null);
        handleClick();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ListItemButton onClick={handleClickListItem}>
                <ListItemIcon>
                    <Icon color="primary">{iconMenu}</Icon>
                </ListItemIcon>
                <ListItemText>
                    <Typography variant="button">
                        {textMenu}
                    </Typography>
                </ListItemText>
            </ListItemButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {options.map((option) => (
                    <div key={option.text}>
                        <MenuItem
                            selected={option.text === selected}
                            disabled={option.disabled}
                            onClick={(event) => handleMenuItemClick(event, option.onClick)}
                        >
                            {option.text}
                        </MenuItem>
                        {option.dividerAfter && (
                            <Divider />
                        )}
                    </div>
                ))}
            </Menu>
        </>
    );
}