//! xntableanimate.js
//！ 仙女颜色选择器
//! https://github.com/fanaiai/xntableanimate
//! version : 1.0.0
//! authors : 范媛媛
//! create date:2021/03/09
//! update date:2021/03/09 发布
import './xnquery.js'
import './xntableanimate.css'

(function (window, $) {
    var option = {
        type: 'linerUp',//
        // linerUp：匀速向上翻转，sameTimeUp：总时间相同向上翻转，linerChange:匀速数字变化，sameTimeChange:总时长相同数字变化,easyChange
        animate: {
            speedTimeLength: 1000,
            sleepTime: 1000,
            totalTime: 2000,//总时长
        }
    }

    function XNTableAnimate(dom,scrollDom, options) {
        this.option = $.extend(true,{}, option, options);
        this.dom = dom;
        this.scrollDom=scrollDom;
        scrollDom.classList.add('xntable-scrolldom')
        this.totalHeight=$(dom).outerHeight();
        this.pNodeHeight=$(scrollDom).outerHeight();
        if(this.totalHeight<=this.pNodeHeight){
            return;
        }
        this.bodydom=dom.querySelector('tbody')||dom;
        // this[this.option.type]()
        this.mouseover=false;
        this.init()
        this.addEvent();
    }

    XNTableAnimate.prototype = {
        init(){
            this.key=0;
            this.animate(this.key);
        },
        animate(){
            if(!$(this.dom).find('tr').get(0)){
                return;
            }
            this.key=key;
            var curTr=$(this.dom).find('tr').eq(0);
            var height=curTr.outerHeight();
            let curHeight=0;

            this.animationId = requestAnimationFrame(this.animate.bind(this))
        },
        animate1(key){
            if(this.mouseover){
                return;
            }
            if(!$(this.dom).find('tr').get(0)){
                return;
            }
            this.key=key;
            var curTr=$(this.dom).find('tr').eq(0);
            var height=curTr.outerHeight();
            let curHeight=0;
            console.log(key)
            this.timeOut=setTimeout(()=>{
                if(this.mouseover){
                    console.log(3)
                    clearTimeout(this.timeOut)
                    return;
                }
                let interval=setInterval(()=>{
                    curHeight+=1;
                    // console.log(curHeight)
                    $(this.dom).css({
                        'margin-top':`${-curHeight+'px'}`
                    })
                    if(curHeight>=height){
                        clearInterval(interval);
                        this.bodydom.appendChild(curTr.get(0))
                        $(this.dom).css({
                            'margin-top':`0px`
                        })
                        console.log(curHeight,height)
                        this.animate(key)
                    }
                    else{

                    }
                },this.option.animate.speedTimeLength)
            },this.option.animate.sleepTime)
        },
        addEvent(){
            document.addEventListener('mouseover',e=>{
                var t=e.target;
                if($(e.target).parents('.xntable-scrolldom').get(0)){
                    t=$(e.target).parents('.xntable-scrolldom').get(0);
                }
                if(t==this.scrollDom){
                this.mouseover=true;
                return;
                }
                this.mouseover=false;
                clearTimeout(this.timeOut)
                this.timeOut=null;
                console.log(2)
                this.animate(this.key)
            })
        }
    }
    window.XNTableAnimate = XNTableAnimate;
})(window, XNQuery)
