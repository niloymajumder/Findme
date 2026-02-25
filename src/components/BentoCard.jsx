function BentoCard({ size = 'sm', variant = 'default', accentColor, href, children, style }) {
  const classes = ['bento-card', `size-${size}`, `variant-${variant}`].join(' ');
  const content = (
    <article className={classes} style={{ ...(accentColor ? { '--accent': accentColor } : {}), ...style }}>
      {children}
    </article>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="card-link-wrap">
        {content}
      </a>
    );
  }

  return content;
}

export default BentoCard;
