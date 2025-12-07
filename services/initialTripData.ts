import { Trip, ItineraryType } from "../types";

export const initialTripData: Trip = {
  id: "my-italy-trip",
  title: "義大利深冬之旅：從西西里到阿爾卑斯",
  destination: "Italy",
  startDate: "2024-12-21",
  days: [
    {
      day: 1,
      date: "12/21 (日)",
      location: "桃園 -> 上海",
      weather: { temp: "15°C", condition: "多雲", icon: "☁️" },
      items: [
        {
          id: "d1-1",
          type: ItineraryType.TRANSPORT,
          time: "16:30",
          name: "桃園機場集合",
          location: "TPE 第二航廈",
          description: "集合報到，準備出發。",
          tips: ["起飛前 60 分鐘完成報到", "18:40 起飛"]
        },
        {
          id: "d1-2",
          type: ItineraryType.TRANSPORT,
          time: "20:25",
          name: "抵達上海浦東",
          location: "PVG",
          description: "落地浦東，準備轉機前往米蘭。",
        }
      ]
    },
    {
      day: 2,
      date: "12/22 (一)",
      location: "上海 -> 米蘭 -> 西西里島",
      weather: { temp: "14°C", condition: "晴朗", icon: "☀️" },
      items: [
        {
          id: "d2-1",
          type: ItineraryType.TRANSPORT,
          time: "07:00",
          name: "抵達米蘭",
          location: "MXP",
          description: "01:20 起飛，清晨抵達米蘭。完成入境後前往 ITA Airways 櫃檯。",
          tips: ["行李限制: 隨身 45x36x20 15kg", "托運: 158cm 23kg"]
        },
        {
          id: "d2-2",
          type: ItineraryType.TRANSPORT,
          time: "10:30",
          name: "飛往西西里島",
          location: "Palermo Airport",
          description: "經羅馬轉機，13:40 抵達 Palermo。",
          externalLinks: [{ label: "機場到市區攻略", url: "https://xhslink.com/m/2dPKG2YVXZ5" }]
        },
        {
          id: "d2-3",
          type: ItineraryType.ATTRACTION,
          time: "15:00",
          name: "巴勒莫市區巡禮",
          location: "Palermo",
          description: "探索西西里首府的諾曼與阿拉伯風情。",
          mustEat: ["Mercato Ballarò市場海鮮"],
          tips: ["參觀海軍元帥聖母堂", "四角廣場", "諾曼王宮", "巴勒莫主教座堂"]
        }
      ]
    },
    {
      day: 3,
      date: "12/23 (二)",
      location: "西西里島 (巴勒莫)",
      weather: { temp: "16°C", condition: "晴時多雲", icon: "⛅" },
      items: [
        {
          id: "d3-1",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "佩萊格​​里諾山",
          location: "Monte Pellegrino",
          description: "俯瞰巴勒莫灣的絕佳視角。",
        },
        {
          id: "d3-2",
          type: ItineraryType.RESTAURANT,
          time: "12:00",
          name: "巴勒莫美食探險",
          location: "Palermo",
          description: "參考小紅書推薦的在地美食。",
          externalLinks: [
             { label: "美食筆記 1", url: "https://xhslink.com/m/8nncgeJwxoU" },
             { label: "美食筆記 2", url: "https://xhslink.com/m/8VWjThardWi" },
             { label: "美食筆記 3", url: "https://xhslink.com/m/6iMd1FbX7v1" }
          ]
        }
      ]
    },
    {
      day: 4,
      date: "12/24 (三)",
      location: "切法盧 (Cefalù)",
      weather: { temp: "15°C", condition: "晴朗", icon: "☀️" },
      items: [
        {
          id: "d4-1",
          type: ItineraryType.TRANSPORT,
          time: "09:00",
          name: "前往切法盧",
          location: "Train Station",
          description: "搭乘火車前往海濱小鎮切法盧 (來回約 2h)。",
        },
        {
          id: "d4-2",
          type: ItineraryType.ATTRACTION,
          time: "10:30",
          name: "Castello di Cefalù",
          location: "Cefalù",
          description: "攀登切法盧巨岩，俯瞰紅瓦屋頂與蔚藍地中海。",
          tips: ["門票 5歐 (可刷卡)", "Point de Vue 全景點", "天堂電影院取景地 Molo di Cefalú"]
        },
        {
          id: "d4-3",
          type: ItineraryType.ATTRACTION,
          time: "14:00",
          name: "中世紀洗衣池與海灘",
          location: "Lavatoio Medievale",
          description: "漫步古老街道，參觀中世紀洗衣池與 Costa di Cefalù 海灘。",
        }
      ]
    },
    {
      day: 5,
      date: "12/25 (四)",
      location: "西西里 -> 那不勒斯",
      weather: { temp: "13°C", condition: "多雲", icon: "☁️" },
      items: [
        {
          id: "d5-1",
          type: ItineraryType.TRANSPORT,
          time: "07:45",
          name: "飛往那不勒斯",
          location: "NAP Airport",
          description: "EasyJet 航班。08:40 抵達那不勒斯。",
          tips: ["行李限制: 隨身 45x36x20 15kg", "托運: 總長275cm 23kg"],
          externalLinks: [{ label: "機場到市區攻略", url: "https://xhslink.com/m/6nYyU05ycRb" }]
        },
        {
          id: "d5-2",
          type: ItineraryType.RESTAURANT,
          time: "12:00",
          name: "那不勒斯美食",
          location: "Naples",
          description: "披薩的故鄉，探索道地美食。",
          externalLinks: [
            { label: "City Walk 攻略", url: "https://xhslink.com/m/ATd9HirB70T" },
            { label: "美食推薦 1", url: "https://xhslink.com/m/8JenkioFdna" },
            { label: "美食推薦 2", url: "https://xhslink.com/m/9EYKwrhXdG9" }
          ]
        }
      ]
    },
    {
      day: 6,
      date: "12/26 (五)",
      location: "龐貝 & 維蘇威火山",
      weather: { temp: "12°C", condition: "晴", icon: "☀️" },
      items: [
        {
          id: "d6-1",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "龐貝古城與維蘇威火山",
          location: "Pompeii",
          description: "參觀被火山灰掩埋的古羅馬城市。",
          tips: ["務必提前購票"],
          externalLinks: [{ label: "購票與參觀攻略", url: "https://xhslink.com/m/4AdmsWSM5cD" }]
        }
      ]
    },
    {
      day: 7,
      date: "12/27 (六)",
      location: "那不勒斯 -> 巴里 -> 蘑菇村",
      weather: { temp: "11°C", condition: "陰", icon: "☁️" },
      items: [
        {
          id: "d7-1",
          type: ItineraryType.TRANSPORT,
          time: "07:20",
          name: "巴士前往巴里",
          location: "Bus Station",
          description: "搭乘巴士前往 Bari (約 3h10m)。",
          tips: ["票價約 525 TWD"]
        },
        {
          id: "d7-2",
          type: ItineraryType.ATTRACTION,
          time: "14:00",
          name: "阿爾貝羅貝洛 (蘑菇村)",
          location: "Alberobello",
          description: "童話般的 Trulli 建築群。",
          externalLinks: [
             { label: "巴里-蘑菇村交通", url: "https://xhslink.com/m/26U32bleRap" },
             { label: "住宿推薦", url: "https://xhslink.com/m/8LjAy0JjhLY" }
          ]
        }
      ]
    },
    {
      day: 8,
      date: "12/28 (日)",
      location: "巴里 -> 羅馬",
      weather: { temp: "10°C", condition: "雨", icon: "🌧️" },
      items: [
        {
          id: "d8-1",
          type: ItineraryType.TRANSPORT,
          time: "13:55",
          name: "飛往羅馬",
          location: "FCO Airport",
          description: "Ryanair 航班。15:05 抵達羅馬。",
          tips: ["隨身: 40x25x20 10kg", "托運: 80x120x120 20kg"]
        },
        {
          id: "d8-2",
          type: ItineraryType.ATTRACTION,
          time: "16:00",
          name: "羅馬 City Walk Part 1",
          location: "Rome",
          description: "納沃納廣場、銀塔廣場、萬神殿周邊。",
          mustEat: ["Giolitti 萬神殿冰淇淋", "Forno Campo de 'Fiori (鮮花廣場)", "L’Antico Forno (開心果可頌)"],
          externalLinks: [{ label: "路線地圖", url: "https://maps.app.goo.gl/vL3DdqhwStoNHLRQ7" }]
        }
      ]
    },
    {
      day: 9,
      date: "12/29 (一)",
      location: "羅馬",
      weather: { temp: "11°C", condition: "晴", icon: "☀️" },
      items: [
        {
          id: "d9-1",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "羅馬 City Walk Part 2",
          location: "Rome",
          description: "深入探索永恆之城。",
          externalLinks: [{ label: "路線地圖", url: "https://maps.app.goo.gl/7hrbkDhNUazEMkBv5" }]
        }
      ]
    },
    {
      day: 10,
      date: "12/30 (二)",
      location: "羅馬 -> 威尼斯",
      weather: { temp: "8°C", condition: "霧", icon: "🌫️" },
      items: [
        {
          id: "d10-1",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "羅馬 City Walk Part 3",
          location: "Rome",
          description: "最後的羅馬巡禮。",
          mustEat: ["Forno Roscioli Esquilino"],
          externalLinks: [{ label: "路線地圖", url: "https://maps.app.goo.gl/qpx5BeM8fPACe4aF6" }]
        },
        {
          id: "d10-2",
          type: ItineraryType.TRANSPORT,
          time: "13:35",
          name: "高鐵前往威尼斯",
          location: "Roma Termini",
          description: "搭乘高鐵前往水都威尼斯 (17:34 抵達)。",
          tips: ["票價 2701 TWD/人"]
        }
      ]
    },
    {
      day: 11,
      date: "12/31 (三)",
      location: "威尼斯",
      weather: { temp: "6°C", condition: "晴", icon: "☀️" },
      items: [
        {
          id: "d11-1",
          type: ItineraryType.ATTRACTION,
          time: "10:00",
          name: "威尼斯 City Walk",
          location: "Venice",
          description: "聖馬可廣場看日落，穿梭水巷之間。",
          externalLinks: [
             { label: "地圖路線 1", url: "https://maps.app.goo.gl/N61kQn4ovpDJFQx57" },
             { label: "地圖路線 2", url: "https://maps.app.goo.gl/cnBrrF7sG69MJnHG7" },
             { label: "拍照機位", url: "http://xhslink.com/a/znJ2tBj2QF4Y" }
          ]
        },
        {
          id: "d11-2",
          type: ItineraryType.RESTAURANT,
          time: "18:00",
          name: "威尼斯跨年晚餐",
          location: "Venice",
          description: "品嚐墨魚麵與在地小吃。",
          mustEat: ["佛洛里安咖啡店", "Acqua e Mais", "Fried Land", "墨魚麵"],
          externalLinks: [
            { label: "墨魚麵推薦", url: "https://xhslink.com/m/3Byt85tyEBX" },
            { label: "好吃清單", url: "https://xhslink.com/m/7TaiPQJ9Ppk" }
          ]
        }
      ]
    },
    {
      day: 12,
      date: "1/1 (四)",
      location: "威尼斯 -> 米蘭",
      weather: { temp: "7°C", condition: "陰", icon: "☁️" },
      items: [
        {
          id: "d12-1",
          type: ItineraryType.ATTRACTION,
          time: "10:00",
          name: "威尼斯晨間散步",
          location: "Venice",
          description: "新年第一天的威尼斯。",
          mustEat: ["Trattoria alla Rivetta (San Marco)"],
          externalLinks: [{ label: "路線地圖", url: "https://maps.app.goo.gl/L2iG8JYmWzLfTuXV9" }]
        },
        {
          id: "d12-2",
          type: ItineraryType.TRANSPORT,
          time: "15:58",
          name: "高鐵前往米蘭",
          location: "Venice Santa Lucia",
          description: "18:15 抵達米蘭。",
          tips: ["票價 2068 TWD/人"]
        },
        {
           id: "d12-3",
           type: ItineraryType.ATTRACTION,
           time: "19:00",
           name: "米蘭市中心",
           location: "Milan",
           description: "米蘭大教堂、艾曼紐二世迴廊、商圈逛街。"
        }
      ]
    },
    {
      day: 13,
      date: "1/2 (五)",
      location: "米蘭 <-> 盧加諾 (瑞士)",
      weather: { temp: "4°C", condition: "雪", icon: "❄️" },
      items: [
        {
          id: "d13-1",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "瑞士盧加諾一日遊",
          location: "Lugano",
          description: "跨越邊境前往瑞士湖畔城市盧加諾。",
          externalLinks: [{ label: "盧加諾攻略", url: "https://xhslink.com/m/2joDmdcGgnM" }]
        }
      ]
    },
    {
      day: 14,
      date: "1/3 (六)",
      location: "米蘭 -> 上海",
      weather: { temp: "8°C", condition: "晴", icon: "☀️" },
      items: [
        {
          id: "d14-1",
          type: ItineraryType.TRANSPORT,
          time: "11:00",
          name: "抵達機場",
          location: "MXP",
          description: "12:10 起飛返回上海。",
        }
      ]
    },
     {
      day: 15,
      date: "1/4 (日)",
      location: "上海 -> 台灣",
      weather: { temp: "20°C", condition: "晴", icon: "🏠" },
      items: [
        {
          id: "d15-1",
          type: ItineraryType.TRANSPORT,
          time: "06:20",
          name: "抵達浦東",
          location: "PVG",
          description: "等待轉機回台。",
        },
        {
            id: "d15-2",
            type: ItineraryType.TRANSPORT,
            time: "12:05",
            name: "飛往台灣",
            location: "PVG -> TPE",
            description: "14:00 抵達溫暖的家。",
        }
      ]
    }
  ]
};