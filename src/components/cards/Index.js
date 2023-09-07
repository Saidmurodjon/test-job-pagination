import React from "react";

const Card = ({ value, AddBasket }) => {
  return (
    <div
      key={value.id}
      className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group"
    >
      <div className="m-2 text-justify text-sm">
        <img
          alt="card img"
          className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
          src={value.thumbnail}
        />
        <h2 className="font-semibold my-4 text-2xl text-center">
          {value.title}
        </h2>
        <p className="text-md font-medium">{value.description}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            AddBasket({ id: value.id, title: value.title, price: value.price })
          }
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default Card;
