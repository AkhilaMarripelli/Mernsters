import React, { Component } from 'react';
class KommunicateChat extends Component {
constructor(props) {
super(props);
}
componentDidMount() {
    if (!document.getElementById('kommunicate-script')) {
        (function(d, m){
            var kommunicateSettings = {"appId":"2003d90e985b67f077ef33d8d2aaf102a","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script");
            s.id = 'kommunicate-script'; // Set an ID to check if the script is already added
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }
}
render() {
return ( <div></div>)
}
}
export default KommunicateChat;