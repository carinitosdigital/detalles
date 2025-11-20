
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

interface ChatWidgetProps {
  products: Product[];
  onScrollToProducts: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ products, onScrollToProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! 👋 Soy tu asistente virtual de Detalles Cariñitos. ¿En qué puedo ayudarte hoy? Puedo recomendarte regalos, darte info de la tienda o explicarte cómo pedir.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  // Initial system instruction with all store data
  const systemInstruction = `
    Eres el asistente virtual amable y experto de la tienda de regalos "Detalles Cariñitos".
    
    INFORMACIÓN DE LA TIENDA:
    - Nombre: Detalles Cariñitos
    - Teléfono/WhatsApp: 573229297190
    - Dirección: Calle 34#11-02 barrio Guadalupe, Dosquebradas.
    - Horario: 24/7.
    - Cobertura Domicilios: Dosquebradas, Risaralda, Pereira, Cuba, Santa Rosa y alrededores.
    - Productos: Desayunos sorpresa, anchetas, peluches, cojines, chocolates, globos con helio personalizados, bolsas, cajas, empaques de regalo, billeteras, cosméticos, piñatería, mugs, tarjetas.
    - Redes Sociales: 
      - Facebook: https://facebook.com/detallescarinitos
      - Instagram: https://instagram.com/detallescarinitos

    TUS FUNCIONES:
    1. Recomendar productos basados en la ocasión (cumpleaños, amor, amistad, etc.). Tienes acceso a la lista de productos actuales.
    2. Brindar información de contacto, ubicación y horarios.
    3. Explicar cómo comprar: "Selecciona el producto -> Agregar al carrito -> Ir al carrito -> Llenar formulario -> Enviar pedido por WhatsApp".
    4. Si el usuario pregunta por productos específicos, indícale que pueden verlos en la tienda (usa palabras clave para sugerir que exploren).
    5. Si te piden "desplazar" o "ir a los productos", diles que pueden bajar en la página (y la UI lo hará si es posible, pero tú responde verbalmente).
    6. Sé muy amable, usa emojis y mantén un tono festivo y servicial.

    LISTA DE PRODUCTOS ACTUALES (Úsala para recomendaciones):
    ${products.map(p => `- ${p.name} (${p.category}): $${p.price}`).join('\n')}
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsTyping(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
      });

      // Include history
      const history = messages.map(m => ({
         role: m.role,
         parts: [{ text: m.text }]
      }));

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      
      // Basic Keyword triggering for Navigation actions
      if (responseText.toLowerCase().includes('ver los productos') || 
          userMessage.toLowerCase().includes('ver productos') ||
          userMessage.toLowerCase().includes('ir a la tienda')) {
        onScrollToProducts();
      }

    } catch (error) {
      console.error("Error chat:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Lo siento, tuve un pequeño problema. ¿Me lo repites?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Text-to-Speech
  const speakLastMessage = () => {
    const lastModelMessage = [...messages].reverse().find(m => m.role === 'model');
    if (lastModelMessage) {
      const utterance = new SpeechSynthesisUtterance(lastModelMessage.text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speech-to-Text (Voice Input)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      // Auto-send could be enabled, but let's let user confirm
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary-fuchsia text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Abrir chat de ayuda"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 z-40 w-80 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: '600px', height: '70vh' }}
      >
        {/* Header */}
        <div className="bg-secondary-rose-light p-4 rounded-t-2xl flex items-center gap-3 border-b border-rose-200">
          <div className="bg-white p-1 rounded-full">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0" alt="Bot" className="w-10 h-10 rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-primary-fuchsia">Asistente Cariñitos</h3>
            <p className="text-xs text-gray-600">Siempre disponible 24/7</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-fuchsia text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white rounded-b-2xl border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button 
              onClick={startListening}
              className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              title="Hablar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary-fuchsia text-sm"
              placeholder="Escribe tu duda..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={handleSendMessage}
              className="p-2 bg-primary-fuchsia text-white rounded-full hover:brightness-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <div className="flex justify-center mt-2">
             <button onClick={speakLastMessage} className="text-xs text-primary-fuchsia flex items-center gap-1 hover:underline">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                Escuchar respuesta
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
