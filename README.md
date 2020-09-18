# 拼车业务模型分析

1. 明确我们的目标用户是谁(人找车、车找人、货找车、车找货)
   .乘客 -临时、固定时间

   .司机 -载客司机
   .临时、专业

   -载货司机
   .临时、专业

2. 主体流程
   连接需求-供应方和需求方

3. 功能
   1、发布用户需求（发布之后预览功能） -拼车类型、出发时间、时间补充、出发地、目的地、途径、车型、空位/人数、手机、更多

   2、需求列表
   ① 主要展示 展示形式（是否带车图片、还是纯文字）
   ② 点击进入详细，会用司机服务的具体数据和评价，主要是优势展示(考虑不好的展示)
   ③ 列表页可以根据出发日期进行排序

   3、热门路线 -根据需求列表数据计算

   4、线路查询 -出发地 到 目的地

   5、轮播图（可选）

   6、分享发布的行程（到微信用户、微信群）

4. 数据结构与细节
   拼车列表: list:
   -type:1 人找车、2 车找人、3 车找货、 4 货找车
   -go-off 出发时间
   -departure 出发地
   -destination 目的地
   -way 途径
   -model 车型
   -Vacancy / people 空位/人数
   -phone 手机

   carpool(表)
   -type 1 人找车、2 车找人、3 车找货、 4 货找车
   -go-off 出发时间
   -Departure 出发地
   -destination 目的地
   -phone 手机
   -publish 发布时间

   人(表):
   -id 用户 id
   -username 用户名称
   -avatar 用户头像
   -people 人数

   车(表):
   -id 车辆 id
   -way 途径
   -model 车型
   -Vacancy 空位

   货(表):
   -model 车型
   -Vacancy 空位
   -way 途径

## How to use CLI?

1. install `typeorm` globally: `npm i -g typeorm`
2. run `typeorm -h` to show list of available commands
