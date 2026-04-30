/* NOORANI FABRICS — Product Data Fallback */
const PRODUCTS_FALLBACK = [
  {id:1,name:"SAIBAN LAWN 3PC",cat:"3piece",price:5990,oldPrice:15000,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",img2:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.05_PM.jpeg",sizes:["s","m","l","xl"],sold:45,stock:55,desc:"Elegant Anarkali 3-piece suit with farshi shalwar. Premium fabric with beautiful embroidery work.",badge:"sale",is_trending:true,is_featured:true},
  {id:2,name:"FAHMI HEAVY EMB SET",cat:"embroidery",price:4690,oldPrice:9000,img:"/images/hero3.png",img2:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.02_PM_1.jpeg",sizes:["s","m","l","xl"],sold:64,stock:36,desc:"Heavy embroidery set with intricate hand work. Premium chiffon fabric.",badge:"sale",is_trending:true},
  {id:3,name:"KASHAF HANDMADE SET",cat:"embroidery",price:3800,oldPrice:9800,img:"/images/hero2.png",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",sizes:["s","m","l","xl"],sold:66,stock:34,desc:"Handmade embroidery set with premium cotton fabric and beautiful craftsmanship.",badge:"sale",is_trending:true},
  {id:4,name:"MONOCHROM CORD SET",cat:"casual",price:4250,oldPrice:5499,img:"/images/hero2.png",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",sizes:["s","m","l","xl"],sold:25,stock:75,desc:"Beautiful purple 3-piece suit perfect for formal occasions and events.",badge:"new",is_trending:true},
  {id:5,name:"ABIRA 3PC",cat:"3piece",price:4500,oldPrice:8200,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.05_PM.jpeg",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",sizes:["s","m","l","xl"],sold:38,stock:62,desc:"Premium Abira 3-piece suit with digital print and matching dupatta.",badge:"sale",is_trending:true},
  {id:6,name:"NAZAR 3PC",cat:"3piece",price:3890,oldPrice:7990,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",sizes:["s","m","l","xl"],sold:52,stock:48,desc:"Eshal lawn pocket set with farshi shalwar. Comfortable and stylish.",badge:"sale",is_trending:true},
  {id:7,name:"AIRA LAWN 3PC",cat:"3piece",price:4350,oldPrice:7490,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",img2:"/images/hero3.png",sizes:["s","m","l","xl"],sold:71,stock:29,desc:"Aira lawn 3-piece with premium quality fabric and elegant design.",badge:"sale",is_trending:true},
  {id:8,name:"EID SPECIAL SET",cat:"3piece",price:3900,oldPrice:8800,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.02_PM_1.jpeg",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.02_PM_1.jpeg",sizes:["s","m","l","xl"],sold:33,stock:67,desc:"Special Eid edition Dyot lawn set with beautiful embroidery work.",badge:"new",is_trending:true},
  {id:9,name:"UROOJ EMB 3PC",cat:"embroidery",price:4200,oldPrice:6350,img:"images/hero3.png",img2:"/images/hero2.png",sizes:["s","m","l","xl"],sold:45,stock:55,desc:"Urooj embroidery 3-piece with monar dupatta. Elegant formal wear.",badge:"sale"},
  {id:10,name:"ASHNA CO-ORD SET",cat:"casual",price:4300,oldPrice:6499,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",img2:"/images/hero2.png",sizes:["s","m","l","xl"],sold:64,stock:36,desc:"Luxury cotton co-ord set perfect for casual and semi-formal occasions.",badge:"sale"},
  {id:11,name:"MEHAR 3PC",cat:"3piece",price:4200,oldPrice:7200,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",img2:"/images/hero2.png",sizes:["s","m","l","xl"],sold:66,stock:34,desc:"Mehar 3-piece suit with farshi shalwar. Premium fabric quality.",badge:"sale"},
  {id:12,name:"ADAAB 3PC",cat:"3piece",price:4500,oldPrice:8400,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.05_PM.jpeg",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.02_PM_1.jpeg",sizes:["s","m","l","xl"],sold:25,stock:75,desc:"Adaab 3-piece — elegance in every thread. Premium formal wear.",badge:"sale"},
  {id:13,name:"ZARA CASUAL TOP",cat:"casual",price:2500,oldPrice:3500,img:"/images/hero3.png",img2:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.02_PM_1.jpeg",sizes:["s","m","l","xl"],sold:40,stock:60,desc:"Comfortable casual top perfect for everyday wear.",badge:"new"},
  {id:14,name:"SANA EMBROIDERED TUNIC",cat:"embroidery",price:4800,oldPrice:6500,img:"images/hero3.png",img2:"/images/hero2.png",sizes:["s","m","l","xl"],sold:30,stock:70,desc:"Beautiful embroidered tunic with intricate designs.",badge:"new"},
  {id:15,name:"LAYLA DENIM JACKET",cat:"casual",price:5200,oldPrice:7200,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",img2:"/images/hero2.png",sizes:["s","m","l","xl"],sold:20,stock:80,desc:"Stylish denim jacket for casual outings.",badge:"new"},
  {id:16,name:"MAIRA PRINTED SCARF",cat:"casual",price:1800,oldPrice:2500,img:"/images/hero1.png",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.05_PM.jpeg",sizes:["free"],sold:50,stock:50,desc:"Colorful printed scarf to complement any outfit.",badge:"sale"},
  {id:17,name:"NAYAB 2PC LAWN",cat:"2piece",price:3250,oldPrice:5500,img:"/images/hero2.png",img2:"media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg",sizes:["s","m","l","xl"],sold:42,stock:58,desc:"Elegant 2-piece lawn set with printed shirt and matching trousers.",badge:"new"},
  {id:18,name:"ZIMAL 2PC LINEN",cat:"2piece",price:3400,oldPrice:5900,img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.05_PM.jpeg",img2:"/images/hero1.png",sizes:["s","m","l","xl"],sold:28,stock:72,desc:"Soft linen 2-piece suit, perfect for seasonal transitions.",badge:"new"},
];

const PURCHASE_NOTIFS = [
  {name:"Rabia",city:"Kashmir",product:"NISHA EMB CORD SETS",img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.05_PM.jpeg"},
  {name:"Zainab",city:"Karachi",product:"MEENA DIGITAL 3PC",img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.03_PM.jpeg"},
  {name:"Ayesha",city:"Lahore",product:"FAHMI HEAVY EMB SET",img:"/media/products/WhatsApp_Image_2026-04-25_at_8.18.02_PM_1.jpeg"},
  {name:"Sara",city:"Islamabad",product:"KASHAF HANDMADE SET",img:"/images/hero1.png"},
];

function fmtPrice(n){return"Rs. "+n.toLocaleString()+".00"}
function discPct(p,o){return o?Math.round(((o-p)/o)*100):0}
function getCat(c){return{"3piece":"3Pc Collection","2piece":"2Pc Collection","embroidery":"Embroidery","casual":"Casual Wear","new":"New Arrivals"}[c]||c}
