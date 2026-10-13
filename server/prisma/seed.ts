import 'dotenv/config'; import {PrismaClient,Role,ItemType,Condition} from '@prisma/client'; import bcrypt from 'bcryptjs';
const p=new PrismaClient();
async function main(){if(process.env.NODE_ENV==='production')throw new Error('Demo seed disabled in production');
const staff=await p.user.upsert({where:{email:'coordinator@demo.local'},update:{},create:{email:'coordinator@demo.local',passwordHash:await bcrypt.hash('DemoCoordinator!2026',12),role:Role.COORDINATOR}});
const su=await p.user.upsert({where:{email:'student@demo.local'},update:{},create:{email:'student@demo.local',passwordHash:await bcrypt.hash('DemoStudent!2026',12),role:Role.STUDENT}});
await p.student.upsert({where:{enrolmentNo:'DEMO-DFIS-001'},update:{},create:{userId:su.id,name:'Demo Student (Sample)',enrolmentNo:'DEMO-DFIS-001',programme:'M.Sc. DFIS',semester:1,contact:'student@demo.local'}});
const c=await p.category.upsert({where:{name:'Forensic Equipment'},update:{},create:{name:'Forensic Equipment'}});
const l=await p.location.upsert({where:{name:'Digital Forensics Lab'},update:{},create:{name:'Digital Forensics Lab'}});
const b=await p.item.upsert({where:{code:'DEV-BOARD'},update:{},create:{code:'DEV-BOARD',name:'Development Board',categoryId:c.id,description:'Demo individually tracked development boards',makeModel:'Generic',type:ItemType.ASSET,totalQty:10,locationId:l.id}});
await p.item.upsert({where:{code:'USB-CABLE'},update:{},create:{code:'USB-CABLE',name:'USB Cable',categoryId:c.id,description:'Reusable USB cables',makeModel:'USB-A to USB-C',type:ItemType.QUANTITY,totalQty:20,locationId:l.id}});
for(let i=1;i<=10;i++)await p.asset.upsert({where:{assetTag:'DEV-'+String(i).padStart(3,'0')},update:{},create:{assetTag:'DEV-'+String(i).padStart(3,'0'),itemId:b.id,locationId:l.id,condition:Condition.GOOD,available:true}});
console.log('Demo data ready. Coordinator:',staff.email,'Student: student@demo.local');}
main().finally(()=>p.$disconnect());
