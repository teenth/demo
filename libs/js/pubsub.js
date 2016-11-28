/**
 * Created by oo on 2016/8/18.
 */
egret["pubsub"] = {};
    (function (q) {
        var topics = {}, // 回调函数存放的数组
            subUid = -1;
        q.gettopics = function () {
            console.log(topics)
        };
        q.initPubsub=function () {
            topics = {};
            subUid = -1;
        };
        // 发布方法
        q.publish = function (topic, args) {
            if (!topics[topic]) {
                return false;
            }

            setTimeout(function () {
                var subscribers = topics[topic],
                    len = subscribers ? subscribers.length : 0;

                while (len--) {
                    subscribers[len].func(topic, args);
                }
            }, 0);

            return true;

        };
        //订阅方法
        q.subscribe = function (topic, func) {
            if (!topics[topic]) {
                topics[topic] = [];
            }

            var token = (++subUid).toString();
            topics[topic].push({
                token: token,
                func: func
            });
            return token;
        };
        //退订方法
        q.unsubscribe = function (token) {
            for (var m in topics) {
                if (topics[m]) {
                    for (var i = 0, j = topics[m].length; i < j; i++) {
                        if (topics[m][i].token === token) {
                            topics[m].splice(i, 1);
                            return token;
                        }
                    }
                }
            }
            return false;
        };
        //判断是否订阅了此方法
        q.issubscribe = function (topic) {
            if (topics[topic]) {
                return false;
            }
            return true;
        }
    }(egret["pubsub"]));