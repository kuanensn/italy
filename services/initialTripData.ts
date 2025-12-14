
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
      weather: { 
        temp: "15°C", 
        condition: "多雲", 
        icon: "☁️",
        rainProb: "10%",
        uvIndex: "低 (2)",
        outfitAdvice: "舒適輕便的長袖衣物，適合長時間飛行。",
        sunProtection: "無須特別防曬。"
      },
      items: [
        {
          id: "d1-1",
          type: ItineraryType.TRANSPORT,
          time: "15:30",
          name: "桃園機場集合",
          location: "TPE 第二航廈",
          description: "集合報到，準備出發。",
          transportCode: "MU 5006",
          terminal: "T2",
          status: "準點",
          indoorMap: "https://www.taoyuan-airport.com/map",
          tips: ["16:00 東方航空櫃檯報到", "18:00 抵達登機口"]
        },
        {
          id: "d1-2",
          type: ItineraryType.TRANSPORT,
          time: "18:40",
          name: "飛往上海",
          location: "TPE -> PVG",
          description: "航程 1h45m，20:25 抵達浦東機場 T1。",
          transportCode: "MU 5006",
          terminal: "T2",
          status: "準點"
        },
        {
            id: "d1-3",
            type: ItineraryType.ATTRACTION,
            time: "20:30",
            name: "浦東機場轉機休息",
            location: "PVG T1",
            description: "等待轉機，休息時間約 4 小時。",
        }
      ]
    },
    {
      day: 2,
      date: "12/22 (一)",
      location: "上海 -> 米蘭 -> 西西里島",
      weather: { 
        temp: "14°C", 
        condition: "晴朗", 
        icon: "☀️",
        rainProb: "0%",
        uvIndex: "中 (4)",
        outfitAdvice: "西西里島陽光充足但風大，建議穿著防風外套搭配太陽眼鏡。",
        sunProtection: "建議塗抹 SPF30 防曬乳。"
      },
      items: [
        {
          id: "d2-1",
          type: ItineraryType.TRANSPORT,
          time: "01:20",
          name: "飛往米蘭",
          location: "PVG -> MXP",
          description: "航程 12h40m，07:00 抵達米蘭 Malpensa。",
          transportCode: "MU 243",
          terminal: "T1",
          status: "準點"
        },
        {
          id: "d2-2",
          type: ItineraryType.TRANSPORT,
          time: "13:05",
          name: "轉機飛往西西里",
          location: "MXP -> PMO",
          description: "Ryanair 航班。11:30 櫃檯報到，14:50 抵達 Palermo。",
          transportCode: "Ryanair",
          terminal: "T1",
          status: "準點",
          tips: ["11:30 櫃檯報到", "12:30 抵達登機口"],
          externalLinks: [{ label: "機場到市區攻略", url: "https://xhslink.com/m/2dPKG2YVXZ5" }]
        },
        {
          id: "d2-3",
          type: ItineraryType.ATTRACTION,
          time: "18:00",
          name: "巴勒莫城市巡禮",
          location: "Palermo",
          description: "海軍元帥聖母堂、四角廣場、Mercato Ballarò 市場(海鮮)、諾曼王宮、巴勒莫主教座堂。",
          mustEat: ["Mercato Ballarò 海鮮"],
          tips: ["四角廣場古城歷史中心"]
        },
        {
          id: "d2-4",
          type: ItineraryType.ATTRACTION,
          time: "20:00",
          name: "入住巴勒莫飯店",
          location: "P.za Giulio Cesare, 19, Palermo",
          description: "Check-in 休息。",
        }
      ]
    },
    {
      day: 3,
      date: "12/23 (二)",
      location: "西西里島 (切法盧)",
      weather: { 
        temp: "15°C", 
        condition: "晴朗", 
        icon: "☀️",
        rainProb: "0%",
        uvIndex: "中 (4)",
        outfitAdvice: "海邊風大，建議穿著防風外套，若要攀登巨岩請穿好走的鞋子。",
        sunProtection: "海邊紫外線反射強，請補擦防曬。"
      },
      items: [
        {
          id: "d3-1",
          type: ItineraryType.TRANSPORT,
          time: "09:00",
          name: "火車前往切法盧",
          location: "Palermo Centrale",
          description: "搭乘 RV5354 (往 Messina Centrale 方向) 至 Cefalù Station。",
          transportCode: "RV 5354",
          status: "準點",
          externalLinks: [{ label: "往返火車攻略", url: "http://xhslink.com/o/7RJkOW7WUcu" }]
        },
        {
          id: "d3-2",
          type: ItineraryType.ATTRACTION,
          time: "10:30",
          name: "切法盧全景與巨岩",
          location: "Cefalù",
          description: "上午先上山看全景：Punto Panoramico, Point de Vue, Castello di Cefalù (門票5歐)。",
          tips: ["Scalinata Fiore (石板台階花壇)", "Bastione di Capo Marchiafava"]
        },
        {
          id: "d3-3",
          type: ItineraryType.ATTRACTION,
          time: "13:00",
          name: "古城漫步與海灘",
          location: "Cefalù Old Town",
          description: "切法盧主教座堂、Porta Marina、中世紀洗衣池、Molo di Cefalú (天堂電影院取景地)。",
          tips: ["Costa di Cefalù 海灘"]
        },
        {
          id: "d3-4",
          type: ItineraryType.RESTAURANT,
          time: "17:00",
          name: "切法盧美食",
          location: "Cefalù",
          description: "品嚐在地美食。",
          mustEat: ["開心果 Gelato", "Pasta e Pasti (CP值高)", "南義傳統三明治", "炸飯糰"],
          externalLinks: [
              { label: "開心果 Gelato", url: "https://maps.app.goo.gl/m2HdNfTB9msyBLey6" },
              { label: "Pasta e Pasti", url: "https://maps.app.goo.gl/NKDpFmKJ2XnFJUcj7" },
              { label: "南義三明治", url: "https://maps.app.goo.gl/vACNkuzZYP7QvPN68" }
          ]
        },
        {
            id: "d3-5",
            type: ItineraryType.TRANSPORT,
            time: "19:00",
            name: "返回巴勒莫",
            location: "Cefalù Station",
            description: "搭乘火車返回巴勒莫。",
        }
      ]
    },
    {
      day: 4,
      date: "12/24 (三)",
      location: "西西里島 (巴勒莫)",
      weather: { 
        temp: "16°C", 
        condition: "多雲", 
        icon: "⛅",
        rainProb: "10%",
        uvIndex: "中 (3)",
        outfitAdvice: "適合洋蔥式穿搭，早晚溫差大。",
        sunProtection: "基本防曬。"
      },
      items: [
        {
          id: "d4-1",
          type: ItineraryType.ATTRACTION,
          time: "08:00",
          name: "佩萊格​​里諾山",
          location: "Monte Pellegrino",
          description: "搭乘公車前往 Santuario (約 1h)。",
          tips: ["Stazione Centrale Balsamo 上車 (N2/101/102/107)", "Montepellegrino Loria 轉乘 812"]
        },
        {
          id: "d4-2",
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
      day: 5,
      date: "12/25 (四)",
      location: "西西里 -> 那不勒斯",
      weather: { 
        temp: "13°C", 
        condition: "多雲", 
        icon: "☁️",
        rainProb: "30%",
        uvIndex: "低 (2)",
        outfitAdvice: "移動日建議穿著舒適。那不勒斯可能會飄雨，建議攜帶折疊傘。",
        sunProtection: "基本保濕防曬即可。"
      },
      items: [
        {
          id: "d5-1",
          type: ItineraryType.TRANSPORT,
          time: "05:20",
          name: "前往機場",
          location: "Palermo Centrale",
          description: "搭乘 REG 21703 前往機場 (06:05 抵達)。",
          transportCode: "REG 21703",
          status: "準點"
        },
        {
          id: "d5-2",
          type: ItineraryType.TRANSPORT,
          time: "07:45",
          name: "飛往那不勒斯",
          location: "PMO Airport",
          description: "EasyJet EJU4102。08:40 抵達那不勒斯。",
          transportCode: "EJU 4102",
          status: "準點",
          externalLinks: [{ label: "機場到市區攻略", url: "https://xhslink.com/m/6nYyU05ycRb" }]
        },
        {
          id: "d5-3",
          type: ItineraryType.ATTRACTION,
          time: "10:30",
          name: "那不勒斯 City Walk",
          location: "Naples",
          description: "探索披薩的故鄉。",
          externalLinks: [{ label: "City Walk 攻略", url: "https://xhslink.com/m/ATd9HirB70T" }]
        },
        {
            id: "d5-4",
            type: ItineraryType.ATTRACTION,
            time: "14:00",
            name: "入住那不勒斯飯店",
            location: "60 Vico Tre Re a Toledo",
            description: "位於普萊比斯托區。每人4歐城市稅。",
        },
        {
          id: "d5-5",
          type: ItineraryType.RESTAURANT,
          time: "18:00",
          name: "那不勒斯美食",
          location: "Naples",
          description: "品嚐當地特色小吃與道地披薩。",
          externalLinks: [
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
      weather: { 
        temp: "12°C", 
        condition: "晴", 
        icon: "☀️",
        rainProb: "10%",
        uvIndex: "中 (4)",
        outfitAdvice: "火山區域完全無遮蔽，務必戴帽子。路面不平，請穿著防滑運動鞋。",
        sunProtection: "高強度防曬，建議每兩小時補擦。"
      },
      items: [
        {
          id: "d6-1",
          type: ItineraryType.TRANSPORT,
          time: "07:35",
          name: "前往龐貝",
          location: "Toledo -> Garibaldi -> Pompei",
          description: "07:35 地鐵 L1 至 Garibaldi，轉乘 08:26 區間車 CE 至 Pompei Scavi。",
          tips: ["備妥零錢"]
        },
        {
          id: "d6-2",
          type: ItineraryType.ATTRACTION,
          time: "09:05",
          name: "龐貝古城",
          location: "Pompeii",
          description: "參觀被火山灰掩埋的古羅馬城市。",
        },
        {
          id: "d6-3",
          type: ItineraryType.ATTRACTION,
          time: "13:00",
          name: "維蘇威火山",
          location: "Vesuvius",
          description: "搭乘 EVA 808 巴士上山 (Villa dei Misteri 發車)。14:10-15:20 參觀火山。",
          tips: ["13:00 巴士出發", "15:30 巴士回程"]
        },
        {
            id: "d6-4",
            type: ItineraryType.TRANSPORT,
            time: "17:01",
            name: "返回那不勒斯",
            location: "Pompei -> Naples",
            description: "搭乘 CE 返回 Garibaldi，轉乘地鐵回 Toledo。",
        },
        {
          id: "d6-5",
          type: ItineraryType.RESTAURANT,
          time: "19:00",
          name: "L'Antica Pizzeria Da Michele",
          location: "Naples",
          description: "世界知名的披薩名店。",
          mustEat: ["Margherita", "Marinara"],
          externalLinks: [{ label: "線上預訂", url: "https://www.damichele.net/" }]
        }
      ]
    },
    {
      day: 7,
      date: "12/27 (六)",
      location: "那不勒斯 -> 巴里 -> 蘑菇村",
      weather: { 
        temp: "11°C", 
        condition: "陰", 
        icon: "☁️",
        rainProb: "40%",
        uvIndex: "低 (1)",
        outfitAdvice: "普利亞地區冬天較為濕冷，建議穿著保暖大衣與防水鞋。",
        sunProtection: "陰天仍有紫外線，建議塗抹輕薄防曬。"
      },
      items: [
        {
          id: "d7-1",
          type: ItineraryType.TRANSPORT,
          time: "07:10",
          name: "巴士前往巴里",
          location: "Naples Varco Immacolatella",
          description: "搭乘巴士前往 Bari (10:40 抵達)。",
          indoorMap: "https://maps.app.goo.gl/ewZP44CTFwCTmtYA6"
        },
        {
          id: "d7-2",
          type: ItineraryType.ATTRACTION,
          time: "12:00",
          name: "阿爾貝羅貝洛 (蘑菇村)",
          location: "Alberobello",
          description: "12:00 出發前往蘑菇村，13:40 抵達。參觀 Trulli 建築群，17:00 返回。",
          tips: ["Church of Saint Lucia 旁平台可看全景"],
          externalLinks: [
             { label: "巴里-蘑菇村交通", url: "http://xhslink.com/o/6NADP7Yx5td" },
             { label: "蘑菇村攻略", url: "http://xhslink.com/o/4oTlc1IkrKO" },
             { label: "介紹", url: "https://yukigo.tw/post-46487457/" }
          ]
        },
        {
            id: "d7-3",
            type: ItineraryType.RESTAURANT,
            time: "18:00",
            name: "巴里晚餐",
            location: "Bari",
            description: "探索普利亞大區的海鮮料理。",
            externalLinks: [
                { label: "晚餐推薦 1", url: "http://xhslink.com/o/2zOD8rbNQsc" },
                { label: "晚餐推薦 2", url: "http://xhslink.com/o/8yem54j6HiW" }
            ]
        },
        {
            id: "d7-4",
            type: ItineraryType.ATTRACTION,
            time: "20:00",
            name: "入住巴里飯店",
            location: "Corte S. Pietro Vecchio, Bari",
            description: "位於 Bari 老城區。",
        }
      ]
    },
    {
      day: 8,
      date: "12/28 (日)",
      location: "巴里 -> 羅馬",
      weather: { 
        temp: "10°C", 
        condition: "雨", 
        icon: "🌧️",
        rainProb: "80%",
        uvIndex: "低 (1)",
        outfitAdvice: "羅馬雨天機率高，務必攜帶堅固的雨傘與穿著防水外套。古蹟石頭路濕滑請小心。",
        sunProtection: "無須特別防曬。"
      },
      items: [
        {
          id: "d8-1",
          type: ItineraryType.TRANSPORT,
          time: "08:40",
          name: "前往羅馬",
          location: "Bari Centrale",
          description: "08:20 抵達車站，08:40 出發，13:15 抵達 Roma Termini。",
          transportCode: "Train",
          status: "準點"
        },
        {
          id: "d8-2",
          type: ItineraryType.ATTRACTION,
          time: "13:30",
          name: "入住羅馬飯店",
          location: "Via Rimini, 14, Roma",
          description: "位於聖喬瓦尼區。每人 4.5 歐城市稅。",
          indoorMap: "https://maps.app.goo.gl/KLiMpCwJZQL9ah9r6"
        },
        {
          id: "d8-3",
          type: ItineraryType.ATTRACTION,
          time: "14:00",
          name: "羅馬 City Walk",
          location: "Rome",
          description: "下午城市漫步，晚上夜拍羅馬競技場、特雷維噴泉、Gelato 巡禮。",
          externalLinks: [{ label: "路線地圖", url: "https://maps.app.goo.gl/q6BZuBNZ1AEYBFsq8" }]
        },
        {
            id: "d8-4",
            type: ItineraryType.RESTAURANT,
            time: "16:00",
            name: "羅馬必吃麵包店",
            location: "Rome",
            mustEat: ["Forno Campo de 'Fiori (鮮花廣場)", "L’Antico Forno (特雷維噴泉旁)"],
            description: "開心果可頌和巧克力可頌是招牌。"
        }
      ]
    },
    {
      day: 9,
      date: "12/29 (一)",
      location: "羅馬",
      weather: { 
        temp: "11°C", 
        condition: "晴", 
        icon: "☀️",
        rainProb: "10%",
        uvIndex: "中 (3)",
        outfitAdvice: "適合拍照的一天！建議穿著鮮豔顏色的大衣，與羅馬古蹟形成對比。",
        sunProtection: "建議佩戴太陽眼鏡與塗抹防曬。"
      },
      items: [
        {
          id: "d9-1",
          type: ItineraryType.RESTAURANT,
          time: "07:30",
          name: "噴泉早餐",
          location: "Trevi Fountain Area",
          description: "享受羅馬的早晨。",
        },
        {
          id: "d9-2",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "梵諦岡聖門與 City Walk",
          location: "Vatican & Rome",
          description: "梵諦岡走聖門，接著逆著走的 City Walk。",
          mustEat: ["Forno Roscioli Esquilino (Via Buonarroti, 46/48)"],
          externalLinks: [{ label: "路線地圖 (逆行)", url: "https://maps.app.goo.gl/vL3DdqhwStoNHLRQ7" }]
        }
      ]
    },
    {
      day: 10,
      date: "12/30 (二)",
      location: "羅馬 -> 威尼斯",
      weather: { 
        temp: "8°C", 
        condition: "霧", 
        icon: "🌫️",
        rainProb: "20%",
        uvIndex: "低 (1)",
        outfitAdvice: "移動至北部，氣溫明顯下降。建議穿著發熱衣、圍巾與手套。",
        sunProtection: "無須特別防曬。"
      },
      items: [
        {
          id: "d10-1",
          type: ItineraryType.RESTAURANT,
          time: "08:30",
          name: "早餐: 奶油麵包",
          location: "Regoli Pasticceria",
          description: "好吃到併軌的奶油麵包。",
          externalLinks: [{ label: "地圖位置", url: "https://maps.app.goo.gl/7Ft7DKYKXn16E2qT8" }]
        },
        {
          id: "d10-2",
          type: ItineraryType.TRANSPORT,
          time: "09:35",
          name: "高鐵前往威尼斯",
          location: "Roma Termini -> Venice",
          description: "09:35 出發，13:25 抵達威尼斯。",
          transportCode: "Frecciarossa",
          status: "準點"
        },
        {
          id: "d10-3",
          type: ItineraryType.ATTRACTION,
          time: "14:00",
          name: "入住威尼斯飯店",
          location: "192 Via Aleardo Aleardi, Mestre",
          description: "位於 Mestre。每人 4 歐城市稅。",
        },
        {
          id: "d10-4",
          type: ItineraryType.ATTRACTION,
          time: "15:00",
          name: "威尼斯 City Walk",
          location: "Venice",
          description: "聖馬可廣場看夕陽，晚餐享用墨魚麵。",
          externalLinks: [
              { label: "City Walk 地圖", url: "https://maps.app.goo.gl/TkvCdUqphnTFkWfg7" },
              { label: "拍照機位", url: "http://xhslink.com/a/znJ2tBj2QF4Y" }
          ]
        }
      ]
    },
    {
      day: 11,
      date: "12/31 (三)",
      location: "威尼斯",
      weather: { 
        temp: "6°C", 
        condition: "晴", 
        icon: "☀️",
        rainProb: "0%",
        uvIndex: "低 (2)",
        outfitAdvice: "威尼斯水氣重，體感溫度低。跨年夜在戶外需準備暖暖包、厚毛帽與長大衣。",
        sunProtection: "冬陽柔和，基本防曬即可。"
      },
      items: [
        {
          id: "d11-1",
          type: ItineraryType.ATTRACTION,
          time: "08:00",
          name: "彩虹島 (Burano)",
          location: "Burano",
          description: "08:00-13:00 遊覽色彩繽紛的彩虹島。",
        },
        {
          id: "d11-2",
          type: ItineraryType.ATTRACTION,
          time: "14:00",
          name: "本島 City Walk",
          location: "Venice Main Island",
          description: "逆著走的路線，學院橋拍照，準備跨年。",
          externalLinks: [
             { label: "路線地圖", url: "https://maps.app.goo.gl/cnBrrF7sG69MJnHG7" },
             { label: "跨年攻略", url: "http://xhslink.com/o/8vIMGhCMODo" }
          ]
        },
        {
          id: "d11-3",
          type: ItineraryType.RESTAURANT,
          time: "18:00",
          name: "威尼斯必吃",
          location: "Venice",
          description: "精選威尼斯街頭小吃與經典墨魚麵。",
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
      weather: { 
        temp: "7°C", 
        condition: "陰", 
        icon: "☁️",
        rainProb: "10%",
        uvIndex: "低 (1)",
        outfitAdvice: "米蘭時尚之都，建議穿著剪裁俐落的深色大衣，搭配圍巾展現義式風格。",
        sunProtection: "無須特別防曬。"
      },
      items: [
        {
          id: "d12-1",
          type: ItineraryType.ATTRACTION,
          time: "09:00",
          name: "威尼斯晨間散步",
          location: "Venice",
          description: "Check-out 後寄放行李。最後的威尼斯漫步。",
          externalLinks: [{ label: "路線地圖", url: "https://maps.app.goo.gl/L2iG8JYmWzLfTuXV9" }]
        },
        {
          id: "d12-2",
          type: ItineraryType.RESTAURANT,
          time: "12:00",
          name: "Trattoria alla Rivetta",
          location: "San Marco",
          description: "午餐推薦 (在小橋邊)。",
        },
        {
          id: "d12-3",
          type: ItineraryType.TRANSPORT,
          time: "15:18",
          name: "高鐵前往米蘭",
          location: "Venice -> Milan",
          description: "15:18 出發，17:55 抵達米蘭。",
          transportCode: "Frecciarossa",
          status: "準點"
        },
        {
           id: "d12-4",
           type: ItineraryType.ATTRACTION,
           time: "18:10",
           name: "入住米蘭飯店",
           location: "Via Carpaccio, 3, Milan",
           description: "Check-in 後夜遊米蘭大教堂、二世迴廊。",
           mustEat: ["大教堂披薩餃"],
           indoorMap: "https://maps.app.goo.gl/4JvwsZsYmVDiDDpW9"
        }
      ]
    },
    {
      day: 13,
      date: "1/2 (五)",
      location: "米蘭 <-> 盧加諾 (瑞士)",
      weather: { 
        temp: "4°C", 
        condition: "雪", 
        icon: "❄️",
        rainProb: "60%",
        uvIndex: "低 (1)",
        outfitAdvice: "進入阿爾卑斯山區，可能會下雪。務必穿著防水雪靴、厚羽絨衣、手套與毛帽。",
        sunProtection: "若有積雪，雪地反射紫外線強，請務必佩戴太陽眼鏡與塗抹防曬。"
      },
      items: [
        {
          id: "d13-1",
          type: ItineraryType.ATTRACTION,
          time: "07:30",
          name: "瑞士盧加諾一日遊",
          location: "Lugano",
          description: "跨越邊境前往瑞士湖畔城市盧加諾。12:00 返回米蘭。",
          externalLinks: [{ label: "盧加諾攻略", url: "https://xhslink.com/m/2joDmdcGgnM" }]
        },
        {
            id: "d13-2",
            type: ItineraryType.ATTRACTION,
            time: "14:00",
            name: "米蘭人骨教堂",
            location: "San Bernardino alle Ossa",
            description: "參觀獨特的人骨教堂。",
        }
      ]
    },
    {
      day: 14,
      date: "1/3 (六)",
      location: "米蘭 -> 上海",
      weather: { 
        temp: "8°C", 
        condition: "晴", 
        icon: "☀️",
        rainProb: "0%",
        uvIndex: "低 (2)",
        outfitAdvice: "返程飛行，建議穿著寬鬆舒適的棉質衣物。",
        sunProtection: "無須特別防曬。"
      },
      items: [
        {
          id: "d14-1",
          type: ItineraryType.TRANSPORT,
          time: "10:20",
          name: "抵達機場",
          location: "MXP",
          description: "12:10 起飛返回上海。",
          transportCode: "CA 836",
          terminal: "T1",
          status: "準點",
          indoorMap: "https://www.milanomalpensa-airport.com/en/airport-services/maps"
        }
      ]
    },
     {
      day: 15,
      date: "1/4 (日)",
      location: "上海 -> 台灣",
      weather: { 
        temp: "20°C", 
        condition: "晴", 
        icon: "🏠",
        rainProb: "0%",
        uvIndex: "中 (5)",
        outfitAdvice: "回到溫暖的家。",
        sunProtection: "日常防曬。"
      },
      items: [
        {
          id: "d15-1",
          type: ItineraryType.TRANSPORT,
          time: "06:20",
          name: "抵達浦東",
          location: "PVG",
          description: "等待轉機回台。",
          terminal: "T2",
          status: "準點"
        },
        {
            id: "d15-2",
            type: ItineraryType.TRANSPORT,
            time: "12:05",
            name: "飛往台灣",
            location: "PVG -> TPE",
            description: "14:00 抵達台灣。",
            transportCode: "CI 502",
            terminal: "T2",
            status: "準點",
        }
      ]
    }
  ]
};
