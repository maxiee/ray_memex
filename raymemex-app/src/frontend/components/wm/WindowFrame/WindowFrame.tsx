import { ReactElement } from "react";
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from "react95";
import { WindowType } from "../../../../types/wm/WindowType";


const IconClose = () => (
    <svg width='8' height='7' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z' /></svg>
);

export const WindowFrame = (props: {
    window: WindowType;
    children: ReactElement
}) => {
    return <Window resizable className="window" style={{
        flexDirection: 'column',
        width: props.window.width,
        height: props.window.height,
        top: props.window.top,
        left: props.window.left,
        zIndex: props.window.zIndex,
        display: props.window.hidden ? "none" : "flex"
    }}>
        <WindowHeader>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: '0',
                boxSizing: 'border-box',

            }}>
                <span>Ray Memex</span>
                <Button style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '20px',
                    height: '20px',
                    marginLeft: '-1px',
                    marginTop: '-1px',

                }}>
                    <IconClose />
                </Button>
            </div>
        </WindowHeader>
        <Toolbar></Toolbar>
        <WindowContent style={{
            flex: 1,
        }}>
            {/* {props.children} */}
            <div>React95</div>
        </WindowContent>
        <Frame variant='well' className='footer'>
            Put some useful information here
        </Frame>
    </Window>
}