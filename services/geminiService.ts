
import { Product } from "../types";

// A rich, static database of products with specific images
const STATIC_PRODUCTS: Product[] = [
    // DESAYUNOS & SORPRESAS
    {
        id: "des-1",
        name: "Desayuno Sorpresa Amor",
        description: "Delicioso desayuno con sándwich gourmet, jugo de naranja natural, fruta picada, chocolates y decoración romántica con globos y tarjeta.",
        price: 85000,
        category: "Desayunos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczNKTJUGeEkZZAUfOIhhLrYp8D4F2DQuyr8JdGT8uFy3SbrkHG_azP-iz2-O-AXIJ5Hwx5svv13OefhRuvJkYDqZKX_Pz5JJjxHOjwk_9JStwlaHjQkrz10G5E21jvqEPLbC9t-w-Mn-HOuN7Hyh_Lgo=w610-h991-s-no-gm?authuser=0"
    },
    {
        id: "des-2",
        name: "Desayuno Cumpleaños Feliz",
        description: "Incluye torta personal, velita, yogurt, cereal, wrap de pollo, jugo y decoración festiva con globos numéricos.",
        price: 95000,
        category: "Desayunos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczM86Qnjxvqqxs-7Cka_QaaBy9uxdbfb6P16BI3HXpAzLnaPfKMkQfkycaSFecvyeXjPDmzMDJHhOp1_wjxy2FDUMRr-i6gWyy1hvxyYD08SEDzcWQFAa39UsJofU6_U47qSFJ2FvwSCqMIamLF0bLuV=w659-h964-s-no-gm?authuser=0"
    },
    {
        id: "des-3",
        name: "Desayuno Fit & Fresh",
        description: "Parfait de frutas, tostadas integrales, huevos al gusto, té hatsu y decoración minimalista.",
        price: 78000,
        category: "Desayunos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczNccaYH3F_h3m4mlWK4AjVnoorENSsMqWtSFoi20eoefQ1kVKHp1mSiqPxy43BE7LJNx3qL15Qr4VTZ-eEmapW77i8bVVFDmhaXn2xQc5bOsmjNVaDHBondQnZ1w6M_3WfQXpPrC7Z4xpp8gm65OQlz=w771-h991-s-no-gm?authuser=0"
    },
    {
        id: "des-4",
        name: "Sorpresa Especial en Caja",
        description: "Caja decorada con detalle de peluche pequeño, chocolates Ferrero y rosa natural.",
        price: 65000,
        category: "Desayunos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOpXDh3icJxZKN_u7QFT33SPT2vdrd4aY1ae-FZlYB_KbOeTG2desyYMQQ2YGXa4KtXwoTqpWV08sddUs1Npvqbf5XcUMOTU2FX2HKc-iIQBKvzp-fJdf-HsrZ9ITHQDjbQqEHRJ8fIDHwXocBH1LZD=w587-h991-s-no-gm?authuser=0"
    },
    
    // ANCHETAS
    {
        id: "anch-1",
        name: "Ancheta Dulce Tentación",
        description: "Canasta decorada con variedad de chocolates importados, galletas finas, masmelos y una botella de vino espumoso.",
        price: 150000,
        category: "Anchetas",
        image: "https://lh3.googleusercontent.com/pw/AP1GczO9X4FM_aAGBdKuHI3ubj0UPDmCm65quxzkrAeen53w01mfZmjUhSXHpNqMRsVVsmVcffIsAi5aUZKO_ovHF_92SZ-PFE_hpmCqgu9tCs4fKeytZN2YiRyDJvUx1_PJpyW8lvV3gTVuvTqkUrm-SgpI=w523-h991-s-no-gm?authuser=0"
    },
    {
        id: "anch-2",
        name: "Ancheta Cervecera",
        description: "Caja de madera con 4 cervezas importadas, mix de frutos secos, papas pringles y jarro cervecero personalizado.",
        price: 110000,
        category: "Anchetas",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMOrTSsFvhATcGk6gL4vvv-7_aFCMVxXeVExprMWoO4CXURMDCfrcKLKxRlJMdBqJJFWU2nkBlsY9bHLX-GbZ4S5ojAWRD2M5BkG1sVUEelI_Pbyr3W9Xlw4x5lZS9-TFsCOF2RhZaJJAlnQ4X-ROIT=w513-h762-s-no-gm?authuser=0"
    },
    {
        id: "anch-4",
        name: "Ancheta Vinos y Quesos",
        description: "Tabla de quesos madurados, jamón serrano, vino cabernet y decoración elegante.",
        price: 160000,
        category: "Anchetas",
        image: "https://lh3.googleusercontent.com/pw/AP1GczPQhpiloa8gl1eGdi7xUS8qwQZ3IZx--XCwFCrN62Flf24OsS0koz98WwJhb__SWLLKDd99MgSb7f1RelWitdcaY9NxSndK78jRViNcJINXmTNIjZ3lFFglMNucjjhRIKZxXI2UXvWNLqI-vrLwszT8=w660-h991-s-no-gm?authuser=0"
    },

    // PELUCHES
    {
        id: "pel-1",
        name: "Oso de Peluche Gigante",
        description: "Oso de peluche suave de 1 metro de altura, ideal para abrazar y sorprender a esa persona especial.",
        price: 120000,
        category: "Peluches",
        image: "https://lh3.googleusercontent.com/pw/AP1GczM8UeAbr84WZJzJEMgfrIAlzHn9Ys_lpq8fEWlkzgtXkZ94AF3piWZRKuvMOYuOHjE7PeHkx_rVxgvTsraUD7bo4HZdWo1fbPtaz6-Jk8yTT4w2lYyxBuFE1xf3iQTX1O_NRDKrWKpSq2znCJkv-4lh=w826-h991-s-no-gm?authuser=0"
    },
    {
        id: "pel-2",
        name: "Pareja de Ositos",
        description: "Dos ositos abrazados con corazón 'Te Amo'. Perfecto para aniversarios.",
        price: 65000,
        category: "Peluches",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMvO4Bqoosict8FcThYxDw9By24grhyEp7U3zx1Ck_j09Lj7kkCtBLgMmmMJl7kDXp5_9tUNqffJnmycJ1eWB4RWfsWAmdQq6owGbIidYqnZxnfx6S-1gm8HtL-LUVCWnf3jjPzHBNESGqJXtA_LMra=w695-h929-s-no-gm?authuser=0"
    },
    {
        id: "pel-3",
        name: "Stitch y Angel",
        description: "Peluche del personaje Stitch de 40cm, muy suave y detallado, ideal para fans de Disney.",
        price: 55000,
        category: "Peluches",
        image: "https://lh3.googleusercontent.com/pw/AP1GczNxT4e1axV1c90ALkvJy_hBVeChaEHP3gB6YsIBY1LKnHLkfwrWqex4NUrcKKHWf1-XaJpwYJCYAESjYx2ENcMLC2MOXR78xHmmeZNOME_8gVXJYU_0zP9tzGa7yPCGebzb2gIboTQxIriJ1Xrlt9q0=w499-h991-s-no-gm?authuser=0"
    },

    // MUGS Y DETALLES
    {
        id: "mug-1",
        name: "Mug Personalizado",
        description: "Taza de cerámica con mensaje positivo y diseño floral único.",
        price: 35000,
        category: "Mugs",
        image: "https://lh3.googleusercontent.com/pw/AP1GczPHerhl8hRvG8UTx_MVvNYJkbAg8HO9ZwjZiiKAuO9-F1u8PNlRFo4Cq9WWrqTvVpjc5MqtFpxTfOCm6gkCPpAVXq4yP_Z7CW4iVX2GPKc0ZiwHLOys7vwmfczZ9VO34wvPCmrC3U6X1eCNdfPz50h5=w755-h991-s-no-gm?authuser=0"
    },
    {
        id: "mug-2",
        name: "Kit Mug y Chocolates",
        description: "Mug decorado lleno de chocolates y dulces, empacado en celofán con moño.",
        price: 50000,
        category: "Mugs",
        image: "https://lh3.googleusercontent.com/pw/AP1GczO3lqdF9MS5_9iq6TjjHcLgGF_9at-fAtsvl8886A3x_Bwf-RJZocedA7BEd8fP3ELzyrw-lXNfDh0zWbUgNEZNzWm3f8QQlYfmNnVR8Yfsg1l7yKRz8BCPMOqFCDLci_2aELVGXNyypHVqrkoPFzDS=w776-h991-s-no-gm?authuser=0"
    },

    // COJINES & DECORACIÓN
    {
        id: "coj-1",
        name: "Cojín Decorativo",
        description: "Cojín suave de 40x40cm con mensaje inspirador o romántico estampado.",
        price: 45000,
        category: "Cojines",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMevhOb5wH9e0UJ37rDl_e_1sZo-AaRliyz1VxsRPzK_LHeFyvCVN7xI1D5tcdMoqa0QbesVubgWalKFCB35I0gxvWoZxBrjoMPcSelVo9gR8fFauHjiH3SJyJlM4dnrPVF_lOdp_XRa_jMt9xPFFWs=w574-h991-s-no-gm?authuser=0"
    },
    {
        id: "coj-2",
        name: "Cojín Personalizado",
        description: "Cojín cuadrado impreso en alta definición con la foto y frase que tú elijas.",
        price: 55000,
        category: "Cojines",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMvN5g-mXQmFLKMC5wL8swuLub3Hsx6vBN4RBDPTxhW5kWQH38jvneeRUrBpfVUrh1ygsUsPIRWAm4NdsuMp7I33io_U2560OoSfAQyMgI0PT00jX4FYV7TTzwOWAOorzKji_u5nBSMbPd-V2OShFTT=w502-h991-s-no-gm?authuser=0"
    },

    // PIÑATERÍA & GLOBOS
    {
        id: "pin-1",
        name: "Ramo de Globos",
        description: "Set de 5 globos metalizados con helio, personalizados con el nombre y motivo de la celebración.",
        price: 60000,
        category: "Piñatería",
        image: "https://lh3.googleusercontent.com/pw/AP1GczNCvZoFQzonmbJrFN4P0d6scc35LXcWZxyUIwmJf4L9koadLrUx5HpvQupD_72pXs9_m_zBTEDtENujzm9X8HlKX7N96KB_zRuoaTsri5Av0kaYs6HWg8bxxp0jOnWLtcM21LMcqwxLQ7w5M8tVkFb5=w541-h991-s-no-gm?authuser=0"
    },
    {
        id: "pin-2",
        name: "Bouquet de Globos",
        description: "Arreglo grande de globos para cumpleaños o bienvenidas.",
        price: 40000,
        category: "Piñatería",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMz5shswgsPx7s2HOCdD8Aa2fYcpvclbbi4UC2W7J2PBD5CQAaDTGV5f49t1HQRhaeTdYbO0LGEJDL0_cBYzVxNMjk4mz9oJFO1o80t2dbUE-lBZFnFdkWVLOHbuHudRtiVOu0q5r-OZNyRKN8B2rHP=w588-h991-s-no-gm?authuser=0"
    },

    // BILLETERAS & ACCESORIOS
    {
        id: "bill-1",
        name: "Billetera Elegante",
        description: "Billetera con múltiples compartimentos, disponible en varios colores. Incluye caja de regalo.",
        price: 95000,
        category: "Billeteras",
        image: "https://lh3.googleusercontent.com/pw/AP1GczM4QlYykINgn8n4KjvS-WV5-d5wxQ-6XVHhKbZAi8n-UYtS8eVDaV0GgDH0IibbE6A68g4j5vofnZQL6HimgA7LZT6ivbY-pzWwPoypoCrjR7Eu40wCMYKZyxzWWFphi6kPNDBMTm1i-cT51JEPXUIf=w648-h889-s-no-gm?authuser=0"
    },
    {
        id: "bill-2",
        name: "Bolso Pequeño",
        description: "Bolso tipo cartera, práctico y con diseño moderno.",
        price: 45000,
        category: "Billeteras",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMKDyJ10yxIydluSqe9-KnUc5DYG7no41i2NpnbR0VTDz18vc0LzkKTUrsMFHWJRQ2BmKNKbWKiREolz7NnW-J8mMyb2XC_GUGNkFu58-CekGBptEtZfgNUDpsWnYhOYKFL8LEM3F0svW0sMeV_jHiy=w644-h991-s-no-gm?authuser=0"
    },

    // COSMÉTICOS
    {
        id: "cos-1",
        name: "Kit de Belleza",
        description: "Set de belleza con cremas y lociones, presentado en un hermoso estuche.",
        price: 75000,
        category: "Cosméticos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczNKMJhAatNlJoyg_LRbflHV6CbQ-aXG4pCmbG7J1oS2NcXs0T4yWgrIUxQfOizkTZyYJuvnVVIlLqqa61gxjAk4lhNpw5V8WHA66HZPrru5Ib7Aq6DmCtTXwXzz2D4OgklnVh46PtRMYSMGH9zPcua9=w537-h991-s-no-gm?authuser=0"
    },
    {
        id: "cos-2",
        name: "Set de Maquillaje",
        description: "Variedad de productos de maquillaje básico para regalo.",
        price: 55000,
        category: "Cosméticos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczPUd_DAFkDlEBFWUEor4y1R5-JADq_O338D5EWTRvF3NVJ4VxdplAnHHk7q8SKLhPf5hC0Dx9C3QhHsZUMS7-ZmrX_FSh4SPu7dbpYXa8Zg2c7kVXxzHdjtAopuD4D2lqJpNY_nD_vIZ3tAL8XV_3nm=w547-h991-s-no-gm?authuser=0"
    },

    // CAJAS Y EMPAQUES
    {
        id: "caj-1",
        name: "Caja de Regalo",
        description: "Caja rígida decorada con moño de tela, papel seda y tarjeta.",
        price: 20000,
        category: "Empaques",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOTh3hrDi_JnwKyfj1_I8SAdYA_eACVn5GcBBwOtMtlI2hMFpmZtSDq3KNlz4GGJq9BxcAD275HkeABEsL8FFTG-OrYIItWPZwIXCVVVdtYOxt-cSojU4iyfph9RXqzPDtRuVu-kWLOJdncdWyYgP7U=w557-h919-s-no-gm?authuser=0"
    },
    {
        id: "caj-2",
        name: "Bolsa Sorpresa",
        description: "Bolsa decorada con motivos festivos.",
        price: 12000,
        category: "Empaques",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOEORQ3o5JGtSrcohNDoqka0yUxHNldEPF84fF1qKyaJZ1dH1JtQPYvXSSVmmWWKVjyI7eyWBgDtpDaLNqMpMdiDSMLyc9aa2DL7EYbVsEECnVea-tBpBI4eFeRcCL2e587I9PR7nTxeHt04iGNMGiM=w690-h991-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-1",
        name: "Detalle Floral",
        description: "Arreglo pequeño con flores y chocolates.",
        price: 45000,
        category: "Regalos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczP85RQiUzQ9lDaCelZ77Qt-gc-F-Y9yIO2C6TvwdWVKol2uD37kZB14wKRYZyvFf2JbX0pe8vU6Xv5EYiRSL0QVo-spoIeW9lGfpQZKwWaNNNPFa6sUTGqerXyp8fFvkI1AFIKz08TPfVOpM-NRAR0Q=w667-h991-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-2",
        name: "Botella Decorada",
        description: "Botella con mensaje personalizado y dulces en su interior.",
        price: 30000,
        category: "Regalos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMNBmNBfn81TIF15kEk-W357g6TVb375YDf6ff6uPShVUuCk5YRWelHa5YF2MbRsxW07CAwyf-Aa-9g8hUt2zfTsCh8RvxuODFp3N1DMfP4cvVl8UnMnUAbJ1-OlC4QxtZOEKs0gkfgOV3tSpaj0coO=w621-h991-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-3",
        name: "Caja Dulces Surtidos",
        description: "Caja con divisiones llena de gomitas, chocolates y masmelos.",
        price: 35000,
        category: "Regalos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMv4TlcaJ-ZGeT2ZjRk31TxH-cDx_-YGnRzSb-8K6n52JooUAo_NZ8LgpAnJjM0ljazZgwS3EXp00m04RoT7vUm0AbihJnqxhdZ3AkggGs_3mz7BuUkb0jZ5kWPyBnvkmoZLdtLAn-Lc12kyHV3uEoe=w631-h860-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-4",
        name: "Detalle Amor",
        description: "Pequeño detalle con corazón y frase romántica.",
        price: 25000,
        category: "Regalos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMTd_HFRvDyZ1FFzprcxMyZXrTj-8E8nBB00OA_3f1E5hQOe_Zv70Tbrnmr39s-9NFA0BOIEY_V_nmxj2kHCzbOUnN_xCK4KBm-_sl0A5VmnhToQffLS17ZBw8x4F6_-p0U85HG2VCvysNr1jhR4zAE=w718-h977-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-5",
        name: "Kit Cumpleaños",
        description: "Todo lo necesario para una celebración express.",
        price: 50000,
        category: "Piñatería",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOxo_eAEnO0GqsytnE5tH5ujoaFHuzOpxXAzjb_sZxzdHavnzsKwlK3VCbsBZG04w-8Wg1NqtUx3eX6W319CoDEYIhD0XnxRqoikNG8aPgEXkZoT9i4GOjPtYCLTG1OTAhOBt5_aFRyPWXWyhhTdazF=w536-h991-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-6",
        name: "Vaso Pitillo",
        description: "Vaso plástico reutilizable con tapa y pitillo.",
        price: 15000,
        category: "Mugs",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOajILnswwj2S1C8EpnygezfV9Do6jqKtwjNe1LqX-CPYTpd_rcUbFDLBJe9ngpHMedES9LR_NrIhhit3S4q7rREHgBz9SyK1j1A-2WPeAncGgXtR_46qvu5HDcGqjA9QkpWL6aMkr0FLrBCgtxcaNX=w512-h731-s-no-gm?authuser=0"
    },
    {
        id: "reg-extra-7",
        name: "Portarretrato",
        description: "Marco para foto decorativo.",
        price: 20000,
        category: "Regalos",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMIJ4LVZFdTjLsIfd4zFaPVKtmDhehk_2wD0GgaP4uvVAHAYmlQZ38756227NpBQzf_Esp1i38W8bd79qxmKEkD-WZ0yBL1JDKcvMcB6x7uDWS5VNKevhHWS_s-Mhr5AOqP-mhgcHQLi4YfBXuShYms=w645-h932-s-no-gm?authuser=0"
    }
];

export const generateProducts = async (): Promise<Product[]> => {
  // Simulate API latency mostly for UI effect
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STATIC_PRODUCTS);
    }, 800); 
  });
};
