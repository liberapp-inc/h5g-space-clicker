// ゲームで便利に使えるUtilityクラス

class Util{

    public static height: number;
    public static width: number;
    public static ui:eui.UILayer;

    static init( eui:eui.UILayer ) {
        this.height = eui.stage.stageHeight;
        this.width  = eui.stage.stageWidth;
        this.ui = eui;
    }

    static random(min:number, max:number):number {
        return min + Math.random() * (max - min);
    }

    static randomInt(min:number, max:number):number {
        return Math.floor( min + Math.random() * (max+0.999 - min) );
    }

    static clamp(value:number, min:number, max:number):number {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    //rgbを16進数へ変換
    static color( r:number, g:number, b:number):number {
        //小数点の切り捨て
        let r16 = r.toFixed(0);
        let g16 = g.toFixed(0);
        let b16 = b.toFixed(0);

        //16進数へ変換
        r16 = r.toString(16);
        g16 = g.toString(16);
        b16 = b.toString(16);

        //r = 0だと r16 =0なので00にするために'00'加算
        r16 = ('00' + r16).slice(-2);
        g16 = ('00' + g16).slice(-2);
        b16 = ('00' + b16).slice(-2);

        //色コードへ変換
        let code :number = parseInt(("0x" +r16 + g16 + b16), 16) ;

        return code;
    }

/*    static colorLerp( c0:number, c1:number, rate01:number):number {
        let rate10 = 1 - rate01;
        let color = 
            ( ((c0&0xff0000) * rate10 + (c1&0xff0000) * rate01) & 0xff0000 ) +
            ( ((c0&0xff00) * rate10 + (c1&0xff00) * rate01) & 0xff00 ) +
            ( ((c0&0xff) * rate10 + (c1&0xff) * rate01) & 0xff );
        return color;
    }*/

    static myText(x:number, y:number, text:string, size:number, ratio:number, color:number, bold:boolean): egret.TextField {
        
        let tf :egret.TextField = new egret.TextField();
        tf.x = x;
        tf.y = y;
        tf.text = text;
        tf.bold = bold;
        tf.size = size;

        tf.scaleX = ratio;
        tf.scaleY = ratio;

        tf.textColor = color;

        tf.multiline = true;


        return tf;
    }

    static myStrokeText(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number): egret.TextField {
        
        let tf :egret.TextField = new egret.TextField();
        tf.x = x;
        tf.y = y;

        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": color, "size": size, "fontFamily": font, "strokeColor": stColor, "stroke": stSize,
                }
            }
        ];    

        return tf;
    }

    static saveLocalStrage(key :string, saveValue : number){
        window.localStorage.setItem(key, saveValue.toString());
    }

    static loadLocalStrage(key : string, initialValue : number):number{
        let stringValue :string =  window.localStorage.getItem(key); // string
        if( stringValue == null ){
            stringValue = initialValue.toString();
            window.localStorage.setItem(key, stringValue.toString());
        }
        let value : number = parseInt(stringValue);
        return value;
    }

}
