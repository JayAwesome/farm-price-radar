import React from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CROPS, CropData } from '@/lib/data';
import { getBestMarket, getPriceTrendStatus } from '@/lib/logic';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AgriSense Advisor. Ask me anything about crop prices, market trends, or the best places to sell your produce in Nigeria.' }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = "I'm sorry, I don't have information on that specifically. You can ask about prices for Tomatoes, Rice, Maize, Yam, or Cassava.";
      
      const query = userMessage.toLowerCase();
      const crop = CROPS.find(c => query.includes(c.id) || query.includes(c.name.toLowerCase()));
      
      if (query.includes('hello') || query.includes('hi')) {
        response = "Hello there! How can I help you with your farming decisions today?";
      } else if (crop) {
        const recommendation = getBestMarket(crop as CropData);
        if (query.includes('where') || query.includes('sell') || query.includes('recommend')) {
          response = `My recommendation is to **${recommendation.action}**. ${recommendation.reason}`;
        } else if (query.includes('price') || query.includes('how much')) {
          const cityPrice = crop.prices.find(p => query.includes(p.city.toLowerCase()));
          if(cityPrice) {
            response = `The current price for ${crop.name} in ${cityPrice.city} is \u20A6${cityPrice.price.toLocaleString()} per ${crop.unit}.`;
          } else {
            response = `The price of ${crop.name.toLowerCase()} varies. For example, in ${recommendation.bestCity} it is \u20A6${recommendation.highestPrice.toLocaleString()} and in ${recommendation.lowestCity} it is \u20A6${recommendation.lowestPrice.toLocaleString()}. Do you want to know about a specific city?`;
          }
        } else if (query.includes('trend') || query.includes('increase') || query.includes('rising')) {
          const trend = getPriceTrendStatus(crop.trends);
          response = `The current price trend for ${crop.name.toLowerCase()} is **${trend}**. You can see more details on the Analytics page.`;
        } else {
            response = `I can provide details about ${crop.name}. What would you like to know? You can ask about price, trend or selling recommendations.`
        }
      } else if (query.includes('which crop') && (query.includes('rising') || query.includes('increasing'))){
        const risingCrops = CROPS.filter(c => getPriceTrendStatus(c.trends) === 'rising');
        if (risingCrops.length > 0) {
          response = `Currently, the prices for ${risingCrops.map(c=>c.name).join(", ")} are rising.`;
        } else {
          response = "No crops are showing a clear rising trend at the moment.";
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">AI Advisor</h2>
        <p className="text-muted-foreground">Get instant answers to your market questions.</p>
      </div>

      <div className="flex-1 bg-card rounded-2xl border shadow-xl flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-accent text-foreground rounded-tl-none' 
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}>
                    <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%] flex-row">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="bg-accent text-foreground p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-xs font-medium">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background/50">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input 
              placeholder="Ask about maize prices or where to sell tomatoes..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="bg-background rounded-xl h-12 border-muted-foreground/20 focus-visible:ring-primary"
            />
            <Button onClick={handleSend} className="h-12 w-12 rounded-xl" disabled={isTyping}>
              <Send size={20} />
            </Button>
          </div>
          <div className="flex justify-center mt-3 gap-2">
            <button 
              onClick={() => setInput('Where should I sell maize?')}
              className="text-xs bg-accent hover:bg-accent/80 px-3 py-1.5 rounded-full text-muted-foreground transition-colors"
            >
              Where should I sell maize?
            </button>
            <button 
              onClick={() => setInput('Which crop price is rising?')}
              className="text-xs bg-accent hover:bg-accent/80 px-3 py-1.5 rounded-full text-muted-foreground transition-colors"
            >
              Which crop price is rising?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
