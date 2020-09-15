import * as alt from 'alt'
alt.onServer('hello:World',()=>{
    alt.log('WOrld')
    // alt.emitCline(null,'world')
})
alt.onServer('webview:Load',()=>{
    alt.log('YEa');
    console.log('hop')
    const webview = new alt.WebView('http://resource/client/html/auth/index.html')
    webview.focus()
    alt.showCursor(true)
    webview.on('display:Name',()=> alt.log('fasdlf'))
})
