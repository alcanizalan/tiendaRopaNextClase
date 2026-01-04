import {APP_NAME} from "@/lib/constants"

export default function Footer(){
    const newYear = new Date().getFullYear();
    return (
        <footer className="border-t">
            <div>
                <p className="p-5 flex-center">{newYear} {APP_NAME}</p>
            </div>
        </footer>
    )
}