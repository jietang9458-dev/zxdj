const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const rightsStr = `export function CopyrightRights() {
  const rights = [
    "成为中星影视生态链的联合制片人，销售推广中星影视生态链的版权和其他业务，享受销售的佣金和平台公司奖励。",
    "颁发电子版“中星影视生态链的联合制片人”牌匾，牌匾内有个人的照片和名字。",
    "每份版权按照票房版权方收益的（A: AI短剧2%，B：精品短剧1%，C：明星短剧0.5%）比例，长期享受版权收益，每月支付一次。",
    "销售佣金每份版权2000元。",
    "完成销售三份版权后公司奖励4000元。",
    "三份版权中其中两份版权完成三份版权的销售，平台公司再奖励2000元。",
    "完成3组同类型版权销售后，公司随机奖励一份同类型版权（价值10000元），与购买版权享受同等的权利。",
    "可以参加明星俱乐部活动，与明星互动。",
    "可以参与公司的发布会、开机仪式、片场探班等。",
    "可以参演公司的短剧（AI短剧除外）。"
  ];`;

const newRightsStr = `export function CopyrightRights() {
  const { pages } = useCMS();
  const rawRights = pages.copyright?.rights || [
    { text: "成为中星影视生态链的联合制片人，销售推广中星影视生态链的版权和其他业务，享受销售的佣金和平台公司奖励。" },
    { text: "颁发电子版“中星影视生态链的联合制片人”牌匾，牌匾内有个人的照片和名字。" },
    { text: "每份版权按照票房版权方收益的（A: AI短剧2%，B：精品短剧1%，C：明星短剧0.5%）比例，长期享受版权收益，每月支付一次。" },
    { text: "销售佣金每份版权2000元。" },
    { text: "完成销售三份版权后公司奖励4000元。" },
    { text: "三份版权中其中两份版权完成三份版权的销售，平台公司再奖励2000元。" },
    { text: "完成3组同类型版权销售后，公司随机奖励一份同类型版权（价值10000元），与购买版权享受同等的权利。" },
    { text: "可以参加明星俱乐部活动，与明星互动。" },
    { text: "可以参与公司的发布会、开机仪式、片场探班等。" },
    { text: "可以参演公司的短剧（AI短剧除外）。" }
  ];
  const rights = rawRights.map((r: any) => r.text);`;

content = content.replace(rightsStr, newRightsStr);

const modelStr = `export function SalesModel() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="销售模式" dark />
      <div className="p-8">
        <div className="space-y-8">
          {[
            { t: '区域子公司管理模式', d: '针对中星短剧地方影视文化服务中心、代理公司进行全方位的业务赋能与区域管理支持。', i: <Briefcase className="text-orange-500"/> },
            { t: '分销代理模式', d: '成为地方（中星短剧XX影视文化服务中心）代理销售 or 平台、团队代理，享受高额销售返佣和平台分红。', i: <Users className="text-blue-500"/> },
            { t: '销售模式', d: '凡是购买一份短剧版权者，获得电子版”中星影视生态链联合制片人“牌匾，牌匾里有本人的照片和名字。就可以直接销售中星影视生态链的短剧版权，首次直接销售3份版权就全额回本（每销售一份，佣金2000元；完成销售3份，平台公司奖励4000元；销售的3份版权中，其中2份各自再销售3份，平台公司再奖励2000元。）。完成以上9份版权销售。即为完成一组销售，可收益12000元。完成一组销售后，开启另一组销售，完成3组销售后，平台公司随机奖励一份版权，与购买的版权享受同等权益。', i: <TrendingUp className="text-green-500"/> }
          ].map((m, i) => (`;

const newModelStr = `export function SalesModel() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const rawModels = pages.copyright?.salesModels || [
    { t: '区域子公司管理模式', d: '针对中星短剧地方影视文化服务中心、代理公司进行全方位的业务赋能与区域管理支持。' },
    { t: '分销代理模式', d: '成为地方（中星短剧XX影视文化服务中心）代理销售 or 平台、团队代理，享受高额销售返佣和平台分红。' },
    { t: '销售模式', d: '凡是购买一份短剧版权者，获得电子版”中星影视生态链联合制片人“牌匾，牌匾里有本人的照片和名字。就可以直接销售中星影视生态链的短剧版权，首次直接销售3份版权就全额回本（每销售一份，佣金2000元；完成销售3份，平台公司奖励4000元；销售的3份版权中，其中2份各自再销售3份，平台公司再奖励2000元。）。完成以上9份版权销售。即为完成一组销售，可收益12000元。完成一组销售后，开启另一组销售，完成3组销售后，平台公司随机奖励一份版权，与购买的版权享受同等权益。' }
  ];
  
  const getIcon = (index: number) => {
    if (index % 3 === 0) return <Briefcase className="text-orange-500"/>;
    if (index % 3 === 1) return <Users className="text-blue-500"/>;
    return <TrendingUp className="text-green-500"/>;
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="销售模式" dark />
      <div className="p-8">
        <div className="space-y-8">
          {rawModels.map((m: any, i: number) => (`;

content = content.replace(modelStr, newModelStr);
content = content.replace('{React.cloneElement(m.i as React.ReactElement, { size: 28 })}', '{React.cloneElement(getIcon(i) as React.ReactElement, { size: 28 })}');

fs.writeFileSync('src/pages/SubPages.tsx', content);
