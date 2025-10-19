import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Equipe altamente qualificada e experiente",
  "Atendimento personalizado e dedicado",
  "Tecnologia de ponta e inovadora",
  "Resultados comprovados e mensuráveis",
];

const About = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre nós
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Somos uma empresa comprometida em entregar soluções de alta qualidade 
              que fazem a diferença no seu negócio. Com anos de experiência no mercado, 
              nossa missão é transformar desafios em oportunidades.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Trabalhamos com as tecnologias mais modernas e uma equipe apaixonada 
              por inovação, sempre focados em superar as expectativas dos nossos clientes.
            </p>
            
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button variant="hero" size="lg">
              Entre em contato
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
              <div className="w-full h-full bg-card/50 rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary mb-4">100+</div>
                  <div className="text-xl text-muted-foreground">Projetos entregues</div>
                  <div className="mt-8 text-6xl font-bold text-accent mb-4">98%</div>
                  <div className="text-xl text-muted-foreground">Satisfação dos clientes</div>
                </div>
              </div>
            </div>
            
            {/* Decorative blob */}
            <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
