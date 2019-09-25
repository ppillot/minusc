/* eslint-disable indent */


enum JmolCommand {
    INIT = 'initApplet',
    EVALUATE = 'evaluate',
    SCRIPT = 'script'
}

interface JmolCommandMap {
    'initApplet': Partial<jmol.AppletParameters>|{cb: Partial<SubscribedCallBacks>}
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
type SubscribedCallBacks = {
    ready: boolean,
    animFrame: boolean,
    appletReady: boolean,
    atomMoved: boolean,
    echo: boolean,
    eval: boolean,
    hover: boolean,
    loadStruct: boolean,
    measure: boolean,
    message: boolean,
    minimization: boolean,
    pick: boolean,
    resize: boolean,
    script: boolean,
    structureModified: boolean,
    sync: boolean
}

class JmolWrapper {
    iFrame: HTMLIFrameElement
    doc : Document
    win : iFrameWindow
    pendingPromises: any[] = []
    readyCB: (a?: any)=>void = () => {}
    // param: Partial<jmol.AppletParameters>
    constructor (el: Element, param?: Partial<jmol.AppletParameters>) {
        this.iFrame = document.createElement('iframe')
        this.iFrame.setAttribute('height', '100%')
        this.iFrame.setAttribute('width', '100%')
        this.iFrame.setAttribute('style', 'border: none')
        this.iFrame.src = 'jsmol/jsmol.htm'
        el.append(this.iFrame);

        this.doc = this.iFrame.contentDocument!
        this.win = this.iFrame.contentWindow as unknown as iFrameWindow

        const cb: Partial<SubscribedCallBacks> = {}

        if (param && param.readyFunction) {
            this.readyCB = param.readyFunction
            param.readyFunction = undefined
            cb.ready = true
        }

        const defaultParam: Partial<jmol.AppletParameters> = {
            height: '100%',
            width: '100%',
            //script: 'load ../cif/sio2.cif {1 1 1}; set highresolution on',
            use: 'HTML5',
            j2sPath: 'jsmol/j2s',
            disableInitialConsole: false,
            ...param
        }

            // attach post message event handler
        window.addEventListener('message', (ev: MessageEvent) => {
            if (ev.data.hasOwnProperty('source') && ev.data.source === 'jmolIframe') {
                this.receiveMessage(ev.data)
            }
        })

            // init Jmol applet in iFrame
        window.setTimeout(() => { this.sendCommand({
            type: JmolCommand.INIT,
            payload: {
                ...defaultParam,
                cb
            }
        }) }, 500)
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

    public scriptAsync (spt: string) {
        return new Promise<string>((resolve, reject) => {
            spt += `; javascript returnMessage({type: 'promise', payload: ''});`
            this.win.Jmol.script(this.win.myApplet, spt)
            this.pendingPromises.push(resolve)
        })
    }

    private receiveMessage (data: any) {
        if (data.type === 'promise') {
            const resolve = this.pendingPromises.pop()
            resolve(data.payload)
        } else if (data.type === 'ready') {
            this.readyCB()
        }
    }

    private setApplet (param: Partial<jmol.AppletParameters>) {
        // @ts-ignore
        const txt = this.win.Jmol.getAppletHtml('test', param)
        this.doc.write(txt)
    }
}

export default JmolWrapper
