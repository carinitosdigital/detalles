import { Product } from "../types";

// A rich, static database of products ("Base de datos bien nutrida")
const STATIC_PRODUCTS: Product[] = [
    // DESAYUNOS
    {
        id: "des-1",
        name: "Desayuno Sorpresa Amor",
        description: "Delicioso desayuno con sándwich gourmet, jugo de naranja natural, fruta picada, chocolates y decoración romántica con globos y tarjeta.",
        price: 85000,
        category: "Desayunos"
    },
    {
        id: "des-2",
        name: "Desayuno Cumpleaños Feliz",
        description: "Incluye torta personal, velita, yogurt, cereal, wrap de pollo, jugo y decoración festiva con globos numéricos.",
        price: 95000,
        category: "Desayunos"
    },
    {
        id: "des-3",
        name: "Desayuno Fit & Fresh",
        description: "Parfait de frutas, tostadas integrales, huevos al gusto, té hatsu y decoración minimalista.",
        price: 78000,
        category: "Desayunos"
    },
    
    // ANCHETAS
    {
        id: "anch-1",
        name: "Ancheta Dulce Tentación",
        description: "Canasta decorada con variedad de chocolates importados, galletas finas, masmelos y una botella de vino espumoso.",
        price: 150000,
        category: "Anchetas"
    },
    {
        id: "anch-2",
        name: "Ancheta Cervecera",
        description: "Caja de madera con 4 cervezas importadas, mix de frutos secos, papas pringles y jarro cervecero personalizado.",
        price: 110000,
        category: "Anchetas"
    },
    {
        id: "anch-3",
        name: "Ancheta Frutal",
        description: "Selección de frutas exóticas, queso, botella de vino tinto y galletas saladas en canasta artesanal.",
        price: 130000,
        category: "Anchetas"
    },

    // PELUCHES
    {
        id: "pel-1",
        name: "Oso de Peluche Gigante",
        description: "Oso de peluche suave de 1 metro de altura, color beige, ideal para abrazar y sorprender a esa persona especial.",
        price: 120000,
        category: "Peluches"
    },
    {
        id: "pel-2",
        name: "Pareja de Ositos Enamorados",
        description: "Dos ositos abrazados con corazón 'Te Amo'. Perfecto para aniversarios.",
        price: 65000,
        category: "Peluches"
    },
    {
        id: "pel-3",
        name: "Stitch de Peluche",
        description: "Peluche del personaje Stitch de 40cm, muy suave y detallado.",
        price: 55000,
        category: "Peluches"
    },

    // MUGS
    {
        id: "mug-1",
        name: "Mug Personalizado Mágico",
        description: "Taza de cerámica que revela un mensaje o foto personalizada cuando se vierte bebida caliente.",
        price: 35000,
        category: "Mugs"
    },
    {
        id: "mug-2",
        name: "Dúo de Mugs Pareja",
        description: "Set de dos mugs que se complementan con frases de amor. Ideales para el café de la mañana juntos.",
        price: 50000,
        category: "Mugs"
    },

    // COJINES
    {
        id: "coj-1",
        name: "Cojín Decorativo Mensaje",
        description: "Cojín suave de 40x40cm con mensaje inspirador o romántico estampado. Funda lavable.",
        price: 45000,
        category: "Cojines"
    },
    {
        id: "coj-2",
        name: "Cojín con Foto Personalizada",
        description: "Cojín cuadrado impreso en alta definición con la foto que tú elijas.",
        price: 55000,
        category: "Cojines"
    },

    // PIÑATERÍA & GLOBOS
    {
        id: "pin-1",
        name: "Ramo de Globos Helio",
        description: "Set de 5 globos metalizados con helio, personalizados con el nombre y motivo de la celebración.",
        price: 60000,
        category: "Piñatería"
    },
    {
        id: "pin-2",
        name: "Caja Explosiva Sorpresa",
        description: "Caja decorada que al abrirse despliega fotos y mensajes. (No incluye dulces, solo estructura y decoración).",
        price: 40000,
        category: "Piñatería"
    },
    {
        id: "pin-3",
        name: "Kit Decoración Cumpleaños",
        description: "Incluye guirnalda, globos, cortina metalizada y velas para decorar un espacio pequeño.",
        price: 35000,
        category: "Piñatería"
    },

    // BILLETERAS & ACCESORIOS
    {
        id: "bill-1",
        name: "Billetera de Cuero Elegante",
        description: "Billetera de cuero genuino con múltiples compartimentos, disponible en negro y café. Incluye caja de regalo.",
        price: 95000,
        category: "Billeteras"
    },
    {
        id: "bill-2",
        name: "Monedero Dama",
        description: "Pequeño y práctico monedero con diseños florales.",
        price: 25000,
        category: "Billeteras"
    },

    // COSMÉTICOS
    {
        id: "cos-1",
        name: "Kit de Cosméticos Glow",
        description: "Set de belleza con labial, rubor y sombras en tonos cálidos, presentado en un hermoso estuche de regalo.",
        price: 75000,
        category: "Cosméticos"
    },
    {
        id: "cos-2",
        name: "Brochas de Maquillaje Pro",
        description: "Set de 12 brochas profesionales con estuche de viaje.",
        price: 55000,
        category: "Cosméticos"
    },

    // CAJAS Y EMPAQUES
    {
        id: "caj-1",
        name: "Caja de Regalo Premium",
        description: "Caja rígida decorada con moño de tela, papel seda y tarjeta. Lista para empacar tu regalo.",
        price: 20000,
        category: "Empaques"
    },
    {
        id: "caj-2",
        name: "Bolsa de Regalo Gigante",
        description: "Bolsa decorada de gran tamaño para peluches o regalos voluminosos.",
        price: 12000,
        category: "Empaques"
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