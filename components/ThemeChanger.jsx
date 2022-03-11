import {useEffect, useState} from 'react';
import { useTheme } from 'next-themes';

const themes = [
  {name: 'senegal'},
  {name: 'ghana'},
  {name: 'mali'},
  {name: 'ethiopia'},
]

const ThemeChanger = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMouted] = useState(false);

  useEffect(() => setMouted(true), []);

  if (!mounted) return null;

  return (
    <div className="bg-yellow-500 rounded-md">
      <div>
        <label htmlFor="themes" className='text-xs md:text-normal px-1 rounded-md'>Pick Theme</label>
        <select
          id="themes" 
          name="themes"
          onChange={e => setTheme(e.target.value)}
          value={theme}
          className="bg-white border-2 border-gray-300 rounded-md px-2 text-sm"
        >
          {
            themes.map(t=> {
              return <option key={t.name}>{t.name}</option>
            })
          }
        </select>
      </div>
    </div>
  )
}

export default ThemeChanger;