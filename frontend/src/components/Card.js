import React from "react";

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 p-4 rounded-lg flex flex-col">
      <div className="pb-4">
        <img
          className="w-full h-32 object-cover rounded-md"
          src={imgUrl}
          alt={title}
        />
      </div>
      <div className="text-white font-semibold py-2">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Card;
