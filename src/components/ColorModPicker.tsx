import { useEffect} from 'react'
import { 
    SunIcon,
    MoonIcon
} from './'

type ColorModPickerProps = {
    mode: "light" | "dark"
    setMode: (mode: "light" | "dark") => void
}
const ColorModPicker = ({mode, setMode}: ColorModPickerProps) => {
    useEffect(
        () =>{
            setMode(
                window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                    ?   "dark"
                    :   "light"
            )
        },
        [setMode]
    )
    return (
        <button onClick={() =>{
            setMode("light" === mode ? "dark" : "light");
        }}>
            {"light" === mode &&
                <SunIcon />
            }
            {"dark" === mode &&
                <MoonIcon />
            }
        </button>
    )
}

export default ColorModPicker