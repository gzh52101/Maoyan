import React, { useState } from 'react';
import '../scss/show.scss'
import { SearchBar } from 'antd-mobile';
import RecCards from '../components/RecCards';
function Show() {

    const arr = [
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        },
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        },
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
        ,
        {
            name: "奥特曼",
            img: require("../../public/img/adv3.jpg").default,
        }
    ]


    const arr2 = [
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },

        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },

        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },

        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },
        {
            title: "本月必看榜",
            content: "精彩演出看这里",
            img: require("../../public/img/bq2.png").default
        },

    ]
    const arr3 = [
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
        {
            img: require("../../public/img/bq2.png").default,
            title: "[北京] 2021中央美院毕业季（进馆需预约）",
            time: "2021.6.10-2021.6.20",
            money: "￥10起"
        },
    ]
    const [data, setData] = useState(arr)
    const [seeList, setSeeList] = useState(arr2)
    const [recommendList, setRecommendList] = useState(arr3)
    return (
        <div className="show">
            <div className="top_bar">
                <div>广州</div>
                <div>演出</div>
                <i className="iconfont icon-sousuo"></i>
            </div>

            <SearchBar placeholder="找明星、演出、场馆" className="search" />

            <ul>
                <div>
                    <li><img src=  {require("../../public/img/yanchang.png").default} alt="" /></li>
                    <span>演唱会</span>
                </div>
                <div>
                    <li><img src={require("../../public/img/xiju.png").default} alt="" /></li>
                    <span>话剧歌剧</span>
                </div>
                <div>
                    <li><img src={require("../../public/img/xiuxian.png").default} alt="" /></li>
                    <span>休闲展览</span>
                    <p>侏罗纪展</p>
                </div>
                <div>
                    <li><img src={require("../../public/img/xiangsheng.png").default} alt="" /></li>
                    <span>相声戏曲</span>
                </div>
                <div>
                    <li><img src={require("../../public/img/qinzi.png").default} alt="" /></li>

                    <span>亲子艺术</span>
                </div>
            </ul>

            <div className="bq">
                <div className="bq_top">
                    <img src={require("../../public/img/bq.png").default} alt="" />
                    <div>
                        更多必抢 >
                    </div>
                </div>
                <div className="bq_bottom">
                    <div>
                        <img src={require("../../public/img/bq1.png").default} alt="" />
                        <span>
                            <img src={require("../../public/img/hot.png").default} alt="" />
                        火热抢票中
                        </span>
                        <p>开心麻花2021年中大戏《双城环梦记》</p>
                    </div>
                    <div><img src={require("../../public/img/bq2.png").default} alt="" />
                        <span>
                            <img src={require("../../public/img/hot.png").default} alt="" />
                        火热抢票中
                        </span>
                        <p>宫崎骏与吉卜力的世界--动画艺术展</p>
                    </div>
                    <div><img src={require("../../public/img/bq3.png").default} alt="" />
                        <span>
                            <img src={require("../../public/img/hot.png").default} alt="" />
                        火热抢票中
                        </span>
                        <p>【欢乐端午小假期】三里屯爆笑脱口秀《周六酒吧秀》喜番喜剧</p>
                    </div>
                </div>
            </div>

            <div className="gg">
                <img src={require("../../public/img/gg.png").default} alt="" />
            </div>


            <div className="big_new">
                <span>大咖新动态</span>
                <div className="big_banner">
                    {
                        data.map((item, index) => {
                            return <div className="big_item" key={index}>
                                <img src={item.img} alt="" />
                                <span>{item.name}</span>
                                <p>演出即将开始</p>
                            </div>

                        })
                    }
                </div>
            </div>

            <div className="see_box">
                <span>什么值得看</span>
                <div className="see_banner">

                    {
                        seeList.map((item, index) => {
                            return <div className="see_item" key={index}>
                                <img src={item.img} alt="" />
                                <div>
                                    <span>{item.title}</span>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>

            <div className="recommend">
                <span>为你推荐</span>
                <div className="recommend_banner">
                {
                    recommendList.map((item, index) => {
                        return <div className="recommend_item" key={index}>

                            <img src={item.img} alt="" />
                            <div  >
                                <span>{item.title}</span>
                                <p>{item.time}</p>
                                <div>{item.money}</div>
                            </div>
                        </div>
                    })
                }

                </div>


            </div>

        </div>
    )
}

export default Show;