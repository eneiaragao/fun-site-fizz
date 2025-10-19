import { Zap, Shield, Rocket, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Rápido e Eficiente",
    description: "Performance otimizada para garantir a melhor experiência possível",
  },
  {
    icon: Shield,
    title: "Seguro e Confiável",
    description: "Proteção de dados de ponta para manter suas informações seguras",
  },
  {
    icon: Rocket,
    title: "Sempre Inovando",
    description: "Tecnologias de última geração para mantê-lo à frente da concorrência",
  },
  {
    icon: Target,
    title: "Focado em Resultados",
    description: "Soluções práticas que entregam resultados reais para seu negócio",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por que nos escolher?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos as melhores soluções para transformar seu negócio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
