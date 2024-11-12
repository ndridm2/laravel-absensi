import { useState } from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FiLoader } from "react-icons/fi";
import "../../css/style.css";

export default function ButtonRunPython({
    label,
    routerUrl,
    userId,
    messageSuccess,
    messageFailed,
    className,
}) {
    const [isProcess, setIsProcess] = useState(false);

    const { get } = useForm({});

    const runFunction = (e) => {
        e.preventDefault();
        setIsProcess(true);

        get(route(routerUrl, userId ?? null), {
            onSuccess: () => {
                setIsProcess(false);
                alert(messageSuccess);
            },
            onError: () => {
                setIsProcess(false);
                alert(messageFailed);
            },
        });
    };

    return (
        <PrimaryButton
            disabled={isProcess}
            onClick={runFunction}
            className={className}
            style={{
                minWidth: "200px",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {isProcess ? <FiLoader className="spinner" /> : label}
        </PrimaryButton>
    );
}
