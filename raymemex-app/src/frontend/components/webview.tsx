import React, { useEffect, useRef } from 'react';

interface WebViewProps {
    src: string;
}

const WebView: React.FC<WebViewProps> = ({ src }) => {

    return <webview src={src} style={{width: "100%", height: "100%"}} />;
};

export default WebView;