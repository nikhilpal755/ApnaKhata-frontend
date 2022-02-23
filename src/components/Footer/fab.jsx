
import React from 'react';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useLocation } from 'react-router-dom';

import AddClient from '../Invoice/addClient';

export default function FabFooter() {

    const location = useLocation();
    const mainStylesButton = {backgroundColor : '#4f3e75'};

    const [open, setOpen] = React.useState(false);
    return (
        <>

            <Fab
                mainButtonStyles={mainStylesButton}
                icon={<AddIcon />}
                alwaysShowTitle={true}
            >
                <Action
                 text='New Customer'
                 onClick={() => setOpen(!open)}>
                    <PersonAddIcon />
                </Action>
                {
                    location.pathname !== '/invoice' && (
                        <Action
                            text='New Invoice'
                            onClick={() => window.location.href='/invoice'}>
                            <CreateIcon />
                        </Action>

                    )
                }
            </Fab>
            {
                open && (
                    <AddClient open={open} setOpen={setOpen} />
                )
            }
            

        </>
    );
}
