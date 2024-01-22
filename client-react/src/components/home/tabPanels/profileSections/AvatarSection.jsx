import React from 'react';
import { Box, Avatar, Button } from '@mui/material';

export default function AvatarSection({ photo, isDisabled }) {
    const [avatar, setAvatar] = React.useState(photo);
    const handleAvatarChange = (event) => {
        if (event.target.files[0]) {
            setAvatar(URL.createObjectURL(event.target.files[0]));
        }
    };
    React.useEffect(() => {
        setAvatar(photo);
    }, [photo]);
    const handleRemoveAvatar = () => {
        setAvatar(null);
    };
    return <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
        {!isDisabled && <Box>
            <Button variant="contained" size="small" sx={{ mr: 1 }}>
                Upload Image
                <input type="file" hidden onChange={handleAvatarChange} />
            </Button>
            <Button variant="contained" color="error" size="small" onClick={handleRemoveAvatar}>
                Remove
            </Button>
        </Box>}
    </Box>
}
