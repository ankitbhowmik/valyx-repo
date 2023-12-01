import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserInfo = () => {
    return (
        <div>
            <div>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src="https://avatars.githubusercontent.com/u/64949379?v=4" sx={{width: 50, height: 50}}/>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <Badge color="secondary" variant="dot">
                                <NotificationsIcon style={{color: "white"}}/>
                            </Badge>
                        </IconButton>
                      }
                    title="Ankit Bhowmik"
                    subheader={<p className='m-0 color-grayy'>ankibhowmik@gmail.com</p>}
                />
            </div>
        </div>
    )
}

export default UserInfo