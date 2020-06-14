import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function Header() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Elenco do Clube
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;