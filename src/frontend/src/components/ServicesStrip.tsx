import { Bike, CalendarDays, Ticket, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: UtensilsCrossed,
    label: "Nearby Restaurants",
    desc: "Find eateries close to you",
  },
  { icon: CalendarDays, label: "Book Table", desc: "Reserve your spot ahead" },
  { icon: Ticket, label: "Events", desc: "Food festivals & more" },
  { icon: Bike, label: "Deliveries", desc: "Fast delivery to your door" },
];

export function ServicesStrip() {
  return (
    <section
      id="services"
      className="py-12 bg-slate-50"
      data-ocid="services.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          Explore Our Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="font-semibold text-sm text-foreground">
                {service.label}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {service.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
