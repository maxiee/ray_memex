import { AppBar, Button, Frame, MenuList, MenuListItem, Separator, TextInput, Toolbar } from "react95"
import { MenuBarStyle } from "./style"
import { useState } from "react"
import { useClippy } from "@react95/clippy";

const MyClippy = () => {
    const { clippy } = useClippy();

    return <Button onClick={() => clippy.play('Wave')}>Hello Clippy!</Button>;
};


export const MenuBar = () => {
    const [open, setOpen] = useState(false);

    return <MenuBarStyle>
        <AppBar fixed={false}>
            <Toolbar>
                <Button onClick={() => setOpen(!open)}>Start</Button>
                <MyClippy />
                <div style={{ flex: 1 }} />
                <TextInput value={'2024-06-08 66:66'} style={{ width: '150px' }} />
                {open && (
                    <MenuList style={{
                        position: 'absolute',
                        left: '0',
                        bottom: '48px',
                        marginBottom: '0',
                    }}
                        onClick={() => setOpen(false)}
                    >
                        <MenuListItem>
                            <span role='img' aria-label='👨‍💻'>
                                👨‍💻
                            </span>
                            Ray Memex
                        </MenuListItem>
                        <MenuListItem>
                            <span role='img' aria-label='📁'>
                                📁
                            </span>
                            Files
                        </MenuListItem>
                        <Separator />
                        <MenuListItem disabled>
                            <span role='img' aria-label='🔙'>
                                🔙
                            </span>
                            Logout
                        </MenuListItem>

                    </MenuList>
                )}
            </Toolbar>
        </AppBar>
    </MenuBarStyle>
}