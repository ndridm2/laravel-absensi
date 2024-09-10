import { usePage } from "@inertiajs/react";
import Submit from "@/Components/attendace/Submit";
import Submitted from "@/Components/attendace/Submitted";

export default function Attendace() {
    const { submitted } = usePage().props;

    if (submitted) {
        return <Submitted />; //info sudah absen
    } else {
        return <Submit />; //form absen
    }
}
