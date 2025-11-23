
import React, { useState, useRef, useEffect } from 'react';
import { Product, CustomerInfo } from '../types';

interface ChatWidgetProps {
  products: Product[];
  onScrollToProducts: () => void;
  onProductSelect?: (product: Product) => void;
}

interface ActionLink {
    label: string;
    url: string;
    icon?: React.ReactNode;
    primary?: boolean;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  time: string;
  productAttachments?: Product[]; // For recommendations
  actionLinks?: ActionLink[];     // For external links (Maps, WA, Socials)
  isReviewRequest?: boolean;      // For 5-star request
}

// Conversation Flow States
type FlowState = 
  | 'IDLE' 
  | 'ASKING_NAME' 
  | 'ASKING_PHONE'
  | 'ASKING_ADDRESS' 
  | 'ASKING_FOR' 
  | 'ASKING_MESSAGE' 
  | 'ASKING_ADDONS'
  | 'CONFIRMING_ORDER';

const ChatWidget: React.FC<ChatWidgetProps> = ({ products, onScrollToProducts, onProductSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flowState, setFlowState] = useState<FlowState>('IDLE');
  
  // Session Management State
  const [showSessionChoice, setShowSessionChoice] = useState(false);
  
  // Data Collection Bucket
  const [collectedData, setCollectedData] = useState<Partial<CustomerInfo>>({});

  const DEFAULT_MESSAGE: Message = { 
    role: 'model', 
    text: '¡Hola! 👋 Soy Lilibot, tu asistente virtual de Detalles Cariñitos. 🤖💖\n\nEstoy aquí para ayudarte a elegir el regalo perfecto, tomar tu pedido o resolver tus dudas.\n\n¿Para quién estás buscando un regalo hoy?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('dc_chat_history');
      if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.length > 0) return parsed;
      }
    } catch { }
    return [DEFAULT_MESSAGE];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  // Using any to avoid TS conflict between NodeJS.Timeout and number
  const voiceTimeoutRef = useRef<any>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        // Check if we need to show session choice
        if (messages.length > 1 && !showSessionChoice) {
           // Logic to decide if we show session choice could go here
        }
        scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle Session Logic on Open
  const handleToggleOpen = () => {
      const nextState = !isOpen;
      setIsOpen(nextState);
      
      if (nextState) {
          // If opening and we have history (more than just the welcome message), ask user
          if (messages.length > 1) {
              setShowSessionChoice(true);
          } else {
              setShowSessionChoice(false);
          }
          setTimeout(scrollToBottom, 100);
      }
  };

  const handleNewSession = () => {
      setMessages([DEFAULT_MESSAGE]);
      setFlowState('IDLE');
      setCollectedData({});
      localStorage.removeItem('dc_customerInfo');
      setShowSessionChoice(false);
      speakText("¡Hola de nuevo! Empecemos desde cero.");
  };

  const handleContinueSession = () => {
      setShowSessionChoice(false);
      setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    localStorage.setItem('dc_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Sync collected data to LocalStorage for CartModal to pick up
  const updateOrderForm = (data: Partial<CustomerInfo>) => {
    const current = JSON.parse(localStorage.getItem('dc_customerInfo') || '{}');
    const updated = { ...current, ...data };
    localStorage.setItem('dc_customerInfo', JSON.stringify(updated));
    setCollectedData(updated);
  };

  // --- INTELLIGENCE ENGINE ---

  const getProductRecommendations = (query: string): Product[] => {
    const lowerQ = query.toLowerCase();
    
    // Si la consulta es muy genérica, devolver un mix
    if (lowerQ.includes('ver') || lowerQ.includes('muestrame') || lowerQ.includes('catalogo') || lowerQ.includes('opciones') || lowerQ.includes('tienes')) {
        return products.sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    return products.filter(p => {
        const cat = p.category.toLowerCase();
        const name = p.name.toLowerCase();
        const desc = p.description.toLowerCase();
        
        if (lowerQ.includes('novia') || lowerQ.includes('amor') || lowerQ.includes('esposa') || lowerQ.includes('romantico')) 
            return cat.includes('peluches') || cat.includes('desayunos') || name.includes('amor') || name.includes('rojo') || name.includes('pareja');
        
        if (lowerQ.includes('cumple') || lowerQ.includes('años') || lowerQ.includes('fiesta')) 
            return cat.includes('anchetas') || cat.includes('desayunos') || cat.includes('piñatería') || name.includes('feliz') || name.includes('cumpleaños');
        
        if (lowerQ.includes('hombre') || lowerQ.includes('papá') || lowerQ.includes('novio') || lowerQ.includes('esposo')) 
            return cat.includes('licor') || cat.includes('cerveza') || cat.includes('billeteras') || cat.includes('mugs') || name.includes('cervecera') || name.includes('azul');
        
        if (lowerQ.includes('económico') || lowerQ.includes('barato') || lowerQ.includes('pequeño')) 
            return p.price < 50000;

        if (lowerQ.includes('dulce') || lowerQ.includes('chocolate') || lowerQ.includes('postre'))
            return desc.includes('chocolate') || desc.includes('dulce') || cat.includes('anchetas') || cat.includes('mugs');

        if (lowerQ.includes('desayuno')) return cat.includes('desayunos');
        if (lowerQ.includes('peluche') || lowerQ.includes('oso')) return cat.includes('peluches');
        if (lowerQ.includes('ancheta')) return cat.includes('anchetas');
        if (lowerQ.includes('licor') || lowerQ.includes('vino')) return desc.includes('vino') || desc.includes('cerveza');
        if (lowerQ.includes('flor') || lowerQ.includes('rosa')) return desc.includes('rosa') || desc.includes('flor');

        return false;
    }).slice(0, 5);
  };

  const processInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    let responseText = "";
    let nextFlow: FlowState = flowState;
    let recommendations: Product[] = [];
    let actionLinks: ActionLink[] = [];
    let askReview = false;

    // 1. DATA COLLECTION FLOW
    if (flowState === 'ASKING_NAME') {
        updateOrderForm({ nombre: input });
        responseText = `Un gusto, ${input}. 😊 Para poder contactarte si hay dudas con la entrega, ¿cuál es tu número de celular o WhatsApp?`;
        nextFlow = 'ASKING_PHONE';
    }
    else if (flowState === 'ASKING_PHONE') {
        updateOrderForm({ telefono: input });
        responseText = "Gracias. ¿A qué dirección debemos llevar el regalo? (Incluye barrio y ciudad si puedes, ejemplo: Dosquebradas, Barrio Guadalupe)";
        nextFlow = 'ASKING_ADDRESS';
    } 
    else if (flowState === 'ASKING_ADDRESS') {
        updateOrderForm({ direccion: input });
        responseText = "Perfecto. ¿Quién es la persona afortunada que recibe el regalo? (Nombre del destinatario)";
        nextFlow = 'ASKING_FOR';
    }
    else if (flowState === 'ASKING_FOR') {
        updateOrderForm({ para: input });
        responseText = "¿Te gustaría que incluyamos un mensaje especial en la tarjeta? Escríbelo aquí (o di 'no' para dejarla en blanco).";
        nextFlow = 'ASKING_MESSAGE';
    }
    else if (flowState === 'ASKING_MESSAGE') {
        const msg = (lowerInput === 'no' || lowerInput === 'ninguno') ? '' : input;
        updateOrderForm({ mensajeTarjeta: msg });
        responseText = "¿Deseas agregar algún detalle adicional a tu pedido? (Ej: Chocolates, Globos, Cerveza extra). Si no, di 'no'.";
        nextFlow = 'ASKING_ADDONS';
    }
    else if (flowState === 'ASKING_ADDONS') {
        if (lowerInput !== 'no' && lowerInput !== 'ninguno' && lowerInput !== 'nada') {
            const currentInfo = JSON.parse(localStorage.getItem('dc_customerInfo') || '{}');
            const updatedMsg = (currentInfo.mensajeTarjeta || "") + ` [NOTA ADICIONAL: ${input}]`;
            updateOrderForm({ mensajeTarjeta: updatedMsg });
            responseText = "¡Listo! He tomado nota de tu adicional. 📝\n\nHe guardado todos tus datos. Ahora puedes ir al carrito para finalizar el pago. ¿Te gustaría ver más productos antes?";
        } else {
            responseText = "¡Entendido! He guardado todos tus datos en el formulario. 📝\n\nAhora puedes ir al carrito para finalizar el pago. ¿Te gustaría ver algunas opciones de regalos?";
        }
        nextFlow = 'IDLE'; 
        askReview = true;
    }

    // 2. GENERAL CONVERSATION & COMMANDS
    else {
        // Pedido
        if (lowerInput.includes('pedir') || lowerInput.includes('comprar') || lowerInput.includes('datos') || lowerInput.includes('encargar')) {
            responseText = "¡Claro! Me encantaría ayudarte a gestionar tu pedido. Primero, ¿cuál es tu nombre completo?";
            nextFlow = 'ASKING_NAME';
        }
        // Recomendaciones
        else if (
            lowerInput.includes('recomiendas') || 
            lowerInput.includes('busco') || 
            lowerInput.includes('quiero') || 
            lowerInput.includes('novia') || 
            lowerInput.includes('cumpleaños') || 
            lowerInput.includes('aniversario') ||
            lowerInput.includes('ver') ||
            lowerInput.includes('muestrame') ||
            lowerInput.includes('tienes') ||
            lowerInput.includes('opciones') ||
            lowerInput.includes('precio') ||
            lowerInput.includes('costo')
        ) {
            recommendations = getProductRecommendations(lowerInput);
            if (recommendations.length > 0) {
                responseText = "¡Claro que sí! Mira estas opciones hermosas que tenemos para ti. 😍 Toca la imagen para ver todos los detalles:";
            } else {
                recommendations = products.slice(0, 4);
                responseText = "Tenemos un catálogo hermoso. Aquí te muestro algunos de nuestros favoritos:";
            }
        }
        // Información Técnica (Con Enlaces)
        else if (lowerInput.includes('ubicacion') || lowerInput.includes('direccion') || lowerInput.includes('donde estan') || lowerInput.includes('llegar')) {
            responseText = "Estamos ubicados en la Calle 34 #11-02, Barrio Guadalupe, Dosquebradas. 🏠 ¡Atendemos 24/7!";
            actionLinks = [{
                label: "Ver en Google Maps 📍",
                url: "https://www.google.com/maps/place/Detalles+Cari%C3%B1itos/data=!4m2!3m1!1s0x0:0x448830dcc48a971f?sa=X&ved=1t:2428&hl=es-419&ictx=111",
                primary: true
            }];
        }
        // Redes Sociales
        else if (lowerInput.includes('redes') || lowerInput.includes('facebook') || lowerInput.includes('instagram') || lowerInput.includes('fotos')) {
             responseText = "¡Síguenos en nuestras redes para ver más fotos y testimonios! 📸";
             actionLinks = [
                 { label: "Instagram", url: "https://instagram.com", primary: false },
                 { label: "Facebook", url: "https://facebook.com", primary: false }
             ];
        }
        // Asesor Humano
        else if (lowerInput.includes('humano') || lowerInput.includes('asesor') || lowerInput.includes('persona') || lowerInput.includes('ayuda') || lowerInput.includes('contactar')) {
             responseText = "Entiendo que quieras hablar con un asesor humano. Puedes escribirnos directamente a nuestro WhatsApp principal:";
             actionLinks = [{
                 label: "Chat con Asesor 💬",
                 url: "https://wa.me/573229297190",
                 primary: true
             }];
        }
        // Pagos
        else if (lowerInput.includes('pago') || lowerInput.includes('nequi') || lowerInput.includes('bancolombia')) {
            responseText = "Para tu comodidad, aceptamos Nequi, Daviplata, Efectivo y Tarjetas (Datáfono). 💳";
        }
        // Domicilios
        else if (lowerInput.includes('domicilio') || lowerInput.includes('envio')) {
            responseText = "Hacemos domicilios en Dosquebradas, Pereira, Cuba y Santa Rosa. 🛵";
        }
        else if (lowerInput.includes('hola') || lowerInput.includes('buenas')) {
            responseText = "¡Hola! Qué alegría saludarte. 👋 Soy Lilibot. ¿Estás buscando un regalo para alguien especial hoy?";
        }
        else {
            responseText = "Entiendo. 🤔 Si quieres ver nuestro catálogo, dime qué estás buscando (ej: 'desayuno para mi novio'). Si necesitas hablar con alguien, escribe 'asesor'.";
        }
    }

    setFlowState(nextFlow);
    
    setTimeout(() => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [
            ...prev, 
            { 
                role: 'model', 
                text: responseText, 
                time, 
                productAttachments: recommendations.length > 0 ? recommendations : undefined,
                actionLinks: actionLinks.length > 0 ? actionLinks : undefined,
                isReviewRequest: askReview
            }
        ]);
        setIsTyping(false);
        speakText(responseText);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    if (voiceTimeoutRef.current) clearTimeout(voiceTimeoutRef.current);

    const userMessage = inputText;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', text: userMessage, time }]);
    setInputText('');
    setIsTyping(true);

    processInput(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // --- VOICE FEATURES ---
  const speakText = (text: string) => {
    // Basic check for browser support
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Strip emojis to prevent reading them as text descriptions
        // Using a simpler regex to avoid potential surrogate pair parsing issues in some environments
        const textWithoutEmojis = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

        const utterance = new SpeechSynthesisUtterance(textWithoutEmojis);
        utterance.lang = 'es-ES';
        
        // Get voices safely
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            let selectedVoice = null;
            
            const preferredVoices = ['Google Español', 'Mónica', 'Paulina', 'Microsoft Sabina', 'Microsoft Helena', 'Samantha'];
            for (const name of preferredVoices) {
                selectedVoice = voices.find(v => v.name.includes(name));
                if (selectedVoice) break;
            }
            if (!selectedVoice) selectedVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Female') || v.name.includes('Woman')));
            if (!selectedVoice) selectedVoice = voices.find(v => v.lang.startsWith('es'));

            if (selectedVoice) utterance.voice = selectedVoice;
        }

        utterance.pitch = 1.1; 
        utterance.rate = 1.05; 

        window.speechSynthesis.cancel(); // Cancel previous speech
        window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.interimResults = false;
    
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      
      if (voiceTimeoutRef.current) clearTimeout(voiceTimeoutRef.current);
      voiceTimeoutRef.current = setTimeout(() => {
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setMessages(prev => [...prev, { role: 'user', text: transcript, time }]);
          setInputText('');
          setIsTyping(true);
          processInput(transcript);
      }, 4000); 
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleProductClick = (product: Product) => {
      if (onProductSelect) {
        onProductSelect(product);
      } else {
        onScrollToProducts();
      }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggleOpen}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 group flex items-center justify-center p-0 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#128C7E] to-[#25D366] rounded-full opacity-90 backdrop-blur-md"></div>
        <div className="absolute inset-0 rounded-full border border-white/30"></div>
        <div className="relative w-8 h-8 md:w-16 md:h-16 flex items-center justify-center">
            {isOpen ? (
                 <svg className="w-5 h-5 md:w-8 md:h-8 text-white drop-shadow-md transform transition-transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <svg className="w-5 h-5 md:w-10 md:h-10 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            )}
        </div>
        {!isOpen && (
            <span className="absolute right-0 top-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 flex flex-col transition-all duration-500 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '70vh', maxHeight: '600px' }}
      >
        <div className="relative w-full h-full flex flex-col bg-[#E5DDD5]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40 overflow-hidden">
            
            {/* Header */}
            <div className="relative flex items-center gap-3 p-3 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E]/90 to-[#075E54]/90 backdrop-blur-md"></div>
                <button onClick={() => setIsOpen(false)} className="relative text-white z-10 md:hidden"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-white">
                         <img src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0" alt="Bot" className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></span>
                </div>
                <div className="relative z-10 flex-grow text-white cursor-default">
                    <h3 className="font-bold text-sm leading-tight">Lilibot 🤖</h3>
                    <p className="text-[10px] text-white/80">En línea ahora</p>
                </div>
                {/* Reset Button (Trash) */}
                <button 
                    onClick={handleNewSession}
                    title="Reiniciar chat"
                    className="relative z-10 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>

            {/* Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 relative scrollbar-hide">
                 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>

                {/* Session Choice Overlay */}
                {showSessionChoice && (
                    <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                        <div className="bg-white rounded-2xl p-6 shadow-2xl border border-white/50 w-full max-w-xs transform transition-all scale-100">
                             <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">👋</span>
                             </div>
                             <h3 className="text-lg font-bold text-gray-800 mb-2">¡Hola de nuevo!</h3>
                             <p className="text-sm text-gray-600 mb-6">Veo que ya estábamos hablando. ¿Qué te gustaría hacer?</p>
                             
                             <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleContinueSession}
                                    className="w-full py-3 bg-[#128C7E] text-white font-bold rounded-xl shadow-md hover:bg-[#075E54] transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                                    Continuar Chat
                                </button>
                                <button 
                                    onClick={handleNewSession}
                                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Nueva Consulta
                                </button>
                             </div>
                        </div>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col relative z-10 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        {/* Text Bubble */}
                        <div 
                            className={`relative max-w-[85%] p-3 rounded-xl text-sm shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-[#DCF8C6]/90 backdrop-blur-md border border-[#C0E8A8] rounded-tr-none text-gray-800' 
                                : 'bg-white/90 backdrop-blur-md border border-white text-gray-800 rounded-tl-none'
                            }`}
                        >
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            
                            {/* Action Links (Maps, WhatsApp, etc) */}
                            {msg.actionLinks && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {msg.actionLinks.map((link, i) => (
                                        <a 
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-grow text-xs font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                                link.primary 
                                                ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {link.label}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    ))}
                                </div>
                            )}

                            <span className={`block text-[9px] text-right mt-1 opacity-60`}>
                                {msg.time}
                            </span>
                        </div>

                        {/* Product Recommendations */}
                        {msg.productAttachments && (
                            <div className="w-full mt-2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {msg.productAttachments.map(p => (
                                    <div 
                                        key={p.id} 
                                        onClick={() => handleProductClick(p)}
                                        className="min-w-[100px] w-24 bg-white rounded-lg p-2 shadow-sm border border-pink-100 cursor-pointer hover:scale-105 transition-transform"
                                    >
                                        <img src={p.image} className="w-full h-16 object-contain mb-1" alt="" />
                                        <p className="text-[10px] leading-tight font-bold text-gray-700 truncate">{p.name}</p>
                                        <p className="text-[9px] text-primary-fuchsia font-bold">${p.price.toLocaleString('es-CO')}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 5-Star Review Request */}
                        {msg.isReviewRequest && (
                             <a 
                                href="https://g.page/r/CR-XisTcMIhEEBI/review" 
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 bg-yellow-50 border border-yellow-200 p-3 rounded-xl flex flex-col items-center gap-1 cursor-pointer hover:bg-yellow-100 transition-colors"
                             >
                                <p className="text-xs font-bold text-yellow-800">¿Te gustó mi atención?</p>
                                <div className="flex text-yellow-400 text-lg">★★★★★</div>
                                <span className="text-[10px] text-gray-500 underline">Califícanos aquí</span>
                             </a>
                        )}
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex justify-start relative z-10">
                        <div className="bg-white/80 backdrop-blur-md border border-white p-2 rounded-xl rounded-tl-none shadow-sm flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 bg-[#F0F0F0]/80 backdrop-blur-xl border-t border-white/40 flex items-end gap-2 relative z-10">
                <div className="flex-grow bg-white/90 backdrop-blur-sm rounded-3xl flex items-center shadow-sm border border-white px-2 py-1.5">
                    <input
                        type="text"
                        className="flex-grow bg-transparent border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400 px-2"
                        placeholder={isListening ? "Escuchando... 🎙️" : "Escribe un mensaje..."}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <button 
                    onClick={inputText ? handleSendMessage : startListening}
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 ${
                        inputText ? 'bg-[#128C7E] hover:bg-[#075E54]' : isListening ? 'bg-red-500 animate-pulse scale-110' : 'bg-[#128C7E] hover:bg-[#075E54]'
                    }`}
                >
                    {inputText ? (
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
                    )}
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
