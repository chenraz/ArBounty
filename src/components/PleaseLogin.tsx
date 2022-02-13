import { type RefObject } from 'react';
import { Link } from "react-router-dom";

type PleaseLoginProps = {
    loginBtnRef: RefObject<HTMLAnchorElement>
}
const PleaseLogin = ({loginBtnRef}: PleaseLoginProps) => {
    return (
        <div>
            Please <u className="cursor-pointer" onClick={()=>{
                loginBtnRef.current?.click()
            }}>login</u> to post
        </div>
    )
}

export default PleaseLogin