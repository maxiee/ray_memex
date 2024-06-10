import { ReactElement, useCallback, useRef, useState } from "react";
import { Button, Frame, Toolbar, Window, WindowContent, WindowHeader } from "react95";
import { WindowType } from "../../../../types/wm/WindowType";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { WindowViewStateEnum } from "../../../../types/wm/WindowViewStateEnum";
import { updateHeight, updateLeft, updateTop, updateViewState, updateWidth } from "../../../../frontend/store/slices/windows/actions";
import useResizeObserver from "../../../../frontend/hooks/useResizeObserver";
import { selectOs } from "../../../../frontend/store/os/selectors";
import { setIsDragDisable } from "../../../../frontend/store/os/actions";

const IconMinimize = () => (
    <svg width='8' height='7' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
        <rect x='1' y='5' width='6' height='1' />
    </svg>
);

const IconMaximize = () => (
    <svg width='8' height='7' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
        <path fillRule='evenodd' clipRule='evenodd' d='M1 1h6v5H1V1zm1 1v3h4V2H2z' />
    </svg>
);


const IconClose = () => (
    <svg width='8' height='7' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z' /></svg>
);

export const WindowFrame = (props: {
    window: WindowType;
    children: ReactElement
}) => {
    const os = useSelector(selectOs);
    const dispatch = useDispatch();

    const handleResize = useCallback((target: HTMLDivElement) => {
        dispatch(setIsDragDisable(true));
        if (props.window.viewState === WindowViewStateEnum.Fullscreen) {
            dispatch(updateViewState(props.window.id, WindowViewStateEnum.Custom));
        }
    }, []);

    const frameRef = useResizeObserver(handleResize);

    const handleDrag = (e: any) => {
        if (props.window.viewState === WindowViewStateEnum.Fullscreen) {
            dispatch(updateWidth(props.window.id, 50));
            dispatch(updateHeight(props.window.id, 50));
            dispatch(updateViewState(props.window.id, WindowViewStateEnum.Custom));
        }

        if (frameRef?.current) {
            const pos = frameRef.current.getBoundingClientRect();
            dispatch(updateLeft(props.window.id, pos.x));
            dispatch(updateTop(props.window.id, pos.y));
            frameRef.current.style.translate = `translate(${e.target.clientX}, ${e.target.clientY})`;
        }
    };

    return <Draggable
        defaultPosition={{ x: props.window.left, y: props.window.top }}
        onDrag={(e) => handleDrag(e)}
        disabled={os.isDragDisable}
        bounds="parent"
    >
        <Window className="window" ref={frameRef} style={{
            flexDirection: 'column',
            width: props.window.width,
            height: props.window.height,
            zIndex: props.window.zIndex,
            display: props.window.hidden ? "none" : "flex",
            resize: "both",
            position: "absolute",
            overflow: 'hidden',
        }}>
            <WindowHeader
                onMouseLeave={() => dispatch(setIsDragDisable(true))}
                onMouseEnter={() => dispatch(setIsDragDisable(false))}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    padding: '0',

                }}>
                    <span>Ray Memex</span>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',

                    }}>
                        <Button style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            marginLeft: '-1px',
                            marginTop: '-1px',

                        }}>
                            <IconMinimize />
                        </Button>
                        <Button style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            marginLeft: '-1px',
                            marginTop: '-1px',

                        }}>
                            <IconMaximize />
                        </Button>
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
                </div>
            </WindowHeader>
            <Toolbar></Toolbar>
            <WindowContent style={{
                flex: 1,
            }}>
                {props.children}
            </WindowContent>
            <Frame variant='well' className='footer'>
                Put some useful information here
            </Frame>
        </Window>
    </Draggable>
}