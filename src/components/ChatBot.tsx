import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente de IA da Consultoria Conversão Digital. Como posso ajudá-lo hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-gpt", {
        body: {
          messages: [
            {
              role: "system",
              content: "Você é um assistente inteligente da Consultoria Conversão Digital, especializado em estratégia, performance e resultados digitais. Seja prestativo, profissional e objetivo.",
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            userMessage,
          ],
        },
      });

      if (error) throw error;

      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[600px] flex flex-col bg-card/95 backdrop-blur-sm border-primary/20 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-accent to-primary p-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Bot className="w-8 h-8 text-white relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Assistente IA</h2>
              <p className="text-white/90 text-sm">Consultoria Conversão Digital</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              } animate-fade-in`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-foreground"
                    : "bg-gradient-to-br from-primary to-accent text-white shadow-lg"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              disabled={loading}
              className="flex-1 border-primary/20 focus:border-primary bg-background"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;
