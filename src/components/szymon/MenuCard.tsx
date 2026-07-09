type TCard = {
  title: string;
  description: string;
  src: string;
};

const MenuCard = ({ title, description, src }: TCard) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={src} alt="food" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Order</button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
