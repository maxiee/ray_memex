import { Button } from "react95";
import { DesktopStyle } from "./style";
import { useClippy, ClippyProvider } from '@react95/clippy';

const MyClippy = () => {
    const { clippy } = useClippy();

    return <Button onClick={() => clippy.play('Wave')}>Hello Clippy!</Button>;
};

export const Desktop = () => {
    return <DesktopStyle>
        <MyClippy />
    </DesktopStyle>;
};