import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Selectbox from "@/Components/Selectbox";
import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function SubmitAttendace() {
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["geocoder"],
    });
    const [transitioning, setTransitioning] = useState(false);

    const {
        data,
        setData,
        post,
        transform,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        status: "attend",
        description: "",
        latitude: "",
        longitude: "",
        prepareData: {},
    });

    const getLatLing = () => {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(
            function (position) {
                createGeocoder(position.coords);
            },
            function (error) {
                alert("Tidak bisa mendapatkan lokasi");
            }
        );
    };

    const createGeocoder = (coordinates) => {
        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                location: {
                    lat: coordinates.latitude,
                    lng: coordinates.longitude,
                },
            })
            .then((response) => {
                console.log(response.result[0].formatted_address);
            });
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // navigator.geolocation.getCurrentPosition(
        //     function (position) {
        //         console.log("Latitude is :", position.coords.latitude);
        //         console.log("Longitude is :", position.coords.longitude);

        //         let objLocation = {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude,
        //         };

        //         setData("prepareData", objLocation);
        //     },
        //     function (error) {
        //         alert("Tidak bisa mendapatkan lokasi");
        //     }
        // );
    };

    useEffect(() => {
        if (
            data.prepareData.hasOwnProperty("latitude") &&
            data.prepareData.hasOwnProperty("longitude")
        ) {
            transform((data) => ({
                ...data.prepareData,
                status: data.status,
                description: data.description,
            }));

            post(route("attendances.submit"), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("Success Absensi");
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    }, [data.prepareData]);

    useEffect(() => {
        if (data.status === "attend") {
            setTransitioning(false);
        } else {
            setTransitioning(true);
        }
    }, [data.status]);

    return (
        <form onSubmit={getLatLing} className="mt-6 space-y-5">
            <div>
                <InputLabel htmlFor="info" value="Silahkan lakukan absensi" />

                <Selectbox
                    className="rounded boder-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    onChange={(e) => setData("status", e.target.value)}
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "sick", label: "Sakit" },
                        { value: "leave", label: "Cuti" },
                        { value: "permit", label: "Izin" },
                        { value: "bisness_trip", label: "Perjalanan Dinas" },
                        {
                            value: "remote",
                            label: "Kerja Remote (diluar kantor)",
                        },
                    ]}
                />

                <InputError className="mt-2" message={errors.info} />
            </div>

            <Transition
                show={transitioning}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="Penjelasan" />

                    <TextInput
                        className="w-full"
                        onChange={(e) => setData("description", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>

                {/* <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition> */}
            </div>
        </form>
    );
}
