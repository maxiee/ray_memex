import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface WebViewProps {
    src: string;
}

const WebView: React.FC<WebViewProps> = ({ src }) => {
    const isDragging = useSelector((state: RootState) => state.gesture.isDragging);
    console.log(isDragging);
    const pointerEvents = isDragging ? 'none' : 'auto';
    return <webview src={src} style={{ width: "100%", height: "100%", pointerEvents: pointerEvents }} />;
};

export default WebView;