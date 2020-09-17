// на клиенте clg не пашет
import * as alt from 'alt'
let webview
alt.onServer('hello:World',()=>{
    alt.log('WOrld')
    // alt.emitCline(null,'world')
})
alt.onServer('webview:Load',()=>{
    alt.log('YEa');
    console.log('hop')
    webview = new alt.WebView('http://resource/client/html/auth/index.html')
    webview.focus()
    alt.showCursor(true)
    webview.on('webview:login',(data)=> {
        alt.emitServer('client:login',data)
    })
    webview.on('webview:signUp',(data)=> {
        alt.emitServer('client:signUp',data)
    })
})

alt.onServer('webview:Hide',()=>{
    webview.isVisible=false
    alt.showCursor(false)
})
