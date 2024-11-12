import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Selectbox from "@/Components/Selectbox";
import roles from "@/data/roles.json";
import ButtonRunPython from "@/Components/ButtonRunPython";

export default function UserEdit({ user, auth }) {
    const {
        data,
        setData,
        patch,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
        uid: user.uid,
        password: "",
        password_confirmation: "",
        role: user.role,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("users.update", user.id), {
            preserveScroll: true,
            onSuccess: () => {
                alert("User update");
            },
            onError: (errors) => {
                alert("User not update");
            },
        });
    };

    window.Echo.channel("read-rfid-channel").listen("ReadRfidEvent", (e) => {
        if (e.code == "EXISTS") {
            errors.uid = e.message;
            reset("uid");
        } else {
            errors.uid = "";
            reset("uid");
            setData("uid", e.uid);
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="w-3/4">
                            <div className="p-6 text-gray-900">
                                <section className="max-w-xl">
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Update User
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Update a new data user
                                        </p>
                                    </header>

                                    <form
                                        onSubmit={submit}
                                        className="mt-6 space-y-5"
                                    >
                                        <div>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Name"
                                            />

                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                isFocused
                                                autoComplete="name"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.name}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email"
                                            />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                autoComplete="username"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.email}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="uid"
                                                value="Rfid"
                                            />

                                            <TextInput
                                                id="uid"
                                                className="mt-1 block w-full"
                                                value={data.uid}
                                                onChange={(e) =>
                                                    setData(
                                                        "uid",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                autoComplete="uid"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.uid}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="role"
                                                value="Role"
                                            />

                                            <Selectbox
                                                onChange={(e) =>
                                                    setData(
                                                        "role",
                                                        e.target.value
                                                    )
                                                }
                                                id="role"
                                                value={data.role}
                                                options={roles}
                                            ></Selectbox>

                                            <InputError
                                                className="mt-2"
                                                message={errors.role}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="password"
                                                value="Password"
                                            />

                                            <TextInput
                                                id="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                            />

                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="password_confirmation"
                                                value="Confirm Password"
                                            />

                                            <TextInput
                                                id="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                            />

                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton
                                                disabled={processing}
                                            >
                                                Save
                                            </PrimaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    Saved.
                                                </p>
                                            </Transition>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </section>
                        <section className="ml-6 pt-6 w-1/4">
                            <ButtonRunPython
                                className="mb-4"
                                label="Take Photos"
                                routerUrl="users.takePhoto"
                                userId={user.id}
                                messageSuccess="Dataset successfully saved"
                                messageFailed="Dataset failed to saved"
                            />
                            <ButtonRunPython
                                className="bg-green-500 hover:bg-green-400 focus:bg-green-300 active:bg-green-300"
                                label="Facial Recognition"
                                routerUrl="users.facialRecognition"
                                messageSuccess="Facial recognition success"
                                messageFailed="Facial recognition failed"
                            />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
