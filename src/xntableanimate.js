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

    function XNTableAnimate(dom, options) {
        this.option = $.extend(true,{}, option, options);
        this.dom = dom;
        this.bodydom=dom.querySelector('tbody')||dom;
        // this[this.option.type]()
        this.init()
    }

    XNTableAnimate.prototype = {
        init(){
            var key=0;
            this.animate(key);
        },
        animate(key){
            if(!$(this.dom).find('tr').get(key)){
                return;
            }
            var curTr=$(this.dom).find('tr').eq(key);
            var height=curTr.outerHeight();
            let curHeight=0;

            // setTimeout(()=>{
            //     let interval=setInterval(()=>{
            //         $(this.dom).css({
            //             'margin-top':`${-curHeight+'px'}`
            //         })
            //         if(curHeight>=height){
            //             clearInterval(interval);
            //             this.bodydom.appendChild(curTr.get(key))
            //             $(this.dom).css({
            //                 'margin-top':`0px`
            //             })
            //             this.animate(key)
            //         }
            //         else{
            //
            //         }
            //     },this.option.animate.speedTimeLength)
            // },this.option.animate.sleepTime)
        },
    }
    window.XNTableAnimate = XNTableAnimate;
})(window, XNQuery)
