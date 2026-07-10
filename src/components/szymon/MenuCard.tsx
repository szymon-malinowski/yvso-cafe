type TCard = {
  title: string;
  description: string;
  src: string;
};

const MenuCard = ({ title, description, src }: TCard) => {
  return (
    <article className="card w-full overflow-hidden border border-base-content/10 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <figure className="aspect-square overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
          src={src}
          alt={title}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-serif text-2xl">{title}</h2>
        <p className="text-sm text-base-content/60">{description}</p>
      </div>
    </article>
  );
};

export default MenuCard;
