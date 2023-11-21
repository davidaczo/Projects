/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
} from '@material-ui/core';
import i18next from 'i18next';
import FlagIconFactory from 'react-flag-icon-css';
import LanguageIcon from '@material-ui/icons/Language';

const languages = [
    {
        id: 0,
        code: 'gb',
        name: 'English',
        country_code: 'gb',
    },
    {
        id: 1,
        code: 'hu',
        name: 'Hungarian',
        country_code: 'hu',
    },
];

export const LanguagePickerIcon = ({}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const FlagIcon = FlagIconFactory(React, { useCssModules: false });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        i18next.changeLanguage(languages[index].code);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                aria-label="open drawer"
                color="inherit"
                edge="end"
                // eslint-disable-next-line react/jsx-no-bind
                onClick={handleClick}
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
                anchorEl={anchorEl}
                id="lock-menu"
                // eslint-disable-next-line react/jsx-no-bind
                onClose={handleClose}
                open={open}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuList>
                    {languages.map((lang, index) => (
                        <MenuItem
                            key={lang.id}
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={(event) => handleMenuItemClick(event, index)}
                            selected={index === selectedIndex}
                        >
                            <ListItemIcon>
                                <FlagIcon code={lang.code} />
                            </ListItemIcon>
                            <ListItemText>{lang.name}</ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
};
