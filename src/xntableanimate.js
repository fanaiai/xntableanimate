//! xntableanimate.js
//！ 仙女颜色选择器
//! https://github.com/fanaiai/xntableanimate
//! version : 1.0.0
//! authors : 范媛媛
//! create date:2021/03/09
//! update date:2021/03/19 发布
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

    function XNTableAnimate(dom, scrollDom, options) {
        this.option = $.extend(true, {}, option, options);
        this.dom = dom;
        this.scrollDom = scrollDom;
        scrollDom.classList.add('xntable-scrolldom')
        this.totalHeight = $(dom).outerHeight();
        this.pNodeHeight = $(scrollDom).outerHeight();
        if (this.totalHeight <= this.pNodeHeight) {
            return;
        }
        this.bodydom = dom.querySelector('tbody') || dom;
        this.childrenItems=[];
        this.totalElements = $(this.bodydom).children('tr').length();
        $(this.bodydom).children('tr').each((ele) => {
            var newdom = ele.cloneNode(true)
            this.childrenItems.push(ele.cloneNode(true));
            this.bodydom.append(newdom)
        })
        this.mouseover = false;
        this.init()
        this.addEvent();
    }

    XNTableAnimate.prototype = {
        init() {
            this.key = 0;
            this.curinterHeight = 0;
            this.curscrollHeight = 0;
            this.animate(this.key);
        },
        animate() {
            if (this.mouseover) {
                return;
            }
            if (!$(this.dom).find('tr').get(0)) {
                return;
            }
            var curTr = $(this.dom).find('tr').eq(this.key);
            var height = curTr.outerHeight();
            clearTimeout(this.timeOut)
            this.timeOut = setTimeout(() => {
                if (this.mouseover) {
                    clearTimeout(this.timeOut)
                    clearInterval(this.interval)
                    return;
                }
                this.interval = setInterval(() => {
                    this.curinterHeight += 1;
                    this.curscrollHeight += 1;
                    $(this.dom).css({
                        'margin-top': `${-this.curscrollHeight + 'px'}`
                    })
                    if (this.curinterHeight >= height) {
                        clearInterval(this.interval);
                        this.key+=1;
                        if (this.key == this.totalElements) {
                            $(this.dom).css({
                                'margin-top': `0px`
                            })
                            this.curscrollHeight = 0;
                            this.key=0;
                        }
                        this.curinterHeight =0;
                        this.animate(this.key)
                    } else {

                    }
                }, this.option.animate.speedTimeLength)
            }, this.option.animate.sleepTime)
        },
        addEvent() {
            document.addEventListener('mouseover', e => {
                var t = e.target;
                if ($(e.target).parents('.xntable-scrolldom').get(0)) {
                    t = $(e.target).parents('.xntable-scrolldom').get(0);
                }
                if (t == this.scrollDom) {
                    this.mouseover = true;
                    clearTimeout(this.timeOut)
                    clearInterval(this.interval)
                    this.timeOut = null;
                    return;
                }
                if (!this.timeOut) {
                    this.mouseover = false;
                    this.animate(this.key)
                }
            })
        }
    }
    window.XNTableAnimate = XNTableAnimate;
})(window, XNQuery)
