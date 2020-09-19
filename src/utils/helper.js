/**
 * 倒计时方法
 * @param seconds
 * @param option {Object}
 * @param option.onProgress {Function|null}
 * @param option.onEnd {Function|null} 倒计时结束回调
 * @param option.interval {Number}倒时计刷新频率, 单位ms, default: 1000
 * @returns {destroy} 销毁倒计时
 */
export const countdown = function countdown(seconds, option) {
    const sTime = +new Date();

    const timer = setInterval(() => {
        let s = seconds - Math.round((+new Date() - sTime) / 1e3);
        if (s <= 0) {
            s = 0;
            if (typeof option.onEnd === 'function') {
                option.onEnd(s);
            }
            clearInterval(timer);
        } else if (typeof option.onProgress === 'function') {
            option.onProgress(s);
        }
    }, option.interval || 1000);

    return function destroy() {
        clearInterval(timer);
    };
};

export default {
    countdown,
};
