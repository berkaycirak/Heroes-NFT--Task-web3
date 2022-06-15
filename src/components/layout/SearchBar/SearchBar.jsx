import { useEffect, useState } from 'react';
import './SearchBar.styles.scss';

function SearchBar({
  rarity,
  onNameFilter,
  onRarityFilter,
  onAttackFilter,
  onDefenseFilter,
  onEndurenceFilter,
}) {
  const [filters, setFilters] = useState({
    name: '',
    rarity: '',
  });

  const [attack, setAttack] = useState({
    from: '',
    to: '',
  });
  const [defense, setDefense] = useState({
    from: '',
    to: '',
  });
  const [endurence, setEndurence] = useState({
    from: '',
    to: '',
  });

  const handleInput = (field) => (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      [field]: value,
    });
    switch (field) {
      case 'name':
        onNameFilter(value);
        break;
      case 'rarity':
        onRarityFilter(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onAttackFilter(attack);
    //eslint-disable-next-line
  }, [attack]);

  useEffect(() => {
    onDefenseFilter(defense);
    //eslint-disable-next-line
  }, [defense]);
  useEffect(() => {
    onEndurenceFilter(endurence);
    //eslint-disable-next-line
  }, [endurence]);

  return (
    <div className='searches-container'>
      <div className='searches'>
        <div className='nameSearch'>
          <div className='label'>
            <label htmlFor='name'>Name</label>
          </div>
          <input
            type='text'
            className='form-control'
            autoComplete='off'
            id='name'
            value={filters.name}
            onChange={handleInput('name')}
          />
        </div>
        <div className='rarity-dropdown'>
          <div className='label'>
            <label htmlFor='rarity'>Rarity</label>
          </div>
          <select
            className='form-control'
            id='rarity'
            onChange={handleInput('rarity')}
          >
            <option value={filters.rarity}>Select</option>

            {rarity.map((type) => (
              <option value={type} key={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className='endurance-range'>
          <label htmlFor='endurance'>Endurance</label>
          <div className='scales'>
            <input
              type='text'
              id='from'
              autoComplete='off'
              placeholder='from'
              size='1'
              onChange={(e) => {
                setEndurence((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
            <input
              type='text'
              id='to'
              placeholder='to'
              autoComplete='off'
              size='1'
              onChange={(e) => {
                setEndurence((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className='defense-range'>
          <label htmlFor='defense'>Defense</label>
          <div className='scales'>
            <input
              type='text'
              id='from'
              placeholder='from'
              autoComplete='off'
              size='1'
              onChange={(e) => {
                setDefense((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
            <input
              type='text'
              id='to'
              placeholder='to'
              autoComplete='off'
              size='1'
              onChange={(e) => {
                setDefense((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className='attack-range'>
          <label htmlFor='attack'>Attack</label>
          <div className='scales'>
            <input
              type='text'
              id='from'
              placeholder='from'
              autoComplete='off'
              size='1'
              onChange={(e) => {
                setAttack((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
            <input
              type='text'
              id='to'
              placeholder='to'
              autoComplete='off'
              size='1'
              onChange={(e) => {
                setAttack((prev) => ({
                  ...prev,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
