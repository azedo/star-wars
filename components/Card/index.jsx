// Based on this trading card -> https://starwarsblog.starwars.com/wp-content/uploads/2015/09/EMBARGOED_15SWJF_PROMO_CARDS_P4_CMYK2.jpg

import CardLogo from './CardLogo'

const Card = ({ name, species, imageSrc, isFavorite, onClick }) => {
  const favoriteClass = isFavorite
    ? `from-yellow-500 to-white rotate-3 scale-105`
    : 'from-blue-400 to-purple-600'

  return (
    <div
      className={`relative self-center mx-auto p-3 pb-8 bg-gradient-to-br rounded-md shadow-xl transform-gpu hover:scale-110 hover:rotate-0 transition-all cursor-pointer shine ${favoriteClass}`}
      onClick={onClick}
    >
      <div className="border-2 border-black bg-white p-1 rounded-sm">
        <div className="border-black border-2 rounded-sm relative">
          <div className="absolute -bottom-10 -left-5">
            <CardLogo />
          </div>
          <img src={imageSrc} alt={name} width="200" height="200" />
        </div>
      </div>

      <h3 className="text-white text-center w-full pt-10 text-shadow tracking-wider">{name}</h3>
      <div className="text-center uppercase mt-2 text-shadow">
        <span className="text-white p-1 italic lowercase">({species ? species : 'Unknown'})</span>
      </div>
    </div>
  )
}

export default Card
