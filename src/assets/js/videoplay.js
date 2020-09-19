// import store from '../../store'
let player = null;
// let duration = null;
// const learnTime = null;
// const IntervalCount = null;
let _seek = null;
let autoplay = null;
export default {
    playervideo(param1, kctag) {
        if (param1.seek) {
            _seek = param1.seek;
        } else {
            _seek = 0;
        }
        if (kctag === 'kctag') {
            autoplay = true;
        } else {
            autoplay = false;
        }
        player = new window.Aliplayer(
            {
                id: 'J_prismPlayer',
                vid: param1.vId,
                seek: _seek,
                playauth: param1.playAuth,
                qualitySort: 'asc',
                format: param1.format,
                mediaType: param1.mediaType,
                encryptType: 1,
                width: '100%',
                height: '500px',
                autoplay,
                isLive: false,
                cover: param1.coverURL,
                rePlay: false,
                playsinline: true,
                preload: false,
                controlBarVisibility: 'hover',
                useH5Prism: true,
            },
            (player) => {
                player.on('play', () => {
                    if (param1.playType === '02') {
                        setTimeout(() => {
                            // eslint-disable-next-line max-len
                            // $('.prism-cover').css('cssText', 'background-image: url(../../../../static/images/audio.png)!important;float: left!important;margin-left: 0px!important;margin-top: 0px!important;display:block!important;');
                        }, 100);
                    }
                });
            },
        );
        return player;
    },
};
