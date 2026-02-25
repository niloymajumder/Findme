import BentoCard from './BentoCard';

function BentoGrid({ cards, className = '' }) {
  return (
    <section className={`bento-grid ${className}`}>
      {cards.map((card, i) => (
        <BentoCard key={card.id || i} {...card}>
          {card.content}
        </BentoCard>
      ))}
    </section>
  );
}

export default BentoGrid;
