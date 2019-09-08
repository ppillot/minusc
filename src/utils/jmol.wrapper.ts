


enum JmolCommand {
    INIT = 'initApplet',
    EVALUATE = 'evaluate',
    SCRIPT = 'script'
}

interface JmolCommandMap {
    'initApplet': Partial<jmol.AppletParameters>
    'script'    : string
    'evaluate'  : string
}

interface JmolMessage {
    type: keyof JmolCommandMap
    payload: JmolCommandMap[keyof JmolCommandMap]
}

interface iFrameWindow extends Window {
    Jmol: JmolStatic
    myApplet: jmol.JmolApplet
}

class JmolWrapper {
    iFrame: HTMLIFrameElement
    doc : Document
    win : iFrameWindow
    // param: Partial<jmol.AppletParameters>
    constructor (el: Element, param?: Partial<jmol.AppletParameters>) {
        this.iFrame = document.createElement('iframe')
        this.iFrame.setAttribute('height', '100%')
        this.iFrame.setAttribute('width', '100%')
        this.iFrame.setAttribute('style', 'border: none')
        this.iFrame.src = "jsmol/jsmol.htm"
        el.append(this.iFrame);

        this.doc = this.iFrame.contentDocument!
        this.win = this.iFrame.contentWindow as unknown as iFrameWindow

        const defaultParam: Partial<jmol.AppletParameters> = {
            color: "#263238",
            height: '100%',
            width: '100%',
            script: "load ../cif/sio2.cif {1 1 1}; set highresolution on",
            use: "HTML5",
            j2sPath: "jsmol/j2s",
            disableInitialConsole: false,
            ...param
        }

            // attach post message event handler
        window.addEventListener('message', this.receiveMessage.bind(this))

            // init Jmol applet in iFrame
        window.setTimeout(() => { this.sendCommand({
            type: JmolCommand.INIT,
            payload: defaultParam
        })}, 500)
        // window.setTimeout(() => { this.setApplet(defaultParam)}, 500)
    }

    private sendCommand (message: JmolMessage) {
        this.win.postMessage(
            message,
            '*'
        )
    }

    public getValue (token: string) {
        return this.win.Jmol.evaluateVar(this.win.myApplet, token)
        // this.sendCommand( {
        //     type: JmolCommand.EVALUATE,
        //     payload: token
        // })
    }

    public script (spt: string) {
        this.win.Jmol.script(this.win.myApplet, spt)
    }

    private receiveMessage (ev: MessageEvent) {
        console.log(ev.data)
    }

    private setApplet (param: Partial<jmol.AppletParameters>) {
        // @ts-ignore
        const txt = this.win.Jmol.getAppletHtml('test', param);
        this.doc.write(txt);
    }

}

export default JmolWrapper