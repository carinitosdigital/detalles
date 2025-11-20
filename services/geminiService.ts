
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateProducts = async (): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Genera una lista de 24 productos para la tienda de regalos 'Detalles Cariñitos' en Colombia. Los productos deben incluir: desayunos sorpresa, anchetas, peluches, cojines, chocolates, globos con helio personalizados, bolsas y cajas de regalo, billeteras, cosméticos, piñatería, mugs personalizados y tarjetas. Asigna un id único, nombre atractivo, descripción vendedora, precio realista en Pesos Colombianos (COP) entre 20000 y 300000 (sin decimales), y una categoría clara.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Identificador único UUID." },
              name: { type: Type.STRING, description: "Nombre del producto." },
              description: { type: Type.STRING, description: "Descripción detallada." },
              price: { type: Type.NUMBER, description: "Precio en COP." },
              category: { type: Type.STRING, description: "Categoría del producto (ej. Desayunos, Peluches, Decoración)." }
            },
            required: ["id", "name", "description", "price", "category"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const products = JSON.parse(jsonText) as Product[];
    return products;
  } catch (error) {
    console.error("Error generating products with Gemini:", error);
    // Fallback data in case API fails, to ensure app is usable
    return [];
  }
};
