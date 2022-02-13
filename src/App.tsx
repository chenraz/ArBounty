import  { useState, useRef, useEffect } from 'react';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { type JWKInterface } from 'arweave/node/lib/wallet'

import { 
  Login, 
  Tenders, 
  Tender,
  NewTender,
  NewBid
} from './pages'

import { 
  LOCAL_STORAGE_WALLET, 
  Logout, 
  loginBtnStyle,
  AppIcon,
  LoginIcon,
  ColorModPicker
} from './components'

import { usePublicAddress } from './lib/api'
import { btnStyle } from './lib/tailwindStyle'

function App() {
  
  const  localStorage = globalThis.localStorage

  const [wallet,setWallet] = useState<JWKInterface | null>(null)
  const loginBtnRef = useRef<HTMLAnchorElement>(null)
  const publicAddress = usePublicAddress({wallet})
  const [ mode, setMode ] = useState<"dark" | "light">("light")

  useEffect(
    () => {
        const localStorageWallet: string | null= localStorage?.getItem(LOCAL_STORAGE_WALLET)
        if (localStorageWallet && !wallet) {
            setWallet(JSON.parse(localStorageWallet))
        }
    },
    [wallet, localStorage, setWallet]
)  

  return (
    <div className={mode}>
      <div className={`min-h-screen p-6 bg-slate-100 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100`}>
        <div className="App-container max-w-6xl w-full mx-auto">
          <header className="App-header w-full flex justify-between">
            <div className="-translate-y-2">
              <Link className="inline-flex text-[26px] items-center" to="/">
                <AppIcon />
                <span className="ml-2">ArBounty</span>
              </Link>
            </div>
            <div className="flex items-start gap-1">
              <span className="-translate-y-0.5">
                <ColorModPicker {...{mode,setMode}} />
              </span>
              {wallet &&
                <Logout setWallet={setWallet} />
              }
              {!wallet && 
                <Link ref={loginBtnRef} className={`${loginBtnStyle}`} to="/login">
                  <LoginIcon />
                  Login
                </Link>
              }
            </div>

          </header>
          <div className="mb-12 mt-6 flex">
            <Link className={btnStyle} to="/newTender">Publish a Tender</Link>
            <Link className={`${btnStyle} ml-2`} to="/">Browse Tenders</Link>
          </div>        
          <main>
            <Routes>
              <Route path="/tender/:taxId" element={<Tender {...{wallet, publicAddress}} />} />
              <Route path="/newTender" element={<NewTender {...{wallet, publicAddress, loginBtnRef}} />} />
              <Route path="/newBid/:taxId" element={<NewBid {...{wallet, publicAddress, loginBtnRef}} /> } />
              <Route path="/login" element={<Login {...{setWallet, publicAddress}} />} />
              <Route path="/" element={ <Tenders />} />
            </Routes>        
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
