PokemonRow.propTypes = {
    pokemon: propTypes.shape({
      name: propTypes.shape({
        english: propTypes.string,
      }),
      type: propTypes.arrayOf(propTypes.string),
      id: propTypes.number,
    base: propTypes.shape({
      HP: propTypes.number.isRequired,
      Attack: propTypes.number.isRequired,
      Defense: propTypes.number.isRequired,
      "Sp. Attack": propTypes.number.isRequired,
      "Sp. Defense": propTypes.number.isRequired,
      Speed: propTypes.number.isRequired,
    }),
    onSelect: propTypes.func,
})}

  PokemonInfo.propTypes = {
    name: propTypes.shape({
      english: propTypes.string,
    }),
    id: propTypes.number,
    base: propTypes.shape({
      HP: propTypes.number.isRequired,
      Attack: propTypes.number.isRequired,
      Defense: propTypes.number.isRequired,
      "Sp. Attack": propTypes.number.isRequired,
      "Sp. Defense": propTypes.number.isRequired,
      Speed: propTypes.number.isRequired,
    }),
  };